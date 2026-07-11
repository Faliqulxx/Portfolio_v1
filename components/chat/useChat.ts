"use client";

import { useCallback, useState } from "react";

export type ChatRole = "user" | "assistant";
export interface ChatMessageData {
  role: ChatRole;
  content: string;
}

export function useChat() {
  // In-memory only — intentionally not persisted anywhere (no storage, no
  // cookies, no DB). A refresh always starts a brand new conversation.
  const [messages, setMessages] = useState<ChatMessageData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(
    async (rawContent: string) => {
      const content = rawContent.trim();
      if (!content || isLoading) return;

      const userMessage: ChatMessageData = { role: "user", content };
      const history = [...messages, userMessage];
      setMessages([...history, { role: "assistant", content: "" }]);
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history }),
        });

        if (!res.ok || !res.body) {
          const data = await res.json().catch(() => null);
          throw new Error(data?.error ?? "Gagal menghubungi asisten.");
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let assistantText = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          assistantText += decoder.decode(value, { stream: true });

          setMessages((prev) => {
            const next = [...prev];
            next[next.length - 1] = { role: "assistant", content: assistantText };
            return next;
          });
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Terjadi kesalahan tak terduga."
        );
        // Drop the empty placeholder assistant bubble on failure.
        setMessages((prev) => prev.slice(0, -1));
      } finally {
        setIsLoading(false);
      }
    },
    [messages, isLoading]
  );

  const resetChat = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return { messages, sendMessage, isLoading, error, resetChat };
}
