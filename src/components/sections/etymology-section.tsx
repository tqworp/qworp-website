"use client";

import { useEffect, useRef } from "react";

// Same deterministic spiral geometry as qworp-vyuha-redesign.html lines
// 997-1008 — pure function of fixed constants, so it's computed once here
// instead of on every mount.
function buildSpiralPath(): string {
  const cx = 250,
    cy = 250,
    turns = 3.4,
    maxR = 232,
    steps = 260;
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const angle = t * turns * Math.PI * 2;
    const r = t * maxR;
    const x = cx + r * Math.cos(angle - Math.PI / 2);
    const y = cy + r * Math.sin(angle - Math.PI / 2);
    d += (i === 0 ? "M" : "L") + x.toFixed(2) + " " + y.toFixed(2) + " ";
  }
  return d;
}

const SPIRAL_D = buildSpiralPath();

// Matches qworp-vyuha-redesign.html lines 340-362. The draw-in animation
// (lines 1009-1021) needs real DOM measurement (`getTotalLength()`), so
// that part stays imperative — a ref + IntersectionObserver in an effect,
// same as the source, rather than forced into declarative state for its
// own sake.
export function EtymologySection() {
  const pathRef = useRef<SVGPathElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    const wrap = wrapRef.current;
    if (!path || !wrap) return;

    const len = path.getTotalLength();
    path.style.strokeDasharray = String(len);
    path.style.strokeDashoffset = String(len);
    path.style.transition = "stroke-dashoffset 2.4s cubic-bezier(.4,0,.2,1)";

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            path.style.strokeDashoffset = "0";
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, []);

  return (
    <section className="meaning" id="vyuha">
      <div className="container meaning-inner">
        <div data-reveal="">
          <span className="eyebrow" style={{ justifyContent: "flex-start" }}>
            Etymology
          </span>
          <h2>
            <span className="sanskrit">व्यूह</span> — an arrangement built to win.
          </h2>
          <p>
            In the Mahabharata, a vyuha was a battle formation: troops arranged with such precision that only
            those who understood its geometry could enter, act and exit without being lost inside it.
          </p>
          <p>
            Markets aren&#39;t so different. They reward the trader who sees the structure others miss, and
            quietly consume the one who wanders in without one.
          </p>
          <p>
            This is the structure Vyuha builds into capital — a systematic formation, in a market built to
            overwhelm the undisciplined.
          </p>
        </div>
        <div className="spiral-wrap" data-reveal="" ref={wrapRef}>
          <svg viewBox="0 0 500 500">
            <circle className="spiral-ring" cx="250" cy="250" r="60" />
            <circle className="spiral-ring" cx="250" cy="250" r="110" />
            <circle className="spiral-ring" cx="250" cy="250" r="160" />
            <circle className="spiral-ring" cx="250" cy="250" r="210" />
            <circle className="spiral-ring" cx="250" cy="250" r="235" strokeDasharray="1 7" />
            <path ref={pathRef} className="spiral-path" d={SPIRAL_D} />
            <text className="spiral-label" x="250" y="490" textAnchor="middle">
              The only way through is the one you can see
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}
