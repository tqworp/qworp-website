import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const TECHNOLOGIES = [
  "Artificial Intelligence",
  "Python",
  "FastAPI",
  "PostgreSQL",
  "Docker",
  "TypeScript",
  "Next.js",
  "Cloud Infrastructure",
  "Machine Learning",
  "Data Engineering",
];

export function TechnologySection() {
  return (
    <section id="technology" className="relative border-t border-divider bg-background py-28">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow="Technology"
          title="A foundation chosen for longevity."
          description="Mature, well-understood tools — assembled with discipline rather than novelty for its own sake."
        />

        <Reveal delay={0.1} className="mt-16">
          <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-5">
            {TECHNOLOGIES.map((tech, i) => (
              <li key={tech} className="flex items-center gap-3">
                <span className="cursor-default text-xl font-medium text-text-secondary transition-colors duration-300 hover:text-foreground sm:text-2xl">
                  {tech}
                </span>
                {i < TECHNOLOGIES.length - 1 ? (
                  <span
                    className="h-1 w-1 rounded-full bg-text-muted/40"
                    aria-hidden="true"
                  />
                ) : null}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
