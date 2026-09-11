"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { championshipCards } from "@/data/awards";
import { ChampionshipCard } from "@/types/portfolio";

interface StackCardItemProps {
  card: ChampionshipCard;
  index: number;
  totalCards: number;
  scrollYProgress: MotionValue<number>;
}

function StackCardItem({
  card,
  index,
  totalCards,
  scrollYProgress,
}: StackCardItemProps) {
  const numSteps = Math.max(totalCards - 1, 1);
  const stepDuration = 0.86 / numSteps;

  // Card 0 stays pinned at top; subsequent cards slide in sequentially
  const enterStart = 0.06 + (index - 1) * stepDuration;
  const enterEnd = enterStart + stepDuration * 0.75;

  const y = useTransform(
    scrollYProgress,
    index === 0
      ? [0, 1]
      : [Math.max(0, enterStart - 0.001), enterStart, enterEnd, 1],
    index === 0 ? ["0vh", "0vh"] : ["100vh", "100vh", "0vh", "0vh"],
  );

  // When subsequent cards stack on top, this card scales down slightly
  const cardsAfter = totalCards - 1 - index;
  const targetScale = Math.max(0.85, 1 - cardsAfter * 0.035);
  const scaleStart = 0.06 + index * stepDuration;

  const scale = useTransform(
    scrollYProgress,
    cardsAfter === 0
      ? [0, 1]
      : [Math.max(0, scaleStart), Math.min(1, scaleStart + stepDuration * 0.8)],
    cardsAfter === 0 ? [1, 1] : [1, targetScale],
  );

  // Smooth dim overlay for stacked cards
  const targetDim = Math.min(0.45, cardsAfter * 0.12);
  const dimOpacity = useTransform(
    scrollYProgress,
    cardsAfter === 0
      ? [0, 1]
      : [Math.max(0, scaleStart), Math.min(1, scaleStart + stepDuration * 0.8)],
    cardsAfter === 0 ? [0, 0] : [0, targetDim],
  );

  const zIndex = 10 + index * 5;

  return (
    <motion.div
      style={{
        y,
        scale,
        zIndex,
      }}
      className="absolute inset-0 w-full rounded-3xl p-6 sm:p-8 bg-[#141418] border border-zinc-800 flex flex-col justify-between select-none shadow-2xl will-change-transform transform-gpu overflow-hidden"
    >
      {/* Dim overlay that smoothly darkens cards as newer cards stack on top */}
      <motion.div
        style={{ opacity: dimOpacity }}
        className="absolute inset-0 bg-black/60 rounded-3xl pointer-events-none z-20"
      />

      {/* Card Top: Number, Category & Rank Badge */}
      <div className="relative z-10">
        <div className="flex items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl sm:text-3xl font-mono font-bold text-amber-400">
              {card.number}
            </span>
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
              {card.category}
            </span>
          </div>

          <div className="px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-[11px] font-mono text-amber-400 font-bold">
            {card.badge}
          </div>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          {card.title}
        </h3>
        <p className="text-xs sm:text-sm font-mono text-zinc-300 mt-1">
          {card.tagline}
        </p>

        <p className="text-xs sm:text-sm text-zinc-300 mt-3 leading-relaxed">
          {card.description}
        </p>
      </div>

      {/* Card Bottom: Bullets & Stat Highlight */}
      <div className="relative z-10 pt-4 border-t border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-zinc-400">
          {card.bullets.slice(0, 2).map((bullet, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="text-zinc-300">{bullet}</span>
            </span>
          ))}
        </div>

        <div className="px-3 py-1 rounded-xl bg-zinc-800/80 border border-zinc-700/60 text-right shrink-0">
          <span className="text-xs font-mono font-semibold text-emerald-400">
            {card.stats}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function StickyCardStack({
  awards = championshipCards,
}: {
  awards?: ChampionshipCard[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Dynamic height based on card count: ~85vh per card
  const totalHeightVh = Math.max(awards.length, 2) * 85;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Dynamic Header Colors: Starts in the same dark tone as Verified Certifications (#1c1917 & #57534e) and transitions into Pure White (#ffffff & #d4d4d8) on scroll
  const titleColor = useTransform(
    scrollYProgress,
    [0.04, 0.22],
    ["#1c1917", "#ffffff"],
  );
  const subtitleColor = useTransform(
    scrollYProgress,
    [0.04, 0.22],
    ["#57534e", "#d4d4d8"],
  );

  return (
    <section
      ref={containerRef}
      id="awards"
      style={{ height: `${totalHeightVh}vh` }}
      className="relative w-full bg-transparent"
    >
      {/* Sticky Viewport Frame - locks in place while user scrolls through the stack container */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center px-4 md:px-8 max-w-5xl mx-auto overflow-hidden">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14 shrink-0">
          <motion.h2
            style={{ color: titleColor }}
            className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight transition-colors duration-200"
          >
            Honors, Awards & Competitive Achievements
          </motion.h2>
          <motion.p
            style={{ color: subtitleColor }}
            className="text-xs sm:text-sm mt-2 max-w-xl mx-auto font-normal transition-colors duration-200"
          >
            A collection of awards and achievements I earned in various national
            and provincial
          </motion.p>
        </div>

        {/* Stack Box where all cards overlap & rise onto each other */}
        <div className="relative w-full h-[420px] sm:h-[390px] md:h-[370px] max-w-4xl">
          {awards.map((card, index) => (
            <StackCardItem
              key={card.number || index}
              card={card}
              index={index}
              totalCards={awards.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
