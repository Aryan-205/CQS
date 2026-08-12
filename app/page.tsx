import type { Metadata } from "next";
import { blogs, caseStudies, seoFor } from "@/lib/content";
import {
  CardGrid,
  CertStrip,
  Counters,
  CtaBand,
  Hero,
  Intro,
  LogoStrip,
} from "@/components/sections";

const seo = seoFor("/");

export const metadata: Metadata = {
  title: { absolute: seo?.title ?? "CompQsoft: IT Services and Consulting Company" },
  description: seo?.description,
  alternates: { canonical: "/" },
};

/** Home service cards — content.md:617, the tabbed Government/Commercial grid. */
const GOVERNMENT_SERVICES = [
  {
    title: "Software Development & Engineering",
    description:
      "Build custom software solutions to innovate, streamline operations, and seamless digital transformation.",
    href: "/government-it-services",
  },
  {
    title: "Unified Communication",
    description:
      "Seamlessly integrate communication channels, enhance collaboration, and boost productivity with our unified communication solutions.",
    href: "/government-it-services",
  },
  {
    title: "Cybersecurity",
    description:
      "Protect critical assets and data from cyber threats with our comprehensive cybersecurity solutions, ensuring business continuity.",
    href: "/services/cyber-security-services",
  },
  {
    title: "Network Management and Engineering",
    description:
      "Optimize network performance, ensure reliability, and drive efficiency with our expert network management and engineering services.",
    href: "/government-it-services",
  },
];

const COMMERCIAL_SERVICES = [
  {
    title: "Cloud Services",
    description:
      "Elevate your business by migrating and modernizing your workloads to the cloud.",
    href: "/services/cloud-migration-and-modernization",
  },
  {
    title: "Application Modernization",
    description: "Modernize applications to unlock the full value of cloud.",
    href: "/services/application-modernization",
  },
  {
    title: "Data, Analytics and AI",
    description:
      "Leverage advanced analytics and AI to uncover deep insights, make data-driven decisions, and drive smarter business outcomes.",
    href: "/services/data-analytics-ai",
  },
  {
    title: "Business Applications",
    description:
      "Enhance your CRM and ERP applications using Dynamics 365 for improved efficiency, streamlined operations, and seamless customer experiences.",
    href: "/services/dynamics-365-crm-applications",
  },
];

const TECHNOLOGY_PARTNERS = [
  "Microsoft",
  "Salesforce",
  "Accenture",
  "SAP",
  "ServiceNow",
  "IBM",
  "Oracle",
  "General Dynamics",
  "Bylight",
];

export default function HomePage() {
  return (
    <main>
      <Hero
        eyebrow="Government · Commercial"
        title="The IT Edge for Lean Government"
        lead="Unified Communication · Network Management · Cybersecurity · Software Engineering. CompQsoft is the preferred IT services and engineering partner for government."
        actions={[
          { label: "Explore our Government services", href: "/government-it-services" },
          { label: "Explore Commercial services", href: "/technologygroup" },
        ]}
      />

      <Intro
        tone="tint"
        practice="neutral"
        eyebrow="About CompQsoft"
        title="A customer-centric digital platform and IT services company"
      >
        <p>
          We empower companies across industries and technology verticals to
          leverage Cloud, Data &amp; AI, App Modernization, Automation, and
          next-gen technologies like generative AI to drive innovation and
          transform their businesses.
        </p>
        <p>
          For the past 28 years, we have been dedicated to helping clients
          maximize their technology investments and achieve superior business
          outcomes. Our expertise spans startups, commercial enterprises, and
          federal agencies, including the Department of Defense, and state and
          local governments.
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
        practice="government"
        eyebrow="Government"
        title="Built for federal mission delivery"
        lead="Prime contractor on DoD, DHS and HHS programmes — unified communications, network engineering, cybersecurity, and logistics software sustainment."
        cards={GOVERNMENT_SERVICES}
        columns={4}
      />

      <CardGrid
        practice="commercial"
        eyebrow="Commercial"
        title="Digital transformation on the Microsoft estate"
        lead="Our comprehensive services in Cloud, Data, Analytics, and AI drive innovation and accelerate business transformation for our customers."
        cards={COMMERCIAL_SERVICES}
        columns={4}
      />

      <LogoStrip
        tone="tint"
        title="Our technology partners"
        items={TECHNOLOGY_PARTNERS}
      />

      <CardGrid
        eyebrow="Proof"
        title="Case studies"
        cards={caseStudies.slice(0, 3).map((study) => ({
          title: study.title,
          href: `/case-study/${study.slug}`,
        }))}
      />

      <CardGrid
        tone="tint"
        eyebrow="Insights"
        title="Latest thinking"
        cards={blogs.slice(0, 3).map((post) => ({
          title: post.title,
          href: `/blog/${post.slug}`,
        }))}
      />

      <CertStrip
        title="Our certifications"
        items={[
          "ISO 9001",
          "ISO/IEC 27001",
          "ISO/IEC 20000-1",
          "CMMI Level 3",
          "HUBZone Small Business",
          "Minority-Owned",
        ]}
      />

      <CtaBand
        title="Ready to elevate your IT strategy?"
        lead="From strategic consulting to leading-edge technologies, we enable experiences that transform organizations for success."
      />
    </main>
  );
}
