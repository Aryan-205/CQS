/**
 * The image layer.
 *
 * Every URL here is transcribed from content.md Section 7 (Media Library) —
 * real CompQsoft photography, partner logos and service glyphs, not stock.
 * The host is allow-listed in next.config.ts so next/image can optimise them.
 *
 * When the assets are migrated into /public, only the CDN constant and the
 * paths below change; no component imports a raw URL.
 */

const CDN = "https://www.compqsoft.com/wp-content/uploads";

export type Media = { src: string; alt: string };

/* -------------------------------------------------------------------------
   Hero
   The homepage runs video. The poster has to work as a finished still on its
   own — it is what mobile, slow connections and reduced-motion users see.
------------------------------------------------------------------------- */
export const heroVideo = "/media/hero.mp4";

export const heroPoster: Media = {
  src: `${CDN}/2025/03/cyber-banner-scaled-1.jpg`,
  alt: "",
};

/* -------------------------------------------------------------------------
   Page banners — the dark interior hero image, keyed by route.
   Routes with no entry fall back to the brand gradient alone, which is a
   finished treatment rather than a placeholder.
------------------------------------------------------------------------- */
const BANNERS: Record<string, string> = {
  "/about-us": `${CDN}/2024/04/about-us-bg.jpg`,
  "/government-it-services": `${CDN}/2024/04/government-it-services-banner.webp`,
  "/technologygroup": `${CDN}/2024/12/technologygroup-banner.jpg`,
  "/compliance": `${CDN}/2024/07/compliance-banner.webp`,
  "/primecontracts": `${CDN}/2024/12/compqsoft-banner.jpg`,
  "/leadership-team": `${CDN}/2024/04/leadership-team-banner.jpg`,
  "/alliance-partners": `${CDN}/2024/04/alliance-partners-bg.jpg`,
  "/blogs": `${CDN}/2024/04/blog-banner.jpg`,
  "/case-studies": `${CDN}/2024/04/casestudy-banner.jpg`,
  "/webinars": `${CDN}/2024/04/blog-banner.jpg`,
  "/contact-us": `${CDN}/2024/04/contact-us-banner.jpg`,
  "/life-at-compqsoft": `${CDN}/2024/04/careers-banner.jpg`,
  "/openings": `${CDN}/2024/04/careers-banner.jpg`,
  "/employee-resources": `${CDN}/2024/04/careers-banner.jpg`,
  "/cio-sp3": `${CDN}/2024/12/compqsoft-banner.jpg`,
  "/oasis": `${CDN}/2024/12/compqsoft-banner.jpg`,
  "/disa-encoreiii": `${CDN}/2024/12/compqsoft-banner.jpg`,
  "/cms-sparc": `${CDN}/2024/12/compqsoft-banner.jpg`,
  "/dlajets": `${CDN}/2024/12/compqsoft-banner.jpg`,
  "/erc": `${CDN}/2024/04/careers-banner.jpg`,
};

export const bannerFor = (path: string): string | undefined =>
  BANNERS[path.replace(/\/$/, "")];

/**
 * Service banners, keyed by slug.
 *
 * These are the wide 1500×468 / 2250×702 crops, not the 773×915 portraits the
 * CMS record carries — a portrait cropped to a banner loses its subject and
 * reads as noise. Slugs with no wide asset fall through to the gradient, which
 * is a finished treatment on its own.
 */
const SERVICE_BANNERS: Record<string, string> = {
  "cyber-security-services": `${CDN}/2025/03/cyber-banner-scaled-1.jpg`,
  "cloud-migration-and-modernization": `${CDN}/2024/04/cloud-migration.jpg`,
  "data-analytics-ai": `${CDN}/2024/04/data-analytics-ai.jpg`,
  "application-modernization": `${CDN}/2024/04/application-modernization-banner.jpg`,
  "dynamics-365-crm-applications": `${CDN}/2024/04/Dynamics-365-CRM.jpg`,
  "dynamics-365-erp-applications": `${CDN}/2024/04/Dynamics-365-ERP-banner.jpg`,
  "dynamics-365-finance-and-operations": `${CDN}/2024/09/Untitled-design-4-1.png`,
  "modern-workplace": `${CDN}/2024/04/modern-workplace-banner.jpg`,
  "power-platform-and-rpa": `${CDN}/2024/04/power-platform-rpa-banner.jpg`,
  "salesforce-services": `${CDN}/2024/04/salesforce-services-banner.jpg`,
  "servicenow-services": `${CDN}/2024/04/servicenow.jpg`,
  sap: `${CDN}/2024/04/sap-banner.jpg`,
  "business-intelligence-consulting-services": `${CDN}/2024/07/Business-Intelligence-Consulting-Services.png`,
  "copilot-and-generative-ai-services": `${CDN}/2024/12/2250x705.jpg`,
};

