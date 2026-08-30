"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft } from "lucide-react";

interface TerminalWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandHistory {
  command: string;
  output: React.ReactNode;
}

export default function TerminalWidget({ isOpen, onClose }: TerminalWidgetProps) {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: "init",
      output: (
        <div className="text-zinc-400 space-y-1">
          <p className="text-white font-semibold">VESYORSINS TERMINAL [v2.4.0]</p>
          <p>Type <span className="text-zinc-200 font-semibold">&apos;help&apos;</span> to see available commands.</p>
        </div>
      ),
    },
  ]);
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    let res: React.ReactNode = null;

    switch (cmd) {
      case "help":
        res = (
          <div className="space-y-1 text-zinc-300">
            <p className="text-white font-mono font-semibold">COMMANDS:</p>
            <p><span className="text-zinc-400 w-24 inline-block font-mono">about</span> — Engineer background & bio</p>
            <p><span className="text-zinc-400 w-24 inline-block font-mono">skills</span> — List core stack proficiencies</p>
            <p><span className="text-zinc-400 w-24 inline-block font-mono">projects</span> — View top selected production systems</p>
            <p><span className="text-zinc-400 w-24 inline-block font-mono">contact</span> — Get direct email & profiles</p>
            <p><span className="text-zinc-400 w-24 inline-block font-mono">clear</span> — Clear terminal window</p>
          </div>
        );
        break;

      case "about":
      case "whoami":
        res = (
          <p className="text-zinc-300">
            Software Engineer & Creative Technologist focused on scalable backend architectures, 3D WebGL interfaces, and high-performance web systems.
          </p>
        );
        break;

      case "skills":
        res = (
          <div className="space-y-1 text-zinc-300">
            <p className="text-white font-semibold">CORE TECHNICAL STACK:</p>
            <p>• Languages: TypeScript, JavaScript, Python, Rust, SQL, GLSL</p>
            <p>• Frontend & 3D: Next.js 16, React 19, Three.js, R3F, GSAP, Framer Motion, Tailwind</p>
            <p>• AI & Backend: LangChain, Groq/Gemini APIs, FastAPI, Node.js, PostgreSQL, TimescaleDB</p>
            <p>• Infrastructure: Docker, Vercel, AWS, GitHub Actions CI/CD, Linux</p>
          </div>
        );
        break;

      case "projects":
        res = (
          <div className="space-y-1.5 text-zinc-300">
            <p className="text-white font-semibold">TOP SELECTED SYSTEMS:</p>
            <p>1. <span className="text-white font-bold">NeuroNexus AI Router</span> — Multi-agent LLM orchestration & streaming RAG</p>
            <p>2. <span className="text-white font-bold">Aetheria 3D WebGL</span> — 3D Rapier physics & custom shaders</p>
            <p>3. <span className="text-white font-bold">TerraFlow Data Mesh</span> — 50k req/sec distributed telemetry engine</p>
          </div>
        );
        break;

      case "contact":
        res = (
          <div className="space-y-1 text-zinc-300">
            <p className="text-white font-semibold">CHANNELS:</p>
            <p>• Email: <a href="mailto:hello@vesyorsins.dev" className="text-zinc-200 underline">hello@vesyorsins.dev</a></p>
            <p>• GitHub: <a href="https://github.com" target="_blank" className="text-zinc-200 underline">github.com/vesyorsins</a></p>
            <p>• LinkedIn: <a href="https://linkedin.com" target="_blank" className="text-zinc-200 underline">linkedin.com/in/vesyorsins</a></p>
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      default:
        res = (
          <p className="text-zinc-400">
            Command not found: &apos;{cmd}&apos;. Type &apos;help&apos; for a list of valid commands.
          </p>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: inputVal, output: res }]);
    setInputVal("");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className={`relative w-full ${
            isExpanded ? "max-w-5xl h-[85vh]" : "max-w-2xl h-[480px]"
          } bg-[#121216] border border-zinc-800 rounded-2xl shadow-2xl z-10 flex flex-col overflow-hidden font-mono transition-all duration-300`}
        >
          {/* Window Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#18181f] border-b border-zinc-800 select-none">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={onClose}
                  className="w-3 h-3 rounded-full bg-zinc-700 hover:bg-zinc-600 cursor-pointer"
                />
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="w-3 h-3 rounded-full bg-zinc-700 hover:bg-zinc-600 cursor-pointer"
                />
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="w-3 h-3 rounded-full bg-zinc-700 hover:bg-zinc-600 cursor-pointer"
                />
              </div>
              <span className="text-xs text-zinc-400 font-medium ml-3 flex items-center gap-1.5">
                <TerminalIcon className="w-3.5 h-3.5 text-zinc-400" />
                vesyorsins@portfolio:~ (bash)
              </span>
            </div>

            <div className="flex items-center gap-2 text-zinc-400">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1 hover:text-white"
                title="Toggle Maximize"
              >
                {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
              <button onClick={onClose} className="p-1 hover:text-white" title="Close Terminal">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Terminal Output */}
          <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-4 text-xs md:text-sm leading-relaxed bg-[#101014]">
            {history.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center gap-2 text-zinc-500">
                  <span>guest@vesyorsins</span>
                  <span>:~$</span>
                  <span className="text-white font-semibold">{item.command}</span>
                </div>
                <div className="pl-3">{item.output}</div>
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleCommand}
            className="flex items-center gap-2 px-4 py-3 bg-[#18181f] border-t border-zinc-800"
          >
            <span className="text-zinc-500 text-xs md:text-sm">guest@vesyorsins:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="type a command (e.g. 'help', 'skills', 'projects')..."
              className="flex-1 bg-transparent text-white text-xs md:text-sm outline-none placeholder:text-zinc-600 font-mono"
            />
            <button
              type="submit"
              className="px-2.5 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-mono transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>RUN</span>
              <CornerDownLeft className="w-3 h-3" />
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
