import { ContactSection } from "@/components/sections/contact-section";
import { EngineSection } from "@/components/sections/engine-section";
import { EtymologySection } from "@/components/sections/etymology-section";
import { HeroSection } from "@/components/sections/hero-section";
import { MechanismsSection } from "@/components/sections/mechanisms-section";
import { PipelineSection } from "@/components/sections/pipeline-section";
import { ResearchSection } from "@/components/sections/research-section";
import { TerminalSection } from "@/components/sections/terminal-section";
import { VisionSection } from "@/components/sections/vision-section";
import { WhyQuantSection } from "@/components/sections/why-quant-section";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

// Section order matches qworp-vyuha-redesign.html's <main> exactly —
// see vyuha-website-revamp-brief.md §1's table. Header/footer/skip-link
// live in layout.tsx, not here.
export default function Home() {
  return (
    <>
      <HeroSection />
      <EtymologySection />
      <WhyQuantSection />
      <PipelineSection />
      <TerminalSection />
      <EngineSection />
      <ResearchSection />
      <MechanismsSection />
      <VisionSection />
      <ContactSection />
      <ScrollReveal />
    </>
  );
}
