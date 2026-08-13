import type { Metadata } from "next";
import { pageFor, seoFor } from "@/lib/content";
import { CtaBand, Hero } from "@/components/sections";
import { PageProse } from "@/components/page-content";
import { bannerFor } from "@/lib/media";

const PRACTICE = "neutral" as const;
const PATH = "/unsubscribe";
const seo = seoFor(PATH);

export const metadata: Metadata = {
  title: { absolute: seo?.title ?? "Unsubscribe - CompQsoft" },
  description: seo?.description ?? "Remove your address from CompQsoft mailing lists.",
  alternates: { canonical: PATH },
};

export default function UnsubscribePage() {
  const page = pageFor(PATH);

  return (
    <main>
      <Hero
        image={bannerFor(PATH)}
        compact
        practice={PRACTICE}
        eyebrow="Legal"
        title={page?.title?.replace(/\s*-\s*CompQsoft$/, "") ?? "Unsubscribe"}
        lead="Remove your address from CompQsoft mailing lists."
      />

      {page && <PageProse blocks={page.blocks} practice={PRACTICE} />}

      <CtaBand practice={PRACTICE} title="Need something else?" />
    </main>
  );
}
