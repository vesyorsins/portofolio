"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/ui/Navbar";
import AmbientRainEffect from "@/components/ui/AmbientRainEffect";
import AmbientFogEffect from "@/components/ui/AmbientFogEffect";

import Hero from "@/components/sections/Hero";
import StatsMarquee from "@/components/sections/StatsMarquee";
import ScrollVelocityMarquee from "@/components/sections/ScrollVelocityMarquee";
import ManifestoSection from "@/components/sections/ManifestoSection";
import ParallaxShowcase from "@/components/sections/ParallaxShowcase";
import StickyCardStack from "@/components/sections/StickyCardStack";
import SkillsMatrix from "@/components/sections/SkillsMatrix";
import ExperienceTimeline from "@/components/sections/ExperienceTimeline";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";

import {
  SiteSettings,
  ChampionshipCard,
  ExperienceItem,
  SkillCategory,
} from "@/types/portfolio";
import { CertificatePhoto } from "@/data/certifications";

export interface PortfolioData {
  settings: SiteSettings;
  awards: ChampionshipCard[];
  certificates: {
    row1: CertificatePhoto[];
    row2: CertificatePhoto[];
    row3: CertificatePhoto[];
  };
  experiences: ExperienceItem[];
  skills: SkillCategory[];
}

export default function PortfolioApp({ initialData }: { initialData: PortfolioData }) {
  const { scrollY } = useScroll();

  // Full-width continuous smooth background transition from Top Cream to Bottom Obsidian
  const backgroundColor = useTransform(
    scrollY,
    [0, 2400, 3800, 5200, 6800],
    ["#f8f7f4", "#f4f0e8", "#f4f0e8", "#18181c", "#09090b"]
  );

  const { settings } = initialData;

  return (
    <motion.main
      style={{ backgroundColor }}
      className="relative flex flex-col min-h-screen w-full overflow-x-clip transition-colors duration-200"
    >
      {/* Ambient Rain / Water Droplets Stream */}
      <AmbientRainEffect />

      {/* Ambient Volumetric Rolling Mist / Fog */}
      <AmbientFogEffect />

      {/* Floating Island Navigation */}
      <Navbar />

      {/* Hero with 3D Holographic Tilt Portrait Card & Layered Scroll Parallax (Connected to CMS) */}
      <Hero settings={settings} />

      {/* Real-time HUD stats metrics (Connected to CMS) */}
      <StatsMarquee
        stats={settings.stats}
        telemetryOverview={settings.marqueeLine1}
      />

      {/* Velocity Scroll Kinetic Typography Marquee (Connected to CMS) */}
      <ScrollVelocityMarquee
        line1={settings.marqueeLine1}
        line2={settings.marqueeLine2}
      />

      {/* Word-by-Word Scroll Reveal Manifesto (Connected to CMS) */}
      <ManifestoSection manifestoText={settings.manifestoText} />

      {/* 3D Isometric Multi-Row Certificate Stream (Connected to CMS) */}
      <ParallaxShowcase certs={initialData.certificates} />

      {/* Sticky Stacking Cards on Scroll (Connected to CMS Awards) */}
      <StickyCardStack awards={initialData.awards} />

      {/* Stack & Skills Matrix with Scroll Offsets (Connected to CMS Skills) */}
      <SkillsMatrix categories={initialData.skills} />

      {/* Journey Timeline with Dynamic Laser Progress Line (Connected to CMS Experience) */}
      <ExperienceTimeline milestones={initialData.experiences} />

      {/* Contact & Direct Transmission Section (Connected to CMS Email) */}
      <ContactSection email={settings.directEmail} />

      {/* Minimalist HUD Footer */}
      <Footer />
    </motion.main>
  );
}
