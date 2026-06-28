"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import SectionHeading from "./section-heading";
import BurstBload from "./burst-bload";
import { useSectionInView } from "@/lib/hooks";

import { BsLinkedin, BsInstagram } from "react-icons/bs";
import { RiMailSendLine } from "react-icons/ri";
import { FaGithubSquare } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

export default function About() {
  const { ref } = useSectionInView("About");

  // STATE POPUP
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // DATA CERTIFICATE
  const certificates = [
    "/images/certificate/ciscop.jpg",
    "/images/certificate/udemy.jpg",
    "/images/certificate/udemy1.jpg",
    "/images/certificate/dicoding.jpg",
    "/images/certificate/dicoding1.jpg",
    "/images/certificate/its.png",
    "/images/certificate/meta.png",
  ];

  return (
    <>
      <motion.section
        ref={ref}
        id="about"
        className="mb-28 max-w-7xl mx-auto px-4 scroll-mt-28"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.175 }}
      >
        {/* JUDUL */}
        <div className="flex justify-center mb-12 relative">
          <SectionHeading> Tentang Saya</SectionHeading>
          <BurstBload />
        </div>

        {/* KONTEN */}
        <div className="flex flex-col lg:flex-row items-start gap-16">

          {/* ================= TEXT ================= */}
          <div className="flex-1 text-left">
            <p className="leading-9 text-lg text-gray-700 dark:text-white/80">
              Halo, saya Faliq! Saya memiliki minat dan fokus utama pada{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                Data Science
              </span>
              , didukung dengan kemampuan dalam{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                Data Analysis
              </span>
              ,{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                AI Automation
              </span>
              , dan{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                Internet of Things (IoT)
              </span>
              .
              <br />
              <br />
              Saya memiliki pengalaman dalam{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                pengolahan data
              </span>
              ,{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                analisis
              </span>
              ,{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                visualisasi data
              </span>
              , serta{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                machine learning
              </span>
              , untuk mengubah data mentah menjadi{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                insight yang bermanfaat
              </span>{" "}
              menggunakan{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                Python, Pandas, Scikit-learn, dan SQL
              </span>
              .
              <br />
              <br />
              Dalam bidang AI Automation, saya membangun{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                workflow otomatis
              </span>{" "}
              menggunakan{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                n8n
              </span>
              , mengintegrasikan{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                RESTful API
              </span>
              , serta mengotomatisasi pipeline data untuk meningkatkan efisiensi
              operasional.
              <br />
              <br />
              Saya juga memiliki ketertarikan dan pengalaman dalam pengembangan{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                sistem IoT
              </span>
              , monitoring perangkat berbasis sensor, serta implementasi teknologi
              untuk{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                peternakan
              </span>{" "}
              dan{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                perkebunan pintar
              </span>{" "}
              guna meningkatkan efisiensi monitoring dan otomatisasi.
              <br />
              <br />
              Tujuan saya adalah menciptakan{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                solusi berbasis data, AI, dan IoT yang berdampak
              </span>{" "}
              melalui automasi yang inovatif dan bermanfaat.
            </p>
          </div>

          {/* ================= CERTIFICATE ================= */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full lg:w-[420px]"
          >

            {/* SCROLL AREA */}
            <div
              className="
                grid grid-cols-2 gap-4
                max-h-[560px]
                overflow-y-auto
                pr-2
                custom-scrollbar
              "
            >
              {certificates.map((cert, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setSelectedImage(cert)}
                  className="
                    relative
                    overflow-hidden
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/5
                    backdrop-blur-sm
                    shadow-lg
                    hover:shadow-2xl
                    cursor-pointer
                    flex-shrink-0
                  "
                >
                  <div className="relative w-full h-[160px]">
                    <Image
                      src={cert}
                      alt={`Certificate ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* SOCIAL MEDIA */}
            <div className="flex justify-center gap-4 text-2xl mt-8">
              <a
                href="https://www.linkedin.com/in/faliqulishbah/"
                target="_blank"
                rel="noreferrer"
                className="
                  social-btn
                  hover:bg-[#0077B5]
                  transition-all
                  duration-300
                "
              >
                <BsLinkedin />
              </a>

              <a
                href="mailto:faliqul.isback@gmail.com"
                target="_blank"
                rel="noreferrer"
                className="
                  social-btn
                  hover:bg-[#D44638]
                  transition-all
                  duration-300
                "
              >
                <RiMailSendLine />
              </a>

              <a
                href="https://github.com/Faliqulxx"
                target="_blank"
                rel="noreferrer"
                className="
                  social-btn
                  hover:bg-black
                  transition-all
                  duration-300
                "
              >
                <FaGithubSquare />
              </a>

              <a
                href="https://www.instagram.com/Faliqulx/"
                target="_blank"
                rel="noreferrer"
                className="
                  social-btn
                  hover:bg-gradient-to-tr
                  from-[#F58529]
                  via-[#DD2A7B]
                  to-[#8134AF]
                  transition-all
                  duration-300
                "
              >
                <BsInstagram />
              </a>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ================= POPUP IMAGE ================= */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="
              fixed inset-0 z-50
              bg-black/80 backdrop-blur-sm
              flex items-center justify-center
              p-4
            "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setSelectedImage(null)}
              className="
                absolute top-5 right-5
                text-white text-4xl
                hover:rotate-90
                transition
              "
            >
              <IoClose />
            </button>

            {/* IMAGE */}
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-5xl h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Certificate Preview"
                fill
                className="object-contain rounded-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}