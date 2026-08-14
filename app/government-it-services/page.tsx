import type { Metadata } from "next";
import type { PageBlock } from "@/lib/content";
import { caseStudies, pageFor, seoFor } from "@/lib/content";
import { CtaBand, LogoWall, PartnerGrid } from "@/components/sections";
import { Counters } from "@/components/counters";
import {
  ApproachSteps,
  AssuranceBand,
  EditorialGrid,
  MediaSplit,
  PageHero,
  Pager,
  SpecList,
} from "@/components/editorial/sections";
import { Assess, Blueprint, Layers, Lifecycle } from "@/components/icons";
import {
  agencySeals,
  bannerFor,
  caseStudyImage,
  certificationLogos,
  customerLogos,
  partnerLogos,
  serviceBanner,
} from "@/lib/media";

const PRACTICE = "government" as const;
const PATH = "/government-it-services";
const seo = seoFor(PATH);

export const metadata: Metadata = {
  title: { absolute: seo?.title ?? "Government IT Services and Consulting | CompQsoft" },
  description: seo?.description,
  alternates: { canonical: PATH },
};

/**
 * The four core competencies, each a full section of the live page. The copy
 * is rendered from content.md rather than restated here — only the picture,
 * the onward link and the running order are decided in this file.
 */
const COMPETENCIES = [
  {
    heading: "Unified Communications",
    image: serviceBanner("modern-workplace"),
    action: { label: "Modern workplace", href: "/services/modern-workplace" },
  },
  {
    heading: "Network Management and Engineering",
    image: serviceBanner("cloud-migration-and-modernization"),
    action: {
      label: "Cloud migration and modernization",
      href: "/services/cloud-migration-and-modernization",
    },
  },
  {
    heading: "IA/Cybersecurity",
    image: serviceBanner("cyber-security-services"),
    action: { label: "Cyber security services", href: "/services/cyber-security-services" },
  },
  {
    heading: "Software Development and Engineering",
    image: serviceBanner("application-modernization"),
    action: {
      label: "Application modernization",
      href: "/services/application-modernization",
    },
  },
];

/** Verbatim from the live page's "Our Process" section (content.md). */
const PROCESS = [
  {
    title: "Comprehensive Assessment",
    description:
      "By understanding your specific needs and goals, we can tailor our solutions to address your unique requirements.",
    icon: <Assess className="h-12 w-12" />,
  },
  {
    title: "Customized Solution Development",
    description:
      "We develop customized solutions based on the assessment, leveraging our expertise and industry best practices.",
    icon: <Blueprint className="h-12 w-12" />,
  },
  {
    title: "Scalable and Efficient Implementation",
    description:
      "We ensure a smooth implementation of the solutions, considering scalability and efficiency.",
    icon: <Layers className="h-12 w-12" />,
  },
  {
    title: "Ongoing Support and Optimization",
    description:
      "Our team continually monitors and optimizes the implemented solutions, keeping them updated with industry trends and technological advancements.",
    icon: <Lifecycle className="h-12 w-12" />,
  },
];

/**
 * Past performance, verbatim from "Our Success Stories at Federal Agencies".
 * Each row carries its agency's seal — the same five marks the live page runs.
 */
const SUCCESS = [
  {
    label: "DoD",
    logo: agencySeals.dod,
    value:
      "Provide Unified Communication services within the DoD — transitioned from 7k communication actions per month to over 70k per month since the COVID pandemic.",
  },
  {
    label: "Defense Commissary Agency",
    logo: agencySeals.deca,
    value: "IT services at 240+ global locations for warfighters.",
  },
  {
    label: "USCG",
    logo: agencySeals.uscg,
    value:
      "Provide E2E ITSM capabilities in the maintenance of the USCG's Aviation Logistics Systems.",
  },
  {
    label: "Navy",
    logo: agencySeals.navy,
    value:
      "Provide E2E ITSM capabilities in the maintenance of the tools and systems required to ensure the readiness of our submarine fleet.",
  },
  {
    label: "DISA",
    logo: agencySeals.disa,
    value:
      "Design and development of next-generation network capabilities in support of the DoD's communications infrastructure.",
  },
];

/** Vehicles we can be on contract through, plus the registrations. */
const VEHICLES = [
  "DISA ENCORE III SB",
  "NITAAC CIO-SP3",
  "OASIS SB Pool 3",
  "CMS SPARC",
  "DLA JETS 2.0",
  "GSA Schedule 70 · SIN 13251",
  "Army ACCENT BOA",
];

const IDENTIFIERS = [
  { label: "UEI", value: "KTU8QJE27RN8" },
  { label: "CAGE", value: "1TTA2" },
  { label: "NAICS", value: "541512" },
];

/** Current revisions. The archive still cites the superseded ones. */
const CERTIFICATIONS = [
  "CMMI Level 3",
  "ISO 9001:2015",
  "ISO/IEC 27001:2013",
  "ISO/IEC 20000-1:2011",
];

/**
 * The run of blocks belonging to one section of the archived page: everything
 * between its heading and the next boundary heading. Boundaries are named
 * rather than inferred from heading level, because the archive nests the four
 * competencies at two different levels.
 */
const BOUNDARIES = [
  ...COMPETENCIES.map((c) => c.heading),
  "At CompQsoft, we specialize in the following core competencies",
  "Our Process",
  "Our Success Stories at Federal Agencies",
];

function sectionBlocks(blocks: PageBlock[], heading: string): PageBlock[] {
  const start = blocks.findIndex(
    (b) => b.type === "heading" && b.text.trim() === heading,
  );
  if (start === -1) return [];

  const rest = blocks.slice(start + 1);
  const end = rest.findIndex(
    (b) => b.type === "heading" && BOUNDARIES.includes(b.text.trim()),
  );
  return end === -1 ? rest : rest.slice(0, end);
}

