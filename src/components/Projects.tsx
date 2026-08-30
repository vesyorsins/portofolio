"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, useScroll } from "framer-motion";
import { ExternalLink, ArrowUpRight, X, CheckCircle2 } from "lucide-react";
import { GithubIcon } from "@/components/Icons";

interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  category: "AI & Backend" | "Creative Web" | "Full-Stack";
  description: string;
  tags: string[];
  metrics: string;
  githubUrl?: string;
  liveUrl?: string;
  architectureDetails: {
    problem: string;
    solution: string;
    highlights: string[];
  };
}

const projectsData: ProjectItem[] = [
  {
    id: "neuro-nexus",
    title: "NeuroNexus AI Inference Router",
    tagline: "Autonomous multi-agent orchestration platform with sub-second reasoning",
    category: "AI & Backend",
    description:
      "Enterprise dual-LLM orchestration platform leveraging streaming RAG, Pinecone vector search, and autonomous subagent execution pipelines.",
    tags: ["Next.js 16", "Groq / LLaMA 3.1", "Gemini Flash", "FastAPI", "Pinecone"],
    metrics: "< 380ms TTFT • 99.4% Eval Score",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    architectureDetails: {
      problem: "High latency and excessive API costs when handling deep multi-step reasoning workflows across single-model architectures.",
      solution: "Designed a multi-tier routing layer using Groq for instant sub-agent decomposition and Gemini Flash for deep multimodal context synthesis.",
      highlights: [
        "Dynamic token streaming over WebSockets with zero buffering",
        "Deterministic fallback architecture with zero downtime",
        "Vector-indexed semantic memory pipeline using HNSW indexing",
      ],
    },
  },
  {
    id: "aetheria-3d",
    title: "Aetheria 3D WebGL Sandbox",
    tagline: "Interactive 3D physics-driven audio-visual environment with custom GLSL shaders",
    category: "Creative Web",
    description:
      "Creative engineering showcase featuring GPU-accelerated particle fields, Rapier physics cloth dynamics, and procedural audio reactivity.",
    tags: ["Three.js", "React Three Fiber", "GLSL Shaders", "Rapier WASM", "Web Audio API"],
    metrics: "60 FPS GPU-Locked • 0 Dropped Frames",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    architectureDetails: {
      problem: "Heavy browser CPU bottlenecks when executing real-time physics and audio-reactive post-processing shaders simultaneously.",
      solution: "Offloaded particle simulation to GPGPU computing in WebGL and isolated rigid-body calculations via WebAssembly Rapier physics.",
      highlights: [
        "Custom Raymarching glass refractive materials with PBR shading",
        "Physics-based cloth & rope dynamics simulation",
        "Adaptive DPR scaling for mobile 60fps performance",
      ],
    },
  },
  {
    id: "terraflow-cloud",
    title: "TerraFlow Data Mesh Platform",
    tagline: "Distributed real-time analytics streaming engine for high-throughput IoT systems",
    category: "Full-Stack",
    description:
      "Event-driven stream processing platform handling 50k+ events/second with interactive live time-series dashboards.",
    tags: ["Next.js", "TypeScript", "Apache Kafka", "TimescaleDB", "Tailwind CSS"],
    metrics: "50k req/sec • Sub-50ms query time",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    architectureDetails: {
      problem: "Data ingestion delays and UI freezes when rendering live telemetry for thousands of concurrent IoT nodes.",
      solution: "Implemented chunked Kafka streaming pipelines with TimescaleDB continuous aggregates and optimistic canvas chart rendering.",
      highlights: [
        "End-to-end WebSocket telemetry pipeline",
        "Automated anomaly detection engine with Redis Streams",
        "High density data tables with virtualized scrolling",
      ],
    },
  },
  {
    id: "quantum-design-sys",
    title: "Quantum Kinetic Design Kit",
    tagline: "Micro-interaction focused component system built for creative developers",
    category: "Creative Web",
    description:
      "Open-source library of 40+ physics-based UI components, magnetic cursor triggers, and momentum scroll choreography primitives.",
    tags: ["React 19", "Framer Motion", "GSAP", "Tailwind CSS", "Radix UI"],
    metrics: "2.4k+ GitHub Stars • Zero Layout Shifts",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    architectureDetails: {
      problem: "Standard UI component libraries lack organic, physics-informed motion and often cause layout thrashing.",
      solution: "Built hardware-accelerated spring kinematics utilizing Framer Motion layoutId and GSAP ScrollTrigger timelines.",
      highlights: [
        "100% accessible keyboard navigation (WAI-ARIA compliant)",
        "Zero layout shifts with hardware transform acceleration",
        "Customizable spring physics curves and magnetic triggers",
      ],
    },
  },
];

