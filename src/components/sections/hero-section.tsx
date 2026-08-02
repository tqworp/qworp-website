import { ArrowRightIcon } from "@/components/icons/social-icons";
import { Ticker } from "@/components/ui/ticker";

// Matches qworp-vyuha-redesign.html lines 318-338 exactly.
export function HeroSection() {
  return (
    <section className="hero">
      <div className="container">
        <vyuha-hero
          eyebrow="🇮🇳 AI-DRIVEN QUANT ENGINE"
          headline="Markets move in formation.|Trade like you know the pattern."
          description="India's first quantitative trading platform for retail traders — bringing the factor research, volatility modelling, options analytics and systematic execution of institutional desks to individual investors."
          domains="8"
          mechanisms="16"
          exchanges="2"
        />
      </div>
      <div className="hero-ctas">
        <a href="#pipeline" className="btn btn-primary">
          See the Pipeline
          <ArrowRightIcon />
        </a>
        <a href="#mechanisms" className="btn btn-outline">
          View Mechanisms
        </a>
      </div>
      <Ticker />
    </section>
  );
}
