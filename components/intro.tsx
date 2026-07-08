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
      className="mb-28 max-w-[70rem] mx-auto scroll-mt-[28rem]"
    >
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 text-center lg:text-left">
        {/* TEKS (KIRI) */}
        <div className="max-w-xl">
          <motion.h1
            className="mb-3 text-2xl font-medium sm:text-4xl"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="font-bold">Faliqul Ishbah.</span>
          </motion.h1>

          <motion.h4
            className="mb-8 text-lg sm:text-xl leading-relaxed"
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
              className="group bg-gray-900 text-white px-7 py-3 flex items-center gap-2 rounded-full hover:scale-110 transition"
            >
              Contact Me
              <BsArrowRight className="group-hover:translate-x-1 transition" />
            </Link>

            <a
              href="/cv/resumev3.pdf"
              download
              className="group bg-gray-900 text-white px-7 py-3 flex items-center gap-2 rounded-full hover:scale-110 transition"
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
            className="h-40 w-40 rounded-full object-cover border-[0.35rem] border-white shadow-xl"
          />

          {/* SOSIAL MEDIA */}
          <div className="flex flex-row items-center justify-center gap-2 text-lg font-medium mt-5">
            {/* LinkedIn */}
            <a
              className="
      group
      bg-white
      p-4
      text-gray-700
      rounded-full
      transition-all
      duration-300
      cursor-pointer
      borderBlack
      dark:bg-white/10
      dark:text-white/60
      hover:bg-[#0077B5]
      hover:scale-110
    "
              href="https://www.linkedin.com/in/faliqulishbah/"
              target="_blank"
            >
              <BsLinkedin className="transition group-hover:text-white" />
            </a>

            {/* Email */}
            <a
              className="
      group
      bg-white
      p-4
      text-gray-700
      rounded-full
      transition-all
      duration-300
      cursor-pointer
      borderBlack
      dark:bg-white/10
      dark:text-white/60
      hover:bg-[#D44638]
      hover:scale-110
    "
              href="mailto:faliqul.isback@gmail.com"
              target="_blank"
            >
              <RiMailSendLine className="transition group-hover:text-white" />
            </a>

            {/* GitHub */}
            <a
              className="
      group
      bg-white
      p-4
      text-gray-700
      rounded-full
      transition-all
      duration-300
      cursor-pointer
      borderBlack
      dark:bg-white/10
      dark:text-white/60
      hover:bg-black
      hover:scale-110
    "
              href="https://github.com/Faliqulxx"
              target="_blank"
            >
              <FaGithubSquare className="transition group-hover:text-white" />
            </a>

            {/* Instagram */}
            <a
              className="
      group
      bg-white
      p-4
      text-gray-700
      rounded-full
      transition-all
      duration-300
      cursor-pointer
      borderBlack
      dark:bg-white/10
      dark:text-white/60
      hover:bg-gradient-to-tr
      from-[#F58529]
      via-[#DD2A7B]
      to-[#8134AF]
      hover:scale-110
    "
              href="https://www.instagram.com/Faliqulx/"
              target="_blank"
            >
              <BsInstagram className="transition group-hover:text-white" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
