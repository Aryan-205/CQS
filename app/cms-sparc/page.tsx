import type { Metadata } from "next";
import { pageFor, seoFor } from "@/lib/content";
import { CtaBand, Hero } from "@/components/sections";
import { PageProse } from "@/components/page-content";

const PRACTICE = "government" as const;
const PATH = "/cms-sparc";
const seo = seoFor(PATH);

export const metadata: Metadata = {
  title: { absolute: seo?.title ?? "CMS SPARC - CompQsoft" },
  description: seo?.description ?? "Strategic Partners Acquisition Readiness Contract — CompQsoft as prime.",
  alternates: { canonical: PATH },
};

export default function CmsSparcPage() {
  const page = pageFor(PATH);

  return (
    <main>
      <Hero
        compact
        practice={PRACTICE}
        eyebrow="Contract vehicle"
        title={page?.title?.replace(/\s*-\s*CompQsoft$/, "") ?? "CMS SPARC"}
        lead="Strategic Partners Acquisition Readiness Contract — CompQsoft as prime."
      />

      {page && <PageProse blocks={page.blocks} practice={PRACTICE} />}

      <CtaBand practice={PRACTICE} title="Buying through SPARC?" />
    </main>
  );
}
