"use client";

import React, { useState } from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { contactData } from "@/lib/data";
import { sendEmail } from "@/actions/sendEmail";
import toast from "react-hot-toast";
import {
  FiMail,
  FiGithub,
  FiLinkedin,
  FiInstagram,
  FiSend,
  FiMessageSquare,
} from "react-icons/fi";

const socialItems = [
  {
    name: "Email",
    handle: contactData.email,
    icon: <FiMail className="text-lg" />,
    url: `mailto:${contactData.email}`,
  },
  {
    name: "LinkedIn",
    handle: "faliqulishbah",
    icon: <FiLinkedin className="text-lg" />,
    url: contactData.linkedin,
  },
  {
    name: "Instagram",
    handle: "@Faliqulx",
    icon: <FiInstagram className="text-lg" />,
    url: contactData.instagram,
  },
  {
    name: "GitHub",
    handle: "@Faliqulxx",
    icon: <FiGithub className="text-lg" />,
    url: contactData.github,
  },
];

export default function Contact() {
  const { ref } = useSectionInView("Contact");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setPending(true);
    const fullMessage = subject
      ? `Subject: ${subject}\n\n${message}`
      : message;
    const result = await sendEmail({ senderEmail: email, message: `From: ${name}\n\n${fullMessage}` });
    setPending(false);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("Message sent! I'll get back to you soon 🚀");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    }
  };

  const inputClass = `
    w-full px-4 py-3 rounded-xl
    bg-gray-100 dark:bg-white/[0.04]
    border border-brand-violet/20 dark:border-brand-violet/20
    text-black dark:text-white
    placeholder:text-gray-400 dark:placeholder:text-white/30
    focus:outline-none focus:border-brand-violet dark:focus:border-brand-violet
    focus:ring-1 focus:ring-brand-violet/50
    focus:bg-white dark:focus:bg-white/[0.07]
    transition-all duration-200
    text-sm
  `;

  const labelClass = "block text-[11px] font-semibold tracking-wider uppercase text-black/60 dark:text-white/60 mb-1.5";

  return (
    <motion.section
      id="contact"
      ref={ref}
      className="w-full mb-28 sm:mb-32 lg:mb-40 scroll-mt-28 relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Heading */}
      <SectionHeading>Get In Touch</SectionHeading>
      <p className="text-center text-black/60 dark:text-white/50 text-sm -mt-4 mb-10">
        Let&apos;s discuss projects, opportunities, or statistical insights
      </p>

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-6">

        {/* ── LEFT: Connect Digitally ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="
            bg-white/80 dark:bg-white/[0.04]
            backdrop-blur-xl
            border border-brand-violet/20
            rounded-2xl p-6 sm:p-7 flex flex-col gap-6
            shadow-soft dark:shadow-none
          "
        >
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-violet/10 dark:bg-brand-violet/20 border border-brand-violet/25 flex items-center justify-center text-brand-violet">
              <FiMessageSquare className="text-lg" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-black dark:text-white leading-tight">
                Connect Digitally
              </h3>
              <p className="text-xs text-black/50 dark:text-white/40 mt-0.5">
                Reach out via your preferred channel
              </p>
            </div>
          </div>

          <p className="text-sm text-black/65 dark:text-white/60 leading-relaxed -mt-2">
            Feel free to reach out directly through my social channels. I am most responsive on{" "}
            <span className="text-brand-violet font-semibold">LinkedIn</span> and{" "}
            <span className="text-brand-violet font-semibold">Instagram</span>.
          </p>

          {/* Social Links */}
          <div className="flex flex-col gap-3 mt-auto">
            {socialItems.map((item) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex items-center gap-3.5 px-4 py-3.5 rounded-xl
                  bg-gray-50/80 dark:bg-white/[0.03]
                  border border-brand-violet/15 dark:border-brand-violet/20
                  hover:border-brand-violet/40 dark:hover:border-brand-violet/40
                  hover:bg-brand-violet/[0.06] dark:hover:bg-brand-violet/[0.08]
                  hover:-translate-y-0.5 hover:shadow-glow-card
                  transition-all duration-200 group
                "
              >
                <span className="w-10 h-10 rounded-xl bg-brand-violet/10 dark:bg-brand-violet/20 border border-brand-violet/20 flex items-center justify-center text-brand-violet shrink-0 group-hover:scale-105 group-hover:bg-brand-violet group-hover:text-white transition-all duration-200">
                  {item.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-sm text-black dark:text-white leading-tight mb-0.5 group-hover:text-brand-violet transition-colors">
                    {item.name}
                  </p>
                  <p className="text-xs text-black/50 dark:text-white/45 truncate">
                    {item.handle}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </motion.div>

        {/* ── RIGHT: Send a Direct Message ────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="
            bg-white/80 dark:bg-white/[0.04]
            backdrop-blur-xl
            border border-brand-violet/20
            rounded-2xl p-6 sm:p-7 flex flex-col gap-6
            shadow-soft dark:shadow-none
          "
        >
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-violet/10 dark:bg-brand-violet/20 border border-brand-violet/25 flex items-center justify-center text-brand-violet">
              <FiMail className="text-lg" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-black dark:text-white leading-tight">
                Send a Direct Message
              </h3>
              <p className="text-xs text-black/50 dark:text-white/40 mt-0.5">
                Fill in the details below and I will get back to you soon
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Name + Email row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>
                  Your Name <span className="text-brand-violet">*</span>
                </label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="Faliqul Ishbah"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>
                  Email Address <span className="text-brand-violet">*</span>
                </label>
                <input
                  type="email"
                  className={inputClass}
                  placeholder="faliqul@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className={labelClass}>Subject</label>
              <input
                type="text"
                className={inputClass}
                placeholder="Collaboration / Project Inquiry"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>

            {/* Message */}
            <div>
              <label className={labelClass}>
                Message Content <span className="text-brand-violet">*</span>
              </label>
              <textarea
                className={`${inputClass} h-32 resize-none`}
                placeholder="Hi Faliq, I would love to discuss a project..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={pending}
              className="
                w-full flex items-center justify-center gap-2
                py-3.5 px-6 rounded-xl
                btn-brand text-white font-semibold text-sm
                shadow-glow-card hover:shadow-glow-violet
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-200
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet
              "
            >
              {pending ? (
                <>
                  <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <FiSend className="text-base" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </motion.div>

      </div>
    </motion.section>
  );
}