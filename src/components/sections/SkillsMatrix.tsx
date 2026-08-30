"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { skillCategories } from "@/data/skills";

export default function SkillsMatrix() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const springConfig = { stiffness: 180, damping: 25 };
  const translateY = useSpring(useTransform(scrollYProgress, [0, 1], [40, -40]), springConfig);

  return (
    <section
      ref={containerRef}
      id="skills"
      className="relative w-full py-32 px-4 md:px-8 max-w-7xl mx-auto bg-transparent"
    >
      {/* Header */}
      <div className="text-left mb-20">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
          Core Stack & Technical Competencies
        </h2>
        <p className="text-zinc-400 text-sm md:text-base mt-3 max-w-xl">
          Keahlian teknis dan framework yang telah teruji dalam skala produksi, dikelompokkan berdasarkan domain arsitektur.
        </p>
      </div>

      {/* Grid */}
      <motion.div
        style={{ y: translateY }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8"
      >
        {skillCategories.map((category, idx) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="p-6 md:p-8 rounded-2xl bg-[#141418] border border-zinc-800 hover:border-zinc-700 transition-colors flex flex-col justify-between shadow-lg"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-zinc-800 text-zinc-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">
                      {category.title}
                    </h3>
                    <p className="text-xs font-mono text-zinc-400 mt-0.5">
                      {category.tagline}
                    </p>
                    <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* Skill List */}
                <div className="space-y-3 mt-6">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="space-y-1.5 p-2 rounded-lg bg-zinc-900/60 border border-zinc-800/80">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-zinc-200">{skill.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-zinc-500">{skill.category}</span>
                          <span className="font-mono text-xs text-zinc-300 font-medium">{skill.level}%</span>
                        </div>
                      </div>
                      <div className="w-full h-1 rounded-full bg-zinc-800 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                          className="h-full bg-zinc-400 rounded-full"
                        />
                      </div>
                      <p className="text-[11px] text-zinc-400">
                        {skill.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
