import type { Metadata } from "next";
import { seoFor } from "@/lib/content";
import { CtaBand } from "@/components/sections";
import {
  BoardFrame,
  BoardHero,
  NoteColumns,
  PracticePanels,
} from "@/components/careers/sections";
import { bannerFor, practiceMedia } from "@/lib/media";

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

const PANELS = [
  {
    href: "/government-it-services",
    image: practiceMedia.government,
    label: "Government",
    title: "Federal programme delivery",
    description:
      "Prime contractor work for DoD, DHS and HHS customers across five IDIQ vehicles.",
    practice: "government" as const,
  },
  {
    href: "/technologygroup",
    image: practiceMedia.commercial,
    label: "Commercial",
    title: "Digital transformation",
    description:
      "Dynamics 365, Azure, Power Platform and Copilot delivery for commercial customers.",
    practice: "commercial" as const,
  },
];

export default function OpeningsPage() {
  return (
    <main>
      <BoardHero
        eyebrow="Careers"
        title="Every role we are hiring for, live"
        lead="The listing below comes straight out of our recruiting system, so what is on this page is what is open today."
        image={bannerFor(PATH)}
        practice={PRACTICE}
        facts={[
          {
            label: "Practices",
            value: "Federal programme delivery and the commercial Microsoft practice",
          },
          {
            label: "Where",
            value: "Leesburg VA, Houston TX and customer sites across 240+ locations",
          },
          {
            label: "Package",
            value: "Full W2 benefits, including certification assistance",
          },
        ]}
      />

      <BoardFrame
        src={PAYLOCITY_BOARD}
        title="CompQsoft job openings"
        source="Live board · Paylocity recruiting"
      />

      <NoteColumns
        practice={PRACTICE}
        notes={[
          {
            title: "If the board will not load",
            body: (
              <p>
                Some corporate networks block embedded recruiting frames. The
                same listing opens directly at{" "}
                <a
                  href={PAYLOCITY_BOARD}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link underline decoration-brand-blue decoration-2 underline-offset-4 transition-colors duration-150 ease-brand hover:text-link-hover"
                >
                  recruiting.paylocity.com
                </a>
                .
              </p>
            ),
          },
          {
            title: "Questions about a role",
            body: (
              <p>
                HR takes candidate and vendor calls on{" "}
                <a
                  href="tel:+17037751564"
                  className="text-link underline decoration-brand-blue decoration-2 underline-offset-4 transition-colors duration-150 ease-brand hover:text-link-hover"
                >
                  703-775-1564
                </a>
                .
              </p>
            ),
          },
          {
            title: "Older postings",
            body: (
              <p>
                Roles listed elsewhere from 2024 are closed. This board is the
                only current source of CompQsoft vacancies.
              </p>
            ),
          },
        ]}
      />

      <PracticePanels
        eyebrow="Before you apply"
        title="The two sides of the business you would join"
        panels={PANELS}
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
