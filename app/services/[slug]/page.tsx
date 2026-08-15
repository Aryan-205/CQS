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
import { Band, CtaBand, EditorialCard, SectionHead } from "@/components/sections";
import { Counters } from "@/components/counters";
import {
  ApproachSteps,
  AssuranceBand,
  LinkList,
  FaqPanel,
  PageHero,
  OverviewSplit,
  Pager,
} from "@/components/editorial/sections";
import {
  ComparisonMatrix,
  EcosystemHub,
  EngagementPlans,
  InlineCallout,
  ModuleGrid,
  PhaseTimeline,
  ReadinessChecklist,
  RoleSplit,
  ShiftPanels,
  StatementQuote,
} from "@/components/editorial/showcase";
import { Assess, Blueprint, Layers, Lifecycle } from "@/components/icons";
import {
  caseStudyImage,
  certificationLogos,
  practiceMedia,
  serviceBanner,
} from "@/lib/media";
import { extraServiceFaqs } from "@/lib/service-faqs";
import { serviceShowcase } from "@/lib/service-showcase";

/** Services sit on the commercial side of the IA, so panels run blue. */
const PRACTICE = "commercial" as const;

/** Repeated verbatim on practice pages in content.md — the delivery model. */
const ENGAGEMENT_STEPS = [
  {
    title: "Comprehensive Assessment",
    description:
      "We map your current environment, constraints and objectives before proposing anything.",
    icon: <Assess className="h-12 w-12" />,
  },
  {
    title: "Customized Solution Development",
    description:
      "Solutions are designed against your requirements, not against a template.",
    icon: <Blueprint className="h-12 w-12" />,
  },
  {
    title: "Scalable and Efficient Implementation",
    description:
      "Delivery runs on DevSecOps and Agile/Scrum with CI/CD pipelines throughout.",
    icon: <Layers className="h-12 w-12" />,
  },
  {
    title: "Ongoing Support and Optimization",
    description:
      "ITSM-based sustainment keeps the system performing after go-live.",
    icon: <Lifecycle className="h-12 w-12" />,
  },
];

/** Company figures, from content.md. The same three the homepage runs. */
const TRACK_RECORD = [
  { value: "28", suffix: "+", label: "Years of Delivering Excellence" },
  { value: "240", suffix: "+", label: "Locations" },
  { value: "200", suffix: "+", label: "Global Customers" },
];

/**
 * Appraisal and registrations, shown as the issued marks. Labels come off the
 * artwork in `lib/media.ts` rather than the archive, which cites superseded
 * revisions.
 */
const CERTIFICATIONS = certificationLogos.map((cert) => ({
  src: cert.src,
  alt: cert.alt,
  label: cert.label,
}));

