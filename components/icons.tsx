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
   Careers glyphs — the four company values.

   The live site runs these as raster PNGs from the WordPress uploads folder
   (values-icon-01…04.png). They are redrawn here on the same 24-unit grid as
   the process set so they scale, take brand colour from currentColor and stay
   consistent with everything else on the page.
------------------------------------------------------------------------- */

/** Excellence Delivered — a medal. Work that is measured and awarded. */
export function Award({ className }: IconProps) {
  return (
    <Glyph className={className}>
      <circle cx="12" cy="9" r="5.5" />
      <path d="M12 6.4l.85 1.72 1.9.28-1.37 1.34.32 1.9L12 10.74l-1.7.9.32-1.9L9.25 8.4l1.9-.28L12 6.4Z" />
      <path d="m8.6 13.9-1.6 6.6 5-2.9 5 2.9-1.6-6.6" />
    </Glyph>
  );
}

/** Proactive Problem Solving — the idea, found before it is asked for. */
export function Lightbulb({ className }: IconProps) {
  return (
    <Glyph className={className}>
      <path d="M12 3a6 6 0 0 0-3.5 10.9c.6.45 1 1.15 1 1.9V16h5v-.2c0-.75.4-1.45 1-1.9A6 6 0 0 0 12 3Z" />
      <path d="M9.5 19h5M10.5 21.5h3" />
    </Glyph>
  );
}

/** Culture of Dignity and Respect — two people, equally weighted. */
export function People({ className }: IconProps) {
  return (
    <Glyph className={className}>
      <circle cx="9" cy="8" r="3.25" />
      <path d="M2.75 20.5v-1a5 5 0 0 1 5-5h2.5a5 5 0 0 1 5 5v1" />
      <path d="M16.5 5.1a3.25 3.25 0 0 1 0 5.8" />
      <path d="M17.75 14.7a5 5 0 0 1 3.5 4.8v1" />
    </Glyph>
  );
}

/** Customer-Centered Success — the customer at the centre, literally. */
export function Target({ className }: IconProps) {
  return (
    <Glyph className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.75" />
      <circle cx="12" cy="12" r="1.25" />
    </Glyph>
  );
}

/* -------------------------------------------------------------------------
   Benefit glyphs — the eight items in the W2 compensation package.
------------------------------------------------------------------------- */

/** 401(k) — stacked coins, the thing that compounds. */
export function Coins({ className }: IconProps) {
  return (
    <Glyph className={className}>
      <path d="M4.5 7c0-1.66 3.36-3 7.5-3s7.5 1.34 7.5 3-3.36 3-7.5 3-7.5-1.34-7.5-3Z" />
      <path d="M4.5 12c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3" />
      <path d="M4.5 7v10c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3V7" />
    </Glyph>
  );
}

/** Life insurance — cover held over what matters. */
export function ShieldHeart({ className }: IconProps) {
  return (
    <Glyph className={className}>
      <path d="M12 21s7.5-3.7 7.5-9.5V5.8L12 3 4.5 5.8v5.7C4.5 17.3 12 21 12 21Z" />
      <path d="M12 15.6s-3.1-1.9-3.1-3.9a1.75 1.75 0 0 1 3.1-1.1 1.75 1.75 0 0 1 3.1 1.1c0 2-3.1 3.9-3.1 3.9Z" />
    </Glyph>
  );
}

/** Health insurance — the cross, read before the word is. */
export function HealthCross({ className }: IconProps) {
  return (
    <Glyph className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.75v8.5M7.75 12h8.5" />
    </Glyph>
  );
}

/** Dental insurance. */
export function Tooth({ className }: IconProps) {
  return (
    <Glyph className={className}>
      <path d="M12 4.6c-1.1-.65-2-1.05-3.3-1.05C6.3 3.55 4.6 5.4 4.6 7.85c0 1.7.5 2.7 1 4 .5 1.5.5 2.7.8 4.45.25 1.7.5 3.6 1.6 3.9 1.3.35 1.7-1.7 2-3.5.25-1.4.3-2.9 2-2.9s1.75 1.5 2 2.9c.3 1.8.7 3.85 2 3.5 1.1-.3 1.35-2.2 1.6-3.9.3-1.75.3-2.95.8-4.45.5-1.3 1-2.3 1-4 0-2.45-1.7-4.3-4.1-4.3-1.3 0-2.2.4-3.3 1.05Z" />
    </Glyph>
  );
}

/** Long and short-term disability — cover that stays up while you cannot. */
export function Umbrella({ className }: IconProps) {
  return (
    <Glyph className={className}>
      <path d="M2.75 12.4a9.25 9.25 0 0 1 18.5 0Z" />
      <path d="M12 12.4v6.35a2.35 2.35 0 0 1-4.7 0" />
      <path d="M12 3.15v1.9" />
    </Glyph>
  );
}

