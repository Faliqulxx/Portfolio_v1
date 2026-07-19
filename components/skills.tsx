"use client";

import React, { useEffect, useRef, useState } from "react";
import SectionHeading from "./section-heading";
import { skilss } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import Image from "next/image";
import BurstBload2 from "./burst-bload-2";

type MarqueeSkillRowProps = {
  skills: typeof skilss;
  direction: 1 | -1;
  speed?: number;
  offset?: number;
};

function AnimatedSkillIcon({ skill }: { skill: any }) {
  const [isHighlighted, setIsHighlighted] = useState(false);

  useEffect(() => {
    // Random delay awal agar tidak semua berjalan bersamaan
    const initialDelay = Math.random() * 5000;
    
    const timeout = setTimeout(() => {
      // Loop pengecekan secara acak
      const interval = setInterval(() => {
        // Peluang 25% untuk menyala
        if (Math.random() > 0.75) {
          setIsHighlighted(true);
          // Mati kembali setelah 2-4 detik
          setTimeout(() => setIsHighlighted(false), 2000 + Math.random() * 2000);
        }
      }, 3000 + Math.random() * 3000); // Cek setiap 3-6 detik

      return () => clearInterval(interval);
    }, initialDelay);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex justify-center items-center">
      <Image
        src={skill.imgUrl}
        alt={`Skill ${skill.id}`}
        width={192}
        height={192}
        quality={95}
        priority={true}
        draggable={false}
        className={`w-6 sm:w-8 md:w-12 lg:w-16 xl:w-20 transition-all duration-1000 ${
          isHighlighted
            ? "grayscale-0 opacity-100 scale-110 drop-shadow-md"
            : "grayscale opacity-50 scale-100"
        } hover:grayscale-0 hover:opacity-100 hover:scale-110 hover:duration-300`}
      />
    </div>
  );
}

function MarqueeSkillRow({
  skills,
  direction,
  speed = 1,
  offset = 0,
}: MarqueeSkillRowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isPointerDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const pausedRef = useRef(false);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const rafRef = useRef<number>();
  const [isDragging, setIsDragging] = useState(false);

  // Untuk visual offset, reverse array untuk row tertentu
  const displaySkills = offset > 0 ? [...skills].reverse() : skills;
  const items = [...displaySkills, ...displaySkills];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (direction === -1 && container.scrollLeft === 0) {
      container.scrollLeft = container.scrollWidth / 2;
    }

    const step = () => {
      if (!pausedRef.current && container) {
        const halfWidth = container.scrollWidth / 2;
        container.scrollLeft += direction * speed;

        if (direction === 1 && container.scrollLeft >= halfWidth) {
          container.scrollLeft -= halfWidth;
        } else if (direction === -1 && container.scrollLeft <= 0) {
          container.scrollLeft += halfWidth;
        }
      }
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [direction, speed]);

  const getPageX = (e: React.MouseEvent | React.TouchEvent) =>
    "touches" in e ? e.touches[0].pageX : (e as React.MouseEvent).pageX;

  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    const container = containerRef.current;
    if (!container) return;
    isPointerDownRef.current = true;
    pausedRef.current = true;
    setIsDragging(true);
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    startXRef.current = getPageX(e) - container.offsetLeft;
    scrollLeftRef.current = container.scrollLeft;
  };

  const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    const container = containerRef.current;
    if (!isPointerDownRef.current || !container) return;
    const x = getPageX(e) - container.offsetLeft;
    const walk = x - startXRef.current;
    container.scrollLeft = scrollLeftRef.current - walk;
  };

  const endDrag = () => {
    isPointerDownRef.current = false;
    setIsDragging(false);
    resumeTimeoutRef.current = setTimeout(() => {
      pausedRef.current = false;
    }, 700);
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      pausedRef.current = true;
      container.scrollLeft += e.deltaY;
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = setTimeout(() => {
        pausedRef.current = false;
      }, 800);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`flex gap-8 md:gap-12 w-full overflow-x-hidden select-none no-scrollbar py-4 ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      onMouseDown={handlePointerDown}
      onMouseMove={handlePointerMove}
      onMouseUp={endDrag}
      onMouseLeave={endDrag}
      onTouchStart={handlePointerDown}
      onTouchMove={handlePointerMove}
      onTouchEnd={endDrag}
      onWheel={handleWheel}
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      {items.map((skill, index) => (
        <div key={`${skill.id}-${index}`} className="flex-shrink-0">
          <AnimatedSkillIcon skill={skill} />
        </div>
      ))}
    </div>
  );
}

export default function Skills() {
  const { ref } = useSectionInView("Skills");

  return (
    <section
      id="skills"
      ref={ref}
      className="w-full mb-28 sm:mb-32 lg:mb-40 xl:mb-48 overflow-hidden scroll-mt-28 text-center"
    >
      <div className="flex justify-center items-center mb-10 gap-2">
        <SectionHeading>Tech Stacks</SectionHeading>
        <BurstBload2 />
      </div>

      <div className="flex flex-col gap-6 mt-8">
        {/* Baris 1: Ke kiri */}
        <MarqueeSkillRow skills={skilss} direction={1} speed={1.2} />
        
        {/* Baris 2: Ke kanan */}
        <MarqueeSkillRow skills={skilss} direction={-1} speed={1} offset={1} />
        
        {/* Baris 3: Ke kiri */}
        <MarqueeSkillRow skills={skilss} direction={1} speed={1.5} offset={2} />
      </div>
    </section>
  );
}
