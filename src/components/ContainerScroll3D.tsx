"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function ContainerScroll3D({
  titleComponent,
  children,
}: {
  titleComponent: React.ReactNode;
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const springConfig = { stiffness: 180, damping: 24 };

  // 3D Perspective Tilt on Scroll: starts tilted back 20deg and unfolds flat (0deg)
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.45], [20, 0]), springConfig);
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.45], [0.88, 1]), springConfig);
  const translateY = useSpring(useTransform(scrollYProgress, [0, 0.45], [60, 0]), springConfig);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0.4, 1]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-[90vh] py-20 flex flex-col items-center justify-center [perspective:1400px]"
    >
      <div className="w-full mb-12 text-center">{titleComponent}</div>

      <motion.div
        style={{
          rotateX,
          scale,
          y: translateY,
          opacity,
          transformStyle: "preserve-3d",
        }}
        className="w-full max-w-6xl mx-auto rounded-3xl p-3 md:p-4 bg-[#141418] border border-zinc-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]"
      >
        <div className="w-full rounded-2xl bg-[#09090b] border border-zinc-800/80 p-6 md:p-10 overflow-hidden">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
