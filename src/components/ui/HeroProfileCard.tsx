"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  PanInfo,
} from "framer-motion";
import {
  MapPin,
  Sparkles,
  Activity,
  ShieldCheck,
  Crown,
  Code2,
  Cpu,
  Layers,
  Sparkle,
} from "lucide-react";

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
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const cardContainerRef = useRef<HTMLDivElement>(null);

  // Mouse coordinates normalized from -0.5 to 0.5 for subtle 3D hover gyro tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Dynamic Flip Motion Value that tracks continuous directional angle
  const flipAngle = useMotionValue(0);
  const dragOffsetAngle = useMotionValue(0);

  const springConfig = { stiffness: 220, damping: 24 };

  // Base 3D gyro tilt on mouse movement
  const hoverTiltX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), springConfig);
  const hoverTiltY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);

  // Spring physics for natural 3D angular rotation
  const baseFlipSpring = useSpring(flipAngle, { stiffness: 180, damping: 22 });

  // Synchronize flipAngle with rotationAngle state
  useEffect(() => {
    flipAngle.set(rotationAngle);
  }, [rotationAngle, flipAngle]);

  // Combined 3D Y-Axis rotation (Continuous Flip Angle + Hover Gyro + Live Drag Offset)
  const combinedRotateY = useTransform(
    [baseFlipSpring, hoverTiltY, dragOffsetAngle],
    ([flip, tilt, drag]) => Number(flip) + Number(tilt) + Number(drag)
  );

  // Multi-layer Parallax Offsets for Floating Badges
  const badge1X = useSpring(useTransform(mouseX, [-0.5, 0.5], [-16, 16]), springConfig);
  const badge1Y = useSpring(useTransform(mouseY, [-0.5, 0.5], [-16, 16]), springConfig);

  const badge2X = useSpring(useTransform(mouseX, [-0.5, 0.5], [18, -18]), springConfig);
  const badge2Y = useSpring(useTransform(mouseY, [-0.5, 0.5], [18, -18]), springConfig);

  const badge3X = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), springConfig);
  const badge3Y = useSpring(useTransform(mouseY, [-0.5, 0.5], [14, -14]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardContainerRef.current) return;
    const rect = cardContainerRef.current.getBoundingClientRect();
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

  // Live 3D rotation while dragging horizontally following drag direction
  const handleDrag = (_: any, info: PanInfo) => {
    const angleDelta = (info.offset.x / 180) * 50;
    dragOffsetAngle.set(angleDelta);
  };

  // Directional swipe logic:
  // - Swiping LEFT (drag < -25px or velocity < -150) rotates counter-clockwise by -180 deg
  // - Swiping RIGHT (drag > 25px or velocity > 150) rotates clockwise by +180 deg
  const handleDragEnd = (_: any, info: PanInfo) => {
    dragOffsetAngle.set(0);
    const threshold = 25;
    const velocityThreshold = 150;

    if (info.offset.x < -threshold || info.velocity.x < -velocityThreshold) {
      setRotationAngle((prev) => prev - 180);
    } else if (info.offset.x > threshold || info.velocity.x > velocityThreshold) {
      setRotationAngle((prev) => prev + 180);
    }
  };

  const handleClick = () => {
    // Tap or click without drag smoothly flips the card (+180 deg)
    setRotationAngle((prev) => prev + 180);
  };

  return (
    <div
      ref={cardContainerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[420px] mx-auto [perspective:1400px] select-none py-2"
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
        className="absolute -bottom-3 -left-4 md:-left-6 z-30 pointer-events-none"
      >
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-[#e6e3db] shadow-[0_8px_25px_rgba(28,25,23,0.08)] text-xs font-mono text-stone-800">
          <Activity className="w-3.5 h-3.5 text-emerald-600" />
          <span className="font-semibold">FULL-STACK & SEC</span>
          <span className="text-stone-400">/ TS CORE</span>
        </div>
      </motion.div>

      {/* 3D DOUBLE-SIDED CARD FLIP CONTAINER */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.4}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        onClick={handleClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{
          rotateX: hoverTiltX,
          rotateY: combinedRotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full aspect-[4/5] cursor-pointer active:cursor-grabbing will-change-transform rounded-3xl"
      >
        {/* ========================================================================= */}
        {/* FRONT FACE: 3D Holographic Portrait Photo Card (Visible at 0deg)           */}
        {/* ========================================================================= */}
        <div
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(0deg)",
          }}
          className="absolute inset-0 w-full h-full rounded-3xl p-3 bg-white border border-[#e6e3db] shadow-[0_20px_50px_rgba(28,25,23,0.09)] overflow-hidden flex flex-col"
        >
          {/* Photo Container Frame */}
          <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#f4f2eb] border border-stone-200/60 flex flex-col justify-between">
            {/* User Photo */}
            <motion.img
              src={imageSrc}
              alt={name}
              style={{
                scale: isHovered ? 1.05 : 1,
              }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 w-full h-full object-cover object-center filter grayscale contrast-[1.06] hover:grayscale-0 transition-all duration-700 select-none pointer-events-none"
            />

            {/* Vignette Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            {/* Top Right Clean Sparkle Icon */}
            <div className="relative z-10 p-3 flex justify-end">
              <div className="p-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white pointer-events-none">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Bottom Card Identity Info */}
            <div className="relative z-10 p-5 text-white pointer-events-none">
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
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BACK FACE: "Jack of All Trades" Royal Playing Card (Visible at 180deg)      */}
        {/* ========================================================================= */}
        <div
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
          className="absolute inset-0 w-full h-full rounded-3xl p-3 bg-white border border-[#e6e3db] shadow-[0_20px_50px_rgba(28,25,23,0.09)] overflow-hidden flex flex-col"
        >
          {/* Royal Playing Card Frame */}
          <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#141418] border-2 border-amber-400/40 p-5 flex flex-col justify-between select-none text-stone-100">
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
              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-amber-400/10 border border-amber-400/40 flex items-center justify-center relative">
                <Crown className="w-7 h-7 text-amber-400" />
                <Sparkle className="w-3.5 h-3.5 text-amber-300 absolute -top-1 -right-1" />
              </div>

              <h3 className="text-xl md:text-2xl font-serif font-extrabold tracking-wider text-amber-300 uppercase mb-1">
                JACK OF ALL TRADES
              </h3>
              
              <div className="h-[1px] w-24 mx-auto bg-gradient-to-r from-transparent via-amber-400/60 to-transparent my-2" />

              <p className="text-[11px] font-mono text-stone-300 italic max-w-xs mx-auto leading-tight mb-3">
                &ldquo;A jack of all trades is a master of none, but oftentimes better than a master of one.&rdquo;
              </p>

              {/* Domain Mastery Pills */}
              <div className="flex flex-wrap justify-center gap-1.5 mt-2">
                <span className="px-2 py-0.5 rounded bg-stone-800 border border-amber-400/30 text-[10px] font-mono text-amber-200 flex items-center gap-1">
                  <Code2 className="w-3 h-3 text-amber-400" />
                  <span>Full-Stack Web</span>
                </span>
                <span className="px-2 py-0.5 rounded bg-stone-800 border border-amber-400/30 text-[10px] font-mono text-amber-200 flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-amber-400" />
                  <span>AI & Security</span>
                </span>
                <span className="px-2 py-0.5 rounded bg-stone-800 border border-amber-400/30 text-[10px] font-mono text-amber-200 flex items-center gap-1">
                  <Layers className="w-3 h-3 text-amber-400" />
                  <span>DevOps Cloud</span>
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
        </div>
      </motion.div>
    </div>
  );
}
