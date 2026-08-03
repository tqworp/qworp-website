import { ArrowRightIcon } from "@/components/icons/social-icons";
import { Ticker } from "@/components/ui/ticker";

// Matches qworp-vyuha-redesign.html lines 318-338 exactly. <vyuha-hero> is a
// direct child of <section class="hero"> — no .container wrapper — so it
// spans full viewport width. That's deliberate, not an oversight: it's the
// other half of "Hero full-bleed, no width constraint" (see globals.css's
// host-rule split comment) — the border/background-blend was done first,
// this structural piece landed later. Don't add a container back around it.
export function HeroSection() {
  return (
    <section className="hero">
      <vyuha-hero
        eyebrow="🇮🇳 AI-DRIVEN QUANT ENGINE"
        headline="Markets move in formation.|Trade like you know the pattern."
        description="India's first quantitative trading platform for retail traders — bringing the factor research, volatility modelling, options analytics and systematic execution of institutional desks to individual investors."
        domains="8"
        mechanisms="16"
        exchanges="2"
      />
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
