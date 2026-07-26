import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

const PHASES = [
  {
    status: "Underway",
    name: "Foundations",
    description:
      "Core research infrastructure: market-data pipelines, a statistical factor library, and a backtesting engine built to eliminate look-ahead bias.",
  },
  {
    status: "Next",
    name: "Research Access",
    description:
      "Factor screens, volatility analytics and backtested strategies, opened to early traders for the first time.",
  },
  {
    status: "Planned",
    name: "Systematic Execution",
    description:
      "Validated research connected directly to disciplined, broker-integrated execution.",
  },
  {
    status: "Future",
    name: "Ecosystem",
    description:
      "Shared research, community-validated strategies, and a growing, tested factor library.",
  },
] as const;

const ACTIVE_INDEX = 0;

export function RoadmapSection() {
  return (
    <section id="roadmap" className="relative border-t border-divider bg-background py-28">
      <div className="mx-auto max-w-2xl px-6">
        <SectionHeading
          eyebrow="Roadmap"
          title="Built in the open, one phase at a time."
          description="No inflated timelines — just the sequence in which QWORP is actually being built."
        />

        <div className="relative mt-16">
          <div className="absolute left-[15px] top-2 bottom-2 w-px bg-divider" aria-hidden="true" />
          <div
            className="absolute left-[15px] top-2 w-px bg-primary"
            style={{ height: `calc(${(ACTIVE_INDEX / (PHASES.length - 1)) * 100}% + 1.5rem)` }}
            aria-hidden="true"
          />

          {PHASES.map((phase, i) => {
            const isActive = i === ACTIVE_INDEX;
            return (
              <Reveal key={phase.name} delay={i * 0.07} className="relative">
                <div className="relative flex gap-6 pb-10 last:pb-0">
                  <div
                    className={cn(
                      "relative z-10 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-mono",
                      isActive
                        ? "border-primary bg-primary text-primary-foreground shadow-[0_0_0_4px_rgba(59,108,246,0.18)]"
                        : "border-border bg-surface text-text-muted",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="flex-1 rounded-xl border border-border bg-white/[0.02] p-5">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-base font-semibold text-foreground">{phase.name}</h3>
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide",
                          isActive
                            ? "bg-primary/15 text-primary"
                            : "bg-white/[0.05] text-text-muted",
                        )}
                      >
                        {phase.status}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-text-muted">
                      {phase.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
