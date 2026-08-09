import React, { useState } from "react";
import { CgClose, CgMenuRightAlt } from "react-icons/cg";
import { links } from "@/lib/data";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useActiveSectionContext } from "@/context/active-section-context";

export default function MobileHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();

  const currentActive = pathname === "/ai-assistant" ? "AI Assistant" : activeSection;

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  };

  return (
    <div className="md:hidden flex fixed top-[0.25rem] right-1 h-12 -translate-x-1/2 py-2 z-[999]">
      <button
        onClick={() => setOpen((prev) => !prev)}
        type="button"
        aria-label="Toggle Navigation Menu"
        className="bg-white/80 dark:bg-black/80 backdrop-blur-md border border-brand-violet/25 p-3 text-black dark:text-white/70 flex items-center gap-2 text-[1.35rem] rounded-full shadow-sm hover:scale-105 hover:border-brand-violet/50 transition-all cursor-pointer"
      >
        {open ? <CgClose /> : <CgMenuRightAlt />}
      </button>

      <motion.div
        className={`${
          open ? "block" : "hidden"
        } bg-white dark:bg-black border border-brand-violet/20 overflow-hidden top-2 mr-5 ml-2 w-56 right-12 absolute rounded-xl z-[999] shadow-2xl backdrop-blur-lg`}
        animate={open ? "open" : "closed"}
        variants={variants}
      >
        <div className="py-1">
          {links.map((link) => {
            const href = link.hash.startsWith("#") && pathname !== "/" ? `/${link.hash}` : link.hash;
            const isActive = currentActive === link.name;

            return (
              <Link
                key={link.name}
                href={href}
                onClick={() => {
                  setOpen(false);
                  setActiveSection(link.name);
                  setTimeOfLastClick(Date.now());
                }}
                className={`px-4 py-2.5 text-base font-medium flex items-center justify-between transition-colors ${
                  isActive
                    ? "bg-brand-violet/15 text-black dark:text-white font-bold border-l-2 border-brand-violet"
                    : "text-black dark:text-white/60 hover:bg-brand-violet/10 hover:text-black dark:hover:text-white"
                }`}
              >
                <span>{link.name}</span>
                {link.name === "AI Assistant" && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-violet/20 text-black dark:text-white font-bold uppercase tracking-wider">
                    AI
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

