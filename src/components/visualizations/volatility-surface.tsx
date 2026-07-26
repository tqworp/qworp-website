"use client";

import { motion, useReducedMotion } from "framer-motion";
import { STROKE_WIDTH, VIZ_COLOR } from "./shared";

const ROWS = 6;
const POINTS = 17;

/** Builds one "ridge" of the surface: a volatility-smile curve, offset per row to suggest depth. */
function buildRow(row: number): string {
  const amplitude = 10 + row * 1.6;
  const phase = row * 0.35;
  const baseline = 16 + row * 19;
  const xOffset = row * 4;

  const points = Array.from({ length: POINTS }, (_, i) => {
    const t = i / (POINTS - 1);
    const x = 20 + xOffset + t * (150 - xOffset * 0.4);
    const smile = Math.cos((t - 0.5) * Math.PI) * amplitude;
    const drift = Math.sin(t * Math.PI * 1.3 + phase) * 2.4;
    const y = baseline - smile - drift;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  return `M${points.join(" L")}`;
}

const ROW_PATHS = Array.from({ length: ROWS }, (_, r) => buildRow(r));

/**
 * A ridgeline volatility surface — the same visual grammar quant
 * research uses for a vol surface/term-structure plot — built from
 * deterministic smile curves, no chart library.
 */
export function VolatilitySurface({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <svg
      viewBox="0 0 200 140"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      {ROW_PATHS.map((d, row) => {
        const isBack = row === 0;
        const isFront = row === ROW_PATHS.length - 1;
        return (
          <motion.path
            key={row}
            d={d}
            fill="none"
            stroke={isFront ? VIZ_COLOR.primary : VIZ_COLOR.lineStrong}
            strokeWidth={isFront ? STROKE_WIDTH * 1.4 : STROKE_WIDTH}
            strokeOpacity={isBack ? 0.35 : 1 - row * 0.06}
            initial={{ pathLength: reduceMotion ? 1 : 0, opacity: reduceMotion ? 1 : 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: row * 0.12, ease: [0.16, 1, 0.3, 1] }}
          />
        );
      })}
    </svg>
  );
}
