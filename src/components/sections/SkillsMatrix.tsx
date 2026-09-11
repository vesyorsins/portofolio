"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { skillCategories } from "@/data/skills";
import { SkillCategory } from "@/types/portfolio";
import { Code2, ShieldAlert, Server, Brain, LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Code2,
  ShieldAlert,
  Server,
  Brain,
};

export default function SkillsMatrix({ categories = skillCategories }: { categories?: SkillCategory[] }) {
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
        {categories.map((category, idx) => {
          const Icon = iconMap[category.iconName] || Code2;
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
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                  {category.description}
                </p>

                {/* Skill Bars */}
                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-mono text-zinc-200 font-medium">
                          {skill.name}
                        </span>
                        <span className="font-mono text-zinc-500 text-[11px]">
                          {skill.category}
                        </span>
                      </div>

                      {/* Progress Bar Container */}
                      <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                          className="h-full bg-white rounded-full"
                        />
                      </div>

                      <p className="text-[11px] text-zinc-500 leading-tight">
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
