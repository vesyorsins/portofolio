# 🧭 PROJECT CONTEXT & ARCHITECTURAL GUIDELINES

> **IMPORTANT**: Setiap agen AI atau developer yang melakukan perubahan, penambahan fitur, atau refactoring pada codebase ini **WAJIB membaca dan mematuhi aturan di dalam dokumen ini**.

---

## 📌 Ringkasan Proyek

Portofolio web berkinerja tinggi (High-Performance Engineering & Creative Portfolio) untuk **Vesyorsins** (Creative Technologist & Lead Software / AI Engineer). Memadukan estetika cyber-minimalist / technical HUD, kinetic typography, efek canvas ambient, kartu interaktif 3D tilt, smooth scrolling, terminal interaktif, dan integrasi headless CMS (Sanity.io) dengan sistem *graceful fallback* ke data statis.

---

## 🛠️ Tech Stack & Dependencies

| Layer | Teknologi & Versi | Catatan Penggunaan |
|---|---|---|
| **Framework** | Next.js `16.3.3` (App Router) | Menggunakan Server Component di root (`page.tsx`) dengan ISR (`revalidate = 60`) |
| **Runtime / Library** | React `19.2.8` & React-DOM `19.2.8` | Server & Client Components modern |
| **Bahasa** | TypeScript `^5` | Strict mode aktif, path alias `@/*` merujuk ke `./src/*` |
| **Styling** | Tailwind CSS `v4` (`@tailwindcss/postcss`) | Menggunakan `@import "tailwindcss";` di `globals.css`, utility classes, `clsx`, `tailwind-merge` |
| **Animations & FX** | Framer Motion `^13.1.1`, GSAP `^3.15.0` | Animasi fisika spring, parallax scroll, dynamic background color transform |
| **Smooth Scroll** | Lenis `^1.3.26` | Smooth scrolling terintegrasi di `src/components/ui/SmoothScroll.tsx` (di-disable pada `/studio`) |
| **Canvas & Graphics** | HTML5 Canvas 2D, Three.js (`@react-three/fiber`, `@react-three/drei`) | `AmbientRainEffect`, `AmbientFogEffect`, Three.js stack terinstal |
| **Headless CMS** | Sanity.io `^6.11.0`, `next-sanity ^13.3.3` | Studio tertanam di rute `/studio`, GROQ queries di `src/sanity/queries.ts` |
| **Icons** | Lucide React `^1.37.0` + Custom SVGs | Custom brand icons di `src/components/ui/Icons.tsx` |
| **Scripts / Tooling** | `tsx ^4.23.13`, `dotenv ^17.4.2`, ESLint 9 | Seeding CMS via `npm run sanity:seed` |

---

## 📂 Struktur Direktori Proyek

