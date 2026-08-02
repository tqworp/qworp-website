// Matches qworp-vyuha-redesign.html lines 468-480 exactly. Attribution is
// "— Vyuha, Vision" — a company-level statement, per brief §2.1. Don't
// change to a person's name or to QWORP.
export function VisionSection() {
  return (
    <section className="vision">
      <div className="vision-bg" aria-hidden="true">
        <div className="pulse-track">
          <svg className="pulse-svg" viewBox="0 0 800 130" preserveAspectRatio="none">
            <path d="M0,65 L100,65 L118,25 L136,105 L154,65 L400,65 L418,25 L436,105 L454,65 L800,65" />
          </svg>
          <svg className="pulse-svg" viewBox="0 0 800 130" preserveAspectRatio="none">
            <path d="M0,65 L100,65 L118,25 L136,105 L154,65 L400,65 L418,25 L436,105 L454,65 L800,65" />
          </svg>
        </div>
      </div>
      <div className="container">
        <blockquote data-reveal="">
          {'"'}Every Indian trader deserves the <span className="accent">statistical rigor</span> institutions
          have used for decades.{'"'}
        </blockquote>
        <cite data-reveal="">— Vyuha, Vision</cite>
      </div>
    </section>
  );
}
