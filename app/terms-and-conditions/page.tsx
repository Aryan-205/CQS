import type { Metadata } from "next";
import { pageFor, seoFor } from "@/lib/content";
import { CtaBand, Hero } from "@/components/sections";
import { PageProse } from "@/components/page-content";

const PRACTICE = "neutral" as const;
const PATH = "/terms-and-conditions";
const seo = seoFor(PATH);

export const metadata: Metadata = {
  title: { absolute: seo?.title ?? "Terms and Conditions - CompQsoft" },
  description: seo?.description ?? "The terms governing use of this website.",
  alternates: { canonical: PATH },
};

export default function TermsAndConditionsPage() {
  const page = pageFor(PATH);

  return (
    <main>
      <Hero
        compact
        practice={PRACTICE}
        eyebrow="Legal"
        title={page?.title?.replace(/\s*-\s*CompQsoft$/, "") ?? "Terms and Conditions"}
        lead="The terms governing use of this website."
      />

      {page && <PageProse blocks={page.blocks} practice={PRACTICE} />}

      <CtaBand practice={PRACTICE} title="Questions?" />
    </main>
  );
}
