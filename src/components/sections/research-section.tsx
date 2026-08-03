import { ICONS } from "@/lib/icons";
import { RESEARCH } from "@/lib/section-content";

// Matches qworp-vyuha-redesign.html lines 446-455 + the RESEARCH-driven
// grid render (lines 1176-1183) — rendered directly from data here
// instead of DOM-appended at runtime.
export function ResearchSection() {
  return (
    <section id="research">
      <div className="container">
        <div className="section-head" data-reveal="">
          <span className="eyebrow">Core Research Areas</span>
          <h2>Where QWORP&#39;s research is focused.</h2>
        </div>
        <div className="research-grid" data-reveal-stagger="">
          {RESEARCH.map((r) => (
            <div className="research-card" key={r.title}>
              <div className="ri" dangerouslySetInnerHTML={{ __html: ICONS[r.icon] }} />
              <h3>{r.title}</h3>
              <p>{r.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
