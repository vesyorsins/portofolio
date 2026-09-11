"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface RainDrop {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  thickness: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  speed: number;
}

export default function AmbientRainEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollY } = useScroll();
  const startYRef = useRef<number>(5500);

  useEffect(() => {
    const updateThreshold = () => {
      const el = document.getElementById("skills");
      if (el) {
        const rect = el.getBoundingClientRect();
        const curScroll = window.scrollY || document.documentElement.scrollTop;
        startYRef.current = Math.max(rect.top + curScroll - window.innerHeight * 0.4, 5000);
      }
    };

    // Calculate after initial layout settles
    const timer = setTimeout(updateThreshold, 500);
    window.addEventListener("resize", updateThreshold);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateThreshold);
    };
  }, []);

  // Smoothly emerges ONLY when entering the dark #skills realm (after awards)
  const rainOpacity = useTransform(scrollY, (y) => {
    const start = startYRef.current;
    const fadeDistance = 1200;
    if (y < start) return 0;
    if (y >= start + fadeDistance) return 0.75;
    return ((y - start) / fadeDistance) * 0.75;
  });

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

    const isMobile = width < 768;
    // Initialize raindrops - lightweight count on mobile
    const dropCount = isMobile
      ? Math.min(Math.floor(width / 22), 22)
      : Math.min(Math.floor(width / 16), 65);

    const drops: RainDrop[] = Array.from({ length: dropCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      length: Math.random() * 20 + 12,
      speed: Math.random() * 8 + 10,
      opacity: Math.random() * 0.35 + 0.15,
      thickness: Math.random() * 0.8 + 0.6,
    }));

    // Initialize ripples
    const ripples: Ripple[] = [];
    const maxRipples = isMobile ? 8 : 25;

    const render = () => {
      // Skip rendering and clear canvas when not in dark realm (above #skills)
      if (scrollY.get() < startYRef.current) {
        ctx.clearRect(0, 0, width, height);
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Fast Render & Update Raindrops without per-frame gradient allocation
      ctx.strokeStyle = "rgba(255, 255, 255, 0.45)";
      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i];

        ctx.globalAlpha = drop.opacity;
        ctx.lineWidth = drop.thickness;
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x - 0.8, drop.y + drop.length);
        ctx.stroke();

        // Update position
        drop.y += drop.speed;
        drop.x -= 0.5; // Subtle angle

        // If raindrop hits the bottom or randomly triggers a splash
        if (drop.y > height) {
          // Spawn ripple at splash point
          if (Math.random() > 0.75 && ripples.length < maxRipples) {
            ripples.push({
              x: drop.x,
              y: Math.random() * (height * 0.4) + height * 0.6,
              radius: 1,
              maxRadius: Math.random() * 14 + 6,
              opacity: 0.3,
              speed: Math.random() * 0.35 + 0.25,
            });
          }

          // Reset raindrop to top
          drop.y = -drop.length - Math.random() * 40;
          drop.x = Math.random() * (width + 80);
        }
      }
      ctx.globalAlpha = 1;

      // Render & Update Water Ripples
      ctx.lineWidth = 0.8;
      for (let j = ripples.length - 1; j >= 0; j--) {
        const r = ripples[j];

        ctx.globalAlpha = Math.max(0, r.opacity);
        ctx.beginPath();
        // Elliptical water ring for 3D perspective surface feel
        ctx.ellipse(r.x, r.y, r.radius, r.radius * 0.35, 0, 0, Math.PI * 2);
        ctx.stroke();

        r.radius += r.speed;
        r.opacity -= 0.01;

        if (r.opacity <= 0 || r.radius >= r.maxRadius) {
          ripples.splice(j, 1);
        }
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
      style={{ opacity: rainOpacity }}
      className="fixed inset-0 pointer-events-none z-[1] w-full h-full"
    />
  );
}
