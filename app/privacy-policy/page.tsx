import type { Metadata } from "next";
import { pageFor, seoFor } from "@/lib/content";
import { CtaBand, Hero } from "@/components/sections";
import { PageProse } from "@/components/page-content";
import { bannerFor } from "@/lib/media";

const PRACTICE = "neutral" as const;
const PATH = "/privacy-policy";
const seo = seoFor(PATH);

export const metadata: Metadata = {
  title: { absolute: seo?.title ?? "Privacy Policy - CompQsoft" },
  description: seo?.description ?? "How CompQsoft collects, uses and protects personal information.",
  alternates: { canonical: PATH },
};

export default function PrivacyPolicyPage() {
  const page = pageFor(PATH);

  return (
    <main>
      <Hero
        image={bannerFor(PATH)}
        compact
        practice={PRACTICE}
        eyebrow="Legal"
        title={page?.title?.replace(/\s*-\s*CompQsoft$/, "") ?? "Privacy Policy"}
        lead="How CompQsoft collects, uses and protects personal information."
      />

      {page && <PageProse blocks={page.blocks} practice={PRACTICE} />}

      <CtaBand practice={PRACTICE} title="Questions about your data?" />
    </main>
  );
}
