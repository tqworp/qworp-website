import type { Metadata, Viewport } from "next";
import { Fraunces, IBM_Plex_Mono, Inter, Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
} from "@/lib/constants";
import {
  buildOrganizationJsonLd,
  buildProductJsonLd,
  buildWebsiteJsonLd,
} from "@/lib/structured-data";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

// Typography discipline (brief §2.4): Manrope for all display headings,
// Inter for body copy, IBM Plex Mono for eyebrows/tickers/stat labels,
// Fraunces scoped to the Etymology <h2> only (enforced in globals.css's
// `.meaning h2` rule, not here — every one of these variables is
// available globally, the *restriction* is which CSS selector uses it).
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: "variable",
  axes: ["opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Vyuha",
    "QWORP",
    "quantitative trading",
    "algorithmic trading India",
    "options analytics",
    "volatility modelling",
    "systematic trading platform",
    "retail quant trading",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

// Fixed dark theme — matches qworp-vyuha-redesign.html's
// <meta name="theme-color" content="#070612"> exactly. This is a
// committed single-theme design (the void/purple palette *is* the
// brand), not an incomplete light-mode implementation.
export const viewport: Viewport = {
  themeColor: "#070612",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = [buildOrganizationJsonLd(), buildWebsiteJsonLd(), buildProductJsonLd()];

  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} ${fraunces.variable} ${ibmPlexMono.variable}`}
    >
      <head>
        {/* Brief §5.3: preload the hero image. It's the LCP element, but it
            lives inside <vyuha-hero>'s Shadow DOM, which only exists once
            vyuha-motion.js runs — the browser's preload scanner can't see
            it in the raw HTML at all otherwise (measured via Lighthouse:
            this alone was the gap between an 88 and a sub-90 Performance
            score, entirely from LCP request-discovery delay). Same
            srcset/sizes as the real <img> in vyuha-motion.js's VyuhaHero
            render() — keep them in sync if either changes. */}
        <link
          rel="preload"
          as="image"
          href="/images/hero-ribbon-900w.webp"
          imageSrcSet="/images/hero-ribbon-640w.webp 640w, /images/hero-ribbon-900w.webp 900w, /images/hero-ribbon.webp 1500w"
          imageSizes="100vw"
          fetchPriority="high"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a href="#top" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="top">{children}</main>
        <SiteFooter />
        {/* Matches the brief's own `<script type="module" src="…" defer>`
            recommendation (§4) — afterInteractive is next/script's
            equivalent timing (runs once hydration is underway, not
            blocking initial HTML parse). */}
        <Script src="/js/vyuha-motion.js" type="module" strategy="afterInteractive" />
      </body>
    </html>
  );
}
