export const SITE_NAME = "QWORP";
export const SITE_URL = "https://qworp.dev";
export const SITE_TAGLINE = "Engineering Alpha Through Research.";
export const SITE_DESCRIPTION =
  "QWORP is an institutional-grade quantitative research platform for building, validating and deploying systematic trading strategies through statistics, machine learning and engineering.";
export const PARENT_COMPANY = "Vyuhas";
export const PARENT_COMPANY_URL = "https://vyuhas.com";
export const CONTACT_EMAIL = "hello@qworp.dev";
export const SOCIAL_LINKS = {
  github: "https://github.com/vyuhas/qworp",
  linkedin: "https://www.linkedin.com/company/vyuhas",
} as const;

export const NAV_LINKS = [
  { href: "#architecture", label: "Architecture" },
  { href: "#research", label: "Research" },
  { href: SOCIAL_LINKS.github, label: "GitHub", external: true },
  { href: "#contact", label: "Contact" },
] as const;
