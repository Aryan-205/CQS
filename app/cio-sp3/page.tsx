import type { Metadata } from "next";
import { pageFor, seoFor } from "@/lib/content";
import { CtaBand, Hero } from "@/components/sections";
import { PageProse } from "@/components/page-content";

const PRACTICE = "government" as const;
const PATH = "/cio-sp3";
const seo = seoFor(PATH);

export const metadata: Metadata = {
  title: { absolute: seo?.title ?? "CIO-SP3 - CompQsoft" },
  description: seo?.description ?? "NITAAC CIO-SP3 Small Business — HUBZone on-ramp, task areas 1, 2, 4, 5, 6, 7, 8, 9 and 10.",
  alternates: { canonical: PATH },
};

export default function CioSp3Page() {
  const page = pageFor(PATH);

  return (
    <main>
      <Hero
        compact
        practice={PRACTICE}
        eyebrow="Contract vehicle"
        title={page?.title?.replace(/\s*-\s*CompQsoft$/, "") ?? "CIO-SP3"}
        lead="NITAAC CIO-SP3 Small Business — HUBZone on-ramp, task areas 1, 2, 4, 5, 6, 7, 8, 9 and 10."
      />

      {page && <PageProse blocks={page.blocks} practice={PRACTICE} />}

      <CtaBand practice={PRACTICE} title="Buying through CIO-SP3?" />
    </main>
  );
}
