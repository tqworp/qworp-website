// Vyuha is the company. QWORP is its flagship product — never the other
// way around. See vyuha-website-revamp-brief.md §2.1 (brand hierarchy)
// and qworp-vyuha-redesign.html, the source of truth for every string below.

export const SITE_NAME = "Vyuha";

export const SITE_URL = "https://vyuhas.com";

export const SITE_TAGLINE =
  "Creators of QWORP, The Quant Edge for India's Retail Traders.";

export const SITE_DESCRIPTION =
  "Vyuha is the company behind QWORP, India's first quantitative trading platform for retail traders — factor research, volatility modelling, options analytics and systematic execution.";

export const CONTACT_EMAIL = "contact@vyuhas.com";

export const SOCIAL_LINKS = {
  github: "https://github.com/tqworp",
  linkedin: "https://www.linkedin.com/company/vyuhas",
} as const;

// Only 5 of the page's 10 sections are linked in nav — Why Quantitative
// (#why), The Terminal (#terminal) and Inside The Engine (#engine) are
// deliberately not repeated here. Matches the redesign header exactly;
// don't add to this list without checking the source file first.
export const NAV_LINKS = [
  { href: "#pipeline", label: "Pipeline" },
  { href: "#research", label: "Research" },
  { href: "#mechanisms", label: "Mechanisms" },
  { href: "#vyuha", label: "Etymology" },
  { href: "#contact", label: "Contact" },
] as const;

// QWORP — the product, distinct from Vyuha the Organization. Used by
// buildProductJsonLd() so structured data reflects the same hierarchy
// as the visible page.
export const PRODUCT_NAME = "QWORP";

export const PRODUCT_DESCRIPTION =
  "India's first quantitative trading platform for retail traders — factor research, volatility modelling, options analytics and systematic execution.";
