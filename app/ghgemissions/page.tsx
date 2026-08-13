import type { Metadata } from "next";
import { pageFor, seoFor } from "@/lib/content";
import { CtaBand, Hero } from "@/components/sections";
import { PageProse } from "@/components/page-content";
import { bannerFor } from "@/lib/media";

const PRACTICE = "neutral" as const;
const PATH = "/ghgemissions";
const seo = seoFor(PATH);

export const metadata: Metadata = {
  title: { absolute: seo?.title ?? "Our Commitment to Sustainability and Transparency - CompQsoft" },
  description: seo?.description ?? "Measuring, managing and publicly disclosing our greenhouse gas emissions.",
  alternates: { canonical: PATH },
};

export default function GhgemissionsPage() {
  const page = pageFor(PATH);

  return (
    <main>
      <Hero
        image={bannerFor(PATH)}
        compact
        practice={PRACTICE}
        eyebrow="Sustainability"
        title={page?.title?.replace(/\s*-\s*CompQsoft$/, "") ?? "Our Commitment to Sustainability and Transparency"}
        lead="Measuring, managing and publicly disclosing our greenhouse gas emissions."
      />

      {page && <PageProse blocks={page.blocks} practice={PRACTICE} />}

      <CtaBand practice={PRACTICE} title="Questions about our ESG reporting?" />
    </main>
  );
}
