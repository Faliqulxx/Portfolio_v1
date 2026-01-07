"use client";

import React, { useState } from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { sendEmail } from "@/actions/sendEmail";
import SubmitBtn from "./submit-btn";
import toast from "react-hot-toast";

export default function Contact() {
  const { ref } = useSectionInView("Contact");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <motion.section
      id="contact"
      ref={ref}
      className="scroll-mt-28 mb-20 sm:mb-28 w-full max-w-6xl mx-auto px-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      {/* Background blur */}
      <div className="bg-[#fbe2e3] absolute bottom-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] dark:bg-[#7d5353]" />

      <SectionHeading>Get In Touch</SectionHeading>

      {/* GRID */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* LEFT - TEXT + FORM */}
        <div className="text-center md:text-left">
          <p className="text-gray-700 dark:text-white/80 mb-8">
            Additionally, I'm currently open for freelance or part-time
            opportunities. If you have an interesting project or need extra
            hands on deck, don't hesitate to get in touch!
            <br />
            <br />
            Feel free to contact me anytime. I'm happy to help 🚀
          </p>

          <form
            className="flex flex-col dark:text-black"
            action={async () => {
              const dataForm = { senderEmail: email, message: message };

              if (!email) {
                toast.error("Email is Required !");
                return;
              }

              if (!message) {
                toast.error("Message is Required !");
                return;
              }

              const containsTest = /test/i.test(email);
              if (containsTest) {
                toast.error(
                  "Mohon maaf, input tidak valid. Website sudah berjalan dengan baik jadi tidak perlu testing lagi 😁",
                  { duration: 6000 }
                );
                return;
              }

              const isValidEmail =
                email.length > 4 &&
                message.length > 9 &&
                email.endsWith("@gmail.com");

              if (!isValidEmail) {
                toast.error(
                  "Please provide a valid email (ending with @gmail.com) and message minimum 10 characters."
                );
                return;
              }

              const { error } = await sendEmail(dataForm);
              if (error) {
                toast.error(error);
                return;
              }

              setEmail("");
              setMessage("");
              toast.success("Email sent successfully!");
            }}
          >
            <input
              className="h-14 px-4 bg-white rounded-lg borderBlack dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <textarea
              className="h-40 bg-white my-3 rounded-lg borderBlack p-4 dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
              placeholder="Your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <SubmitBtn />
          </form>
        </div>

        {/* RIGHT - GOOGLE MAPS */}
        <div className="w-full">
          <p className="mb-2 text-sm font-medium text-gray-700 dark:text-white/80">
            📍 Tegal sari, Pangkahkulon – Gresik, Jawa Timur
          </p>

          <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-lg">
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
