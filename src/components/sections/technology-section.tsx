import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const TECHNOLOGIES = [
  "Python",
  "NumPy & Pandas",
  "PostgreSQL",
  "DuckDB",
  "Apache Parquet",
  "NSE & BSE Market Data",
  "Next.js",
  "TypeScript",
  "Docker",
];

export function TechnologySection() {
  return (
    <section id="technology" className="relative border-t border-divider bg-bg-secondary py-28">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <SectionHeading
          eyebrow="Technology"
          title="A foundation chosen for correctness."
          description="Mature, well-understood tools — assembled with discipline, so the research is trustworthy long before it's fast."
        />

        <Reveal delay={0.1} className="mt-14">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-3 text-text-secondary">
            {TECHNOLOGIES.map((tech, i) => (
              <span key={tech} className="flex items-center gap-3">
                <span className="font-mono text-sm sm:text-base">{tech}</span>
                {i < TECHNOLOGIES.length - 1 && (
                  <span className="h-1 w-1 rounded-full bg-text-muted/50" aria-hidden="true" />
                )}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
