import type { Metadata } from "next";
import { caseStudies, excerpt, pageFor, seoFor, services } from "@/lib/content";
import {
  CardGrid,
  CtaBand,
  Hero,
  Intro,
  LogoStrip,
  ProcessSteps,
} from "@/components/sections";
import { PageProse } from "@/components/page-content";

const PRACTICE = "commercial" as const;
const PATH = "/technologygroup";
const seo = seoFor(PATH);

export const metadata: Metadata = {
  title: {
    absolute:
      seo?.title ??
      "Commercial IT Services | Accelerating Digital Transformation",
  },
  description: seo?.description,
  alternates: { canonical: PATH },
};

export default function CommercialPage() {
  const page = pageFor(PATH);

  return (
    <main>
      <Hero
        practice={PRACTICE}
        eyebrow="Commercial"
        title="Harness the power of digital technologies"
        lead="Azure · Dynamics 365 · Microsoft 365 · Power Platform. We help startups, SMBs and enterprises unlock insights, optimize operations and achieve competitive advantage."
        actions={[
          { label: "Talk to our team", href: "/contact-us" },
          { label: "Alliance partners", href: "/alliance-partners" },
        ]}
      />

      <Intro
        tone="tint"
        practice={PRACTICE}
        eyebrow="What we do"
        title="Digital transformation, built on the Microsoft estate"
      >
        <p>
          Our comprehensive services in Cloud, Data, Analytics, and AI drive
          innovation and accelerate business transformation for our customers.
          By leveraging advanced technologies, we enable organizations to unlock
          insights, optimize operations, and achieve competitive advantage.
        </p>
      </Intro>

      <CardGrid
        practice={PRACTICE}
        eyebrow="Services"
        title="Every service we offer"
        cards={services.map((service) => ({
          title: service.title,
          href: `/services/${service.slug}`,
          description: excerpt(service, 110),
          eyebrow: service.category,
        }))}
      />

      <ProcessSteps
        tone="tint"
        practice={PRACTICE}
        eyebrow="How we deliver"
        title="Our engagement process"
        steps={[
          {
            title: "Comprehensive Assessment",
            description:
              "We map your current environment, constraints and objectives before proposing anything.",
          },
          {
            title: "Customized Solution Development",
            description:
              "Solutions designed against your requirements, not against a template.",
          },
          {
            title: "Scalable Implementation",
            description:
              "DevSecOps and Agile/Scrum delivery with CI/CD pipelines throughout.",
          },
          {
            title: "Ongoing Support and Optimization",
            description:
              "ITSM-based sustainment keeps the system performing after go-live.",
          },
        ]}
      />

      <CardGrid
        practice={PRACTICE}
        eyebrow="Proof"
        title="Case studies"
        cards={caseStudies.slice(0, 6).map((study) => ({
          title: study.title,
          href: `/case-study/${study.slug}`,
        }))}
      />

      <LogoStrip
        tone="tint"
        practice={PRACTICE}
        title="Our technology partners"
        items={[
          "Microsoft",
          "Salesforce",
          "SAP",
          "ServiceNow",
          "IBM",
          "Oracle",
          "AWS",
          "Databricks",
        ]}
      />

      {page && (
        <PageProse
          blocks={page.blocks}
          practice={PRACTICE}
          eyebrow="In detail"
        />
      )}

      <CtaBand
        practice={PRACTICE}
        title="Ready to accelerate your transformation?"
        lead="From strategic consulting to leading-edge technologies, we enable experiences that transform organizations for success."
      />
    </main>
  );
}
