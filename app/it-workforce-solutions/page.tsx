import type { Metadata } from "next";
import { CardGrid, CertStrip, CtaBand } from "@/components/sections";
import {
  MediaSplit,
  NameStrip,
  PageHero,
  Pager,
  SpecList,
} from "@/components/editorial/sections";
import {
  Award,
  Globe,
  Layers,
  Lightbulb,
  People,
  ShieldCheck,
} from "@/components/icons";
import { bannerFor, careersMedia, serviceBanner } from "@/lib/media";

const PRACTICE = "commercial" as const;
const PATH = "/it-workforce-solutions";

export const metadata: Metadata = {
  title: { absolute: "IT Workforce Solutions | CompQsoft Professional Services" },
  description:
    "CompQsoft delivers specialized IT professionals, scalable workforce solutions, and technology expertise to help organizations meet today's demands and prepare for tomorrow.",
  alternates: { canonical: PATH },
};

/**
 * A new page, not in the content.md archive — the copy below is the client's
 * brief, verbatim. Every CTA resolves to /contact-us until a dedicated talent
 * request form exists.
 */
const SOLUTIONS = [
  {
    title: "Contract Staffing and Contract to Hire",
    description:
      "Access qualified IT professionals for short-term projects, long-term assignments, or contract-to-hire opportunities.",
  },
  {
    title: "Direct Hire and Executive Search",
    description:
      "Find experienced technology professionals, specialized experts, and leaders for permanent roles.",
  },
  {
    title: "Project Teams and Statement of Work",
    description:
      "Build dedicated teams with the expertise and structure needed to deliver defined projects and outcomes.",
  },
  {
    title: "Managed Services",
    description:
      "Extend your capabilities through ongoing technology support, dedicated delivery teams, and managed IT functions.",
  },
  {
    title: "RPO, Payrolling and Workforce Management",
    description:
      "Simplify recruitment, onboarding, payroll, compliance, and workforce administration with flexible support models, including vendor on-premise services.",
  },
  {
    title: "Onshore, Nearshore and Offshore Delivery",
    description:
      "Scale your workforce efficiently with access to U.S., LATAM, and India-based recruiting and technology resources.",
  },
];

const TALENT = [
  {
    label: "Cloud and Infrastructure",
    value: "AWS, Azure, cloud engineering, DevOps, networking, and infrastructure support.",
  },
  {
    label: "Cybersecurity and Cleared Talent",
    value: "Security engineering, risk, compliance, and cleared IT professionals.",
  },
  {
    label: "Data Analytics and AI",
    value:
      "Data engineering, business intelligence, machine learning, and AI specialists.",
  },
  {
    label: "Software and Application Development",
    value: "Full-stack development, application modernization, QA, and automation.",
  },
  {
    label: "Enterprise Applications",
    value: "SAP, Salesforce, ServiceNow, Microsoft, ERP, and CRM platforms.",
  },
  {
    label: "Project Delivery and IT Operations",
    value:
      "Project managers, business analysts, product teams, IT support, and service management.",
  },
];

const REASONS = [
  {
    title: "Technology-First Expertise",
    description:
      "We understand the work behind the job description, helping us identify candidates whose skills align with your environment and objectives.",
    icon: <Lightbulb className="h-6 w-6" />,
  },
  {
    title: "Flexible Delivery Models",
    description:
      "Engage individual professionals, permanent employees, project teams, or managed services through one technology partner.",
    icon: <Layers className="h-6 w-6" />,
  },
  {
    title: "Cleared Talent Capabilities",
    description:
      "Our government and defense experience provides access to cleared and clearance-eligible technology professionals for sensitive environments.",
    icon: <ShieldCheck className="h-6 w-6" />,
  },
  {
    title: "Quality and Security",
    description:
      "Our certified quality, information-security, and service-management practices support consistent, accountable delivery.",
    icon: <Award className="h-6 w-6" />,
  },
  {
    title: "National and Global Reach",
    description:
      "Access U.S., nearshore, and offshore recruiting resources that can scale with your workforce and delivery requirements.",
    icon: <Globe className="h-6 w-6" />,
  },
  {
    title: "Diverse Supplier Value",
    description:
      "As a minority-owned technology supplier, CompQsoft can support your organization’s supplier-diversity and inclusion objectives.",
    icon: <People className="h-6 w-6" />,
  },
];

/** What a VMS or MSP program gets from us, as named in the brief. */
const PROGRAM = [
  "Dedicated account management",
  "Technical candidate screening",
  "Coordinated onboarding",
  "Scalable recruiting support",
  "Performance reporting",
];

const INDUSTRIES = [
  "Financial services",
  "Healthcare",
  "Manufacturing and automotive",
  "Retail and logistics",
  "Education",
  "Government and defense",
];

