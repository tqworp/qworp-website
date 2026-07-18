import { Reveal } from "@/components/ui/reveal";

export function VisionSection() {
  return (
    <section id="vision" className="relative border-t border-divider bg-background py-28">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
          Vision
        </span>

        <Reveal delay={0.08} className="mt-6">
          <p className="text-balance text-2xl font-medium leading-snug tracking-tight text-foreground sm:text-3xl">
            We believe quantitative advantage is created through disciplined
            research, rigorous engineering and continuous learning.
          </p>
        </Reveal>

        <Reveal delay={0.18} className="mt-6">
          <p className="text-balance text-lg leading-relaxed text-text-secondary">
            Our ambition is to build the operating system for modern
            quantitative research.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
