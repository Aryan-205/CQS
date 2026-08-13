import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { blogs, caseStudies, excerpt, seoFor } from "@/lib/content";
import { company } from "@/lib/site";
import {
  blogImage,
  caseStudyImage,
  partnerLogos,
  practiceMedia,
  serviceIcons,
} from "@/lib/media";
import {
  Band,
  Counters,
  CredentialBand,
  CtaBand,
  EditorialCard,
  Eyebrow,
  PartnerGrid,
  SectionHead,
  TextLink,
} from "@/components/sections";
import { Arrow } from "@/components/icons";
import { HomeHero } from "@/components/home/hero";
import { ServiceTabs, type ServiceTab } from "@/components/home/service-tabs";

const seo = seoFor("/");

export const metadata: Metadata = {
  title: {
    absolute: seo?.title ?? "CompQsoft: IT Services and Consulting Company",
  },
  description: seo?.description,
  alternates: { canonical: "/" },
};

/* -------------------------------------------------------------------------
   Services — content.md:617, the tabbed Government / Commercial grid.
------------------------------------------------------------------------- */
const SERVICE_TABS: ServiceTab[] = [
  {
    key: "government",
    label: "Government",
    lead: "Prime contractor to the Department of Defense, DHS and HHS. We run the communications, networks and sustainment programmes federal missions depend on, under CMMI Level 3 process.",
    cards: [
      {
        title: "Software Development & Engineering",
        description:
          "Build custom software solutions to innovate, streamline operations, and seamless digital transformation.",
        href: "/government-it-services",
        icon: serviceIcons.softwareDevelopment,
      },
      {
        title: "Unified Communication",
        description:
          "Seamlessly integrate communication channels, enhance collaboration, and boost productivity with our unified communication solutions.",
        href: "/government-it-services",
        icon: serviceIcons.unifiedCommunication,
      },
      {
        title: "Cybersecurity",
        description:
          "Protect critical assets and data from cyber threats with our comprehensive cybersecurity solutions, ensuring business continuity.",
        href: "/services/cyber-security-services",
        icon: serviceIcons.cybersecurity,
      },
      {
        title: "Network Management and Engineering",
        description:
          "Optimize network performance, ensure reliability, and drive efficiency with our expert network management and engineering services.",
        href: "/government-it-services",
        icon: serviceIcons.networkManagement,
      },
    ],
  },
  {
    key: "commercial",
    label: "Commercial",
    lead: "Our comprehensive services in Cloud, Data, Analytics, and AI drive innovation and accelerate business transformation for our customers, unlocking insights and optimizing operations.",
    cards: [
      {
        title: "Cloud Services",
        description:
          "Elevate your business by migrating and modernizing your workloads to the cloud.",
        href: "/services/cloud-migration-and-modernization",
        icon: serviceIcons.cloud,
      },
      {
        title: "Application Modernization",
        description: "Modernize applications to unlock the full value of cloud.",
        href: "/services/application-modernization",
        icon: serviceIcons.appModernization,
      },
      {
        title: "Data, Analytics and AI",
        description:
          "Leverage advanced analytics and AI to uncover deep insights, make data-driven decisions, and drive smarter business outcomes.",
        href: "/services/data-analytics-ai",
        icon: serviceIcons.dataAnalytics,
      },
      {
        title: "Business Applications",
        description:
          "Enhance your CRM and ERP applications using Dynamics 365 for improved efficiency, streamlined operations, and seamless customer experiences.",
        href: "/services/dynamics-365-crm-applications",
        icon: serviceIcons.businessApplications,
      },
    ],
  },
];

