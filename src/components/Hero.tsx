"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import dynamic from "next/dynamic";
import { ArrowUpRight, Copy, Check, Mail, Terminal } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";

const Hero3DCanvas = dynamic(() => import("./3d/Hero3DCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[380px] md:h-[480px] flex items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <div className="w-8 h-8 rounded-full border-2 border-stone-300 border-t-stone-800 animate-spin" />
        <span className="text-xs font-mono text-stone-500">LOADING 3D CANVAS</span>
      </div>
    </div>
  ),
});

interface HeroProps {
  onOpenTerminal?: () => void;
}

export default function Hero({ onOpenTerminal }: HeroProps) {
  const [copied, setCopied] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 180, damping: 25 };
  const textY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 140]), springConfig);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const canvasScale = useSpring(useTransform(scrollYProgress, [0, 1], [1, 0.9]), springConfig);

  const roles = [
    "Full-Stack Software Engineer",
    "Creative Web & 3D Developer",
    "Systems & Data Architect",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("hello@vesyorsins.dev");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full min-h-[92vh] flex items-center justify-center pt-28 pb-20 px-4 md:px-8 overflow-hidden bg-transparent"
    >
      <div className="relative max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Column: Text & Controls */}
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="lg:col-span-7 flex flex-col items-start text-left z-10"
        >
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 mb-6 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span className="text-xs font-mono text-emerald-800 font-medium">
              Available for full-time & selective projects
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#1c1917] leading-[1.08] mb-4"
          >
            Engineering scalable web systems with precision & motion.
          </motion.h1>

          {/* Dynamic Role */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="h-7 mb-6 flex items-center gap-2 text-sm md:text-base font-mono text-stone-600"
          >
            <span>Specializing in</span>
            <motion.span
              key={roleIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="font-semibold text-[#1c1917] bg-white/80 px-2.5 py-0.5 rounded border border-stone-200 shadow-sm"
            >
              {roles[roleIndex]}
            </motion.span>
          </motion.div>

          {/* Bio text */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="text-stone-600 text-sm md:text-base leading-relaxed max-w-xl mb-8 font-normal"
          >
            Building production software at the intersection of robust backend architectures, 
            interactive 3D WebGL interfaces, and performance-focused frontend engineering.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex flex-wrap items-center gap-3 mb-10"
          >
            <button
              onClick={() => scrollTo("projects")}
              className="px-5 py-2.5 rounded-xl bg-[#1c1917] hover:bg-[#292524] text-white text-xs md:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              data-cursor-interactive
              data-cursor-text="VIEW"
            >
              <span>View Selected Projects</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleCopyEmail}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 text-xs md:text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
              data-cursor-interactive
              data-cursor-text="COPY"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-mono text-xs font-semibold">Copied to clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-stone-500" />
                  <span>Copy Email</span>
                </>
              )}
            </button>

            {onOpenTerminal && (
              <button
                onClick={onOpenTerminal}
                className="px-3.5 py-2.5 rounded-xl bg-white/70 hover:bg-white border border-stone-300 text-stone-700 text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                title="Launch CLI"
                data-cursor-interactive
              >
                <Terminal className="w-3.5 h-3.5 text-stone-600" />
                <span>CLI</span>
              </button>
            )}
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="flex items-center gap-4 text-stone-500 text-xs font-mono"
          >
            <span className="text-stone-400">PROFILES:</span>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-black transition-colors"
              data-cursor-interactive
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <span className="text-stone-300">•</span>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-black transition-colors"
              data-cursor-interactive
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
            <span className="text-stone-300">•</span>
            <a
              href="mailto:hello@vesyorsins.dev"
              className="flex items-center gap-1 hover:text-black transition-colors"
              data-cursor-interactive
            >
              <Mail className="w-3.5 h-3.5" />
              <span>hello@vesyorsins.dev</span>
            </a>
          </motion.div>

        </motion.div>

        {/* Right Column: 3D Porcelain Kinetic Sculpture */}
        <motion.div
          style={{ scale: canvasScale }}
          className="lg:col-span-5 relative flex items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full relative"
          >
            <Hero3DCanvas />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
