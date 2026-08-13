import type { Metadata } from "next";
import { caseStudies, pageFor, seoFor } from "@/lib/content";
import {
  CardGrid,
  CertStrip,
  Counters,
  CtaBand,
  Hero,
  Intro,
  ProcessSteps,
  SpecTable,
} from "@/components/sections";
import { PageProse } from "@/components/page-content";
import { bannerFor } from "@/lib/media";

const PRACTICE = "government" as const;
const PATH = "/government-it-services";
const seo = seoFor(PATH);

export const metadata: Metadata = {
  title: { absolute: seo?.title ?? "Government IT Services and Consulting | CompQsoft" },
  description: seo?.description,
  alternates: { canonical: PATH },
};

/** Core competencies, stated verbatim on the live page (content.md:870). */
const COMPETENCIES = [
  {
    title: "Unified Communications",
    description:
      "VoIP and AV/VTC support for DISA, DeCA and Joint Service Provider, including 24/7 VIP support for Pentagon flag officers and SES over NIPR, SIPR, JWICS and Allied SECRET networks.",
    href: "/services/modern-workplace",
  },
  {
    title: "Network Management & Engineering",
    description:
      "Prime contracts with DISA, Navy, Coast Guard and DeCA. Zero Trust architectures, DISN/DODIN transport, ICAM incorporation and network consolidation.",
    href: "/services/cyber-security-services",
  },
  {
    title: "IA / Cybersecurity",
    description:
      "RMF and A&A execution, ATO and ongoing-authorization maintenance across seven USCG aviation logistics applications and Navy submarine logistics systems.",
    href: "/services/cyber-security-services",
  },
  {
    title: "Software Development & Engineering",
    description:
      "DevSecOps and Agile/Scrum delivery on USCG ALC ISD systems — ALMIS, CG-LIMS, SAM — and Navy SUBMEPP.",
    href: "/services/application-modernization",
  },
];

const VEHICLES = [
  { label: "DISA ENCORE III SB", value: "Small business track" },
  { label: "NITAAC CIO-SP3", value: "HUBZone on-ramp · task areas 1,2,4,5,6,7,8,9,10" },
  { label: "OASIS SB", value: "Pool 3" },
  { label: "CMS SPARC", value: "Prime" },
  { label: "DLA JETS 2.0", value: "Unrestricted" },
  { label: "GSA Schedule 70", value: "SIN 13251" },
  { label: "Army ACCENT BOA", value: "Prime" },
  { label: "UEI", value: "KTU8QJE27RN8" },
  { label: "CAGE", value: "1TTA2" },
];

const AGENCIES = [
  "US Coast Guard",
  "DISA",
  "DHS",
  "US Navy",
  "DeCA",
  "DLA",
  "CDC",
  "DOE Oak Ridge",
];

export default function GovernmentPage() {
  const page = pageFor(PATH);
  const governmentCases = caseStudies.slice(0, 3);

  return (
    <main>
      <Hero
        image={bannerFor(PATH)}
        practice={PRACTICE}
        eyebrow="Government"
        title="Preferred IT services and engineering partner for government"
        lead="For nearly three decades, CompQsoft has delivered IT services and consulting to Federal agencies, as well as state and local governments — as a prime contractor, across 240+ locations."
        actions={[
          { label: "View contract vehicles", href: "/primecontracts" },
          { label: "Compliance", href: "/compliance" },
        ]}
      />

      <Intro
        tone="tint"
        practice={PRACTICE}
        eyebrow="Who we serve"
        title="Leading IT services and consulting for government agencies"
      >
        <p>
          We have proudly served multiple Federal agencies, including the Army,
          Navy, Air Force and Marines within the Department of Defense. As a
          prime contractor, we understand the intricacies and demands of
          today&rsquo;s dynamic landscape.
        </p>
      </Intro>

      <CardGrid
        practice={PRACTICE}
        eyebrow="Core competencies"
        title="At CompQsoft, we specialize in the following"
        cards={COMPETENCIES}
        columns={2}
      />

      <SpecTable
        tone="tint"
        practice={PRACTICE}
        title="Contract vehicles and identifiers"
        rows={VEHICLES}
      />

      <Counters
        title="Speaking by numbers"
        practice={PRACTICE}
        stats={[
          { value: "28", suffix: "+", label: "Years of Delivering Excellence" },
          { value: "240", suffix: "+", label: "Locations" },
          { value: "200", suffix: "+", label: "Global Customers" },
        ]}
      />

      <ProcessSteps
        tone="tint"
        practice={PRACTICE}
        eyebrow="Q Methodology"
        title="How we deliver"
        steps={[
          {
            title: "Comprehensive Assessment",
            description:
              "We map the current environment, mission constraints and accreditation posture first.",
          },
          {
            title: "Customized Solution Development",
            description:
              "Designed against your requirements and your authorization boundary.",
          },
          {
            title: "Scalable Implementation",
            description:
              "DevSecOps and Agile/Scrum with CI/CD, RMF and STIG compliance throughout.",
          },
          {
            title: "Ongoing Support and Optimization",
            description:
              "ITSM-based sustainment keeps accreditation continuous after go-live.",
          },
        ]}
      />

      <CardGrid
        eyebrow="Past performance"
        title="Case studies"
        practice={PRACTICE}
        cards={governmentCases.map((study) => ({
          title: study.title,
          href: `/case-study/${study.slug}`,
        }))}
      />

      <CertStrip
        tone="tint"
        practice={PRACTICE}
        title="Named customers"
        items={AGENCIES}
      />

      {/* Full verbatim copy from the live page, below the structured summary. */}
      {page && (
        <PageProse
          blocks={page.blocks}
          practice={PRACTICE}
          eyebrow="In detail"
        />
      )}

      <CtaBand
        practice={PRACTICE}
        title="Need a partner who already holds the vehicle?"
        lead="We can be on contract quickly through DISA ENCORE III, CIO-SP3, OASIS SB Pool 3, CMS SPARC or DLA JETS 2.0."
      />
    </main>
  );
}