/* -------------------------------------------------------------------------
   The dual-audience split. A federal contracting officer and a commercial CIO
   want different pages; this is the fork, stated in full rather than hinted.
------------------------------------------------------------------------- */
const PRACTICES = [
  {
    key: "government" as const,
    eyebrow: "Government",
    title: "Built for federal mission delivery",
    lead: "Prime and subcontract delivery across DoD, DHS and HHS — unified communications, network engineering, cybersecurity and logistics software sustainment.",
    href: "/government-it-services",
    cta: "Government IT services",
    image: practiceMedia.government,
    links: [
      { label: "Compliance & certifications", href: "/compliance" },
      { label: "Prime contract vehicles", href: "/primecontracts" },
      { label: "Capability statement", href: "/government-it-services" },
    ],
  },
  {
    key: "commercial" as const,
    eyebrow: "Commercial",
    title: "Digital transformation on the Microsoft estate",
    lead: "Dynamics 365, Azure, Power Platform and Copilot, plus Salesforce, ServiceNow and SAP — delivered by engineers, governed for security and compliance.",
    href: "/technologygroup",
    cta: "Commercial IT services",
    image: practiceMedia.commercial,
    links: [
      { label: "Data, Analytics & AI", href: "/services/data-analytics-ai" },
      { label: "Cloud migration", href: "/services/cloud-migration-and-modernization" },
      { label: "Alliance partners", href: "/alliance-partners" },
    ],
  },
];

const VEHICLES = [
  { label: "DISA ENCORE III", href: "/disa-encoreiii" },
  { label: "NIH CIO-SP3", href: "/cio-sp3" },
  { label: "GSA OASIS SB Pool 3", href: "/oasis" },
  { label: "CMS SPARC", href: "/cms-sparc" },
  { label: "DLA JETS", href: "/dlajets" },
];

const CERTIFICATIONS = [
  "CMMI Level 3",
  "ISO 9001",
  "ISO/IEC 27001",
  "ISO/IEC 20000-1",
  "HUBZone Small Business",
  "Minority-Owned",
];

