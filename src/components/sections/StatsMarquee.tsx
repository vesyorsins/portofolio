"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Zap } from "lucide-react";

export default function StatsMarquee() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const springConfig = { stiffness: 180, damping: 25 };
  const cardScale = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [0.97, 1, 0.97]), springConfig);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);

  const stats = [
    { label: "EXPERIENCE", value: "4+ Years", desc: "Production software architecture" },
    { label: "SHIPPED SYSTEMS", value: "24+ Projects", desc: "Web applications & microservices" },
    { label: "OPEN SOURCE COMMITS", value: "1,480+", desc: "Verified GitHub contributions" },
    { label: "PRODUCTION UPTIME", value: "99.98%", desc: "Average system availability" },
  ];

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
        className="max-w-7xl mx-auto px-4 md:px-8 mb-8"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="p-5 md:p-6 rounded-2xl bg-white/80 backdrop-blur-md border border-stone-200/80 hover:border-stone-300 transition-colors group shadow-sm"
            >
              <div className="text-[11px] font-mono text-stone-500 tracking-wider mb-2 font-medium">
                {stat.label}
              </div>
              <div className="text-2xl md:text-3xl font-bold tracking-tight mb-1 text-[#1c1917]">
                {stat.value}
              </div>
              <div className="text-xs text-stone-500">
                {stat.desc}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Telemetry row */}
        <div className="p-3.5 rounded-xl bg-white/70 backdrop-blur-md border border-stone-200/80 flex flex-col md:flex-row items-center justify-between gap-3 text-xs font-mono text-stone-600 shadow-sm">
          <div className="flex items-center gap-2 text-[#1c1917] font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>CORE STACK OVERVIEW:</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <span>• Primary: <span className="text-[#1c1917] font-medium">TypeScript & Python</span></span>
            <span>• Runtime: <span className="text-[#1c1917] font-medium">Node.js & Bun</span></span>
            <span>• Database: <span className="text-[#1c1917] font-medium">PostgreSQL & Redis</span></span>
            <span>• Cloud: <span className="text-[#1c1917] font-medium">AWS & Vercel</span></span>
          </div>
        </div>
      </motion.div>

      {/* Infinite Horizontal Marquee */}
      <div className="relative w-full flex overflow-x-hidden select-none pt-2">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 32,
          }}
          className="flex whitespace-nowrap gap-3 py-1"
        >
          {[...technologies, ...technologies].map((tech, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-stone-200 text-xs font-mono text-stone-700 hover:text-black hover:border-stone-400 transition-colors shadow-sm"
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
