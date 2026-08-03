// Matches qworp-vyuha-redesign.html lines 434-444 exactly.
export function EngineSection() {
  return (
    <section id="engine">
      <div className="container">
        <div className="section-head" data-reveal="">
          <span className="eyebrow">Inside The Engine</span>
          <h2>Six systems. One formation.</h2>
          <p>Every trade routes through the same disciplined core.</p>
        </div>
        <qworp-engine />
      </div>
    </section>
  );
}
