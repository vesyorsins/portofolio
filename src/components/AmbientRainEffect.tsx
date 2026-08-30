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
  const { scrollYProgress } = useScroll();

  // The rain effect smoothly emerges ONLY when the user scrolls into the dark realm
  const rainOpacity = useTransform(scrollYProgress, [0.32, 0.58], [0, 0.75]);

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

    // Initialize raindrops
    const dropCount = Math.min(Math.floor(width / 14), 90);
    const drops: RainDrop[] = Array.from({ length: dropCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      length: Math.random() * 24 + 14,
      speed: Math.random() * 10 + 12,
      opacity: Math.random() * 0.4 + 0.15,
      thickness: Math.random() * 1.2 + 0.6,
    }));

    // Initialize ripples
    const ripples: Ripple[] = [];

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render & Update Raindrops
      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i];

        // Draw raindrop streak with gradient tip
        const grad = ctx.createLinearGradient(drop.x, drop.y, drop.x - 1, drop.y + drop.length);
        grad.addColorStop(0, "rgba(255, 255, 255, 0)");
        grad.addColorStop(1, `rgba(255, 255, 255, ${drop.opacity})`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = drop.thickness;
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x - 1, drop.y + drop.length);
        ctx.stroke();

        // Update position
        drop.y += drop.speed;
        drop.x -= 0.6; // Subtle angle

        // If raindrop hits the bottom or randomly triggers a splash
        if (drop.y > height) {
          // Spawn ripple at splash point
          if (Math.random() > 0.65 && ripples.length < 35) {
            ripples.push({
              x: drop.x,
              y: Math.random() * (height * 0.4) + height * 0.6,
              radius: 1,
              maxRadius: Math.random() * 18 + 8,
              opacity: 0.35,
              speed: Math.random() * 0.4 + 0.3,
            });
          }

          // Reset raindrop to top
          drop.y = -drop.length - Math.random() * 50;
          drop.x = Math.random() * (width + 100);
        }
      }

      // Render & Update Water Ripples
      for (let j = ripples.length - 1; j >= 0; j--) {
        const r = ripples[j];

        ctx.strokeStyle = `rgba(255, 255, 255, ${r.opacity})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        // Elliptical water ring for 3D perspective surface feel
        ctx.ellipse(r.x, r.y, r.radius, r.radius * 0.35, 0, 0, Math.PI * 2);
        ctx.stroke();

        r.radius += r.speed;
        r.opacity -= 0.008;

        if (r.opacity <= 0 || r.radius >= r.maxRadius) {
          ripples.splice(j, 1);
        }
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
      style={{ opacity: rainOpacity }}
      className="fixed inset-0 pointer-events-none z-[1] w-full h-full"
    />
  );
}
