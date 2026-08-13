/**
 * The whole icon set. Line glyphs at 1.5px, drawn on a 16-unit grid so they
 * sit optically level with 17px body text at h-3.5.
 *
 * No icon font, no illustration — the brand is serious, not playful.
 */

import type { ReactNode } from "react";

type IconProps = { className?: string };

export function Arrow({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M2 8h11M9 4l4 4-4 4" />
    </svg>
  );
}

export function ChevronDown({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="m4 6 4 4 4-4" />
    </svg>
  );
}

export function Search({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className={className}
      aria-hidden
    >
      <circle cx="9" cy="9" r="6" />
      <path d="m13.5 13.5 4 4" />
    </svg>
  );
}

export function Menu({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className={className}
      aria-hidden
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

/* -------------------------------------------------------------------------
   Process glyphs. Drawn on a 24-unit grid at 1.25px rather than the 16/1.5
   set above, because these render large — 56px in a ProcessSteps marker — and
   a 1.5px stroke scaled that far reads as a heavy blob. They carry no fill and
   no container: colour comes from currentColor on white.
------------------------------------------------------------------------- */
function Glyph({ className = "h-14 w-14", children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {children}
    </svg>
  );
}

/** Assessment — bars under a magnifier. Measuring what is already there. */
export function Assess({ className }: IconProps) {
  return (
    <Glyph className={className}>
      <path d="M3 21h9.5" />
      <path d="M4.5 21v-4.5M8 21v-8M11.5 21v-3" />
      <circle cx="16.5" cy="8.5" r="4.5" />
      <path d="m19.9 11.6 2.6 2.6" />
    </Glyph>
  );
}

/** Design — a spec sheet being drawn on. The customized solution. */
export function Blueprint({ className }: IconProps) {
  return (
    <Glyph className={className}>
      <path d="M13.5 3H5.5A1.5 1.5 0 0 0 4 4.5v15A1.5 1.5 0 0 0 5.5 21h6" />
      <path d="M13.5 3 19 8.5v2.5" />
      <path d="M8 8.5h3.5M8 12.5h5M8 16.5h2.5" />
      <path d="m20.4 13.6-6 6-2.9.8.8-2.9 6-6a1.5 1.5 0 0 1 2.1 2.1Z" />
    </Glyph>
  );
}

/** Implementation — stacked layers. Delivery that scales tier by tier. */
export function Layers({ className }: IconProps) {
  return (
    <Glyph className={className}>
      <path d="m12 3 8.5 4.5L12 12 3.5 7.5 12 3Z" />
      <path d="m3.5 12 8.5 4.5 8.5-4.5" />
      <path d="m3.5 16.5 8.5 4.5 8.5-4.5" />
    </Glyph>
  );
}

/** Sustainment — the loop that does not stop at go-live. */
export function Lifecycle({ className }: IconProps) {
  return (
    <Glyph className={className}>
      <path d="M3.5 12a8.5 8.5 0 0 1 14.6-5.9" />
      <path d="M14.4 6.1h3.7V2.4" />
      <path d="M20.5 12a8.5 8.5 0 0 1-14.6 5.9" />
      <path d="M9.6 17.9H5.9v3.7" />
    </Glyph>
  );
}

/* -------------------------------------------------------------------------
   Social marks. Solid glyphs rather than the 1.5px line set: at 18px a hairline
   outline of a wordmark logo turns to mush, and these read as marks, not icons.
------------------------------------------------------------------------- */
export function LinkedIn({ className = "h-[18px] w-[18px]" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6.5 0h3.8v1.71h.05c.53-.95 1.83-1.96 3.76-1.96 4.02 0 4.76 2.5 4.76 5.76V21h-4v-5.66c0-1.35-.03-3.08-1.96-3.08-1.96 0-2.26 1.46-2.26 2.98V21h-4V9Z" />
    </svg>
  );
}

export function Facebook({ className = "h-[18px] w-[18px]" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.45 2.91h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
    </svg>
  );
}

export function X({ className = "h-[18px] w-[18px]" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.53 3h3.14l-6.86 7.84L22 21h-6.33l-4.95-6.47L4.95 21H1.8l7.34-8.39L2 3h6.49l4.48 5.92L17.53 3Zm-1.1 16.13h1.74L7.65 4.78H5.78l10.65 14.35Z" />
    </svg>
  );
}

export function YouTube({ className = "h-[18px] w-[18px]" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M23 12s0-3.4-.43-5.03a2.6 2.6 0 0 0-1.84-1.85C19.1 4.7 12 4.7 12 4.7s-7.1 0-8.73.42a2.6 2.6 0 0 0-1.84 1.85C1 8.6 1 12 1 12s0 3.4.43 5.03c.24.9.94 1.6 1.84 1.85 1.63.42 8.73.42 8.73.42s7.1 0 8.73-.42a2.6 2.6 0 0 0 1.84-1.85C23 15.4 23 12 23 12ZM9.75 15.27V8.73L15.5 12l-5.75 3.27Z" />
    </svg>
  );
}

export function Close({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className={className}
      aria-hidden
    >
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}
