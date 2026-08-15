import Image from "next/image";

/**
 * The supplied CompQsoft mark.
 *
 * Four files, cut from the two source JPGs in /public and matted to alpha so
 * the mark can sit on the white bar, on the footer, and on the transparent
 * header that rides over the hero footage:
 *
 * - `wordmark` — COMPQSOFT alone, for the header, where the strapline would
 *   render three pixels tall and read as dirt
 * - `full` — the lockup with "The IT Edge for Lean Government", for the footer
 *
 * The dark variants carry the white strapline; the light ones carry the black.
 * The blue and the red are identical in both, so the mark itself is never
 * recoloured — only the strapline changes, exactly as the two originals do.
 */
const SOURCES = {
  "wordmark-light": { src: "/media/logo-wordmark.png", ratio: 1200 / 226 },
  "wordmark-dark": { src: "/media/logo-wordmark-on-dark.png", ratio: 1200 / 226 },
  "full-light": { src: "/media/logo.png", ratio: 1200 / 281 },
  "full-dark": { src: "/media/logo-on-dark.png", ratio: 1200 / 281 },
} as const;

export function Logo({
  className = "",
  tone = "light",
  variant = "wordmark",
  priority = true,
  decorative = false,
}: {
  className?: string;
  tone?: "light" | "dark";
  variant?: "wordmark" | "full";
  /**
   * On by default because the header and footer marks are chrome. Turn it off
   * for the large marks that sit inside a section further down the page —
   * those compete with the hero for bandwidth and are never the LCP element.
   */
  priority?: boolean;
  /** The section already names the company in its heading, so the mark is
   *  ornament to a screen reader rather than information. */
  decorative?: boolean;
}) {
  const { src, ratio } = SOURCES[`${variant}-${tone}` as keyof typeof SOURCES];
  const height = variant === "full" ? 281 : 226;

  return (
    <Image
      src={src}
      alt={decorative ? "" : "CompQsoft"}
      width={Math.round(height * ratio)}
      height={height}
      priority={priority}
      className={`w-auto ${className}`}
    />
  );
}
