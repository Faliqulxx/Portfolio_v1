"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoClose, IoSend } from "react-icons/io5";
import { HiOutlineSparkles, HiOutlineTrash } from "react-icons/hi";
import ChatMessage from "./ChatMessage";
import ChatSuggestions from "./ChatSuggestions";
import ChatEmptyState from "./ChatEmptyState";
import ClearChatDialog from "./ClearChatDialog";
import FollowUpSuggestions from "./FollowUpSuggestions";
import type { useChat } from "./useChat";

type ChatState = ReturnType<typeof useChat>;

export default function ChatWindow({
  chat,
  onClose,
}: {
  chat: ChatState;
  onClose: () => void;
}) {
  const { messages, sendMessage, isLoading, error, resetChat } = chat;
  const [input, setInput] = useState("");
  const [confirmingClear, setConfirmingClear] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isEmpty = messages.length === 0;
  const lastMessage = messages[messages.length - 1];
  // Only offer follow-ups once the latest assistant reply has actually
  // finished streaming — not mid-stream, and not while it's the user's
  // own message waiting for a reply.
  const showFollowUps =
    !isLoading && lastMessage?.role === "assistant" && lastMessage.content.length > 0;

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  };

  const handleConfirmClear = () => {
    resetChat();
    setConfirmingClear(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-[9.5rem] right-5 z-[70] flex h-[65vh] max-h-[560px] w-[calc(100vw-2.5rem)] max-w-[380px] flex-col overflow-hidden rounded-2xl border border-black/10 bg-white/80 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-gray-900/80"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-black/10 bg-white/70 px-4 py-3 backdrop-blur-md dark:border-white/10 dark:bg-[#192D3E]/70">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-white dark:bg-white dark:bg-opacity-10">
            <HiOutlineSparkles className="text-base" />
          </span>
          <div>
            <p className="text-sm font-semibold dark:text-white">AI Assistant</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Ask about Faliqul
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {!isEmpty && (
            <button
              type="button"
              onClick={() => setConfirmingClear(true)}
              aria-label="Clear chat"
              className="flex items-center gap-1 rounded-full px-2 py-1.5 text-xs font-medium text-gray-500 transition hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 dark:text-gray-300 dark:hover:bg-white/10 dark:focus-visible:ring-white/40"
            >
              <HiOutlineTrash className="text-base" />
              <span className="hidden sm:inline">Clear Chat</span>
            </button>
          )}
          <button
            onClick={onClose}
            aria-label="Tutup chat"
            className="rounded-full p-1.5 text-gray-500 transition hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 dark:text-gray-300 dark:hover:bg-white/10 dark:focus-visible:ring-white/40"
          >
            <IoClose className="text-lg" />
          </button>
        </div>
      </div>

      {/* Messages / empty state */}
      <div
        ref={scrollRef}
        role="log"
        aria-live="polite"
        aria-relevant="additions"
        aria-label="Riwayat percakapan"
        className="custom-scrollbar flex-1 overflow-y-auto px-4 py-4"
      >
        <AnimatePresence mode="wait">
          {isEmpty ? (
            <ChatEmptyState key="empty" />
          ) : (
            <motion.div
              key="messages"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {messages.map((message, i) => (
                <ChatMessage key={i} message={message} />
              ))}
              {showFollowUps && (
                <FollowUpSuggestions
                  lastMessage={lastMessage!.content}
                  onSelect={(text) => sendMessage(text)}
                />
              )}
              {error && <p className="text-xs text-red-500">{error}</p>}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {isEmpty && (
        <div className="px-4 pb-3">
          <ChatSuggestions onSelect={(text) => sendMessage(text)} />
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border-t border-black/10 bg-white/70 p-3 backdrop-blur-md dark:border-white/10 dark:bg-[#192D3E]/70"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tulis pertanyaan..."
          aria-label="Tulis pertanyaan untuk AI Assistant"
          disabled={isLoading}
          className="flex-1 rounded-full border border-black/10 bg-white/60 px-4 py-2 text-sm outline-none transition focus:border-gray-400 disabled:opacity-60 dark:border-white/10 dark:bg-white/5 dark:text-white"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          aria-label="Kirim pesan"
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gray-900 text-white transition hover:scale-105 disabled:opacity-40 disabled:hover:scale-100 dark:bg-white dark:bg-opacity-10"
        >
          <IoSend className="text-sm" />
        </button>
      </form>

      {/* Clear-chat confirmation overlay */}
      <AnimatePresence>
        {confirmingClear && (
          <ClearChatDialog
            onCancel={() => setConfirmingClear(false)}
            onConfirm={handleConfirmClear}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

