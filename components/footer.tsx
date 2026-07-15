"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { contactData, personalData, links } from "@/lib/data";
import { FiMail, FiGithub, FiLinkedin, FiInstagram, FiFileText, FiArrowUp } from "react-icons/fi";
import Link from "next/link";
import { useActiveSectionContext } from "@/context/active-section-context";

const socialLinks = [
  { name: "Email", icon: <FiMail />, url: `mailto:${contactData.email}` },
  { name: "GitHub", icon: <FiGithub />, url: contactData.github },
  { name: "LinkedIn", icon: <FiLinkedin />, url: contactData.linkedin },
  { name: "Instagram", icon: <FiInstagram />, url: contactData.instagram },
  { name: "Resume", icon: <FiFileText />, url: personalData.cvUrl },
];

const techStack = [
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "Vercel",
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveSection("Home");
    setTimeOfLastClick(Date.now());
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <footer className="w-full bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border-t border-gray-200 dark:border-white/10 relative overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-[1600px] w-[92vw] mx-auto px-4 sm:px-8 lg:px-12 pt-16 pb-8"
      >
        {/* TOP SECTION: 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8 mb-16">
          
          {/* Column 1: CTA */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6 items-center md:items-start text-center md:text-left lg:pr-12">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
              Let's Create Something Amazing Together
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              I'm passionate about building impactful digital products, exploring AI, and solving AI-powered solutions. Whether you have a project, internship opportunity, freelance work, or simply want to connect, I'd love to hear from you.
            </p>
            <Link
              href="#contact"
              onClick={() => {
                setActiveSection("Contact");
                setTimeOfLastClick(Date.now());
              }}
              className="group relative inline-flex items-center justify-center px-8 py-3 font-semibold text-white transition-all duration-300 bg-gray-900 dark:bg-white dark:text-gray-900 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 overflow-hidden w-full md:w-fit shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dark:focus:ring-white dark:focus:ring-offset-gray-950"
            >
              <span className="relative z-10">Contact Me</span>
              <div className="absolute inset-0 h-full w-full bg-white/20 dark:bg-black/10 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out" />
            </Link>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6 items-center md:items-start text-center md:text-left lg:pl-12">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Quick Links</h3>
            <ul className="flex flex-col gap-3 items-center md:items-start">
              {links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.hash}
                    onClick={() => {
                      setActiveSection(link.name);
                      setTimeOfLastClick(Date.now());
                    }}
                    className="group relative text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300 w-fit block focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
                  >
                    {link.name}
                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Connect */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6 items-center md:items-start text-center md:text-left">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Connect</h3>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  title={social.name}
                  className="group relative flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 hover:scale-110 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <span className="text-xl">{social.icon}</span>
                  {/* Tooltip */}
                  <span className="absolute -top-10 scale-0 group-hover:scale-100 transition-transform duration-200 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs py-1 px-2 rounded font-medium shadow-lg pointer-events-none origin-bottom whitespace-nowrap z-10">
                    {social.name}
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-[4px] border-transparent border-t-gray-900 dark:border-t-white" />
                  </span>
                </a>
              ))}
            </div>
          </motion.div>

        </div>

        {/* TECH STACK BADGES */}
        <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-12">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mr-2">Built with</span>
          {techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs font-medium bg-gray-200 dark:bg-white/5 text-gray-700 dark:text-gray-300 rounded-full border border-gray-300 dark:border-white/10"
            >
              {tech}
            </span>
          ))}
        </motion.div>

        {/* BOTTOM SECTION */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-4 pt-8 border-t border-gray-300 dark:border-white/10 text-sm text-gray-500 dark:text-gray-400">
          <p>&copy; {currentYear} Faliqul Ishbah. All Rights Reserved.</p>
          <p>
            Designed & Developed with <span className="text-red-500 animate-pulse inline-block">❤️</span> in Indonesia.
          </p>
        </motion.div>
      </motion.div>

      {/* BACK TO TOP BUTTON */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            aria-label="Back to top"
            className="fixed bottom-6 right-6 z-50 p-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 hover:shadow-indigo-500/30 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-950"
          >
            <FiArrowUp className="text-xl" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
