"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { primaryNav, utilityNav, type NavItem } from "@/lib/site";
import { Logo } from "@/components/logo";
import { Arrow, ChevronDown, Close, Menu, Search } from "@/components/icons";

/** Desktop mega-menu opens on hover after a short intent delay, so a cursor
 *  crossing the bar on its way elsewhere does not fire every panel. */
const HOVER_INTENT_MS = 100;

/** Routes whose hero is a full-viewport dark band, so the bar rides over it. */
const OVERLAY_ROUTES = new Set(["/"]);

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const [drawer, setDrawer] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Transparent over the hero, solid the moment it leaves — or the moment a
  // panel opens, because a mega-menu over moving footage is unreadable.
  const overlay = OVERLAY_ROUTES.has(pathname);
  const solid = !overlay || scrolled || Boolean(open) || drawer;

  // Route change closes everything — the panel must never survive navigation.
  // Adjusted during render rather than in an effect, so the new route never
  // paints once with the old route's panel still open.
  const [route, setRoute] = useState(pathname);
  if (route !== pathname) {
    setRoute(pathname);
    setOpen(null);
    setDrawer(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setDrawer(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // The drawer covers the viewport; letting the page behind it scroll is
  // disorienting on touch.
  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawer]);

  const clearTimer = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  };

  const hoverOpen = (label: string) => {
    clearTimer();
    timer.current = setTimeout(() => setOpen(label), HOVER_INTENT_MS);
  };

  const hoverClose = () => {
    clearTimer();
    timer.current = setTimeout(() => setOpen(null), HOVER_INTENT_MS);
  };

  const isActive = (href?: string) =>
    Boolean(href && href !== "/" && pathname.startsWith(href));

  // One switch drives every colour in the bar, so the transparent and solid
  // states can never drift apart.
  const onDark = !solid;
  const text = onDark ? "text-on-black" : "text-ink";
  const mutedText = onDark ? "text-on-black-mute" : "text-muted";
  const hairline = onDark ? "border-white/15" : "border-line";
  // Written out in full: Tailwind cannot see a class assembled at runtime.
  const utilityLink = onDark
    ? "text-on-black-mute hover:text-on-black"
    : "text-muted hover:text-ink";

  return (
    <header
      className={`z-50 ${overlay ? "fixed inset-x-0 top-0" : "sticky top-0"}`}
      onMouseLeave={hoverClose}
    >
      {/* Utility bar — the dual-practice split, at its smallest scale. */}
      <div
        className={`hidden border-b transition-colors duration-[240ms] ease-brand lg:block ${hairline} ${
          solid ? "bg-tint-neutral" : "bg-black/25"
        }`}
      >
        <div className="shell flex h-8 items-center justify-end gap-7">
          {utilityNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 text-eyebrow uppercase transition-colors duration-150 ease-brand ${utilityLink}`}
            >
              {item.marker && (
                <span
                  className={`h-2.5 w-[3px] ${
                    item.marker === "red" ? "bg-brand-red" : "bg-brand-blue"
                  }`}
                  aria-hidden
                />
              )}
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Main bar */}
      <div
        className={`border-b transition-[background-color,border-color,box-shadow] duration-[240ms] ease-brand ${hairline} ${
          solid ? "bg-bg" : "bg-transparent"
        } ${solid && scrolled ? "shadow-layer" : ""}`}
      >
        <div
          className={`shell flex h-[68px] items-center justify-between transition-[height] duration-[240ms] ease-brand ${
            // Condensing is desktop-only: on mobile the bar height is what the
            // drawer offsets against, and a moving offset reads as a glitch.
            scrolled ? "lg:h-14" : ""
          }`}
        >
          <Link href="/" className="shrink-0" aria-label="CompQsoft home">
            <Logo className="h-7 w-auto" />
          </Link>

          <nav className="hidden lg:block" aria-label="Primary">
            <ul className="flex items-center gap-1">
              {primaryNav.map((item) => {
                const expanded = open === item.label;
                return (
                  <li
                    key={item.label}
                    onMouseEnter={() => hoverOpen(item.label)}
                    onMouseLeave={hoverClose}
                  >
                    <button
                      type="button"
                      aria-expanded={expanded}
                      onClick={() => setOpen(expanded ? null : item.label)}
                      className={`relative flex items-center gap-1.5 px-4 py-2.5 text-base transition-colors duration-150 ease-brand ${
                        expanded ? "text-link" : text
                      } hover:text-link`}
                    >
                      {item.label}
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform duration-[180ms] ease-brand ${expanded ? "rotate-180" : ""}`}
                      />
                      {/* Active-route underline, 2px brand blue. */}
                      <span
                        className={`absolute inset-x-4 bottom-0 h-0.5 bg-brand-blue transition-opacity duration-150 ease-brand ${
                          expanded ? "opacity-100" : "opacity-0"
                        }`}
                        aria-hidden
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <Link
              href="/sitemap"
              className={`p-2.5 transition-colors duration-150 ease-brand ${mutedText} hover:text-link`}
              aria-label="Search the site"
            >
              <Search />
            </Link>
            <Link
              href="/contact-us"
              className={`group inline-flex items-center gap-2 rounded-pill px-6 py-2.5 text-base transition-colors duration-150 ease-brand ${
                onDark
                  ? "bg-bg text-ink hover:bg-on-black-mute"
                  : "bg-black text-on-black hover:bg-body"
              }`}
            >
              Contact us
              <Arrow className="h-3.5 w-3.5 transition-transform duration-150 ease-brand group-hover:translate-x-1" />
            </Link>
          </div>

          <button
            type="button"
            className={`p-2 lg:hidden ${text}`}
            aria-expanded={drawer}
            aria-label={drawer ? "Close menu" : "Open menu"}
            onClick={() => setDrawer(!drawer)}
          >
            {drawer ? <Close /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Desktop mega panel */}
      {open && (
        <MegaPanel
          item={primaryNav.find((i) => i.label === open)!}
          isActive={isActive}
          onEnter={clearTimer}
          onLeave={hoverClose}
        />
      )}

      {/* Mobile drawer */}
      {drawer && <MobileDrawer isActive={isActive} />}
    </header>
  );
}

