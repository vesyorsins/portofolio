import ScrollRevealText from "@/components/ui/ScrollRevealText";
import { defaultSiteSettings } from "@/data/siteSettings";

export default function ManifestoSection({
  manifestoText = defaultSiteSettings.manifestoText,
}: {
  manifestoText?: string;
}) {
  return (
    <section className="relative w-full py-24 px-4 md:px-8 max-w-5xl mx-auto bg-transparent">
      <div className="p-8 md:p-14 rounded-3xl bg-[#141418]/80 backdrop-blur-xl border border-zinc-800 shadow-2xl">
        <ScrollRevealText className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.2]">
          {manifestoText}
        </ScrollRevealText>
      </div>
    </section>
  );
}
