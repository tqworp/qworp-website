export const SITE_NAME = "QWORP";
export const SITE_URL = "https://qworp.dev";
export const SITE_TAGLINE = "The Quant Edge, Built for India's Retail Traders.";
export const SITE_DESCRIPTION =
  "QWORP is India's first quantitative trading platform for retail traders — bringing factor research, volatility modelling, options analytics and systematic execution to individual investors.";
export const PARENT_COMPANY = "Vyuhas";
export const PARENT_COMPANY_URL = "https://vyuhas.com";
export const CONTACT_EMAIL = "contact@vyuhas.com";
export const SOCIAL_LINKS = {
  github: "https://github.com/tqworp",
  linkedin: "https://www.linkedin.com/company/vyuhas",
} as const;

export const NAV_LINKS = [
  { href: "#pipeline", label: "Research Pipeline" },
  { href: "#mechanisms", label: "Mechanisms" },
  { href: "#roadmap", label: "Roadmap" },
  { href: SOCIAL_LINKS.github, label: "GitHub", external: true },
] as const;
