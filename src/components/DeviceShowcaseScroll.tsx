"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import {
  Code2,
  Server,
  ShieldAlert,
  Brain,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Disc3,
  Activity,
  CheckCircle2,
  Lock,
  Boxes,
  Radio,
  Scan,
  Network,
  Sparkles,
  Layers,
} from "lucide-react";

/* ----------------------------------------------------
   1. FRONTEND REALM PIECES (AUDIO & MOTION)
   ---------------------------------------------------- */
function FrontendAssembly({
  topMotion,
  leftMotion,
  rightMotion,
  bottomMotion,
}: {
  topMotion: { y: MotionValue<number>; opacity: MotionValue<number> };
  leftMotion: { x: MotionValue<number>; rotateY: MotionValue<number>; opacity: MotionValue<number> };
  rightMotion: { x: MotionValue<number>; rotateY: MotionValue<number>; opacity: MotionValue<number> };
  bottomMotion: { y: MotionValue<number>; opacity: MotionValue<number> };
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(38);
  const [duration, setDuration] = useState(195);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playlist = [
    {
      title: "Resonance // Cyber Ambient 60FPS",
      artist: "Vesyorsins Sound Lab",
      src: "https://actions.google.com/sounds/v1/ambient/relaxing_ambient_loop.ogg",
      cover: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80",
    },
    {
      title: "Synthesizer Dreamscape // WebGL",
      artist: "Creative Motion Studio",
      src: "https://actions.google.com/sounds/v1/science_fiction/ambient_hum_high.ogg",
      cover: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80",
    },
  ];

  const currentTrack = playlist[currentTrackIndex];

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(currentTrack.src);
      audioRef.current.volume = volume;
      audioRef.current.loop = true;
      audioRef.current.ontimeupdate = () => {
        if (audioRef.current) setCurrentTime(Math.floor(audioRef.current.currentTime));
      };
      audioRef.current.onloadedmetadata = () => {
        if (audioRef.current && audioRef.current.duration) setDuration(Math.floor(audioRef.current.duration));
      };
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(true));
    }
  };

  const handleNext = () => {
    const nextIdx = (currentTrackIndex + 1) % playlist.length;
    setCurrentTrackIndex(nextIdx);
    if (audioRef.current) {
      audioRef.current.src = playlist[nextIdx].src;
      if (isPlaying) audioRef.current.play();
    }
  };

  const handlePrev = () => {
    const prevIdx = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    setCurrentTrackIndex(prevIdx);
    if (audioRef.current) {
      audioRef.current.src = playlist[prevIdx].src;
      if (isPlaying) audioRef.current.play();
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setCurrentTime(val);
    if (audioRef.current) audioRef.current.currentTime = val;
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="w-full h-full flex flex-col justify-between gap-4 select-none">
      
      {/* 1. TOP PIECE: Header bar (Flies from Top) */}
      <motion.div
        style={{ y: topMotion.y, opacity: topMotion.opacity }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-[#14141a]/95 backdrop-blur-md border border-cyan-500/30 shadow-xl"
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 text-[11px] font-mono font-bold border border-cyan-500/30 flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5" />
              <span>DISCIPLINE 01 // FRONTEND & 3D WEB AUDIO</span>
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            Creative Frontend & WebGL Motion Studio
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-right">
            <span className="text-[10px] font-mono text-zinc-400 block">WEB AUDIO ENGINE</span>
            <span className="text-xs font-mono font-bold text-cyan-300">60 FPS REALTIME</span>
          </div>
        </div>
      </motion.div>

      {/* CENTER ROW: Left & Right Pieces converging from sides */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 flex-1 items-stretch">
        
        {/* 2. LEFT PIECE: Interactive Audio Player Workbench (Flies from Left) */}
        <motion.div
          style={{ x: leftMotion.x, rotateY: leftMotion.rotateY, opacity: leftMotion.opacity }}
          className="md:col-span-8 p-5 rounded-2xl bg-[#14141a]/95 backdrop-blur-md border border-cyan-500/30 shadow-2xl space-y-4 flex flex-col justify-between"
        >
          {/* Track metadata with Authentic Spinning Vinyl Record */}
          <div className="flex items-center gap-4">
            {/* Circular Spinning Vinyl Disc */}
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
              className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-[#0d0d12] border-2 border-zinc-700/80 shadow-[0_4px_25px_rgba(0,0,0,0.8)] flex items-center justify-center shrink-0 select-none pointer-events-none"
            >
              {/* Concentric Vinyl Grooves */}
              <div className="absolute inset-1.5 rounded-full border border-zinc-800/80" />
              <div className="absolute inset-3 rounded-full border border-zinc-800/60" />
              <div className="absolute inset-4.5 rounded-full border border-zinc-800/40" />

              {/* Vinyl Specular Light Reflection */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />

              {/* Center Album Art Disc Label */}
              <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-cyan-400/50 shadow-inner flex items-center justify-center">
                <img
                  src={currentTrack.cover}
                  alt={currentTrack.title}
                  className="w-full h-full object-cover"
                />
                {/* Center Spindle Hole */}
                <div className="absolute w-2 h-2 rounded-full bg-[#0d0d12] border border-white/60 shadow-sm" />
              </div>
            </motion.div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="px-2 py-0.2 rounded bg-cyan-500/20 text-[9px] font-mono text-cyan-300 font-bold uppercase">
                  {isPlaying ? "PLAYING LIVE" : "PAUSED"}
                </span>
                <span className="text-[11px] font-mono text-zinc-400">AUDIO TEST</span>
              </div>
              <h4 className="text-sm sm:text-base font-bold text-white tracking-tight truncate">
                {currentTrack.title}
              </h4>
              <p className="text-xs font-mono text-zinc-400 truncate">
                {currentTrack.artist}
              </p>
            </div>
          </div>

          {/* Spectrum Wave Bars */}
          <div className="h-16 rounded-xl bg-[#09090d] border border-zinc-800/90 p-2.5 flex items-end justify-between gap-1 overflow-hidden">
            {[40, 75, 55, 90, 65, 85, 45, 95, 70, 60, 80, 50, 90, 65, 78, 52, 86, 74, 90, 64].map((h, i) => (
              <motion.div
                key={i}
                animate={
                  isPlaying
                    ? { height: [`${Math.max(15, h * 0.25)}%`, `${h}%`, `${Math.max(20, h * 0.45)}%`] }
                    : { height: "15%" }
                }
                transition={{
                  duration: isPlaying ? 0.6 : 1.2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: (i % 8) * 0.06,
                  ease: "easeInOut",
                }}
                className="w-full bg-gradient-to-t from-cyan-500 via-teal-400 to-emerald-400 rounded-t-sm opacity-90 shadow-[0_0_6px_rgba(6,182,212,0.4)]"
              />
            ))}
          </div>

          {/* Progress & Controls */}
          <div className="space-y-1 font-mono text-xs">
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[10px] text-zinc-400">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2.5">
              <button onClick={handlePrev} className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer">
                <SkipBack className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={togglePlay}
                className="p-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold transition-transform active:scale-95 shadow-[0_0_15px_rgba(6,182,212,0.4)] cursor-pointer"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black ml-0.5" />}
              </button>
              <button onClick={handleNext} className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer">
                <SkipForward className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={toggleMute} className="text-zinc-400 hover:text-white cursor-pointer">
                {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  setVolume(v);
                  if (audioRef.current) audioRef.current.volume = v;
                }}
                className="w-16 sm:w-20 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>
          </div>
        </motion.div>

        {/* 3. RIGHT PIECE: Capabilities Checklist (Flies from Right) */}
        <motion.div
          style={{ x: rightMotion.x, rotateY: rightMotion.rotateY, opacity: rightMotion.opacity }}
          className="md:col-span-4 p-5 rounded-2xl bg-[#14141a]/95 backdrop-blur-md border border-cyan-500/30 shadow-2xl space-y-3 flex flex-col justify-between"
        >
          <div className="text-xs font-mono text-cyan-300 font-semibold uppercase tracking-wider">
            FRONTEND CAPABILITIES
          </div>

          <div className="space-y-2 text-xs font-mono text-zinc-300">
            <div className="p-2 rounded-lg bg-zinc-800/60 border border-zinc-800 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>HTML5 Web Audio & Frequency Analyser</span>
            </div>
            <div className="p-2 rounded-lg bg-zinc-800/60 border border-zinc-800 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Three.js / WebGL Shaders</span>
            </div>
            <div className="p-2 rounded-lg bg-zinc-800/60 border border-zinc-800 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Next.js 16 SSR & Micro-interactions</span>
            </div>
          </div>

          {/* Web Vitals Mini HUD */}
          <div className="grid grid-cols-3 gap-1.5 text-center font-mono text-[10px]">
            <div className="p-1 rounded bg-zinc-800/80 border border-zinc-700/60">
              <span className="text-zinc-400 block">LCP</span>
              <span className="text-emerald-400 font-bold">0.8s</span>
            </div>
            <div className="p-1 rounded bg-zinc-800/80 border border-zinc-700/60">
              <span className="text-zinc-400 block">FID</span>
              <span className="text-emerald-400 font-bold">12ms</span>
            </div>
            <div className="p-1 rounded bg-zinc-800/80 border border-zinc-700/60">
              <span className="text-zinc-400 block">CLS</span>
              <span className="text-emerald-400 font-bold">0.00</span>
            </div>
          </div>
        </motion.div>

      </div>

      {/* 4. BOTTOM PIECE: Tech Stack Ribbon (Flies from Bottom) */}
      <motion.div
        style={{ y: bottomMotion.y, opacity: bottomMotion.opacity }}
        className="p-3 rounded-xl bg-[#14141a]/95 backdrop-blur-md border border-cyan-500/30 flex flex-wrap items-center justify-between gap-2 text-xs font-mono shadow-xl"
      >
        <span className="text-zinc-400">CORE ARSENAL:</span>
        <div className="flex flex-wrap gap-1.5">
          {["Next.js 16", "React 19", "Three.js (R3F)", "Web Audio API", "Framer Motion", "Tailwind v4"].map((t) => (
            <span key={t} className="px-2 py-0.5 rounded bg-zinc-800 text-cyan-300 border border-cyan-500/20 text-[11px]">
              {t}
            </span>
          ))}
        </div>
      </motion.div>

    </div>
  );
}

/* ----------------------------------------------------
   2. DEVOPS REALM PIECES (CI/CD & CLOUD)
   ---------------------------------------------------- */
function DevOpsAssembly({
  topMotion,
  leftMotion,
  rightMotion,
  bottomMotion,
}: {
  topMotion: { y: MotionValue<number>; opacity: MotionValue<number> };
  leftMotion: { x: MotionValue<number>; rotateY: MotionValue<number>; opacity: MotionValue<number> };
  rightMotion: { x: MotionValue<number>; rotateY: MotionValue<number>; opacity: MotionValue<number> };
  bottomMotion: { y: MotionValue<number>; opacity: MotionValue<number> };
}) {
  const [pipelineStep, setPipelineStep] = useState(2);

  useEffect(() => {
    const interval = setInterval(() => {
      setPipelineStep((prev) => (prev + 1) % 4);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  const pipelineStages = [
    { title: "Lint & Test", time: "12s", status: "PASS" },
    { title: "Docker Build", time: "24s", status: "BUILT" },
    { title: "Helm Deploy", time: "18s", status: "DEPLOYED" },
    { title: "Edge Health", time: "4s", status: "LIVE" },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-between gap-4 select-none">
      
      {/* 1. TOP PIECE: Header bar (Flies from Top) */}
      <motion.div
        style={{ y: topMotion.y, opacity: topMotion.opacity }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-[#14141a]/95 backdrop-blur-md border border-blue-500/30 shadow-xl"
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-300 text-[11px] font-mono font-bold border border-blue-500/30 flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5" />
              <span>DISCIPLINE 02 // DEVOPS & CLOUD INFRASTRUCTURE</span>
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            Automated CI/CD & Kubernetes Cluster Orchestration
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1 rounded-xl bg-blue-500/10 border border-blue-500/30 text-right">
            <span className="text-[10px] font-mono text-zinc-400 block">SYSTEM AVAILABILITY</span>
            <span className="text-xs font-mono font-bold text-blue-300">99.99% UPTIME</span>
          </div>
        </div>
      </motion.div>

      {/* CENTER ROW */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 flex-1 items-stretch">
        
        {/* 2. LEFT PIECE: Live CI/CD Pipeline Flow (Flies from Left) */}
        <motion.div
          style={{ x: leftMotion.x, rotateY: leftMotion.rotateY, opacity: leftMotion.opacity }}
          className="md:col-span-8 p-5 rounded-2xl bg-[#14141a]/95 backdrop-blur-md border border-blue-500/30 shadow-2xl space-y-4 font-mono flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span className="flex items-center gap-2">
              <Boxes className="w-3.5 h-3.5 text-blue-400" />
              <span>PIPELINE // PROD_RELEASE_V2.4</span>
            </span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              PIPELINE PASSING (58s)
            </span>
          </div>

          {/* 4 Pipeline Stage Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {pipelineStages.map((stage, idx) => {
              const isCompleted = idx <= pipelineStep;
              const isCurrent = idx === pipelineStep;
              return (
                <div
                  key={stage.title}
                  className={`p-3 rounded-xl border transition-all duration-300 flex flex-col justify-between ${
                    isCurrent
                      ? "bg-blue-500/20 border-blue-500 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.35)]"
                      : isCompleted
                      ? "bg-zinc-800/80 border-emerald-500/40 text-emerald-400"
                      : "bg-zinc-900/60 border-zinc-800 text-zinc-600"
                  }`}
                >
                  <div>
                    <div className="text-[9px] text-zinc-500 mb-0.5">STAGE 0{idx + 1}</div>
                    <div className="text-xs font-bold leading-tight">{stage.title}</div>
                  </div>
                  <div className="flex items-center justify-between mt-2 text-[10px]">
                    <span>{stage.time}</span>
                    <span className="font-bold">{stage.status}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cluster Status */}
          <div className="p-3 rounded-xl bg-[#09090d] border border-zinc-800 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-zinc-300">K8s Pods: 16/16 Active</span>
            </div>
            <div className="text-zinc-400">
              Cloud: <span className="text-blue-400 font-semibold">AWS + Edge</span>
            </div>
            <div className="text-emerald-400 font-bold">
              Rollback: ZERO DOWNTIME
            </div>
          </div>
        </motion.div>

        {/* 3. RIGHT PIECE: DevOps Capabilities (Flies from Right) */}
        <motion.div
          style={{ x: rightMotion.x, rotateY: rightMotion.rotateY, opacity: rightMotion.opacity }}
          className="md:col-span-4 p-5 rounded-2xl bg-[#14141a]/95 backdrop-blur-md border border-blue-500/30 shadow-2xl space-y-3 flex flex-col justify-between"
        >
          <div className="text-xs font-mono text-blue-300 font-semibold uppercase tracking-wider">
            INFRASTRUCTURE PRACTICES
          </div>

          <div className="space-y-2 text-xs font-mono text-zinc-300">
            <div className="p-2 rounded-lg bg-zinc-800/60 border border-zinc-800 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>Kubernetes & Helm Deployment</span>
            </div>
            <div className="p-2 rounded-lg bg-zinc-800/60 border border-zinc-800 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>Docker Multi-Stage Optimization</span>
            </div>
            <div className="p-2 rounded-lg bg-zinc-800/60 border border-zinc-800 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>Terraform Infrastructure as Code</span>
            </div>
          </div>

          <div className="p-2 rounded-xl bg-zinc-800/80 border border-blue-500/20 text-[11px] font-mono text-zinc-300 text-center">
            Zero-Downtime Blue/Green Deployments
          </div>
        </motion.div>

      </div>

      {/* 4. BOTTOM PIECE: Tech Stack Ribbon (Flies from Bottom) */}
      <motion.div
        style={{ y: bottomMotion.y, opacity: bottomMotion.opacity }}
        className="p-3 rounded-xl bg-[#14141a]/95 backdrop-blur-md border border-blue-500/30 flex flex-wrap items-center justify-between gap-2 text-xs font-mono shadow-xl"
      >
        <span className="text-zinc-400">CORE ARSENAL:</span>
        <div className="flex flex-wrap gap-1.5">
          {["Docker", "Kubernetes", "GitHub Actions", "Terraform", "Linux (LFCS)", "AWS"].map((t) => (
            <span key={t} className="px-2 py-0.5 rounded bg-zinc-800 text-blue-300 border border-blue-500/20 text-[11px]">
              {t}
            </span>
          ))}
        </div>
      </motion.div>

    </div>
  );
}

/* ----------------------------------------------------
   3. PENETRATION TESTING REALM PIECES
   ---------------------------------------------------- */
function SecurityAssembly({
  topMotion,
  leftMotion,
  rightMotion,
  bottomMotion,
}: {
  topMotion: { y: MotionValue<number>; opacity: MotionValue<number> };
  leftMotion: { x: MotionValue<number>; rotateY: MotionValue<number>; opacity: MotionValue<number> };
  rightMotion: { x: MotionValue<number>; rotateY: MotionValue<number>; opacity: MotionValue<number> };
  bottomMotion: { y: MotionValue<number>; opacity: MotionValue<number> };
}) {
  const [logIndex, setLogIndex] = useState(0);

  const securityLogs = [
    "[+] Nmap Comprehensive Port Probe: 443/TLS hardened with TLS 1.3",
    "[+] OWASP Top 10 Security Audit: 0 Critical / 0 High vulnerabilities",
    "[+] Automated CSP, CORS & HSTS strict security headers verified",
    "[+] WAF reverse proxy payload sanitization & rate limiter active",
    "[+] Zero-Trust JWT authentication signature rotation validated",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLogIndex((prev) => (prev + 1) % securityLogs.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [securityLogs.length]);

  return (
    <div className="w-full h-full flex flex-col justify-between gap-4 select-none">
      
      {/* 1. TOP PIECE: Header bar (Flies from Top) */}
      <motion.div
        style={{ y: topMotion.y, opacity: topMotion.opacity }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-[#14141a]/95 backdrop-blur-md border border-rose-500/30 shadow-xl"
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-rose-500/15 text-rose-300 text-[11px] font-mono font-bold border border-rose-500/30 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>DISCIPLINE 03 // PENETRATION TESTING & OFFENSIVE SEC</span>
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            Offensive Security & Red Team Application Hardening
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1 rounded-xl bg-rose-500/10 border border-rose-500/30 text-right">
            <span className="text-[10px] font-mono text-zinc-400 block">SECURITY DEFENSE</span>
            <span className="text-xs font-mono font-bold text-rose-300">HARDENED // 0 VULN</span>
          </div>
        </div>
      </motion.div>

      {/* CENTER ROW */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 flex-1 items-stretch">
        
        {/* 2. LEFT PIECE: Radar Threat Scanner & Terminal (Flies from Left) */}
        <motion.div
          style={{ x: leftMotion.x, rotateY: leftMotion.rotateY, opacity: leftMotion.opacity }}
          className="md:col-span-8 p-5 rounded-2xl bg-[#14141a]/95 backdrop-blur-md border border-rose-500/30 shadow-2xl space-y-4 font-mono flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span className="flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
              <span>RADAR // PORT SCANNER & AUDIT STREAM</span>
            </span>
            <span className="text-rose-400 font-semibold">ACTIVE AUDIT</span>
          </div>

          {/* Terminal Console Output */}
          <div className="h-20 rounded-xl bg-[#09090d] border border-zinc-800 p-3 text-xs text-zinc-300 flex flex-col justify-between overflow-hidden">
            <div className="text-[9px] text-zinc-500 flex items-center justify-between">
              <span>SCAN TARGET: 10.0.4.0/24</span>
              <span className="text-emerald-400 font-semibold">FIREWALL: ACTIVE</span>
            </div>

            <motion.div
              key={logIndex}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-rose-400 font-mono text-xs font-semibold leading-tight truncate"
            >
              {securityLogs[logIndex]}
            </motion.div>

            <div className="text-[9px] text-zinc-500">
              [SYSTEM] AES-256-GCM • TLS 1.3 • Zero-Trust
            </div>
          </div>

          {/* Defense Badges */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 rounded-xl bg-zinc-800/60 border border-zinc-800 flex items-center justify-center gap-1.5 text-zinc-300">
              <Lock className="w-3 h-3 text-emerald-400" />
              <span>Zero-Trust</span>
            </div>
            <div className="p-2 rounded-xl bg-zinc-800/60 border border-zinc-800 flex items-center justify-center gap-1.5 text-zinc-300">
              <Scan className="w-3 h-3 text-rose-400" />
              <span>Red Team</span>
            </div>
            <div className="p-2 rounded-xl bg-zinc-800/60 border border-zinc-800 flex items-center justify-center gap-1.5 text-zinc-300">
              <ShieldAlert className="w-3 h-3 text-amber-400" />
              <span>OWASP 10</span>
            </div>
          </div>
        </motion.div>

        {/* 3. RIGHT PIECE: Security Checklist (Flies from Right) */}
        <motion.div
          style={{ x: rightMotion.x, rotateY: rightMotion.rotateY, opacity: rightMotion.opacity }}
          className="md:col-span-4 p-5 rounded-2xl bg-[#14141a]/95 backdrop-blur-md border border-rose-500/30 shadow-2xl space-y-3 flex flex-col justify-between"
        >
          <div className="text-xs font-mono text-rose-300 font-semibold uppercase tracking-wider">
            SECURITY ARSENAL
          </div>

          <div className="space-y-2 text-xs font-mono text-zinc-300">
            <div className="p-2 rounded-lg bg-zinc-800/60 border border-zinc-800 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span>OWASP Top 10 Vulnerability Audit</span>
            </div>
            <div className="p-2 rounded-lg bg-zinc-800/60 border border-zinc-800 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span>Network Packet & Port Scanning</span>
            </div>
            <div className="p-2 rounded-lg bg-zinc-800/60 border border-zinc-800 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span>Payload Defense & Sanitization</span>
            </div>
          </div>

          <div className="p-2 rounded-xl bg-zinc-800/80 border border-rose-500/20 text-[11px] font-mono text-zinc-300 text-center">
            Reverse Proxy Hardening & WAF
          </div>
        </motion.div>

      </div>

      {/* 4. BOTTOM PIECE: Tech Stack Ribbon (Flies from Bottom) */}
      <motion.div
        style={{ y: bottomMotion.y, opacity: bottomMotion.opacity }}
        className="p-3 rounded-xl bg-[#14141a]/95 backdrop-blur-md border border-rose-500/30 flex flex-wrap items-center justify-between gap-2 text-xs font-mono shadow-xl"
      >
        <span className="text-zinc-400">CORE ARSENAL:</span>
        <div className="flex flex-wrap gap-1.5">
          {["Kali Linux", "Burp Suite", "Nmap", "Wireshark", "Metasploit", "OWASP ZAP"].map((t) => (
            <span key={t} className="px-2 py-0.5 rounded bg-zinc-800 text-rose-300 border border-rose-500/20 text-[11px]">
              {t}
            </span>
          ))}
        </div>
      </motion.div>

    </div>
  );
}

/* ----------------------------------------------------
   4. MACHINE LEARNING REALM PIECES
   ---------------------------------------------------- */
function MLAssembly({
  topMotion,
  leftMotion,
  rightMotion,
  bottomMotion,
}: {
  topMotion: { y: MotionValue<number>; opacity: MotionValue<number> };
  leftMotion: { x: MotionValue<number>; rotateY: MotionValue<number>; opacity: MotionValue<number> };
  rightMotion: { x: MotionValue<number>; rotateY: MotionValue<number>; opacity: MotionValue<number> };
  bottomMotion: { y: MotionValue<number>; opacity: MotionValue<number> };
}) {
  const [tokenStep, setTokenStep] = useState(0);

  const prompts = [
    { prompt: "Optimize vector embedding retrieval latency under high load...", response: "HNSW index applied with sub-15ms KNN recall across 1.2M vectors." },
    { prompt: "Fine-tune quantized LLM for specialized code synthesis...", response: "LoRA adapters merged with 4-bit GGUF quantization (142 tok/sec throughput)." },
    { prompt: "Construct multi-modal RAG context pipeline with re-ranking...", response: "BM25 + Cross-Encoder re-ranker active with 98.4% MRR score." },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTokenStep((prev) => (prev + 1) % prompts.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [prompts.length]);

  return (
    <div className="w-full h-full flex flex-col justify-between gap-4 select-none">
      
      {/* 1. TOP PIECE: Header bar (Flies from Top) */}
      <motion.div
        style={{ y: topMotion.y, opacity: topMotion.opacity }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-[#14141a]/95 backdrop-blur-md border border-purple-500/30 shadow-xl"
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/15 text-purple-300 text-[11px] font-mono font-bold border border-purple-500/30 flex items-center gap-1.5">
              <Brain className="w-3.5 h-3.5" />
              <span>DISCIPLINE 04 // MACHINE LEARNING & NEURAL AI</span>
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            Neural AI Systems, Vector RAG & LLM Orchestration
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1 rounded-xl bg-purple-500/10 border border-purple-500/30 text-right">
            <span className="text-[10px] font-mono text-zinc-400 block">INFERENCE THROUGHPUT</span>
            <span className="text-xs font-mono font-bold text-purple-300">142 TOKENS / SEC</span>
          </div>
        </div>
      </motion.div>

      {/* CENTER ROW */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 flex-1 items-stretch">
        
        {/* 2. LEFT PIECE: Neural AI Inference Simulator (Flies from Left) */}
        <motion.div
          style={{ x: leftMotion.x, rotateY: leftMotion.rotateY, opacity: leftMotion.opacity }}
          className="md:col-span-8 p-5 rounded-2xl bg-[#14141a]/95 backdrop-blur-md border border-purple-500/30 shadow-2xl space-y-4 font-mono flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span className="flex items-center gap-2">
              <Network className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
              <span>NEURAL ENGINE // RAG & INFERENCE PIPELINE</span>
            </span>
            <span className="text-purple-400 font-semibold">TTFT: 180ms</span>
          </div>

          {/* Live Prompt & Response */}
          <div className="h-20 rounded-xl bg-[#09090d] border border-zinc-800 p-3 text-xs text-zinc-300 flex flex-col justify-between overflow-hidden">
            <div>
              <span className="text-purple-400 font-bold block truncate">
                &gt; PROMPT: &ldquo;{prompts[tokenStep].prompt}&rdquo;
              </span>
            </div>

            <motion.div
              key={tokenStep}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-emerald-400 text-xs font-mono leading-tight truncate"
            >
              &gt; RESPONSE: {prompts[tokenStep].response}
            </motion.div>

            <div className="text-[9px] text-zinc-500 flex items-center justify-between">
              <span>MODEL: Llama-3 8B 4-bit</span>
              <span>VECTOR DB: Pinecone HNSW</span>
            </div>
          </div>

          {/* Model Telemetry */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 rounded-xl bg-zinc-800/60 border border-zinc-800">
              <span className="text-[9px] text-zinc-400 block">Cosine Similarity</span>
              <span className="text-purple-400 font-bold">0.964</span>
            </div>
            <div className="p-2 rounded-xl bg-zinc-800/60 border border-zinc-800">
              <span className="text-[9px] text-zinc-400 block">Vector Index</span>
              <span className="text-purple-400 font-bold">1.2M Vectors</span>
            </div>
            <div className="p-2 rounded-xl bg-zinc-800/60 border border-zinc-800">
              <span className="text-[9px] text-zinc-400 block">Quantization</span>
              <span className="text-emerald-400 font-bold">4-Bit GGUF</span>
            </div>
          </div>
        </motion.div>

        {/* 3. RIGHT PIECE: AI Architecture (Flies from Right) */}
        <motion.div
          style={{ x: rightMotion.x, rotateY: rightMotion.rotateY, opacity: rightMotion.opacity }}
          className="md:col-span-4 p-5 rounded-2xl bg-[#14141a]/95 backdrop-blur-md border border-purple-500/30 shadow-2xl space-y-3 flex flex-col justify-between"
        >
          <div className="text-xs font-mono text-purple-300 font-semibold uppercase tracking-wider">
            AI ARCHITECTURE
          </div>

          <div className="space-y-2 text-xs font-mono text-zinc-300">
            <div className="p-2 rounded-lg bg-zinc-800/60 border border-zinc-800 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span>Retrieval-Augmented Gen (RAG)</span>
            </div>
            <div className="p-2 rounded-lg bg-zinc-800/60 border border-zinc-800 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span>Model Quantization & LoRA</span>
            </div>
            <div className="p-2 rounded-lg bg-zinc-800/60 border border-zinc-800 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span>Vector Database HNSW Indexing</span>
            </div>
          </div>

          <div className="p-2 rounded-xl bg-zinc-800/80 border border-purple-500/20 text-[11px] font-mono text-zinc-300 text-center">
            High-Throughput Groq & FastAPI
          </div>
        </motion.div>

      </div>

      {/* 4. BOTTOM PIECE: Tech Stack Ribbon (Flies from Bottom) */}
      <motion.div
        style={{ y: bottomMotion.y, opacity: bottomMotion.opacity }}
        className="p-3 rounded-xl bg-[#14141a]/95 backdrop-blur-md border border-purple-500/30 flex flex-wrap items-center justify-between gap-2 text-xs font-mono shadow-xl"
      >
        <span className="text-zinc-400">CORE ARSENAL:</span>
        <div className="flex flex-wrap gap-1.5">
          {["PyTorch", "Hugging Face", "FastAPI", "Groq", "LangChain", "Pinecone"].map((t) => (
            <span key={t} className="px-2 py-0.5 rounded bg-zinc-800 text-purple-300 border border-purple-500/20 text-[11px]">
              {t}
            </span>
          ))}
        </div>
      </motion.div>

    </div>
  );
}

/* ----------------------------------------------------
   MAIN COMPONENT: MODULAR CONVERGENCE ASSEMBLY (400vh)
   ---------------------------------------------------- */
export default function DeviceShowcaseScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const springConfig = { stiffness: 180, damping: 26 };
  const smoothProgress = useSpring(scrollYProgress, springConfig);

  // Helper hook to create 4-directional convergent assemble/disassemble transforms
  // Phase ranges: [enterStart, enterSnap, exitStart, exitEnd]
  const createAssemblyMotion = (range: [number, number, number, number]) => {
    const [eStart, eSnap, xStart, xEnd] = range;
    return {
      top: {
        y: useTransform(smoothProgress, [eStart, eSnap, xStart, xEnd], [-120, 0, 0, -120]),
        opacity: useTransform(smoothProgress, [eStart, eSnap, xStart, xEnd], [0, 1, 1, 0]),
      },
      left: {
        x: useTransform(smoothProgress, [eStart, eSnap, xStart, xEnd], [-160, 0, 0, -160]),
        rotateY: useTransform(smoothProgress, [eStart, eSnap, xStart, xEnd], [-20, 0, 0, -20]),
        opacity: useTransform(smoothProgress, [eStart, eSnap, xStart, xEnd], [0, 1, 1, 0]),
      },
      right: {
        x: useTransform(smoothProgress, [eStart, eSnap, xStart, xEnd], [160, 0, 0, 160]),
        rotateY: useTransform(smoothProgress, [eStart, eSnap, xStart, xEnd], [20, 0, 0, 20]),
        opacity: useTransform(smoothProgress, [eStart, eSnap, xStart, xEnd], [0, 1, 1, 0]),
      },
      bottom: {
        y: useTransform(smoothProgress, [eStart, eSnap, xStart, xEnd], [120, 0, 0, 120]),
        opacity: useTransform(smoothProgress, [eStart, eSnap, xStart, xEnd], [0, 1, 1, 0]),
      },
    };
  };

  // 4 Realms Motion Assemblies
  const motion1 = createAssemblyMotion([0, 0.08, 0.22, 0.28]);
  const motion2 = createAssemblyMotion([0.24, 0.32, 0.47, 0.53]);
  const motion3 = createAssemblyMotion([0.49, 0.57, 0.72, 0.78]);
  const motion4 = createAssemblyMotion([0.74, 0.82, 0.98, 1]);

  // Overall scale & visibility for each station
  const stationOpacity1 = useTransform(smoothProgress, [0, 0.22, 0.28], [1, 1, 0]);
  const stationOpacity2 = useTransform(smoothProgress, [0.24, 0.32, 0.47, 0.53], [0, 1, 1, 0]);
  const stationOpacity3 = useTransform(smoothProgress, [0.49, 0.57, 0.72, 0.78], [0, 1, 1, 0]);
  const stationOpacity4 = useTransform(smoothProgress, [0.74, 0.82, 1], [0, 1, 1]);

  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      if (latest < 0.26) setActiveStep(0);
      else if (latest < 0.51) setActiveStep(1);
      else if (latest < 0.76) setActiveStep(2);
      else setActiveStep(3);
    });
  }, [scrollYProgress]);

  const realmLabels = [
    "01 // FRONTEND AUDIO & 3D",
    "02 // DEVOPS & CLOUD",
    "03 // PENETRATION TESTING",
    "04 // MACHINE LEARNING & AI",
  ];

  return (
    <div ref={containerRef} className="relative w-full h-[400vh] bg-transparent">
      {/* Sticky Viewport Stage Frame */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center px-4 md:px-8 overflow-hidden [perspective:1400px]">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 z-30">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-[#1c1917] tracking-tight leading-tight">
            Operating Across Four Disciplines
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm mt-2 max-w-lg mx-auto font-normal">
            Gulir ke bawah &mdash; saksikan komponen-komponen perakitan menyatu dari berbagai arah ke tengah layar.
          </p>

          {/* Dynamic Scroll HUD Step Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            {realmLabels.map((label, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={label}
                  className={`px-3 py-1 rounded-full text-[11px] font-mono transition-all duration-300 border ${
                    isActive
                      ? "bg-[#1c1917] text-white font-bold border-[#1c1917] shadow-md scale-105"
                      : "bg-white/70 text-stone-500 border-stone-200"
                  }`}
                >
                  <span>{label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3D Modular Assembly Viewport (Container where pieces fly in & lock together) */}
        <div className="relative w-full max-w-5xl h-[470px] sm:h-[490px] flex items-center justify-center [perspective:1600px]">
          
          {/* STATION 1: FRONTEND (Audio Player & 3D WebGL) */}
          <motion.div
            style={{
              opacity: stationOpacity1,
              pointerEvents: activeStep === 0 ? "auto" : "none",
            }}
            className="absolute inset-0 w-full h-full flex items-center justify-center"
          >
            <FrontendAssembly
              topMotion={motion1.top}
              leftMotion={motion1.left}
              rightMotion={motion1.right}
              bottomMotion={motion1.bottom}
            />
          </motion.div>

          {/* STATION 2: DEVOPS (CI/CD Pipeline & Cloud) */}
          <motion.div
            style={{
              opacity: stationOpacity2,
              pointerEvents: activeStep === 1 ? "auto" : "none",
            }}
            className="absolute inset-0 w-full h-full flex items-center justify-center"
          >
            <DevOpsAssembly
              topMotion={motion2.top}
              leftMotion={motion2.left}
              rightMotion={motion2.right}
              bottomMotion={motion2.bottom}
            />
          </motion.div>

          {/* STATION 3: PENETRATION TESTING (Threat Radar & Security) */}
          <motion.div
            style={{
              opacity: stationOpacity3,
              pointerEvents: activeStep === 2 ? "auto" : "none",
            }}
            className="absolute inset-0 w-full h-full flex items-center justify-center"
          >
            <SecurityAssembly
              topMotion={motion3.top}
              leftMotion={motion3.left}
              rightMotion={motion3.right}
              bottomMotion={motion3.bottom}
            />
          </motion.div>

          {/* STATION 4: MACHINE LEARNING (Neural AI & LLM Inference) */}
          <motion.div
            style={{
              opacity: stationOpacity4,
              pointerEvents: activeStep === 3 ? "auto" : "none",
            }}
            className="absolute inset-0 w-full h-full flex items-center justify-center"
          >
            <MLAssembly
              topMotion={motion4.top}
              leftMotion={motion4.left}
              rightMotion={motion4.right}
              bottomMotion={motion4.bottom}
            />
          </motion.div>

        </div>

      </div>
    </div>
  );
}
