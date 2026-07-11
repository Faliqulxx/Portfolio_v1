"use client";

import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const chipVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0 },
};

export default function SuggestionChips({
  items,
  onSelect,
}: {
  items: string[];
  onSelect: (text: string) => void;
}) {
  if (items.length === 0) return null;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-wrap gap-2"
    >
      {items.map((text) => (
        <motion.button
          key={text}
          type="button"
          variants={chipVariants}
          transition={{ duration: 0.22, ease: "easeOut" }}
          onClick={() => onSelect(text)}
          whileHover={{ scale: 1.03, y: -1 }}
          whileTap={{ scale: 0.97 }}
          className="rounded-full border border-black/10 bg-white/70 px-3 py-1.5 text-xs text-gray-700 backdrop-blur-sm transition-all duration-200 hover:bg-white hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 dark:border-white/10 dark:bg-white/5 dark:text-gray-200 dark:hover:bg-white/10 dark:focus-visible:ring-white/40"
        >
          {text}
        </motion.button>
      ))}
    </motion.div>
  );
}
