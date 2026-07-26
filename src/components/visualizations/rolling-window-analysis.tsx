"use client";

import { motion, useReducedMotion } from "framer-motion";
import { STROKE_WIDTH, VIZ_COLOR } from "./shared";

function sample(fn: (t: number) => number, n = 44, x0 = 20, x1 = 180): string {
  const points = Array.from({ length: n }, (_, i) => {
    const t = i / (n - 1);
    const x = x0 + t * (x1 - x0);
    return `${x.toFixed(1)},${fn(t).toFixed(1)}`;
  });
  return `M${points.join(" L")}`;
}

const SERIES = {
  window: sample((t) => 70 + 20 * Math.sin(t * Math.PI * 3) + 8 * Math.sin(t * Math.PI * 7)),
  momentum: sample((t) => 112 - t * 75 + 6 * Math.sin(t * Math.PI * 8)),
  reversion: sample((t) => 70 + 26 * Math.sin(t * Math.PI * 2.4)),
  walkforward: sample((t) => 70 + 18 * Math.sin(t * Math.PI * 3.4) + 6 * Math.sin(t * Math.PI * 6)),
} as const;

type Variant = keyof typeof SERIES;

const SWEEP: Record<Variant, { x: [number, number][]; width: number }> = {
  window: { x: [[20, 120]], width: 36 },
  momentum: { x: [[20, 120]], width: 36 },
  reversion: { x: [[20, 120]], width: 36 },
  walkforward: { x: [[16, 108]], width: 46 },
};

/**
 * A sliding analysis window over a time series. Reused across four
 * mechanisms via `variant`: the underlying series shape (and, for
 * `walkforward`, a second trailing "test" window right behind the
 * training window) changes; the sweeping-window motion stays the same.
 */
export function RollingWindowAnalysis({
  variant = "window",
  className,
}: {
  variant?: Variant;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const sweep = SWEEP[variant];
  const isReversion = variant === "reversion";
  const isWalkforward = variant === "walkforward";

  return (
    <svg
      viewBox="0 0 200 140"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <line x1={20} y1={120} x2={180} y2={120} stroke={VIZ_COLOR.line} strokeWidth={STROKE_WIDTH} />
      {isReversion && (
        <line
          x1={20}
          y1={70}
          x2={180}
          y2={70}
          stroke={VIZ_COLOR.line}
          strokeWidth={STROKE_WIDTH}
          strokeDasharray="3 4"
        />
      )}

      <motion.path
        d={SERIES[variant]}
        fill="none"
        stroke={VIZ_COLOR.text}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: reduceMotion ? 1 : 0, opacity: reduceMotion ? 1 : 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      />

      <motion.rect
        y={22}
        height={98}
        width={sweep.width}
        rx={3}
        fill={VIZ_COLOR.primary}
        fillOpacity={0.1}
        stroke={VIZ_COLOR.primary}
        strokeOpacity={0.5}
        strokeWidth={STROKE_WIDTH}
        initial={{ x: reduceMotion ? 60 : sweep.x[0][0] }}
        animate={reduceMotion ? undefined : { x: sweep.x[0] }}
        transition={
          reduceMotion
            ? undefined
            : { duration: 3.2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
        }
      />

      {isWalkforward && (
        <motion.rect
          y={22}
          height={98}
          width={16}
          rx={3}
          fill={VIZ_COLOR.success}
          fillOpacity={0.14}
          stroke={VIZ_COLOR.success}
          strokeOpacity={0.6}
          strokeWidth={STROKE_WIDTH}
          initial={{ x: reduceMotion ? 116 : sweep.x[0][0] + sweep.width + 6 }}
          animate={
            reduceMotion
              ? undefined
              : { x: sweep.x[0].map((v) => v + sweep.width + 6) }
          }
          transition={
            reduceMotion
              ? undefined
              : { duration: 3.2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
          }
        />
      )}
    </svg>
  );
}