```plaintext
portofolio/
├── .env.local                  # Environment variables lokal (Sanity ID, Dataset, Token)
├── .env.local.example          # Contoh variabel lingkungan
├── sanity.config.ts            # Konfigurasi Sanity Studio (basePath: "/studio")
├── next.config.ts              # Konfigurasi Next.js (remote patterns: cdn.sanity.io, unsplash)
├── eslint.config.mjs           # Konfigurasi Flat ESLint (Next.js core-web-vitals + TypeScript)
├── postcss.config.mjs          # Konfigurasi PostCSS (@tailwindcss/postcss)
├── tsconfig.json               # Konfigurasi TypeScript (alias @/* -> src/*)
├── package.json                # Metadata & dependensi npm
├── scripts/
│   └── seed-sanity.ts          # Skrip seeding data awal dari src/data/* ke dataset Sanity
├── public/                     # Asset statis (favicon, gambar, font jika ada)
└── src/
    ├── app/
    │   ├── favicon.ico
    │   ├── globals.css         # CSS dasar Tailwind v4 & custom scrollbar
    │   ├── layout.tsx          # Root layout: Geist font, CustomCursor, SmoothScroll
    │   ├── page.tsx            # Root Server Component: parallel CMS fetch + ISR
    │   └── studio/
    │       └── [[...tool]]/
    │           ├── layout.tsx  # Layout khusus studio (viewport metadata)
    │           └── page.tsx    # NextStudio client component wrapper
    ├── components/
    │   ├── PortfolioApp.tsx    # Client orchestrator utama: scroll background transition & terminal modal
    │   ├── sections/           # Komponen section modular:
    │   │   ├── Hero.tsx                 # Hero section: rotating roles, CTA, 3D Profile Card
    │   │   ├── StatsMarquee.tsx         # HUD metric counters
    │   │   ├── ScrollVelocityMarquee.tsx# Kinetic typography marquee
    │   │   ├── ManifestoSection.tsx     # Word-by-word scroll reveal manifesto
    │   │   ├── ParallaxShowcase.tsx     # 3D isometric certificate ticker stream
    │   │   ├── StickyCardStack.tsx      # Stacking cards scroll untuk penghargaan
    │   │   ├── ProjectShowcase.tsx      # Telemetry architecture & project showcase
    │   │   ├── SkillsMatrix.tsx         # Matrix keahlian teknis & tags
    │   │   ├── ExperienceTimeline.tsx   # Garis waktu karier dengan laser indicator
    │   │   ├── ContactSection.tsx       # Transmisi email & status ketersediaan
    │   │   └── Footer.tsx               # Minimalist HUD footer & terminal launcher
    │   └── ui/                 # Komponen UI atomik & effects:
    │       ├── AmbientFogEffect.tsx     # Canvas 2D mist/fog volumetrik
    │       ├── AmbientRainEffect.tsx    # Canvas 2D tetesan air / rain stream
    │       ├── CustomCursor.tsx         # Magnetic custom cursor (dinonaktifkan pada touch device & /studio)
    │       ├── HeroProfileCard.tsx      # 3D holographic tilt, gyro effect, flip gesture card
    │       ├── Icons.tsx                # SVG Icon kustom (Github, Linkedin, dsb.)
    │       ├── Navbar.tsx               # Floating glassmorphism navbar + terminal toggle
    │       ├── ScrollRevealText.tsx     # Reusable text opacity reveal on scroll
    │       ├── SmoothScroll.tsx         # Lenis smooth scroll provider
    │       └── TerminalWidget.tsx       # Cyberpunk CLI terminal modal interaktif
    ├── data/                   # Fallback data lokal jika Sanity CMS belum terkonfigurasi:
    │   ├── awards.ts
    │   ├── certifications.ts
    │   ├── experience.ts
    │   ├── navigation.ts
    │   ├── projects.ts
    │   ├── siteSettings.ts
    │   └── skills.ts
    ├── lib/
    │   └── utils.ts            # Utility helper: cn() (clsx + tailwind-merge)
    ├── sanity/
    │   ├── client.ts           # Sanity client & check isSanityConfigured()
    │   ├── dataProvider.ts     # Bridge data: fetch Sanity dengan fallback otomatis ke src/data/*
    │   ├── image.ts            # Sanity CDN image url builder (urlForImage)
    │   ├── queries.ts          # GROQ queries untuk semua dokumen Sanity
    │   └── schemas/            # Definisi skema Sanity Studio:
    │       ├── index.ts        # Daftar registrasi tipe skema
    │       ├── siteSettings.ts
    │       ├── project.ts
    │       ├── award.ts
    │       ├── certificate.ts
    │       ├── experience.ts
    │       └── skillCategory.ts
    └── types/
        └── portfolio.ts        # Definisi antarmuka TypeScript terpusat
```

---

## 🎨 Pola & Gaya Coding (Coding Style & Conventions)

### 1. Komponen & Boundary Architecture
- **Server Component di Root (`src/app/page.tsx`)**:
  - Menjalankan parallel asynchronous data fetching via `Promise.all([getSiteSettings(), getProjects(), ...])`.
  - Mengatur `export const revalidate = 60;` untuk Incremental Static Regeneration (ISR).
  - Melempar data yang didapat ke client component `PortfolioApp.tsx`.
- **Client Component (`"use client";`)**:
  - Selalu sertakan direktif `"use client";` pada baris pertama komponen yang menggunakan React hooks (`useState`, `useEffect`, `useRef`), event listener, browser API (`window`, `navigator`), atau library animasi/canvas (`framer-motion`, `lenis`, dsb.).
  - Pisahkan presentasi UI kompleks ke dalam komponen atomik di `src/components/ui/` atau section di `src/components/sections/`.

