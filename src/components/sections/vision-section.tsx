import { FactorNetwork } from "@/components/visualizations/factor-network";
import { Reveal } from "@/components/ui/reveal";

export function VisionSection() {
  return (
    <section id="vision" className="relative overflow-hidden border-t border-divider bg-background py-28">
      <FactorNetwork className="pointer-events-none absolute inset-0 mx-auto h-full w-full max-w-4xl opacity-[0.08] [mask-image:radial-gradient(ellipse_55%_60%_at_50%_50%,black,transparent)]" />

      <div className="relative mx-auto max-w-2xl px-6 text-center">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
          Vision
        </span>

        <Reveal delay={0.08} className="mt-6">
          <p className="text-balance text-2xl font-medium leading-snug tracking-tight text-foreground sm:text-3xl">
            Every Indian trader deserves the statistical rigor institutions
            have used for decades.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