function ProjectCard({
  project,
  onOpenModal,
}: {
  project: ProjectItem;
  onOpenModal: (project: ProjectItem) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), { stiffness: 200, damping: 22 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), { stiffness: 200, damping: 22 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative rounded-2xl p-6 md:p-8 bg-[#141418] border border-zinc-800 hover:border-zinc-600 transition-colors duration-300 flex flex-col justify-between group shadow-xl"
    >
      {/* Card Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono bg-zinc-800 text-zinc-300 mb-3 font-medium">
            {project.category}
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight group-hover:text-zinc-200 transition-colors">
            {project.title}
          </h3>
        </div>

        {/* Links */}
        <div className="flex items-center gap-1.5">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
              title="GitHub Repo"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white text-black hover:bg-zinc-200 transition-colors"
              title="Open Project"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* Description & Performance Metric */}
      <div className="mb-8">
        <p className="text-sm text-zinc-400 leading-relaxed mb-4">
          {project.description}
        </p>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300">
          <span>{project.metrics}</span>
        </div>
      </div>

      {/* Tags & Action */}
      <div className="pt-4 border-t border-zinc-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-mono px-2.5 py-1 rounded bg-zinc-800/60 text-zinc-400 border border-zinc-800"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="text-[11px] font-mono px-2 py-1 rounded bg-zinc-900 text-zinc-500">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        <button
          onClick={() => onOpenModal(project)}
          className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-300 hover:text-white transition-colors cursor-pointer"
          data-cursor-interactive
        >
          <span>Architecture Specs</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const springConfig = { stiffness: 180, damping: 25 };
  const gridY = useSpring(useTransform(scrollYProgress, [0, 1], [30, -30]), springConfig);

  const categories = ["All", "AI & Backend", "Creative Web", "Full-Stack"];

  const filteredProjects =
    selectedCategory === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === selectedCategory);

  return (
    <section
      ref={containerRef}
      id="projects"
      className="relative w-full py-32 px-4 md:px-8 max-w-7xl mx-auto bg-transparent"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="text-xs font-mono text-stone-500 uppercase tracking-widest mb-3 font-medium">
            [ 02 / SELECTED CASE STUDIES ]
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1c1917] tracking-tight">
            Detailed Architecture Dives
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-zinc-900 border border-zinc-800">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? "bg-zinc-800 text-white font-semibold"
                  : "text-zinc-400 hover:text-white"
              }`}
              data-cursor-interactive
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <motion.div
        style={{ y: gridY }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 perspective-[1000px]"
      >
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpenModal={(p) => setActiveModalProject(p)}
          />
        ))}
      </motion.div>

      {/* Architecture Deep Dive Modal */}
      <AnimatePresence>
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-2xl bg-[#141418] border border-zinc-800 rounded-2xl p-6 md:p-8 shadow-2xl z-10 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-800">
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider font-semibold">
                  TECHNICAL CASE STUDY
                </span>
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <h3 className="text-2xl font-bold text-white mb-1.5">
                {activeModalProject.title}
              </h3>
              <p className="text-sm text-zinc-400 mb-6 font-mono">
                {activeModalProject.tagline}
              </p>

              {/* Problem & Solution */}
              <div className="space-y-4 mb-6">
                <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                  <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1.5 font-bold">
                    THE ARCHITECTURAL CHALLENGE
                  </h4>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {activeModalProject.architectureDetails.problem}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                  <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1.5 font-bold">
                    ENGINEERING SOLUTION
                  </h4>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {activeModalProject.architectureDetails.solution}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                  <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2 font-bold">
                    KEY IMPLEMENTATION HIGHLIGHTS
                  </h4>
                  <div className="space-y-2">
                    {activeModalProject.architectureDetails.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs md:text-sm text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tech Stack Pills in Modal */}
              <div className="mb-6">
                <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2">
                  FULL STACK
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeModalProject.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-mono px-2.5 py-1 rounded bg-zinc-900 text-zinc-300 border border-zinc-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-zinc-800">
                {activeModalProject.githubUrl && (
                  <a
                    href={activeModalProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-white transition-colors flex items-center gap-1.5"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>Source Code</span>
                  </a>
                )}
                {activeModalProject.liveUrl && (
                  <a
                    href={activeModalProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-white hover:bg-zinc-200 text-xs font-semibold text-black transition-colors flex items-center gap-1.5"
                  >
                    <span>Launch App</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
