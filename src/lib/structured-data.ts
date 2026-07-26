import {
  CONTACT_EMAIL,
  PARENT_COMPANY,
  PARENT_COMPANY_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  SOCIAL_LINKS,
} from "@/lib/constants";

export function buildSoftwareApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Cloud",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    countryOfOrigin: "IN",
    audience: {
      "@type": "Audience",
      audienceType: "Retail Traders",
      geographicArea: {
        "@type": "Country",
        name: "India",
      },
    },
    creator: {
      "@type": "Organization",
      name: PARENT_COMPANY,
      url: PARENT_COMPANY_URL,
    },
    sameAs: [SOCIAL_LINKS.github, SOCIAL_LINKS.linkedin],
  };
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    email: CONTACT_EMAIL,
    description: SITE_DESCRIPTION,
    areaServed: "IN",
    parentOrganization: {
      "@type": "Organization",
      name: PARENT_COMPANY,
      url: PARENT_COMPANY_URL,
    },
    sameAs: [SOCIAL_LINKS.github, SOCIAL_LINKS.linkedin],
    knowsAbout: [
      "Quantitative Trading",
      "Feature Engineering",
      "Statistical Factor Research",
      "Volatility Modelling",
      "Options Greeks",
      "Open Interest Analysis",
      "Market Regime Detection",
      "Walk-Forward Validation",
      "Portfolio Optimisation",
      "Systematic Execution",
      "Risk Modelling",
    ],
  };
}
