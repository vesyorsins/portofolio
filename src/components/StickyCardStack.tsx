"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { CheckCircle2, Zap } from "lucide-react";

interface PhilosophyCard {
  number: string;
  title: string;
  tagline: string;
  category: string;
  description: string;
  stats: string;
  bullets: string[];
}

const cards: PhilosophyCard[] = [
  {
    number: "01",
    title: "Multi-Tier Autonomous Inference & Routing",
    category: "Distributed AI Architecture",
    tagline: "Sub-second reasoning with deterministic fallback guarantees",
    description:
      "Arsitektur inferensi yang mengarahkan tugas kognitif cepat ke Groq (LLaMA 3.1) untuk latency sub-400ms dan secara otomatis beralih ke Google Gemini 1.5 Flash untuk analisis konteks multimodal yang mendalam.",
    stats: "< 380ms TTFT • 99.98% Reliability",
    bullets: [
      "Real-time token streaming over WebSockets without buffering",
      "Vector-indexed semantic memory retrieval (Pinecone HNSW)",
      "Automated evaluation suites for model accuracy & guardrails",
    ],
  },
  {
    number: "02",
    title: "GPU-Accelerated 3D WebGL & Physics",
    category: "Creative Engineering",
    tagline: "Hardware-accelerated WebGL locked at constant 60 FPS",
    description:
      "Mengintegrasikan Three.js, React Three Fiber (R3F), dan Rapier Physics berbasis WebAssembly. Setiap kalkulasi gravitasi, inersia, dan partikel diproses langsung di GPU tanpa membebani thread utama JavaScript.",
    stats: "60 FPS GPU-Locked • 0 Dropped Frames",
    bullets: [
      "Custom GLSL raymarching & post-processing shaders",
      "Deterministic rigid body & cloth physics via WebAssembly",
      "Adaptive DPR scaling for optimal mobile battery & frame rate",
    ],
  },
  {
    number: "03",
    title: "Event-Driven Data Mesh & Telemetry",
    category: "Backend & Infrastructure",
    tagline: "High-throughput stream processing handling 50k+ req/sec",
    description:
      "Sistem pemrosesan stream real-time memanfaatkan Apache Kafka dan database time-series TimescaleDB, memungkinkan visualisasi jutaan titik telemetri secara instan tanpa lag atau bottleneck.",
    stats: "50,000 req / sec • Sub-50ms Query Time",
    bullets: [
      "Zero-copy Kafka streaming ingestion pipelines",
      "Continuous materialization views di TimescaleDB",
      "Comprehensive telemetry observability via Prometheus & Grafana",
    ],
  },
  {
    number: "04",
    title: "Kinetic UI & Physics-Driven Motion",
    category: "Frontend Experience",
    tagline: "Organic spring kinematics with zero layout shift",
    description:
      "Transisi antarmuka memanfaatkan spring physics alami (Framer Motion & GSAP Timelines) dipadukan dengan Lenis momentum scroll untuk menghadirkan pengalaman navigasi berkelas tinggi tanpa distraksi visual.",
    stats: "100 / 100 Lighthouse • WAI-ARIA Compliant",
    bullets: [
      "Hardware-accelerated CSS transforms on composited layers",
      "Lenis smooth inertia scrolling engine with RAF synchronization",
      "Tactile hover micro-interactions and accessible focus states",
    ],
  },
];