export const serviceBanner = (slug: string): string | undefined =>
  SERVICE_BANNERS[slug];

/* -------------------------------------------------------------------------
   Practice panels — the dual-audience split, the first choice a visitor makes.
------------------------------------------------------------------------- */
export const practiceMedia = {
  government: {
    src: `${CDN}/2024/04/government-it-services-banner.webp`,
    alt: "Federal network operations",
  },
  commercial: {
    src: `${CDN}/2024/12/technologygroup-banner.jpg`,
    alt: "Commercial digital transformation",
  },
} satisfies Record<string, Media>;

/* -------------------------------------------------------------------------
   Technology partners — content.md:617, in the order the live site runs them.
------------------------------------------------------------------------- */
export const partnerLogos: (Media & { width: number; height: number })[] = [
  { src: `${CDN}/2024/04/client-logo-1.png`, alt: "Microsoft", width: 157, height: 47 },
  { src: `${CDN}/2024/04/client-logo-5.png`, alt: "Salesforce", width: 157, height: 47 },
  { src: `${CDN}/2024/04/client-logo-2.png`, alt: "Accenture", width: 157, height: 47 },
  { src: `${CDN}/2024/04/client-logo-3.png`, alt: "SAP", width: 157, height: 47 },
  { src: `${CDN}/2024/04/client-logo-6.png`, alt: "ServiceNow", width: 157, height: 47 },
  { src: `${CDN}/2024/04/ibm.png`, alt: "IBM", width: 157, height: 47 },
  { src: `${CDN}/2024/04/client-logo-4.png`, alt: "Oracle", width: 157, height: 47 },
  { src: `${CDN}/2024/04/general.png`, alt: "General Dynamics", width: 157, height: 47 },
  { src: `${CDN}/2024/04/bylight.png`, alt: "By Light", width: 157, height: 47 },
  { src: `${CDN}/2024/04/casi.png`, alt: "CASI", width: 157, height: 47 },
];

/* -------------------------------------------------------------------------
   Service glyphs — the 2024/05 SVG set, one per homepage service card.
------------------------------------------------------------------------- */
export const serviceIcons = {
  softwareDevelopment: `${CDN}/2024/05/Software-Development-Engineering.svg`,
  unifiedCommunication: `${CDN}/2024/05/Unified-Communication.svg`,
  cybersecurity: `${CDN}/2024/05/Cybersecurity.svg`,
  networkManagement: `${CDN}/2024/05/Network-Management-and-Engineering.svg`,
  cloud: `${CDN}/2024/05/Cloud-services.svg`,
  appModernization: `${CDN}/2024/05/Application-Modernization.svg`,
  dataAnalytics: `${CDN}/2024/05/Data-Analytics.svg`,
  businessApplications: `${CDN}/2024/05/business-application.svg`,
  automation: `${CDN}/2024/05/Automation.svg`,
  serviceNow: `${CDN}/2024/05/Generative-AI.svg`,
  salesforce: `${CDN}/2024/05/Salesforce.svg`,
  sap: `${CDN}/2024/05/SAP-Services.svg`,
} as const;

/* -------------------------------------------------------------------------
   Fallbacks for records whose CMS entry carries no image.
------------------------------------------------------------------------- */
const CASE_STUDY_FALLBACKS = [
  `${CDN}/2024/04/Application-Modernization_casestudy.jpg`,
  `${CDN}/2024/04/Dynamics-365-CRM-Applications_case.jpg`,
  `${CDN}/2024/04/Cloud-Migration-and-Modernization_case.jpg`,
  `${CDN}/2024/04/Data-Analytics-AI_case.jpg`,
  `${CDN}/2024/04/Modern-Workplace_case.jpg`,
  `${CDN}/2024/04/SAP_case.jpg`,
  `${CDN}/2024/04/Salesforce-Services_case.jpg`,
  `${CDN}/2024/04/ServiceNow-Services_case.jpg`,
];

const BLOG_FALLBACKS = [
  `${CDN}/2024/04/blog-01.jpg`,
  `${CDN}/2024/04/blog-02.jpg`,
  `${CDN}/2024/04/blog-03.jpg`,
];

/** Deterministic so server and client agree and the choice is stable per slug. */
function pick(list: string[], seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return list[hash % list.length];
}

export const caseStudyImage = (record: { slug: string; image?: Media }): string =>
  record.image?.src ?? pick(CASE_STUDY_FALLBACKS, record.slug);

export const blogImage = (record: { slug: string; image?: Media }): string =>
  record.image?.src ?? pick(BLOG_FALLBACKS, record.slug);
