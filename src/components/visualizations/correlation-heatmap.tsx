"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "./shared";

/** A fixed, symmetric, illustrative correlation matrix — never real portfolio data. */
const MATRIX: readonly (readonly number[])[] = [
  [1.0, 0.62, 0.18, -0.24, 0.05, 0.41],
  [0.62, 1.0, 0.3, -0.1, 0.22, 0.35],
  [0.18, 0.3, 1.0, 0.44, -0.15, 0.12],
  [-0.24, -0.1, 0.44, 1.0, 0.08, -0.3],
  [0.05, 0.22, -0.15, 0.08, 1.0, 0.55],
  [0.41, 0.35, 0.12, -0.3, 0.55, 1.0],
];

/** Correlation / covariance structure — reused for both Risk Models and Portfolio Optimisation. */
export function CorrelationHeatmap({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={className}
      aria-hidden="true"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${MATRIX.length}, 1fr)`,
        gap: 3,
      }}
    >
      {MATRIX.map((row, r) =>
        row.map((value, c) => {
          const isPositive = value >= 0;
          const magnitude = Math.abs(value);
          return (
            <motion.div
              key={`${r}-${c}`}
              className="aspect-square rounded-[3px]"
              style={{
                backgroundColor: isPositive ? "var(--primary)" : "var(--destructive)",
              }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.12 + magnitude * 0.75 }}
              viewport={{ once: true }}
              transition={
                reduceMotion
                  ? { duration: 0.01 }
                  : { duration: 0.5, delay: (r + c) * 0.025, ease: EASE }
              }
            />
          );
        }),
      )}
    </div>
  );
}
