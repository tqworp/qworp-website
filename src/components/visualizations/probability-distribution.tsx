"use client";

import { motion, useReducedMotion } from "framer-motion";
import { STROKE_WIDTH, VIZ_COLOR } from "./shared";

function sample(fn: (t: number) => number, n = 48, x0 = 20, x1 = 180): string {
  const points = Array.from({ length: n }, (_, i) => {
    const t = i / (n - 1);
    const x = x0 + t * (x1 - x0);
    return `${x.toFixed(1)},${fn(t).toFixed(1)}`;
  });
  return `M${points.join(" L")}`;
}

function gaussian(t: number, mean: number, sigma: number, amplitude: number): number {
  return amplitude * Math.exp(-((t - mean) ** 2) / (2 * sigma * sigma));
}

const BASELINE = 120;
const WIDE_PATH = sample((t) => BASELINE - gaussian(t, 0.5, 0.28, 55));
const NARROW_PATH = sample((t) => BASELINE - gaussian(t, 0.5, 0.11, 95));
const SINGLE_PATH = sample((t) => BASELINE - gaussian(t, 0.5, 0.17, 92));

/**
 * A Gaussian distribution chart. `dual` overlays a wide, flat "noise"
 * curve behind a narrow, tall "edge" curve — used both for Why
 * Quantitative Trading (discretionary vs. systematic) and the Market
 * Regime Detection mechanism (calm vs. volatile regime).
 */
export function ProbabilityDistribution({
  variant = "single",
  className,
}: {
  variant?: "single" | "dual";
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <svg
      viewBox="0 0 200 140"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <line x1={20} y1={BASELINE} x2={180} y2={BASELINE} stroke={VIZ_COLOR.line} strokeWidth={STROKE_WIDTH} />

      {variant === "dual" && (
        <motion.path
          d={WIDE_PATH}
          fill="none"
          stroke={VIZ_COLOR.muted}
          strokeWidth={STROKE_WIDTH}
          strokeLinecap="round"
          initial={{ pathLength: reduceMotion ? 1 : 0, opacity: reduceMotion ? 0.6 : 0 }}
          whileInView={{ pathLength: 1, opacity: 0.6 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        />
      )}

      <motion.path
        d={variant === "dual" ? NARROW_PATH : SINGLE_PATH}
        fill="none"
        stroke={VIZ_COLOR.primary}
        strokeWidth={STROKE_WIDTH * 1.4}
        strokeLinecap="round"
        initial={{ pathLength: reduceMotion ? 1 : 0, opacity: reduceMotion ? 1 : 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: variant === "dual" ? 0.3 : 0, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  );
}
