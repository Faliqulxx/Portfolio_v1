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
        fixed top-[0.85rem] left-4 sm:top-6 sm:left-auto sm:right-8 z-[999]
        p-3 sm:p-0 sm:w-[3rem] sm:h-[3rem]
        rounded-full
        bg-white/90 dark:bg-black/80
        border border-brand-violet/30
        text-[1.35rem] sm:text-base text-black dark:text-white
        backdrop-blur-md
        shadow-sm dark:shadow-glow-soft
        flex items-center justify-center
        transition-all
        hover:scale-105 sm:hover:scale-100 sm:hover:-translate-y-0.5 hover:shadow-glow-violet hover:border-brand-violet/60
        active:-translate-y-0
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet focus-visible:ring-offset-2
      "
    >
      {theme === "light" ? <BsSun /> : <BsMoon />}
    </button>
  );
}