import type { Metadata } from "next";
import { caseStudies, excerpt, pageFor, seoFor, services } from "@/lib/content";
import { CtaBand, PartnerGrid } from "@/components/sections";
import { Counters } from "@/components/counters";
import {
  ApproachSteps,
  EditorialGrid,
  LinkList,
  MediaSplit,
  PageHero,
  Pager,
} from "@/components/editorial/sections";
import { Assess, Blueprint, Layers, Lifecycle } from "@/components/icons";
import {
  bannerFor,
  caseStudyImage,
  partnerLogos,
  serviceBanner,
} from "@/lib/media";

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

/**
 * The six services the live page pulls forward, with its own one-line
 * descriptions of each. The other eight are a click away in the list below.
 */
const FEATURED = [
  {
    slug: "dynamics-365-erp-applications",
    title: "Microsoft Dynamics 365 ERP",
    excerpt:
      "Dynamics 365 ERP Services to transform business operations for scale and agility.",
  },
  {
    slug: "dynamics-365-crm-applications",
    title: "Microsoft Dynamics 365 CE",
    excerpt:
      "Dynamics 365 CRM Services to elevate customer experiences and ensure retention.",
  },
  {
    slug: "data-analytics-ai",
    title: "Data, Analytics & AI",
    excerpt:
      "Data & Analytics to unlock insights and help with strategic decision-making.",
  },
  {
    slug: "modern-workplace",
    title: "Microsoft Modern Workplace",
    excerpt:
      "Modern Workplace to enhance employee experience and business productivity with Microsoft 365 & Copilot.",
  },
  {
    slug: "power-platform-and-rpa",
    title: "Power Platform and Robotic Process Automation",
    excerpt:
      "Power Platform & RPA to streamline repetitive tasks and processes with automated workflows.",
  },
  {
    slug: "cloud-migration-and-modernization",
    title: "Cloud Migration and Modernization",
    excerpt:
      "Seamlessly migrate and modernize to the Azure cloud for agility, scalability, and business innovation.",
  },
];

const PLATFORMS = [
  "Microsoft Azure",
  "Dynamics 365",
  "Microsoft 365",
  "Power Platform",
  "Salesforce",
  "ServiceNow",
  "SAP",
];

const ENGAGEMENT = [
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
    title: "Scalable Implementation",
    description:
      "DevSecOps and Agile/Scrum delivery with CI/CD pipelines throughout.",
    icon: <Layers className="h-12 w-12" />,
  },
  {
    title: "Ongoing Support and Optimization",
    description:
      "ITSM-based sustainment keeps the system performing after go-live.",
    icon: <Lifecycle className="h-12 w-12" />,
  },
];

export default function CommercialPage() {
  const page = pageFor(PATH);

  // The two-paragraph introduction, verbatim from the live page.
  const intro = (page?.blocks ?? [])
    .filter((block) => block.type === "para")
    .slice(0, 2);

  return (
    <main>
      <PageHero
        eyebrow="Commercial"
        title="Driving business transformation through innovative IT solutions"
        image={bannerFor(PATH)}
        practice={PRACTICE}
        actions={[
          { label: "Talk to our team", href: "/contact-us" },
          { label: "Alliance partners", href: "/alliance-partners" },
        ]}
      />

      <MediaSplit
        eyebrow="What we do"
        title="Transforming enterprise technology: modernizing and managing mission-critical systems"
        image={{
          src: serviceBanner("data-analytics-ai") ?? "",
          alt: "Data and analytics engineering",
        }}
        pills={PLATFORMS}
        practice={PRACTICE}
      >
        {intro.map((block, i) => (
          <p key={i} className={i === 0 ? "text-lg text-body" : "text-base text-body"}>
            {block.type === "para" ? block.text : null}
          </p>
        ))}
      </MediaSplit>

      <EditorialGrid
        eyebrow="Our technology services"
        title="Where most engagements start"
        cards={FEATURED.map((item) => ({
          href: `/services/${item.slug}`,
          image: serviceBanner(item.slug),
          title: item.title,
          excerpt: item.excerpt,
          cta: "Learn more",
        }))}
        action={{ label: "Contact us", href: "/contact-us" }}
        practice={PRACTICE}
      />

      <Counters
        tone="dark"
        eyebrow="Speaking by numbers"
        title="Twenty-eight years of delivery behind every engagement"
        stats={[
          { value: "28", suffix: "+", label: "Years of Delivering Excellence" },
          { value: "240", suffix: "+", label: "Locations" },
          { value: "200", suffix: "+", label: "Global Customers" },
        ]}
        practice={PRACTICE}
      />

      <LinkList
        eyebrow="Full catalogue"
        title="Every service we offer"
        lead="Fourteen practices across the Microsoft estate, Salesforce, ServiceNow and SAP."
        items={services.map((service) => ({
          title: service.title,
          href: `/services/${service.slug}`,
          description: excerpt(service, 130),
        }))}
        tone="white"
        practice={PRACTICE}
      />

      <ApproachSteps
        eyebrow="How we deliver"
        title="Our engagement process"
        lead="Four stages, the same on every engagement — assess before proposing, build to your requirements, deliver in increments, then stay."
        steps={ENGAGEMENT}
        practice={PRACTICE}
      />

      <MediaSplit
        eyebrow="Why CompQsoft"
        title="One engineering organization, two customers"
        image={{
          src: bannerFor("/government-it-services") ?? "",
          alt: "Federal network operations",
        }}
        reverse
        tone="tint"
        action={{ label: "Government practice", href: "/government-it-services" }}
        practice={PRACTICE}
      >
        <p className="text-lg text-body">
          The same teams that hold prime contracts with DISA, the Navy and the
          Coast Guard deliver commercial engagements. Federal work sets the
          floor for how we handle security, accreditation and change control,
          and commercial clients get that discipline by default.
        </p>
        <p className="text-base text-body">
          Delivery is appraised at CMMI Level 3 and runs under ISO 9001:2015,
          ISO/IEC 27001:2013 and ISO/IEC 20000-1:2011 certified management
          systems.
        </p>
      </MediaSplit>

      <PartnerGrid
        practice={PRACTICE}
        eyebrow="Alliances"
        title="Our technology partners in driving transformation"
        logos={partnerLogos}
        action={{ label: "All alliance partners", href: "/alliance-partners" }}
      />

      <EditorialGrid
        eyebrow="Proof"
        title="Case studies"
        tone="tint"
        cards={caseStudies.slice(0, 3).map((study) => ({
          href: `/case-study/${study.slug}`,
          image: caseStudyImage(study),
          title: study.title,
          cta: "Read the case study",
        }))}
        action={{ label: "All case studies", href: "/case-studies" }}
        practice={PRACTICE}
      />

      <Pager
        items={[
          { title: "Government practice", href: "/government-it-services" },
          { title: "Insights and blogs", href: "/blogs" },
        ]}
        practice={PRACTICE}
      />

      <CtaBand
        practice={PRACTICE}
        title="Transform your business with technology services tailored to your needs"
        lead="From strategic consulting to leading-edge technologies, we enable experiences that transform organizations for success."
      />
    </main>
  );
}
