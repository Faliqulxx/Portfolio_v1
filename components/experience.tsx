"use client";

import React from "react";
import SectionHeading from "./section-heading";
import ScrollStack, { ScrollStackItem } from "./scroll-stack";
import { experiencesData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import Image from "next/image";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";

const iconMap: Record<string, React.ReactNode> = {
  CgWorkAlt: React.createElement(CgWorkAlt),
  FaReact: React.createElement(FaReact),
  LuGraduationCap: React.createElement(LuGraduationCap),
};

export default function Experience() {
  const { ref } = useSectionInView("Experience");

  return (
    <section
      id="experience"
      ref={ref}
      className="w-full scroll-mt-28 -mb-[40vh]"
    >
      <SectionHeading>Work Experiences</SectionHeading>

      {/* useWindowScroll={true} — no nested container, no scroll-trap */}
      <div className="mt-10">
        <ScrollStack
          useWindowScroll={true}
          itemDistance={120}
          itemScale={0.04}
          itemStackDistance={30}
          baseScale={0.88}
          blurAmount={2}
          stackPosition="15%"
          scaleEndPosition="8%"
        >
          {experiencesData.map((item, index) => (
            <ScrollStackItem
              key={index}
              itemClassName={[
                "!h-auto !my-5",
                "bg-white/80 dark:bg-white/5",
                "backdrop-blur-xl",
                "border border-brand-violet/20",
              ].join(" ")}
            >
              {/* ── Mobile (< md) ── */}
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

              {/* ── Desktop (≥ md) ── */}
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
                    />
                  </div>
                )}
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  );
}
