"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { primaryNav, type NavItem } from "@/lib/site";
import { navImage, navPanelImage } from "@/lib/media";
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

  return (
    <header
      className={`z-50 ${overlay ? "fixed inset-x-0 top-0" : "sticky top-0"}`}
      onMouseLeave={hoverClose}
    >
      {/* One bar. The old utility strip is gone — Government, Commercial and
          Employee Resources live in the panels and the footer instead. */}
      <div
        className={`border-b transition-[background-color,border-color,box-shadow] duration-[240ms] ease-brand ${hairline} ${
          solid ? "bg-bg" : "bg-transparent"
        } ${solid && scrolled ? "shadow-layer" : ""}`}
      >
        <div
          className={`shell flex h-17 items-center justify-between transition-[height] duration-[240ms] ease-brand ${
            // Condensing is desktop-only: on mobile the bar height is what the
            // drawer offsets against, and a moving offset reads as a glitch.
            scrolled ? "lg:h-14" : ""
          }`}
        >
          <Link href="/" className="shrink-0" aria-label="CompQsoft home">
            <Logo className="h-8" tone={onDark ? "dark" : "light"} />
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

/**
 * The panel: a picture on the left, the links on the right, nothing else.
 *
 * Every link carries its own image — pointing at one swaps the picture, so the
 * reader sees the destination before they commit to the click. The image only
 * ever changes on a deliberate hover, and it holds the last one on the way out
 * rather than snapping back, which would read as a flicker.
 */
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

  const fallback = navPanelImage(item.label);
  const [preview, setPreview] = useState<{ src: string; label: string }>({
    src: fallback,
    label: item.featured?.title ?? item.label,
  });

  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="absolute inset-x-0 top-full border-b border-line bg-bg shadow-layer py-2"
    >
      <div className="shell grid gap-8 lg:grid-cols-[minmax(0,16rem)_1fr] lg:gap-14">
        {/* Left: the picture, plus whatever the panel wants to feature. */}
        <div className="hidden lg:block py-8">

          {/* No key on the image: remounting per hover blanks the frame while
              the next file loads, which reads as a flicker. Swapping src keeps
              the last picture on screen until the new one is decoded. */}
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-tint-neutral">
            <Image
              src={preview.src}
              alt=""
              fill
              sizes="480px"
              className="graded object-cover"
            />
            <span
              className={`absolute inset-x-0 bottom-0 h-1 ${rule}`}
              aria-hidden
            />
          </div>

          <p className="mt-4 text-base text-ink">{preview.label}</p>

          {item.featured && (
            <Link
              href={item.featured.href}
              className="group mt-3 inline-flex items-center gap-2 border-b-2 border-brand-blue pb-1 text-sm text-link transition-colors duration-150 ease-brand hover:text-link-hover"
            >
              {item.featured.eyebrow}
              <Arrow className="h-3 w-3 transition-transform duration-150 ease-brand group-hover:translate-x-1" />
            </Link>
          )}
        </div>

        {/* Right: the links, set large and quiet. */}
        <div className="grid gap-x-12 gap-y-7 sm:grid-cols-2 lg:pt-7">
          {item.columns?.map((column) => (
            <div key={column.heading}>
              <p className="mb-3 text-eyebrow uppercase text-muted">
                {column.heading}
              </p>
              <ul>
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onMouseEnter={() =>
                        setPreview({
                          src: navImage(link.href) ?? fallback,
                          label: link.label,
                        })
                      }
                      onFocus={() =>
                        setPreview({
                          src: navImage(link.href) ?? fallback,
                          label: link.label,
                        })
                      }
                      className={`block py-1.5 text-sm transition-colors duration-150 ease-brand hover:text-link ${
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
            <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-base text-ink marker:hidden">
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

