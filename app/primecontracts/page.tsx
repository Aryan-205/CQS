import type { Metadata } from "next";
import { pageFor, seoFor } from "@/lib/content";
import { CtaBand, Hero, LogoWall } from "@/components/sections";
import { ContractGrid, SubContracts } from "@/components/contract-grid";
import { bannerFor, idiqLogos } from "@/lib/media";

const PRACTICE = "government" as const;
const PATH = "/primecontracts";
const seo = seoFor(PATH);

/**
 * content.md:1175 — names only, no links on the old site, and the parsed
 * capture drops link-less list items, so they live here.
 */
const SUB_CONTRACTS = [
  "Alliant",
  "Army Enterprise Systems Integration Program",
  "DHS Enterprise Acquisition Gateway for Leading-Edge Solutions (EAGLE)",
  "FBI Information Technology Supplies and Support Services (ITSSS)",
  "Information Services- Small Business (ITS-SB)",
  "Navy Information Operation Command (NIOC) Norfolk (NIOC-N)",
  "Network-Centric Solutions (NETCENTS)",
  "NIH Chief Information Officers – Solutions and Partners 3 (CIO-SP3)",
  "PEO EIS Information Technology Enterprise Solutions – 2 Services",
  "Rapid Response – 3rd Generation (R2-3G)",
  "SOCOM Special Operations Forces Information Technology Enterprise Contracts (SITEC)",
  "SPAWAR Integrated C2 Support Services For Command Centers (C2)",
  "USSTRATCOM Systems and Missions Support (USAMS II)",
];

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

      {page && (
        <ContractGrid
          blocks={page.blocks}
          eyebrow="Prime awards"
          title="Contracts held as prime"
          practice={PRACTICE}
        />
      )}

      <SubContracts items={SUB_CONTRACTS} practice={PRACTICE} />

      <CtaBand practice={PRACTICE} title="Need us on contract?" />
    </main>
  );
}
