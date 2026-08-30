import { SkillCategory } from "@/types/portfolio";
import { Brain, Code2, ShieldAlert, Server } from "lucide-react";

export const skillCategories: SkillCategory[] = [
  {
    id: "fullstack",
    title: "Full-Stack Web & TypeScript Architecture",
    icon: Code2,
    tagline: "Scalable Distributed Web Applications & Server Components",
    description: "Membangun sistem web full-stack modern berbasis Next.js App Router, strict TypeScript type safety, dan performa Core Web Vitals 100/100.",
    skills: [
      { name: "Next.js 16 (App Router / RSC)", level: 98, category: "Full-Stack Framework", description: "Server components, streaming SSR, dynamic caching" },
      { name: "React 19 & TypeScript 5.8", level: 96, category: "Reactive Core", description: "Strict types, concurrent mode, custom hooks" },
      { name: "Tailwind CSS v4 & Modern UI", level: 98, category: "Design System", description: "Design tokens, accessible primitives, cyber themes" },
      { name: "FastAPI / Node.js / Hono", level: 90, category: "API Services", description: "Asynchronous microservices, WebSocket streaming" },
      { name: "PostgreSQL, TimescaleDB & Prisma", level: 90, category: "Data Layer", description: "Time-series queries, ACID transactions, migrations" },
    ],
  },
  {
    id: "security",
    title: "Security Engineering & Pentest",
    icon: ShieldAlert,
    tagline: "Offensive Security, Vulnerability Hunting, and App Hardening",
    description: "Melakukan audit keamanan aplikasi web, penetration testing berstandar OWASP Top 10, fuzzing payload WAF, dan penguatan arsitektur zero-trust.",
    skills: [
      { name: "Burp Suite & OWASP ZAP", level: 94, category: "Web Security", description: "Vulnerability scanning, request fuzzing, payload injection" },
      { name: "Nmap, Wireshark & Netcat", level: 92, category: "Network Recon", description: "Packet inspection, port scanning, and attack surface mapping" },
      { name: "Binary Exploitation & Reverse Eng", level: 86, category: "Offensive Sec", description: "Buffer overflow analysis, shellcode, and binary disassembly" },
      { name: "Zero-Trust & JWT Hardening", level: 95, category: "App Defense", description: "Strict CSP/CORS headers, cryptographic token rotation" },
      { name: "Kali Linux & Metasploit", level: 90, category: "Red Teaming", description: "Penetration testing environments & automated defense testing" },
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
];
