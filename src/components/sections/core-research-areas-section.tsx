import type { ReactNode } from "react";
import { CorrelationHeatmap } from "@/components/visualizations/correlation-heatmap";
import { CrossSectionalRank } from "@/components/visualizations/cross-sectional-rank";
import { ExecutionFlow } from "@/components/visualizations/execution-flow";
import { FactorNetwork } from "@/components/visualizations/factor-network";
import { MarketMicrostructure } from "@/components/visualizations/market-microstructure";
import { OptionPayoff } from "@/components/visualizations/option-payoff";
import { VolatilitySurface } from "@/components/visualizations/volatility-surface";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const VISUAL_CLASS = "h-full w-full text-text-secondary";

const AREAS: readonly { name: string; description: string; visual: ReactNode }[] = [
  {
    name: "Equity Derivatives",
    description: "Futures and options across NSE & BSE, from index to single-stock.",
    visual: <OptionPayoff variant="call" className={VISUAL_CLASS} />,
  },
  {
    name: "Volatility & Options",
    description: "Implied volatility surfaces, skew and term structure, modelled continuously.",
    visual: <VolatilitySurface className={VISUAL_CLASS} />,
  },
  {
    name: "Open Interest & Positioning",
    description: "Reading where the market is leaning, strike by strike.",
    visual: <OptionPayoff variant="gamma" className={VISUAL_CLASS} />,
  },
  {
    name: "Market Microstructure",
    description: "Order-book depth, liquidity and short-term flow.",
    visual: <MarketMicrostructure className="w-full" />,
  },
  {
    name: "Cross-Sectional Equity",
    description: "Ranking hundreds of stocks against each other, not the calendar.",
    visual: <CrossSectionalRank className="w-full" />,
  },
  {
    name: "Statistical Arbitrage",
    description: "Mean-reverting relationships between related instruments, traded systematically.",
    visual: <FactorNetwork className={VISUAL_CLASS} />,
  },
  {
    name: "Portfolio & Risk",
    // CorrelationHeatmap's CSS-grid cells derive their height from the
    // container's *width* (aspect-square columns) -- so unlike every
    // other visual here, it can't inherit the card slot's h-full/w-full
    // sizing (a non-square slot would make it overflow vertically). It
    // always renders as a fixed square instead.
    description: "Sizing, allocation and drawdown control, bounded by explicit limits.",
    visual: <CorrelationHeatmap className="h-24 w-24" />,
  },
  {
    name: "Systematic Execution",
    description: "A validated signal, turned into a disciplined order.",
    visual: <ExecutionFlow size="mini" />,
  },
];

export function CoreResearchAreasSection() {
  return (
    <section id="research-areas" className="relative border-t border-divider bg-background py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Core Research Areas"
          title="Where QWORP's research is focused."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {AREAS.map((area, i) => (
            <Reveal key={area.name} delay={(i % 4) * 0.07}>
              <div className="group flex h-full flex-col rounded-xl border border-border bg-white/[0.02] p-6 transition-all duration-300 hover:border-white/[0.14] hover:bg-white/[0.035]">
                <div className="flex h-24 items-center justify-center overflow-hidden">
                  {area.visual}
                </div>
                <h3 className="mt-5 text-base font-semibold text-foreground">{area.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {area.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
