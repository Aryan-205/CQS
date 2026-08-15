import type { Metadata } from "next";
import { pageFor, seoFor } from "@/lib/content";
import {
  CtaBand,
  Hero,
  IdentifierStrip,
  Intro,
  LogoWall,
  TextLink,
} from "@/components/sections";
import {
  bannerFor,
  certificationLogos,
  federalCaseStudyLogos,
  idiqLogos,
} from "@/lib/media";

const PRACTICE = "government" as const;
const PATH = "/compliance";
const seo = seoFor(PATH);

/**
 * The "CompQsoft Information" block, restructured.
 *
 * The archive renders these as four bare H4s with their labels dropped, so a
 * reader gets `KTU8QJE27RN8` at 24px with nothing saying it is the UEI. Here
 * each code is paired with its label and set at reference size. NAICS is
 * added from content.md:79 — a contracting officer checking a UEI wants the
 * primary code in the same glance.
 */
const IDENTIFIERS = [
  { label: "UEI", value: "KTU8QJE27RN8" },
  { label: "CAGE Code", value: "1TTA2" },
  { label: "FEIN (Tax ID)", value: "76-0554431" },
  { label: "DUNS", value: "140460283" },
  { label: "Primary NAICS", value: "541512" },
] as const;

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

      <IdentifierStrip
        eyebrow="CompQsoft information"
        title="Registrations and identifiers"
        lead="Everything needed to look us up, verify a registration or put us on a solicitation."
        identifiers={IDENTIFIERS}
        practice={PRACTICE}
      />

      {/* The three walls a contracting officer is actually here for — the
          vehicles we hold, the programmes we have run on them, and the
          certificates behind both — each as its own artwork. */}
      <LogoWall
        tone="tint"
        eyebrow="Contract vehicles"
        title="CompQsoft IDIQ contracts"
        lead="Five prime IDIQ positions an agency can order against without running a new competition."
        items={idiqLogos.map((vehicle) => ({
          name: vehicle.label,
          logo: vehicle,
          href: vehicle.href,
        }))}
        columns={5}
        practice={PRACTICE}
      />

      <LogoWall
        eyebrow="Past performance"
        title="Programmes we have delivered"
        items={federalCaseStudyLogos.map((study) => ({
          name: study.label,
          logo: study,
          href: `/case-study/${study.slug}`,
        }))}
        columns={6}
        practice={PRACTICE}
        action={{ label: "All case studies", href: "/case-studies" }}
      />

      <LogoWall
        tone="tint"
        eyebrow="Certifications"
        title="Independently appraised and certified"
        lead="Delivery runs under independently audited management systems. Each mark below is the certificate as issued."
        items={certificationLogos.map((cert) => ({
          name: cert.label,
          logo: cert,
        }))}
        columns={6}
        practice={PRACTICE}
      />

      {/* The archive's prose for this page is nothing but the three sections
          above repeated as headings and links, plus this one. Rendering it
          again would duplicate the whole page, so only this survives. */}
      <Intro
        practice={PRACTICE}
        eyebrow="Sustainability and transparency"
        title="Our greenhouse gas emissions disclosure"
      >
        <p className="text-base text-body">
          We publish our emissions reporting alongside the compliance record,
          on the same footing as any other disclosure a buyer is entitled to
          check.
        </p>
        <p>
          <TextLink href="/ghgemissions">Read the disclosure</TextLink>
        </p>
      </Intro>

      <CtaBand practice={PRACTICE} title="Questions about our compliance posture?" />
    </main>
  );
}
