"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "./shared";

/** Two-sided depth levels — read as a bid/ask order book, or equally as call/put open interest by strike. */
const LEVELS = [
  { left: 30, right: 55 },
  { left: 55, right: 40 },
  { left: 80, right: 62 },
  { left: 100, right: 90 },
  { left: 65, right: 78 },
  { left: 42, right: 50 },
  { left: 25, right: 33 },
] as const;

/** Order-book depth ladder — shared by Market Microstructure and Open Interest Analysis. */
export function MarketMicrostructure({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={className} aria-hidden="true">
      <div className="flex flex-col gap-1.5">
        {LEVELS.map((level, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div className="flex h-2 flex-1 justify-end overflow-hidden rounded-l-sm bg-white/[0.04]">
              <motion.div
                className="h-full rounded-l-sm"
                style={{ backgroundColor: "var(--success)" }}
                initial={{ width: reduceMotion ? `${level.left}%` : "0%" }}
                whileInView={{ width: `${level.left}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: EASE }}
              />
            </div>
            <div className="h-3 w-px shrink-0 bg-divider" />
            <div className="flex h-2 flex-1 justify-start overflow-hidden rounded-r-sm bg-white/[0.04]">
              <motion.div
                className="h-full rounded-r-sm"
                style={{ backgroundColor: "var(--text-muted)", opacity: 0.7 }}
                initial={{ width: reduceMotion ? `${level.right}%` : "0%" }}
                whileInView={{ width: `${level.right}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: EASE }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
