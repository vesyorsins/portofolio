"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Code2,
  Server,
  ShieldAlert,
  Brain,
  Sparkles,
  ChevronDown,
  Layers,
  ExternalLink,
  GitBranch,
  Zap,
} from "lucide-react";

interface ProjectItem {
  id: string;
  serial: string;
  title: string;
  category: "Full-Stack Web" | "Cloud & DevOps" | "Cybersecurity" | "Machine Learning & AI";
  role: string;
  year: string;
  tagline: string;
  description: string;
  metrics: string;
  technologies: string[];
  github?: string;
  demo?: string;
  featured: boolean;
}

const projectsData: ProjectItem[] = [
  {
    id: "sentinel-core",
    serial: "// PROJ_01",
    title: "SentinelCore Autonomous Telemetry Engine",
    category: "Full-Stack Web",
    role: "Lead Full-Stack Architect",
    year: "2025",
    tagline: "Sub-millisecond real-time telemetry streaming over distributed WebSockets",
    description:
      "Arsitektur web real-time berkinerja tinggi untuk agregasi telemetri cluster server skala besar. Menggunakan Next.js 16 App Router, TypeScript, dan WebSocket stream buffer dengan latensi rendering sub-10ms pada 60 FPS terkunci.",
    metrics: "< 10ms Latency • 60 FPS Locked",
    technologies: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "WebSockets", "Framer Motion"],
    github: "https://github.com",
    demo: "https://example.com",
    featured: true,
  },
  {
    id: "neural-rag",
    serial: "// PROJ_02",
    title: "Aegis RAG: Enterprise Vector Retrieval Engine",
    category: "Machine Learning & AI",
    role: "AI & Systems Engineer",
    year: "2025",
    tagline: "Sub-second multi-modal vector search with cross-encoder re-ranking",
    description:
      "Pipeline RAG (Retrieval-Augmented Generation) berbasis Pinecone HNSW indexing dan model quantized LLaMA-3. Mampu memproses pencarian semantik melintasi 1.2M dokumen korporat dengan reranking BM25 dan latensi TTFT 180ms.",
    metrics: "180ms TTFT • 1.2M Vectors Index",
    technologies: ["PyTorch", "FastAPI", "Pinecone", "LLaMA-3", "LangChain", "Hugging Face"],
    github: "https://github.com",
    demo: "https://example.com",
    featured: true,
  },
  {
    id: "k8s-mesh",
    serial: "// PROJ_03",
    title: "AeroMesh: Multi-Region Kubernetes Orchestrator",
    category: "Cloud & DevOps",
    role: "DevOps & Cloud Architect",
    year: "2024",
    tagline: "Automated blue/green zero-downtime cluster deployment with Terraform IaC",
    description:
      "Infrastruktur cloud terdistribusi multi-region di AWS yang dikelola penuh melalui Terraform dan Helm Charts. Dilengkapi sistem automated failover, autoscaling pod dinamis, dan continuous chaos simulation dengan SLA 99.999%.",
    metrics: "99.999% SLA • Zero-Downtime Canary",
    technologies: ["Kubernetes", "Docker", "Terraform", "GitHub Actions", "AWS", "Helm", "Prometheus"],
    github: "https://github.com",
    demo: "https://example.com",
    featured: true,
  },
  {
    id: "vulnerability-probe",
    serial: "// PROJ_04",
    title: "Cerberus: Automated Threat Reconnaissance Platform",
    category: "Cybersecurity",
    role: "Security Engineer / Pentester",
    year: "2024",
    tagline: "OWASP Top 10 payload scanner & network packet attack surface mapper",
    description:
      "Platform audit keamanan aplikasi web dan pemetaan celah serangan jaringan otomatis. Mengotomatisasi verifikasi header keamanan (CSP, CORS, HSTS), fuzzing payload WAF, serta audit otentikasi JWT secara real-time.",
    metrics: "0 False Positives • 100+ Vectors",
    technologies: ["Python", "Nmap", "Wireshark", "Burp Suite API", "Linux", "FastAPI"],
    github: "https://github.com",
    demo: "https://example.com",
    featured: true,
  },
  {
    id: "audio-synth-ui",
    serial: "// PROJ_05",
    title: "Vortex: Interactive Web Audio Synthesizer Studio",
    category: "Full-Stack Web",
    role: "Frontend Engineer",
    year: "2024",
    tagline: "In-browser sound synthesis & real-time Fast Fourier Transform visualiser",
    description:
      "Studio pemrosesan audio berbasis Web Audio API dan AnalyserNode. Menghadirkan simulasi osilator frekuensi suara, filter biquad dinamis, dan visualisasi spectrum wave 60 FPS reaktif tanpa dependensi eksternal.",
    metrics: "Zero Latency • 60 FPS FFT Audio",
    technologies: ["React", "TypeScript", "Web Audio API", "Canvas API", "Tailwind CSS"],
    github: "https://github.com",
    demo: "https://example.com",
    featured: false,
  },
  {
    id: "distributed-cache",
    serial: "// PROJ_06",
    title: "HyperSync: High-Throughput Distributed Cache Mesh",
    category: "Cloud & DevOps",
    role: "Backend & Systems Engineer",
    year: "2024",
    tagline: "Sub-5ms multi-tier key-value store with raft consensus replication",
    description:
      "Sistem caching terdistribusi in-memory dengan replikasi konsensus Raft, kompresi Zstandard real-time, dan invalidasi cache otomatis untuk beban traffic hingga 80.000 request per detik.",
    metrics: "80k req/sec • Sub-5ms Query",
    technologies: ["Go", "Redis", "gRPC", "Docker", "Grafana", "Linux"],
    github: "https://github.com",
    featured: false,
  },
  {
    id: "zero-trust-gateway",
    serial: "// PROJ_07",
    title: "Bastion: Zero-Trust API Security Proxy",
    category: "Cybersecurity",
    role: "Security Architect",
    year: "2024",
    tagline: "Reverse-proxy payload sanitization with cryptographic token rotation",
    description:
      "Reverse proxy gateway berkinerja tinggi yang memeriksa setiap payload request masuk, memitigasi serangan SQLi/XSS melalui regex engine terisolasi, dan memvalidasi rotasi kunci publik ED25519.",
    metrics: "AES-256-GCM • Sub-8ms Overhead",
    technologies: ["Rust", "Reverse Proxy", "JWT ED25519", "Linux eBPF", "Docker"],
    github: "https://github.com",
    featured: false,
  },
  {
    id: "fine-tuned-code-llm",
    serial: "// PROJ_08",
    title: "SyntaxMind: Specialized Code Refactoring LLM",
    category: "Machine Learning & AI",
    role: "Machine Learning Engineer",
    year: "2023",
    tagline: "LoRA quantized model producing automated architectural type migrations",
    description:
      "Model kecerdasan buatan teroptimasi 4-bit GGUF yang dilatih secara khusus untuk analisis keamanan kode, deteksi anti-pattern, dan migrasi otomatis kode warisan ke TypeScript modern yang aman dari celah memori.",
    metrics: "142 tokens/sec • 4-Bit GGUF",
    technologies: ["PyTorch", "Hugging Face", "LoRA", "FastAPI", "Python"],
    github: "https://github.com",
    featured: false,
  },
];

