import type { Metadata } from "next";
import { pageFor, seoFor } from "@/lib/content";
import { CtaBand, Hero, LogoWall } from "@/components/sections";
import { PageProse } from "@/components/page-content";
import {
  bannerFor,
  certificationLogos,
  federalCaseStudyLogos,
  idiqLogos,
} from "@/lib/media";

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

      {/* The three walls a contracting officer is actually here for — the
          vehicles we hold, the programmes we have run on them, and the
          certificates behind both — each as its own artwork rather than as a
          line of type in the prose below. */}
      <LogoWall
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
        tone="tint"
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

      {page && <PageProse blocks={page.blocks} practice={PRACTICE} />}

      <CtaBand practice={PRACTICE} title="Questions about our compliance posture?" />
    </main>
  );
}
