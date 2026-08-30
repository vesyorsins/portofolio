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
} from "framer-motion";

interface VelocityTextProps {
  children: string;
  baseVelocity?: number;
  className?: string;
}

function wrap(min: number, max: number, v: number) {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

export function VelocityText({ children, baseVelocity = 3, className = "" }: VelocityTextProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden whitespace-nowrap flex flex-nowrap select-none py-2">
      <motion.div className={`flex whitespace-nowrap font-bold text-3xl sm:text-5xl md:text-6xl tracking-tight uppercase ${className}`} style={{ x }}>
        <span className="mr-8">{children}</span>
        <span className="mr-8">{children}</span>
        <span className="mr-8">{children}</span>
        <span className="mr-8">{children}</span>
      </motion.div>
    </div>
  );
}

export default function ScrollVelocityMarquee() {
  return (
    <section className="w-full py-16 bg-transparent overflow-hidden border-y border-stone-300/30">
      <VelocityText baseVelocity={-2} className="text-stone-400 hover:text-stone-700 transition-colors">
        Creative Development • 3D WebGL • Systems Architecture •
      </VelocityText>
      <VelocityText baseVelocity={2} className="text-stone-300 hover:text-stone-600 transition-colors mt-2">
        Full-Stack Engineering • Performance First • TypeScript Core •
      </VelocityText>
    </section>
  );
}
