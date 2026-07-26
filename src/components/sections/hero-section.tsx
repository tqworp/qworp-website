"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { LatticeBackground } from "@/components/background/lattice-background";
import { ResearchPipelineDiagram } from "@/components/visualizations/research-pipeline-diagram";

const EASE = [0.16, 1, 0.3, 1] as const;

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-background"
    >
      <LatticeBackground />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs font-medium tracking-wide text-text-secondary backdrop-blur-sm"
        >
          <span aria-hidden="true">🇮🇳</span>
          India&rsquo;s 1st Quant Trading Platform for Retail Traders
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          className="text-balance text-5xl font-semibold tracking-tight text-foreground sm:text-6xl md:text-7xl"
        >
          Trade like a quant desk.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.22, ease: EASE }}
          className="text-balance mt-6 max-w-xl text-lg leading-relaxed text-text-secondary sm:text-xl"
        >
          Factor research, volatility models and systematic execution — the
          discipline of institutional desks, in your hands.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: EASE }}
          className="mt-14 w-full border-y border-divider py-8"
        >
          <ResearchPipelineDiagram size="compact" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Link
            href="#pipeline"
            className="focus-ring group inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-[0_0_0_1px_rgba(59,108,246,0.4),0_8px_30px_-8px_rgba(59,108,246,0.55)] transition-all hover:shadow-[0_0_0_1px_rgba(59,108,246,0.6),0_10px_40px_-6px_rgba(59,108,246,0.65)]"
          >
            See the Pipeline
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="#mechanisms"
            className="focus-ring inline-flex items-center gap-2 rounded-md border border-border bg-surface/40 px-6 py-3 text-sm font-medium text-foreground backdrop-blur-sm transition-colors hover:border-white/20 hover:bg-surface"
          >
            View Mechanisms
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
