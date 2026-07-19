"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiOutlineSparkles } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import ChatWindow from "./ChatWindow";
import { useChat } from "./useChat";

// The cinematic loading screen unmounts at ~3.7s — fade the button in right
// after, so it reads as "the site is ready" rather than popping in behind
// the (fully opaque) boot overlay.
const ENTRANCE_DELAY = 3.9;

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const chat = useChat();

  return (
    <>
      {/*
        Hover-expand is pure CSS (width + opacity transitions via the
        `group` / `group-hover` classes) rather than React state — this
        keeps the hover interaction completely free of re-renders, and
        Tailwind's `hover:` naturally no-ops on touch devices, which is
        exactly the "no hover expansion on mobile" behavior we want.
      */}
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Tutup AI Assistant" : "Buka AI Assistant"}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: ENTRANCE_DELAY, ease: [0.16, 1, 0.3, 1] }}
        whileTap={{ scale: 0.96 }}
        className={`group fixed bottom-20 right-5 z-[70] flex h-14 cursor-pointer items-center rounded-full bg-gray-900 text-white shadow-xl transition-[width,box-shadow] duration-300 ease-out hover:bg-gray-950 hover:shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:bg-white dark:bg-opacity-10 dark:focus-visible:ring-offset-gray-900 ${open ? "w-14" : "w-14 overflow-hidden hover:w-[220px]"
          }`}
      >
        <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-[1.08]">
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <IoClose className="text-2xl" />
              </motion.span>
            ) : (
              <motion.span
                key="sparkle"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <HiOutlineSparkles className="text-2xl" />
              </motion.span>
            )}
          </AnimatePresence>
        </span>

        {!open && (
          <span className="whitespace-nowrap pr-5 text-sm font-medium opacity-0 transition-opacity delay-75 duration-300 group-hover:opacity-100">
            🤖 Chat with My AI Assistant
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {open && <ChatWindow chat={chat} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

