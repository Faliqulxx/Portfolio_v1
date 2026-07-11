"use client";

import { motion } from "framer-motion";
import { HiOutlineSparkles } from "react-icons/hi";

export default function ChatEmptyState() {
  return (
    <motion.div
      key="empty-state"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-900 text-white dark:bg-white dark:bg-opacity-10">
        <HiOutlineSparkles className="text-2xl" />
      </span>
      <div className="space-y-0.5">
        <p className="text-base font-semibold dark:text-white">Hi! 👋</p>
        <p className="text-base font-semibold dark:text-white">
          I&apos;m your AI Assistant.
        </p>
      </div>
      <p className="max-w-[260px] text-sm leading-relaxed text-gray-500 dark:text-gray-400">
        Ask me anything about my portfolio, projects, skills, experience, or
        technologies.
      </p>
    </motion.div>
  );
}
