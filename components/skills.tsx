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
      className="w-full mb-28 sm:mb-32 lg:mb-40 xl:mb-48 overflow-hidden scroll-mt-28 text-center"
    >
      <div className="flex justify-center items-center mb-10 gap-2">
        <SectionHeading>Tools & Technologies</SectionHeading>
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
                className="w-8 sm:w-12 md:w-16 lg:w-24 xl:w-28 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
