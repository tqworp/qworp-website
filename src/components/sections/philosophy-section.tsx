import { Blocks, ClipboardCheck, Component, Eye, Microscope, PackageCheck } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const PRINCIPLES = [
  {
    icon: Microscope,
    title: "Research before Strategy",
    description: "Every strategy begins with evidence.",
  },
  {
    icon: Component,
    title: "Feature First",
    description: "Features create alpha. Models evolve.",
  },
  {
    icon: Eye,
    title: "Explainable Intelligence",
    description: "Every prediction should be explainable.",
  },
  {
    icon: ClipboardCheck,
    title: "Statistical Validation",
    description: "Nothing is accepted without rigorous testing.",
  },
  {
    icon: Blocks,
    title: "Modular Systems",
    description: "Everything is replaceable.",
  },
  {
    icon: PackageCheck,
    title: "Production Ready",
    description: "Research should seamlessly become execution.",
  },
] as const;

export function PhilosophySection() {
  return (
    <section id="philosophy" className="relative border-t border-divider bg-bg-secondary py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Engineering Philosophy"
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
