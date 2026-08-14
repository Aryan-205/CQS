import type { Metadata } from "next";
import { seoFor } from "@/lib/content";
import { Band, CtaBand, Eyebrow } from "@/components/sections";
import {
  EditorialGrid,
  GlyphGrid,
  PageHero,
} from "@/components/editorial/sections";
import { Arrow, Briefcase, GradCap, MapPin } from "@/components/icons";
import { bannerFor, careersMedia, practiceMedia } from "@/lib/media";

const PRACTICE = "neutral" as const;
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

/** What a candidate needs to know before they scroll into the board itself. */
const ORIENTATION = [
  {
    title: "Two practices",
    description:
      "Roles run across federal programme delivery — unified communications, network engineering, cybersecurity, logistics software sustainment — and the commercial Microsoft practice.",
    icon: <Briefcase className="h-11 w-11" />,
  },
  {
    title: "Where the work is",
    description:
      "Corporate office in Leesburg, Virginia and a Houston, Texas office, plus customer sites across 240+ locations.",
    icon: <MapPin className="h-11 w-11" />,
  },
  {
    title: "Certification supported",
    description:
      "Training, education and certification assistance is part of the standard W2 package, not a negotiated extra.",
    icon: <GradCap className="h-11 w-11" />,
  },
];

const NEXT = [
  {
    href: "/life-at-compqsoft",
    image: careersMedia.culture.src,
    eyebrow: "Careers",
    title: "Life at CompQsoft",
    excerpt:
      "The values, the benefits and what the working environment is actually like.",
    cta: "Read more",
  },
  {
    href: "/government-it-services",
    image: practiceMedia.government.src,
    eyebrow: "Government",
    title: "Federal programme delivery",
    excerpt:
      "Prime contractor work for DoD, DHS and HHS customers on five IDIQ vehicles.",
    cta: "See the practice",
  },
  {
    href: "/technologygroup",
    image: practiceMedia.commercial.src,
    eyebrow: "Commercial",
    title: "Digital transformation",
    excerpt:
      "Dynamics 365, Azure, Power Platform and Copilot delivery for commercial customers.",
    cta: "See the practice",
  },
];

export default function OpeningsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Careers"
        title="Every role we are hiring for, live"
        image={bannerFor(PATH)}
        practice={PRACTICE}
        actions={[
          { label: "Life at CompQsoft", href: "/life-at-compqsoft" },
          { label: "Talk to us", href: "/contact-us" },
        ]}
      />

      <GlyphGrid
        eyebrow="Before you apply"
        title="What you are applying to"
        lead="Every current vacancy comes straight from our recruiting system, so what is on this page is what is open today."
        items={ORIENTATION}
        columns={3}
        practice={PRACTICE}
      />

      {/* The board itself. Framed rather than dropped in raw: the header line
          tells a candidate the listing is live and hosted elsewhere, which is
          why its styling does not match the rest of the page. */}
      <Band tone="tint" practice={PRACTICE} size="large">
        <div className="overflow-hidden rounded-card border border-line bg-bg">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line px-6 py-5 sm:px-8">
            <div className="flex items-center gap-3">
              <span
                className="h-2 w-2 rounded-pill bg-brand-blue"
                aria-hidden
              />
              <p className="text-stat-label uppercase text-muted">
                Live board · Paylocity recruiting
              </p>
            </div>
            <a
              href={PAYLOCITY_BOARD}
              rel="noopener noreferrer"
              target="_blank"
              className="group inline-flex items-center gap-2 border-b-2 border-brand-blue pb-1 text-sm text-link transition-colors duration-150 ease-brand hover:text-link-hover"
            >
              Open in a new tab
              <Arrow className="h-3 w-3 transition-transform duration-150 ease-brand group-hover:translate-x-1" />
            </a>
          </div>

          <iframe
            src={PAYLOCITY_BOARD}
            title="CompQsoft job openings"
            className="h-[1100px] w-full sm:h-[1400px]"
            loading="lazy"
          />
        </div>

        <div className="mt-10 grid gap-6 border-t border-line pt-10 md:grid-cols-2">
          <div>
            <Eyebrow practice={PRACTICE}>If the board will not load</Eyebrow>
            <p className="measure mt-5 text-base text-body">
              Some corporate networks block embedded recruiting frames. The same
              listing opens directly at{" "}
              <a
                href={PAYLOCITY_BOARD}
                rel="noopener noreferrer"
                target="_blank"
                className="text-link underline decoration-brand-blue decoration-2 underline-offset-4 transition-colors duration-150 ease-brand hover:text-link-hover"
              >
                recruiting.paylocity.com
              </a>
              .
            </p>
          </div>
          <div>
            <Eyebrow practice={PRACTICE}>Questions about a role</Eyebrow>
            <p className="measure mt-5 text-base text-body">
              Vendors and candidates can reach HR on{" "}
              <a
                href="tel:+17037751564"
                className="text-link underline decoration-brand-blue decoration-2 underline-offset-4 transition-colors duration-150 ease-brand hover:text-link-hover"
              >
                703-775-1564
              </a>
              .
            </p>
          </div>
        </div>
      </Band>

      <EditorialGrid
        eyebrow="Read next"
        title="What you would be joining"
        cards={NEXT}
        practice={PRACTICE}
      />

      <CtaBand
        practice={PRACTICE}
        title="Nothing matching your skills?"
        lead="Send us your details anyway — we hire ahead of award on several programmes."
        action={{ label: "Contact us", href: "/contact-us" }}
        secondary={{ label: "Life at CompQsoft", href: "/life-at-compqsoft" }}
      />
    </main>
  );
}
