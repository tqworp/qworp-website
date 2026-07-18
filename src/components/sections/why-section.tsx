import { Reveal } from "@/components/ui/reveal";

const CHAIN = [
  "Data.",
  "Research.",
  "Feature engineering.",
  "Statistical validation.",
  "Machine learning.",
  "Execution.",
];

export function WhySection() {
  return (
    <section id="research" className="relative border-t border-divider bg-bg-secondary py-28">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
          Why QWORP
        </span>

        <Reveal delay={0.05} className="mt-6">
          <p className="text-balance text-2xl font-medium leading-snug tracking-tight text-foreground sm:text-3xl">
            Modern quantitative trading is no longer about indicators.
          </p>
        </Reveal>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
          {CHAIN.map((word, i) => (
            <Reveal key={word} delay={0.1 + i * 0.06} direction="none">
              <span className="text-balance text-xl font-medium text-text-secondary sm:text-2xl">
                {word}
              </span>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.45} className="mt-8">
          <p className="text-balance mx-auto max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg">
            QWORP brings these disciplines together into one unified research
            platform — so an idea can move from hypothesis to production
            without leaving a single, coherent system.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
