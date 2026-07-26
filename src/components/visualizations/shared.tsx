/**
 * Shared constants for the QWORP visualization design system
 * (`src/components/visualizations/`). Every diagram in this folder is a
 * self-contained, presentational SVG + Framer Motion component — no
 * external data, no chart library — built once here and reused across
 * the Hero, Research Pipeline, Core Research Areas and Primary
 * Quantitative Mechanisms sections instead of one-off artwork per
 * section.
 *
 * Shared visual grammar so every diagram reads as one system:
 * thin strokes, the existing dark palette's CSS custom properties
 * (never new ad-hoc colors), and one easing curve for every motion.
 */

/** The one easing curve used across every reveal/hero/visualization motion in the app. */
export const EASE = [0.16, 1, 0.3, 1] as const;

/** Line weight used across every diagram's structural strokes. */
export const STROKE_WIDTH = 1.25;

/** Resolves the app's CSS custom properties so SVG `stroke`/`fill` never hardcode a hex value. */
export const VIZ_COLOR = {
  primary: "var(--primary)",
  indigo: "var(--indigo)",
  success: "var(--success)",
  line: "var(--divider)",
  lineStrong: "var(--border)",
  text: "var(--text-secondary)",
  muted: "var(--text-muted)",
} as const;

/** Standard size presets so every diagram can be dropped in at hero scale or mechanism-card scale with one prop. */
export type VizSize = "compact" | "default" | "full";
