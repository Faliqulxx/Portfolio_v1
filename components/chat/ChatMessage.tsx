"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import type { ChatMessageData } from "./useChat";
import TypingIndicator from "./TypingIndicator";
import { renderMessageContent } from "./formatMessage";

function ChatMessage({ message }: { message: ChatMessageData }) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[85%] rounded-[1.25rem] px-4 py-2.5 text-sm leading-relaxed ${isUser
            ? "bg-gray-900 text-white dark:bg-white dark:bg-opacity-10"
            : "bg-white/90 text-gray-800 shadow-sm dark:bg-[#232D3F]/90 dark:text-gray-100"
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


