"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import LoadingBackground from "./LoadingBackground";
import LoadingNetwork from "./LoadingNetwork";
import LoadingText from "./LoadingText";
import LoadingSequence from "./LoadingSequence";

export type LoadingStage = "particles" | "connect" | "reveal" | "exit";

// Full boot sequence stays well under 4s. Stage boundaries are offsets (ms)
// from mount, scheduled once via chained setTimeout — Framer Motion owns
// the actual per-frame animation work, not us.
const STAGE_TIMELINE: { stage: LoadingStage; at: number }[] = [
  { stage: "particles", at: 0 },
  { stage: "connect", at: 500 },
  { stage: "reveal", at: 1200 },
  { stage: "exit", at: 3800 },
];
const UNMOUNT_AFTER = 4400; // includes the exit transition itself

export default function LoadingScreen() {
  const prefersReducedMotion = !!useReducedMotion();
  const [stage, setStage] = useState<LoadingStage>("particles");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (prefersReducedMotion) {
      // Simplified path: brief fade of the name only, then done.
      const toExit = setTimeout(() => setStage("exit"), 400);
      const unmount = setTimeout(() => setVisible(false), 750);
      return () => {
        clearTimeout(toExit);
        clearTimeout(unmount);
      };
    }

    const timers = STAGE_TIMELINE.map(({ stage: s, at }) =>
      setTimeout(() => setStage(s), at)
    );
    const unmount = setTimeout(() => setVisible(false), UNMOUNT_AFTER);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(unmount);
    };
  }, [prefersReducedMotion]);

  // Lock page scroll for the duration of the boot sequence — same pattern
  // already used for the project modal in project-section.tsx.
  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading-screen"
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-black"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={
            prefersReducedMotion
              ? { opacity: 0 }
              : { opacity: 0, scale: 1.06, filter: "blur(14px)" }
          }
          transition={{
            duration: prefersReducedMotion ? 0.3 : 0.6,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <LoadingBackground stage={stage} reducedMotion={prefersReducedMotion} />

          <div className="relative z-10 flex flex-col items-center px-6 text-center">
            <LoadingText stage={stage} reducedMotion={prefersReducedMotion} />
            {!prefersReducedMotion && <LoadingSequence stage={stage} />}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
