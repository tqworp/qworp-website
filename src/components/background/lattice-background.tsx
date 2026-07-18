"use client";

import { useEffect, useRef } from "react";

const NODE_COUNT = 46;
const LINK_DISTANCE = 150;
const MAX_SPEED = 0.028;
const MAX_DPR = 1.5;

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

/**
 * A living mathematical canvas: a slow-drifting correlation network layered
 * with a signal-propagation curve. Motion stays near-imperceptible — it
 * should read as stillness for the first few seconds, then reveal itself.
 */
export function LatticeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let animationFrame = 0;
    let phase = 0;
    let visible = true;

    function seedNodes() {
      nodes = Array.from({ length: NODE_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * MAX_SPEED,
        vy: (Math.random() - 0.5) * MAX_SPEED,
      }));
    }

    function resize() {
      if (!canvas) return;
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedNodes();
    }

    function drawSignal() {
      if (!ctx) return;
      ctx.beginPath();
      const amplitude = height * 0.035;
      const baseline = height * 0.32;
      for (let x = 0; x <= width; x += 8) {
        const y =
          baseline +
          Math.sin(x * 0.006 + phase) * amplitude +
          Math.sin(x * 0.017 + phase * 1.7) * amplitude * 0.35;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "rgba(99, 102, 241, 0.16)";
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    function step() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      drawSignal();

      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DISTANCE) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(180, 188, 204, ${0.09 * (1 - dist / LINK_DISTANCE)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      for (const node of nodes) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 1.3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(180, 188, 204, 0.4)";
        ctx.fill();
      }

      phase += 0.0016;
    }

    function loop() {
      if (visible) step();
      animationFrame = requestAnimationFrame(loop);
    }

    resize();
    window.addEventListener("resize", resize);

    const handleVisibility = () => {
      visible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", handleVisibility);

    if (reduceMotion) {
      step();
    } else {
      loop();
    }

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="bg-radial-fade absolute inset-0" />
      <div className="bg-mandala absolute inset-0 opacity-60" />
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_20%,black,transparent)]" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