const IDENTIFIERS = [
  { label: "UEI", value: "KTU8QJE27RN8" },
  { label: "CAGE", value: "1TTA2" },
  { label: "NAICS", value: "541512" },
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
  const relatedCases = byCategory(caseStudies, service.category).slice(0, 3);

  // The archived set first, then the authored ones — three services carry no
  // CMS FAQs at all, so without these the accordion never renders for them.
  const serviceFaqs = [
    ...byCategory(faqs, service.category),
    ...extraServiceFaqs(slug, service.category),
  ];

  // Authored, per-service sections. Only the services with an entry in
  // lib/service-showcase.ts render them; the rest of the template is unchanged.
  const showcase = serviceShowcase(slug);

  // The next two siblings, wrapping — fourteen service pages are the most
  // useful onward step from any one of them.
  const index = services.findIndex((s) => s.slug === slug);
  const siblings = [1, 2]
    .map((offset) => services[(index + offset) % services.length])
    .filter((s) => s && s.slug !== slug)
    .map((s) => ({ title: s.title, href: `/services/${s.slug}` }));

  return (
    <main>
      <PageHero
        eyebrow="Services"
        title={service.title}
        image={serviceBanner(slug)}
        practice={PRACTICE}
        actions={[
          { label: "Talk to our team", href: "/contact-us" },
          { label: "All services", href: "/technologygroup" },
        ]}
      />

      <OverviewSplit
        blocks={service.blocks}
        image={service.image}
        practice={PRACTICE}
      />

      {showcase?.shift && (
        <ShiftPanels
          title={showcase.shift.title}
          lead={showcase.shift.lead}
          before={showcase.shift.before}
          after={showcase.shift.after}
          tone="tint"
          practice={PRACTICE}
        />
      )}

      <Counters
        eyebrow="Track record"
        title="Twenty-eight years of delivery behind every engagement"
        stats={TRACK_RECORD}
        practice={PRACTICE}
      />

      {showcase?.modules && (
        <ModuleGrid
          title={showcase.modules.title}
          lead={showcase.modules.lead}
          modules={showcase.modules.items}
          tone="tint"
          practice={PRACTICE}
        />
      )}

      <LinkList
        title="Capabilities"
        lead={`Everything ${service.title} covers, and where each piece goes deeper.`}
        items={serviceCapabilities.map((capability) => ({
          title: capability.title,
          href: `/capabilities/${capability.slug}`,
          description: excerpt(capability, 130),
        }))}
        // The showcase runs a tinted band either side of this one, so the
        // alternation only holds if this page's list sits on white.
        tone={showcase ? "white" : "tint"}
        practice={PRACTICE}
      />

      {showcase?.quote && (
        <StatementQuote
          quote={showcase.quote.text}
          attribution={showcase.quote.attribution}
          role={showcase.quote.role}
          tone="tint"
          practice={PRACTICE}
        />
      )}

      {showcase?.comparison && (
        <ComparisonMatrix
          title={showcase.comparison.title}
          lead={showcase.comparison.lead}
          columns={showcase.comparison.columns}
          rows={showcase.comparison.rows}
          footnote={showcase.comparison.footnote}
          tone="white"
          practice={PRACTICE}
        />
      )}

      {showcase?.readiness && (
        <ReadinessChecklist
          title={showcase.readiness.title}
          lead={showcase.readiness.lead}
          signals={showcase.readiness.signals}
          note={showcase.readiness.note}
          action={{ label: "Book an assessment", href: "/contact-us" }}
          tone="tint"
          practice={PRACTICE}
        />
      )}

      <ApproachSteps
        title="Our engagement process"
        lead="Four stages, the same on every engagement — assess before proposing, build to your requirements, deliver in increments, then stay."
        steps={ENGAGEMENT_STEPS}
        practice={PRACTICE}
      />

      {showcase?.phases && (
        <PhaseTimeline
          title={showcase.phases.title}
          lead={showcase.phases.lead}
          phases={showcase.phases.items}
          action={{ label: "Talk through your programme", href: "/contact-us" }}
          tone="tint"
          practice={PRACTICE}
        />
      )}

      {showcase?.roles && (
        <RoleSplit
          title={showcase.roles.title}
          lead={showcase.roles.lead}
          image={service.image ?? practiceMedia.commercial}
          roles={showcase.roles.items}
          tone="white"
          practice={PRACTICE}
        />
      )}

      {showcase?.plans && (
        <EngagementPlans
          title={showcase.plans.title}
          lead={showcase.plans.lead}
          plans={showcase.plans.items.map((plan) => ({
            ...plan,
            action: { label: "Start here", href: "/contact-us" },
          }))}
          tone="tint"
          practice={PRACTICE}
        />
      )}

      {showcase?.ecosystem && (
        <EcosystemHub
          title={showcase.ecosystem.title}
          lead={showcase.ecosystem.lead}
          hub={showcase.ecosystem.hub}
          nodes={showcase.ecosystem.nodes}
          tone="white"
          practice={PRACTICE}
        />
      )}

      {showcase?.callout && (
        <InlineCallout
          text={showcase.callout}
          action={{ label: "Book an assessment", href: "/contact-us" }}
          practice={PRACTICE}
        />
      )}

      <AssuranceBand
        title="Appraised process, not best effort"
        lead="Commercial and federal work is delivered by one engineering organization, under the same appraised processes and certified management systems. What a contracting officer asks for is what a commercial client gets."
        marks={CERTIFICATIONS}
        identifiers={IDENTIFIERS}
        image={practiceMedia.commercial}
        practice={PRACTICE}
      />

      {relatedCases.length > 0 && (
        <Band size="large">
          <SectionHead
            eyebrow="Proof"
            title="Related work"
            practice={PRACTICE}
            action={{ label: "All case studies", href: "/case-studies" }}
          />
          <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
            {relatedCases.map((study) => (
              <li key={study.slug}>
                <EditorialCard
                  href={`/case-study/${study.slug}`}
                  image={caseStudyImage(study)}
                  title={study.title}
                  cta="Read the case study"
                />
              </li>
            ))}
          </ul>
        </Band>
      )}

      <FaqPanel faqs={serviceFaqs} practice={PRACTICE} />

      <Pager items={siblings} practice={PRACTICE} />

      <CtaBand
        practice={PRACTICE}
        title={`Ready to move on ${service.title}?`}
        lead="Tell us where you are today and we will map the shortest route to where you need to be."
      />
    </main>
  );
}
