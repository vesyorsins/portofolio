"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useAnimationFrame,
  useMotionValue,
  useInView,
} from "framer-motion";
import { defaultSiteSettings } from "@/data/siteSettings";

interface VelocityTextProps {
  children: string;
  baseVelocity?: number;
  className?: string;
  isInView?: boolean;
}

function wrap(min: number, max: number, v: number) {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

export function VelocityText({
  children,
  baseVelocity = 3,
  className = "",
  isInView = true,
}: VelocityTextProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 300,
  });

  // Seamless modulo wrap between -25% and 0% for 4 repeating blocks
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    // Only animate when visible on screen
    if (!isInView) return;

    // Cap delta at 32ms to prevent huge jumps on tab switch or frame drop
    const clampedDelta = Math.min(delta, 32);
    let moveBy = baseVelocity * (clampedDelta / 1000) * 1.5;

    // Smooth scroll acceleration that boosts movement in the row's natural direction
    const currentVelocity = smoothVelocity.get();
    if (Math.abs(currentVelocity) > 30) {
      const scrollBoost = Math.min(Math.abs(currentVelocity) / 350, 2.5);
      moveBy += moveBy * scrollBoost;
    }

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden whitespace-nowrap flex flex-nowrap select-none py-2">
      <motion.div
        className={`flex whitespace-nowrap font-bold text-3xl sm:text-5xl md:text-6xl tracking-tight uppercase will-change-transform transform-gpu ${className}`}
        style={{ x }}
      >
        <span className="mr-8 shrink-0">{children}</span>
        <span className="mr-8 shrink-0">{children}</span>
        <span className="mr-8 shrink-0">{children}</span>
        <span className="mr-8 shrink-0">{children}</span>
      </motion.div>
    </div>
  );
}

export default function ScrollVelocityMarquee({
  line1 = defaultSiteSettings.marqueeLine1,
  line2 = defaultSiteSettings.marqueeLine2,
}: {
  line1?: string;
  line2?: string;
}) {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { margin: "100px 0px" });

  return (
    <section
      ref={containerRef}
      className="w-full py-16 bg-transparent overflow-hidden border-y border-stone-300/30"
    >
      <VelocityText
        baseVelocity={-2}
        className="text-stone-400 hover:text-stone-700 transition-colors"
        isInView={isInView}
      >
        {line1}
      </VelocityText>
      <VelocityText
        baseVelocity={2}
        className="text-stone-300 hover:text-stone-600 transition-colors mt-2"
        isInView={isInView}
      >
        {line2}
      </VelocityText>
    </section>
  );
}
