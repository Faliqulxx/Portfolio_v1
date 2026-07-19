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
          <p className="text-gray-700 dark:text-white/80 mb-8 lg:text-lg">
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
                  bg-white dark:bg-white/5
                  text-gray-700 dark:text-white/80
                  border border-gray-200 dark:border-white/10
                  py-3 px-4
                  rounded-xl
                  font-medium
                  hover:-translate-y-0.5 hover:shadow-md
                  transition-all
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 dark:focus-visible:ring-gray-300 dark:focus-visible:ring-offset-gray-950
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
                  bg-white dark:bg-white/5
                  text-gray-700 dark:text-white/80
                  border border-gray-200 dark:border-white/10
                  py-3 px-4
                  rounded-xl
                  font-medium
                  hover:-translate-y-0.5 hover:shadow-md
                  transition-all
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 dark:focus-visible:ring-gray-300 dark:focus-visible:ring-offset-gray-950
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
                  bg-white dark:bg-white/5
                  text-gray-700 dark:text-white/80
                  border border-gray-200 dark:border-white/10
                  py-3 px-4
                  rounded-xl
                  font-medium
                  hover:-translate-y-0.5 hover:shadow-md
                  transition-all
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 dark:focus-visible:ring-gray-300 dark:focus-visible:ring-offset-gray-950
                "
              >
                <BsEnvelopeFill className="text-gray-900 dark:text-white text-xl" />
                Email
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}