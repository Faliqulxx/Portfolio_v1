"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineTrash, HiOutlineLightBulb } from "react-icons/hi";
import { IoSend, IoSparkles } from "react-icons/io5";
import { useChat } from "@/components/chat/useChat";
import ChatMessage from "@/components/chat/ChatMessage";
import ClearChatDialog from "@/components/chat/ClearChatDialog";
import { useActiveSectionContext } from "@/context/active-section-context";

const QUICK_PROMPTS = [
  {
    title: "Skills & Expertise",
    description: "Ceritakan tentang dia dan keahlian yang dimilikinya",
    icon: "⚡",
  },
  {
    title: "Projects Overview",
    description: "Apa saja proyek yang telah dibangun oleh nya",
    icon: "🚀",
  },
  {
    title: "AI & ML Experience",
    description: "Jelaskan pengalaman nya di bidang Artificial Intelligence, Data Science, dan Machine Learning",
    icon: "🧠",
  },
  {
    title: "Tech Stack",
    description: "Teknologi dan bahasa pemrograman apa saja yang dikuasai oleh nya?",
    icon: "🛠️",
  },
  {
    title: "Best Project",
    description: "Tunjukkan dan jelaskan proyek terbaik yang pernah dibangun oleh nya?",
    icon: "⭐",
  },
];

export default function AIAssistantPage() {
  const chat = useChat();
  const { messages, sendMessage, isLoading, error, resetChat } = chat;
  const [input, setInput] = useState("");
  const [confirmingClear, setConfirmingClear] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { setActiveSection } = useActiveSectionContext();

  useEffect(() => {
    setActiveSection("AI Assistant");
  }, [setActiveSection]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage(input);
    setInput("");
  };

  const handlePromptSelect = (promptText: string) => {
    if (isLoading) return;
    sendMessage(promptText);
  };

  const handleConfirmClear = () => {
    resetChat();
    setConfirmingClear(false);
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="-mt-10 md:-mt-36 h-screen max-h-screen pt-20 md:pt-24 pb-4 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col items-center overflow-hidden box-border">
      {/* DYNAMIC FIT CHAT CONTAINER */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full flex-1 min-h-0 flex flex-col rounded-2xl sm:rounded-3xl border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl shadow-2xl overflow-hidden"
      >
        {/* TOP BAR */}
        <div className="px-4 sm:px-6 py-3 border-b border-gray-100 dark:border-white/10 bg-white/50 dark:bg-gray-900/50 flex items-center justify-between backdrop-blur-md flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-md">
              <div className="w-full h-full rounded-[14px] bg-white dark:bg-gray-950 flex items-center justify-center">
                <IoSparkles className="text-indigo-600 dark:text-indigo-400 text-base sm:text-lg" />
              </div>
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                Faliqul AI Assistant
              </h2>
              <p className="text-[11px] sm:text-xs text-gray-500 dark:text-white/40">
                Respon instan & akurat mengenai Portofolio
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isEmpty && (
              <button
                type="button"
                onClick={() => setConfirmingClear(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-white/10 text-xs font-medium text-gray-600 dark:text-white/70 hover:bg-gray-100 dark:hover:bg-white/10 transition-all cursor-pointer shadow-sm"
              >
                <HiOutlineTrash className="text-sm text-red-500" />
                <span className="hidden sm:inline">Bersihkan Chat</span>
              </button>
            )}
          </div>
        </div>

        {/* MESSAGES / WELCOME AREA */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 custom-scrollbar"
        >
          {isEmpty ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="h-full flex flex-col items-center justify-center text-center py-2"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-2xl mb-2 sm:mb-3 shadow-inner">
                <HiOutlineLightBulb />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1">
                Halo! Ada yang bisa saya bantu hari ini?
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-white/50 max-w-md mb-4 sm:mb-6">
                Pilih topik di bawah ini atau tulis pertanyaan Anda sendiri tentang latar belakang, proyek, dan keahlian Faliqul.
              </p>

              {/* QUICK PROMPTS GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 w-full max-w-3xl">
                {QUICK_PROMPTS.map((item, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ y: -2, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handlePromptSelect(item.description)}
                    className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border border-gray-200 dark:border-white/10 bg-white/60 dark:bg-white/5 hover:bg-indigo-50/50 dark:hover:bg-indigo-500/10 hover:border-indigo-300 dark:hover:border-indigo-500/30 text-left transition-all group shadow-sm flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xl sm:text-2xl">{item.icon}</span>
                      <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        Tanyakan →
                      </span>
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-0.5">
                        {item.title}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-gray-500 dark:text-white/50 line-clamp-2 leading-snug">
                        "{item.description}"
                      </p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="space-y-4 max-w-3xl mx-auto">
              {messages.map((message, i) => (
                <ChatMessage key={i} message={message} />
              ))}
              {error && (
                <div className="p-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-xs text-red-600 dark:text-red-400 text-center">
                  {error}
                </div>
              )}
            </div>
          )}
        </div>

        {/* INPUT BAR */}
        <div className="p-3 sm:p-4 border-t border-gray-100 dark:border-white/10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md flex-shrink-0">
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2.5 max-w-3xl mx-auto"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ketik pertanyaan Anda tentang Faliqul..."
              disabled={isLoading}
              className="flex-1 rounded-xl sm:rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/30 outline-none transition focus:border-indigo-500 dark:focus:border-indigo-400 shadow-inner disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl sm:rounded-2xl bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white flex items-center justify-center transition-all shadow-md hover:shadow-lg disabled:opacity-40 disabled:hover:bg-indigo-600 cursor-pointer flex-shrink-0"
            >
              <IoSend className="text-sm sm:text-base" />
            </button>
          </form>
        </div>
      </motion.div>

      {/* CLEAR CHAT MODAL */}
      <AnimatePresence>
        {confirmingClear && (
          <ClearChatDialog
            onCancel={() => setConfirmingClear(false)}
            onConfirm={handleConfirmClear}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
