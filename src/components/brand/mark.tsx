interface VyuhasMarkProps {
  className?: string;
}

/**
 * The Vyuhas mark: a wedge-shaped node formation converging on a single
 * apex -- a direct, literal reference to "vyuha" (strategic formation)
 * rendered as graph topology rather than a literal military icon.
 */
export function VyuhasMark({ className }: VyuhasMarkProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      role="img"
      aria-label="Vyuhas"
    >
      <g stroke="currentColor" strokeOpacity="0.55" strokeWidth="1">
        <line x1="16" y1="26" x2="6" y2="16" />
        <line x1="16" y1="26" x2="26" y2="16" />
        <line x1="6" y1="16" x2="10" y2="6" />
        <line x1="26" y1="16" x2="22" y2="6" />
        <line x1="6" y1="16" x2="16" y2="15" />
        <line x1="26" y1="16" x2="16" y2="15" />
        <line x1="16" y1="15" x2="10" y2="6" />
        <line x1="16" y1="15" x2="22" y2="6" />
      </g>
      <circle cx="10" cy="6" r="2" fill="currentColor" fillOpacity="0.7" />
      <circle cx="22" cy="6" r="2" fill="currentColor" fillOpacity="0.7" />
      <circle cx="6" cy="16" r="2" fill="currentColor" fillOpacity="0.85" />
      <circle cx="26" cy="16" r="2" fill="currentColor" fillOpacity="0.85" />
      <circle cx="16" cy="26" r="2.25" fill="currentColor" />
      <circle cx="16" cy="15" r="2.5" className="fill-primary" />
    </svg>
  );
}
