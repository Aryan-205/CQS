import type { Metadata } from "next";
import { pageFor, seoFor } from "@/lib/content";
import { CtaBand, Hero } from "@/components/sections";
import { PageProse } from "@/components/page-content";
import { bannerFor } from "@/lib/media";

const PRACTICE = "government" as const;
const PATH = "/dlajets";
const seo = seoFor(PATH);

export const metadata: Metadata = {
  title: { absolute: seo?.title ?? "DLA JETS 2.0 - CompQsoft" },
  description: seo?.description ?? "Defense Logistics Agency J6 Enterprise Technology Services, unrestricted track.",
  alternates: { canonical: PATH },
};

export default function DlajetsPage() {
  const page = pageFor(PATH);

  return (
    <main>
      <Hero
        image={bannerFor(PATH)}
        compact
        practice={PRACTICE}
        eyebrow="Contract vehicle"
        title={page?.title?.replace(/\s*-\s*CompQsoft$/, "") ?? "DLA JETS 2.0"}
        lead="Defense Logistics Agency J6 Enterprise Technology Services, unrestricted track."
      />

      {page && <PageProse blocks={page.blocks} practice={PRACTICE} />}

      <CtaBand practice={PRACTICE} title="Buying through DLA JETS?" />
    </main>
  );
}
