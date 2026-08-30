"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useVelocity,
  useAnimationFrame,
  useMotionValue,
} from "framer-motion";

import {
  row1Certificates,
  row2Certificates,
  row3Certificates,
  CertificatePhoto,
} from "@/data/certifications";

function wrap(min: number, max: number, v: number) {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

function CertificatePhotoCard({ cert }: { cert: CertificatePhoto }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="group/cert relative h-[220px] sm:h-[260px] w-[340px] sm:w-[420px] shrink-0 rounded-2xl p-2 bg-white/90 backdrop-blur-md border border-[#e6e3db] shadow-xl overflow-hidden flex flex-col justify-between select-none cursor-pointer"
    >
      {/* Clean Certificate Photo Frame */}
      <div className="relative w-full h-full rounded-xl overflow-hidden bg-stone-100">
        <motion.img
          src={cert.image}
          alt={cert.title}
          draggable={false}
          className="w-full h-full object-cover object-center group-hover/cert:scale-105 transition-transform duration-500 pointer-events-none select-none"
        />

        {/* Subtle Dark Vignette / Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent pointer-events-none" />

        {/* Bottom Title & Issuer Label */}
        <div className="absolute bottom-0 inset-x-0 p-4 z-10 text-white pointer-events-none">
          <span className="text-[11px] font-mono text-zinc-300 block mb-0.5">
            {cert.issuer}
          </span>
          <h4 className="text-sm sm:text-base font-bold tracking-tight text-white leading-snug drop-shadow-md">
            {cert.title}
          </h4>
        </div>
      </div>
    </motion.div>
  );
}

function InfiniteParallaxRow({
  items,
  baseVelocity = -0.7,
}: {
  items: CertificatePhoto[];
  baseVelocity: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 1.8], {
    clamp: false,
  });

  // Seamless modulo wrap between -50% and 0%
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    // Smooth, calm gliding speed (slows down further if hovered for effortless reading)
    const speedMultiplier = isHovered ? 0.3 : 1;
    let moveBy = baseVelocity * (delta / 1000) * 1.8 * speedMultiplier;
    
    if (velocityFactor.get() !== 0) {
      moveBy += baseVelocity * Math.min(velocityFactor.get(), 2.0) * (delta / 1000) * 2.5 * speedMultiplier;
    }
    
    baseX.set(baseX.get() + moveBy);
  });

  // Duplicate items 4 times to ensure uninterrupted infinite carousel looping
  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="overflow-hidden whitespace-nowrap flex flex-nowrap select-none w-full py-1"
    >
      <motion.div className="flex gap-5 md:gap-6 shrink-0" style={{ x }}>
        {duplicatedItems.map((cert, idx) => (
          <CertificatePhotoCard key={idx} cert={cert} />
        ))}
      </motion.div>
    </div>
  );
}

export default function ParallaxShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const springConfig = { stiffness: 180, damping: 25 };

  // 3D Isometric Viewport Rotation & Elevation on Scroll
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [14, 0, -14]), springConfig);
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [8, 0, -8]), springConfig);
  const translateY = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [-180, 0, 180]), springConfig);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.5, 1, 1, 0.5]);

  return (
    <section
      ref={ref}
      className="relative w-full min-h-[190vh] py-32 overflow-hidden flex flex-col items-center justify-center bg-transparent"
    >
      {/* Clean Header */}
      <div className="relative z-20 text-center max-w-3xl mx-auto px-4 mb-20">
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-[#1c1917] tracking-tight leading-tight">
          Verified Certifications & Accreditations
        </h2>
        <p className="text-stone-600 text-sm md:text-base mt-3 max-w-xl mx-auto font-normal">
          Official engineering certifications, cloud credentials, and specialized technical achievements.
        </p>
      </div>

      {/* 3D Isometric Viewport Container with Slow, Calm Infinite Looping Rows */}
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
          perspective: "1400px",
          transformStyle: "preserve-3d",
        }}
        className="w-full flex flex-col gap-6 md:gap-8 relative z-10"
      >
        {/* Row 1: Gentle Gliding to the Left */}
        <InfiniteParallaxRow items={row1Certificates} baseVelocity={-0.7} />

        {/* Row 2: Gentle Gliding to the Right */}
        <InfiniteParallaxRow items={row2Certificates} baseVelocity={0.7} />

        {/* Row 3: Gentle Gliding to the Left */}
        <InfiniteParallaxRow items={row3Certificates} baseVelocity={-0.6} />
      </motion.div>
    </section>
  );
}
