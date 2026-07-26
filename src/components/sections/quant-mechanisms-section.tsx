import type { ReactNode } from "react";
import { CorrelationHeatmap } from "@/components/visualizations/correlation-heatmap";
import { CrossSectionalRank } from "@/components/visualizations/cross-sectional-rank";
import { ExecutionFlow } from "@/components/visualizations/execution-flow";
import { FactorNetwork } from "@/components/visualizations/factor-network";
import { FeatureEngineering } from "@/components/visualizations/feature-engineering";
import { MarketMicrostructure } from "@/components/visualizations/market-microstructure";
import { OptionPayoff } from "@/components/visualizations/option-payoff";
import { ProbabilityDistribution } from "@/components/visualizations/probability-distribution";
import { RollingWindowAnalysis } from "@/components/visualizations/rolling-window-analysis";
import { VolatilitySurface } from "@/components/visualizations/volatility-surface";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const VISUAL_CLASS = "h-full w-full text-text-secondary";

const MECHANISMS: readonly { name: string; caption: string; visual: ReactNode }[] = [
  { name: "Feature Engineering", caption: "Raw series into structured, testable signal.", visual: <FeatureEngineering className={VISUAL_CLASS} /> },
  { name: "Statistical Factors", caption: "Return drivers, isolated and measured.", visual: <FactorNetwork className={VISUAL_CLASS} /> },
  { name: "Cross-Sectional Ranking", caption: "Ranked against peers, not the calendar.", visual: <CrossSectionalRank className="w-full" /> },
  { name: "Rolling Window Analysis", caption: "Recomputed continuously as data arrives.", visual: <RollingWindowAnalysis variant="window" className={VISUAL_CLASS} /> },
  { name: "Mean Reversion", caption: "The pull back to equilibrium.", visual: <RollingWindowAnalysis variant="reversion" className={VISUAL_CLASS} /> },
  { name: "Momentum", caption: "The persistence of an existing trend.", visual: <RollingWindowAnalysis variant="momentum" className={VISUAL_CLASS} /> },
  { name: "Market Regime Detection", caption: "Trending, ranging or volatile — classified.", visual: <ProbabilityDistribution variant="dual" className={VISUAL_CLASS} /> },
  { name: "Volatility Modelling", caption: "Forecasting the dispersion of returns.", visual: <VolatilitySurface className={VISUAL_CLASS} /> },
  { name: "Open Interest Analysis", caption: "Positioning, read across the options chain.", visual: <MarketMicrostructure className="w-full" /> },
  { name: "Greeks", caption: "Delta, gamma, theta, vega — tracked live.", visual: <OptionPayoff variant="greeks" className={VISUAL_CLASS} /> },
  { name: "Dealer Gamma", caption: "How hedging flows shape price action.", visual: <OptionPayoff variant="gamma" className={VISUAL_CLASS} /> },
  { name: "Machine Learning", caption: "Pattern recognition, earning its place.", visual: <FactorNetwork variant="ml" className={VISUAL_CLASS} /> },
  { name: "Walk-Forward Validation", caption: "Tested only on data never seen.", visual: <RollingWindowAnalysis variant="walkforward" className={VISUAL_CLASS} /> },
  { name: "Portfolio Optimisation", caption: "Capital allocated under explicit constraints.", visual: <ProbabilityDistribution variant="single" className={VISUAL_CLASS} /> },
  { name: "Execution Algorithms", caption: "Sequenced to minimise slippage.", visual: <ExecutionFlow size="mini" /> },
  // CorrelationHeatmap is a fixed square regardless of slot size -- see
  // the identical note in core-research-areas-section.tsx.
  { name: "Risk Models", caption: "Exposure and drawdown, bounded.", visual: <CorrelationHeatmap className="h-24 w-24" /> },
];

export function QuantMechanismsSection() {
  return (
    <section id="mechanisms" className="relative border-t border-divider bg-bg-secondary py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Primary Quantitative Mechanisms"
          title="Shown, not described."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {MECHANISMS.map((mechanism, i) => (
            <Reveal key={mechanism.name} delay={(i % 4) * 0.05}>
              <div className="group flex h-full flex-col rounded-xl border border-border bg-white/[0.02] p-5 transition-all duration-300 hover:border-white/[0.14] hover:bg-white/[0.035]">
                <div className="flex h-24 items-center justify-center overflow-hidden">
                  {mechanism.visual}
                </div>
                <h3 className="mt-4 text-sm font-semibold text-foreground">{mechanism.name}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-text-muted">
                  {mechanism.caption}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