/** Section copy inside a split: one lead paragraph, then the detail. */
function Detail({ blocks }: { blocks: PageBlock[] }) {
  const copy = blocks.filter(
    (block) => block.type === "para" || block.type === "heading",
  );
  if (!copy.length) return null;

  let seenPara = false;
  return (
    <>
      {copy.map((block, i) => {
        if (block.type === "heading") {
          return (
            <h3 key={i} className="pt-6 text-h4 text-ink">
              {block.text.replace(/:$/, "")}
            </h3>
          );
        }
        const lead = !seenPara;
        seenPara = true;
        return (
          <p key={i} className={lead ? "text-lg text-body" : "text-base text-body"}>
            {block.text}
          </p>
        );
      })}
    </>
  );
}

export default function GovernmentPage() {
  const page = pageFor(PATH);
  const blocks = page?.blocks ?? [];
  const intro = sectionBlocks(
    blocks,
    "Leading IT Services & Consulting for Government Agencies",
  );
  const governmentCases = caseStudies.slice(0, 3);

  return (
    <main>
      <PageHero
        eyebrow="Government"
        title="The preferred IT services and engineering partner for government"
        image={bannerFor(PATH)}
        practice={PRACTICE}
        actions={[
          { label: "View contract vehicles", href: "/primecontracts" },
          { label: "Compliance", href: "/compliance" },
        ]}
      />

      <MediaSplit
        eyebrow="Who we serve"
        title="Leading IT services and consulting for government agencies"
        image={{
          src: bannerFor("/about-us") ?? "",
          alt: "CompQsoft delivery team",
        }}
        pills={CERTIFICATIONS}
        action={{ label: "How we stay compliant", href: "/compliance" }}
        practice={PRACTICE}
      >
        <Detail blocks={intro} />
      </MediaSplit>

      <Counters
        eyebrow="Speaking by numbers"
        title="Twenty-eight years as a prime, across 240+ locations"
        stats={[
          { value: "28", suffix: "+", label: "Years of Delivering Excellence" },
          { value: "240", suffix: "+", label: "Locations" },
          { value: "200", suffix: "+", label: "Global Customers" },
        ]}
        practice={PRACTICE}
      />

      {/* The four competencies, alternating side to side down the page. */}
      {COMPETENCIES.map((competency, i) => {
        const body = sectionBlocks(blocks, competency.heading);
        if (!body.length || !competency.image) return null;
        return (
          <MediaSplit
            key={competency.heading}
            eyebrow={i === 0 ? "Core competencies" : undefined}
            title={competency.heading}
            image={{ src: competency.image, alt: "" }}
            reverse={i % 2 === 0}
            tone={i % 2 === 0 ? "tint" : "white"}
            action={competency.action}
            practice={PRACTICE}
          >
            <Detail blocks={body} />
          </MediaSplit>
        );
      })}

      <AssuranceBand
        eyebrow="Contract vehicles"
        title="We can be on contract quickly"
        lead="CompQsoft holds prime positions on the vehicles below, so an agency that needs work started does not have to wait on a new competition. The registrations a contracting officer checks first are here, not buried in a capability statement."
        certifications={VEHICLES}
        identifiers={IDENTIFIERS}
        image={{ src: bannerFor("/compliance") ?? "", alt: "" }}
        practice={PRACTICE}
      />

      <SpecList
        eyebrow="Past performance"
        title="Success stories at federal agencies"
        rows={SUCCESS}
        action={{ label: "All case studies", href: "/case-studies" }}
        practice={PRACTICE}
      />

      <ApproachSteps
        eyebrow="Q Methodology"
        title="How we deliver"
        lead="The same four stages on every contract — assessment before proposal, delivery inside the authorization boundary, sustainment that keeps accreditation continuous."
        steps={PROCESS}
        practice={PRACTICE}
      />

      <EditorialGrid
        eyebrow="Proof"
        title="Case studies"
        cards={governmentCases.map((study) => ({
          href: `/case-study/${study.slug}`,
          image: caseStudyImage(study),
          title: study.title,
          cta: "Read the case study",
        }))}
        practice={PRACTICE}
      />

      <LogoWall
        eyebrow="Named customers"
        title="Agencies we support"
        lead="Direct prime and subcontract delivery across the Department of Defense, DHS, HHS and the civilian research estate."
        items={customerLogos.map((customer) => ({
          name: customer.name,
          logo: customer.logo,
        }))}
        columns={4}
        practice={PRACTICE}
      />

      <PartnerGrid
        tone="tint"
        practice={PRACTICE}
        eyebrow="Alliances"
        title="Our technology partnerships"
        logos={partnerLogos}
        action={{ label: "All alliance partners", href: "/alliance-partners" }}
      />

      <LogoWall
        eyebrow="Certifications"
        title="Appraised and certified"
        lead="Delivery runs under independently audited management systems. The appraisal and certificate marks are below, as issued."
        items={certificationLogos.map((cert) => ({
          name: cert.label,
          logo: cert,
        }))}
        columns={6}
        practice={PRACTICE}
      />

      <Pager
        items={[
          { title: "Prime contracts and vehicles", href: "/primecontracts" },
          { title: "Commercial practice", href: "/technologygroup" },
        ]}
        practice={PRACTICE}
      />

      <CtaBand
        practice={PRACTICE}
        title="Need a partner who already holds the vehicle?"
        lead="We can be on contract quickly through DISA ENCORE III, CIO-SP3, OASIS SB Pool 3, CMS SPARC or DLA JETS 2.0."
      />
    </main>
  );
}
