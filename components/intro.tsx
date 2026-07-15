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

export default function Intro() {
  const { ref } = useSectionInView("Home", 0.5);

  return (
    <section
      id="home"
      ref={ref}
      className="w-full mb-28 sm:mb-32 lg:mb-40 xl:mb-48 scroll-mt-[28rem]"
    >
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16 text-center lg:text-left">
        {/* TEKS (KIRI) */}
        <div className="max-w-2xl 2xl:max-w-3xl">
          <motion.h1
            className="mb-3 text-[clamp(2.5rem,5vw,4.5rem)] font-bold tracking-tighter leading-tight"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="font-bold">Faliqul Ishbah.</span>
          </motion.h1>

          <motion.h4
            className="mb-8 text-lg sm:text-xl lg:text-2xl leading-relaxed"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
          >
            I have hands-on experience in{" "}
            <span className="font-bold">
              Data Science, Data Analysis, AI Automation, IoT Development, and
              Frontend Development
            </span>
            , with expertise in <span className="font-bold">React</span>,{" "}
            <span className="font-bold">n8n</span>,{" "}
            <span className="font-bold">Python</span>, and{" "}
            <span className="font-bold">SQL</span>.
          </motion.h4>

          {/* BUTTON */}
          <motion.div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="#contact"
              className="group bg-gray-900 text-white dark:bg-white dark:text-gray-900 px-7 py-3 flex items-center gap-2 rounded-full hover:-translate-y-0.5 hover:shadow-md transition-all font-medium shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 dark:focus-visible:ring-gray-300 dark:focus-visible:ring-offset-gray-950"
            >
              Contact Me
              <BsArrowRight className="group-hover:translate-x-1 transition" />
            </Link>

            <a
              href="/cv/resumev3.pdf"
              download
              className="group bg-white dark:bg-white/10 text-gray-900 dark:text-white/80 border border-gray-200 dark:border-white/10 px-7 py-3 flex items-center gap-2 rounded-full hover:-translate-y-0.5 hover:shadow-md transition-all font-medium shadow-sm backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 dark:focus-visible:ring-gray-300 dark:focus-visible:ring-offset-gray-950"
            >
              Download CV
              <HiDownload className="group-hover:translate-y-1 transition" />
            </a>
          </motion.div>
        </div>

        {/* FOTO (KANAN) + SOSIAL MEDIA */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "tween", duration: 0.2 }}
          className="flex flex-col items-center gap-4 flex-shrink-0"
        >
          <Image
            src="/images/profile.png"
            alt="Faliqul Ishbah"
            width={192}
            height={192}
            className="w-32 h-32 sm:w-40 sm:h-40 lg:w-56 lg:h-56 xl:w-64 xl:h-64 rounded-full object-cover border-[0.35rem] border-white shadow-xl"
          />

          {/* SOSIAL MEDIA */}
          <div className="flex flex-row items-center justify-center gap-3 text-lg mt-5">
            {/* LinkedIn */}
            <a
              className="group bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-4 text-gray-700 dark:text-white/70 hover:bg-gray-100 dark:hover:text-white rounded-full transition-all duration-300 shadow-sm hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 dark:focus-visible:ring-gray-300 dark:focus-visible:ring-offset-gray-950"
              href="https://www.linkedin.com/in/faliqulishbah/"
              target="_blank"
            >
              <BsLinkedin className="transition group-hover:text-gray-900 dark:group-hover:text-white" />
            </a>

            {/* Email */}
            <a
              className="group bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-4 text-gray-700 dark:text-white/70 hover:bg-gray-100 dark:hover:text-white rounded-full transition-all duration-300 shadow-sm hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 dark:focus-visible:ring-gray-300 dark:focus-visible:ring-offset-gray-950"
              href="mailto:faliqul.isback@gmail.com"
              target="_blank"
            >
              <RiMailSendLine className="transition group-hover:text-gray-900 dark:group-hover:text-white" />
            </a>

            {/* GitHub */}
            <a
              className="group bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-4 text-gray-700 dark:text-white/70 hover:bg-gray-100 dark:hover:text-white rounded-full transition-all duration-300 shadow-sm hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 dark:focus-visible:ring-gray-300 dark:focus-visible:ring-offset-gray-950"
              href="https://github.com/Faliqulxx"
              target="_blank"
            >
              <FaGithubSquare className="transition group-hover:text-gray-900 dark:group-hover:text-white" />
            </a>

            {/* Instagram */}
            <a
              className="group bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-4 text-gray-700 dark:text-white/70 hover:bg-gray-100 dark:hover:text-white rounded-full transition-all duration-300 shadow-sm hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 dark:focus-visible:ring-gray-300 dark:focus-visible:ring-offset-gray-950"
              href="https://www.instagram.com/Faliqulx/"
              target="_blank"
            >
              <BsInstagram className="transition group-hover:text-gray-900 dark:group-hover:text-white" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
