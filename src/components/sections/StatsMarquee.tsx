"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Zap } from "lucide-react";
import { StatMetric } from "@/types/portfolio";
import { defaultSiteSettings } from "@/data/siteSettings";

interface StatsMarqueeProps {
  stats?: StatMetric[];
  telemetryOverview?: string;
}

export default function StatsMarquee({
  stats = defaultSiteSettings.stats,
  telemetryOverview = defaultSiteSettings.marqueeLine1,
}: StatsMarqueeProps) {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { margin: "100px 0px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const cardScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.97, 1, 0.97]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);

  const validStats = (Array.isArray(stats) ? stats : []).filter(
    (st) => Boolean(st && st.label && st.value)
  );
  const displayStats = validStats.length > 0 ? validStats : defaultSiteSettings.stats;

  const technologies = [
    "Next.js 16 (App Router)",
    "React 19 & TypeScript 5",
    "Three.js & WebGL 2.0",
    "Rapier Physics (WASM)",
    "Tailwind CSS v4",
    "Framer Motion & GSAP",
    "Python & FastAPI",
    "PostgreSQL & TimescaleDB",
    "Docker & Linux",
    "Lenis Momentum Scroll",
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full py-16 bg-transparent overflow-hidden"
    >
      {/* Top Section: Metrics Grid */}
      <motion.div
        style={{ scale: cardScale, opacity }}
        className="max-w-7xl mx-auto px-4 md:px-8 mb-8 will-change-transform transform-gpu"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
          {displayStats.map((stat, i) => (
            <motion.div
              key={stat.label || i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="p-5 md:p-6 rounded-2xl bg-white/90 border border-stone-200/90 hover:border-stone-300 transition-colors group shadow-sm"
            >
              <div className="text-[11px] font-mono text-stone-500 tracking-wider mb-2 font-medium">
                {stat.label}
              </div>
              <div className="text-2xl md:text-3xl font-bold tracking-tight mb-1 text-[#1c1917]">
                {stat.value}
              </div>
              <div className="text-xs text-stone-500">
                {stat.subtext}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Telemetry row */}
        <div className="p-3.5 rounded-xl bg-white/90 border border-stone-200/90 flex flex-col md:flex-row items-center justify-between gap-3 text-xs font-mono text-stone-600 shadow-sm">
          <div className="flex items-center gap-2 text-[#1c1917] font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>CORE STACK OVERVIEW:</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-center">
            <span>{telemetryOverview}</span>
          </div>
        </div>
      </motion.div>

      {/* Infinite Horizontal Marquee */}
      <div className="relative w-full flex overflow-x-hidden select-none pt-2">
        <motion.div
          animate={isInView ? { x: ["0%", "-50%"] } : false}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 32,
          }}
          className="flex whitespace-nowrap gap-3 py-1 will-change-transform transform-gpu"
        >
          {[...technologies, ...technologies].map((tech, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-stone-200 text-xs font-mono text-stone-700 hover:text-black hover:border-stone-400 transition-colors shadow-sm"
            >
              <Zap className="w-3 h-3 text-stone-500" />
              <span>{tech}</span>
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  );
}
