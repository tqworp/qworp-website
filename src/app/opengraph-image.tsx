import { ImageResponse } from "next/og";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/constants";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${SITE_NAME} — Engineering Intelligent Systems.`;

const NODES = [
  { cx: 120, cy: 210, r: 14, fill: "#FFFFFF" },
  { cx: 55, cy: 120, r: 12, fill: "#FFFFFF" },
  { cx: 185, cy: 120, r: 12, fill: "#FFFFFF" },
  { cx: 85, cy: 45, r: 11, fill: "#B8C0CC" },
  { cx: 155, cy: 45, r: 11, fill: "#B8C0CC" },
  { cx: 120, cy: 112, r: 16, fill: "#3B82F6" },
];

const EDGES: Array<[number, number, number, number]> = [
  [120, 210, 55, 120],
  [120, 210, 185, 120],
  [55, 120, 85, 45],
  [185, 120, 155, 45],
  [55, 120, 120, 112],
  [185, 120, 120, 112],
  [120, 112, 85, 45],
  [120, 112, 155, 45],
];

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
          background: "linear-gradient(135deg, #050816 0%, #0B1020 60%, #111827 100%)",
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
          <svg width="150" height="150" viewBox="0 0 240 240" fill="none">
            <g stroke="#4B5A75" strokeWidth="2.5">
              {EDGES.map(([x1, y1, x2, y2], i) => (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
              ))}
            </g>
            {NODES.map((n, i) => (
              <circle key={i} cx={n.cx} cy={n.cy} r={n.r} fill={n.fill} />
            ))}
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
              color: "#B8C0CC",
              maxWidth: 760,
            }}
          >
            Engineering Intelligent Systems.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 20,
              color: "#8B95A7",
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
