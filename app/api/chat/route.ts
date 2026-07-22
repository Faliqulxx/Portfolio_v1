import { NextRequest } from "next/server";
import { buildChatSystemPrompt } from "@/lib/chat-knowledge";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Edge runtime: low latency for streaming, and this route only ever does
// fetch + stream transform work — no Node-specific APIs needed.
export const runtime = "edge";

const MAX_TOKENS = 2048;
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

  let trimmedHistory = messages
    .slice(-MAX_HISTORY_MESSAGES)
    .map(({ role, content }) => ({
      role: role === "assistant" ? "model" : "user",
      parts: [{ text: String(content).slice(0, 4000) }],
    }));

  // Ensure the history always starts with a 'user' message (Gemini API requirement)
  while (trimmedHistory.length > 0 && trimmedHistory[0].role === "model") {
    trimmedHistory.shift();
  }

  // Ensure strictly alternating messages (user, model, user, model...)
  const validatedHistory: any[] = [];
  let expectedRole = "user";
  for (const msg of trimmedHistory) {
    if (msg.role === expectedRole) {
      validatedHistory.push(msg);
      expectedRole = expectedRole === "user" ? "model" : "user";
    }
  }

  // The very last message in the history MUST be the user's current prompt
  if (
    validatedHistory.length > 0 &&
    validatedHistory[validatedHistory.length - 1].role === "model"
  ) {
    validatedHistory.pop();
  }

  try {
    // Gunakan SDK resmi dari Google agar koneksi stream jauh lebih stabil
    // dan tidak mudah diputus secara sepihak oleh Vercel Edge.
    const genAI = new GoogleGenerativeAI(apiKey);
    const systemInstruction = buildChatSystemPrompt();
    
    // Model fallback sequence to ensure reliability even if a model hits rate limit / 404 / 503
    const modelsToTry = ["gemini-3.5-flash", "gemini-1.5-flash", "gemini-2.0-flash", "gemini-1.5-pro"];
    let result = null;
    let lastError = null;

    for (const modelName of modelsToTry) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
          systemInstruction,
        });

        result = await model.generateContentStream({
          contents: validatedHistory,
          generationConfig: {
            maxOutputTokens: MAX_TOKENS,
          },
        });
        
        // If successfully initialized stream, break out of retry loop
        if (result) break;
      } catch (err) {
        console.warn(`Model ${modelName} failed, trying fallback model...`, err);
        lastError = err;
      }
    }

    if (!result) {
      throw lastError || new Error("All Gemini models unavailable");
    }

    const encoder = new TextEncoder();
    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            if (chunkText) {
              controller.enqueue(encoder.encode(chunkText));
            }
          }
        } catch (error) {
          console.error("Gemini SDK stream error:", error);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Gemini API initialization error:", error);
    return jsonError("Asisten sedang tidak tersedia, coba lagi nanti.", 502);
  }
}