function MegaPanel({
  item,
  isActive,
  onEnter,
  onLeave,
}: {
  item: NavItem;
  isActive: (href?: string) => boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const government = item.practice === "government";
  const rule = government ? "bg-brand-red" : "bg-brand-blue";
  const eyebrow = government ? "text-red-text" : "text-link";
  const tint = government ? "bg-tint-red" : "bg-tint-blue";

  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="absolute inset-x-0 top-full border-b border-line bg-bg shadow-layer"
    >
      <div className="shell grid gap-10 py-12 lg:grid-cols-4 lg:gap-14">
        {item.columns?.map((column) => (
          <div key={column.heading}>
            <p className="mb-5 flex items-center gap-2.5 text-eyebrow uppercase text-muted">
              <span className={`h-[3px] w-4 ${rule}`} aria-hidden />
              {column.heading}
            </p>
            <ul className="space-y-1">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`-mx-3 block rounded-[6px] px-3 py-2 text-base transition-colors duration-150 ease-brand hover:bg-tint-neutral hover:text-link ${
                      isActive(link.href) ? "text-link" : "text-body"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {item.featured && (
          <Link
            href={item.featured.href}
            className={`group flex flex-col justify-between rounded-card ${tint} p-7 transition-colors duration-150 ease-brand hover:bg-tint-neutral lg:col-start-4`}
          >
            <div>
              <p className={`mb-4 text-eyebrow uppercase ${eyebrow}`}>
                {item.featured.eyebrow}
              </p>
              <p className="text-h4 text-ink">{item.featured.title}</p>
            </div>
            <span className="mt-6 inline-flex items-center gap-2 text-sm text-link">
              Read more
              <Arrow className="h-3 w-3 transition-transform duration-150 ease-brand group-hover:translate-x-1" />
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}

function MobileDrawer({ isActive }: { isActive: (href?: string) => boolean }) {
  return (
    <div className="fixed inset-x-0 bottom-0 top-[var(--header-h)] overflow-y-auto bg-bg lg:hidden">
      <div className="shell py-6">
        {primaryNav.map((item) => (
          <details key={item.label} className="group border-b border-line">
            <summary className="flex cursor-pointer list-none items-center justify-between py-5 text-h4 text-ink marker:hidden">
              {item.label}
              <ChevronDown className="h-4 w-4 text-muted transition-transform duration-[180ms] ease-brand group-open:rotate-180" />
            </summary>
            <div className="space-y-6 pb-6">
              {item.columns?.map((column) => (
                <div key={column.heading}>
                  <p className="mb-3 flex items-center gap-2 text-eyebrow uppercase text-muted">
                    <span
                      className={`h-[3px] w-4 ${
                        item.practice === "government"
                          ? "bg-brand-red"
                          : "bg-brand-blue"
                      }`}
                      aria-hidden
                    />
                    {column.heading}
                  </p>
                  <ul className="space-y-3">
                    {column.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className={`text-base ${
                            isActive(link.href) ? "text-link" : "text-body"
                          }`}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </details>
        ))}

        <div className="mt-8 space-y-4">
          {utilityNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 text-eyebrow uppercase text-muted"
            >
              {item.marker && (
                <span
                  className={`h-2.5 w-[3px] ${
                    item.marker === "red" ? "bg-brand-red" : "bg-brand-blue"
                  }`}
                  aria-hidden
                />
              )}
              {item.label}
            </Link>
          ))}
        </div>

        <Link
          href="/contact-us"
          className="mt-8 flex items-center justify-center gap-2 rounded-pill bg-black px-6 py-3.5 text-base text-on-black"
        >
          Contact us
          <Arrow className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}