export default function WorkforceSolutionsPage() {
  return (
    <main>
      <PageHero
        eyebrow="IT Workforce Solutions"
        title="The right technology talent. Ready when you need it."
        image={bannerFor(PATH)}
        practice={PRACTICE}
        actions={[
          { label: "Find IT talent", href: "/contact-us" },
          { label: "Explore our solutions", href: "#solutions" },
        ]}
      />

      <MediaSplit
        eyebrow="CompQsoft Professional Services"
        title="Technology moves fast. Finding the right talent shouldn't slow you down."
        image={careersMedia.culture}
        practice={PRACTICE}
      >
        <p>
          CompQsoft delivers specialized IT professionals, scalable workforce
          solutions, and technology expertise to help organizations meet
          today&rsquo;s demands and prepare for tomorrow.
        </p>
        <p className="text-base">
          Whether you need one skilled consultant, a dedicated project team, or
          ongoing technology support, we connect you with the right talent and
          delivery solutions to keep your business moving forward.
        </p>
      </MediaSplit>

      {/* The hero's second action lands here. */}
      <div id="solutions" className="scroll-mt-[var(--header-h)]">
        <CardGrid
          tone="tint"
          numbered
          eyebrow="Workforce solutions"
          title="Flexible workforce solutions built around your business"
          lead="Every organization has different workforce needs. From filling critical skill gaps to managing complex technology initiatives, CompQsoft combines specialized recruiting with more than 25 years of technology delivery experience."
          cards={SOLUTIONS}
          action={{ label: "Explore workforce solutions", href: "/contact-us" }}
          practice={PRACTICE}
        />
      </div>

      <SpecList
        eyebrow="Specialized talent"
        title="Specialized talent across critical technologies"
        lead="Finding qualified IT talent requires more than matching keywords to a résumé. Our recruiting and technical teams understand the platforms, skills, and experience needed to support complex technology environments."
        rows={TALENT}
        action={{ label: "Find specialized IT talent", href: "/contact-us" }}
        practice={PRACTICE}
      />

      <MediaSplit
        eyebrow="One partner"
        title="A complete technology partner"
        image={{
          src: serviceBanner("application-modernization") ?? careersMedia.team.src,
          alt: "Technology delivery engineering",
        }}
        reverse
        tone="tint"
        action={{ label: "Our technology services", href: "/technologygroup" }}
        practice={PRACTICE}
      >
        <p>
          CompQsoft combines workforce solutions with established technology
          consulting, implementation, and managed-services capabilities. With
          more than 25 years of technology delivery experience, we understand
          both the talent you need and the technology challenges you&rsquo;re
          working to solve.
        </p>
        <p className="text-base">
          We can help you fill an immediate opening today, build a specialized
          project team tomorrow, and support ongoing technology initiatives as
          your business grows.
        </p>
        <p className="text-ink">
          One partner. Multiple solutions. Built to grow with you.
        </p>
      </MediaSplit>

      <CertStrip
        eyebrow="Why CompQsoft"
        title="Why organizations choose CompQsoft"
        items={REASONS}
        practice={PRACTICE}
      />

      <MediaSplit
        eyebrow="Enterprise programs"
        title="Built for enterprise workforce programs"
        image={careersMedia.workplace}
        tone="tint"
        pills={PROGRAM}
        action={{ label: "Discuss your workforce program", href: "/contact-us" }}
        practice={PRACTICE}
      >
        <p>
          CompQsoft understands the expectations of large-scale contingent
          workforce programs. We support enterprise clients, managed service
          providers (MSPs), and vendor management systems (VMS) with a focus on
          quality, responsiveness, compliance, and accountability.
        </p>
        <p className="text-base">
          We work within your existing program structure to make engaging IT
          talent easier and more efficient.
        </p>
      </MediaSplit>

      <NameStrip
        eyebrow="Industries"
        title="Industry experience that matters"
        lead="Every industry brings unique technology, security, and workforce challenges. Our solutions support organizations across:"
        names={INDUSTRIES}
        columns={3}
        practice={PRACTICE}
      />

      <Pager
        items={[
          { title: "Commercial IT services", href: "/technologygroup" },
          { title: "Government IT services", href: "/government-it-services" },
        ]}
        practice={PRACTICE}
      />

      <CtaBand
        practice={PRACTICE}
        title="Build your next technology team"
        lead="Whether you need one specialized IT professional or a complete technology delivery team, CompQsoft has the talent, experience, and flexibility to help you move forward."
        action={{ label: "Request IT talent", href: "/contact-us" }}
        secondary={{ label: "Talk with our team", href: "/contact-us" }}
      />
    </main>
  );
}
