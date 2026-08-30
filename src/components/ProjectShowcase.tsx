"use client";

import React, { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  ArrowUpRight,
  Code2,
  Server,
  ShieldAlert,
  Brain,
  ChevronDown,
  Layers,
  ExternalLink,
  GitBranch,
  Zap,
  Radio,
  Sliders,
} from "lucide-react";

interface ArchitectureNode {
  name: string;
  type: string;
  latency: string;
}

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
  telemetry: {
    status: string;
    rps: string;
    p99: string;
    pipeline: ArchitectureNode[];
  };
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
    telemetry: {
      status: "STREAMING // ACTIVE",
      rps: "48,200 req/s",
      p99: "7.8ms",
      pipeline: [
        { name: "Edge Ingestion", type: "WebSocket", latency: "1.2ms" },
        { name: "Stream Buffer", type: "RingBuffer", latency: "2.1ms" },
        { name: "React Canvas", type: "WebGL/RAF", latency: "4.5ms" },
      ],
    },
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
    telemetry: {
      status: "INFERENCE // READY",
      rps: "1,450 qps",
      p99: "182ms",
      pipeline: [
        { name: "Semantic Embedding", type: "BGE-Large", latency: "34ms" },
        { name: "HNSW Dense Search", type: "Pinecone", latency: "42ms" },
        { name: "LLM Cross-Rerank", type: "LLaMA-3-8B", latency: "106ms" },
      ],
    },
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
    telemetry: {
      status: "CLUSTER // HEALTHY",
      rps: "120,000 req/s",
      p99: "4.2ms",
      pipeline: [
        { name: "Global Anycast", type: "AWS Route53", latency: "0.8ms" },
        { name: "Envoy Ingress", type: "K8s Mesh", latency: "1.4ms" },
        { name: "Pod Replicas", type: "Autoscaled", latency: "2.0ms" },
      ],
    },
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
    telemetry: {
      status: "PROBE // AUDITING",
      rps: "3,800 probes/s",
      p99: "12.4ms",
      pipeline: [
        { name: "Packet Intercept", type: "RawSocket", latency: "1.1ms" },
        { name: "WAF Fuzz Engine", type: "RegEx Sandbox", latency: "5.3ms" },
        { name: "Signature Audit", type: "OWASP Engine", latency: "6.0ms" },
      ],
    },
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
    telemetry: {
      status: "AUDIO CONTEXT // RUNNING",
      rps: "44.1 kHz PCM",
      p99: "0.4ms",
      pipeline: [
        { name: "Oscillator Node", type: "Sine/Saw/Square", latency: "0.1ms" },
        { name: "Biquad Filter", type: "LowPass/Resonance", latency: "0.1ms" },
        { name: "FFT Analyser", type: "2048 Bins Canvas", latency: "0.2ms" },
      ],
    },
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
    telemetry: {
      status: "SYNC // REPLICATING",
      rps: "82,400 ops/s",
      p99: "2.3ms",
      pipeline: [
        { name: "gRPC Transport", type: "HTTP/2 Stream", latency: "0.6ms" },
        { name: "Raft Consensus", type: "Leader Election", latency: "1.1ms" },
        { name: "In-Memory Store", type: "Lockless SkipList", latency: "0.6ms" },
      ],
    },
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
    telemetry: {
      status: "GATEWAY // ENFORCING",
      rps: "65,000 req/s",
      p99: "4.8ms",
      pipeline: [
        { name: "eBPF Packet Filter", type: "Kernel XDP", latency: "0.3ms" },
        { name: "ED25519 Token Verify", type: "Crypto Core", latency: "2.1ms" },
        { name: "Payload Sanitizer", type: "Rust SIMD", latency: "2.4ms" },
      ],
    },
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
    telemetry: {
      status: "INFERENCE // ACCELERATED",
      rps: "142 tok/s",
      p99: "210ms",
      pipeline: [
        { name: "Context Tokenizer", type: "Byte-Pair Engine", latency: "8ms" },
        { name: "4-bit GGUF Core", type: "CUDA Kernels", latency: "185ms" },
        { name: "AST Validator", type: "TypeScript Compiler", latency: "17ms" },
      ],
    },
  },
];

