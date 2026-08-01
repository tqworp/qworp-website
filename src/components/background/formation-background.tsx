"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  phase: number;
}

const NODE_COUNT = 46;
const LINK_DISTANCE = 150;
const MAX_SPEED = 0.045;
const DPR_CAP = 1.5;

/**
 * A slow, almost imperceptible network of nodes and connecting edges,
 * evoking strategic formations / graph topology rather than generic
 * "AI particle" effects. Renders behind all page content.
 *
 * Respects `prefers-reduced-motion` (renders one static frame) and
 * pauses entirely while the tab is hidden.
 */
export function FormationBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    let animationFrame = 0;
    let isVisible = true;

    function seedNodes() {
      const area = width * height;
      const count = Math.min(NODE_COUNT, Math.max(18, Math.round(area / 32000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * MAX_SPEED,
        vy: (Math.random() - 0.5) * MAX_SPEED,
        phase: Math.random() * Math.PI * 2,
      }));
    }

    function resize() {
      if (!canvas) return;
      const rect = canvas.parentElement?.getBoundingClientRect();
      width = rect?.width ?? window.innerWidth;
      height = rect?.height ?? window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedNodes();
    }

    function step() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        node.phase += 0.0015;

        if (node.x < -20) node.x = width + 20;
        if (node.x > width + 20) node.x = -20;
        if (node.y < -20) node.y = height + 20;
        if (node.y > height + 20) node.y = -20;
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < LINK_DISTANCE) {
            const alpha = (1 - distance / LINK_DISTANCE) * 0.12;
            ctx.strokeStyle = `rgba(148, 180, 255, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const node of nodes) {
        const twinkle = 0.35 + Math.sin(node.phase) * 0.15;
        ctx.fillStyle = `rgba(255, 255, 255, ${twinkle * 0.55})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function loop() {
      if (isVisible) step();
      animationFrame = window.requestAnimationFrame(loop);
    }

    resize();
    step();

    if (!prefersReducedMotion) {
      animationFrame = window.requestAnimationFrame(loop);
    }

    const handleResize = () => resize();
    const handleVisibility = () => {
      isVisible = document.visibilityState === "visible";
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Light blooms -- soft, blurred atmosphere */}
      <div className="absolute -top-40 left-1/4 h-[32rem] w-[32rem] rounded-full bg-primary/[0.10] blur-[120px]" />
      <div className="absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-violet/[0.10] blur-[120px]" />
      <div className="absolute bottom-0 left-1/3 h-[24rem] w-[24rem] rounded-full bg-primary/[0.06] blur-[100px]" />

      {/* Faint mathematical grid, fading toward the edges */}
      <div
        className="bg-grid absolute inset-0"
        style={{
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 30%, black 0%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 30%, black 0%, transparent 75%)",
        }}
      />

      {/* Network topology -- nodes and edges, drifting almost imperceptibly */}
      <canvas ref={canvasRef} className="absolute inset-0 opacity-70" />

      {/* Base vignette to keep edges calm */}
      <div className="bg-radial-fade absolute inset-0" />
    </div>
  );
}
