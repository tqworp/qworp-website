import { useId } from "react";

/**
 * The four-ellipse "battle formation" mark — same geometry everywhere it
 * appears (nav, footer, favicon, OG image): qworp-vyuha-redesign.html's
 * <svg class="brand-mark">. Gradient id is generated per-instance via
 * useId() so multiple marks on one page (header + footer) never collide,
 * unlike the source file's manual `mark-g-nav`/`mark-g-foot` suffixes.
 */
export function BrandMark({
  size = 30,
  className,
}: {
  size?: number;
  className?: string;
}) {
  const gradientId = useId();
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="4" y1="4" x2="44" y2="44">
          <stop stopColor="#e0cfff" />
          <stop offset="0.5" stopColor="#9d67ff" />
          <stop offset="1" stopColor="#f2a4bc" />
        </linearGradient>
      </defs>
      <g fill="none" stroke={`url(#${gradientId})`} strokeWidth="1.7" opacity="0.95">
        <ellipse cx="24" cy="24" rx="17" ry="12" transform="rotate(18 24 24)" />
        <ellipse cx="24" cy="24" rx="17" ry="12" transform="rotate(62 24 24)" />
        <ellipse cx="24" cy="24" rx="17" ry="12" transform="rotate(106 24 24)" />
        <ellipse cx="24" cy="24" rx="17" ry="12" transform="rotate(150 24 24)" />
      </g>
    </svg>
  );
}
