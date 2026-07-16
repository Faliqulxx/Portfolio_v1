import { NextRequest } from "next/server";
import { buildChatSystemPrompt } from "@/lib/chat-knowledge";

// Edge runtime: low latency for streaming, and this route only ever does
// fetch + stream transform work — no Node-specific APIs needed.
export const runtime = "edge";

// Gemini API uses the generative language endpoint.
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:streamGenerateContent?alt=sse";
const MAX_TOKENS = 500;
const MAX_HISTORY_MESSAGES = 12;

// Naive in-memory rate limit. This resets whenever the edge function cold
// starts and isn't shared across regions/instances — it will not stop a
// determined attacker, but it comfortably blunts casual abuse/cost spikes
// on a low-traffic portfolio site. If traffic grows, swap this for a
// durable store (e.g. Upstash Redis / Vercel KV).
const requestLog = new Map<string, number[]>();
const RATE_LIMIT = 15;
const RATE_WINDOW_MS = 60_000;

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (requestLog.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < RATE_WINDOW_MS
  );
  recent.push(now);
  requestLog.set(ip, recent);
  return recent.length > RATE_LIMIT;
}

type IncomingMessage = { role: "user" | "assistant"; content: string };

function jsonError(message: string, status: number) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  if (isRateLimited(ip)) {
    return jsonError("Terlalu banyak permintaan. Coba lagi sebentar ya.", 429);
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY is not set.");
    return jsonError("Chat assistant belum dikonfigurasi.", 500);
  }

  let body: { messages?: IncomingMessage[] };
  try {
    body = await req.json();
  } catch {
    return jsonError("Body request tidak valid.", 400);
  }

  const messages = body.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return jsonError("Pesan tidak valid.", 400);
  }

  // Keep the upstream payload small and bounded.
  const trimmedHistory = messages
    .slice(-MAX_HISTORY_MESSAGES)
    .map(({ role, content }) => ({
      role: role === "assistant" ? "model" : "user",
      parts: [{ text: String(content).slice(0, 4000) }],
    }));

  const upstream = await fetch(GEMINI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: buildChatSystemPrompt() }],
      },
      contents: trimmedHistory,
      generationConfig: {
        maxOutputTokens: MAX_TOKENS,
      },
    }),
  });

  if (!upstream.ok || !upstream.body) {
    const errorText = await upstream.text().catch(() => "");
    console.error("Gemini API error:", upstream.status, errorText);
    return jsonError("Asisten sedang tidak tersedia, coba lagi nanti.", 502);
  }

  // Re-stream only the text deltas as plain text chunks, so the client
  // doesn't need to understand the Gemini SSE format at all —
  // it just reads a plain text stream.
  const textStream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const reader = upstream.body!.getReader();
      const decoder = new TextDecoder();
      const encoder = new TextEncoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data:")) continue;
          const payload = line.slice(5).trim();
          if (!payload) continue;

          try {
            const event = JSON.parse(payload);
            const delta = event.candidates?.[0]?.content?.parts?.[0]?.text;
            if (typeof delta === "string" && delta.length > 0) {
              controller.enqueue(encoder.encode(delta));
            }
          } catch {
            // Ignore partial/malformed SSE fragments; the next chunk
            // will complete the buffered line.
          }
        }
      }
      controller.close();
    },
  });

  return new Response(textStream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}

