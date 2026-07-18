/**
 * Abstract yantra-derived mark: a rotated square (formation) inscribed in a
 * circle (cycle/markets) with eight radiating axes (directional research),
 * reduced to minimal geometry — no ornament, no color beyond the accent node.
 */
export function QworpMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="14.5" stroke="currentColor" strokeOpacity="0.35" />
      <rect
        x="16"
        y="4.5"
        width="16.26"
        height="16.26"
        stroke="currentColor"
        strokeOpacity="0.55"
        transform="rotate(45 16 16)"
      />
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * Math.PI) / 4;
        const x1 = 16 + Math.cos(angle) * 9;
        const y1 = 16 + Math.sin(angle) * 9;
        const x2 = 16 + Math.cos(angle) * 14.5;
        const y2 = 16 + Math.sin(angle) * 14.5;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeOpacity="0.3"
          />
        );
      })}
      <circle cx="16" cy="16" r="2.25" className="fill-primary" />
    </svg>
  );
}
