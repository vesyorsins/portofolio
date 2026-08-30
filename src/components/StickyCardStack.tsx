"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Trophy, Award, Medal, Sparkles, CheckCircle2 } from "lucide-react";

interface ChampionshipCard {
  number: string;
  badge: string;
  title: string;
  tagline: string;
  category: string;
  description: string;
  stats: string;
  bullets: string[];
}

const championshipCards: ChampionshipCard[] = [
  {
    number: "01",
    badge: "1ST PLACE // NATIONAL CHAMPION 🏆",
    title: "National Cyber Defense & CTF Championship",
    category: "Offensive Security & Red Teaming",
    tagline: "Rank 1 out of 120+ professional and collegiate security teams",
    description:
      "Memimpin tim dalam kompetisi Capture The Flag (CTF) tingkat nasional, memecahkan 18 tantangan eksploitasi biner, reverse engineering, dan zero-day payload mitigation dalam maraton 24 jam non-stop.",
    stats: "1st Place Winner • Score: 4,850 Pts • 0 Breaches",
    bullets: [
      "Binary exploitation & buffer overflow payload analysis",
      "Reverse engineering proprietary protocol obfuscation",
      "Web application vulnerability hunting & zero-day patch mitigation",
    ],
  },
  {
    number: "02",
    badge: "1ST PLACE // BEST TECHNICAL ARCHITECTURE 🥇",
    title: "Global AI Systems & Autonomous Agent Summit",
    category: "Generative AI & Machine Learning",
    tagline: "Sub-300ms multi-agent autonomous reasoning engine",
    description:
      "Membangun arsitektur multi-agent terdistribusi berbasis quantized LLM dan vector search RAG (Pinecone) untuk analisis data kompleks real-time dengan akurasi semantik tinggi dan zero latency delay.",
    stats: "1st Place Winner • 85 Finalist Teams • Sub-300ms Latency",
    bullets: [
      "Deterministic agent routing with zero hallucination loops",
      "High-throughput vector indexing handling 1M+ embeddings",
      "Streamed token inference architecture over WebSocket",
    ],
  },
  {
    number: "03",
    badge: "GRAND CHAMPION // 1ST PLACE 🏆",
    title: "Cloud Infrastructure & DevOps Resilience Cup",
    category: "Site Reliability & Cloud Architecture",
    tagline: "Zero-downtime multi-region Kubernetes chaos challenge",
    description:
      "Mendesain dan mempertahankan infrastruktur cloud skala masif di AWS menggunakan Terraform IaC, auto-scaling Kubernetes, dan bertahan dari skenario chaos injection tanpa pernah kehilangan request.",
    stats: "Grand Champion • 99.999% SLA • Zero Dropped Requests",
    bullets: [
      "Automated blue/green canary deployments with Helm",
      "Multi-region failover and distributed ingress routing",
      "Prometheus & Grafana automated chaos remediation",
    ],
  },
  {
    number: "04",
    badge: "1ST PLACE // BEST WEB APPLICATION 🏅",
    title: "National Web Innovation & Software Engineering Competition",
    category: "Full-Stack & Interactive Web Engineering",
    tagline: "Sub-second load times with 100/100 Lighthouse performance",
    description:
      "Merancang dan mengembangkan platform web interaktif skala penuh dengan arsitektur modern, optimalisasi Core Web Vitals, dan integrasi Web Audio dinamis dengan skor performa sempurna 100/100.",
    stats: "1st Place Winner • 100/100 Lighthouse • Sub-1s LCP",
    bullets: [
      "Server-Side Rendering (SSR) & dynamic state caching",
      "Fluid motion micro-interactions with zero layout shift",
      "Full WCAG/WAI-ARIA accessibility compliance",
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
  const smoothProgress = useSpring(scrollYProgress, springConfig);

  // Dynamic Header Colors: Starts in the same dark tone as Verified Certifications (#1c1917 & #57534e) and transitions into Pure White (#ffffff & #d4d4d8) on scroll
  const titleColor = useTransform(smoothProgress, [0.06, 0.28], ["#1c1917", "#ffffff"]);
  const subtitleColor = useTransform(smoothProgress, [0.06, 0.28], ["#57534e", "#d4d4d8"]);

  // Card 0 (Base card - stays pinned and scales down as cards stack on it)
  const scale0 = useSpring(useTransform(scrollYProgress, [0, 0.35, 0.65, 0.95], [1, 0.95, 0.9, 0.85]), springConfig);
  const filter0 = useTransform(scrollYProgress, [0, 0.35, 0.65, 0.95], ["brightness(1)", "brightness(0.85)", "brightness(0.72)", "brightness(0.6)"]);

  // Card 1 (Slides up from 100vh to 0px between scroll 0.12 and 0.36)
  const rawY1 = useTransform(scrollYProgress, [0.12, 0.36], ["100vh", "0vh"]);
  const y1 = useSpring(rawY1, springConfig);
  const scale1 = useSpring(useTransform(scrollYProgress, [0.36, 0.65, 0.95], [1, 0.95, 0.9]), springConfig);
  const filter1 = useTransform(scrollYProgress, [0.36, 0.65, 0.95], ["brightness(1)", "brightness(0.85)", "brightness(0.72)"]);

  // Card 2 (Slides up from 100vh to 0px between scroll 0.42 and 0.66)
  const rawY2 = useTransform(scrollYProgress, [0.42, 0.66], ["100vh", "0vh"]);
  const y2 = useSpring(rawY2, springConfig);
  const scale2 = useSpring(useTransform(scrollYProgress, [0.66, 0.95], [1, 0.95]), springConfig);
  const filter2 = useTransform(scrollYProgress, [0.66, 0.95], ["brightness(1)", "brightness(0.85)"]);

  // Card 3 (Slides up from 100vh to 0px between scroll 0.72 and 0.96)
  const rawY3 = useTransform(scrollYProgress, [0.72, 0.96], ["100vh", "0vh"]);
  const y3 = useSpring(rawY3, springConfig);

  const cardTransforms = [
    { y: "0vh", scale: scale0, filter: filter0, zIndex: 10 },
    { y: y1, scale: scale1, filter: filter1, zIndex: 20 },
    { y: y2, scale: scale2, filter: filter2, zIndex: 30 },
    { y: y3, scale: 1, filter: "brightness(1)", zIndex: 40 },
  ];

  return (
    <section
      ref={containerRef}
      id="awards"
      className="relative w-full h-[400vh] bg-transparent"
    >
      {/* Sticky Viewport Frame - locks in place while user scrolls through the 400vh container */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center px-4 md:px-8 max-w-5xl mx-auto overflow-hidden">
        
        {/* Section Header with dynamic color interpolation from Verified Certifications dark tone into crisp white */}
        <div className="text-center mb-10 md:mb-14 shrink-0">
          <motion.h2
            style={{ color: titleColor }}
            className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight transition-colors duration-200"
          >
            Competitive Hackathons & Championship Awards
          </motion.h2>
          <motion.p
            style={{ color: subtitleColor }}
            className="text-xs sm:text-sm mt-2 max-w-xl mx-auto font-normal transition-colors duration-200"
          >
            Gulir ke bawah &mdash; setiap trofi dan kemenangan kejuaraan naik menumpuk secara berurutan.
          </motion.p>
        </div>

        {/* Stack Box where all cards overlap & rise onto each other */}
        <div className="relative w-full h-[420px] sm:h-[390px] md:h-[370px] max-w-4xl">
          {championshipCards.map((card, index) => {
            const tf = cardTransforms[index];
            return (
              <motion.div
                key={card.number}
                style={{
                  y: tf.y,
                  scale: tf.scale,
                  filter: tf.filter,
                  zIndex: tf.zIndex,
                }}
                className="absolute inset-0 w-full rounded-3xl p-6 sm:p-8 bg-[#141418] border border-zinc-800 flex flex-col justify-between select-none shadow-none"
              >
                {/* Card Top: Number, Category & Rank Badge */}
                <div>
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl sm:text-3xl font-mono font-bold text-amber-400">
                        {card.number}
                      </span>
                      <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                        {card.category}
                      </span>
                    </div>

                    <div className="px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-[11px] font-mono text-amber-400 font-bold">
                      {card.badge}
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-mono text-zinc-300 mt-1">
                    {card.tagline}
                  </p>
                  
                  <p className="text-xs sm:text-sm text-zinc-300 mt-3 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Card Bottom: Bullets & Stat Highlight */}
                <div className="pt-4 border-t border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-zinc-400">
                    {card.bullets.slice(0, 2).map((bullet, i) => (
                      <span key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="text-zinc-300">{bullet}</span>
                      </span>
                    ))}
                  </div>

                  <div className="px-3 py-1 rounded-xl bg-zinc-800/80 border border-zinc-700/60 text-right shrink-0">
                    <span className="text-xs font-mono font-semibold text-emerald-400">
                      {card.stats}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
