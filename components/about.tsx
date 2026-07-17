"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const Masonry = dynamic(() => import("@/components/Masonry"), { ssr: false });

import SectionHeading from "./section-heading";
import BurstBload from "./burst-bload";
import { useSectionInView } from "@/lib/hooks";

import { BsLinkedin, BsInstagram } from "react-icons/bs";
import { RiMailSendLine } from "react-icons/ri";
import { FaGithubSquare } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FiCalendar, FiMapPin, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { PiMedalFill } from "react-icons/pi";
import BorderGlow from "./animations/BorderGlow";

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
        <span key={i} className="font-semibold text-indigo-600 dark:text-indigo-400">
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
    <div className="leading-9 text-lg xl:text-xl text-gray-700 dark:text-white/80 space-y-6 max-w-[80ch]">
      {chunks.map((chunk, i) => (
        <p key={i}>{renderWithBold(chunk.join(" "))}</p>
      ))}
    </div>
  );
}

// ─── GENERAL TAB ─────────────────────────────────────────────────────────────
function GeneralTab({ onImageClick }: { onImageClick: (src: string) => void }) {
  return (
    <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
      {/* BIO */}
      <div className="flex-1 text-left">
        <BioText />
      </div>

      {/* CERTIFICATES + SOCMED */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full lg:w-[500px] xl:w-[700px] 2xl:w-[800px]"
      >
        <p className="text-center text-xs font-semibold text-gray-400 dark:text-white/40 mb-4 uppercase tracking-widest">
          Certificates
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
          {certificatesData.map((cert, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              onClick={() => onImageClick(cert.image)}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-lg hover:shadow-2xl cursor-pointer"
            >
              <div className="relative w-full aspect-[4/3]">
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
            className="social-btn group bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-3 text-gray-700 dark:text-white/70 hover:bg-gray-100 dark:hover:text-white rounded-full transition-all duration-300 shadow-sm hover:scale-105">
            <BsLinkedin className="transition group-hover:text-gray-900 dark:group-hover:text-white" />
          </a>
          <a href={`mailto:${contactData.email}`} target="_blank" rel="noreferrer"
            className="social-btn group bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-3 text-gray-700 dark:text-white/70 hover:bg-gray-100 dark:hover:text-white rounded-full transition-all duration-300 shadow-sm hover:scale-105">
            <RiMailSendLine className="transition group-hover:text-gray-900 dark:group-hover:text-white" />
          </a>
          <a href={contactData.github} target="_blank" rel="noreferrer"
            className="social-btn group bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-3 text-gray-700 dark:text-white/70 hover:bg-gray-100 dark:hover:text-white rounded-full transition-all duration-300 shadow-sm hover:scale-105">
            <FaGithubSquare className="transition group-hover:text-gray-900 dark:group-hover:text-white" />
          </a>
          <a href={contactData.instagram} target="_blank" rel="noreferrer"
            className="social-btn group bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-3 text-gray-700 dark:text-white/70 hover:bg-gray-100 dark:hover:text-white rounded-full transition-all duration-300 shadow-sm hover:scale-105">
            <BsInstagram className="transition group-hover:text-gray-900 dark:group-hover:text-white" />
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
      className="w-full"
      style={{ contain: "layout" }}
    >
      <BorderGlow
        className="w-full shadow-sm hover:shadow-md transition-shadow"
        edgeSensitivity={30}
        glowColor="40 80 80"
        backgroundColor="#120F17"
        borderRadius={44}
        glowRadius={40}
        glowIntensity={1}
        coneSpread={25}
        animated={false}
        colors={['#c084fc', '#f472b6', '#38bdf8']}
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
            className="mx-5 mb-4 inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-full text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-colors w-fit"
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
      </BorderGlow>
    </motion.div>
  );
}

// ─── EDUCATION TAB ───────────────────────────────────────────────────────────
function EducationTab() {
  return (
    <div className="max-w-4xl 2xl:max-w-5xl mx-auto w-full space-y-4">
      {[...educationData].reverse().map((edu, index) => (
        <EducationCard key={index} edu={edu} index={index} />
      ))}
    </div>
  );
}

// ─── GALLERY ITEMS ────────────────────────────────────────────────────────────
const masonryItems = [
  { id: "g1",  img: "/images/gallery/1.png",                        height: 520, caption: "Presenting my project" },
  { id: "g2",  img: "/images/gallery/2.png",                        height: 420, caption: "Team meeting" },
  { id: "g3",  img: "https://picsum.photos/id/1015/600/900",        height: 500, caption: "Nature Exploration" },
  { id: "g4",  img: "https://picsum.photos/id/1011/600/750",        height: 380, caption: "Lake Reflection" },
  { id: "g5",  img: "https://picsum.photos/id/1074/600/800",        height: 460, caption: "City Nightlife" },
  { id: "g6",  img: "https://picsum.photos/id/1043/600/700",        height: 340, caption: "Desert Dunes" },
  { id: "g7",  img: "https://picsum.photos/id/1060/600/850",        height: 480, caption: "Coffee Time" },
  { id: "g8",  img: "https://picsum.photos/id/1035/600/600",        height: 300, caption: "Mountain Peak" },
  { id: "g9",  img: "https://picsum.photos/id/1047/600/780",        height: 420, caption: "Urban Architecture" },
  { id: "g10", img: "https://picsum.photos/id/1018/600/900",        height: 560, caption: "Creative Workspace" },
  { id: "g11", img: "https://picsum.photos/id/1039/600/700",        height: 360, caption: "Forest Trail" },
  { id: "g12", img: "https://picsum.photos/id/1023/600/800",        height: 440, caption: "Cycling Adventure" },
];

// ─── GALLERY TAB ─────────────────────────────────────────────────────────────
function GalleryTab() {
  return (
    <div className="w-full min-h-[500px]">
      <Masonry
        items={masonryItems}
        ease="power3.out"
        duration={0.6}
        stagger={0.04}
        animateFrom="bottom"
        scaleOnHover={true}
        hoverScale={0.97}
        blurToFocus={true}
        colorShiftOnHover={true}
      />
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
        className="w-full mb-28 sm:mb-32 lg:mb-40 xl:mb-48 scroll-mt-28"
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
            {activeTab === "gallery" && <GalleryTab />}
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