import type { Metadata } from "next";
import { pageFor, seoFor } from "@/lib/content";
import { CtaBand, Hero } from "@/components/sections";
import { PageProse } from "@/components/page-content";

const PRACTICE = "neutral" as const;
const PATH = "/life-at-compqsoft";
const seo = seoFor(PATH);

export const metadata: Metadata = {
  title: { absolute: seo?.title ?? "Life at CompQsoft - CompQsoft" },
  description: seo?.description ?? "Our values, our benefits, and what it is like to build a career here.",
  alternates: { canonical: PATH },
};

export default function LifeAtCompqsoftPage() {
  const page = pageFor(PATH);

  return (
    <main>
      <Hero
        compact
        practice={PRACTICE}
        eyebrow="Careers"
        title={page?.title?.replace(/\s*-\s*CompQsoft$/, "") ?? "Life at CompQsoft"}
        lead="Our values, our benefits, and what it is like to build a career here."
      />

      {page && <PageProse blocks={page.blocks} practice={PRACTICE} />}

      <CtaBand practice={PRACTICE} title="See our open positions" />
    </main>
  );
}
