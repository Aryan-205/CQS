/**
 * Wordmark placeholder — COMP·Q·SOFT with the Q in brand red, the rest in
 * brand blue, per the brand deck. Both colours clear contrast on white and
 * on black, so one mark serves every surface.
 *
 * REPLACE with the supplied logo SVG when it lands. Keep the same props so
 * nothing else has to change.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 28"
      className={className}
      role="img"
      aria-label="CompQsoft"
    >
      <text
        x="0"
        y="21"
        fontFamily="var(--font-brand-sans), sans-serif"
        fontSize="24"
        fontWeight="500"
        letterSpacing="0.02em"
      >
        <tspan fill="#01A7E5">COMP</tspan>
        <tspan fill="#EE4743">Q</tspan>
        <tspan fill="#01A7E5">SOFT</tspan>
      </text>
    </svg>
  );
}
