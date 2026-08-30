"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

export default function FloatingMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const track = {
    title: "Lalu Biru",
    artist: "Eleanor Whisper",
    src: "/audio/lalu-biru.mp3",
    cover: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=400&q=80",
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => {
        console.error("Audio playback error:", err);
      });
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <>
      {/* Real HTML5 Audio Element */}
      <audio
        ref={audioRef}
        src={track.src}
        preload="auto"
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Persistent Floating Mini Vinyl Disc in Bottom-Right Corner */}
      <div className="fixed bottom-6 right-6 z-50 select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          onClick={togglePlay}
          className="flex items-center gap-3 p-2 pr-4 rounded-full bg-[#101014]/95 backdrop-blur-xl border border-cyan-500/40 shadow-[0_8px_32px_rgba(0,0,0,0.6)] cursor-pointer group hover:border-cyan-400 transition-all hover:scale-[1.03] active:scale-[0.98]"
        >
          {/* Circular Spinning Vinyl Record Disc */}
          <div className="relative shrink-0">
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 rounded-full bg-[#0d0d12] border-2 border-zinc-700/90 shadow-md flex items-center justify-center relative overflow-hidden"
            >
              {/* Concentric Vinyl Grooves */}
              <div className="absolute inset-1 rounded-full border border-zinc-800/80 pointer-events-none" />
              <div className="absolute inset-2.5 rounded-full border border-zinc-800/60 pointer-events-none" />
              <div className="absolute inset-4 rounded-full border border-zinc-800/40 pointer-events-none" />

              {/* Specular Light Sheen */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />

              {/* Center Album Art Disc Label */}
              <div className="relative w-5 h-5 rounded-full overflow-hidden border border-cyan-400/60 flex items-center justify-center shadow-inner">
                <img
                  src={track.cover}
                  alt={track.title}
                  className="w-full h-full object-cover"
                />
                {/* Center Spindle Hole */}
                <div className="absolute w-1.5 h-1.5 rounded-full bg-[#0d0d12] border border-white/60" />
              </div>
            </motion.div>

            {/* Play/Pause Hover Overlay Icon */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              {isPlaying ? (
                <Pause className="w-4 h-4 text-white fill-white" />
              ) : (
                <Play className="w-4 h-4 text-white fill-white ml-0.5" />
              )}
            </div>
          </div>

          {/* Track Info & Equalizer Animation */}
          <div className="flex flex-col min-w-0 pr-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white tracking-tight truncate max-w-[130px]">
                {track.title}
              </span>
              {isPlaying && (
                <span className="flex items-center gap-0.5 h-2.5">
                  <span className="w-0.5 h-2.5 bg-cyan-400 animate-pulse rounded-full" />
                  <span className="w-0.5 h-1.5 bg-cyan-400 animate-pulse delay-75 rounded-full" />
                  <span className="w-0.5 h-2 bg-cyan-400 animate-pulse delay-150 rounded-full" />
                </span>
              )}
            </div>
            <span className="text-[10px] font-mono text-cyan-300/90">
              {isPlaying ? "Eleanor Whisper • Playing" : "Paused • Click to Play"}
            </span>
          </div>

          {/* Mute/Unmute Toggle */}
          <button
            onClick={toggleMute}
            className="p-1 text-zinc-400 hover:text-white transition-colors"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-rose-400" />
            ) : (
              <Volume2 className="w-3.5 h-3.5" />
            )}
          </button>
        </motion.div>
      </div>
    </>
  );
}
