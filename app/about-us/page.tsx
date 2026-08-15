import type { Metadata } from "next";
import { leaderRole, leadership, pageFor, seoFor } from "@/lib/content";
import {
  CardGrid,
  CertStrip,
  Counters,
  CtaBand,
  Hero,
  Intro,
  LogoWall,
  PartnerGrid,
  PeopleGrid,
} from "@/components/sections";
import { PageProse } from "@/components/page-content";
import { Briefcase, People, ShieldCheck } from "@/components/icons";
import {
  bannerFor,
  certificationLogos,
  customerLogos,
  partnerLogos,
} from "@/lib/media";

const PATH = "/about-us";
const seo = seoFor(PATH);

export const metadata: Metadata = {
  title: seo?.title ?? "About us",
  description:
    seo?.description ??
    "CompQsoft is a CMMI Level 3 certified digital platform and IT services company, technology partner to the government and commercial sectors for 28 years.",
  alternates: { canonical: PATH },
};

/** The four core values, verbatim from content.md:750. */
const VALUES = [
  {
    title: "Excellence Delivered",
    description:
      "We use our “Q” Methodology to produce high-quality output that meets our client’s requirements.",
  },
  {
    title: "Proactive Problem Solving",
    description:
      "Our highly skilled employees utilize their full capabilities to identify and resolve obstacles.",
  },
  {
    title: "Culture of Dignity and Respect",
    description:
      "Respect is critical to any human endeavor, and we consider it a basic company tenet.",
  },
  {
    title: "Customer-Centered Success",
    description:
      "We are successful only when we achieve success for our customers. This is the focus of all we do.",
  },
];

const WHY = [
  {
    title: "High-Quality Performance",
    description:
      "We provide high-quality software development and engineering services, built on repeatable process rather than heroics.",
  },
  {
    title: "Commitment to Excellence",
    description:
      "Our ISO and CMMI Level 3 certifications enable us to deliver excellence consistently across programmes.",
  },
  {
    title: "Industry Expertise",
    description:
      "We combine industry knowledge, business process expertise, and tailored solutions to support your mission.",
  },
  {
    title: "Customer-Centric Focus",
    description:
      "We put customers first and at the center of everything we do.",
  },
];

/**
 * The set-aside registrations. Each line says what the status does in a
 * procurement rather than restating the label, because that is the question a
 * contracting officer arrives with. Sourced from content.md:46 and the
 * CIO-SP3 award record at content.md:1115.
 */
const SET_ASIDES = [
  {
    title: "HUBZone Small Business",
    description:
      "The status CompQsoft won its CIO-SP3 On-Ramp award under, in the HUBZone socio-economic category, across nine task areas.",
    icon: <ShieldCheck className="h-6 w-6" />,
  },
  {
    title: "Minority-Owned",
    description:
      "Founded and led by Madina Shaik, and minority-owned continuously since 1997.",
    icon: <People className="h-6 w-6" />,
  },
  {
    title: "Small Business",
    description:
      "Prime on small-business pools including DISA ENCORE III SB and OASIS SB Pool 3, under NAICS 541512.",
    icon: <Briefcase className="h-6 w-6" />,
  },
];

/**
 * The archive's own About page (content.md Section 4) repeats, as one long
 * column of headings, nearly everything the designed bands above already
 * render — the counters, the four values, the four differentiators, the
 * partner and certification walls, and the CTA. It also cites the superseded
 * ISO revisions this rebuild corrects. Rendering it whole produced a section
 * where a stat fragment ("28", "+") arrived at heading size and every value
 * appeared twice.
 *
 * So the band keeps only the two passages that appear nowhere else on the
 * page: the Q Methodology write-up and the social responsibility statement.
 * Both are verbatim.
 */
const DETAIL_SECTIONS = ["Our Methodology", "Our Social Responsibility"];