export default function StickyCardStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress across the whole 400vh tall stack container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const springConfig = { stiffness: 200, damping: 30 };

  // Card 0 (Base card - stays pinned and scales down as cards stack on it)
  const scale0 = useSpring(useTransform(scrollYProgress, [0, 0.35, 0.65, 0.95], [1, 0.95, 0.9, 0.85]), springConfig);
  const brightness0 = useTransform(scrollYProgress, [0, 0.35, 0.65, 0.95], [1, 0.85, 0.72, 0.6]);

  // Card 1 (Slides up from 100vh to 0px between scroll 0.12 and 0.36)
  const rawY1 = useTransform(scrollYProgress, [0.12, 0.36], ["100vh", "0vh"]);
  const y1 = useSpring(rawY1, springConfig);
  const scale1 = useSpring(useTransform(scrollYProgress, [0.36, 0.65, 0.95], [1, 0.95, 0.9]), springConfig);
  const brightness1 = useTransform(scrollYProgress, [0.36, 0.65, 0.95], [1, 0.85, 0.72]);

  // Card 2 (Slides up from 100vh to 0px between scroll 0.42 and 0.66)
  const rawY2 = useTransform(scrollYProgress, [0.42, 0.66], ["100vh", "0vh"]);
  const y2 = useSpring(rawY2, springConfig);
  const scale2 = useSpring(useTransform(scrollYProgress, [0.66, 0.95], [1, 0.95]), springConfig);
  const brightness2 = useTransform(scrollYProgress, [0.66, 0.95], [1, 0.85]);

  // Card 3 (Slides up from 100vh to 0px between scroll 0.72 and 0.96)
  const rawY3 = useTransform(scrollYProgress, [0.72, 0.96], ["100vh", "0vh"]);
  const y3 = useSpring(rawY3, springConfig);

  const cardTransforms = [
    { y: "0vh", scale: scale0, brightness: brightness0, zIndex: 10 },
    { y: y1, scale: scale1, brightness: brightness1, zIndex: 20 },
    { y: y2, scale: scale2, brightness: brightness2, zIndex: 30 },
    { y: y3, scale: 1, brightness: 1, zIndex: 40 },
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[400vh] bg-transparent"
    >
      {/* Sticky Viewport Frame - locks in place while user scrolls through the 400vh container */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center px-4 md:px-8 max-w-5xl mx-auto overflow-hidden">
        
        {/* Section Header with crisp white text */}
        <div className="text-center mb-10 md:mb-14 shrink-0">
          <div className="text-xs font-mono text-white/90 uppercase tracking-widest mb-3 font-semibold">
            [ 03 / ENGINEERING PHILOSOPHY ]
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Architectural Pillars & Principles
          </h2>
          <p className="text-white/80 text-xs sm:text-sm mt-2 max-w-xl mx-auto font-normal">
            Gulir ke bawah — setiap kartu naik dan menumpuk secara berurutan di layar.
          </p>
        </div>

        {/* Stack Box where all cards overlap & rise onto each other */}
        <div className="relative w-full h-[420px] sm:h-[390px] md:h-[370px] max-w-4xl">
          {cards.map((card, index) => {
            const tf = cardTransforms[index];
            return (
              <motion.div
                key={card.number}
                style={{
                  y: tf.y,
                  scale: tf.scale as any,
                  filter: typeof tf.brightness === "number" ? `brightness(${tf.brightness})` : useTransform(tf.brightness as MotionValue<number>, (b) => `brightness(${b})`),
                  zIndex: tf.zIndex,
                }}
                className="absolute inset-0 rounded-3xl p-6 sm:p-8 md:p-10 bg-[#141418] border border-zinc-800/90 shadow-[0_8px_32px_rgba(0,0,0,0.36)] flex flex-col justify-between select-none"
              >
                {/* Card Header */}
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl sm:text-4xl font-mono font-extrabold text-white">
                        {card.number}
                      </span>
                      <span className="text-xs font-mono px-3 py-0.5 rounded-full bg-zinc-800 text-zinc-300 font-medium">
                        {card.category}
                      </span>
                    </div>

                    <div className="p-2 sm:p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-200 shrink-0 inline-flex items-center gap-2 w-fit">
                      <Zap className="w-3.5 h-3.5 text-white" />
                      <span>{card.stats}</span>
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight mb-1">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-mono text-zinc-400 mb-3">
                    {card.tagline}
                  </p>

                  <p className="text-zinc-300 text-xs sm:text-sm md:text-base leading-relaxed line-clamp-3 md:line-clamp-none">
                    {card.description}
                  </p>
                </div>

                {/* Bullets */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-4 border-t border-zinc-800/80 mt-auto">
                  {card.bullets.map((b, i) => (
                    <div key={i} className="flex items-start gap-2 text-[11px] sm:text-xs text-zinc-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{b}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
