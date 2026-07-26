import { HeroSection } from "@/components/sections/hero-section";
import { WhySection } from "@/components/sections/why-section";
import { ResearchPipelineSection } from "@/components/sections/research-pipeline-section";
import { CoreResearchAreasSection } from "@/components/sections/core-research-areas-section";
import { QuantMechanismsSection } from "@/components/sections/quant-mechanisms-section";
import { VisionSection } from "@/components/sections/vision-section";

// Technology and Roadmap were removed from the live MVP experience during
// the visual-first redesign (2026) — the brief asks for a tighter,
// visually-driven page (Hero, Why, Pipeline, Research Areas, Mechanisms,
// Vision, Footer only). Both components are intentionally left in place,
// unmodified, for future re-introduction rather than deleted:
//   import { TechnologySection } from "@/components/sections/technology-section";
//   import { RoadmapSection } from "@/components/sections/roadmap-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <WhySection />
      <ResearchPipelineSection />
      <CoreResearchAreasSection />
      <QuantMechanismsSection />
      {/* <TechnologySection /> — disabled, see note above */}
      {/* <RoadmapSection /> — disabled, see note above */}
      <VisionSection />
    </>
  );
}
