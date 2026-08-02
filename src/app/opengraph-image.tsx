import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from "@/lib/constants";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${SITE_NAME} — ${SITE_TAGLINE}`;

// Fetched once from Google Fonts and committed under src/app/fonts/ rather
// than fetched at request time — satori/ImageResponse needs real font
// bytes, and a remote fetch inside an image route is a reliability risk
// (one Google Fonts hiccup and this route 500s). .woff, not .ttf: that's
// the format Google Fonts actually serves, and satori supports it
// natively (ttf/otf/woff — woff2 is the one format it can't read).
const fontsDir = join(process.cwd(), "src/app/fonts");
async function loadFonts() {
  const [manropeExtraBold, manropeBold, interRegular] = await Promise.all([
    readFile(join(fontsDir, "Manrope-ExtraBold.woff")),
    readFile(join(fontsDir, "Manrope-Bold.woff")),
    readFile(join(fontsDir, "Inter-Regular.woff")),
  ]);
  return [
    { name: "Manrope", data: manropeExtraBold, weight: 800 as const, style: "normal" as const },
    { name: "Manrope", data: manropeBold, weight: 700 as const, style: "normal" as const },
    { name: "Inter", data: interRegular, weight: 400 as const, style: "normal" as const },
  ];
}

// Same four-ellipse formation as the site favicon and nav/footer mark
// (qworp-vyuha-redesign.html's <svg class="brand-mark">/`MARK` template) —
// gradient version, matching how it appears at brand scale on the page.
function Mark() {
  return (
    <svg width="220" height="220" viewBox="0 0 48 48">
      <defs>
        <linearGradient id="mark-g-og" x1="4" y1="4" x2="44" y2="44">
          <stop stopColor="#e0cfff" />
          <stop offset="0.5" stopColor="#9d67ff" />
          <stop offset="1" stopColor="#f2a4bc" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#mark-g-og)" strokeWidth="1.7" opacity="0.95">
        <ellipse cx="24" cy="24" rx="17" ry="12" transform="rotate(18 24 24)" />
        <ellipse cx="24" cy="24" rx="17" ry="12" transform="rotate(62 24 24)" />
        <ellipse cx="24" cy="24" rx="17" ry="12" transform="rotate(106 24 24)" />
        <ellipse cx="24" cy="24" rx="17" ry="12" transform="rotate(150 24 24)" />
      </g>
    </svg>
  );
}

export default async function Image() {
  const fonts = await loadFonts();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: "0 96px",
          background:
            "radial-gradient(ellipse 80% 60% at 15% 0%, rgba(170,120,255,0.16), transparent), radial-gradient(ellipse 60% 50% at 100% 100%, rgba(110,61,232,0.14), transparent), #070612",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 260,
            height: 260,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 24,
            border: "1px solid rgba(196,164,255,0.24)",
            background: "rgba(170,120,255,0.06)",
            marginRight: 72,
            flexShrink: 0,
          }}
        >
          <Mark />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontFamily: "Manrope",
              fontSize: 96,
              fontWeight: 800,
              color: "#f7f5fb",
              letterSpacing: "-0.02em",
            }}
          >
            {SITE_NAME.toUpperCase()}
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "Manrope",
              marginTop: 22,
              fontSize: 34,
              fontWeight: 700,
              color: "#aa78ff",
              maxWidth: 760,
            }}
          >
            {SITE_TAGLINE}
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "Inter",
              marginTop: 28,
              fontSize: 22,
              fontWeight: 400,
              color: "#aaa4ba",
              maxWidth: 780,
              lineHeight: 1.5,
            }}
          >
            {SITE_DESCRIPTION}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