/** Sick leave — days that are already yours. */
export function CalendarCheck({ className }: IconProps) {
  return (
    <Glyph className={className}>
      <rect x="3.75" y="5" width="16.5" height="15.25" rx="1.5" />
      <path d="M3.75 10h16.5M8.25 2.75v4.5M15.75 2.75v4.5" />
      <path d="m9 14.9 2.1 2.1 3.9-3.9" />
    </Glyph>
  );
}

/** Training, education and certification assistance. */
export function GradCap({ className }: IconProps) {
  return (
    <Glyph className={className}>
      <path d="m12 4 9.5 4.4L12 12.8 2.5 8.4 12 4Z" />
      <path d="M6.75 10.6v4.9c0 1.85 2.35 3 5.25 3s5.25-1.15 5.25-3v-4.9" />
      <path d="M21.5 8.4v5.6" />
    </Glyph>
  );
}

/** Vacation and holiday plan. */
export function Sun({ className }: IconProps) {
  return (
    <Glyph className={className}>
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.15 5.15l1.4 1.4M17.45 17.45l1.4 1.4M18.85 5.15l-1.4 1.4M6.55 17.45l-1.4 1.4" />
    </Glyph>
  );
}

/* -------------------------------------------------------------------------
   Employee-resource glyphs. The live site runs these as four SVGs
   (website-icon, download-icon, calendar-icon, pay-icon); redrawn on the
   shared grid so the four sections of that page carry one visual language.
------------------------------------------------------------------------- */

/** Website links. */
export function Globe({ className }: IconProps) {
  return (
    <Glyph className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17" />
      <path d="M12 3.5a13.5 13.5 0 0 1 0 17 13.5 13.5 0 0 1 0-17Z" />
    </Glyph>
  );
}

/** Common downloads. */
export function Download({ className }: IconProps) {
  return (
    <Glyph className={className}>
      <path d="M12 3.5v11.5" />
      <path d="m7.5 10.5 4.5 4.5 4.5-4.5" />
      <path d="M4 19.5h16" />
    </Glyph>
  );
}

/** Holiday calendar. */
export function CalendarDays({ className }: IconProps) {
  return (
    <Glyph className={className}>
      <rect x="3.75" y="5" width="16.5" height="15.25" rx="1.5" />
      <path d="M3.75 10h16.5M8.25 2.75v4.5M15.75 2.75v4.5" />
      <path d="M8 13.5h.01M12 13.5h.01M16 13.5h.01M8 16.75h.01M12 16.75h.01" />
    </Glyph>
  );
}

/** Pay schedule. */
export function Wallet({ className }: IconProps) {
  return (
    <Glyph className={className}>
      <path d="M3.5 8.5a2 2 0 0 1 2-2h12.5a1.5 1.5 0 0 1 1.5 1.5v10a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2Z" />
      <path d="M3.5 8.5V7a1.5 1.5 0 0 1 1.5-1.5h10.5" />
      <path d="M20 12.25h-3.25a1.875 1.875 0 0 0 0 3.75H20" />
    </Glyph>
  );
}

/* -------------------------------------------------------------------------
   Job-board glyphs.
------------------------------------------------------------------------- */

/** An open role. */
export function Briefcase({ className }: IconProps) {
  return (
    <Glyph className={className}>
      <rect x="3.5" y="7" width="17" height="13" rx="1.5" />
      <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7" />
      <path d="M3.5 12.5h17" />
    </Glyph>
  );
}

/** Where the work is. */
export function MapPin({ className }: IconProps) {
  return (
    <Glyph className={className}>
      <path d="M12 21s7-6.2 7-11.2a7 7 0 1 0-14 0C5 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.8" r="2.6" />
    </Glyph>
  );
}

/** Cleared work — the security condition on most federal roles. */
export function ShieldCheck({ className }: IconProps) {
  return (
    <Glyph className={className}>
      <path d="M12 21s7.5-3.7 7.5-9.5V5.8L12 3 4.5 5.8v5.7C4.5 17.3 12 21 12 21Z" />
      <path d="m8.75 11.75 2.25 2.25 4.25-4.25" />
    </Glyph>
  );
}

/* -------------------------------------------------------------------------
   Contact glyphs — HR is a phone number and a mailbox, so both get a mark.
------------------------------------------------------------------------- */
export function Phone({ className }: IconProps) {
  return (
    <Glyph className={className}>
      <path d="M8.4 4.5H5.6A2.1 2.1 0 0 0 3.5 6.7c.2 3.3 1.7 6.4 4.1 8.8s5.5 3.9 8.8 4.1a2.1 2.1 0 0 0 2.1-2.1v-2.8l-3.9-1.3-1.8 1.8a14 14 0 0 1-4.3-4.3l1.8-1.8L8.4 4.5Z" />
    </Glyph>
  );
}

export function Mail({ className }: IconProps) {
  return (
    <Glyph className={className}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
      <path d="m3.5 7.5 8.5 6 8.5-6" />
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
