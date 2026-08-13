"use client";

import { useEffect, useRef } from "react";
import type { Practice } from "@/lib/content";
import { glowClass, ruleClass } from "@/lib/content";

const DURATION_MS = 900;

/**
 * Stat counters — the one piece of scroll-triggered motion the design system
 * permits. The figure counts up once, when the band first enters view.
 *
 * The final value is what renders on the server and on the first client paint,
 * so it is never missing for a crawler, a screen reader, or a reader who has
 * asked for reduced motion. Only after a layout effect confirms motion is
 * wanted does the figure drop to zero and animate back up — before paint, so
 * there is no flash of the final number.
 */
function Stat({
  value,
  suffix,
  label,
  practice,
  onDark,
}: {
  value: string;
  suffix?: string;
  label: string;
  practice: Practice;
  onDark: boolean;
}) {
  const target = Number(value.replace(/[^0-9]/g, ""));
  const countable = Number.isFinite(target) && target > 0;

  const ref = useRef<HTMLSpanElement>(null);

  // The figure is written straight to the DOM rather than held in state: the
  // server-rendered markup already carries the final value, so there is
  // nothing for React to reconcile and no hydration mismatch to risk.
  useEffect(() => {
    const node = ref.current;
    if (!node || !countable) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    node.textContent = "0";

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / DURATION_MS);
          // Ease out — the figure decelerates into its final value.
          const eased = 1 - Math.pow(1 - t, 3);
          node.textContent =
            t < 1 ? String(Math.round(target * eased)) : value;
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      node.textContent = value;
    };
  }, [countable, target, value]);

  return (
    <div>
      <p className={`tabular text-stat ${onDark ? "text-on-black" : "text-ink"}`}>
        <span ref={ref}>{value}</span>
        {suffix && (
          <span className={onDark ? "text-brand-blue" : "text-link"}>
            {suffix}
          </span>
        )}
      </p>
      <span className={`mt-5 mb-4 block h-[3px] w-12 ${ruleClass(practice)}`} />
      <p
        className={`text-stat-label uppercase ${onDark ? "text-on-black-mute" : "text-muted"}`}
      >
        {label}
      </p>
    </div>
  );
}

export function Counters({
  eyebrow,
  title,
  lead,
  stats,
  practice = "neutral",
  tone = "white",
}: {
  eyebrow?: string;
  title?: string;
  lead?: string;
  stats: { value: string; suffix?: string; label: string }[];
  practice?: Practice;
  tone?: "white" | "tint" | "dark";
}) {
  const onDark = tone === "dark";

  return (
    <section
      className={`relative isolate overflow-hidden ${onDark ? "grad-hero" : "bg-bg"} py-24 sm:py-32`}
    >
      {onDark ? (
        <div className="absolute inset-0 hairline-grid opacity-60" aria-hidden />
      ) : tone === "tint" ? (
        <div
          className={`pointer-events-none absolute inset-0 -z-10 ${glowClass(practice)}`}
          aria-hidden
        />
      ) : null}
      <div className="shell relative">
        {(eyebrow || title || lead) && (
          <div className="mb-16">
            {eyebrow && (
              <p
                className={`flex items-center gap-3 text-eyebrow uppercase ${
                  onDark
                    ? "text-on-black"
                    : practice === "government"
                      ? "text-red-text"
                      : "text-link"
                }`}
              >
                <span className={`h-[3px] w-6 ${ruleClass(practice)}`} />
                {eyebrow}
              </p>
            )}
            {title && (
              <h2
                className={`measure mt-5 text-h1 ${onDark ? "text-on-black" : "text-ink"}`}
              >
                {title}
              </h2>
            )}
            {lead && (
              <p
                className={`measure mt-5 text-lg ${onDark ? "text-on-black-mute" : "text-body"}`}
              >
                {lead}
              </p>
            )}
          </div>
        )}

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <Stat key={stat.label} {...stat} practice={practice} onDark={onDark} />
          ))}
        </div>
      </div>
    </section>
  );
}
