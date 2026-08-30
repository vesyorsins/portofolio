"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Calendar, MapPin, CheckCircle2, Milestone } from "lucide-react";

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
      "Memimpin perancangan infrastruktur inferensi AI terdistribusi, engine web modern, dan antarmuka aplikasi berkinerja tinggi skala enterprise.",
    achievements: [
      "Mengembangkan arsitektur multi-agent LLM (Groq + Gemini RAG) yang memangkas latency TTFT sebesar 45% dan efisiensi biaya API hingga 60%.",
      "Membangun dynamic web audio spectrum engine dan antarmuka responsif dengan rata-rata 60 FPS stabil.",
      "Mengotomatiskan deployment pipeline multi-region pada AWS Edge & Vercel dengan jaminan ketersediaan 99.98%.",
    ],
    skills: ["Next.js 16", "TypeScript", "LangChain / RAG", "FastAPI", "Docker", "Tailwind CSS"],
  },
  {
    period: "2023 — 2024",
    role: "Senior Full-Stack & Security Engineer",
    company: "Cyberspace Interactive",
    location: "Bandung, Indonesia",
    type: "Contract",
    summary:
      "Bertanggung jawab atas migrasi arsitektur frontend monolithic ke Next.js App Router, optimalisasi Core Web Vitals, dan audit keamanan OWASP.",
    achievements: [
      "Memimpin refactor codebase ke strict TypeScript dengan cakupan unit test 98% dan zero runtime regression.",
      "Mengembangkan pustaka komponen animasi spring kinematics yang diadopsi di lebih dari 15 aplikasi klien.",
      "Mencapai skor Lighthouse 100/100 pada Performance, Accessibility, dan Best Practices.",
    ],
    skills: ["React 19", "TypeScript", "Framer Motion", "Burp Suite", "PostgreSQL", "Redis"],
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
    skills: ["Python", "PyTorch", "OpenCV", "Algorithms", "Scikit-Learn"],
  },
];

export default function ExperienceTimeline() {
  const timelineRef = useRef<HTMLDivElement>(null);

  // Track scroll specifically along the timeline track to guarantee 100% completion at the end
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 65%"],
  });

  const springConfig = { stiffness: 220, damping: 28 };
  // Transforms 0..0.85 scroll range to full 0..1 scale so it reaches the very tip without cutting short
  const progressRatio = useTransform(scrollYProgress, [0, 0.85], [0, 1]);
  const scaleY = useSpring(progressRatio, springConfig);

  return (
    <section
      id="experience"
      className="relative w-full py-32 px-4 md:px-8 max-w-5xl mx-auto bg-transparent select-none"
    >
      {/* Section Header */}
      <div className="text-left mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
          Professional Experience
        </h2>
        <p className="text-zinc-400 text-sm md:text-base mt-2 max-w-xl font-normal leading-relaxed">
          Rekam jejak profesional dalam merancang dan mengeksekusi sistem digital berkinerja tinggi.
        </p>
      </div>

      {/* Timeline Container with Continuous Connecting Line */}
      <div
        ref={timelineRef}
        className="relative pl-6 md:pl-10 border-l border-zinc-800 space-y-12 pb-6"
      >
        {/* Dynamic Scroll Progress Laser Line - Solid Crisp White without Glow */}
        <motion.div
          style={{ scaleY }}
          className="absolute -left-[1px] top-0 bottom-0 w-[2px] bg-white origin-top shadow-none"
        />

        {experiences.map((exp, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="relative group"
          >
            {/* Node Dot */}
            <div className="absolute -left-[31px] md:-left-[47px] top-2 w-4 h-4 rounded-full bg-zinc-900 border-2 border-zinc-500 group-hover:border-white transition-colors flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 group-hover:bg-white transition-colors" />
            </div>

            {/* Experience Card */}
            <div className="p-6 md:p-8 rounded-3xl bg-[#141418] border border-zinc-800 hover:border-zinc-700 transition-colors shadow-none">
              
              {/* Meta row */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-zinc-300 px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700">
                  <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                  {exp.period}
                </span>
                <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                  {exp.location} • <span className="text-zinc-300 font-semibold">{exp.type}</span>
                </span>
              </div>

              {/* Title & Company */}
              <h3 className="text-xl md:text-2xl font-bold text-white mb-1 tracking-tight group-hover:text-zinc-100 transition-colors">
                {exp.role}
              </h3>
              <p className="text-xs sm:text-sm font-mono text-zinc-400 mb-4">
                {exp.company}
              </p>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-5">
                {exp.summary}
              </p>

              {/* Bullet Points */}
              <div className="space-y-2.5 mb-6 p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
                {exp.achievements.map((point, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-2.5 text-xs md:text-sm text-zinc-300 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-zinc-800">
                {exp.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs font-mono px-2.5 py-0.5 rounded-md bg-zinc-900 text-zinc-300 border border-zinc-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>

            </div>
          </motion.div>
        ))}

        {/* Terminal End Node Dot */}
        <div className="relative -left-[31px] md:-left-[47px] flex items-center gap-3 pt-2">
          <div className="w-4 h-4 rounded-full bg-zinc-900 border-2 border-zinc-600 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
          </div>
          <span className="text-[11px] font-mono text-zinc-400">
            // CAREER TIMELINE GENESIS
          </span>
        </div>
      </div>
    </section>
  );
}