export default function ProjectShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const categories = [
    "All",
    "Full-Stack Web",
    "Cloud & DevOps",
    "Cybersecurity",
    "Machine Learning & AI",
  ];

  // Filter projects by category
  const filteredProjects = projectsData.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

  // Decide how many projects to show (top 4 or all)
  const displayedProjects = isExpanded
    ? filteredProjects
    : filteredProjects.slice(0, 4);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Full-Stack Web":
        return <Code2 className="w-3.5 h-3.5 text-cyan-400" />;
      case "Cloud & DevOps":
        return <Server className="w-3.5 h-3.5 text-blue-400" />;
      case "Cybersecurity":
        return <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />;
      case "Machine Learning & AI":
        return <Brain className="w-3.5 h-3.5 text-purple-400" />;
      default:
        return <Layers className="w-3.5 h-3.5 text-amber-400" />;
    }
  };

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case "Full-Stack Web":
        return "bg-cyan-500/10 text-cyan-300 border-cyan-500/30";
      case "Cloud & DevOps":
        return "bg-blue-500/10 text-blue-300 border-blue-500/30";
      case "Cybersecurity":
        return "bg-rose-500/10 text-rose-300 border-rose-500/30";
      case "Machine Learning & AI":
        return "bg-purple-500/10 text-purple-300 border-purple-500/30";
      default:
        return "bg-zinc-800 text-zinc-300 border-zinc-700";
    }
  };

  return (
    <section
      id="projects"
      className="relative w-full py-28 md:py-36 px-4 md:px-8 max-w-6xl mx-auto bg-transparent select-none"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2 font-bold flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>[ 03 / FEATURED ARCHITECTURE & CODE ]</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight">
            Selected Engineering Works
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm mt-2 max-w-xl font-normal leading-relaxed">
            Kurasi sistem perangkat lunak, infrastruktur cloud, perkakas keamanan siber, dan pipeline Machine Learning yang telah dirancang dan diimplementasikan.
          </p>
        </div>

        {/* Category Filters with Smooth Sliding Active Pill Indicator */}
        <div className="flex flex-wrap gap-1 p-1 rounded-2xl bg-[#14141a]/95 border border-zinc-800/90 backdrop-blur-xl shrink-0 shadow-lg">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-3.5 py-1.5 rounded-xl text-xs font-mono transition-colors duration-200 cursor-pointer ${
                  isSelected ? "text-[#09090d] font-bold" : "text-zinc-400 hover:text-white"
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeProjectFilterPill"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    className="absolute inset-0 rounded-xl bg-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid with Smooth PopLayout & Spring Interpolation */}
      <motion.div
        layout
        transition={{ layout: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
        className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6"
      >
        <AnimatePresence mode="popLayout">
          {displayedProjects.map((project) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: -10 }}
              transition={{
                layout: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.25 },
                scale: { duration: 0.25 },
              }}
              className="group relative rounded-3xl p-6 sm:p-7 bg-[#14141a]/90 backdrop-blur-md border border-zinc-800/90 hover:border-cyan-500/50 shadow-xl hover:shadow-[0_12px_40px_rgba(6,182,212,0.12)] transition-all duration-300 flex flex-col justify-between"
            >
              {/* Card Top: Serial, Category & Year */}
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-zinc-400 group-hover:text-cyan-400 transition-colors">
                      {project.serial}
                    </span>
                    <span className="text-zinc-600">•</span>
                    <span className="text-xs font-mono text-zinc-400">
                      {project.year}
                    </span>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono border flex items-center gap-1.5 ${getCategoryBadgeClass(
                      project.category
                    )}`}
                  >
                    {getCategoryIcon(project.category)}
                    <span>{project.category}</span>
                  </span>
                </div>

                {/* Title & Role */}
                <div className="mb-3">
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors flex items-center justify-between gap-2">
                    <span>{project.title}</span>
                    <ArrowUpRight className="w-5 h-5 text-zinc-400 group-hover:text-cyan-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0" />
                  </h3>
                  <p className="text-xs font-mono text-zinc-400 mt-1">
                    ROLE: <span className="text-zinc-300">{project.role}</span>
                  </p>
                </div>

                {/* Tagline / Subtitle */}
                <p className="text-xs sm:text-sm font-mono text-cyan-200/80 mb-3 leading-relaxed">
                  {project.tagline}
                </p>

                {/* Description */}
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Card Bottom: Tech Pills & Metric Badge */}
              <div className="pt-5 mt-5 border-t border-zinc-800/80 flex flex-col gap-3">
                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-md bg-[#0d0d12] border border-zinc-800 text-[11px] font-mono text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Metrics Highlight & Action Links */}
                <div className="flex items-center justify-between gap-2 pt-1 text-xs font-mono">
                  <div className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold text-[11px] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{project.metrics}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
                        title="View Source Code"
                      >
                        <GitBranch className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg bg-zinc-800/80 hover:bg-cyan-500 hover:text-black text-zinc-400 transition-colors"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* "See More Projects" / "Lihat Semua Proyek" Expand Toggle Button */}
      {filteredProjects.length > 4 && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-6 py-3 rounded-2xl bg-[#14141a]/95 hover:bg-[#1a1a24] border border-cyan-500/40 hover:border-cyan-400 text-white text-xs sm:text-sm font-mono font-bold transition-all duration-300 flex items-center gap-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.5)] cursor-pointer group hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sparkles className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform" />
            <span>
              {isExpanded
                ? "Collapse Project Archive"
                : `See More Projects (${filteredProjects.length - 4} More)`}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-cyan-400 transition-transform duration-300 ${
                isExpanded ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
        </div>
      )}
    </section>
  );
}
