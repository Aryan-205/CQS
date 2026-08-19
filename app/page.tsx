import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { blogs, caseStudies, excerpt, seoFor } from "@/lib/content";
import {
  bannerFor,
  blogImage,
  blurPlaceholder,
  caseStudyImage,
  partnerLogos,
  practiceMedia,
  serviceBanner,
} from "@/lib/media";
import {
  Band,
  Counters,
  CtaBand,
  EditorialCard,
  Eyebrow,
  PartnerGrid,
  SectionHead,
  TextLink,
} from "@/components/sections";
import { Arrow } from "@/components/icons";
import { HomeHero } from "@/components/home/hero";
import { Featured } from "@/components/home/featured";
import { ServiceTabs, type ServiceTab } from "@/components/home/service-tabs";

/** CMS titles run to full sentences; past this they stop being headlines. */
function headline(text: string, max = 84) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const boundary = cut.lastIndexOf(" ");
  return `${(boundary > max * 0.6 ? cut.slice(0, boundary) : cut).replace(/[,;:.\s]+$/, "")}…`;
}

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
        image: serviceBanner("application-modernization")!,
      },
      {
        title: "Unified Communication",
        description:
          "Seamlessly integrate communication channels, enhance collaboration, and boost productivity with our unified communication solutions.",
        href: "/government-it-services",
        image: serviceBanner("modern-workplace")!,
      },
      {
        title: "Cybersecurity",
        description:
          "Protect critical assets and data from cyber threats with our comprehensive cybersecurity solutions, ensuring business continuity.",
        href: "/services/cyber-security-services",
        image: serviceBanner("cyber-security-services")!,
      },
      {
        title: "Network Management and Engineering",
        description:
          "Optimize network performance, ensure reliability, and drive efficiency with our expert network management and engineering services.",
        href: "/government-it-services",
        image: bannerFor("/government-it-services")!,
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
        image: serviceBanner("cloud-migration-and-modernization")!,
      },
      {
        title: "Application Modernization",
        description: "Modernize applications to unlock the full value of cloud.",
        href: "/services/application-modernization",
        image: serviceBanner("power-platform-and-rpa")!,
      },
      {
        title: "Data, Analytics and AI",
        description:
          "Leverage advanced analytics and AI to uncover deep insights, make data-driven decisions, and drive smarter business outcomes.",
        href: "/services/data-analytics-ai",
        image: serviceBanner("data-analytics-ai")!,
      },
      {
        title: "Business Applications",
        description:
          "Enhance your CRM and ERP applications using Dynamics 365 for improved efficiency, streamlined operations, and seamless customer experiences.",
        href: "/services/dynamics-365-crm-applications",
        image: serviceBanner("dynamics-365-crm-applications")!,
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

/**
 * Held back from the homepage only. The record still renders at
 * /case-study/dynamics-365-finance-case-study and still lists on /case-studies.
 */
const HOME_CASE_EXCLUSIONS = ["dynamics-365-finance-case-study"];

/* -------------------------------------------------------------------------
   CaseCard — a photograph with the headline set on it rather than under it.
   Only the case study band uses this; everywhere else on the page the picture
   sits above its words, and the difference is the point.
------------------------------------------------------------------------- */
function CaseCard({
  study,
  lead = false,
  standfirst,
}: {
  study: { slug: string; title: string; image?: { src: string; alt: string } };
  /** The tall card on the left of the band. */
  lead?: boolean;
  standfirst?: string;
}) {
  return (
    <Link
      href={`/case-study/${study.slug}`}
      className={`group relative isolate flex flex-col justify-end overflow-hidden rounded-soft bg-black ${
        lead ? "aspect-[4/3] lg:aspect-auto lg:min-h-[32rem]" : "aspect-[16/9] lg:aspect-auto"
      }`}
    >
      <Image
        src={caseStudyImage(study)}
        alt=""
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        placeholder="blur"
        blurDataURL={blurPlaceholder}
        className="-z-10 graded object-cover transition-transform duration-[240ms] ease-brand group-hover:scale-[1.03]"
      />
      {/* The type sits on live photography, so the foot of the frame carries
          its own ground rather than trusting the picture to be dark there. */}
      <div className="absolute inset-0 -z-10 scrim-card" aria-hidden />

      <div className={lead ? "p-8 sm:p-10" : "p-7 sm:p-8"}>
        {/* No category chip. The band is headed "Case studies" and holds
            nothing else, so labelling each card is the page telling the reader
            something it has already told them — and the pill was the loudest
            object in a composition whose subject is the photograph. */}
        <h3
          className={`max-w-[20ch] text-on-black ${lead ? "text-h2" : "text-h4"}`}
        >
          {headline(study.title, lead ? 72 : 60)}
        </h3>
        {standfirst && (
          <p className="mt-4 hidden max-w-[46ch] text-base text-on-black sm:block">
            {standfirst}
          </p>
        )}
        <span className="mt-6 inline-flex items-center gap-2 text-base text-on-black">
          Read case study
          <Arrow className="h-3.5 w-3.5 transition-transform duration-150 ease-brand group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export default function HomePage() {
  const homeCases = caseStudies.filter(
    (study) => !HOME_CASE_EXCLUSIONS.includes(study.slug),
  );
  const featuredCase = homeCases[0];
  const supportingCases = homeCases.slice(1, 3);
  const [featuredPost, ...featuredRail] = blogs.slice(0, 4);
  const latestPosts = blogs.slice(4, 8);

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

        <div className="grid gap-px overflow-hidden rounded-soft border border-line bg-line lg:grid-cols-2">
          {PRACTICES.map((practice) => (
            <div key={practice.key} className="flex flex-col bg-bg">
              <div className="relative aspect-[16/9] overflow-hidden bg-black">
                <Image
                  src={practice.image.src}
                  alt={practice.image.alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  placeholder="blur"
                  blurDataURL={blurPlaceholder}
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

      {/* ---- Partners ---------------------------------------------------- */}
      {/* Moved up above the case studies. A partner set is the fastest
          credibility read on the page — it is scanned, not read — and it was
          sitting sixth, after four content shelves had already spent the
          visitor's attention. */}
      <PartnerGrid
        tone="tint"
        eyebrow="Alliances"
        title="Our technology partners"
        lead="We hold partner status across the platforms our clients already run, so the work lands inside their existing licensing and support model."
        logos={partnerLogos}
        action={{ label: "All alliance partners", href: "/alliance-partners" }}
        rounded
      />

      {/* ---- Work -------------------------------------------------------- */}
      {/* Every other band on this page is a picture with its words underneath.
          This one puts the words on the picture: three overlay cards, the lead
          one tall on the left, two stacked beside it. Different unit, so the
          section reads as a change of subject rather than as another shelf —
          and the black-and-scrim treatment is the brand's own language.

          The right column is grid-rows-2, so the two stacked cards divide the
          lead card's height exactly rather than approximately. */}
      <Band id="work" tone="white" practice="commercial">
        <SectionHead
          eyebrow="Case studies"
          title="Performance, proven in the field"
          practice="commercial"
          action={{ label: "View all case studies", href: "/case-studies" }}
          align="split"
        />

        <div className="grid gap-5 lg:grid-cols-2 lg:items-stretch">
          {featuredCase && (
            <CaseCard
              study={featuredCase}
              lead
              standfirst={excerpt(featuredCase, 170)}
            />
          )}

          <div className="grid gap-5 lg:grid-rows-2">
            {supportingCases.map((study) => (
              <CaseCard key={study.slug} study={study} />
            ))}
          </div>
        </div>
      </Band>


      {/* ---- Featured ---------------------------------------------------- */}
      {featuredPost && (
        <Featured
          eyebrow="Featured"
          title="What we are working on"
          action={{ label: "View all updates", href: "/blogs" }}
          lead={{
            href: `/blog/${featuredPost.slug}`,
            image: blogImage(featuredPost),
            label: featuredPost.category?.split(",")[0] ?? "Insight",
            title: headline(featuredPost.title, 76),
          }}
          items={featuredRail.map((post) => ({
            href: `/blog/${post.slug}`,
            image: blogImage(post),
            label: post.category?.split(",")[0] ?? "Insight",
            title: headline(post.title, 64),
          }))}
        />
      )}

      {/* ---- Latest ------------------------------------------------------ */}
      {/* Four equal columns — nothing here outranks anything else, so the row
          reads as a shelf rather than a hierarchy. */}
      <Band id="latest" tone="white">
        <SectionHead
          eyebrow="Latest"
          title="Expert insights from every angle"
          action={{ label: "Explore more insights", href: "/blogs" }}
          align="split"
        />

        <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {latestPosts.map((post) => (
            <EditorialCard
              key={post.slug}
              href={`/blog/${post.slug}`}
              image={blogImage(post)}
              category={
                post.category && post.category !== "Uncategorized"
                  ? post.category
                  : "Insight"
              }
              title={headline(post.title, 64)}
              date={post.published}
              size="compact"
              rounded
            />
          ))}
        </div>
      </Band>

      {/* The contracting-officer credential band and the careers band both came
          off this page. The credentials live on /primecontracts and /compliance,
          which is where a capture manager is already headed; careers live on
          /life-at-compqsoft and /openings, linked from the nav and the footer. */}

      <CtaBand
        title="Connect with CompQsoft"
        lead="From strategic consulting to leading-edge technologies, we enable experiences that transform organizations for success."
        action={{ label: "Contact us", href: "/contact-us" }}
        secondary={{ label: "About CompQsoft", href: "/about-us" }}
      />
    </main>
  );
}
