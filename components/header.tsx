"use client";

import React from "react";
import { motion } from "framer-motion";
import { links } from "@/lib/data";
import Link from "next/link";
import clsx from "clsx";
import { useActiveSectionContext } from "@/context/active-section-context";
import MobileHeader from "./mobile-header";
import { usePathname } from "next/navigation";

export default function Header() {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();
  const pathname = usePathname();

  const currentActive = pathname === "/ai-assistant" ? "AI Assistant" : activeSection;

  return (
    <header className="z-[999] relative">
      <div>
        <MobileHeader />
      </div>

      <motion.div
        className="hidden md:block fixed top-0 left-1/2 h-[4.5rem] w-full rounded-none border border-brand-violet/20 bg-white/80 dark:bg-black/80 shadow-lg shadow-black/10 dark:shadow-black/30 backdrop-blur-[0.75rem] sm:top-6 sm:h-[3.25rem] sm:w-[46rem] sm:rounded-full"
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
      ></motion.div>

      <nav className="hidden md:block fixed top-[0.15rem] left-1/2 h-12 -translate-x-1/2 py-2 sm:top-[1.7rem] sm:h-[initial] sm:py-0">
        <ul className="flex w-[22rem] flex-wrap items-center justify-center gap-y-1 text-[0.9rem] font-medium text-black dark:text-white/50 sm:w-[initial] sm:flex-nowrap sm:gap-4 lg:gap-5">
          {links.map((link) => {
            const href = link.hash.startsWith("#") && pathname !== "/" ? `/${link.hash}` : link.hash;
            const isActive = currentActive === link.name;

            return (
              <motion.li
                className="h-3/4 flex items-center justify-center relative"
                key={link.hash}
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                <Link
                  className={clsx(
                    "flex w-full items-center justify-center px-3 py-3 hover:text-black dark:hover:text-white transition-colors whitespace-nowrap",
                    {
                      "text-black dark:text-white font-bold": isActive,
                    }
                  )}
                  href={href}
                  onClick={() => {
                    setActiveSection(link.name);
                    setTimeOfLastClick(Date.now());
                  }}
                >
                  {link.name}

                  {isActive && (
                    <motion.span
                      className="bg-brand-violet/15 border border-brand-violet/25 rounded-full absolute inset-0 -z-10"
                      layoutId="activeSection"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    ></motion.span>
                  )}
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

