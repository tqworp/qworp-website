import { Activity, Waypoints, Workflow } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const SECONDARY_PRODUCTS = [
  {
    icon: Workflow,
    name: "Enterprise AI",
    description: "AI-powered automation for complex business workflows.",
  },
  {
    icon: Waypoints,
    name: "Decision Intelligence",
    description: "Turning high-volume information into actionable intelligence.",
  },
] as const;

export function ProductsSection() {
  return (
    <section id="products" className="relative border-t border-divider bg-background py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Products"
          title="QWORP leads our platform work."
          description="A quantitative trading system, engineered first — the same discipline extends to every initiative that follows it."
        />

        <Reveal delay={0.05} className="mt-16">
          <article className="group relative overflow-hidden rounded-2xl border border-primary/25 bg-white/[0.03] p-10">
            <div
              className="pointer-events-none absolute inset-0 opacity-70"
              aria-hidden="true"
              style={{
                backgroundImage:
                  "radial-gradient(ellipse 60% 80% at 100% 0%, rgba(59,130,246,0.12), transparent 60%)",
              }}
            />
            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-2xl">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-primary/30 bg-surface-elevated text-primary">
                    <Activity className="h-6 w-6" strokeWidth={1.75} />
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] uppercase tracking-[0.15em] text-primary">
                    Flagship
                  </div>
                </div>

                <h3 className="mt-6 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  QWORP
                </h3>
                <p className="mt-1.5 text-sm font-medium text-primary/90">
                  Quantitative Workflow &amp; Research Platform
                </p>
                <p className="mt-4 text-base leading-relaxed text-text-secondary">
                  An institutional-grade research platform for building,
                  validating and deploying systematic trading strategies —
                  unifying market data, feature engineering, statistical
                  research and machine learning into a single, rigorously
                  engineered system built for production, not backtests alone.
                </p>
              </div>

              <dl className="grid shrink-0 grid-cols-3 gap-6 border-t border-divider pt-6 lg:w-64 lg:grid-cols-1 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
                <div>
                  <dt className="text-xs uppercase tracking-[0.15em] text-text-muted">Focus</dt>
                  <dd className="mt-1 text-sm text-foreground">Systematic trading</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.15em] text-text-muted">Scope</dt>
                  <dd className="mt-1 text-sm text-foreground">Research to execution</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.15em] text-text-muted">Status</dt>
                  <dd className="mt-1 text-sm text-foreground">In active build</dd>
                </div>
              </dl>
            </div>
          </article>
        </Reveal>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {SECONDARY_PRODUCTS.map((product, i) => (
            <Reveal key={product.name} delay={0.15 + i * 0.1}>
              <article className="group flex h-full items-start gap-4 rounded-xl border border-border bg-white/[0.02] p-7 transition-all duration-300 hover:border-white/[0.14] hover:bg-white/[0.035]">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-surface text-text-secondary transition-colors duration-300 group-hover:border-primary/40 group-hover:text-primary">
                  <product.icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground">{product.name}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-text-muted">
                    {product.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
