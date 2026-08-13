import Link from "next/link";
import type { ReactNode } from "react";
import { footerColumns, legalLinks, socials } from "@/lib/site";
import { Logo } from "@/components/logo";
import { Arrow, Facebook, LinkedIn, X, YouTube } from "@/components/icons";

/**
 * The one full-bleed black surface below the fold, and the only place on the
 * page where the ground is not white.
 *
 * Two tiers and a rule: the sign-off, the directory, the fine print. Offices,
 * phone numbers and the utility link row are gone — they belong on /contact-us,
 * which is one click away, not stacked under every blog post.
 */

/** Socials render as marks, so the row is four glyphs rather than four words. */
const SOCIAL_ICONS: Record<string, ReactNode> = {
  LinkedIn: <LinkedIn />,
  Facebook: <Facebook />,
  X: <X />,
  YouTube: <YouTube />,
};

export function SiteFooter() {
  return (
    <footer className="relative isolate overflow-hidden bg-black">
      <span className="block h-[3px] grad-blue" aria-hidden />

      <div className="relative">
        {/* Sign-off */}
        <div className="shell flex flex-col gap-10 py-16 lg:flex-row lg:items-center lg:justify-between lg:py-20">
          <Logo className="h-16" tone="dark" variant="full" />

          <Link
            href="/contact-us"
            className="group inline-flex shrink-0 items-center gap-2.5 rounded-pill bg-bg px-7 py-3.5 text-base text-ink transition-colors duration-150 ease-brand hover:bg-on-black-mute"
          >
            Start a conversation
            <Arrow className="h-3.5 w-3.5 transition-transform duration-150 ease-brand group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Directory. Services runs two lists inside its own span — twelve links
            against three elsewhere would otherwise drag the block twice as deep
            as it needs to be. */}
        <div className="shell grid gap-x-10 gap-y-12 border-t border-white/10 py-14 sm:grid-cols-2 lg:grid-cols-12">
          {footerColumns.map((column) => {
            const wide = column.links.length > 6;
            return (
              <div
                key={column.heading}
                className={wide ? "sm:col-span-2 lg:col-span-4" : "lg:col-span-2"}
              >
                <p className="mb-5 text-eyebrow uppercase text-on-black">
                  {column.heading}
                </p>
                <ul
                  className={
                    wide
                      ? "grid gap-x-8 gap-y-2.5 sm:grid-cols-2"
                      : "space-y-2.5"
                  }
                >
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[0.8125rem] leading-6 text-on-black-mute transition-colors duration-150 ease-brand hover:text-brand-blue"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Fine print */}
        <div className="shell flex flex-col gap-6 border-t border-white/10 py-8 md:flex-row md:items-center md:justify-between">
          <p className="text-[0.8125rem] text-on-black-mute">
            © {new Date().getFullYear()} CompQsoft. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[0.8125rem] text-on-black-mute transition-colors duration-150 ease-brand hover:text-brand-blue"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="flex items-center gap-1">
              {socials.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    rel="noopener noreferrer"
                    target="_blank"
                    aria-label={link.label}
                    className="grid h-9 w-9 place-items-center rounded-pill text-on-black-mute transition-colors duration-150 ease-brand hover:bg-white/10 hover:text-on-black"
                  >
                    {SOCIAL_ICONS[link.label]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
