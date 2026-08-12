"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { primaryNav, utilityNav, type NavItem } from "@/lib/site";
import { Logo } from "@/components/logo";

/** Desktop mega-menu opens on hover after a short intent delay, so a cursor
 *  crossing the bar on its way elsewhere does not fire every panel. */
const HOVER_INTENT_MS = 100;

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const [drawer, setDrawer] = useState(false);
  const [condensed, setCondensed] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Route change closes everything — the panel must never survive navigation.
  useEffect(() => {
    setOpen(null);
    setDrawer(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 80);
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
    href && href !== "/" && pathname.startsWith(href);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 bg-bg"
      onMouseLeave={hoverClose}
    >
      {/* Utility bar — the dual-practice split, at its smallest scale. */}
      <div className="hidden border-b border-line bg-tint-neutral lg:block">
        <div className="shell flex h-8 items-center justify-end gap-6">
          {utilityNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 text-eyebrow uppercase text-muted transition-colors duration-150 ease-brand hover:text-ink"
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
        className={`border-b border-line bg-bg transition-shadow duration-[240ms] ease-brand ${
          condensed ? "shadow-layer" : ""
        }`}
      >
        <div
          className={`shell flex items-center justify-between transition-[height] duration-[240ms] ease-brand ${
            condensed ? "h-14" : "h-[68px]"
          }`}
        >
          <Link href="/" className="shrink-0" aria-label="CompQsoft home">
            <Logo className="h-7 w-auto" />
          </Link>

          <nav className="hidden lg:block" aria-label="Primary">
            <ul className="flex items-center gap-1">
              {primaryNav.map((item) => (
                <li
                  key={item.label}
                  onMouseEnter={() => hoverOpen(item.label)}
                  onMouseLeave={hoverClose}
                >
                  <button
                    type="button"
                    aria-expanded={open === item.label}
                    onClick={() =>
                      setOpen(open === item.label ? null : item.label)
                    }
                    className={`px-4 py-2 text-base transition-colors duration-150 ease-brand ${
                      open === item.label ? "text-link" : "text-ink"
                    } hover:text-link`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/sitemap"
              className="p-2 text-muted transition-colors duration-150 ease-brand hover:text-ink"
              aria-label="Search the site"
            >
              <SearchIcon />
            </Link>
            <Link
              href="/contact-us"
              className="rounded-pill bg-black px-6 py-2.5 text-base text-on-black transition-colors duration-150 ease-brand hover:bg-body"
            >
              Contact us
            </Link>
          </div>

          <button
            type="button"
            className="p-2 text-ink lg:hidden"
            aria-expanded={drawer}
            aria-label={drawer ? "Close menu" : "Open menu"}
            onClick={() => setDrawer(!drawer)}
          >
            {drawer ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Desktop mega panel */}
      {open && (
        <MegaPanel
          item={primaryNav.find((i) => i.label === open)!}
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
  onEnter,
  onLeave,
}: {
  item: NavItem;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const rule =
    item.practice === "government" ? "bg-brand-red" : "bg-brand-blue";
  const eyebrow =
    item.practice === "government" ? "text-red-text" : "text-link";

  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="absolute inset-x-0 top-full border-b border-line bg-bg shadow-layer"
    >
      <div className="shell grid gap-10 py-10 lg:grid-cols-4">
        {item.columns?.map((column) => (
          <div key={column.heading}>
            <p className="mb-4 flex items-center gap-2 text-eyebrow uppercase text-muted">
              <span className={`h-[3px] w-4 ${rule}`} aria-hidden />
              {column.heading}
            </p>
            <ul className="space-y-2.5">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-base text-body transition-colors duration-150 ease-brand hover:text-link"
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
            className="group rounded-card border border-line border-l-4 p-6 transition-colors duration-150 ease-brand hover:border-ink lg:col-start-4"
            style={{
              borderLeftColor:
                item.practice === "government" ? "#EE4743" : "#01A7E5",
            }}
          >
            <p className={`text-eyebrow uppercase ${eyebrow} mb-3`}>
              {item.featured.eyebrow}
            </p>
            <p className="text-base text-ink">{item.featured.title}</p>
            <p className="mt-4 text-sm text-link">Read more →</p>
          </Link>
        )}
      </div>
    </div>
  );
}

function MobileDrawer({ isActive }: { isActive: (href?: string) => unknown }) {
  return (
    <div className="fixed inset-x-0 bottom-0 top-[57px] overflow-y-auto bg-bg lg:hidden">
      <div className="shell py-8">
        {primaryNav.map((item) => (
          <details key={item.label} className="border-b border-line py-4">
            <summary className="cursor-pointer list-none text-h4 text-ink marker:hidden">
              {item.label}
            </summary>
            <div className="mt-4 space-y-6">
              {item.columns?.map((column) => (
                <div key={column.heading}>
                  <p className="mb-3 text-eyebrow uppercase text-muted">
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
          className="mt-8 block rounded-pill bg-black px-6 py-3.5 text-center text-base text-on-black"
        >
          Contact us
        </Link>
      </div>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <circle cx="9" cy="9" r="6" />
      <path d="m13.5 13.5 4 4" strokeLinecap="round" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
    </svg>
  );
}
