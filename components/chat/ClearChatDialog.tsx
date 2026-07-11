"use client";

import { motion } from "framer-motion";

export default function ClearChatDialog({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 p-6 backdrop-blur-sm"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="clear-chat-title"
      aria-describedby="clear-chat-description"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 8 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[280px] rounded-2xl bg-white p-5 text-center shadow-2xl dark:bg-[#232D3F]"
      >
        <p id="clear-chat-title" className="text-sm font-semibold dark:text-white">
          Clear this conversation?
        </p>
        <p
          id="clear-chat-description"
          className="mt-1 text-xs text-gray-500 dark:text-gray-400"
        >
          This action cannot be undone.
        </p>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={onCancel}
            autoFocus
            className="flex-1 rounded-full border border-black/10 py-2 text-xs font-medium text-gray-700 transition hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 dark:border-white/10 dark:text-gray-200 dark:hover:bg-white/10"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-full bg-red-600 py-2 text-xs font-medium text-white transition hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
          >
            Clear Chat
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
