import { ExperienceItem } from "@/types/portfolio";

export const experiences: ExperienceItem[] = [
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
