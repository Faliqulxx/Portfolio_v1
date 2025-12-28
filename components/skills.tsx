"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { skilss } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";
import Image from "next/image";
import BurstBload2 from "./burst-bload-2";

// Duplikat array untuk infinite effect
const loopedSkills = [...skilss, ...skilss, ...skilss, ...skilss, ...skilss];

export default function Skills() {
  const { ref } = useSectionInView("Skills");

  return (
    <section
      id="skills"
      ref={ref}
      className="mb-28 max-w-[100vw] overflow-hidden scroll-mt-28 text-center sm:mb-40"
    >
      <div className="bg-emerald-400 absolute -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] dark:bg-[#183D3D]"></div>

      <div className="flex justify-center items-center mb-10 gap-2">
        <SectionHeading>My Skills</SectionHeading>
        <BurstBload2 />
      </div>

      <motion.div
        className="flex gap-8 animate-slide"
        initial={{ x: 0 }}
        animate={{ x: "-50%" }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        }}
      >
        {loopedSkills.map((skill, index) => (
          <div key={index} className="flex-shrink-0">
            <div className="flex justify-center items-center">
              <Image
                src={skill.imgUrl}
                alt={`Skill ${skill.id}`}
                width="192"
                height="192"
                quality={95}
                priority={true}
                className="md:w-16 w-6"
              />
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