### 2. Pola Aliran Data: Dual-Layer Graceful Fallback
- **Aturan Emas Data**: Aplikasi tidak boleh crash jika Sanity CMS mati atau kredensial `.env.local` belum diisi.
- Semua pemanggilan data melalui `src/sanity/dataProvider.ts`.
- Fungsi provider (seperti `getSiteSettings()`, `getProjects()`, dll.) akan memeriksa hasil dari Sanity. Jika `cmsData` kosong atau tidak valid, fungsi secara otomatis mengembalikan default dari `src/data/*`.
- **Sinkronisasi Schema**: Jika Anda menambahkan field baru pada portfolio:
  1. Tambahkan tipenya di `src/types/portfolio.ts`.
  2. Tambahkan field di skema Sanity (`src/sanity/schemas/<type>.ts`).
  3. Perbarui GROQ query di `src/sanity/queries.ts`.
  4. Perbarui mapping di `src/sanity/dataProvider.ts`.
  5. Sediakan nilai default di `src/data/<type>.ts`.
  6. Perbarui skrip seed di `scripts/seed-sanity.ts`.

### 3. Styling & Tailwind CSS v4
- **Tailwind v4 Setup**: Menggunakan `@import "tailwindcss";` di `src/app/globals.css`. Tidak menggunakan syntax Tailwind v3 `@tailwind base;`.
- **Penggabungan Class**: Gunakan `cn(...)` dari `@/lib/utils` untuk class kondisional.
- **Palet Warna & Tema**:
  - Estetika: **Technical Cyber-HUD / Monochromatic Dark with Warm Cream Contrast**.
  - Background Transisi: `PortfolioApp.tsx` mengatur transisi warna latar belakang dari Warm Cream (`#f8f7f4`) di bagian atas ke Deep Obsidian (`#09090b` / `#050508`) saat di-scroll.
  - Border & Glassmorphism: `border-white/[0.08]`, `bg-white/[0.03]`, `backdrop-blur-md`.
  - Tipografi: Geist Sans (`font-sans`) untuk teks utama, Geist Mono (`font-mono`) untuk metadata teknis, label, latency, RPS, dan tag terminal.

### 4. Aturan Animasi & Interaksi
- **Framer Motion**: Gunakan transisi berbasis fisika spring: `{ stiffness: 180, damping: 25 }`.
- **Device Awareness**:
  - `CustomCursor.tsx`: Hanya aktif pada desktop/mouse pointer (`window.matchMedia("(pointer: coarse)").matches`).
  - Rute Studio (`/studio`): Selalu bypass / nonaktifkan Lenis smooth scroll dan Custom Cursor agar tidak mengganggu UI Sanity Studio.

### 5. Konvensi Penamaan (Naming Conventions)
- **Komponen**: `PascalCase` (contoh: `HeroProfileCard.tsx`, `TerminalWidget.tsx`).
- **File Helper, Data & Query**: `camelCase` (contoh: `dataProvider.ts`, `siteSettings.ts`, `queries.ts`).
- **Skrip CLI**: `kebab-case` (contoh: `seed-sanity.ts`).
- **Environment Variables**: `UPPER_SNAKE_CASE` (contoh: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `SANITY_API_TOKEN`).
- **Import Alias**: Wajib selalu menggunakan alias `@/*` (contoh: `import { cn } from "@/lib/utils"`). Jangan gunakan relative path yang bertingkat seperti `../../../lib/utils`.

---

## ⚡ Skrip & Perintah Utama

```bash
# Menjalankan development server
npm run dev

# Memeriksa linting ESLint
npm run lint

# Build untuk production
npm run build

# Menjalankan production server
npm start

# Melakukan seeding data awal ke Sanity.io CMS
npm run sanity:seed
```

---

## 🛡️ Checklist Verifikasi Sebelum & Sesudah Modifikasi Kode

1. [ ] **Cek CONTEXT.md**: Pastikan perubahan konsisten dengan arsitektur dan pola yang ditentukan di sini.
2. [ ] **Cek Type Safety**: Pastikan semua parameter dan return type bertipe eksplisit, bebas dari error TypeScript.
3. [ ] **Cek Graceful Fallback**: Jangan mengubah komponen UI hingga mengasumsikan data CMS selalu ada; gunakan default fallback.
4. [ ] **Cek Import Path**: Gunakan alias `@/...`.
5. [ ] **Jalankan Linter**: Selalu eksekusi `npm run lint` untuk memastikan tidak ada warning atau error baru.
