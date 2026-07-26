"use client";

import { CircleCheck, Radio, Route, Send } from "lucide-react";
import { SignalFlow, type SignalFlowStage } from "./signal-flow";

const STAGES: SignalFlowStage[] = [
  { icon: Radio, label: "Signal", caption: "A validated signal crosses its threshold." },
  { icon: Route, label: "Routed", caption: "Sequenced to minimise market impact." },
  { icon: Send, label: "Order", caption: "Sent to the exchange systematically." },
  { icon: CircleCheck, label: "Filled", caption: "Execution monitored in real time." },
];

/** Signal-to-fill flow used for the Execution Algorithms mechanism. */
export function ExecutionFlow({
  size = "default",
  showCaptions = false,
  className,
}: {
  size?: "compact" | "default" | "mini";
  showCaptions?: boolean;
  className?: string;
}) {
  return <SignalFlow stages={STAGES} size={size} showCaptions={showCaptions} className={className} />;
}
