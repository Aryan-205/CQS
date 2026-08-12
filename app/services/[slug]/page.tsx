import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  bySlug,
  byCategory,
  capabilities,
  caseStudies,
  excerpt,
  faqs,
  services,
  seoFor,
} from "@/lib/content";
import {
  CardGrid,
  CtaBand,
  FaqAccordion,
  Hero,
  ProcessSteps,
  Prose,
} from "@/components/sections";

/** Services sit on the commercial side of the IA, so panels run blue. */
const PRACTICE = "commercial" as const;

/** Repeated verbatim on practice pages in content.md — the delivery model. */
const ENGAGEMENT_STEPS = [
  {
    title: "Comprehensive Assessment",
    description:
      "We map your current environment, constraints and objectives before proposing anything.",
  },
  {
    title: "Customized Solution Development",
    description:
      "Solutions are designed against your requirements, not against a template.",
  },
  {
    title: "Scalable and Efficient Implementation",
    description:
      "Delivery runs on DevSecOps and Agile/Scrum with CI/CD pipelines throughout.",
  },
  {
    title: "Ongoing Support and Optimization",
    description:
      "ITSM-based sustainment keeps the system performing after go-live.",
  },
];

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata(
  props: PageProps<"/services/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const service = bySlug(services, slug);
  if (!service) return {};
  const seo = seoFor(`/services/${slug}`);
  return {
    title: seo?.title ?? service.title,
    description: seo?.description ?? excerpt(service, 155),
    alternates: { canonical: `/services/${slug}` },
  };
}

export default async function ServicePage(
  props: PageProps<"/services/[slug]">,
) {
  const { slug } = await props.params;
  const service = bySlug(services, slug);
  if (!service) notFound();

  // Capabilities and FAQs bind to a service through the category taxonomy.
  const serviceCapabilities = byCategory(capabilities, service.category);
  const serviceFaqs = byCategory(faqs, service.category);
  const relatedCases = byCategory(caseStudies, service.category).slice(0, 3);

  return (
    <main>
      <Hero
        eyebrow="Services"
        title={service.title}
        lead={excerpt(service, 220)}
        practice={PRACTICE}
        actions={[
          { label: "Talk to our team", href: "/contact-us" },
          { label: "All services", href: "/technologygroup" },
        ]}
      />

      <Prose blocks={service.blocks} />

      {serviceCapabilities.length > 0 && (
        <CardGrid
          tone="tint"
          practice={PRACTICE}
          eyebrow="What we do"
          title="Capabilities"
          cards={serviceCapabilities.map((capability) => ({
            title: capability.title,
            href: `/capabilities/${capability.slug}`,
            description: excerpt(capability, 120),
          }))}
        />
      )}

      <ProcessSteps
        tone="white"
        practice={PRACTICE}
        eyebrow="How we deliver"
        title="Our engagement process"
        steps={ENGAGEMENT_STEPS}
      />

      {relatedCases.length > 0 && (
        <CardGrid
          tone="tint"
          practice={PRACTICE}
          eyebrow="Proof"
          title="Related case studies"
          cards={relatedCases.map((study) => ({
            title: study.title,
            href: `/case-study/${study.slug}`,
          }))}
        />
      )}

      <FaqAccordion faqs={serviceFaqs} practice={PRACTICE} />

      <CtaBand
        practice={PRACTICE}
        title={`Ready to move on ${service.title}?`}
        lead="Tell us where you are today and we will map the shortest route to where you need to be."
      />
    </main>
  );
}
