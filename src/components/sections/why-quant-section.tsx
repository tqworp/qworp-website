"use client";

import { useEffect, useRef, useState } from "react";

// Same fixed point data as qworp-vyuha-redesign.html lines 1049-1050.
const CHAOS_PTS: ReadonlyArray<readonly [number, number]> = [
  [0, 150], [60, 90], [120, 180], [180, 60], [240, 140], [300, 40], [360, 160], [420, 80],
  [480, 190], [540, 50], [600, 170], [660, 100], [720, 200], [800, 70],
];
const SYS_PTS: ReadonlyArray<readonly [number, number]> = [
  [0, 190], [114, 165], [228, 170], [342, 130], [456, 140], [570, 95], [684, 105], [800, 60],
];

function pointsToPath(pts: ReadonlyArray<readonly [number, number]>): string {
  return pts.map((p, i) => (i === 0 ? "M" : "L") + p[0] + " " + p[1]).join(" ");
}

const CHAOS_D = pointsToPath(CHAOS_PTS);
const SYS_D = pointsToPath(SYS_PTS);

// Candle geometry from lines 1056-1063: every other CHAOS_PTS point (by
// original index), then height/up-down alternation keyed off the
// *filtered* array's own index — not the original one. Precomputed once
// here instead of DOM-appended at runtime.
const CHAOS_CANDLES = CHAOS_PTS.filter((_, i) => i % 2 === 0).map((p, i) => {
  const h = 14 + (i % 3) * 8;
  return { x: p[0] - 3, y: p[1] - h / 2, height: h, up: i % 2 === 0 };
});

// Matches drawPath() (lines 1039-1047) exactly — needs real DOM
// measurement (getTotalLength()), so this stays imperative.
function drawPath(el: SVGPathElement | null, dur: number) {
  if (!el) return;
  const len = el.getTotalLength();
  el.style.transition = "none";
  el.style.strokeDasharray = String(len);
  el.style.strokeDashoffset = String(len);
  el.getBoundingClientRect();
  el.style.transition = `stroke-dashoffset ${dur}s cubic-bezier(.4,0,.2,1)`;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      el.style.strokeDashoffset = "0";
    });
  });
}

const CAPTIONS = {
  discretionary: (
    <>
      <strong>Scattered entries.</strong> Emotional exits. A different rulebook every session.
    </>
  ),
  systematic: (
    <>
      <strong>One process</strong>, tested on data it never saw, repeated without exception.
    </>
  ),
} as const;

type CompareState = keyof typeof CAPTIONS;

// Matches qworp-vyuha-redesign.html lines 364-395 + the toggle/draw logic
// (lines 1036-1096). Toggle state and the caption swap are real React
// state (a clean fit); the line-draw animation stays a direct ref call,
// same as the source's drawPath(), since it needs the rendered path's
// actual length.
export function WhyQuantSection() {
  const [state, setState] = useState<CompareState>("systematic");
  const chaosLineRef = useRef<SVGPathElement>(null);
  const sysLineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    drawPath(chaosLineRef.current, 1.1);
    drawPath(sysLineRef.current, 1.3);
  }, []);

  function select(next: CompareState) {
    setState(next);
    if (next === "systematic") drawPath(sysLineRef.current, 1.1);
    else drawPath(chaosLineRef.current, 0.9);
  }

  return (
    <section id="why">
      <div className="container">
        <div className="section-head" data-reveal="">
          <span className="eyebrow">Why Quantitative</span>
          <h2>Conviction fades. Evidence compounds.</h2>
        </div>
        <div className="compare-block" data-reveal="">
          <div className="toggle-row">
            <button
              className={`toggle-btn${state === "discretionary" ? " active" : ""}`}
              data-state-btn="discretionary"
              onClick={() => select("discretionary")}
            >
              Discretionary
            </button>
            <button
              className={`toggle-btn${state === "systematic" ? " active" : ""}`}
              data-state-btn="systematic"
              onClick={() => select("systematic")}
            >
              Systematic
            </button>
          </div>
          <div className="compare-visual" data-state={state}>
            <div className="compare-panel panel-discretionary">
              <svg viewBox="0 0 800 260" preserveAspectRatio="none">
                <g className="chart-grid-sm">
                  <line x1="0" y1="65" x2="800" y2="65" />
                  <line x1="0" y1="130" x2="800" y2="130" />
                  <line x1="0" y1="195" x2="800" y2="195" />
                </g>
                <path ref={chaosLineRef} className="chaos-line" d={CHAOS_D} />
                <g>
                  {CHAOS_CANDLES.map((c, i) => (
                    <rect
                      key={i}
                      x={c.x}
                      y={c.y}
                      width={6}
                      height={c.height}
                      className={c.up ? "candle-up" : "candle-down"}
                    />
                  ))}
                </g>
              </svg>
            </div>
            <div className="compare-panel panel-systematic">
              <svg viewBox="0 0 800 260" preserveAspectRatio="none">
                <g className="chart-grid-sm">
                  <line x1="0" y1="65" x2="800" y2="65" />
                  <line x1="0" y1="130" x2="800" y2="130" />
                  <line x1="0" y1="195" x2="800" y2="195" />
                </g>
                <path ref={sysLineRef} className="systematic-line" d={SYS_D} />
                <g>
                  {SYS_PTS.map((p, i) => (
                    <circle key={i} className="sys-node" cx={p[0]} cy={p[1]} r={4.2} />
                  ))}
                </g>
              </svg>
            </div>
          </div>
          <p className="compare-caption">{CAPTIONS[state]}</p>
        </div>
      </div>
    </section>
  );
}
