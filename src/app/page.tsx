"use client";

import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsMarquee from "@/components/StatsMarquee";
import ScrollVelocityMarquee from "@/components/ScrollVelocityMarquee";
import ManifestoSection from "@/components/ManifestoSection";
import ParallaxShowcase from "@/components/ParallaxShowcase";
import StickyCardStack from "@/components/StickyCardStack";
import ProjectShowcase from "@/components/ProjectShowcase";
import SkillsMatrix from "@/components/SkillsMatrix";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import TerminalWidget from "@/components/TerminalWidget";
import AmbientRainEffect from "@/components/AmbientRainEffect";
import AmbientFogEffect from "@/components/AmbientFogEffect";
import FloatingMusicPlayer from "@/components/FloatingMusicPlayer";

export default function Home() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const { scrollY } = useScroll();

  // Full-width continuous smooth background transition from Top Cream to Bottom Obsidian
  // Stays light throughout Hero, Marquee, Manifesto, and Verified Certifications, then darkens AFTER certificates
  const backgroundColor = useTransform(
    scrollY,
    [0, 2400, 3800, 5200, 6800],
    ["#f8f7f4", "#f4f0e8", "#f4f0e8", "#18181c", "#09090b"]
  );

  return (
    <motion.main
      style={{ backgroundColor }}
      className="relative flex flex-col min-h-screen w-full overflow-x-clip transition-colors duration-200"
    >
      {/* Ambient Rain / Water Droplets Stream (Emerges in the dark realm) */}
      <AmbientRainEffect />

      {/* Ambient Volumetric Rolling Mist / Fog (Emerges at the bottom deep black zone) */}
      <AmbientFogEffect />

      {/* Floating Island Navigation */}
      <Navbar onOpenTerminal={() => setIsTerminalOpen(true)} />

      {/* Hero with 3D Holographic Tilt Portrait Card & Layered Scroll Parallax */}
      <Hero onOpenTerminal={() => setIsTerminalOpen(true)} />

      {/* Real-time HUD stats metrics */}
      <StatsMarquee />

      {/* Velocity Scroll Kinetic Typography Marquee */}
      <ScrollVelocityMarquee />

      {/* Word-by-Word Scroll Reveal Manifesto */}
      <ManifestoSection />

      {/* 3D Isometric Multi-Row Certificate Stream */}
      <ParallaxShowcase />

      {/* Sticky Stacking Cards on Scroll (Awards & Championships) */}
      <StickyCardStack />

      {/* Text-First Engineering Project Showcase with Expandable Archive */}
      <ProjectShowcase />

      {/* Stack & Skills Matrix with Scroll Offsets */}
      <SkillsMatrix />

      {/* Journey Timeline with Dynamic Laser Progress Line */}
      <ExperienceTimeline />

      {/* Contact & Direct Transmission Section */}
      <ContactSection />

      {/* Minimalist HUD Footer */}
      <Footer onOpenTerminal={() => setIsTerminalOpen(true)} />

      {/* Interactive Terminal Widget */}
      <TerminalWidget
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />

      {/* Persistent Floating Vinyl Music Player (Eleanor Whisper - Lalu Biru) */}
      <FloatingMusicPlayer />
    </motion.main>
  );
}
