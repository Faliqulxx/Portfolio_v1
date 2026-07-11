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
import { FiCalendar, FiMapPin, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { PiMedalFill } from "react-icons/pi";

import {
  personalData,
  contactData,
  certificatesData,
  educationData,
  galleryData,
} from "@/lib/data";

// ─── TYPES ───────────────────────────────────────────────────────────────────
type Tab = "general" | "education" | "gallery";

// ─── TAB BUTTON ──────────────────────────────────────────────────────────────
function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        relative px-6 py-2 rounded-full text-sm font-medium
        transition-all duration-300
        ${
          active
            ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-md"
            : "text-gray-500 dark:text-white/50 hover:text-gray-900 dark:hover:text-white"
        }
      `}
    >
      {children}
    </button>
  );
}

// ─── BIO TEXT (bold keywords) ─────────────────────────────────────────────────
function BioText() {
  const highlights = [
    "Data Science",
    "Data Analysis",
    "AI Automation",
    "Internet of Things (IoT)",
    "data processing",
    "data analysis",
    "data visualization",
    "machine learning",
    "valuable insights",
    "Python, Pandas, Scikit-learn, and SQL",
    "automated workflows",
    "n8n",
    "RESTful APIs",
    "IoT systems",
    "livestock farming",
    "smart agriculture",
    "impactful data-driven, AI-powered, and IoT-based solutions",
  ];

  function renderWithBold(text: string) {
    const pattern = new RegExp(
      `(${highlights
        .map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
        .join("|")})`,
      "g"
    );
    const parts = text.split(pattern);
    return parts.map((part, i) =>
      highlights.includes(part) ? (
        <span key={i} className="font-semibold text-gray-900 dark:text-white">
          {part}
        </span>
      ) : (
        part
      )
    );
  }

  // Split bio into ~4 paragraph chunks
  const sentences = personalData.bio.match(/[^.!?]+[.!?]+/g) ?? [personalData.bio];
  const chunkSize = Math.ceil(sentences.length / 4);
  const chunks: string[][] = [];
  for (let i = 0; i < sentences.length; i += chunkSize) {
    chunks.push(sentences.slice(i, i + chunkSize));
  }

  return (
    <div className="leading-9 text-lg text-gray-700 dark:text-white/80 space-y-6">
      {chunks.map((chunk, i) => (
        <p key={i}>{renderWithBold(chunk.join(" "))}</p>
      ))}
    </div>
  );
}

// ─── GENERAL TAB ─────────────────────────────────────────────────────────────
function GeneralTab({ onImageClick }: { onImageClick: (src: string) => void }) {
  return (
    <div className="flex flex-col lg:flex-row items-start gap-16">
      {/* BIO */}
      <div className="flex-1 text-left">
        <BioText />
      </div>

      {/* CERTIFICATES + SOCMED */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full lg:w-[420px]"
      >
        <p className="text-center text-xs font-semibold text-gray-400 dark:text-white/40 mb-4 uppercase tracking-widest">
          Certificates
        </p>
        <div className="grid grid-cols-2 gap-4 max-h-[520px] overflow-y-auto pr-2 custom-scrollbar">
          {certificatesData.map((cert, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.2 }}
              onClick={() => onImageClick(cert.image)}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-lg hover:shadow-2xl cursor-pointer"
            >
              <div className="relative w-full h-[140px]">
                <Image src={cert.image} alt={cert.name} fill className="object-cover" />
              </div>
              <div className="px-2 py-1.5">
                <p className="text-xs text-gray-600 dark:text-white/60 truncate">{cert.name}</p>
                <p className="text-[10px] text-gray-400 dark:text-white/30">{cert.issuer}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* SOCIAL MEDIA */}
        <div className="flex justify-center gap-4 text-2xl mt-8">
          <a href={contactData.linkedin} target="_blank" rel="noreferrer"
            className="social-btn hover:bg-[#0077B5] transition-all duration-300">
            <BsLinkedin />
          </a>
          <a href={`mailto:${contactData.email}`} target="_blank" rel="noreferrer"
            className="social-btn hover:bg-[#D44638] transition-all duration-300">
            <RiMailSendLine />
          </a>
          <a href={contactData.github} target="_blank" rel="noreferrer"
            className="social-btn hover:bg-black transition-all duration-300">
            <FaGithubSquare />
          </a>
          <a href={contactData.instagram} target="_blank" rel="noreferrer"
            className="social-btn hover:bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] transition-all duration-300">
            <BsInstagram />
          </a>
        </div>
      </motion.div>
    </div>
  );
}

// ─── EDUCATION CARD ───────────────────────────────────────────────────────────
function EducationCard({
  edu,
  index,
}: {
  edu: (typeof educationData)[number];
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const hasDetails = edu.details && edu.details.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.1 }}
      className="w-full bg-white/60 dark:bg-white/5 backdrop-blur-sm border border-gray-200/60 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      style={{ contain: "layout" }}
    >
      {/* MAIN ROW */}
      <div className="flex items-start gap-5 p-5">
        {/* LOGO */}
        <div className="flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 bg-white flex items-center justify-center shadow-sm">
          <Image
            src={edu.logo}
            alt={edu.institution}
            width={56}
            height={56}
            className="object-contain p-1"
          />
        </div>

        {/* INFO */}
        <div className="flex-1 min-w-0">

          {/* ROW 1: Degree (flex-1) | Tahun | Lokasi — semua dalam satu baris */}
          <div className="flex items-center gap-4 flex-wrap">
            <h3 className="text-base font-bold text-gray-900 dark:text-white leading-tight mr-auto">
              🎓 {edu.degree}
            </h3>
            <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-white/50 whitespace-nowrap flex-shrink-0">
              <FiCalendar className="text-gray-400 dark:text-white/30" />
              {edu.year}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-white/50 whitespace-nowrap flex-shrink-0">
              <FiMapPin className="text-gray-400 dark:text-white/30" />
              {edu.location}
            </span>
          </div>

          {/* ROW 2: Institution */}
          <p className="text-sm font-medium text-gray-600 dark:text-white/70 mt-1.5">
            {edu.institution}
          </p>

          {/* ROW 3: Field */}
          {edu.field && (
            <p className="text-xs text-gray-400 dark:text-white/40 mt-0.5">
              Field: {edu.field}
            </p>
          )}

          {/* ROW 4: GPA badge — standalone kiri, bukan sejajar kanan */}
          {edu.gpa && (
            <div className="mt-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 px-3 py-1 rounded-full">
                <PiMedalFill className="flex-shrink-0" />
                GPA: {edu.gpa}/{edu.gpaMax}
              </span>
            </div>
          )}

        </div>
      </div>

      {/* SHOW DETAILS TOGGLE */}
      {hasDetails && (
        <>
          <button
            onClick={() => setOpen((v) => !v)}
            className="w-full flex items-center gap-1.5 px-5 pb-4 text-xs font-semibold text-indigo-500 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
          >
            {open ? (
              <>
                <FiChevronUp /> Hide Details
              </>
            ) : (
              <>
                <FiChevronDown /> Show Details
              </>
            )}
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <ul className="px-5 pb-5 space-y-2 border-t border-gray-100 dark:border-white/5 pt-4">
                  {edu.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-white/60">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </motion.div>
  );
}

// ─── EDUCATION TAB ───────────────────────────────────────────────────────────
function EducationTab() {
  return (
    <div className="max-w-3xl mx-auto w-full space-y-4">
      {[...educationData].reverse().map((edu, index) => (
        <EducationCard key={index} edu={edu} index={index} />
      ))}
    </div>
  );
}

// ─── GALLERY TAB ─────────────────────────────────────────────────────────────
function GalleryTab({ onImageClick }: { onImageClick: (src: string) => void }) {
  return (
    <div className="columns-2 md:columns-3 gap-4 space-y-4 max-w-4xl mx-auto">
      {galleryData.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.06 }}
          onClick={() => onImageClick(item.src)}
          className="relative overflow-hidden rounded-2xl cursor-pointer group border border-white/10 break-inside-avoid"
        >
          <div
            className="relative w-full"
            style={{ aspectRatio: index % 3 === 1 ? "4/5" : "4/3" }}
          >
            <Image
              src={item.src}
              alt={item.caption}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <p className="text-white text-sm font-medium">{item.caption}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function About() {
  const { ref } = useSectionInView("About");
  const [activeTab, setActiveTab] = useState<Tab>("general");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const tabs: { key: Tab; label: string }[] = [
    { key: "general", label: "General" },
    { key: "education", label: "Education" },
    { key: "gallery", label: "Gallery" },
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
        {/* HEADING */}
        <div className="flex justify-center mb-8 relative">
          <SectionHeading>About Me</SectionHeading>
          <BurstBload />
        </div>

        {/* TAB BUTTONS */}
        <div className="flex justify-center mb-10">
          <div className="flex gap-1 p-1 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10">
            {tabs.map((tab) => (
              <TabButton
                key={tab.key}
                active={activeTab === tab.key}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </TabButton>
            ))}
          </div>
        </div>

        {/* TAB CONTENT */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
          >
            {activeTab === "general" && <GeneralTab onImageClick={setSelectedImage} />}
            {activeTab === "education" && <EducationTab />}
            {activeTab === "gallery" && <GalleryTab onImageClick={setSelectedImage} />}
          </motion.div>
        </AnimatePresence>
      </motion.section>

      {/* IMAGE LIGHTBOX */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-5 right-5 text-white text-4xl hover:rotate-90 transition"
            >
              <IoClose />
            </button>
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
                alt="Preview"
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