"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Braces,
  ChartSpline,
  Cpu,
  Database,
  FlaskConical,
  PieChart,
  Server,
  Zap,
} from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const STAGES = [
  { icon: Database, name: "Data Sources", description: "Exchanges, vendors and alternative data, unified." },
  { icon: Server, name: "Ingestion Layer", description: "Normalized, timestamped, and versioned at the source." },
  { icon: Braces, name: "Feature Engineering", description: "Raw series become structured, testable signal." },
  { icon: FlaskConical, name: "Research Engine", description: "Hypotheses formed and validated statistically." },
  { icon: Cpu, name: "ML Models", description: "Learned components, explainable by design." },
  { icon: PieChart, name: "Portfolio Optimizer", description: "Sizing and allocation under explicit constraints." },
  { icon: Zap, name: "Execution", description: "Orders routed with discipline, not discretion." },
  { icon: ChartSpline, name: "Analytics", description: "Every decision observed after it is made." },
] as const;

export function ArchitectureSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="architecture" className="relative border-t border-divider bg-background py-28">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,black,transparent)]" />

      <div className="relative mx-auto max-w-2xl px-6">
        <SectionHeading
          eyebrow="Architecture"
          title="Research, engineered into a pipeline."
          description="Every stage is a discrete, replaceable system — data flows through them in one direction, from source to outcome."
        />

        <div className="relative mt-16">
          <div className="absolute left-7 top-0 bottom-0 w-px bg-divider" aria-hidden="true" />
          {!reduceMotion && (
            <motion.div
              className="absolute left-[26px] h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_2px_rgba(59,108,246,0.55)]"
              animate={{ top: ["2%", "98%"] }}
              transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
              aria-hidden="true"
            />
          )}

          {STAGES.map((stage, i) => (
            <Reveal key={stage.name} delay={i * 0.05} className="relative">
              <div className="relative flex gap-6 pb-10 last:pb-0">
                <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-border bg-surface text-primary">
                  <stage.icon className="h-6 w-6" strokeWidth={1.6} />
                </div>
                <div className="flex-1 rounded-xl border border-border bg-white/[0.02] p-5">
                  <span className="font-mono text-xs tracking-wider text-text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-1 text-base font-semibold text-foreground">
                    {stage.name}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-text-muted">
                    {stage.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
