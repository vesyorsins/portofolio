"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, PanInfo } from "framer-motion";
import { MapPin, Sparkles, Activity, ShieldCheck, Crown, Code2, Cpu, Layers, Sparkle } from "lucide-react";

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
  const [viewMode, setViewMode] = useState<"photo" | "jack">("photo");
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse coordinates normalized from -0.5 to 0.5 for 3D gyro tilt
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

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === "photo" ? "jack" : "photo"));
  };

  // Secret swipe gesture trigger
  const handleDragEnd = (_: any, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 40 || Math.abs(info.velocity.x) > 250) {
      toggleViewMode();
    }
  };

  return (
    <div className="relative w-full max-w-[420px] mx-auto [perspective:1400px] select-none py-2">
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
        className="absolute -bottom-3 -left-4 md:-left-6 z-30 pointer-events-none"
      >
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-[#e6e3db] shadow-[0_8px_25px_rgba(28,25,23,0.08)] text-xs font-mono text-stone-800">
          <Activity className="w-3.5 h-3.5 text-emerald-600" />
          <span className="font-semibold">60 FPS 3D WEBGL</span>
          <span className="text-stone-400">/ TS CORE</span>
        </div>
      </motion.div>

      {/* Main Animated Secret Swipe & Flip Container */}
      <AnimatePresence mode="wait">
        {viewMode === "photo" ? (
          /* VIEW 1: 3D Holographic Tilt Portrait Photo Card */
          <motion.div
            key="photo-card"
            ref={cardRef}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.5}
            onDragEnd={handleDragEnd}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, rotateY: 90, scale: 0.95 }}
            animate={{ opacity: 1, rotateY: 0, scale: 1 }}
            exit={{ opacity: 0, rotateY: -90, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            whileHover={{ scale: 1.02 }}
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent pointer-events-none" />

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
                  <span>VERIFIED ENGINEER</span>
                </div>

                <h3 className="text-2xl font-bold tracking-tight text-white mb-0.5">
                  {name}
                </h3>
                <p className="text-xs text-zinc-300 font-mono">
                  {role}
                </p>
              </div>

              {/* Clean Top Right Sparkle Accent */}
              <div className="absolute top-3 right-3 p-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white pointer-events-none">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
            </div>
          </motion.div>
        ) : (
          /* VIEW 2: Luxury "Jack of All Trades" Playing Card (Secret Easter Egg) */
          <motion.div
            key="jack-card"
            ref={cardRef}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.5}
            onDragEnd={handleDragEnd}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, rotateY: -90, scale: 0.95 }}
            animate={{ opacity: 1, rotateY: 0, scale: 1 }}
            exit={{ opacity: 0, rotateY: 90, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            whileHover={{ scale: 1.02 }}
            className="relative rounded-3xl p-3 bg-white border border-[#e6e3db] shadow-[0_20px_50px_rgba(28,25,23,0.09)] overflow-hidden cursor-grab active:cursor-grabbing"
          >
            {/* Royal Playing Card Frame */}
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-[#18181c] border-2 border-amber-400/40 p-5 flex flex-col justify-between select-none text-stone-100">
              
              {/* Dynamic Foil Glare Reflection */}
              <motion.div
                style={{
                  opacity: isHovered ? 0.3 : 0,
                  background: `radial-gradient(circle 280px at ${glareX} ${glareY}, rgba(251,191,36,0.5), transparent 70%)`,
                }}
                className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
              />

              {/* Background Intricate Pattern */}
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

              {/* Top Index: J ♠ */}
              <div className="flex items-start justify-between relative z-10">
                <div className="flex flex-col items-center leading-none text-left">
                  <span className="text-3xl font-serif font-black text-amber-400">J</span>
                  <span className="text-xl text-amber-300">♠</span>
                </div>

                <div className="px-2.5 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-[10px] font-mono text-amber-300 font-bold uppercase tracking-wider">
                  MASTER OF SYSTEMS
                </div>

                <div className="flex flex-col items-center leading-none text-right opacity-0 pointer-events-none">
                  <span className="text-3xl font-serif font-black">J</span>
                  <span className="text-xl">♠</span>
                </div>
              </div>

              {/* Center Royal Crest: JACK OF ALL TRADES */}
              <div className="relative z-10 text-center my-auto px-2">
                <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-amber-400/10 border border-amber-400/40 flex items-center justify-center shadow-[0_0_20px_rgba(251,191,36,0.15)] relative">
                  <Crown className="w-7 h-7 text-amber-400 animate-pulse" />
                  <Sparkle className="w-3.5 h-3.5 text-amber-300 absolute -top-1 -right-1" />
                </div>

                <h3 className="text-xl md:text-2xl font-serif font-extrabold tracking-wider text-amber-300 uppercase mb-1 drop-shadow-sm">
                  JACK OF ALL TRADES
                </h3>
                
                <div className="h-[1px] w-24 mx-auto bg-gradient-to-r from-transparent via-amber-400/60 to-transparent my-2" />

                <p className="text-[11px] font-mono text-stone-300 italic max-w-xs mx-auto leading-tight mb-3">
                  &ldquo;A jack of all trades is a master of none, but oftentimes better than a master of one.&rdquo;
                </p>

                {/* Domain Mastery Pills */}
                <div className="flex flex-wrap justify-center gap-1.5 mt-2">
                  <span className="px-2 py-0.5 rounded bg-stone-800/90 border border-amber-400/30 text-[10px] font-mono text-amber-200 flex items-center gap-1">
                    <Code2 className="w-3 h-3 text-amber-400" />
                    <span>Frontend & 3D</span>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-stone-800/90 border border-amber-400/30 text-[10px] font-mono text-amber-200 flex items-center gap-1">
                    <Cpu className="w-3 h-3 text-amber-400" />
                    <span>AI & Backend</span>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-stone-800/90 border border-amber-400/30 text-[10px] font-mono text-amber-200 flex items-center gap-1">
                    <Layers className="w-3 h-3 text-amber-400" />
                    <span>Architecture</span>
                  </span>
                </div>
              </div>

              {/* Bottom Inverted Index: J ♠ */}
              <div className="flex items-end justify-between relative z-10 rotate-180">
                <div className="flex flex-col items-center leading-none text-left">
                  <span className="text-3xl font-serif font-black text-amber-400">J</span>
                  <span className="text-xl text-amber-300">♠</span>
                </div>

                <div className="w-12" />

                <div className="flex flex-col items-center leading-none text-right opacity-0 pointer-events-none">
                  <span className="text-3xl font-serif font-black">J</span>
                  <span className="text-xl">♠</span>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
