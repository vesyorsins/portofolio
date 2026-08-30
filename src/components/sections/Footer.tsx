"use client";

import { useState, useEffect } from "react";
import { ArrowUp, Terminal } from "lucide-react";

export default function Footer({ onOpenTerminal }: { onOpenTerminal?: () => void }) {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t border-zinc-800 bg-transparent py-8 px-4 md:px-8 text-xs font-mono text-zinc-500 select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left: Brand & Copyright */}
        <div className="flex items-center gap-2">
          <span className="text-zinc-300 font-semibold tracking-wider">VESYORSINS</span>
          <span>© {new Date().getFullYear()} • ALL RIGHTS RESERVED</span>
        </div>

        {/* Center: Live Time */}
        <div className="flex items-center gap-3 text-zinc-400">
          <span className="bg-zinc-900/80 px-2.5 py-0.5 rounded border border-zinc-800 text-zinc-200">
            LOCAL: {time || "00:00:00"}
          </span>
          <span className="hidden sm:inline text-zinc-500">
            STATUS: ACTIVE
          </span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {onOpenTerminal && (
            <button
              onClick={onOpenTerminal}
              className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              title="Launch Terminal"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>TERMINAL</span>
            </button>
          )}

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 px-3 py-1 rounded bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors border border-zinc-800 cursor-pointer shadow-sm"
          >
            <span>TOP</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>

      </div>
    </footer>
  );
}
