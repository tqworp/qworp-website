import { ICONS } from "@/lib/icons";
import { MECH_GROUPS } from "@/lib/section-content";

// Matches qworp-vyuha-redesign.html lines 457-466 + the MECH_GROUPS-driven
// render (lines 1217-1229) — rendered directly from data here instead of
// DOM-appended at runtime.
export function MechanismsSection() {
  return (
    <section id="mechanisms">
      <div className="container">
        <div className="section-head" data-reveal="">
          <span className="eyebrow">Primary Quantitative Mechanisms</span>
          <h2>Shown, not described.</h2>
        </div>
        <div className="mech-groups">
          {MECH_GROUPS.map((g) => (
            <div data-reveal="" key={g.roman}>
              <div className="mech-group-head">
                <span className="roman">{g.roman}</span>
                <h3>{g.name}</h3>
              </div>
              <div className="mech-row">
                {g.items.map((it) => (
                  <div className="mech-item" key={it.title}>
                    <span className="mi" dangerouslySetInnerHTML={{ __html: ICONS[it.icon] }} />
                    <span>
                      <h4>{it.title}</h4>
                      <p>{it.copy}</p>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
