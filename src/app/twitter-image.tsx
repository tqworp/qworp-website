import { ImageResponse } from "next/og";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from "@/lib/constants";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${SITE_NAME} — ${SITE_TAGLINE}`;

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: "0 96px",
          background: "linear-gradient(135deg, #050816 0%, #0D1326 60%, #151C2F 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 240,
            height: 240,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 32,
            border: "1px solid rgba(255,255,255,0.10)",
            background: "rgba(255,255,255,0.03)",
            marginRight: 64,
          }}
        >
          <svg width="150" height="150" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="12" stroke="#838DA2" strokeOpacity={0.5} />
            <rect
              x="16"
              y="7"
              width="12.73"
              height="12.73"
              stroke="#B4BCCC"
              strokeOpacity={0.7}
              transform="rotate(45 16 16)"
            />
            <circle cx="16" cy="16" r="2.4" fill="#3B6CF6" />
          </svg>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 84,
              fontWeight: 600,
              color: "#FFFFFF",
              letterSpacing: "-0.02em",
            }}
          >
            {SITE_NAME}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 20,
              fontSize: 32,
              color: "#B4BCCC",
              maxWidth: 760,
            }}
          >
            {SITE_TAGLINE}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 20,
              color: "#838DA2",
              maxWidth: 780,
              lineHeight: 1.5,
            }}
          >
            {SITE_DESCRIPTION}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
