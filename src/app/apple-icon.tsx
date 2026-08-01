import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  const nodes = [
    { cx: 90, cy: 148, r: 11, fill: "#FFFFFF" },
    { cx: 40, cy: 92, r: 10, fill: "#FFFFFF" },
    { cx: 140, cy: 92, r: 10, fill: "#FFFFFF" },
    { cx: 62, cy: 38, r: 9, fill: "#B8C0CC" },
    { cx: 118, cy: 38, r: 9, fill: "#B8C0CC" },
    { cx: 90, cy: 86, r: 13, fill: "#3B82F6" },
  ];
  const edges = [
    [90, 148, 40, 92],
    [90, 148, 140, 92],
    [40, 92, 62, 38],
    [140, 92, 118, 38],
    [40, 92, 90, 86],
    [140, 92, 90, 86],
    [90, 86, 62, 38],
    [90, 86, 118, 38],
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#050816",
        }}
      >
        <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
          <g stroke="#4B5A75" strokeWidth="2">
            {edges.map(([x1, y1, x2, y2], i) => (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
            ))}
          </g>
          {nodes.map((n, i) => (
            <circle key={i} cx={n.cx} cy={n.cy} r={n.r} fill={n.fill} />
          ))}
        </svg>
      </div>
    ),
    { ...size },
  );
}
