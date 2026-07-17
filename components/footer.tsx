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
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8"
      >
        {/* TOP SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
          
          {/* Column 1: About */}
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 flex flex-col gap-4 items-center md:items-start text-center md:text-left">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
              Faliqul Ishbah
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-sm">
              I'm passionate about building impactful digital products, exploring AI, and solving problems with code. Let's create something amazing together.
            </p>
            <div className="flex gap-4 mt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors p-2 -m-2"
                  title={social.name}
                >
                  <span className="text-xl">{social.icon}</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4 items-center md:items-start text-center md:text-left">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Quick Links</h3>
            <ul className="flex flex-col gap-2.5">
              {links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.hash}
                    onClick={() => {
                      setActiveSection(link.name);
                      setTimeOfLastClick(Date.now());
                    }}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Contact */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4 items-center md:items-start text-center md:text-left">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Contact</h3>
            <ul className="flex flex-col gap-2.5 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <a href={`mailto:${contactData.email}`} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  {contactData.email}
                </a>
              </li>
              <li>
                <Link
                  href="#contact"
                  onClick={() => {
                    setActiveSection("Contact");
                    setTimeOfLastClick(Date.now());
                  }}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Send a Message
                </Link>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* BOTTOM SECTION */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-200 dark:border-white/10 text-sm text-gray-500 dark:text-gray-400">
          <p>&copy; {currentYear} Faliqul Ishbah. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-1">
            <span>Built with</span>
            {techStack.map((tech, index) => (
              <React.Fragment key={tech}>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {tech}
                </span>
                {index < techStack.length - 1 && <span>,</span>}
              </React.Fragment>
            ))}
          </div>
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