export default function AboutPage() {
  const page = pageFor(PATH);

  const detail = (page?.blocks ?? []).filter((block, i, blocks) => {
    // Walk back to the nearest H2 and keep the block only if that heading is
    // one of the two the band carries. Paragraphs alone are ambiguous —
    // several repeat under different headings.
    for (let j = i; j >= 0; j--) {
      const b = blocks[j];
      if (b.type === "heading" && b.level <= 2) {
        return DETAIL_SECTIONS.includes(b.text) && block.type !== "image";
      }
    }
    return false;
  });

  return (
    <main>
      <Hero
        image={bannerFor(PATH)}
        eyebrow="About us"
        title="Technology partner to the government and commercial sectors"
        lead="CompQsoft is a CMMI Level 3 certified digital platform and IT services company. Founded in 1997 in Houston as a minority-owned HUBZone small business, we now operate across 240+ locations."
        actions={[
          { label: "Meet the leadership team", href: "/leadership-team" },
          { label: "Contact us", href: "/contact-us" },
        ]}
      />

      <Intro tone="tint" eyebrow="Who we are" title="28 years, two practices, one standard">
        <p>
          We empower companies across industries and technology verticals to
          leverage Cloud, Data &amp; AI, App Modernization, Automation, and
          next-generation technologies like generative AI.
        </p>
        <p>
          Our expertise spans startups, commercial enterprises, and federal
          agencies, including the Department of Defense, and state and local
          governments. Our clientele includes the U.S. Coast Guard, the Defense
          Information Systems Agency, the U.S. Navy and the Defense Commissary
          Agency.
        </p>
      </Intro>

      <Counters
        title="Speaking by numbers"
        stats={[
          { value: "28", suffix: "+", label: "Years of Delivering Excellence" },
          { value: "240", suffix: "+", label: "Locations" },
          { value: "200", suffix: "+", label: "Global Customers" },
        ]}
      />

      <CardGrid
        tone="tint"
        eyebrow="Our values"
        title="What guides the CompQsoft team"
        lead="With our C5i methodology we prioritize communication, collaboration, cooperation, coordination and collegiality."
        cards={VALUES}
        columns={4}
        mark
      />

      <CardGrid
        eyebrow="Why CompQsoft"
        title="Why teams choose us"
        cards={WHY}
        columns={4}
        mark
      />

      <PeopleGrid
        tone="tint"
        eyebrow="Leadership"
        title="The people running the company"
        people={leadership.map((person) => ({
          name: person.title,
          role: leaderRole(person.slug),
          href: `/leadership-team/${person.slug}`,
          image: person.image,
        }))}
        columns={5}
        action={{ label: "Full leadership team", href: "/leadership-team" }}
      />

      <LogoWall
        eyebrow="Customers"
        title="Who we deliver for"
        lead="Our clientele spans the Department of Defense, federal health and civilian agencies, and commercial enterprises across the United States."
        items={customerLogos.map((customer) => ({
          name: customer.name,
          logo: customer.logo,
        }))}
        columns={4}
      />

      <LogoWall
        tone="tint"
        eyebrow="Certifications"
        title="Independently appraised and certified"
        items={certificationLogos.map((cert) => ({
          name: cert.label,
          logo: cert,
        }))}
        columns={6}
        action={{ label: "Our compliance posture", href: "/compliance" }}
      />

      {/* The set-asides carry no artwork of their own, so the band is built
          from the company's own mark and a line per status saying what it
          means when a contracting officer is checking whether they can buy. */}
      <CertStrip
        tone="tint"
        eyebrow="Socio-economic status"
        title="How CompQsoft is registered"
        lead="Founded in Houston in 1997 and registered ever since as a minority-owned HUBZone small business. The status is what puts CompQsoft on set-aside vehicles as a prime."
        mark
        items={SET_ASIDES}
      />

      <PartnerGrid
        eyebrow="Alliances"
        title="Our technology partnerships"
        logos={partnerLogos}
        action={{ label: "All alliance partners", href: "/alliance-partners" }}
      />

      {detail.length > 0 && (
        // No band title: the two passages carry their own H2s, and a third
        // heading over them would be the fourth hierarchy level in one band.
        <PageProse blocks={detail} eyebrow="In detail" layout="rail" />
      )}

      <CtaBand
        title="Ready to elevate your IT strategy?"
        lead="From strategic consulting to leading-edge technologies, we enable experiences that transform organizations for success."
      />
    </main>
  );
}
