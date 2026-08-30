import ScrollRevealText from "@/components/ui/ScrollRevealText";

export default function ManifestoSection() {
  return (
    <section className="relative w-full py-24 px-4 md:px-8 max-w-5xl mx-auto bg-transparent">
      <div className="p-8 md:p-14 rounded-3xl bg-[#141418]/80 backdrop-blur-xl border border-zinc-800 shadow-2xl">
        <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-6 font-semibold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-white" />
          <span>[ MANIFESTO // ENGINEERING ETHOS ]</span>
        </div>

        <ScrollRevealText className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.2]">
          I believe exceptional software is forged at the intersection of mathematical rigor, performance optimization, and organic human motion. Every interface should feel weightless, responsive, and crafted with uncompromising attention to detail.
        </ScrollRevealText>
      </div>
    </section>
  );
}
