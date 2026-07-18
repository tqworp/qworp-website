import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

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
          background: "#050816",
        }}
      >
        <svg width="120" height="120" viewBox="0 0 32 32" fill="none">
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
          <circle cx="16" cy="16" r="2.6" fill="#3B6CF6" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
