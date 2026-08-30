"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Brain, Code2, Globe, Server } from "lucide-react";

interface SkillCategory {
  id: string;
  title: string;
  icon: any;
  tagline: string;
  description: string;
  skills: { name: string; level: number; category: string; description: string }[];
}

const skillCategories: SkillCategory[] = [
  {
    id: "ai",
    title: "AI Systems & Machine Learning",
    icon: Brain,
    tagline: "LLM Orchestration, Streaming RAG, and Vector Retrieval",
    description: "Merancang pipeline inferensi AI berbasis agen, embedding semantik berkecepatan tinggi, dan integrasi multi-model dengan performa optimal.",
    skills: [
      { name: "LangChain / LangGraph", level: 94, category: "Agent Workflow", description: "Orkestrasikan subagent otonom & stateful graphs" },
      { name: "Groq (LLaMA 3.1) & Gemini Flash", level: 96, category: "Model Serving", description: "Inferensi latency ultra-rendah & multimodal context" },
      { name: "Pinecone / Milvus Vector DB", level: 90, category: "Semantic RAG", description: "Index HNSW & hybrid semantic dense/sparse retrieval" },
      { name: "Python, PyTorch & Scikit-Learn", level: 88, category: "Core ML", description: "Fine-tuning, evaluasi model, dan data pipeline" },
      { name: "Automated Evals & Guardrails", level: 92, category: "AI Safety", description: "Benchmarking akurasi dan mitigasi halusinasi model" },
    ],
  },
  {
    id: "webgl",
    title: "Creative Web & 3D (WebGL)",
    icon: Globe,
    tagline: "GPU Shaders, 3D Kinematics, dan Micro-interactions",
    description: "Membangun visual web interaktif berstandar tinggi menggunakan Three.js, GLSL shaders, dan kalkulasi fisika WebAssembly tanpa lag.",
    skills: [
      { name: "Three.js & React Three Fiber (R3F)", level: 92, category: "3D Core Engine", description: "Scene graph, PBR materials, custom geometry" },
      { name: "Rapier Physics 3D (WASM)", level: 88, category: "Physics Kinematics", description: "Simulasi rigid-body, cloth, dan rope dynamics" },
      { name: "GLSL Custom Shaders & Raymarching", level: 85, category: "GPU Shaders", description: "Volumetric lighting, refractive glass, noise warps" },
      { name: "GSAP (ScrollTrigger) & Framer Motion", level: 98, category: "Timeline Motion", description: "Choreography timeline & spring kinematics" },
      { name: "Lenis Momentum Smooth Scroll", level: 96, category: "Scroll Engine", description: "Inertia scrolling, zero layout shifts, smooth RAF" },
    ],
  },
  {
    id: "fullstack",
    title: "Full-Stack Architecture & TypeScript",
    icon: Code2,
    tagline: "Scalable Distributed Web Applications & Server Components",
    description: "Membangun sistem web full-stack modern berbasis Next.js App Router, strict TypeScript type safety, dan performa Core Web Vitals 100/100.",
    skills: [
      { name: "Next.js 16 (App Router / RSC)", level: 98, category: "Full-Stack Framework", description: "Server components, streaming SSR, dynamic caching" },
      { name: "React 19 & TypeScript 5.8", level: 96, category: "Reactive Core", description: "Strict types, concurrent mode, custom hooks" },
      { name: "Tailwind CSS v4 & Radix UI", level: 98, category: "Design System", description: "Design tokens, accessible primitives, cyber themes" },
      { name: "FastAPI / Node.js / Hono", level: 90, category: "API Services", description: "Asynchronous microservices, WebSocket streaming" },
      { name: "PostgreSQL, TimescaleDB & Prisma", level: 90, category: "Data Layer", description: "Time-series queries, ACID transactions, migrations" },
    ],
  },
  {
    id: "devops",
    title: "Cloud Native & DevOps Engineering",
    icon: Server,
    tagline: "Containerization, Continuous Delivery, and Observability",
    description: "Mengelola infrastruktur cloud berbasis kontainer Docker, edge deployment, dan pemantauan metrik telemetri sistem secara real-time.",
    skills: [
      { name: "Docker & Container Runtime", level: 90, category: "Containers", description: "Multi-stage builds, rootless containers, compose" },
      { name: "Vercel & AWS Edge Infrastructure", level: 92, category: "Edge Cloud", description: "Serverless functions, Cloudflare Workers, S3, RDS" },
      { name: "GitHub Actions CI/CD Pipelines", level: 90, category: "Automation", description: "Automated linting, testing, and continuous deploy" },
      { name: "Redis Caching & Kafka Streams", level: 86, category: "Message Broker", description: "Pub/Sub message queues & distributed caching" },
      { name: "Linux Administration & Bash CLI", level: 94, category: "Operating Systems", description: "Shell scripting, daemon management, system tuning" },
    ],
  },
];

export default function SkillsMatrix() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const springConfig = { stiffness: 180, damping: 25 };
  const translateY = useSpring(useTransform(scrollYProgress, [0, 1], [40, -40]), springConfig);

  return (
    <section
      ref={containerRef}
      id="skills"
      className="relative w-full py-32 px-4 md:px-8 max-w-7xl mx-auto bg-transparent"
    >
      {/* Header */}
      <div className="text-left mb-20">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
          Core Stack & Technical Competencies
        </h2>
        <p className="text-zinc-400 text-sm md:text-base mt-3 max-w-xl">
          Keahlian teknis dan framework yang telah teruji dalam skala produksi, dikelompokkan berdasarkan domain arsitektur.
        </p>
      </div>

      {/* Grid */}
      <motion.div
        style={{ y: translateY }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8"
      >
        {skillCategories.map((category, idx) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="p-6 md:p-8 rounded-2xl bg-[#141418] border border-zinc-800 hover:border-zinc-700 transition-colors flex flex-col justify-between shadow-lg"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-zinc-800 text-zinc-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">
                      {category.title}
                    </h3>
                    <p className="text-xs font-mono text-zinc-400 mt-0.5">
                      {category.tagline}
                    </p>
                    <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* Skill List */}
                <div className="space-y-3 mt-6">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="space-y-1.5 p-2 rounded-lg bg-zinc-900/60 border border-zinc-800/80">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-zinc-200">{skill.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-zinc-500">{skill.category}</span>
                          <span className="font-mono text-xs text-zinc-300 font-medium">{skill.level}%</span>
                        </div>
                      </div>
                      <div className="w-full h-1 rounded-full bg-zinc-800 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                          className="h-full bg-zinc-400 rounded-full"
                        />
                      </div>
                      <p className="text-[11px] text-zinc-400">
                        {skill.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer tag */}
              <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  VERIFIED IN PRODUCTION
                </span>
                <span>{category.skills.length} CORE CAPABILITIES</span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
