"use client";

import { motion } from "framer-motion";
import type { LoadingStage } from "./LoadingScreen";

// Arah awal tiap huruf — deterministic (tidak pakai Math.random di render)
// supaya tidak ada hydration mismatch
// Format: { x: offset horizontal, y: offset vertikal }
// FALIQUL = 7 huruf, spasi, ISHBAH = 6 huruf → 14 karakter
const CHAR_ORIGINS: { x: number; y: number }[] = [
  { x: -120, y: 0 },    // F  — dari kiri
  { x: 0, y: -100 },    // A  — dari atas
  { x: 0, y: 100 },     // L  — dari bawah
  { x: 120, y: 0 },     // I  — dari kanan
  { x: -100, y: -80 },  // Q  — dari atas-kiri
  { x: 0, y: 120 },     // U  — dari bawah
  { x: 100, y: -80 },   // L  — dari atas-kanan
  { x: 0, y: 0 },       // (spasi) — diam di tempat
  { x: -120, y: 60 },   // I  — dari bawah-kiri
  { x: 0, y: -100 },    // S  — dari atas
  { x: 120, y: 80 },    // H  — dari bawah-kanan
  { x: -80, y: 100 },   // B  — dari bawah
  { x: 0, y: -100 },    // A  — dari atas
  { x: 120, y: 0 },     // H  — dari kanan
];

const NAME = "FALIQUL ISHBAH";
const CHARS = NAME.split("");

// Delay per huruf (stagger) — huruf datang satu per satu
const STAGGER = 0.08; // detik antar huruf

export default function LoadingText({
  stage,
  reducedMotion,
}: {
  stage: LoadingStage;
  reducedMotion: boolean;
}) {
  if (reducedMotion) {
    return (
      <div className="flex flex-col items-center gap-3 sm:gap-4">
        <h1 className="text-4xl font-black uppercase tracking-tight text-black sm:text-6xl md:text-7xl lg:text-8xl">
          FALIQUL ISHBAH
        </h1>
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-neutral-600 sm:text-lg md:text-xl lg:text-2xl sm:tracking-[0.3em]">
          PORTFOLIO
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 sm:gap-6 select-none">
      {/* ── Judul: huruf datang satu per satu dari arah random ── */}
      <h1
        className="flex items-baseline justify-center flex-wrap text-4xl font-black tracking-tight text-black sm:text-6xl md:text-7xl lg:text-8xl"
        aria-label="FALIQUL ISHBAH"
      >
        {CHARS.map((char, i) => {
          const origin = CHAR_ORIGINS[i] ?? { x: 0, y: -60 };

          if (char === " ") {
            // spasi — lebar saja, tidak perlu animasi
            return (
              <span key={i} className="inline-block w-[0.35em]" aria-hidden="true" />
            );
          }

          return (
            <motion.span
              key={i}
              className="inline-block"
              initial={{
                opacity: 0,
                x: origin.x,
                y: origin.y,
                scale: 0.6,
              }}
              animate={{
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
              }}
              transition={{
                delay: i * STAGGER,
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1], // spring-like easing
              }}
            >
              {char}
            </motion.span>
          );
        })}
      </h1>

      {/* ── Subtitle muncul setelah semua huruf selesai ── */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: CHARS.length * STAGGER + 0.1, // tunggu semua huruf masuk
          duration: 0.5,
          ease: "easeOut",
        }}
        className="text-sm font-bold uppercase tracking-[0.25em] text-neutral-600 sm:text-lg md:text-xl lg:text-2xl sm:tracking-[0.3em]"
      >
        PORTFOLIO
      </motion.p>
    </div>
  );
}
