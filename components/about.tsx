"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import SectionHeading from "./section-heading";
import BurstBload from "./burst-bload";
import { useSectionInView } from "@/lib/hooks";

import { BsLinkedin, BsInstagram } from "react-icons/bs";
import { RiMailSendLine } from "react-icons/ri";
import { FaGithubSquare } from "react-icons/fa";

export default function About() {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      ref={ref}
      id="about"
      className="mb-28 max-w-6xl mx-auto scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
    >
      {/* JUDUL TETAP DI TENGAH */}
      <div className="flex justify-center mb-10 relative">
        <SectionHeading>👨‍💻 About Me</SectionHeading>
        <BurstBload />
      </div>

      {/* KONTEN */}
      <div className="flex flex-col sm:flex-row items-start gap-12">
        {/* TEKS (KIRI) */}
        <div className="flex-1 text-left">
          <p className="mt-4 leading-8 text-gray-700 dark:text-white/80">
            Hello, I’m Faliq! I am dedicated and primarily focused on{" "}
            <span className="font-medium">Data Science</span>, supported by strong
            skills in <span className="font-medium">Data Analysis</span> and{" "}
            <span className="font-medium">AI Automation</span>.
            <br />
            <br />
            I have experience in{" "}
            <span className="font-medium">data processing</span>,{" "}
            <span className="font-medium">analysis</span>,{" "}
            <span className="font-medium">visualization</span>, and{" "}
            <span className="font-medium">machine learning</span>, transforming
            raw data into{" "}
            <span className="font-medium">actionable insights</span> using{" "}
            <span className="font-medium">
              Python, Pandas, Scikit-learn, SQL
            </span>
            .
            <br />
            <br />
            In AI Automation, I build{" "}
            <span className="font-medium">automated workflows</span> using{" "}
            <span className="font-medium">n8n</span>, integrate{" "}
            <span className="font-medium">RESTful APIs</span>, and automate data
            pipelines to improve operational efficiency.
            <br />
            <br />
            My goal is to deliver{" "}
            <span className="font-medium">
              impactful data & AI-driven solutions
            </span>{" "}
            through meaningful automation.
          </p>
        </div>

        {/* FOTO + SOSIAL MEDIA (KANAN) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center gap-5 flex-shrink-0"
        >
          <Image
            src="/images/profile2.png"
            alt="Faliqul Ishbah"
            width={200}
            height={200}
            
          />

          {/* SOSIAL MEDIA */}
          <div className="flex gap-3 text-lg">
            <a
              href="https://www.linkedin.com/in/faliqulishbah/"
              target="_blank"
              className="social-btn hover:bg-[#0077B5]"
            >
              <BsLinkedin />
            </a>

            <a
              href="mailto:faliqul.isback@gmail.com"
              target="_blank"
              className="social-btn hover:bg-[#D44638]"
            >
              <RiMailSendLine />
            </a>

            <a
              href="https://github.com/Faliqulxx"
              target="_blank"
              className="social-btn hover:bg-black"
            >
              <FaGithubSquare />
            </a>

            <a
              href="https://www.instagram.com/Faliqulx/"
              target="_blank"
              className="social-btn hover:bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF]"
            >
              <BsInstagram />
            </a>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
