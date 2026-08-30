"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Calendar, MapPin, CheckCircle2 } from "lucide-react";

interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  type: string;
  summary: string;
  achievements: string[];
  skills: string[];
}

const experiences: ExperienceItem[] = [
  {
    period: "2024 — PRESENT",
    role: "Lead Software & AI Systems Engineer",
    company: "Nexus Labs Innovations",
    location: "Jakarta / Remote",
    type: "Full-Time",
    summary:
      "Memimpin perancangan infrastruktur inferensi AI terdistribusi, engine 3D WebGL, dan antarmuka web modern skala enterprise.",
    achievements: [
      "Mengembangkan arsitektur multi-agent LLM (Groq + Gemini RAG) yang memangkas latency TTFT sebesar 45% dan efisiensi biaya API hingga 60%.",
      "Membangun 3D WebGL interactive engine menggunakan Three.js & Rapier physics WASM dengan rata-rata 60 FPS stabil.",
      "Mengotomatiskan deployment pipeline multi-region pada AWS Edge & Vercel dengan jaminan ketersediaan 99.98%.",
    ],
    skills: ["Next.js 16", "Three.js (R3F)", "LangChain / RAG", "FastAPI", "Docker", "Tailwind CSS v4"],
  },
  {
    period: "2023 — 2024",
    role: "Senior Full-Stack Engineer",
    company: "Cyberspace Interactive",
    location: "Bandung, Indonesia",
    type: "Contract",
    summary:
      "Bertanggung jawab atas migrasi arsitektur frontend monolithic ke Next.js App Router dan optimalisasi Core Web Vitals.",
    achievements: [
      "Memimpin refactor codebase ke strict TypeScript dengan cakupan unit test 98% dan zero runtime regression.",
      "Mengembangkan pustaka komponen animasi spring kinematics (GSAP & Framer Motion) yang diadopsi di lebih dari 15 aplikasi klien.",
      "Mencapai skor Lighthouse 100/100 pada Performance, Accessibility, dan Best Practices.",
    ],
    skills: ["React 19", "TypeScript", "GSAP ScrollTrigger", "Framer Motion", "PostgreSQL", "Redis"],
  },
  {
    period: "2022 — 2023",
    role: "AI Researcher & Lab Assistant",
    company: "Informatics & Computing Laboratory",
    location: "University Research Division",
    type: "Academic & Research",
    summary:
      "Melakukan riset terapan di bidang Machine Learning, Computer Vision, dan memfasilitasi praktikum algoritma komputasi tingkat lanjut.",
    achievements: [
      "Merancang model klasifikasi gambar deep learning berbasis PyTorch dengan akurasi 94.2% pada dataset benchmark.",
      "Membimbing lebih dari 120 mahasiswa dalam penguasaan struktur data, algoritma Python, dan prinsip rekayasa perangkat lunak.",
    ],
    skills: ["Python", "PyTorch", "Computer Vision", "Algorithms & Data Structures", "Git Workflow"],
  },
];

export default function ExperienceTimeline() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, { stiffness: 200, damping: 25 });

  return (
    <section
      ref={containerRef}
      id="experience"
      className="relative w-full py-32 px-4 md:px-8 max-w-7xl mx-auto bg-transparent"
    >
      {/* Section Header */}
      <div className="text-left mb-20">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
          Professional Experience
        </h2>
        <p className="text-zinc-400 text-sm md:text-base mt-3 max-w-xl">
          Rekam jejak profesional dalam merancang dan mengeksekusi sistem digital berkinerja tinggi.
        </p>
      </div>

      {/* Timeline Container with Subtle Neutral Line */}
      <div className="relative pl-6 md:pl-10 border-l border-zinc-800 space-y-12">
        
        {/* Dynamic Scroll Progress Line */}
        <motion.div
          style={{ scaleY }}
          className="absolute -left-[1px] top-0 bottom-0 w-[2px] bg-white origin-top shadow-[0_0_10px_rgba(255,255,255,0.6)]"
        />

        {experiences.map((exp, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="relative group"
          >
            {/* Node Dot */}
            <div className="absolute -left-[31px] md:-left-[47px] top-2 w-4 h-4 rounded-full bg-zinc-900 border-2 border-zinc-500 group-hover:border-white transition-colors flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 group-hover:bg-white" />
            </div>

            {/* Experience Card */}
            <div className="p-6 md:p-8 rounded-2xl bg-[#141418] border border-zinc-800 hover:border-zinc-700 transition-colors shadow-lg">
              
              {/* Meta row */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-zinc-300 px-2.5 py-1 rounded bg-zinc-800">
                  <Calendar className="w-3 h-3 text-zinc-400" />
                  {exp.period}
                </span>
                <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-zinc-500" />
                  {exp.location} • <span className="text-zinc-300">{exp.type}</span>
                </span>
              </div>

              {/* Title & Company */}
              <h3 className="text-xl md:text-2xl font-bold text-white mb-1 tracking-tight">
                {exp.role}
              </h3>
              <p className="text-sm font-mono text-zinc-400 mb-4">
                {exp.company}
              </p>

              <p className="text-sm text-zinc-300 leading-relaxed mb-5">
                {exp.summary}
              </p>

              {/* Bullet Points */}
              <div className="space-y-2.5 mb-6 p-4 rounded-xl bg-zinc-900/70 border border-zinc-800/80">
                {exp.achievements.map((point, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-2.5 text-xs md:text-sm text-zinc-300 leading-relaxed">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-zinc-800/80">
                {exp.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs font-mono px-2.5 py-1 rounded bg-zinc-800/60 text-zinc-300 border border-zinc-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>

            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
