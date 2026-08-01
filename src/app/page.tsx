import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { ProductsSection } from "@/components/sections/products-section";
import { PrinciplesSection } from "@/components/sections/principles-section";
import { TechnologySection } from "@/components/sections/technology-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProductsSection />
      <PrinciplesSection />
      <TechnologySection />
      <ContactSection />
    </>
  );
}
