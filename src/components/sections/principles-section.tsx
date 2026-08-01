import {
  Database,
  FileSearch,
  FlaskConical,
  Layers,
  PackageCheck,
  ShieldCheck,
} from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const PRINCIPLES = [
  {
    icon: FlaskConical,
    title: "Research First",
    description: "Every system begins with evidence, not assumption.",
  },
  {
    icon: FileSearch,
    title: "Explainable Systems",
    description: "Intelligence you can inspect, trust and audit.",
  },
  {
    icon: Database,
    title: "Data Driven",
    description: "Decisions grounded in real, verified signal.",
  },
  {
    icon: PackageCheck,
    title: "Production Ready",
    description: "Engineered for the realities of scale, not demos.",
  },
  {
    icon: ShieldCheck,
    title: "Reliability",
    description: "Systems that behave the same way, every time.",
  },
  {
    icon: Layers,
    title: "Scalability",
    description: "Architecture built to grow without breaking.",
  },
] as const;

export function PrinciplesSection() {
  return (
    <section id="principles" className="relative border-t border-divider bg-bg-secondary py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Engineering Principles"
          title="The standards that govern how we build."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PRINCIPLES.map((principle, i) => (
            <Reveal key={principle.title} delay={(i % 3) * 0.08}>
              <div className="group h-full rounded-xl border border-border bg-white/[0.02] p-6 transition-all duration-300 hover:border-white/[0.14] hover:bg-white/[0.035]">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-text-secondary transition-colors duration-300 group-hover:border-primary/40 group-hover:text-primary">
                  <principle.icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3 className="mt-5 text-base font-semibold text-foreground">
                  {principle.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {principle.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
