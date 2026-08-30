"use client";

import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/ui/Navbar";
import TerminalWidget from "@/components/ui/TerminalWidget";
import AmbientRainEffect from "@/components/ui/AmbientRainEffect";
import AmbientFogEffect from "@/components/ui/AmbientFogEffect";

import Hero from "@/components/sections/Hero";
import StatsMarquee from "@/components/sections/StatsMarquee";
import ScrollVelocityMarquee from "@/components/sections/ScrollVelocityMarquee";
import ManifestoSection from "@/components/sections/ManifestoSection";
import ParallaxShowcase from "@/components/sections/ParallaxShowcase";
import StickyCardStack from "@/components/sections/StickyCardStack";
import ProjectShowcase from "@/components/sections/ProjectShowcase";
import SkillsMatrix from "@/components/sections/SkillsMatrix";
import ExperienceTimeline from "@/components/sections/ExperienceTimeline";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";

export default function Home() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const { scrollY } = useScroll();

  // Full-width continuous smooth background transition from Top Cream to Bottom Obsidian
  // Stays light throughout Hero, Marquee, Manifesto, and Verified Certifications, then darkens AFTER certificates to deep obsidian
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
    </motion.main>
  );
}
