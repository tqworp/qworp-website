import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const PHILOSOPHY = [
  { primary: "Engineering", over: "Marketing" },
  { primary: "Research", over: "Hype" },
  { primary: "Systems", over: "Products" },
  { primary: "Evidence", over: "Assumptions" },
  { primary: "Intelligence", over: "Automation" },
];

export function AboutSection() {
  return (
    <section id="about" className="relative border-t border-divider bg-bg-secondary py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="About"
          title="Structured intelligence, by design."
          align="left"
          className="mx-0"
        />

        <div className="mt-16 grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
          <Reveal delay={0.05} className="space-y-6">
            <p className="text-lg leading-relaxed text-text-secondary">
              Vyuhas takes its name from the Sanskrit word{" "}
              <span className="text-foreground">vyuha</span> — a strategic
              formation, an organized system built from many parts moving with
              purpose. It is how we approach markets: not as noise to react
              to, but as structure to be researched, modeled and engineered
              against.
            </p>
            <p className="text-lg leading-relaxed text-text-secondary">
              Every system we build starts with research, is validated with
              evidence, and is engineered to remain explainable and reliable
              long after the first release — built for the decade, not the
              demo.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="rounded-xl border border-border bg-white/[0.02] p-2">
              <ul className="divide-y divide-divider">
                {PHILOSOPHY.map((item) => (
                  <li
                    key={item.primary}
                    className="flex items-center justify-between gap-4 px-5 py-5"
                  >
                    <span className="text-base font-medium text-foreground">
                      {item.primary}
                    </span>
                    <span className="text-xs uppercase tracking-[0.2em] text-text-muted">
                      over
                    </span>
                    <span className="text-base text-text-muted">{item.over}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
