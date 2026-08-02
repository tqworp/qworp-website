// Matches qworp-vyuha-redesign.html lines 422-432 exactly. The caption
// below is required to stay — brief §2.2: "A sample look at the interface
// — illustrative UI, not live account data." — never remove it.
export function TerminalSection() {
  return (
    <section id="terminal">
      <div className="container">
        <div className="section-head" data-reveal="">
          <span className="eyebrow">The Terminal</span>
          <h2>From signal to execution, in one motion.</h2>
          <p>A sample look at the interface — illustrative UI, not live account data.</p>
        </div>
        <vyuha-market-signal />
      </div>
    </section>
  );
}
