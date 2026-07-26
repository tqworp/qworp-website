import { ResearchPipelineDiagram } from "@/components/visualizations/research-pipeline-diagram";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function ResearchPipelineSection() {
  return (
    <section id="pipeline" className="relative border-t border-divider bg-background py-28">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,black,transparent)]" />

      <div className="relative mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow="Research Pipeline"
          title="From raw data to a placed order."
          description="One direction. No shortcuts, no discretion."
        />

        <Reveal delay={0.1} className="mt-20">
          <ResearchPipelineDiagram showCaptions className="mx-auto max-w-3xl" />
        </Reveal>
      </div>
    </section>
  );
}
