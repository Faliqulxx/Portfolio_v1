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
        fixed bottom-5 right-5 z-[9999]
        w-[3rem] h-[3rem]
        rounded-full
        bg-white/80 dark:bg-gray-950
        border border-white/40
        backdrop-blur-md
        shadow-2xl
        flex items-center justify-center
        transition-all
        hover:scale-110
        active:scale-95
      "
    >
      {theme === "light" ? <BsSun /> : <BsMoon />}
    </button>
  );
}