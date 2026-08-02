"use client";

import { useEffect, useRef, useState } from "react";
import { ICONS } from "@/lib/icons";
import { STAGES } from "@/lib/section-content";

// Same fixed node y-positions as qworp-vyuha-redesign.html line 1122.
const STAGE_YS = [14, 122, 230, 338, 446];

// Matches lines 397-420 (markup) + 1108-1160 (stepper/scroll-sync logic).
// `active` is real React state driving the readout, stepper fill/nodes,
// and stage-card highlight all from one source of truth — the source's
// version keeps these in sync manually across four separate DOM writes
// inside activate().
export function PipelineSection() {
  const [active, setActive] = useState(0);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = cardRefs.current.indexOf(entry.target as HTMLDivElement);
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { threshold: 0.55, rootMargin: "-15% 0px -15% 0px" },
    );
    cardRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="pipeline">
      <div className="container">
        <div className="section-head" data-reveal="">
          <span className="eyebrow">Research Pipeline</span>
          <h2>From raw data to a placed order.</h2>
          <p>
            One direction. No shortcuts, no discretion. This is the process behind QWORP — Vyuha&#39;s
            quantitative trading engine.
          </p>
        </div>
        <div className="pipeline-grid">
          <div className="pipeline-wheel-wrap">
            <div className="stage-readout">
              <span className="stage-readout-num">{String(active + 1).padStart(2, "0")} / 05</span>
              <span className="stage-readout-label">{STAGES[active].title}</span>
            </div>
            <svg className="stepper-svg" viewBox="0 0 60 460" preserveAspectRatio="xMinYMin meet">
              <line className="stepper-bg" x1="20" y1="14" x2="20" y2="446" />
              <line className="stepper-fill" x1="20" y1="14" x2="20" y2={STAGE_YS[active]} />
              <g>
                {STAGE_YS.map((y, i) => (
                  <g className={`stepper-node${i <= active ? " active" : ""}`} key={i}>
                    <circle cx={20} cy={y} r={6} />
                    <text x={34} y={y + 4}>
                      {String(i + 1).padStart(2, "0")}
                    </text>
                  </g>
                ))}
              </g>
            </svg>
          </div>
          <div className="stage-list">
            {STAGES.map((s, i) => (
              <div
                className={`stage-card${i === active ? " stage-active" : ""}`}
                key={s.title}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
              >
                <span className="stage-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="stage-icon" dangerouslySetInnerHTML={{ __html: ICONS[s.icon] }} />
                <span className="stage-body">
                  <h3>{s.title}</h3>
                  <p>{s.copy}</p>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
