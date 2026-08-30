"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MapPin, Sparkles, Activity, ShieldCheck } from "lucide-react";

interface HeroProfileCardProps {
  imageSrc?: string;
  name?: string;
  role?: string;
}

export default function HeroProfileCard({
  imageSrc = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
  name = "Vesyorsins",
  role = "Lead Software & Creative Engineer",
}: HeroProfileCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse coordinates normalized from -0.5 to 0.5
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 220, damping: 24 };

  // 3D Perspective Rotation
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [14, -14]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), springConfig);

  // Holographic Sheen / Glare position
  const glareX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  // Multi-layer Parallax Offsets for Floating Badges
  const badge1X = useSpring(useTransform(mouseX, [-0.5, 0.5], [-18, 18]), springConfig);
  const badge1Y = useSpring(useTransform(mouseY, [-0.5, 0.5], [-18, 18]), springConfig);

  const badge2X = useSpring(useTransform(mouseX, [-0.5, 0.5], [20, -20]), springConfig);
  const badge2Y = useSpring(useTransform(mouseY, [-0.5, 0.5], [20, -20]), springConfig);

  const badge3X = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), springConfig);
  const badge3Y = useSpring(useTransform(mouseY, [-0.5, 0.5], [14, -14]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      className="relative w-full max-w-[420px] mx-auto [perspective:1400px] select-none py-6"
      data-cursor-interactive
      data-cursor-text="ROTATE"
    >
      {/* Floating Badge 1: Location & Timezone (Top Left) */}
      <motion.div
        style={{
          x: badge1X,
          y: badge1Y,
          translateZ: 60,
        }}
        className="absolute -top-3 -left-4 md:-left-8 z-30 pointer-events-none"
      >
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#e6e3db] shadow-[0_8px_25px_rgba(28,25,23,0.08)] text-xs font-mono text-[#1c1917]">
          <MapPin className="w-3.5 h-3.5 text-stone-600" />
          <span className="font-semibold">JAKARTA, ID</span>
          <span className="text-stone-400">• UTC+7</span>
        </div>
      </motion.div>

      {/* Floating Badge 2: Realtime Live Status (Top Right) */}
      <motion.div
        style={{
          x: badge2X,
          y: badge2Y,
          translateZ: 70,
        }}
        className="absolute top-10 -right-4 md:-right-8 z-30 pointer-events-none"
      >
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1c1917] text-white shadow-[0_8px_25px_rgba(28,25,23,0.18)] text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-medium">AVAILABLE FOR WORK</span>
        </div>
      </motion.div>

      {/* Floating Badge 3: Engineering Spec (Bottom Left) */}
      <motion.div
        style={{
          x: badge3X,
          y: badge3Y,
          translateZ: 80,
        }}
        className="absolute -bottom-4 -left-4 md:-left-6 z-30 pointer-events-none"
      >
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-[#e6e3db] shadow-[0_8px_25px_rgba(28,25,23,0.08)] text-xs font-mono text-stone-800">
          <Activity className="w-3.5 h-3.5 text-emerald-600" />
          <span className="font-semibold">60 FPS 3D WEBGL</span>
          <span className="text-stone-400">/ TS CORE</span>
        </div>
      </motion.div>

      {/* Main 3D Card Container */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className="relative rounded-3xl p-3 bg-white border border-[#e6e3db] shadow-[0_20px_50px_rgba(28,25,23,0.09)] overflow-hidden cursor-grab active:cursor-grabbing"
      >
        {/* Photo Container Frame */}
        <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-[#f4f2eb] border border-stone-200/60">
          
          {/* User Photo */}
          <motion.img
            src={imageSrc}
            alt={name}
            style={{
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.4 }}
            className="w-full h-full object-cover object-center filter grayscale contrast-[1.06] hover:grayscale-0 transition-all duration-700 select-none pointer-events-none"
          />

          {/* Vignette & Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

          {/* Dynamic Light Sheen / Glare Reflection */}
          <motion.div
            style={{
              opacity: isHovered ? 0.35 : 0,
              background: `radial-gradient(circle 280px at ${glareX} ${glareY}, rgba(255,255,255,0.8), transparent 70%)`,
            }}
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          />

          {/* Bottom Card Identity Info */}
          <div className="absolute bottom-0 inset-x-0 p-5 text-white pointer-events-none">
            <div className="flex items-center gap-1.5 mb-1 text-[11px] font-mono text-zinc-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>VERIFIED ENGINEER // SPECIMEN-01</span>
            </div>

            <h3 className="text-2xl font-bold tracking-tight text-white mb-0.5">
              {name}
            </h3>
            <p className="text-xs text-zinc-300 font-mono">
              {role}
            </p>
          </div>

          {/* Corner Tech Mark */}
          <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/40 backdrop-blur-md border border-white/20 text-[10px] font-mono text-white/90">
            [ 3D PERSPECTIVE GYRO ]
          </div>

          <div className="absolute top-3 right-3 p-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
        </div>

      </motion.div>
    </div>
  );
}
