"use client";

import React, { useState } from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";

import {
  BsWhatsapp,
  BsTelegram,
  BsEnvelopeFill,
} from "react-icons/bs";

import { useSectionInView } from "@/lib/hooks";
import toast from "react-hot-toast";

export default function Contact() {
  const { ref } = useSectionInView("Contact");

  const [message, setMessage] = useState("");

  // ================= SEND WHATSAPP =================
  const sendWhatsApp = () => {
    if (!message) {
      toast.error("Message is Required!");
      return;
    }

    const encodedMessage = encodeURIComponent(message);

    window.open(
      `https://wa.me/6287702012138?text=${encodedMessage}`,
      "_blank"
    );
  };

  // ================= SEND TELEGRAM =================
  const sendTelegram = () => {
    if (!message) {
      toast.error("Message is Required!");
      return;
    }

    const encodedMessage = encodeURIComponent(message);

    window.open(
      `https://t.me/Faliqb?text=${encodedMessage}`,
      "_blank"
    );
  };

  // ================= SEND EMAIL =================
  const sendEmailDirect = () => {
    if (!message) {
      toast.error("Message is Required!");
      return;
    }

    const encodedMessage = encodeURIComponent(message);

    window.location.href =
      `mailto:faliqul.isback@gmail.com?subject=Portfolio Contact&body=${encodedMessage}`;
  };

  return (
    <motion.section
      id="contact"
      ref={ref}
      className="
        w-full
        mb-28 sm:mb-32 lg:mb-40 xl:mb-48
        scroll-mt-28
        relative
      "
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      {/* ================= BACKGROUND BLUR ================= */}


      <SectionHeading>
        Get In Touch
      </SectionHeading>

      {/* ================= GRID ================= */}
      <div
        className="
          mt-12
          max-w-2xl w-full mx-auto
          flex flex-col
          gap-8 lg:gap-12
          items-center
        "
      >
        {/* ================= CENTERED INFO ================= */}
        <div className="text-center w-full">
          <p className="text-black dark:text-white/75 mb-8 lg:text-lg">
            Additionally, I'm currently open for freelance or
            part-time opportunities. If you have an interesting
            project or need extra hands on deck, don't hesitate
            to get in touch!
            <br />
            <br />
            Feel free to contact me anytime.
            I'm happy to help 🚀
          </p>

          {/* ================= MESSAGE BOX ================= */}
          <div className="flex flex-col w-full text-left">
            <textarea
              className="
                h-40 lg:h-52
                bg-gray-100 dark:bg-white/5
                rounded-xl
                border border-brand-violet/20
                focus:border-brand-violet focus:outline-none
                p-4
                text-black dark:text-white
                placeholder:text-gray-400 dark:placeholder:text-white/30
                transition-all
                resize-none
              "
              placeholder="Write your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            {/* ================= BUTTONS ================= */}
            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-3
                gap-3
                mt-4
              "
            >
              {/* WHATSAPP */}
              <button
                onClick={sendWhatsApp}
                className="
                  flex items-center justify-center gap-2
                  bg-gray-100 dark:bg-white/5
                  text-black dark:text-white/80
                  border border-brand-violet/20
                  py-3 px-4
                  rounded-xl
                  font-medium
                  hover:-translate-y-0.5 hover:border-brand-violet/50 hover:shadow-glow-card
                  transition-all
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet
                "
              >
                <BsWhatsapp className="text-[#25D366] text-xl" />
                WhatsApp
              </button>

              {/* TELEGRAM */}
              <button
                onClick={sendTelegram}
                className="
                  flex items-center justify-center gap-2
                  bg-gray-100 dark:bg-white/5
                  text-black dark:text-white/80
                  border border-brand-violet/20
                  py-3 px-4
                  rounded-xl
                  font-medium
                  hover:-translate-y-0.5 hover:border-brand-violet/50 hover:shadow-glow-card
                  transition-all
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet
                "
              >
                <BsTelegram className="text-[#229ED9] text-xl" />
                Telegram
              </button>

              {/* EMAIL */}
              <button
                onClick={sendEmailDirect}
                className="
                  flex items-center justify-center gap-2
                  bg-gray-100 dark:bg-white/5
                  text-black dark:text-white/80
                  border border-brand-violet/20
                  py-3 px-4
                  rounded-xl
                  font-medium
                  hover:-translate-y-0.5 hover:border-brand-violet/50 hover:shadow-glow-card
                  transition-all
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet
                "
              >
                <BsEnvelopeFill className="text-black dark:text-white text-xl" />
                Email
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}