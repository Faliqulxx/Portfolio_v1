"use client";

import React, { useEffect, useState } from "react";
import { BsMoon, BsSun } from "react-icons/bs";
import { useTheme } from "@/context/theme-context";

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Mencegah hydration mismatch
  if (!mounted) return null;

  return (
    <button
      onClick={toggleTheme}
      className="
        fixed top-[0.85rem] left-4 sm:top-6 sm:left-auto sm:right-8 z-[9999]
        p-3 sm:p-0 sm:w-[3rem] sm:h-[3rem]
        rounded-full
        bg-white/80 dark:bg-gray-900/80 sm:dark:bg-gray-950
        border border-gray-200 dark:border-white/10 sm:border-white/40
        text-[1.35rem] sm:text-base text-gray-700 dark:text-white/70 sm:text-gray-900 sm:dark:text-white
        backdrop-blur-md
        shadow-sm sm:shadow-2xl
        flex items-center justify-center
        transition-all
        hover:scale-105 sm:hover:scale-100 sm:hover:-translate-y-0.5 sm:hover:shadow-xl
        active:-translate-y-0
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 dark:focus-visible:ring-gray-300 dark:focus-visible:ring-offset-gray-950
      "
    >
      {theme === "light" ? <BsSun /> : <BsMoon />}
    </button>
  );
}