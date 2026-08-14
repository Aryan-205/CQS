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

/** A mark rather than a photograph: intrinsic size matters, so it carries one. */
export type LogoMedia = Media & { width: number; height: number };

/* -------------------------------------------------------------------------
   Hero
   The homepage runs video. The poster has to work as a finished still on its
   own — it is what mobile, slow connections and reduced-motion users see.
------------------------------------------------------------------------- */
export const heroVideo = "/media/hero.mp4";

/** A frame lifted straight out of hero.mp4, so the still and the footage are
 *  the same shot rather than two different pictures fighting each other. */
export const heroPoster: Media = {
  src: "/media/hero-poster.jpg",
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
   Mega-menu imagery. Every link in a panel resolves to its own picture, so
   the panel shows the destination rather than one decorative still. Links
   with no asset of their own fall back to the panel's own image.
------------------------------------------------------------------------- */
const NAV_PANEL_IMAGES: Record<string, string> = {
  Services: `${CDN}/2024/12/technologygroup-banner.jpg`,
  Practices: `${CDN}/2024/04/government-it-services-banner.webp`,
  Insights: `${CDN}/2024/04/blog-banner.jpg`,
  Careers: `${CDN}/2024/04/careers-banner.jpg`,
  About: `${CDN}/2024/04/about-us-bg.jpg`,
};

export const navPanelImage = (label: string): string =>
  NAV_PANEL_IMAGES[label] ?? `${CDN}/2024/12/compqsoft-banner.jpg`;

export const navImage = (href: string): string | undefined => {
  const path = href.replace(/\/$/, "");
  if (path.startsWith("/services/"))
    return SERVICE_BANNERS[path.slice("/services/".length)];
  return BANNERS[path];
};

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
   Careers imagery. The media library holds one careers asset — the banner —
   so the culture and benefits sections borrow from the company photography
   rather than running a picture-less page. Every one of these is real
   CompQsoft artwork from Section 7, graded at the render site like the rest.
------------------------------------------------------------------------- */
export const careersMedia = {
  culture: {
    src: `${CDN}/2024/04/customer-story.jpg`,
    alt: "CompQsoft delivery team at work",
  },
  team: {
    src: `${CDN}/2024/04/leadership-team-banner.jpg`,
    alt: "The CompQsoft team",
  },
  workplace: {
    src: `${CDN}/2024/04/about-us-bg.jpg`,
    alt: "A CompQsoft operations floor",
  },
} satisfies Record<string, Media>;

/* -------------------------------------------------------------------------
   Technology partners — content.md:617, in the order the live site runs them.
------------------------------------------------------------------------- */
/**
 * The homepage marks come from the alliance-partner records, not the
 * `client-logo-*.png` set: those PNGs are white-on-transparent artwork cut for
 * a dark band and carry no colour at all. These JPGs are the full-colour
 * originals, on white, so they need no filter on a white page.
 */
export const partnerLogos: (Media & { width: number; height: number })[] = [
  { src: `${CDN}/2024/04/logo-01-1.jpg`, alt: "Microsoft", width: 175, height: 92 },
  { src: `${CDN}/2024/04/logo-02.jpg`, alt: "Salesforce", width: 175, height: 92 },
  { src: `${CDN}/2024/04/logo-06.jpg`, alt: "Accenture", width: 175, height: 92 },
  { src: `${CDN}/2024/04/logo-03.jpg`, alt: "SAP", width: 175, height: 92 },
  { src: `${CDN}/2024/04/logo-04.jpg`, alt: "ServiceNow", width: 175, height: 92 },
  { src: `${CDN}/2024/04/logo-07.jpg`, alt: "IBM", width: 175, height: 92 },
  { src: `${CDN}/2024/04/logo-08.jpg`, alt: "Oracle", width: 175, height: 92 },
  { src: `${CDN}/2024/04/logo-15.jpg`, alt: "General Dynamics", width: 175, height: 92 },
  { src: `${CDN}/2024/05/aws.jpg`, alt: "AWS", width: 175, height: 92 },
  { src: `${CDN}/2024/05/splunk.jpg`, alt: "Splunk", width: 175, height: 92 },
];

/* -------------------------------------------------------------------------
   Customer marks — the agency seals, transcribed from content.md Section 7.

   A contracting officer scanning a page recognises the DISA seal before they
   read the word "DISA", so the named-customer list runs as artwork rather
   than as type. Seals are federal insignia: they are never recoloured,
   inverted or cropped, only scaled inside a fixed box.

   `mix-blend-multiply` at the render site drops the white plate some of these
   carry (the CDC, UIC and ORNL marks are JPG/PNG on white) onto the page
   ground; every one of them is artwork on white, so nothing else is needed.
------------------------------------------------------------------------- */
export const agencySeals = {
  dod: { src: `${CDN}/2024/04/dod.png`, alt: "Department of Defense", width: 105, height: 105 },
  deca: { src: `${CDN}/2024/04/dca.png`, alt: "Defense Commissary Agency", width: 105, height: 105 },
  uscg: { src: `${CDN}/2024/04/uscg.png`, alt: "United States Coast Guard", width: 105, height: 105 },
  navy: { src: `${CDN}/2024/04/navy.png`, alt: "United States Navy", width: 105, height: 105 },
  disa: {
    src: `${CDN}/2024/05/DISA_Seal.png`,
    alt: "Defense Information Systems Agency",
    width: 776,
    height: 776,
  },
  army: { src: `${CDN}/2024/04/usarmy.png`, alt: "United States Army", width: 516, height: 506 },
  dla: {
    src: `${CDN}/2024/09/Seal_of_the_Defense_Logistics_Agency.svg.png`,
    alt: "Defense Logistics Agency",
    width: 1200,
    height: 1475,
  },
  cdc: {
    src: `${CDN}/2024/05/US_CDC_logo.jpg`,
    alt: "Centers for Disease Control and Prevention",
    width: 600,
    height: 453,
  },
  hhs: {
    src: `${CDN}/2024/05/HHS.png`,
    alt: "Department of Health and Human Services",
    width: 2000,
    height: 2000,
  },
  ornl: {
    src: `${CDN}/2024/05/ORNL-DOE.png`,
    alt: "Oak Ridge National Laboratory",
    width: 1200,
    height: 619,
  },
  uic: {
    src: `${CDN}/2024/05/UIC_logo.jpg`,
    alt: "University of Illinois",
    width: 715,
    height: 763,
  },
  navyJag: {
    src: `${CDN}/2024/05/Seal_of_the_United_States_Navy_Judge_Advocate_Generals_Corps.png`,
    alt: "United States Navy Judge Advocate General's Corps",
    width: 400,
    height: 397,
  },
  comoptevfor: {
    src: `${CDN}/2024/05/Commander_Operational_Test_and_Evaluation_Force_seal.jpg`,
    alt: "Commander, Operational Test and Evaluation Force",
    width: 640,
    height: 638,
  },
  gsa: {
    src: `${CDN}/2024/05/gsa-logo.png`,
    alt: "General Services Administration",
    width: 200,
    height: 95,
  },
} satisfies Record<string, LogoMedia>;

/**
 * The named-customer wall, in the order content.md:39 lists them.
 *
 * DHS is a named customer with no mark in the media library. Rather than
 * substitute someone else's artwork or drop a real customer, the wall renders
 * that cell as the name alone — the component treats the logo as optional.
 */
export const customerLogos: { name: string; logo?: LogoMedia }[] = [
  { name: "U.S. Coast Guard", logo: agencySeals.uscg },
  { name: "DISA", logo: agencySeals.disa },
  { name: "U.S. Navy", logo: agencySeals.navy },
  { name: "Defense Commissary Agency", logo: agencySeals.deca },
  { name: "Department of Defense", logo: agencySeals.dod },
  { name: "Defense Logistics Agency", logo: agencySeals.dla },
  { name: "U.S. Army", logo: agencySeals.army },
  { name: "CDC", logo: agencySeals.cdc },
  { name: "HHS", logo: agencySeals.hhs },
  { name: "DOE Oak Ridge", logo: agencySeals.ornl },
  { name: "University of Illinois", logo: agencySeals.uic },
  { name: "DHS" },
];

/* -------------------------------------------------------------------------
   Certification marks — the badges the live /compliance/ page runs.

   Labels follow the artwork rather than the archive. The archive captions
   these with superseded revisions (9001:2008, 27001:2005, 20000:2005), which
   CLAUDE.md rules a content error; the 9001 badge states 2015 on its face, so
   that label carries the revision. The 27001 and 20000-1 badges state none,
   and the company has not published which revision it holds, so those labels
   name the standard only — asserting a revision nothing evidences would just
   swap one wrong number for another.
------------------------------------------------------------------------- */
export const certificationLogos: (LogoMedia & { label: string })[] = [
  {
    src: `${CDN}/2025/06/QUALITY-MANAGEMENT-SYSTEM-ISO-9001-scaled.png`,
    alt: "ISO 9001 quality management system certification",
    label: "ISO 9001:2015",
    width: 2560,
    height: 2560,
  },
  {
    src: `${CDN}/2025/06/INFORMATION-SECURITY-MANAGEMENT-ISO-27001-scaled.png`,
    alt: "ISO/IEC 27001 information security management certification",
    label: "ISO/IEC 27001",
    width: 2560,
    height: 2560,
  },
  {
    src: `${CDN}/2025/06/IT-SERVICE-MANAGEMENT-ISO-20000-scaled.png`,
    alt: "ISO/IEC 20000-1 IT service management certification",
    label: "ISO/IEC 20000-1",
    width: 2560,
    height: 2560,
  },
  {
    src: `${CDN}/2024/07/certifications-logo-04.webp`,
    alt: "CMMI Development Level 3 appraisal",
    label: "CMMI-DEV Level 3",
    width: 346,
    height: 118,
  },
  {
    src: `${CDN}/2024/07/certifications-logo-05.webp`,
    alt: "CMMI Services Level 3 appraisal",
    label: "CMMI-SVC Level 3",
    width: 346,
    height: 118,
  },
  {
    src: `${CDN}/2025/07/CMMC-Compliance-Solutions-_-NeQter-Labs.jpeg`,
    alt: "Cybersecurity Maturity Model Certification",
    label: "CMMC",
    width: 204,
    height: 192,
  },
];

/* -------------------------------------------------------------------------
   Contract vehicle marks. `/compliance/` runs the four square IDIQ badges
   plus the DLA seal; `/primecontracts/` runs the vehicles' own artwork at
   full size against each award's write-up.
------------------------------------------------------------------------- */
export const vehicleLogos = {
  encoreIii: {
    src: `${CDN}/2024/07/contracts-logo-01.webp`,
    alt: "DISA ENCORE III",
    width: 244,
    height: 151,
  },
  sparc: {
    src: `${CDN}/2024/07/contracts-logo-02.webp`,
    alt: "CMS SPARC",
    width: 244,
    height: 151,
  },
  cioSp3: {
    src: `${CDN}/2024/07/contracts-logo-03.webp`,
    alt: "NITAAC CIO-SP3",
    width: 244,
    height: 151,
  },
  oasis: {
    src: `${CDN}/2024/07/contracts-logo-04.webp`,
    alt: "OASIS Small Business",
    width: 244,
    height: 151,
  },
  dlaJets: {
    src: `${CDN}/2024/09/Seal_of_the_Defense_Logistics_Agency.svg-1-1.png`,
    alt: "DLA JETS 2.0",
    width: 122,
    height: 149,
  },
  gsaSchedule: agencySeals.gsa,
  accent: {
    src: `${CDN}/2024/05/ACC_Logo.jpg`,
    alt: "Army Contracting Command",
    width: 751,
    height: 769,
  },
  aesip: {
    src: `${CDN}/2024/05/AESIP.png`,
    alt: "Army Enterprise Systems Integration Program",
    width: 300,
    height: 92,
  },
  seaport: {
    src: `${CDN}/2024/05/Seaport-e.jpg`,
    alt: "SeaPort NxG",
    width: 329,
    height: 329,
  },
} satisfies Record<string, LogoMedia>;

/** The five IDIQ vehicles with their own detail page, as /compliance/ runs them. */
export const idiqLogos: (LogoMedia & { label: string; href: string })[] = [
  { ...vehicleLogos.encoreIii, label: "DISA ENCORE III", href: "/disa-encoreiii" },
  { ...vehicleLogos.sparc, label: "CMS SPARC", href: "/cms-sparc" },
  { ...vehicleLogos.cioSp3, label: "NITAAC CIO-SP3", href: "/cio-sp3" },
  { ...vehicleLogos.oasis, label: "OASIS SB Pool 3", href: "/oasis" },
  { ...vehicleLogos.dlaJets, label: "DLA JETS 2.0", href: "/dlajets" },
];

/* -------------------------------------------------------------------------
   Federal case study marks — the six programme logos on /compliance/, keyed
   by the case study slug they link to.
------------------------------------------------------------------------- */
export const federalCaseStudyLogos: (LogoMedia & { label: string; slug: string })[] = [
  {
    src: `${CDN}/2024/07/case-studies-logo-01.webp`,
    alt: "Brooke Army Medical Center",
    label: "BAMC",
    slug: "bamc",
    width: 152,
    height: 149,
  },
  {
    src: `${CDN}/2024/07/case-studies-logo-02.webp`,
    alt: "Defense Enterprise Accounting and Management System",
    label: "DEAMS",
    slug: "deams",
    width: 152,
    height: 149,
  },
  {
    src: `${CDN}/2024/07/case-studies-logo-03.webp`,
    alt: "General Fund Enterprise Business System",
    label: "GFEBS",
    slug: "gfebs",
    width: 152,
    height: 149,
  },
  {
    src: `${CDN}/2024/07/case-studies-logo-04.webp`,
    alt: "Logistics Support Activity",
    label: "LOGSA",
    slug: "logsa-lites",
    width: 152,
    height: 149,
  },
  {
    src: `${CDN}/2024/07/case-studies-logo-05.webp`,
    alt: "Marine Corps Enterprise IT Services",
    label: "MCEITS",
    slug: "mceits",
    width: 152,
    height: 149,
  },
  {
    src: `${CDN}/2024/07/case-studies-logo-06.webp`,
    alt: "United States Air Force",
    label: "U.S. Air Force",
    slug: "ecss-dmo",
    width: 152,
    height: 149,
  },
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
