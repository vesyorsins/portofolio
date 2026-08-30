"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface ScrollRevealTextProps {
  children: string;
  className?: string;
}

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="relative inline-block mr-[0.28em] mb-[0.1em]">
      {/* Ghost base layer (always subtly readable) */}
      <span className="opacity-20 select-none text-zinc-400">
        {children}
      </span>

      {/* Illuminated active layer on scroll */}
      <motion.span
        style={{ opacity }}
        className="absolute inset-0 text-white font-bold transition-opacity duration-150 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function ScrollRevealText({ children, className = "" }: ScrollRevealTextProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: elementRef,
    offset: ["start 0.85", "end 0.45"],
  });

  const words = children.split(" ");

  return (
    <div ref={elementRef} className={`relative flex flex-wrap leading-relaxed ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = Math.min(start + (1.5 / words.length), 1);
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </div>
  );
}
