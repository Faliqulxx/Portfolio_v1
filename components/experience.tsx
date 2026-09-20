"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import SectionHeading from "./section-heading";
import { experiencesData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import Image from "next/image";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const iconMap: Record<string, React.ReactNode> = {
  CgWorkAlt: React.createElement(CgWorkAlt),
  FaReact: React.createElement(FaReact),
  LuGraduationCap: React.createElement(LuGraduationCap),
};

const items = [...experiencesData];
const total = items.length;

export default function Experience() {
  const { ref } = useSectionInView("Experience");
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1); // 1 = kanan, -1 = kiri
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragDelta = useRef(0);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  // ── Navigasi ──────────────────────────────────────────────────────────────
  const goTo = useCallback(
    (index: number, dir: 1 | -1) => {
      setDirection(dir);
      setCurrent(((index % total) + total) % total);
    },
    []
  );

  const prev = useCallback(() => {
    goTo(current - 1, -1);
  }, [current, goTo]);

  const next = useCallback(() => {
    goTo(current + 1, 1);
  }, [current, goTo]);

  // ── Autoplay ──────────────────────────────────────────────────────────────
  const resetAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % total);
    }, 4500);
  }, []);

  useEffect(() => {
    resetAutoplay();
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [resetAutoplay]);

  // ── Drag / Swipe ──────────────────────────────────────────────────────────
  const handlePointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
    dragDelta.current = 0;
    setIsDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    dragDelta.current = e.clientX - dragStartX.current;
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = 60;
    if (dragDelta.current < -threshold) {
      next();
      resetAutoplay();
    } else if (dragDelta.current > threshold) {
      prev();
      resetAutoplay();
    }
  };

  // ── Framer variants ───────────────────────────────────────────────────────
  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
      scale: 0.96,
    }),
  };

  const item = items[current];

  return (
    <section id="experience" ref={ref} className="w-full scroll-mt-28 mb-10">
      <SectionHeading>Work Experiences</SectionHeading>

      <div className="mt-10 relative px-2 sm:px-0">
        {/* ── Slide wrapper ─────────────────────────────────────────────── */}
        <div
          className="relative overflow-hidden rounded-2xl cursor-grab active:cursor-grabbing select-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.32, 0, 0.67, 0] }}
              className="w-full"
            >
              {/* ── Card ──────────────────────────────────────────────── */}
              <div className="bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-brand-violet/20 rounded-2xl overflow-hidden">

                {/* Mobile layout */}
                <div className="flex flex-col md:hidden">
                  {item.image && (
                    <div className="relative w-full h-48 shrink-0">
                      {/* @ts-ignore */}
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="100vw"
                        draggable={false}
                      />
                    </div>
                  )}
                  <div className="flex flex-col gap-3 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="font-bold text-base text-black dark:text-white leading-tight">
                          {item.title}
                        </h3>
                        <p className="text-xs font-bold text-black dark:text-white mt-0.5">
                          {item.location}
                        </p>
                      </div>
                      <div className="bg-brand-violet/10 p-2 rounded-full text-base flex items-center justify-center border border-brand-violet/20 shrink-0">
                        {iconMap[item.icon as string] || item.icon}
                      </div>
                    </div>
                    <p className="text-xs leading-relaxed text-black dark:text-white/70">
                      {item.description}
                    </p>
                    <div className="font-mono text-[10px] font-bold text-black dark:text-white bg-brand-violet/10 self-start px-3 py-1 rounded-full">
                      {item.date}
                    </div>
                  </div>
                </div>

                {/* Desktop layout */}
                <div className="hidden md:flex flex-row h-72 lg:h-80">
                  <div className="flex-1 flex flex-col gap-4 p-8 lg:p-10 text-left overflow-hidden">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h3 className="font-bold capitalize text-xl lg:text-2xl text-black dark:text-white leading-tight">
                          {item.title}
                        </h3>
                        <p className="font-bold text-sm lg:text-base text-black dark:text-white mt-1">
                          {item.location}
                        </p>
                      </div>
                      <div className="bg-brand-violet/10 p-3 rounded-full text-xl flex items-center justify-center border border-brand-violet/20 shrink-0">
                        {iconMap[item.icon as string] || item.icon}
                      </div>
                    </div>
                    <p className="leading-relaxed text-black dark:text-white/70 text-xs lg:text-sm line-clamp-5">
                      {item.description}
                    </p>
                    <div className="mt-auto font-mono text-xs font-bold text-black dark:text-white bg-brand-violet/10 self-start px-4 py-2 rounded-full whitespace-nowrap">
                      {item.date}
                    </div>
                  </div>
                  {item.image && (
                    <div className="w-[45%] relative border-l border-brand-violet/15 overflow-hidden shrink-0">
                      {/* @ts-ignore */}
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-110"
                        sizes="45vw"
                        draggable={false}
                      />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Tombol Prev / Next ────────────────────────────────────────── */}
        <button
          onClick={() => { prev(); resetAutoplay(); }}
          aria-label="Previous experience"
          className="
            absolute left-0 sm:-left-5 top-1/2 -translate-y-1/2 z-10
            w-9 h-9 rounded-full
            bg-white/90 dark:bg-black/80 border border-brand-violet/30
            flex items-center justify-center
            text-black dark:text-white
            shadow-md hover:shadow-glow-violet hover:border-brand-violet/60
            transition-all hover:scale-110 active:scale-95
          "
        >
          <FiChevronLeft className="text-lg" />
        </button>

        <button
          onClick={() => { next(); resetAutoplay(); }}
          aria-label="Next experience"
          className="
            absolute right-0 sm:-right-5 top-1/2 -translate-y-1/2 z-10
            w-9 h-9 rounded-full
            bg-white/90 dark:bg-black/80 border border-brand-violet/30
            flex items-center justify-center
            text-black dark:text-white
            shadow-md hover:shadow-glow-violet hover:border-brand-violet/60
            transition-all hover:scale-110 active:scale-95
          "
        >
          <FiChevronRight className="text-lg" />
        </button>

        {/* ── Dot Indicators ───────────────────────────────────────────── */}
        <div className="flex items-center justify-center gap-2 mt-5">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => { goTo(i, i > current ? 1 : -1); resetAutoplay(); }}
              aria-label={`Go to experience ${i + 1}`}
              className={`
                rounded-full transition-all duration-300
                ${i === current
                  ? "w-6 h-2 bg-brand-violet"
                  : "w-2 h-2 bg-brand-violet/30 hover:bg-brand-violet/60"
                }
              `}
            />
          ))}
        </div>

        {/* ── Counter kecil ─────────────────────────────────────────────── */}
        <p className="text-center text-xs text-black/40 dark:text-white/30 mt-2 font-mono">
          {current + 1} / {total}
        </p>
      </div>
    </section>
  );
}
