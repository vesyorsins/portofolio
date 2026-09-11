"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

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
  const { scrollY } = useScroll();
  const startYRef = useRef<number>(8000);

  useEffect(() => {
    const updateThreshold = () => {
      const el = document.getElementById("experience");
      if (el) {
        const rect = el.getBoundingClientRect();
        const curScroll = window.scrollY || document.documentElement.scrollTop;
        startYRef.current = Math.max(rect.top + curScroll - window.innerHeight * 0.4, 7500);
      }
    };

    const timer = setTimeout(updateThreshold, 500);
    window.addEventListener("resize", updateThreshold);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateThreshold);
    };
  }, []);

  // Smoothly emerges only when reaching the #experience section and downward
  const fogOpacity = useTransform(scrollY, (y) => {
    const start = startYRef.current;
    const fadeDistance = 1200;
    if (y < start) return 0;
    if (y >= start + fadeDistance) return 0.85;
    return ((y - start) / fadeDistance) * 0.85;
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Pre-render a cached radial fog puff onto an offscreen canvas to avoid expensive per-frame gradient allocation
    const offscreenSize = 256;
    const offscreenCanvas = document.createElement("canvas");
    offscreenCanvas.width = offscreenSize;
    offscreenCanvas.height = offscreenSize;
    const offCtx = offscreenCanvas.getContext("2d");
    if (offCtx) {
      const half = offscreenSize / 2;
      const grad = offCtx.createRadialGradient(half, half, 0, half, half, half);
      grad.addColorStop(0, "rgba(240, 244, 255, 0.9)");
      grad.addColorStop(0.35, "rgba(215, 225, 240, 0.45)");
      grad.addColorStop(0.7, "rgba(180, 195, 220, 0.15)");
      grad.addColorStop(1, "rgba(180, 195, 220, 0)");
      offCtx.fillStyle = grad;
      offCtx.beginPath();
      offCtx.arc(half, half, half, 0, Math.PI * 2);
      offCtx.fill();
    }

    const isMobile = width < 768;
    const fogCount = isMobile ? 5 : 14;

    const fogParticles: FogParticle[] = Array.from({ length: fogCount }, () => {
      const radius = isMobile
        ? Math.random() * 120 + 160
        : Math.random() * 200 + 240;
      return {
        x: Math.random() * (width + radius * 2) - radius,
        y: height - Math.random() * (height * 0.6),
        radius,
        vx: Math.random() * 0.25 + 0.1,
        vy: (Math.random() - 0.5) * 0.08,
        opacity: Math.random() * 0.07 + 0.04,
        baseOpacity: Math.random() * 0.07 + 0.04,
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: Math.random() * 0.008 + 0.004,
      };
    });

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const render = () => {
      // If user hasn't scrolled near the experience section, sleep and skip canvas rendering
      if (scrollY.get() < startYRef.current) {
        ctx.clearRect(0, 0, width, height);
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < fogParticles.length; i++) {
        const p = fogParticles[i];

        // Animate breathing opacity
        p.phase += p.phaseSpeed;
        p.opacity = p.baseOpacity + Math.sin(p.phase) * 0.025;

        // Move horizontally
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around screen boundaries seamlessly
        if (p.x - p.radius > width) {
          p.x = -p.radius;
        }

        // Fast hardware-blitted cached fog puff
        ctx.globalAlpha = Math.max(0, Math.min(1, p.opacity));
        ctx.drawImage(
          offscreenCanvas,
          p.x - p.radius,
          p.y - p.radius,
          p.radius * 2,
          p.radius * 2
        );
      }
      ctx.globalAlpha = 1;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [scrollY]);

  return (
    <motion.canvas
      ref={canvasRef}
      style={{ opacity: fogOpacity }}
      className="fixed inset-0 pointer-events-none z-[1] w-full h-full opacity-60 md:opacity-100 md:mix-blend-screen"
    />
  );
}
