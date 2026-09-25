"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowRight, BsLinkedin, BsInstagram } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import { FaGithubSquare } from "react-icons/fa";
import { RiMailSendLine } from "react-icons/ri";
import { useSectionInView } from "@/lib/hooks";
import { personalData } from "@/lib/data";
import { useCVPreview } from "@/context/cv-preview-context";
import CircularText from "./circular-text";
import ScrollVelocity from "@/app/components/ScrollVelocity/ScrollVelocity";

export default function Intro() {
  const { ref } = useSectionInView("Home", 0.5);
  const { openPreview } = useCVPreview();

  return (
    <section
      id="home"
      ref={ref}
      className="w-full mb-28 sm:mb-32 lg:mb-40 xl:mb-48 scroll-mt-[28rem]
        min-h-[calc(100vh-2.5rem)] md:min-h-[calc(100vh-9rem)]
        flex flex-col justify-between"
    >
      {/* ── HERO CONTENT ── */}
      <div className="flex-1 flex items-center w-full px-4 sm:px-8 lg:px-12">
        <div className="w-full max-w-[1600px] mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16 text-center lg:text-left">
          {/* TEKS (KIRI) */}
        <div className="max-w-2xl 2xl:max-w-3xl">
          <motion.h1
            className="mb-3 text-[clamp(2.5rem,5vw,4.5rem)] font-bold tracking-tighter leading-tight"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="font-bold text-gradient">Faliqul Ishbah.</span>
          </motion.h1>

          <motion.h4
            className="mb-8 text-lg sm:text-xl lg:text-2xl leading-relaxed text-black dark:text-white/75"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
          >
            I have hands-on experience in{" "}
            <span className="font-bold text-black dark:text-white">
              Data Science, Data Analysis, AI Automation, IoT Development, and
              Frontend Development
            </span>
            , with expertise in <span className="font-bold text-black dark:text-white">React</span>,{" "}
            <span className="font-bold text-black dark:text-white">n8n</span>,{" "}
            <span className="font-bold text-black dark:text-white">Python</span>, and{" "}
            <span className="font-bold text-black dark:text-white">SQL</span>.
          </motion.h4>

          {/* BUTTON */}
          <motion.div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="#contact"
              className="btn-brand px-7 py-3 flex items-center gap-2 rounded-full font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy"
            >
              Contact Me
              <BsArrowRight className="group-hover:translate-x-1 transition" />
            </Link>

            <button
              onClick={() =>
                openPreview(
                  "/cv/Faliqul Ishbah CV.pdf",
                  "/cv/Faliqul Ishbah CV.pdf",
                  "Faliqul Ishbah — CV"
                )
              }
              className="group bg-gray-100 dark:bg-white/5 border border-brand-violet/30 text-black dark:text-white/80 px-7 py-3 flex items-center gap-2 rounded-full hover:-translate-y-0.5 hover:border-brand-violet hover:shadow-glow-card transition-all font-medium backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet focus-visible:ring-offset-2"
            >
              Download CV
              <HiDownload className="group-hover:translate-y-1 transition" />
            </button>
          </motion.div>
        </div>

        {/* FOTO (KANAN) + SOSIAL MEDIA */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "tween", duration: 0.2 }}
          className="flex flex-col items-center gap-4 flex-shrink-0"
        >
          {/* Photo + CircularText ring */}
          <div className="relative flex items-center justify-center w-44 h-44 sm:w-56 sm:h-56 lg:w-72 lg:h-72 xl:w-80 xl:h-80">
            {/* Absolute wrapper fills the container — CircularText uses its own relative + ResizeObserver */}
            <div className="absolute inset-0 pointer-events-none z-0">
              <CircularText
                text="Available for Work * Available for Collaboration * "
                spinDuration={18}
                onHover="goBonkers"
                className="w-full h-full text-[0.52rem] sm:text-[0.58rem] lg:text-[0.68rem] xl:text-[0.72rem] text-black dark:text-white/60"
              />
            </div>

            {/* Profile photo — on top */}
            <Image
              src="/images/profile.png"
              alt="Faliqul Ishbah"
              width={256}
              height={256}
              className="w-32 h-32 sm:w-40 sm:h-40 lg:w-56 lg:h-56 xl:w-64 xl:h-64 rounded-full object-cover border-[0.35rem] border-white shadow-lg dark:border-white/10 dark:shadow-none z-10 relative"
            />
          </div>

          {/* SOSIAL MEDIA */}
          <div className="flex flex-row items-center justify-center gap-3 text-lg mt-5">
            {/* LinkedIn */}
            <a
              className="group bg-gray-100 dark:bg-white/5 border border-brand-violet/20 p-4 text-black dark:text-white/60 hover:text-black dark:hover:text-white hover:border-brand-violet/50 hover:bg-brand-violet/10 rounded-full transition-all duration-300 shadow-sm hover:-translate-y-0.5 hover:shadow-glow-violet focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet focus-visible:ring-offset-2"
              href="https://www.linkedin.com/in/faliqulishbah/"
              target="_blank"
            >
              <BsLinkedin className="transition" />
            </a>

            {/* Email */}
            <a
              className="group bg-gray-100 dark:bg-white/5 border border-brand-violet/20 p-4 text-black dark:text-white/60 hover:text-black dark:hover:text-white hover:border-brand-violet/50 hover:bg-brand-violet/10 rounded-full transition-all duration-300 shadow-sm hover:-translate-y-0.5 hover:shadow-glow-violet focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet focus-visible:ring-offset-2"
              href="mailto:faliqul.isback@gmail.com"
              target="_blank"
            >
              <RiMailSendLine className="transition" />
            </a>

            {/* GitHub */}
            <a
              className="group bg-gray-100 dark:bg-white/5 border border-brand-violet/20 p-4 text-black dark:text-white/60 hover:text-black dark:hover:text-white hover:border-brand-violet/50 hover:bg-brand-violet/10 rounded-full transition-all duration-300 shadow-sm hover:-translate-y-0.5 hover:shadow-glow-violet focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet focus-visible:ring-offset-2"
              href="https://github.com/Faliqulxx"
              target="_blank"
            >
              <FaGithubSquare className="transition" />
            </a>

            {/* Instagram */}
            <a
              className="group bg-gray-100 dark:bg-white/5 border border-brand-violet/20 p-4 text-black dark:text-white/60 hover:text-black dark:hover:text-white hover:border-brand-violet/50 hover:bg-brand-violet/10 rounded-full transition-all duration-300 shadow-sm hover:-translate-y-0.5 hover:shadow-glow-violet focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet focus-visible:ring-offset-2"
              href="https://www.instagram.com/Faliqulx/"
              target="_blank"
            >
              <BsInstagram className="transition" />
            </a>
          </div>
        </motion.div>
      </div>
      </div>

      {/* ── SCROLL VELOCITY TEXT — Tembus ke kanan dan kiri (Full Bleed) ── */}
      <div className="w-full overflow-hidden pb-4">
        <ScrollVelocity
          texts={[
            "| Data Scientist | Data Analyst | AI Automation | IoT Developer | Frontend Developer",
            "Scroll Down",
          ]}
          velocity={100}
          className="custom-scroll-text"
        />
      </div>
    </section>
  );
}
