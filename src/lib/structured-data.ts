import {
  CONTACT_EMAIL,
  PRODUCT_DESCRIPTION,
  PRODUCT_NAME,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  SOCIAL_LINKS,
} from "@/lib/constants";

/**
 * JSON-LD describing Vyuha as the Organization — the company, not the
 * product. QWORP is a separate, linked entity (buildProductJsonLd below).
 * Rendered in the root layout via a `<script type="application/ld+json">` tag.
 */
export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    legalName: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    email: CONTACT_EMAIL,
    sameAs: [SOCIAL_LINKS.github, SOCIAL_LINKS.linkedin],
    knowsAbout: [
      "Quantitative Trading",
      "Equity Derivatives",
      "Volatility Modelling",
      "Options Analytics",
      "Market Microstructure",
      "Systematic Execution",
    ],
  };
}

export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
  };
}

/**
 * QWORP — Vyuha's flagship product. Modelled as a SoftwareApplication
 * with `brand`/`creator` pointing back at the Organization, never as the
 * Organization itself. See constants.ts's NAV_LINKS comment and brief §2.1.
 *
 * No `aggregateRating`/`review`/`offers`/install-count fields — QWORP is
 * pre-launch/request-access, so none of those would be real. Don't add any
 * of them out of habit if you're extending this later; that's the same
 * fabricated-claim risk as the Sharpe/Calmar numbers the brief stripped
 * from the visible copy, just invisible to a casual reader since it's
 * structured data, not on-page text.
 *
 * TODO: not yet called from layout.tsx's `jsonLd` array — layout.tsx is
 * being rebuilt from scratch in the section-building pass, so wiring this
 * in happens there, once, instead of touching the file twice.
 */
export function buildProductJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: PRODUCT_NAME,
    description: PRODUCT_DESCRIPTION,
    url: SITE_URL,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    brand: { "@type": "Brand", name: SITE_NAME },
    creator: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };
}
