import {
  Braces,
  Cpu,
  Database,
  FlaskConical,
  History,
  PieChart,
  Play,
  ScanEye,
  ShieldCheck,
  Telescope,
  Zap,
} from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const MODULES = [
  { icon: Database, name: "Market Data", description: "Unified ingestion across venues and asset classes." },
  { icon: Braces, name: "Feature Engineering", description: "Structured signal from raw, noisy series." },
  { icon: FlaskConical, name: "Statistical Research", description: "Hypotheses tested before they become code." },
  { icon: Telescope, name: "Alpha Discovery", description: "Systematic search across a disciplined space." },
  { icon: Cpu, name: "Machine Learning", description: "Models that earn their place through evidence." },
  { icon: History, name: "Backtesting", description: "Historical rigor, free of look-ahead bias." },
  { icon: PieChart, name: "Portfolio Construction", description: "Sizing and allocation grounded in risk." },
  { icon: ShieldCheck, name: "Risk Engine", description: "Constraints enforced before capital moves." },
  { icon: Play, name: "Paper Trading", description: "Live markets, simulated capital, real signal." },
  { icon: Zap, name: "Execution", description: "Research translated into orders, faithfully." },
  { icon: ScanEye, name: "Monitoring", description: "Continuous observation of live behavior." },
] as const;

export function PlatformSection() {
  return (
    <section id="platform" className="relative border-t border-divider bg-background py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Platform"
          title="Eleven disciplines. One system."
          description="Every module is independent, and every module speaks the same language."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {MODULES.map((module, i) => (
            <Reveal key={module.name} delay={(i % 4) * 0.07}>
              <div className="group h-full rounded-xl border border-border bg-white/[0.02] p-6 transition-all duration-300 hover:border-white/[0.14] hover:bg-white/[0.035]">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-text-secondary transition-colors duration-300 group-hover:border-primary/40 group-hover:text-primary">
                  <module.icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3 className="mt-5 text-base font-semibold text-foreground">{module.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {module.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
