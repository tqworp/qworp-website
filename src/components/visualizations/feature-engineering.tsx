"use client";

import { motion, useReducedMotion } from "framer-motion";
import { STROKE_WIDTH, VIZ_COLOR } from "./shared";

const NOISY_X = [10, 18, 26, 34, 42, 50, 58, 66, 74, 82];
const NOISY_Y = [55, 35, 62, 28, 60, 24, 56, 30, 64, 40];
const NOISY_PATH = `M${NOISY_X.map((x, i) => `${x},${NOISY_Y[i]}`).join(" L")}`;

const CLEAN_X = [118, 130, 142, 154, 166, 178, 190];
const CLEAN_Y = [46, 42, 40, 44, 52, 48, 42];
const CLEAN_PATH = `M${CLEAN_X.map((x, i) => `${x},${CLEAN_Y[i]}`).join(" L")}`;

/** Raw, noisy series (left) transformed into a structured feature (right) — the Feature Engineering mechanism. */
export function FeatureEngineering({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <svg
      viewBox="0 0 200 100"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <motion.path
        d={NOISY_PATH}
        fill="none"
        stroke={VIZ_COLOR.muted}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: reduceMotion ? 1 : 0, opacity: reduceMotion ? 0.8 : 0 }}
        whileInView={{ pathLength: 1, opacity: 0.8 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      />

      <motion.path
        d="M92,50 L108,50 M104,45 L108,50 L104,55"
        fill="none"
        stroke={VIZ_COLOR.lineStrong}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.7 }}
      />

      <motion.path
        d={CLEAN_PATH}
        fill="none"
        stroke={VIZ_COLOR.primary}
        strokeWidth={STROKE_WIDTH * 1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: reduceMotion ? 1 : 0, opacity: reduceMotion ? 1 : 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  );
}