export default function HomePage() {
  const featuredCase = caseStudies[0];
  const supportingCases = caseStudies.slice(1, 3);
  const [leadPost, ...morePosts] = blogs.slice(0, 4);

  return (
    <main>
      <HomeHero />

      {/* ---- The fork: government or commercial -------------------------- */}
      <Band id="practices" tone="white">
        <SectionHead
          eyebrow="Two practices"
          title="One company, two ways in"
          lead="CompQsoft has run federal programmes and commercial transformation side by side for 28 years. Start with the one you came for."
        />

        <div className="grid gap-px border border-line bg-line lg:grid-cols-2">
          {PRACTICES.map((practice) => (
            <div key={practice.key} className="flex flex-col bg-bg">
              <div className="relative aspect-[16/9] overflow-hidden bg-black">
                <Image
                  src={practice.image.src}
                  alt={practice.image.alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="graded object-cover"
                />
                <span
                  className={`absolute inset-x-0 bottom-0 h-1 ${
                    practice.key === "government" ? "bg-brand-red" : "bg-brand-blue"
                  }`}
                  aria-hidden
                />
              </div>

              <div className="flex flex-1 flex-col p-8 sm:p-10">
                <Eyebrow practice={practice.key}>{practice.eyebrow}</Eyebrow>
                <h3 className="mt-5 text-h3 text-ink">{practice.title}</h3>
                <p className="mt-4 text-base text-body">{practice.lead}</p>

                <ul className="mt-8 divide-y divide-line border-y border-line">
                  {practice.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group flex items-center justify-between gap-6 py-3.5 text-base text-body transition-colors duration-150 ease-brand hover:text-link"
                      >
                        {link.label}
                        <Arrow className="h-3.5 w-3.5 shrink-0 transition-transform duration-150 ease-brand group-hover:translate-x-1" />
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <TextLink href={practice.href}>{practice.cta}</TextLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Band>

      {/* ---- Scale ------------------------------------------------------- */}
      <Counters
        tone="tint"
        eyebrow="Speaking by numbers"
        title="Twenty-eight years of delivering excellence"
        lead="Founded in Houston in 1997 as a minority-owned small business, now delivering across the continental United States and overseas."
        stats={[
          { value: "28", suffix: "+", label: "Years of Delivering Excellence" },
          { value: "240", suffix: "+", label: "Locations" },
          { value: "200", suffix: "+", label: "Global Customers" },
        ]}
      />

      {/* ---- Services ---------------------------------------------------- */}
      <ServiceTabs tabs={SERVICE_TABS} />

      {/* ---- Work -------------------------------------------------------- */}
      <Band id="work" tone="tint" practice="commercial">
        <SectionHead
          eyebrow="Our work"
          title="Transformational stories"
          practice="commercial"
          action={{ label: "All case studies", href: "/case-studies" }}
          align="split"
        />

        <div className="grid gap-x-10 gap-y-12 lg:grid-cols-[1.25fr_1fr]">
          {featuredCase && (
            <EditorialCard
              href={`/case-study/${featuredCase.slug}`}
              image={caseStudyImage(featuredCase)}
              title={featuredCase.title}
              excerpt={excerpt(featuredCase, 200)}
              practice="commercial"
              size="large"
            />
          )}

          <div className="divide-y divide-line border-t border-line">
            {supportingCases.map((study) => (
              <Link
                key={study.slug}
                href={`/case-study/${study.slug}`}
                className="group flex flex-col py-7 first:pt-7"
              >
                <h3 className="text-h4 text-ink transition-colors duration-150 ease-brand group-hover:text-link">
                  {study.title}
                </h3>
                <p className="mt-3 text-sm text-body">{excerpt(study, 140)}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm text-link">
                  Read case study
                  <Arrow className="h-3 w-3 transition-transform duration-150 ease-brand group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </Band>

      {/* ---- Latest ------------------------------------------------------ */}
      <Band id="latest" tone="white">
        <SectionHead
          eyebrow="Latest"
          title="News and perspectives"
          action={{ label: "All insights", href: "/blogs" }}
          align="split"
        />

        <div className="grid gap-x-10 gap-y-12 lg:grid-cols-3">
          {leadPost && (
            <div className="lg:col-span-2">
              <EditorialCard
                href={`/blog/${leadPost.slug}`}
                image={blogImage(leadPost)}
                category={
                  leadPost.category && leadPost.category !== "Uncategorized"
                    ? leadPost.category
                    : "Insight"
                }
                title={leadPost.title}
                excerpt={excerpt(leadPost, 220)}
                date={leadPost.published}
                size="large"
              />
            </div>
          )}

          <ul className="divide-y divide-line border-t border-line">
            {morePosts.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group block py-6">
                  <p className="text-stat-label uppercase text-muted">
                    {post.published &&
                      new Date(post.published).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        timeZone: "UTC",
                      })}
                  </p>
                  <h3 className="mt-2.5 text-h4 text-ink transition-colors duration-150 ease-brand group-hover:text-link">
                    {post.title}
                  </h3>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Band>

      {/* ---- Partners ---------------------------------------------------- */}
      <PartnerGrid
        tone="tint"
        eyebrow="Alliances"
        title="Our technology partners"
        lead="We hold partner status across the platforms our clients already run, so the work lands inside their existing licensing and support model."
        logos={partnerLogos}
        action={{ label: "All alliance partners", href: "/alliance-partners" }}
      />

      {/* ---- Federal credentials ---------------------------------------- */}
      <CredentialBand
        eyebrow="For contracting officers"
        title="Registered, certified and on contract"
        lead="Everything needed to qualify CompQsoft as a prime or subcontract partner, in one place."
        identifiers={company.identifiers}
        vehicles={VEHICLES}
        certifications={CERTIFICATIONS}
        action={{ label: "View prime contracts", href: "/primecontracts" }}
      />

      {/* ---- Careers ----------------------------------------------------- */}
      <Band tone="white">
        <div className="flex flex-col gap-8 border-l-4 border-brand-blue pl-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>Careers</Eyebrow>
            <h2 className="measure mt-5 text-h2 text-ink">
              Transform your career
            </h2>
            <p className="measure mt-5 text-lg text-body">
              Contribute, collaborate, and lead with CompQsoft. Check out our
              open positions.
            </p>
          </div>
          <TextLink href="/openings">Explore jobs</TextLink>
        </div>
      </Band>

      <CtaBand
        title="Connect with CompQsoft"
        lead="From strategic consulting to leading-edge technologies, we enable experiences that transform organizations for success."
        action={{ label: "Contact us", href: "/contact-us" }}
        secondary={{ label: "About CompQsoft", href: "/about-us" }}
      />
    </main>
  );
}
