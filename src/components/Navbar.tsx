"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Menu, X, ArrowUpRight } from "lucide-react";

interface NavbarProps {
  onOpenTerminal?: () => void;
}

export default function Navbar({ onOpenTerminal }: NavbarProps) {
  const [isDarkZone, setIsDarkZone] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      // Switch from light to dark nav styling around scrollY 600
      setIsDarkZone(window.scrollY > 550);

      const sections = ["hero", "awards", "projects", "skills", "experience", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Overview", href: "#hero", id: "hero" },
    { name: "Awards", href: "#awards", id: "awards" },
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "Stack", href: "#skills", id: "skills" },
    { name: "Experience", href: "#experience", id: "experience" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 flex justify-center px-4 py-4 md:py-6 pointer-events-none">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto flex items-center justify-between gap-4 md:gap-8 px-4 md:px-5 py-2 rounded-full transition-all duration-500 ${
            isDarkZone
              ? "bg-[#141418]/90 text-white backdrop-blur-xl border border-zinc-800 shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
              : "bg-white/90 text-[#1c1917] backdrop-blur-xl border border-[#e6e3db] shadow-[0_8px_30px_rgba(28,25,23,0.06)]"
          }`}
        >
          {/* Logo */}
          <button
            onClick={() => scrollTo("#hero")}
            className="flex items-center gap-2.5 text-left cursor-pointer"
            data-cursor-interactive
            data-cursor-text="TOP"
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-colors ${
                isDarkZone ? "bg-zinc-800 text-white border border-zinc-700" : "bg-[#1c1917] text-white"
              }`}
            >
              V
            </div>
            <span className="text-sm font-semibold tracking-tight flex items-center gap-1.5">
              Vesyorsins
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </span>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.href)}
                  className={`relative px-3.5 py-1 text-xs font-medium rounded-full transition-colors cursor-pointer ${
                    isActive
                      ? isDarkZone
                        ? "text-white font-semibold"
                        : "text-[#1c1917] font-semibold"
                      : isDarkZone
                      ? "text-zinc-400 hover:text-zinc-200"
                      : "text-stone-500 hover:text-stone-900"
                  }`}
                  data-cursor-interactive
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className={`absolute inset-0 rounded-full ${
                        isDarkZone
                          ? "bg-zinc-800 border border-zinc-700"
                          : "bg-[#f2efe9] border border-[#e2dfd7]"
                      }`}
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </button>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {onOpenTerminal && (
              <button
                onClick={onOpenTerminal}
                className={`hidden lg:flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded-full transition-colors cursor-pointer border ${
                  isDarkZone
                    ? "bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border-zinc-800"
                    : "bg-[#f2efe9] hover:bg-[#eae6de] text-stone-700 border-[#e2dfd7]"
                }`}
                title="Open Terminal"
                data-cursor-interactive
              >
                <Terminal className="w-3 h-3" />
                <span>CLI</span>
              </button>
            )}

            <button
              onClick={() => scrollTo("#contact")}
              className={`px-3.5 py-1 text-xs font-medium rounded-full transition-all flex items-center gap-1 cursor-pointer font-semibold shadow-sm ${
                isDarkZone
                  ? "bg-white hover:bg-zinc-200 text-black"
                  : "bg-[#1c1917] hover:bg-[#292524] text-white"
              }`}
              data-cursor-interactive
              data-cursor-text="HIRE"
            >
              <span>Get in touch</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-1.5 rounded-full cursor-pointer border ${
                isDarkZone
                  ? "bg-zinc-800 text-zinc-300 border-zinc-700"
                  : "bg-[#f2efe9] text-stone-700 border-[#e2dfd7]"
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className={`fixed inset-x-4 top-20 z-40 p-4 rounded-2xl border shadow-2xl md:hidden ${
              isDarkZone ? "bg-[#141418] text-white border-zinc-800" : "bg-white text-[#1c1917] border-[#e6e3db]"
            }`}
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.href)}
                  className={`flex items-center justify-between p-2.5 rounded-xl text-left text-xs font-medium transition-colors ${
                    isDarkZone ? "hover:bg-zinc-800 text-zinc-300" : "hover:bg-[#f2efe9] text-stone-700"
                  }`}
                >
                  <span>{link.name}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </button>
              ))}

              {onOpenTerminal && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenTerminal();
                  }}
                  className={`flex items-center gap-2 p-2.5 mt-2 rounded-xl text-xs font-mono border ${
                    isDarkZone
                      ? "bg-zinc-900 text-zinc-300 border-zinc-800"
                      : "bg-[#f2efe9] text-stone-700 border-[#e2dfd7]"
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Launch CLI Terminal</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
