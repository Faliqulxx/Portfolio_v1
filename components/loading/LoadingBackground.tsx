"use client";

import { motion } from "framer-motion";
import type { LoadingStage } from "./LoadingScreen";

export default function LoadingBackground({
  stage,
  reducedMotion,
}: {
  stage: LoadingStage;
  reducedMotion: boolean;
}) {
  const fading = stage === "exit";

  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <motion.div
        className="absolute left-1/2 top-1/2 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/25 blur-[8rem]"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{
          opacity: fading ? 0 : 1,
          scale: stage === "particles" ? 0.85 : 1,
        }}
        transition={{ duration: reducedMotion ? 0.4 : 1.1, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-[20rem] w-[20rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400/20 blur-[6rem]"
        initial={{ opacity: 0 }}
        animate={{ opacity: fading ? 0 : 0.8 }}
        transition={{
          duration: reducedMotion ? 0.4 : 1.2,
          ease: "easeInOut",
          delay: reducedMotion ? 0 : 0.15,
        }}
      />
    </div>
  );
}
