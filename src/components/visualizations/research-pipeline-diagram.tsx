"use client";

import { Activity, Braces, Cpu, Database, Zap } from "lucide-react";
import { SignalFlow, type SignalFlowStage } from "./signal-flow";

const STAGES: SignalFlowStage[] = [
  { icon: Database, label: "Data", caption: "NSE & BSE, timestamped at source." },
  { icon: Braces, label: "Features", caption: "Raw series into structured signal." },
  { icon: Cpu, label: "Models", caption: "Walk-forward validated, never fit on the future." },
  { icon: Activity, label: "Signals", caption: "Statistically significant, risk-bounded." },
  { icon: Zap, label: "Execution", caption: "Orders routed systematically." },
];

/** The Hero/Research Pipeline centerpiece: Data → Features → Models → Signals → Execution. */
export function ResearchPipelineDiagram({
  size = "default",
  showCaptions = false,
  className,
}: {
  size?: "compact" | "default";
  showCaptions?: boolean;
  className?: string;
}) {
  return <SignalFlow stages={STAGES} size={size} showCaptions={showCaptions} className={className} />;
}
