"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";
import { Arrow } from "@/components/icons";
import { Eyebrow } from "@/components/sections";

export type ServiceCard = {
  title: string;
  description: string;
  href: string;
  icon: string;
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
    <section className="bg-bg py-16 sm:py-24">
      <div className="shell">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow practice={practice}>What we do</Eyebrow>
            <h2 className="measure mt-5 text-h2 text-ink">Our services</h2>
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

        <p className="measure mb-12 text-lg text-body">{current.lead}</p>

        <div
          role="tabpanel"
          id={`${id}-${current.key}-panel`}
          aria-labelledby={`${id}-${current.key}-tab`}
          className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4"
        >
          {current.cards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group relative flex flex-col bg-bg p-7 transition-colors duration-150 ease-brand hover:bg-tint-neutral sm:p-8"
            >
              <span
                className={`absolute inset-x-0 top-0 h-[3px] w-0 transition-[width] duration-[180ms] ease-brand group-hover:w-full ${
                  practice === "government" ? "bg-brand-red" : "bg-brand-blue"
                }`}
                aria-hidden
              />
              <Image
                src={card.icon}
                alt=""
                width={44}
                height={44}
                className="mb-6 h-11 w-11 object-contain"
                unoptimized
              />
              <h3 className="text-h4 text-ink">{card.title}</h3>
              <p className="mt-3 flex-1 text-sm text-body">{card.description}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm text-link">
                Learn more
                <Arrow className="h-3 w-3 transition-transform duration-150 ease-brand group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
