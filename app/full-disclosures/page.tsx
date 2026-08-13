import type { Metadata } from "next";
import { pageFor, seoFor } from "@/lib/content";
import { CtaBand, Hero } from "@/components/sections";
import { PageProse } from "@/components/page-content";
import { bannerFor } from "@/lib/media";

const PRACTICE = "neutral" as const;
const PATH = "/full-disclosures";
const seo = seoFor(PATH);

export const metadata: Metadata = {
  title: { absolute: seo?.title ?? "Full Disclosures - CompQsoft" },
  description: seo?.description ?? "Statutory and contractual disclosures.",
  alternates: { canonical: PATH },
};

export default function FullDisclosuresPage() {
  const page = pageFor(PATH);

  return (
    <main>
      <Hero
        image={bannerFor(PATH)}
        compact
        practice={PRACTICE}
        eyebrow="Corporate"
        title={page?.title?.replace(/\s*-\s*CompQsoft$/, "") ?? "Full Disclosures"}
        lead="Statutory and contractual disclosures."
      />

      {page && <PageProse blocks={page.blocks} practice={PRACTICE} />}

      <CtaBand practice={PRACTICE} title="Get in touch" />
    </main>
  );
}
