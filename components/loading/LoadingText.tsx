"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { roleTitles } from "@/lib/loading-data";
import type { LoadingStage } from "./LoadingScreen";

export default function LoadingText({
  stage,
  reducedMotion,
}: {
  stage: LoadingStage;
  reducedMotion: boolean;
}) {
  const nameRevealed = stage === "reveal" || stage === "exit";
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    if (reducedMotion || !nameRevealed) return;

    let index = 0;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    const advance = () => {
      if (cancelled) return;
      index += 1;
      if (index < roleTitles.length) {
        setRoleIndex(index);
        timer = setTimeout(advance, 420);
      }
    };

    timer = setTimeout(advance, 420);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [nameRevealed, reducedMotion]);

  if (reducedMotion) {
    return (
      <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
        Faliqul Ishbah
      </h1>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="overflow-hidden">
        <motion.h1
          className="text-3xl font-bold tracking-tight text-white sm:text-5xl"
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{
            clipPath: nameRevealed ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
          }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {nameRevealed ? "Faliqul Ishbah" : "FI"}
        </motion.h1>
      </div>

      <div className="h-5 sm:h-6">
        <AnimatePresence mode="wait">
          {nameRevealed && (
            <motion.p
              key={roleTitles[roleIndex]}
              className="text-sm font-medium tracking-wide text-sky-300/90 sm:text-base"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              {roleTitles[roleIndex]}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
