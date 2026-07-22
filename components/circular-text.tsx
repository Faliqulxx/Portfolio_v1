"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimation,
  useMotionValue,
  type MotionValue,
  type Transition,
} from "motion/react";

interface CircularTextProps {
  text: string;
  spinDuration?: number;
  onHover: "slowDown" | "speedUp" | "pause" | "goBonkers";
  className?: string;
}

const getRotationTransition = (duration: number, from: number, loop = true) => ({
  from,
  to: from + 360,
  ease: "linear" as const,
  duration,
  type: "tween" as const,
  repeat: loop ? Infinity : 0,
});

const getTransition = (duration: number, from: number) => ({
  rotate: getRotationTransition(duration, from),
  scale: { type: "spring" as const, damping: 20, stiffness: 300 },
});

const CircularText: React.FC<CircularTextProps> = ({
  text,
  spinDuration = 20,
  onHover = "speedUp",
  className = "",
}) => {
  const letters = Array.from(text);
  const controls = useAnimation();
  const rotation: MotionValue<number> = useMotionValue(0);

  // Measure the actual container so we can compute exact letter positions
  const containerRef = useRef<HTMLDivElement>(null);
  const [radius, setRadius] = useState(88); // fallback

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setRadius(el.clientWidth / 2);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Spin animation
  useEffect(() => {
    const from = rotation.get();
    controls.start({
      rotate: from + 360,
      scale: 1,
      transition: getTransition(spinDuration, from),
    });
  }, [spinDuration, text, onHover, controls]);

  const handleHoverStart = () => {
    const from = rotation.get();
    if (!onHover) return;
    let transitionConfig: ReturnType<typeof getTransition> | Transition;
    let scaleVal = 1;
    switch (onHover) {
      case "slowDown":
        transitionConfig = getTransition(spinDuration * 2, from);
        break;
      case "speedUp":
        transitionConfig = getTransition(spinDuration / 4, from);
        break;
      case "pause":
        transitionConfig = {
          rotate: { type: "spring", damping: 20, stiffness: 300 },
          scale: { type: "spring", damping: 20, stiffness: 300 },
        };
        break;
      case "goBonkers":
        transitionConfig = getTransition(spinDuration / 20, from);
        scaleVal = 0.8;
        break;
      default:
        transitionConfig = getTransition(spinDuration, from);
    }
    controls.start({ rotate: from + 360, scale: scaleVal, transition: transitionConfig });
  };

  const handleHoverEnd = () => {
    const from = rotation.get();
    controls.start({ rotate: from + 360, scale: 1, transition: getTransition(spinDuration, from) });
  };

  // Inner radius for letter placement (leave a small inset so text isn't cut off)
  const letterRadius = radius - 10;

  return (
    <motion.div
      ref={containerRef}
      className={`relative rounded-full cursor-pointer origin-center ${className}`}
      style={{ rotate: rotation }}
      initial={{ rotate: 0 }}
      animate={controls}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      {letters.map((letter, i) => {
        // Start from top (−π/2) and go clockwise
        const angle = (2 * Math.PI * i) / letters.length - Math.PI / 2;
        const x = radius + letterRadius * Math.cos(angle); // px from left
        const y = radius + letterRadius * Math.sin(angle); // px from top
        const rotateDeg = (360 / letters.length) * i;     // rotate letter to face outward

        return (
          <span
            key={i}
            className="absolute select-none font-semibold leading-none"
            style={{
              left: x,
              top: y,
              transform: `translate(-50%, -50%) rotate(${rotateDeg}deg)`,
            }}
          >
            {letter}
          </span>
        );
      })}
    </motion.div>
  );
};

export default CircularText;
