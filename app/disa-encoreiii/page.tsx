import type { Metadata } from "next";
import { pageFor, seoFor } from "@/lib/content";
import { CtaBand, Hero } from "@/components/sections";
import { PageProse } from "@/components/page-content";

const PRACTICE = "government" as const;
const PATH = "/disa-encoreiii";
const seo = seoFor(PATH);

export const metadata: Metadata = {
  title: { absolute: seo?.title ?? "DISA ENCORE III - CompQsoft" },
  description: seo?.description ?? "CompQsoft holds a prime position on the DISA ENCORE III small business track.",
  alternates: { canonical: PATH },
};

export default function DisaEncoreiiiPage() {
  const page = pageFor(PATH);

  return (
    <main>
      <Hero
        compact
        practice={PRACTICE}
        eyebrow="Contract vehicle"
        title={page?.title?.replace(/\s*-\s*CompQsoft$/, "") ?? "DISA ENCORE III"}
        lead="CompQsoft holds a prime position on the DISA ENCORE III small business track."
      />

      {page && <PageProse blocks={page.blocks} practice={PRACTICE} />}

      <CtaBand practice={PRACTICE} title="Buying through ENCORE III?" />
    </main>
  );
}
