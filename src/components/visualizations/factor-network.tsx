"use client";

import { motion, useReducedMotion } from "framer-motion";
import { STROKE_WIDTH, VIZ_COLOR } from "./shared";

interface Node {
  x: number;
  y: number;
  strong?: boolean;
}

type Edge = readonly [number, number, number];

const DEFAULT_NODES: readonly Node[] = [
  { x: 100, y: 18, strong: true },
  { x: 38, y: 52 },
  { x: 162, y: 48 },
  { x: 68, y: 98 },
  { x: 132, y: 102 },
  { x: 18, y: 118 },
  { x: 182, y: 114 },
  { x: 100, y: 132, strong: true },
];

const DEFAULT_EDGES: readonly Edge[] = [
  [0, 1, 0.5],
  [0, 2, 0.6],
  [1, 3, 0.4],
  [2, 4, 0.5],
  [3, 5, 0.3],
  [4, 6, 0.3],
  [3, 7, 0.6],
  [4, 7, 0.6],
  [1, 2, 0.22],
  [0, 7, 0.35],
];

const ML_NODES: readonly Node[] = [
  { x: 26, y: 32 },
  { x: 26, y: 72 },
  { x: 26, y: 112 },
  { x: 100, y: 16 },
  { x: 100, y: 52 },
  { x: 100, y: 88 },
  { x: 100, y: 124 },
  { x: 174, y: 46, strong: true },
  { x: 174, y: 98, strong: true },
];

const ML_EDGES: readonly Edge[] = [
  ...[0, 1, 2].flatMap((i) => [3, 4, 5, 6].map((j) => [i, j, 0.22] as Edge)),
  ...[3, 4, 5, 6].flatMap((i) => [7, 8].map((j) => [i, j, 0.3] as Edge)),
];

/**
 * A curated (deterministic — no `Math.random`, so server and client
 * markup always match) node/edge graph representing a statistical
 * factor network. The `ml` variant reshapes the same primitive into a
 * layered input/hidden/output graph for the Machine Learning mechanism.
 */
export function FactorNetwork({
  variant = "default",
  className,
}: {
  variant?: "default" | "ml";
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const nodes = variant === "ml" ? ML_NODES : DEFAULT_NODES;
  const edges = variant === "ml" ? ML_EDGES : DEFAULT_EDGES;

  return (
    <svg
      viewBox="0 0 200 140"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      {edges.map(([from, to, weight], i) => {
        const a = nodes[from];
        const b = nodes[to];
        return (
          <motion.line
            key={i}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke={VIZ_COLOR.lineStrong}
            strokeWidth={STROKE_WIDTH}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: weight }}
            viewport={{ once: true }}
            transition={
              reduceMotion
                ? { duration: 0.01 }
                : { duration: 0.8, delay: i * 0.04 }
            }
          />
        );
      })}

      {nodes.map((node, i) => (
        <motion.circle
          key={i}
          cx={node.x}
          cy={node.y}
          r={node.strong ? 4.5 : 3}
          fill={node.strong ? VIZ_COLOR.primary : "var(--surface)"}
          stroke={node.strong ? VIZ_COLOR.primary : VIZ_COLOR.lineStrong}
          strokeWidth={STROKE_WIDTH}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={
            reduceMotion
              ? { duration: 0.01 }
              : { duration: 0.5, delay: 0.2 + i * 0.05 }
          }
        />
      ))}
    </svg>
  );
}
