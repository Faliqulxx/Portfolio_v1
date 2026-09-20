"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import LoadingBackground from "./LoadingBackground";
import LoadingText from "./LoadingText";
import LoadingSequence from "./LoadingSequence";

export type LoadingStage = "particles" | "connect" | "reveal" | "exit";

// Timeline offsets from mount
const STAGE_TIMELINE: { stage: LoadingStage; at: number }[] = [
  { stage: "particles", at: 0 },
  { stage: "connect", at: 500 },
  { stage: "reveal", at: 1200 },
  { stage: "exit", at: 3100 },
];
const LINE_AT = 3450;
const SPLIT_AT = 3950;
const UNMOUNT_AFTER = 4900;

export default function LoadingScreen() {
  const prefersReducedMotion = !!useReducedMotion();
  const [stage, setStage] = useState<LoadingStage>("particles");
  const [visible, setVisible] = useState(true);
  const [showLine, setShowLine] = useState(false);
  const [isSplitting, setIsSplitting] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
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

    const lineTimer = setTimeout(() => {
      setShowLine(true);
    }, LINE_AT);

    const splitTimer = setTimeout(() => {
      setIsSplitting(true);
    }, SPLIT_AT);

    const unmount = setTimeout(() => {
      setVisible(false);
    }, UNMOUNT_AFTER);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(lineTimer);
      clearTimeout(splitTimer);
      clearTimeout(unmount);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      key="loading-screen"
      className={`fixed inset-0 z-[9999] overflow-hidden ${
        isSplitting ? "pointer-events-none" : "pointer-events-auto"
      }`}
    >
      {/* ── LEFT CURTAIN / SHUTTER ─────────────────────────────────── */}
      <motion.div
        className="fixed top-0 bottom-0 left-0 w-[calc(50%+1px)] bg-black z-20"
        initial={{ x: 0 }}
        animate={{
          x: isSplitting ? "-100%" : 0,
        }}
        transition={{
          duration: prefersReducedMotion ? 0.3 : 0.85,
          ease: [0.77, 0, 0.175, 1],
        }}
      />

      {/* ── RIGHT CURTAIN / SHUTTER ────────────────────────────────── */}
      <motion.div
        className="fixed top-0 bottom-0 right-0 w-[calc(50%+1px)] bg-black z-20"
        initial={{ x: 0 }}
        animate={{
          x: isSplitting ? "100%" : 0,
        }}
        transition={{
          duration: prefersReducedMotion ? 0.3 : 0.85,
          ease: [0.77, 0, 0.175, 1],
        }}
      />

      {/* ── CENTER LASER LINE (Muncul dari atas ke bawah setelah tulisan hilang) ── */}
      {!prefersReducedMotion && showLine && (
        <motion.div
          className="fixed top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] z-30 pointer-events-none"
          style={{ transformOrigin: "top" }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{
            scaleY: 1,
            opacity: isSplitting ? 0 : 1,
          }}
          transition={{
            scaleY: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
            opacity: isSplitting ? { duration: 0.2 } : { duration: 0.1 },
          }}
        >
          {/* Sinar garis berkilau (brand cyan & white glow) */}
          <div className="w-full h-full bg-gradient-to-b from-brand-violet via-white to-brand-violet shadow-[0_0_12px_#06b6d4,0_0_25px_#10b981]" />

          {/* Kilatan cahaya di ujung garis saat meluncur ke bawah */}
          {!isSplitting && (
            <motion.div
              className="absolute w-3 h-3 -left-[5px] -bottom-1.5 rounded-full bg-white shadow-[0_0_16px_#06b6d4,0_0_30px_#10b981]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1 }}
            />
          )}
        </motion.div>
      )}

      {/* ── CENTER CONTENT (Text, glow orbs, roles) ───────────────── */}
      <div className="fixed inset-0 z-30 flex items-center justify-center pointer-events-none">
        <LoadingBackground stage={stage} reducedMotion={prefersReducedMotion} />

        <motion.div
          className="relative z-10 flex flex-col items-center px-6 text-center"
          initial={{ opacity: 1, scale: 1 }}
          animate={{
            opacity: stage === "exit" ? 0 : 1,
            scale: stage === "exit" ? 0.92 : 1,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <LoadingText stage={stage} reducedMotion={prefersReducedMotion} />
          {!prefersReducedMotion && <LoadingSequence stage={stage} />}
        </motion.div>
      </div>
    </div>
  );
}
