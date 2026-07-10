"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { bootMessages } from "@/lib/loading-data";
import type { LoadingStage } from "./LoadingScreen";

export default function LoadingSequence({ stage }: { stage: LoadingStage }) {
  const active = stage === "reveal" || stage === "exit";
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!active) return;

    let count = 0;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    const advance = () => {
      if (cancelled) return;
      count += 1;
      setVisibleCount(count);
      if (count < bootMessages.length) {
        timer = setTimeout(advance, 260);
      }
    };

    timer = setTimeout(advance, 250);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [active]);

  return (
    <div className="mt-6 flex flex-col items-center gap-1.5">
      {bootMessages.slice(0, visibleCount).map((message, i) => {
        const isLatest = i === visibleCount - 1;
        return (
          <motion.p
            key={message}
            className={`text-xs tracking-wide sm:text-sm ${
              isLatest ? "text-white" : "text-white/40"
            }`}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {message}
          </motion.p>
        );
      })}
    </div>
  );
}
