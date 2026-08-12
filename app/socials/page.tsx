import type { Metadata } from "next";
import { pageFor, seoFor } from "@/lib/content";
import { CtaBand, Hero } from "@/components/sections";
import { PageProse } from "@/components/page-content";

const PRACTICE = "neutral" as const;
const PATH = "/socials";
const seo = seoFor(PATH);

export const metadata: Metadata = {
  title: { absolute: seo?.title ?? "Socials - CompQsoft" },
  description: seo?.description ?? "Where to find CompQsoft across social platforms.",
  alternates: { canonical: PATH },
};

export default function SocialsPage() {
  const page = pageFor(PATH);

  return (
    <main>
      <Hero
        compact
        practice={PRACTICE}
        eyebrow="Corporate"
        title={page?.title?.replace(/\s*-\s*CompQsoft$/, "") ?? "Socials"}
        lead="Where to find CompQsoft across social platforms."
      />

      {page && <PageProse blocks={page.blocks} practice={PRACTICE} />}

      <CtaBand practice={PRACTICE} title="Get in touch" />
    </main>
  );
}
