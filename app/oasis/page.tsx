import type { Metadata } from "next";
import { pageFor, seoFor } from "@/lib/content";
import { CtaBand, Hero } from "@/components/sections";
import { PageProse } from "@/components/page-content";

const PRACTICE = "government" as const;
const PATH = "/oasis";
const seo = seoFor(PATH);

export const metadata: Metadata = {
  title: { absolute: seo?.title ?? "OASIS - CompQsoft" },
  description: seo?.description ?? "One Acquisition Solution for Integrated Services — Small Business, Pool 3.",
  alternates: { canonical: PATH },
};

export default function OasisPage() {
  const page = pageFor(PATH);

  return (
    <main>
      <Hero
        compact
        practice={PRACTICE}
        eyebrow="Contract vehicle"
        title={page?.title?.replace(/\s*-\s*CompQsoft$/, "") ?? "OASIS"}
        lead="One Acquisition Solution for Integrated Services — Small Business, Pool 3."
      />

      {page && <PageProse blocks={page.blocks} practice={PRACTICE} />}

      <CtaBand practice={PRACTICE} title="Buying through OASIS?" />
    </main>
  );
}
