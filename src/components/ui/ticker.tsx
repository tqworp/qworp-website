// Source (lines 1026-1031) builds this by DOM-appending `items` twice into
// a `#tickerTrack` div at runtime. Static content, so it renders directly
// as JSX here instead — same doubled-list-for-a-seamless-marquee trick,
// no client-side JS needed for something that never changes after mount.
const ITEMS = [
  "NSE · BSE",
  "8 RESEARCH DOMAINS",
  "16 QUANT MECHANISMS",
  "WALK-FORWARD VALIDATED",
  "ZERO DISCRETION",
  "SYSTEMATIC EXECUTION",
];

export function Ticker() {
  return (
    <div className="ticker-wrap">
      <div className="ticker-track">
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span key={i}>{item}</span>
        ))}
      </div>
    </div>
  );
}
