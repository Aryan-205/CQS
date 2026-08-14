/**
 * Typed access to the content layer generated from content.md.
 *
 * Regenerate with `node scripts/parse-content.mjs`. Never hand-edit
 * anything under content/ — content.md is the source of truth.
 */
import servicesData from "@/content/services.json";
import capabilitiesData from "@/content/capabilities.json";
import caseStudiesData from "@/content/case-studies.json";
import blogsData from "@/content/blogs.json";
import faqsData from "@/content/faqs.json";
import leadershipData from "@/content/leadership.json";
import partnersData from "@/content/partners.json";
import webinarsData from "@/content/webinars.json";
import taxonomyData from "@/content/taxonomy.json";
import seoData from "@/content/seo.json";
import pagesData from "@/content/pages.json";

/* -------------------------------------------------------------------------
   Block AST — the markdown subset used by every body in content.md.
------------------------------------------------------------------------- */
export type Block =
  | { type: "heading"; text: string }
  | { type: "para"; text: string }
  | { type: "list"; items: ListItem[] };

export type ListItem = { text: string; children?: string[] };

export type Record = {
  title: string;
  url: string;
  slug: string;
  id?: number;
  published?: string;
  modified?: string;
  category?: string;
  image?: { src: string; alt: string };
  blocks: Block[];
};

export type Taxonomy = {
  id: number;
  name: string;
  slug: string;
  count: number;
};

/* -------------------------------------------------------------------------
   Collections. The JSON is structurally correct by construction — the parser
   validates counts — so a single assertion at the boundary is enough.
------------------------------------------------------------------------- */
export const services = servicesData as Record[];
export const capabilities = capabilitiesData as Record[];
export const caseStudies = caseStudiesData as Record[];
export const blogs = blogsData as Record[];
export const faqs = faqsData as Record[];
export const leadership = leadershipData as Record[];
export const partners = partnersData as Record[];
export const webinars = webinarsData as Record[];
export const taxonomy = taxonomyData as Taxonomy[];

const seo = seoData as globalThis.Record<
  string,
  { title: string; description: string }
>;

/** SEO title and description captured per URL from the live site. */
export function seoFor(path: string) {
  const entry = seo[path] ?? seo[path.replace(/\/$/, "")];
  if (!entry) return undefined;
  return {
    title: entry.title.replace(/\s*[-|]\s*CompQsoft$/, "").trim(),
    description: entry.description || undefined,
  };
}

/* -------------------------------------------------------------------------
   Section 4: the old site's pages as rendered, in visual order. Used as the
   verbatim copy source for the hand-built pages.
------------------------------------------------------------------------- */
export type PageBlock =
  | { type: "heading"; level: number; text: string }
  | { type: "para"; text: string }
  | { type: "button"; label: string; href: string }
  | { type: "link"; label: string; href: string }
  | { type: "image"; src: string; alt: string }
  | { type: "list"; items: { label: string; href: string }[] };

export type PageContent = {
  title?: string;
  description?: string;
  blocks: PageBlock[];
};

const pages = pagesData as unknown as globalThis.Record<string, PageContent>;

export const pageFor = (path: string): PageContent | undefined => pages[path];

export const bySlug = (list: Record[], slug: string) =>
  list.find((r) => r.slug === slug);

/**
 * Job titles for the leadership records.
 *
 * The CMS record carries only the name, the portrait and the biography — the
 * role is markup on the /leadership-team/ page itself (content.md:832), so it
 * survives here rather than in content/leadership.json, which the parser
 * regenerates.
 */
const LEADERSHIP_ROLES: globalThis.Record<string, string> = {
  "madina-shaik": "CEO / Founder",
  "sachin-narula": "CFO",
  "thomas-decot": "COO",
  "qamer-baber": "Director of Information Technology",
  "christen-carrier": "Director of Human Resources",
};

export const leaderRole = (slug: string): string | undefined =>
  LEADERSHIP_ROLES[slug];

/** Capabilities and FAQs bind to a service through the category taxonomy. */
export const byCategory = (list: Record[], category?: string) =>
  category ? list.filter((r) => r.category === category) : [];

/** First paragraph, used as the teaser on listing cards. */
export function excerpt(record: Record, max = 180) {
  const para = record.blocks.find((b) => b.type === "para");
  if (!para) return "";
  const text = para.text.replace(/\*\*/g, "");
  if (text.length <= max) return text;
  // Cut on a word boundary — a teaser that stops mid-word reads as a bug.
  const cut = text.slice(0, max);
  const boundary = cut.lastIndexOf(" ");
  return `${(boundary > max * 0.6 ? cut.slice(0, boundary) : cut).replace(/[,;:.\s]+$/, "")}…`;
}

/** Practice coding drives tint bands, card rules and eyebrow colour. */
export type Practice = "government" | "commercial" | "neutral";

/**
 * The page ground is white everywhere — there are no tinted or grey bands.
 * Band rhythm comes from this instead: a very light brand bloom behind the
 * content, scattered so no two adjacent bands read the same.
 */
export const glowClass = (practice: Practice) =>
  practice === "government"
    ? "glow-red"
    : practice === "commercial"
      ? "glow-blue"
      : "glow-neutral";

export const ruleClass = (practice: Practice) =>
  practice === "government" ? "bg-brand-red" : "bg-brand-blue";

export const eyebrowClass = (practice: Practice) =>
  practice === "government" ? "text-red-text" : "text-link";
