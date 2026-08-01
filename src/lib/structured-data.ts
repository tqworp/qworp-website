import {
  CONTACT_EMAIL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  SOCIAL_LINKS,
} from "@/lib/constants";

/**
 * JSON-LD structured data describing Vyuhas as an Organization.
 * Rendered once in the root layout via a `<script type="application/ld+json">` tag.
 */
export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    legalName: "Vyuhas",
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    email: CONTACT_EMAIL,
    sameAs: [SOCIAL_LINKS.github, SOCIAL_LINKS.linkedin],
    slogan: "Engineering Intelligent Systems.",
    knowsAbout: [
      "Quantitative Trading Systems",
      "Algorithmic Trading",
      "Market Data Engineering",
      "Artificial Intelligence",
      "Enterprise Software",
      "Decision Intelligence",
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
