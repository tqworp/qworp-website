import { HeroSection } from "@/components/sections/hero-section";
import { WhySection } from "@/components/sections/why-section";
import { PlatformSection } from "@/components/sections/platform-section";
import { PhilosophySection } from "@/components/sections/philosophy-section";
import { ArchitectureSection } from "@/components/sections/architecture-section";
import { TechnologySection } from "@/components/sections/technology-section";
import { VisionSection } from "@/components/sections/vision-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <WhySection />
      <PlatformSection />
      <PhilosophySection />
      <ArchitectureSection />
      <TechnologySection />
      <VisionSection />
      <ContactSection />
    </>
  );
}
