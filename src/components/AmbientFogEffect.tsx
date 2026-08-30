"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface FogParticle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  opacity: number;
  baseOpacity: number;
  phase: number;
  phaseSpeed: number;
}

export default function AmbientFogEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fogOpacity, setFogOpacity] = useState<number>(0);

  // Dynamic Scroll Listener: Accurately triggers fog ONLY when the user reaches #experience (Professional Experience)
  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById("experience");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // When #experience enters viewport
      if (rect.top > windowHeight * 0.8) {
        setFogOpacity(0);
      } else {
        // Smoothly ramps up opacity as user scrolls through Experience Timeline and downward
        const progress = Math.min(
          Math.max((windowHeight * 0.8 - rect.top) / (windowHeight * 0.6), 0),
          1
        );
        setFogOpacity(progress * 0.85);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Create 18 large, soft rolling mist particles concentrated at the bottom
    const fogCount = 18;
    const fogParticles: FogParticle[] = Array.from({ length: fogCount }, () => {
      const radius = Math.random() * 220 + 260; // 260px - 480px large soft radius
      return {
        x: Math.random() * (width + radius * 2) - radius,
        y: height - Math.random() * (height * 0.65), // Bottom 65% of viewport
        radius,
        vx: Math.random() * 0.25 + 0.1, // Slow horizontal drift
        vy: (Math.random() - 0.5) * 0.08, // Subtle vertical oscillation
        opacity: Math.random() * 0.08 + 0.05,
        baseOpacity: Math.random() * 0.08 + 0.05,
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: Math.random() * 0.008 + 0.004,
      };
    });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < fogParticles.length; i++) {
        const p = fogParticles[i];

        // Animate breathing opacity
        p.phase += p.phaseSpeed;
        p.opacity = p.baseOpacity + Math.sin(p.phase) * 0.03;

        // Move horizontally
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around screen boundaries seamlessly
        if (p.x - p.radius > width) {
          p.x = -p.radius;
        }

        // Draw soft volumetric radial fog puff
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        grad.addColorStop(0, `rgba(240, 244, 255, ${p.opacity * 1.5})`);
        grad.addColorStop(0.4, `rgba(215, 225, 240, ${p.opacity * 0.8})`);
        grad.addColorStop(0.75, `rgba(180, 195, 220, ${p.opacity * 0.3})`);
        grad.addColorStop(1, "rgba(180, 195, 220, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <motion.canvas
      ref={canvasRef}
      animate={{ opacity: fogOpacity }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed inset-0 pointer-events-none z-[1] w-full h-full mix-blend-screen"
    />
  );
}
