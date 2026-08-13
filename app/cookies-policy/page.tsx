import type { Metadata } from "next";
import { pageFor, seoFor } from "@/lib/content";
import { CtaBand, Hero } from "@/components/sections";
import { PageProse } from "@/components/page-content";
import { bannerFor } from "@/lib/media";

const PRACTICE = "neutral" as const;
const PATH = "/cookies-policy";
const seo = seoFor(PATH);

export const metadata: Metadata = {
  title: { absolute: seo?.title ?? "Cookies Policy - CompQsoft" },
  description: seo?.description ?? "How this site uses cookies and how to control them.",
  alternates: { canonical: PATH },
};

export default function CookiesPolicyPage() {
  const page = pageFor(PATH);

  return (
    <main>
      <Hero
        image={bannerFor(PATH)}
        compact
        practice={PRACTICE}
        eyebrow="Legal"
        title={page?.title?.replace(/\s*-\s*CompQsoft$/, "") ?? "Cookies Policy"}
        lead="How this site uses cookies and how to control them."
      />

      {page && <PageProse blocks={page.blocks} practice={PRACTICE} />}

      <CtaBand practice={PRACTICE} title="Questions about your data?" />
    </main>
  );
}
