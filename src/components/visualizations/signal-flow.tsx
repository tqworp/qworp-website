"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SignalFlowStage {
  icon: LucideIcon;
  label: string;
  caption?: string;
}

function FlowArrow({ mini = false }: { mini?: boolean }) {
  const reduceMotion = useReducedMotion();
  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center",
        mini ? "h-6 w-3" : "h-10 w-8 sm:w-12",
      )}
      aria-hidden="true"
    >
      <div className="h-px w-full bg-divider" />
      {!reduceMotion && (
        <motion.span
          className="absolute rounded-full bg-primary"
          style={{
            boxShadow: "0 0 6px 1px rgba(59,108,246,0.6)",
            height: mini ? 4 : 6,
            width: mini ? 4 : 6,
          }}
          animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
          transition={{ duration: mini ? 1.1 : 1.6, repeat: Infinity, ease: "linear" }}
        />
      )}
    </div>
  );
}

/**
 * The base reusable primitive behind every "chain of stages" diagram in
 * the app (`ResearchPipelineDiagram`, `ExecutionFlow`): icon nodes
 * connected by arrows carrying a small animated traveling pulse.
 * Wraps to a vertical column automatically on narrow screens — no
 * absolute-positioned connecting line to keep responsive, since the
 * arrow segments simply reflow with the nodes.
 *
 * `size="mini"` drops labels/captions entirely (icons only, no fixed
 * column width) so the same stage chain also fits inside a narrow
 * grid-card slot — `default`/`compact` are sized for full-width section
 * placement and will overflow a card.
 */
export function SignalFlow({
  stages,
  size = "default",
  showCaptions = false,
  className,
}: {
  stages: readonly SignalFlowStage[];
  size?: "compact" | "default" | "mini";
  showCaptions?: boolean;
  className?: string;
}) {
  if (size === "mini") {
    return (
      <ol className={cn("flex items-center justify-center", className)}>
        {stages.map((stage, i) => (
          <li key={stage.label} className="flex items-center">
            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-surface text-primary">
              <stage.icon className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden="true" />
            </div>
            {i < stages.length - 1 && <FlowArrow mini />}
          </li>
        ))}
      </ol>
    );
  }

  const nodeSize = size === "compact" ? "h-10 w-10" : "h-14 w-14";
  const iconSize = size === "compact" ? "h-4 w-4" : "h-6 w-6";

  return (
    <ol
      className={cn(
        "flex flex-wrap items-start justify-center gap-y-8",
        className,
      )}
    >
      {stages.map((stage, i) => (
        <li key={stage.label} className="flex items-start">
          <div className="flex w-20 flex-col items-center gap-2.5 sm:w-24">
            <div
              className={cn(
                "flex items-center justify-center rounded-full border border-border bg-surface text-primary transition-colors duration-300",
                nodeSize,
              )}
            >
              <stage.icon className={iconSize} strokeWidth={1.6} aria-hidden="true" />
            </div>
            <span className="text-center text-xs font-medium text-text-secondary">
              {stage.label}
            </span>
            {showCaptions && stage.caption ? (
              <span className="text-center text-[11px] leading-snug text-text-muted">
                {stage.caption}
              </span>
            ) : null}
          </div>
          {i < stages.length - 1 && <FlowArrow />}
        </li>
      ))}
    </ol>
  );
}
