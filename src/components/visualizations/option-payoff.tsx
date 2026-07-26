"use client";

import { motion, useReducedMotion } from "framer-motion";
import { STROKE_WIDTH, VIZ_COLOR } from "./shared";

function sample(fn: (t: number) => number, n = 40, x0 = 20, x1 = 180): string {
  const points = Array.from({ length: n }, (_, i) => {
    const t = i / (n - 1);
    const x = x0 + t * (x1 - x0);
    return `${x.toFixed(1)},${fn(t).toFixed(1)}`;
  });
  return `M${points.join(" L")}`;
}

const CALL_PATH = "M20,108 L100,108 L180,25";
const PUT_PATH = "M20,25 L100,108 L180,108";
const DELTA_PATH = sample((t) => 115 - 90 / (1 + Math.exp(-9 * (t - 0.5))));
const GAMMA_BELL_PATH = sample((t) => 100 - 70 * Math.exp(-(((t - 0.5) * 4) ** 2)));
const DEALER_GAMMA_PATH = sample(
  (t) => 70 - 40 * Math.sin((t - 0.15) * Math.PI * 1.3) * Math.exp(-(((t - 0.5) * 1.8) ** 2)),
);

const VARIANTS = {
  call: { paths: [{ d: CALL_PATH, color: VIZ_COLOR.primary }], zeroLine: true },
  put: { paths: [{ d: PUT_PATH, color: VIZ_COLOR.primary }], zeroLine: true },
  greeks: {
    paths: [
      { d: DELTA_PATH, color: VIZ_COLOR.primary },
      { d: GAMMA_BELL_PATH, color: VIZ_COLOR.indigo },
    ],
    zeroLine: false,
  },
  gamma: { paths: [{ d: DEALER_GAMMA_PATH, color: VIZ_COLOR.primary }], zeroLine: true },
} as const;

/**
 * Payoff-style curve chart shared by four mechanisms: option payoff
 * (`call`/`put`), `greeks` (delta + gamma overlaid) and dealer `gamma`
 * exposure — one engine, four illustrative shapes.
 */
export function OptionPayoff({
  variant = "call",
  className,
}: {
  variant?: keyof typeof VARIANTS;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const config = VARIANTS[variant];

  return (
    <svg
      viewBox="0 0 200 140"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <line x1={20} y1={120} x2={180} y2={120} stroke={VIZ_COLOR.line} strokeWidth={STROKE_WIDTH} />
      {config.zeroLine && (
        <line
          x1={100}
          y1={20}
          x2={100}
          y2={120}
          stroke={VIZ_COLOR.line}
          strokeWidth={STROKE_WIDTH}
          strokeDasharray="3 4"
        />
      )}
      {config.paths.map((path, i) => (
        <motion.path
          key={i}
          d={path.d}
          fill="none"
          stroke={path.color}
          strokeWidth={STROKE_WIDTH * 1.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: reduceMotion ? 1 : 0, opacity: reduceMotion ? 1 : 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
    </svg>
  );
}
