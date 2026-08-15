import type { Metadata } from "next";
import { caseStudies, seoFor } from "@/lib/content";
import { CtaBand, Hero, ListingGrid } from "@/components/sections";
import { bannerFor } from "@/lib/media";
import { caseStudyImage } from "@/lib/media";

const PRACTICE = "commercial" as const;
const PATH = "/case-studies";
const seo = seoFor(PATH);

export const metadata: Metadata = {
  title: seo?.title ?? "Case Studies",
  description:
    seo?.description ??
    "How CompQsoft has delivered for federal agencies and commercial enterprises.",
  alternates: { canonical: PATH },
};

export default function CaseStudiesPage() {
  return (
    <main>
      <Hero
        image={bannerFor(PATH)}
        compact
        practice={PRACTICE}
        eyebrow="Insights"
        title="Case studies"
        lead="Past performance across federal programmes and commercial transformations — what the problem was, what we did, what changed."
      />

      <ListingGrid
        imageFor={caseStudyImage}
        practice={PRACTICE}
        records={caseStudies}
        basePath="/case-study"
        size="tight"
        filters={
          <div className="border-b border-line pb-6">
            <p className="text-stat-label uppercase text-muted">
              {caseStudies.length} case studies
            </p>
          </div>
        }
      />

      <CtaBand
        practice={PRACTICE}
        title="Facing a similar problem?"
        lead="Tell us what you are working with and we will show you what comparable programmes achieved."
      />
    </main>
  );
}
