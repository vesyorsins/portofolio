"use client";

import React, { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useSpring,
} from "framer-motion";
import {
  ArrowUpRight,
  Code2,
  Server,
  ShieldAlert,
  Brain,
  ChevronDown,
  Layers,
  ExternalLink,
  GitBranch,
  Zap,
  Radio,
  Sliders,
} from "lucide-react";
import { ProjectItem } from "@/types/portfolio";
import { projectsData } from "@/data/projects";

function ProjectCardItem({
  project,
  index,
}: {
  project: ProjectItem;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [showBlueprint, setShowBlueprint] = useState(false);

  const rotateXSpring = useSpring(0, { stiffness: 300, damping: 25 });
  const rotateYSpring = useSpring(0, { stiffness: 300, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4.5;
    const rotateY = ((x - centerX) / centerX) * 4.5;

    rotateXSpring.set(rotateX);
    rotateYSpring.set(rotateY);
  };

  const handleMouseLeave = () => {
    rotateXSpring.set(0);
    rotateYSpring.set(0);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Full-Stack Web":
        return <Code2 className="w-3.5 h-3.5 text-cyan-400" />;
      case "Cloud & DevOps":
        return <Server className="w-3.5 h-3.5 text-blue-400" />;
      case "Cybersecurity":
        return <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />;
      case "Machine Learning & AI":
        return <Brain className="w-3.5 h-3.5 text-purple-400" />;
      default:
        return <Layers className="w-3.5 h-3.5 text-amber-400" />;
    }
  };

  return (
    <motion.div
      layout
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.94, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, y: -10 }}
      transition={{
        layout: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
        opacity: { duration: 0.25 },
        scale: { duration: 0.25 },
        delay: index * 0.04,
      }}
      style={{
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        transformStyle: "preserve-3d",
      }}
      className="group relative rounded-3xl p-6 sm:p-7 bg-[#141418] border border-zinc-800 hover:border-zinc-600 transition-colors duration-200 flex flex-col justify-between overflow-hidden will-change-transform"
    >
      {/* Card Content Container */}
      <div className="relative z-10">
        {/* Card Header: Serial, Year & Category Pill */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-zinc-400 group-hover:text-white transition-colors">
              {project.serial}
            </span>
            <span className="text-zinc-600">•</span>
            <span className="text-xs font-mono text-zinc-400">
              {project.year}
            </span>
          </div>

          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono border bg-zinc-900 border-zinc-800 text-zinc-300 flex items-center gap-1.5">
            {getCategoryIcon(project.category)}
            <span>{project.category}</span>
          </span>
        </div>

        {/* Title with Kinetic Directional Arrow */}
        <div className="mb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-zinc-100 transition-colors flex items-center justify-between gap-2">
            <span>{project.title}</span>
            <ArrowUpRight className="w-5 h-5 text-zinc-400 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0" />
          </h3>
          <p className="text-xs font-mono text-zinc-400 mt-1">
            ROLE: <span className="text-zinc-300 font-semibold">{project.role}</span>
          </p>
        </div>

        {/* Tagline / Subtitle */}
        <p className="text-xs sm:text-sm font-mono text-zinc-300 mb-3 leading-relaxed">
          {project.tagline}
        </p>

        {/* Description */}
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Interactive System Blueprint & Telemetry Accordion Section */}
      <div className="relative z-10 pt-5 mt-5 border-t border-zinc-800/80 flex flex-col gap-3.5">
        {/* Toggle Blueprint Button */}
        <button
          onClick={() => setShowBlueprint(!showBlueprint)}
          className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[11px] font-mono text-zinc-300 hover:text-white transition-all flex items-center justify-between cursor-pointer group/btn"
        >
          <div className="flex items-center gap-2">
            <Sliders className="w-3.5 h-3.5 text-zinc-400 group-hover/btn:text-white" />
            <span>{showBlueprint ? "HIDE ARCHITECTURE BLUEPRINT" : "INSPECT ARCHITECTURE BLUEPRINT"}</span>
          </div>
          <ChevronDown
            className={`w-3.5 h-3.5 text-zinc-400 group-hover/btn:text-white transition-transform duration-200 ${
              showBlueprint ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        {/* Expanded Architecture Blueprint Stream */}
        <AnimatePresence>
          {showBlueprint && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="p-3.5 rounded-2xl bg-[#0e0e12] border border-zinc-800 text-xs font-mono space-y-2.5">
                <div className="flex items-center justify-between text-[10px] text-zinc-400 pb-1.5 border-b border-zinc-800">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <Radio className="w-3 h-3" />
                    {project.telemetry.status}
                  </span>
                  <span>RPS: {project.telemetry.rps}</span>
                  <span className="text-zinc-200 font-bold">P99: {project.telemetry.p99}</span>
                </div>

                {/* Animated Data Pipeline Node Chain */}
                <div className="grid grid-cols-3 gap-1.5 pt-1">
                  {project.telemetry.pipeline.map((node, nIdx) => (
                    <div
                      key={nIdx}
                      className="p-2 rounded-lg bg-[#141418] border border-zinc-800 text-[10px] flex flex-col justify-between"
                    >
                      <span className="text-zinc-300 truncate font-semibold">{node.name}</span>
                      <div className="flex items-center justify-between mt-1 text-[9px]">
                        <span className="text-zinc-500">{node.type}</span>
                        <span className="text-zinc-300 font-mono font-bold">{node.latency}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tech Badges */}
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Metrics Highlight & Action Links */}
        <div className="flex items-center justify-between gap-2 pt-1 text-xs font-mono">
          <div className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 font-semibold text-[11px] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>{project.metrics}</span>
          </div>

          <div className="flex items-center gap-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors border border-zinc-800"
                title="View Source Code"
              >
                <GitBranch className="w-3.5 h-3.5" />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors border border-zinc-800"
                title="Live Demo"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const categories = [
    "All",
    "Full-Stack Web",
    "Cloud & DevOps",
    "Cybersecurity",
    "Machine Learning & AI",
  ];

  // Count projects per category
  const getCount = (cat: string) => {
    if (cat === "All") return projectsData.length;
    return projectsData.filter((p) => p.category === cat).length;
  };

  // Filter projects by category
  const filteredProjects = projectsData.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

  // Decide how many projects to show (top 4 or all)
  const displayedProjects = isExpanded
    ? filteredProjects
    : filteredProjects.slice(0, 4);

  return (
    <section
      id="projects"
      className="relative w-full py-28 md:py-36 px-4 md:px-8 max-w-6xl mx-auto bg-transparent select-none"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2 font-bold flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-zinc-300" />
            <span>[ 03 / FEATURED ARCHITECTURE & CODE ]</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight">
            Selected Engineering Works
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm mt-2 max-w-xl font-normal leading-relaxed">
            Kurasi sistem perangkat lunak, infrastruktur cloud terdistribusi, perkakas audit keamanan siber, dan pipeline Machine Learning performa tinggi.
          </p>
        </div>

        {/* Category Filters with Clean Solid Sliding Pill */}
        <div className="flex flex-wrap gap-1 p-1.5 rounded-2xl bg-[#141418] border border-zinc-800 shrink-0">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-3.5 py-1.5 rounded-xl text-xs font-mono transition-colors duration-200 cursor-pointer flex items-center gap-1.5 ${
                  isSelected ? "text-black font-bold" : "text-zinc-400 hover:text-white"
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeProjectFilterPill"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    className="absolute inset-0 rounded-xl bg-white shadow-none"
                  />
                )}
                <span className="relative z-10">{cat}</span>
                <span
                  className={`relative z-10 text-[10px] ${
                    isSelected ? "text-zinc-700 font-bold" : "text-zinc-400"
                  }`}
                >
                  ({getCount(cat)})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid with Smooth 3D PopLayout & Spring Interpolation */}
      <motion.div
        layout
        transition={{ layout: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
        className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6"
      >
        <AnimatePresence mode="popLayout">
          {displayedProjects.map((project, index) => (
            <ProjectCardItem
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* "See More Projects" / "Lihat Semua Proyek" Expand Toggle Button */}
      {filteredProjects.length > 4 && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-6 py-3 rounded-2xl bg-[#141418] hover:bg-zinc-800 border border-zinc-700 text-white text-xs sm:text-sm font-mono font-bold transition-all duration-300 flex items-center gap-2.5 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>
              {isExpanded
                ? "Collapse Project Archive"
                : `See More Projects (${filteredProjects.length - 4} More)`}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-zinc-400 transition-transform duration-300 ${
                isExpanded ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
        </div>
      )}
    </section>
  );
}
