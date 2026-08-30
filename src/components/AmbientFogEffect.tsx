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

  // Fog gently builds up and peaks at the bottom deep-dark realm based strictly on scroll distance
  const fogOpacity = useTransform(scrollY, [6000, 8000], [0, 0.9]);

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
      style={{ opacity: fogOpacity }}
      className="fixed inset-0 pointer-events-none z-[1] w-full h-full mix-blend-screen"
    />
  );
}
