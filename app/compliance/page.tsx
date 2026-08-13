import type { Metadata } from "next";
import { pageFor, seoFor } from "@/lib/content";
import { CtaBand, Hero } from "@/components/sections";
import { PageProse } from "@/components/page-content";
import { bannerFor } from "@/lib/media";

const PRACTICE = "government" as const;
const PATH = "/compliance";
const seo = seoFor(PATH);

export const metadata: Metadata = {
  title: { absolute: seo?.title ?? "Compliance - CompQsoft" },
  description: seo?.description ?? "Our certifications, accreditation practice and the standards we deliver against.",
  alternates: { canonical: PATH },
};

export default function CompliancePage() {
  const page = pageFor(PATH);

  return (
    <main>
      <Hero
        image={bannerFor(PATH)}
        compact
        practice={PRACTICE}
        eyebrow="Government"
        title={page?.title?.replace(/\s*-\s*CompQsoft$/, "") ?? "Compliance"}
        lead="Our certifications, accreditation practice and the standards we deliver against."
      />

      {page && <PageProse blocks={page.blocks} practice={PRACTICE} />}

      <CtaBand practice={PRACTICE} title="Questions about our compliance posture?" />
    </main>
  );
}
