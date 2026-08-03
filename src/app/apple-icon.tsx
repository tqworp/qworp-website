import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Same mark/geometry as src/app/icon.svg, scaled up for the iOS home-screen
// icon — see qworp-vyuha-redesign.html's favicon <link> for the source shape.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#070612",
        }}
      >
        <svg width="132" height="132" viewBox="0 0 48 48">
          <defs>
            <linearGradient id="mark-g-apple" x1="4" y1="4" x2="44" y2="44">
              <stop stopColor="#e0cfff" />
              <stop offset="0.5" stopColor="#9d67ff" />
              <stop offset="1" stopColor="#f2a4bc" />
            </linearGradient>
          </defs>
          <g fill="none" stroke="url(#mark-g-apple)" strokeWidth="1.9" opacity="0.95">
            <ellipse cx="24" cy="24" rx="17" ry="12" transform="rotate(18 24 24)" />
            <ellipse cx="24" cy="24" rx="17" ry="12" transform="rotate(62 24 24)" />
            <ellipse cx="24" cy="24" rx="17" ry="12" transform="rotate(106 24 24)" />
            <ellipse cx="24" cy="24" rx="17" ry="12" transform="rotate(150 24 24)" />
          </g>
        </svg>
      </div>
    ),
    { ...size },
  );
}
