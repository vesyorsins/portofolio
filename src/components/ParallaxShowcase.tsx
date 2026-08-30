"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { GithubIcon } from "@/components/Icons";

interface ParallaxItem {
  title: string;
  category: string;
  tech: string;
  metric: string;
  link: string;
  github?: string;
}

const row1Items: ParallaxItem[] = [
  {
    title: "NeuroNexus LLM Orchestrator",
    category: "Distributed AI Pipeline",
    tech: "Next.js 16 • Groq • Pinecone • FastAPI",
    metric: "< 380ms Latency (TTFT)",
    link: "https://github.com",
    github: "https://github.com",
  },
  {
    title: "Aetheria 3D Physics WebGL",
    category: "Creative Engineering",
    tech: "Three.js • React Three Fiber • Rapier WASM",
    metric: "60 FPS GPU-Locked",
    link: "https://github.com",
    github: "https://github.com",
  },
  {
    title: "TerraFlow Stream Ingestion",
    category: "High-Throughput Analytics",
    tech: "Apache Kafka • TimescaleDB • TypeScript",
    metric: "50k events / second",
    link: "https://github.com",
    github: "https://github.com",
  },
  {
    title: "Vortex Raymarching Engine",
    category: "GPU Compute & Shaders",
    tech: "GLSL • WebGL 2.0 • Post-Processing",
    metric: "4K Realtime Volumetrics",
    link: "https://github.com",
    github: "https://github.com",
  },
];

const row2Items: ParallaxItem[] = [
  {
    title: "Quantum Kinetic Component Kit",
    category: "UI Design Architecture",
    tech: "React 19 • Framer Motion • Radix UI",
    metric: "2.4k+ GitHub Stars",
    link: "https://github.com",
    github: "https://github.com",
  },
  {
    title: "Synthetix Neural Audio Pipeline",
    category: "Audio Processing",
    tech: "Python • PyTorch • ONNX Runtime",
    metric: "99.2% Prosody Score",
    link: "https://github.com",
    github: "https://github.com",
  },
  {
    title: "CyberPulse Cluster Telemetry",
    category: "Distributed Observability",
    tech: "Go • WebSocket • Prometheus • Docker",
    metric: "99.99% Node Accuracy",
    link: "https://github.com",
    github: "https://github.com",
  },
  {
    title: "Tactile 3D Physics Badge",
    category: "Interactive WebGL Canvas",
    tech: "R3F • Rapier Cloth Kinematics",
    metric: "Inertia Drag Physics",
    link: "https://github.com",
    github: "https://github.com",
  },
];

const row3Items: ParallaxItem[] = [
  {
    title: "HyperVector KNN Search",
    category: "Vector Index Engine",
    tech: "Rust • HNSW Indexing • gRPC",
    metric: "Sub-15ms KNN Retrieval",
    link: "https://github.com",
    github: "https://github.com",
  },
  {
    title: "Chronos Financial Telemetry",
    category: "Market Data Engine",
    tech: "Next.js • Redis Streams • PostgreSQL",
    metric: "Microsecond Order Aggregation",
    link: "https://github.com",
    github: "https://github.com",
  },
  {
    title: "Aura Multimodal Vision Agent",
    category: "Computer Vision Pipeline",
    tech: "Gemini Pro • OpenCV • Python",
    metric: "Zero-Shot Video Parsing",
    link: "https://github.com",
    github: "https://github.com",
  },
  {
    title: "Apex Edge Micro-frontend Router",
    category: "Cloud Native Routing",
    tech: "Cloudflare Workers • Vercel Edge • WASM",
    metric: "12ms Global Edge Resolution",
    link: "https://github.com",
    github: "https://github.com",
  },
];

function ShowcaseCard({ item, translate }: { item: ParallaxItem; translate: MotionValue<number> }) {
  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{ y: -12, borderColor: "#1c1917" }}
      transition={{ duration: 0.25 }}
      className="group/card relative h-[250px] w-[340px] sm:w-[400px] shrink-0 rounded-2xl p-6 bg-[#141418] border border-zinc-800 shadow-2xl overflow-hidden flex flex-col justify-between select-none"
    >
      {/* Card Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-mono bg-zinc-800 text-zinc-300 mb-2.5 font-medium">
            {item.category}
          </span>
          <h4 className="text-lg sm:text-xl font-bold text-white group-hover/card:text-zinc-200 transition-colors leading-snug">
            {item.title}
          </h4>
        </div>

        <div className="flex items-center gap-1.5">
          {item.github && (
            <a
              href={item.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
              title="GitHub Repo"
            >
              <GithubIcon className="w-3.5 h-3.5" />
            </a>
          )}
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
            title="Explore"
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Card Body & Metric */}
      <div className="space-y-2.5">
        <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800/80 flex items-center justify-between">
          <span className="text-xs font-mono text-zinc-400">{item.tech}</span>
          <span className="text-xs font-mono text-white font-medium shrink-0 ml-2">
            {item.metric}
          </span>
        </div>

        <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500">
          <span>PARALLAX_STREAM</span>
          <span className="text-zinc-300 font-medium group-hover/card:text-white flex items-center gap-1">
            VIEW DETAILS <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </motion.div>
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

  // Horizontal 3-Row opposite movement
  const translateXRow1 = useSpring(useTransform(scrollYProgress, [0, 1], [-400, 400]), springConfig);
  const translateXRow2 = useSpring(useTransform(scrollYProgress, [0, 1], [400, -400]), springConfig);
  const translateXRow3 = useSpring(useTransform(scrollYProgress, [0, 1], [-350, 350]), springConfig);

  return (
    <section
      ref={ref}
      className="relative w-full min-h-[200vh] py-32 overflow-hidden flex flex-col items-center justify-center bg-transparent"
    >
      {/* Clean Header without Card Background, matching Hero Typography */}
      <div className="relative z-20 text-center max-w-3xl mx-auto px-4 mb-20">
        <div className="text-xs font-mono text-stone-500 uppercase tracking-widest mb-3 font-medium">
          [ 01 / PARALLAX SHOWCASE ]
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-[#1c1917] tracking-tight leading-tight">
          Selected Engineering Works
        </h2>
        <p className="text-stone-600 text-sm md:text-base mt-3 max-w-xl mx-auto font-normal">
          Multi-layer isometric 3D stream showing verified production systems, real-time architectures, and creative web experiments.
        </p>
      </div>

      {/* 3D Isometric Viewport Container */}
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
        {/* Row 1: Slides Right */}
        <div className="flex gap-5 md:gap-6 justify-center">
          {[...row1Items, ...row1Items].map((item, idx) => (
            <ShowcaseCard key={`r1-${idx}`} item={item} translate={translateXRow1} />
          ))}
        </div>

        {/* Row 2: Slides Left */}
        <div className="flex gap-5 md:gap-6 justify-center">
          {[...row2Items, ...row2Items].map((item, idx) => (
            <ShowcaseCard key={`r2-${idx}`} item={item} translate={translateXRow2} />
          ))}
        </div>

        {/* Row 3: Slides Right */}
        <div className="flex gap-5 md:gap-6 justify-center">
          {[...row3Items, ...row3Items].map((item, idx) => (
            <ShowcaseCard key={`r3-${idx}`} item={item} translate={translateXRow3} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
