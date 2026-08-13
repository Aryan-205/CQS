"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";
import { Eyebrow } from "@/components/sections";

export type ServiceCard = {
  title: string;
  description: string;
  href: string;
  /** Real photography, not a glyph — the card leads with the picture. */
  image: string;
};

export type ServiceTab = {
  key: "government" | "commercial";
  label: string;
  lead: string;
  cards: ServiceCard[];
};

/**
 * The homepage service grid, split the way the live site splits it — one tab
 * per practice (content.md:617). The tab is the fastest route a visitor has
 * into the half of the company they came for, so it stays above the fold of
 * the second screen and carries the practice colour.
 */
export function ServiceTabs({ tabs }: { tabs: ServiceTab[] }) {
  const [active, setActive] = useState(tabs[0].key);
  const id = useId();
  const current = tabs.find((tab) => tab.key === active) ?? tabs[0];
  const practice = current.key;

  return (
    <section className="bg-bg py-24 sm:py-32">
      <div className="shell">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow practice={practice}>What we do</Eyebrow>
            <h2 className="measure mt-5 text-h1 text-ink">Our services</h2>
          </div>

          <div
            role="tablist"
            aria-label="Service practice"
            className="flex shrink-0 gap-2 rounded-pill border border-line p-1"
          >
            {tabs.map((tab) => {
              const selected = tab.key === active;
              return (
                <button
                  key={tab.key}
                  type="button"
                  role="tab"
                  id={`${id}-${tab.key}-tab`}
                  aria-selected={selected}
                  aria-controls={`${id}-${tab.key}-panel`}
                  onClick={() => setActive(tab.key)}
                  className={`rounded-pill px-6 py-2.5 text-base transition-colors duration-150 ease-brand ${
                    selected
                      ? tab.key === "government"
                        ? "bg-brand-red text-ink"
                        : "bg-brand-blue text-ink"
                      : "text-muted hover:text-ink"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <p className="measure mb-16 text-lg text-body">{current.lead}</p>

        {/* No borders, no fills, no icon chrome: a picture, a name, a line of
            copy, sitting on the white page with room around them. */}
        <div
          role="tabpanel"
          id={`${id}-${current.key}-panel`}
          aria-labelledby={`${id}-${current.key}-tab`}
          className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4"
        >
          {current.cards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group flex flex-col"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-tint-neutral">
                <Image
                  src={card.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="graded object-cover transition-transform duration-[240ms] ease-brand group-hover:scale-[1.04]"
                />
                <span
                  className={`absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-[180ms] ease-brand group-hover:scale-x-100 ${
                    practice === "government" ? "bg-brand-red" : "bg-brand-blue"
                  }`}
                  aria-hidden
                />
              </div>
              <h3 className="mt-6 text-h4 text-ink transition-colors duration-150 ease-brand group-hover:text-link">
                {card.title}
              </h3>
              <p className="mt-3 text-sm text-body">{card.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
