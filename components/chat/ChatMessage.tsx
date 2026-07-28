"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import type { ChatMessageData } from "./useChat";
import TypingIndicator from "./TypingIndicator";
import { renderMessageContent } from "./formatMessage";

import { IoSparkles } from "react-icons/io5";
import { FaUser } from "react-icons/fa";

function ChatMessage({ message }: { message: ChatMessageData }) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`flex items-start gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs shadow-sm mt-0.5 ${
          isUser
            ? "bg-gray-800 text-white dark:bg-white/20"
            : "bg-indigo-600 text-white dark:bg-indigo-500"
        }`}
      >
        {isUser ? <FaUser className="text-[10px]" /> : <IoSparkles className="text-[11px]" />}
      </div>

      <div
        className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? "bg-gray-900 text-white dark:bg-indigo-600 dark:text-white rounded-tr-xs"
            : "bg-white text-gray-800 shadow-md dark:bg-gray-800 dark:text-gray-100 border border-gray-100 dark:border-white/10 rounded-tl-xs"
        }`}
      >
        {message.content ? renderMessageContent(message.content) : <TypingIndicator />}
      </div>
    </motion.div>
  );
}

// Messages before the last one never change identity while streaming (only
// the final assistant bubble's content updates), so memo lets React skip
// re-rendering the whole scrollback on every streamed chunk.
export default memo(ChatMessage);