// Individual High-Performance Interactive Project Card with Solid Matte Styling & Crisp 3D Physics
function ProjectCardItem({
  project,
  index,
}: {
  project: ProjectItem;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [showBlueprint, setShowBlueprint] = useState(false);

  const rotateXSpring = useSpring(0, { stiffness: 300, damping: 25 });
  const rotateYSpring = useSpring(0, { stiffness: 300, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4.5;
    const rotateY = ((x - centerX) / centerX) * 4.5;

    rotateXSpring.set(rotateX);
    rotateYSpring.set(rotateY);
  };

  const handleMouseLeave = () => {
    rotateXSpring.set(0);
    rotateYSpring.set(0);
  };

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

  return (
    <motion.div
      layout
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.94, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, y: -10 }}
      transition={{
        layout: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
        opacity: { duration: 0.25 },
        scale: { duration: 0.25 },
        delay: index * 0.04,
      }}
      style={{
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        transformStyle: "preserve-3d",
      }}
      className="group relative rounded-3xl p-6 sm:p-7 bg-[#141418] border border-zinc-800 hover:border-zinc-600 transition-colors duration-200 flex flex-col justify-between overflow-hidden will-change-transform"
    >
      {/* Card Content Container */}
      <div className="relative z-10">
        {/* Card Header: Serial, Year & Category Pill */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-zinc-400 group-hover:text-white transition-colors">
              {project.serial}
            </span>
            <span className="text-zinc-600">•</span>
            <span className="text-xs font-mono text-zinc-400">
              {project.year}
            </span>
          </div>

          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono border bg-zinc-900 border-zinc-800 text-zinc-300 flex items-center gap-1.5">
            {getCategoryIcon(project.category)}
            <span>{project.category}</span>
          </span>
        </div>

        {/* Title with Kinetic Directional Arrow */}
        <div className="mb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-zinc-100 transition-colors flex items-center justify-between gap-2">
            <span>{project.title}</span>
            <ArrowUpRight className="w-5 h-5 text-zinc-400 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0" />
          </h3>
          <p className="text-xs font-mono text-zinc-400 mt-1">
            ROLE: <span className="text-zinc-300 font-semibold">{project.role}</span>
          </p>
        </div>

        {/* Tagline / Subtitle */}
        <p className="text-xs sm:text-sm font-mono text-zinc-300 mb-3 leading-relaxed">
          {project.tagline}
        </p>

        {/* Description */}
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Interactive System Blueprint & Telemetry Accordion Section */}
      <div className="relative z-10 pt-5 mt-5 border-t border-zinc-800/80 flex flex-col gap-3.5">
        {/* Toggle Blueprint Button */}
        <button
          onClick={() => setShowBlueprint(!showBlueprint)}
          className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[11px] font-mono text-zinc-300 hover:text-white transition-all flex items-center justify-between cursor-pointer group/btn"
        >
          <div className="flex items-center gap-2">
            <Sliders className="w-3.5 h-3.5 text-zinc-400 group-hover/btn:text-white" />
            <span>{showBlueprint ? "HIDE ARCHITECTURE BLUEPRINT" : "INSPECT ARCHITECTURE BLUEPRINT"}</span>
          </div>
          <ChevronDown
            className={`w-3.5 h-3.5 text-zinc-400 group-hover/btn:text-white transition-transform duration-200 ${
              showBlueprint ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        {/* Expanded Architecture Blueprint Stream */}
        <AnimatePresence>
          {showBlueprint && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="p-3.5 rounded-2xl bg-[#0e0e12] border border-zinc-800 text-xs font-mono space-y-2.5">
                <div className="flex items-center justify-between text-[10px] text-zinc-400 pb-1.5 border-b border-zinc-800">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <Radio className="w-3 h-3" />
                    {project.telemetry.status}
                  </span>
                  <span>RPS: {project.telemetry.rps}</span>
                  <span className="text-zinc-200 font-bold">P99: {project.telemetry.p99}</span>
                </div>

                {/* Animated Data Pipeline Node Chain */}
                <div className="grid grid-cols-3 gap-1.5 pt-1">
                  {project.telemetry.pipeline.map((node, nIdx) => (
                    <div
                      key={nIdx}
                      className="p-2 rounded-lg bg-[#141418] border border-zinc-800 text-[10px] flex flex-col justify-between"
                    >
                      <span className="text-zinc-300 truncate font-semibold">{node.name}</span>
                      <div className="flex items-center justify-between mt-1 text-[9px]">
                        <span className="text-zinc-500">{node.type}</span>
                        <span className="text-zinc-300 font-mono font-bold">{node.latency}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tech Badges */}
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Metrics Highlight & Action Links */}
        <div className="flex items-center justify-between gap-2 pt-1 text-xs font-mono">
          <div className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 font-semibold text-[11px] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>{project.metrics}</span>
          </div>

          <div className="flex items-center gap-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors border border-zinc-800"
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
                className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors border border-zinc-800"
                title="Live Demo"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

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

  // Count projects per category
  const getCount = (cat: string) => {
    if (cat === "All") return projectsData.length;
    return projectsData.filter((p) => p.category === cat).length;
  };

  // Filter projects by category
  const filteredProjects = projectsData.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

  // Decide how many projects to show (top 4 or all)
  const displayedProjects = isExpanded
    ? filteredProjects
    : filteredProjects.slice(0, 4);

  return (
    <section
      id="projects"
      className="relative w-full py-28 md:py-36 px-4 md:px-8 max-w-6xl mx-auto bg-transparent select-none"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight">
            Selected Engineering Works
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm mt-2 max-w-xl font-normal leading-relaxed">
            Kurasi sistem perangkat lunak, infrastruktur cloud terdistribusi, perkakas audit keamanan siber, dan pipeline Machine Learning performa tinggi.
          </p>
        </div>

        {/* Category Filters with Clean Solid Sliding Pill */}
        <div className="flex flex-wrap gap-1 p-1.5 rounded-2xl bg-[#141418] border border-zinc-800 shrink-0">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-3.5 py-1.5 rounded-xl text-xs font-mono transition-colors duration-200 cursor-pointer flex items-center gap-1.5 ${
                  isSelected ? "text-black font-bold" : "text-zinc-400 hover:text-white"
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeProjectFilterPill"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    className="absolute inset-0 rounded-xl bg-white shadow-none"
                  />
                )}
                <span className="relative z-10">{cat}</span>
                <span
                  className={`relative z-10 text-[10px] ${
                    isSelected ? "text-zinc-700 font-bold" : "text-zinc-400"
                  }`}
                >
                  ({getCount(cat)})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid with Smooth 3D PopLayout & Spring Interpolation */}
      <motion.div
        layout
        transition={{ layout: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
        className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6"
      >
        <AnimatePresence mode="popLayout">
          {displayedProjects.map((project, index) => (
            <ProjectCardItem
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* "See More Projects" / "Lihat Semua Proyek" Expand Toggle Button */}
      {filteredProjects.length > 4 && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-6 py-3 rounded-2xl bg-[#141418] hover:bg-zinc-800 border border-zinc-700 text-white text-xs sm:text-sm font-mono font-bold transition-all duration-300 flex items-center gap-2.5 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>
              {isExpanded
                ? "Collapse Project Archive"
                : `See More Projects (${filteredProjects.length - 4} More)`}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-zinc-400 transition-transform duration-300 ${
                isExpanded ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
        </div>
      )}
    </section>
  );
}
