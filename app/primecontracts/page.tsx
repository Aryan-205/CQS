import type { Metadata } from "next";
import { pageFor, seoFor } from "@/lib/content";
import { CtaBand, Hero } from "@/components/sections";
import { PageProse } from "@/components/page-content";
import { bannerFor } from "@/lib/media";

const PRACTICE = "government" as const;
const PATH = "/primecontracts";
const seo = seoFor(PATH);

export const metadata: Metadata = {
  title: { absolute: seo?.title ?? "Prime Contracts - CompQsoft" },
  description: seo?.description ?? "The vehicles CompQsoft holds as a prime contractor, and how to buy from us today.",
  alternates: { canonical: PATH },
};

export default function PrimecontractsPage() {
  const page = pageFor(PATH);

  return (
    <main>
      <Hero
        image={bannerFor(PATH)}
        compact
        practice={PRACTICE}
        eyebrow="Contract vehicles"
        title={page?.title?.replace(/\s*-\s*CompQsoft$/, "") ?? "Prime Contracts"}
        lead="The vehicles CompQsoft holds as a prime contractor, and how to buy from us today."
      />

      {page && <PageProse blocks={page.blocks} practice={PRACTICE} />}

      <CtaBand practice={PRACTICE} title="Need us on contract?" />
    </main>
  );
}
