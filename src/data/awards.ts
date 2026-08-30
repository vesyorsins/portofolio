import { ChampionshipCard } from "@/types/portfolio";

export const championshipCards: ChampionshipCard[] = [
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
