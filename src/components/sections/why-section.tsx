import { ProbabilityDistribution } from "@/components/visualizations/probability-distribution";
import { Reveal } from "@/components/ui/reveal";

export function WhySection() {
  return (
    <section id="why" className="relative border-t border-divider bg-bg-secondary py-28">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
          Why Quantitative Trading
        </span>

        <Reveal delay={0.05} className="mt-6">
          <p className="text-balance text-2xl font-medium leading-snug tracking-tight text-foreground sm:text-3xl">
            Conviction fades. Evidence compounds.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mx-auto mt-12 max-w-md">
          <ProbabilityDistribution variant="dual" className="h-40 w-full" />
          <div className="mt-4 flex items-center justify-center gap-8 text-xs text-text-muted">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-text-muted" aria-hidden="true" />
              Discretionary
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
              Systematic
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.3} className="mt-10">
          <p className="text-balance mx-auto max-w-md text-base leading-relaxed text-text-secondary">
            QWORP replaces gut-feel with a repeatable, tested process.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
