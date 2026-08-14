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

export default function AboutPage() {
  const page = pageFor(PATH);

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
      />

      <CardGrid eyebrow="Why CompQsoft" title="Why teams choose us" cards={WHY} columns={4} />

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

      {/* The set-asides have no mark of their own — they are a registration
          status, not a certificate — so they stay as pills beneath the wall. */}
      <CertStrip
        title="Socio-economic status"
        items={["HUBZone Small Business", "Minority-Owned", "Small Business"]}
      />

      <PartnerGrid
        eyebrow="Alliances"
        title="Our technology partnerships"
        logos={partnerLogos}
        action={{ label: "All alliance partners", href: "/alliance-partners" }}
      />

      {page && <PageProse blocks={page.blocks} eyebrow="In detail" />}

      <CtaBand
        title="Ready to elevate your IT strategy?"
        lead="From strategic consulting to leading-edge technologies, we enable experiences that transform organizations for success."
      />
    </main>
  );
}
