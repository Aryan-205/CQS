import type { Metadata } from "next";
import { pageFor, seoFor } from "@/lib/content";
import { CtaBand, Hero, LogoWall } from "@/components/sections";
import { PageProse } from "@/components/page-content";
import { bannerFor, idiqLogos } from "@/lib/media";

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

      {/* The five vehicles with a page of their own, up front — the write-ups
          below run long, and a capture manager checking whether we hold one
          should not have to read to find out. */}
      <LogoWall
        eyebrow="Contract vehicles"
        title="IDIQ positions we hold as prime"
        items={idiqLogos.map((vehicle) => ({
          name: vehicle.label,
          logo: vehicle,
          href: vehicle.href,
        }))}
        columns={5}
        practice={PRACTICE}
      />

      {page && <PageProse blocks={page.blocks} practice={PRACTICE} showImages />}

      <CtaBand practice={PRACTICE} title="Need us on contract?" />
    </main>
  );
}
