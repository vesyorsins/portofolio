"use client";

import React, { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useAnimationFrame,
  useMotionValue,
  useInView,
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
    <div className="group/cert relative h-[200px] sm:h-[240px] md:h-[260px] w-[300px] sm:w-[380px] md:w-[420px] shrink-0 rounded-2xl p-2 bg-[#fcfbf9] border border-stone-200/90 shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-200 overflow-hidden flex flex-col justify-between select-none cursor-pointer">
      {/* Clean Certificate Photo Frame */}
      <div className="relative w-full h-full rounded-xl overflow-hidden bg-stone-100">
        <Image
          src={cert.image}
          alt={cert.title}
          fill
          sizes="(max-width: 640px) 300px, (max-width: 768px) 380px, 420px"
          className="object-cover object-center group-hover/cert:scale-105 transition-transform duration-500 pointer-events-none select-none"
        />

        {/* Subtle Dark Vignette / Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

        {/* Bottom Title & Issuer Label */}
        <div className="absolute bottom-0 inset-x-0 p-4 z-10 text-white pointer-events-none">
          <span className="text-[11px] font-mono text-zinc-300 block mb-0.5">
            {cert.issuer}
          </span>
          <h4 className="text-sm sm:text-base font-bold tracking-tight text-white leading-snug drop-shadow-sm">
            {cert.title}
          </h4>
        </div>
      </div>
    </div>
  );
}

function InfiniteParallaxRow({
  items,
  baseVelocity = -0.7,
  isInView = true,
}: {
  items: CertificatePhoto[];
  baseVelocity: number;
  isInView?: boolean;
}) {
  const isHoveredRef = useRef(false);
  const baseX = useMotionValue(0);

  // Seamless modulo wrap between -33.3333% and 0%
  const x = useTransform(baseX, (v) => `${wrap(-33.3333, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    // Suspend animation loop entirely when section is scrolled out of viewport
    if (!isInView) return;

    const speedMultiplier = isHoveredRef.current ? 0.25 : 1;
    const clampedDelta = Math.min(delta, 32);
    // Steady, buttery-smooth linear gliding without erratic scroll-velocity noise
    const moveBy = baseVelocity * (clampedDelta / 1000) * 1.8 * speedMultiplier;
    baseX.set(baseX.get() + moveBy);
  });

  // Duplicate items 3 times for seamless 33.333% loop
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div
      onMouseEnter={() => {
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
      }}
      className="overflow-hidden whitespace-nowrap flex flex-nowrap select-none w-full py-1"
    >
      <motion.div
        className="flex gap-4 sm:gap-5 md:gap-6 shrink-0 will-change-transform transform-gpu"
        style={{ x }}
      >
        {duplicatedItems.map((cert, idx) => (
          <CertificatePhotoCard key={idx} cert={cert} />
        ))}
      </motion.div>
    </div>
  );
}

export default function ParallaxShowcase({
  certs = {
    row1: row1Certificates,
    row2: row2Certificates,
    row3: row3Certificates,
  },
}: {
  certs?: {
    row1: CertificatePhoto[];
    row2: CertificatePhoto[];
    row3: CertificatePhoto[];
  };
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "150px 0px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Smooth vertical parallax translation without 3D depth-sorting reversals
  const translateY = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0.6, 1, 1, 0.6],
  );

  return (
    <section
      ref={ref}
      className="relative w-full py-20 md:py-36 overflow-hidden flex flex-col items-center justify-center bg-transparent"
    >
      {/* Clean Header */}
      <div className="relative z-20 text-center max-w-3xl mx-auto px-4 mb-12 md:mb-20">
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-[#1c1917] tracking-tight leading-tight">
          Verified Training & Exam Certificates
        </h2>
        <p className="text-stone-600 text-sm md:text-base mt-3 max-w-xl mx-auto font-normal">
          Official training certificates, examination credentials, and
          specialized technical achievements.
        </p>
      </div>

      {/* Smooth rows: flat 2D on mobile for zero GPU lag; subtle perspective on desktop */}
      <motion.div
        style={{
          y: translateY,
          opacity,
        }}
        className="w-full flex flex-col gap-4 md:gap-7 relative z-10 will-change-transform transform-gpu md:[transform:perspective(1200px)_rotateX(3deg)]"
      >
        {/* Row 1: Gentle Gliding to the Left */}
        <InfiniteParallaxRow items={certs.row1} baseVelocity={-0.8} isInView={isInView} />

        {/* Row 2: Gentle Gliding to the Right */}
        <InfiniteParallaxRow items={certs.row2} baseVelocity={0.8} isInView={isInView} />

        {/* Row 3: Glides on tablet & desktop, hidden on mobile for optimal 60fps performance */}
        <div className="hidden sm:block">
          <InfiniteParallaxRow items={certs.row3} baseVelocity={-0.7} isInView={isInView} />
        </div>
      </motion.div>
    </section>
  );
}
