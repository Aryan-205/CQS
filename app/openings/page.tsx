import type { Metadata } from "next";
import { seoFor } from "@/lib/content";
import { Band, CtaBand, Hero } from "@/components/sections";

const PATH = "/openings";
const seo = seoFor(PATH);

export const metadata: Metadata = {
  title: seo?.title ?? "Open Positions",
  description:
    seo?.description ??
    "Current openings at CompQsoft across our federal and commercial practices.",
  alternates: { canonical: PATH },
};

/**
 * The live job board is hosted by Paylocity — this page embeds it, as the old
 * site did. The 69 legacy /opening/ URLs 301 here rather than being rebuilt;
 * they were frozen in May 2024 and would dead-end candidates on filled roles.
 */
const PAYLOCITY_BOARD =
  "https://recruiting.paylocity.com/recruiting/jobs/All/bb5fb5f2-6241-4f11-99fe-95346c32eee9/";

export default function OpeningsPage() {
  return (
    <main>
      <Hero
        compact
        eyebrow="Careers"
        title="Open positions"
        lead="Every current vacancy, live from our recruiting system. Roles span federal programme delivery and the commercial Microsoft practice."
        actions={[{ label: "Life at CompQsoft", href: "/life-at-compqsoft" }]}
      />

      <Band tone="tint">
        <div className="overflow-hidden rounded-card border border-line bg-bg">
          <iframe
            src={PAYLOCITY_BOARD}
            title="CompQsoft job openings"
            className="h-[1200px] w-full"
            loading="lazy"
          />
        </div>
        <p className="mt-6 text-sm text-muted">
          Trouble loading the board?{" "}
          <a
            href={PAYLOCITY_BOARD}
            rel="noopener noreferrer"
            target="_blank"
            className="text-link underline decoration-brand-blue decoration-2 underline-offset-4"
          >
            Open it directly
          </a>
          .
        </p>
      </Band>

      <CtaBand
        title="Nothing matching your skills?"
        lead="Send us your details anyway — we hire ahead of award on several programmes."
      />
    </main>
  );
}
