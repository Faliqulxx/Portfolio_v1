// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { useActiveSectionContext } from "@/context/active-section-context";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import type { SectionName } from "./types";

export function useSectionInView(sectionName: SectionName, threshold = 0.75) {
  const { ref, inView } = useInView({
    threshold,
  });
  const { setActiveSection, timeOfLastClick } = useActiveSectionContext();

  useEffect(() => {
    if (inView && Date.now() - timeOfLastClick > 1000) {
      setActiveSection(sectionName);
    }
  }, [inView, setActiveSection, timeOfLastClick, sectionName]);

  return {
    ref,
  };
}

// True only on devices that can genuinely hover (desktop/trackpad).
// Touch devices report false, so hover-only UI (like the expandable chat
// button) can safely fall back to a simpler tap-only interaction there.
export function useCanHover() {
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    setCanHover(query.matches);

    const handleChange = (event: MediaQueryListEvent) =>
      setCanHover(event.matches);

    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  return canHover;
}
