"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Copy, Check, Mail, ArrowUpRight, Send, CheckCircle2 } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon, DiscordIcon } from "@/components/Icons";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });

  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const springConfig = { stiffness: 180, damping: 25 };
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]), springConfig);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5]);

  const directEmail = "hello@vesyorsins.dev";

  const handleCopy = () => {
    navigator.clipboard.writeText(directEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.email || !formState.message) return;
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSentSuccess(true);
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setSentSuccess(false), 4000);
    }, 1000);
  };

  const socials = [
    {
      name: "GitHub",
      handle: "@vesyorsins",
      url: "https://github.com",
      icon: GithubIcon,
    },
    {
      name: "LinkedIn",
      handle: "in/vesyorsins",
      url: "https://linkedin.com",
      icon: LinkedinIcon,
    },
    {
      name: "Twitter / X",
      handle: "@vesyorsins",
      url: "https://twitter.com",
      icon: TwitterIcon,
    },
    {
      name: "Discord",
      handle: "vesyorsins#0001",
      url: "https://discord.com",
      icon: DiscordIcon,
    },
  ];

  return (
    <section
      ref={containerRef}
      id="contact"
      className="relative w-full py-32 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden bg-transparent select-none"
    >
      <motion.div
        style={{ scale, opacity }}
        className="relative z-10 text-center max-w-4xl mx-auto"
      >

        {/* Header */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight mb-4">
          Let&apos;s build something together.
        </h2>
        <p className="text-zinc-400 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed font-normal">
          Terbuka untuk peluang rekayasa perangkat lunak, arsitektur web modern, otomasi cloud, dan audit keamanan sistem.
        </p>

        {/* Direct Email Box */}
        <div className="inline-flex flex-col sm:flex-row items-center gap-3 p-2.5 rounded-2xl bg-[#141418] border border-zinc-800 mb-12 max-w-full shadow-xl">
          <div className="flex items-center gap-2.5 px-4 py-1.5 text-sm md:text-base font-mono text-zinc-200">
            <Mail className="w-4 h-4 text-zinc-400" />
            <span>{directEmail}</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleCopy}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-zinc-700"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-mono text-xs font-semibold">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Copy Address</span>
                </>
              )}
            </button>

            <a
              href={`mailto:${directEmail}`}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-semibold transition-all flex items-center justify-center gap-1 shadow-sm cursor-pointer"
            >
              <span>Send Mail</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Transmission Form */}
        <div className="max-w-xl mx-auto p-6 md:p-8 rounded-3xl bg-[#141418] border border-zinc-800 mb-14 text-left shadow-xl">
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-zinc-800">
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              DIRECT MESSAGE
            </h3>
            <span className="text-[11px] font-mono text-zinc-500">SECURE TRANSMISSION</span>
          </div>

          {sentSuccess ? (
            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center gap-3 text-zinc-200">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <p className="text-xs font-mono">Pesan berhasil dikirim! Saya akan segera merespons ke email kamu.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 mb-1">NAME</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Nama Anda"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs md:text-sm focus:border-zinc-500 outline-none transition-colors placeholder:text-zinc-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 mb-1">EMAIL</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="email@anda.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs md:text-sm focus:border-zinc-500 outline-none transition-colors placeholder:text-zinc-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-400 mb-1">MESSAGE</label>
                <textarea
                  rows={3}
                  required
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Ceritakan tentang proyek, kolaborasi, atau pertanyaan..."
                  className="w-full p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs md:text-sm focus:border-zinc-500 outline-none transition-colors resize-none placeholder:text-zinc-600"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs md:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-md"
              >
                {isSubmitting ? (
                  <span className="font-mono text-xs">MENGIRIM PESAN...</span>
                ) : (
                  <>
                    <span>Kirim Pesan</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Social Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {socials.map((s) => {
            const Icon = s.icon;
            return (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-2xl bg-[#141418] border border-zinc-800 hover:border-zinc-700 transition-all flex items-center justify-between group shadow-sm hover:shadow-md"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-xl bg-zinc-800 text-zinc-400 group-hover:text-white transition-colors border border-zinc-700">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-white">
                      {s.name}
                    </div>
                    <div className="text-[10px] font-mono text-zinc-500">
                      {s.handle}
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-3 h-3 text-zinc-500 group-hover:text-white transition-colors" />
              </a>
            );
          })}
        </div>

      </motion.div>
    </section>
  );
}
