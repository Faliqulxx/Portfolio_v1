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
        scroll-mt-28
        mb-20 sm:mb-28
        w-full
        max-w-6xl
        mx-auto
        px-4
        relative
      "
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      {/* ================= BACKGROUND BLUR ================= */}
      <div
        className="
          bg-[#fbe2e3]
          absolute
          bottom-[-6rem]
          -z-10
          right-[11rem]
          h-[31.25rem]
          w-[31.25rem]
          rounded-full
          blur-[10rem]
          sm:w-[68.75rem]
          dark:bg-[#7d5353]
        "
      />

      <SectionHeading>
        Get In Touch
      </SectionHeading>

      {/* ================= GRID ================= */}
      <div
        className="
          mt-12
          grid
          grid-cols-1
          md:grid-cols-2
          gap-10
          items-start
        "
      >
        {/* ================= LEFT ================= */}
        <div className="text-center md:text-left">
          <p className="text-gray-700 dark:text-white/80 mb-8">
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
          <div className="flex flex-col">
            <textarea
              className="
                h-40
                bg-white
                rounded-xl
                borderBlack
                p-4
                dark:bg-white
                dark:bg-opacity-80
                dark:focus:bg-opacity-100
                transition-all
                dark:outline-none
                dark:text-black
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
                  bg-[#25D366]
                  text-white
                  py-3 px-4
                  rounded-xl
                  font-medium
                  hover:scale-105
                  transition
                "
              >
                <BsWhatsapp />
                WhatsApp
              </button>

              {/* TELEGRAM */}
              <button
                onClick={sendTelegram}
                className="
                  flex items-center justify-center gap-2
                  bg-[#229ED9]
                  text-white
                  py-3 px-4
                  rounded-xl
                  font-medium
                  hover:scale-105
                  transition
                "
              >
                <BsTelegram />
                Telegram
              </button>

              {/* EMAIL */}
              <button
                onClick={sendEmailDirect}
                className="
                  flex items-center justify-center gap-2
                  bg-gray-900
                  text-white
                  py-3 px-4
                  rounded-xl
                  font-medium
                  hover:scale-105
                  transition
                "
              >
                <BsEnvelopeFill />
                Email
              </button>
            </div>
          </div>
        </div>

        {/* ================= RIGHT - MAP ================= */}
        <div className="w-full">
          <p
            className="
              mb-2
              text-sm
              font-medium
              text-gray-700
              dark:text-white/80
            "
          >
            📍 Tegal sari, Pangkahkulon – Gresik,
            Jawa Timur
          </p>

          <div
            className="
              w-full
              h-[400px]
              rounded-xl
              overflow-hidden
              shadow-lg
            "
          >
            <iframe
              title="Google Maps Location"
              src="https://www.google.com/maps?q=-6.913708,112.543351&z=16&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}