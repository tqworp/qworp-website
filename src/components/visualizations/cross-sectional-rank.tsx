"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "./shared";

const RANKS = [92, 78, 65, 54, 44, 33, 20] as const;

/** Instruments ranked against peers — the Cross-Sectional Ranking mechanism. */
export function CrossSectionalRank({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={className} aria-hidden="true">
      <div className="flex flex-col gap-1.5">
        {RANKS.map((value, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-4 shrink-0 font-mono text-[10px] text-text-muted">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/[0.05]">
              <motion.div
                className="h-full rounded-full"
                style={{
                  backgroundColor: i < 2 ? "var(--primary)" : "var(--text-muted)",
                  opacity: i < 2 ? 1 : 0.45,
                }}
                initial={{ width: reduceMotion ? `${value}%` : "0%" }}
                whileInView={{ width: `${value}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.06, ease: EASE }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
