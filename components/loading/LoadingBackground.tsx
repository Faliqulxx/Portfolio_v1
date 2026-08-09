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
      {/* Primary violet glow orb */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-violet/30 blur-[8rem]"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{
          opacity: fading ? 0 : 1,
          scale: stage === "particles" ? 0.85 : 1,
        }}
        transition={{ duration: reducedMotion ? 0.4 : 1.1, ease: "easeInOut" }}
      />
      {/* Secondary electric blue orb */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-electric/20 blur-[6rem]"
        initial={{ opacity: 0 }}
        animate={{ opacity: fading ? 0 : 0.75 }}
        transition={{
          duration: reducedMotion ? 0.4 : 1.2,
          ease: "easeInOut",
          delay: reducedMotion ? 0 : 0.15,
        }}
      />
      {/* Deep blue accent orb */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[10rem] w-[10rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-deep/40 blur-[4rem]"
        initial={{ opacity: 0 }}
        animate={{ opacity: fading ? 0 : 0.6 }}
        transition={{
          duration: reducedMotion ? 0.4 : 1.4,
          ease: "easeInOut",
          delay: reducedMotion ? 0 : 0.3,
        }}
      />
    </div>
  );
}
