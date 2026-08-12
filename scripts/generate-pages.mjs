/**
 * Emits the copy-heavy static pages — contract vehicles, corporate,
 * legal — which all share one shape: Hero, verbatim prose from
 * content.md Section 4, then a CTA band.
 *
 * Pages needing real structure (about, listings, contact, sitemap,
 * openings) are hand-written instead. Re-running is safe: it overwrites.
 */
import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pages = JSON.parse(
  (await import("node:fs")).readFileSync(join(root, "content/pages.json"), "utf8"),
);

/** [route, practice, eyebrow, fallback title, fallback lead, cta title] */
const SPECS = [
  ["/primecontracts", "government", "Contract vehicles", "Prime Contracts",
   "The vehicles CompQsoft holds as a prime contractor, and how to buy from us today.",
   "Need us on contract?"],
  ["/compliance", "government", "Government", "Compliance",
   "Our certifications, accreditation practice and the standards we deliver against.",
   "Questions about our compliance posture?"],
  ["/cio-sp3", "government", "Contract vehicle", "CIO-SP3",
   "NITAAC CIO-SP3 Small Business — HUBZone on-ramp, task areas 1, 2, 4, 5, 6, 7, 8, 9 and 10.",
   "Buying through CIO-SP3?"],
  ["/disa-encoreiii", "government", "Contract vehicle", "DISA ENCORE III",
   "CompQsoft holds a prime position on the DISA ENCORE III small business track.",
   "Buying through ENCORE III?"],
  ["/cms-sparc", "government", "Contract vehicle", "CMS SPARC",
   "Strategic Partners Acquisition Readiness Contract — CompQsoft as prime.",
   "Buying through SPARC?"],
  ["/oasis", "government", "Contract vehicle", "OASIS",
   "One Acquisition Solution for Integrated Services — Small Business, Pool 3.",
   "Buying through OASIS?"],
  ["/dlajets", "government", "Contract vehicle", "DLA JETS 2.0",
   "Defense Logistics Agency J6 Enterprise Technology Services, unrestricted track.",
   "Buying through DLA JETS?"],
  ["/employee-resources", "neutral", "Employees", "Employee Resources",
   "Holiday and pay calendars, portal links and HR contacts for CompQsoft employees.",
   "Need help from HR?"],
  ["/life-at-compqsoft", "neutral", "Careers", "Life at CompQsoft",
   "Our values, our benefits, and what it is like to build a career here.",
   "See our open positions"],
  ["/ghgemissions", "neutral", "Sustainability", "Our Commitment to Sustainability and Transparency",
   "Measuring, managing and publicly disclosing our greenhouse gas emissions.",
   "Questions about our ESG reporting?"],
  ["/erc", "neutral", "Corporate", "ERC",
   "Employee Retention Credit information.",
   "Get in touch"],
  ["/full-disclosures", "neutral", "Corporate", "Full Disclosures",
   "Statutory and contractual disclosures.",
   "Get in touch"],
  ["/socials", "neutral", "Corporate", "Socials",
   "Where to find CompQsoft across social platforms.",
   "Get in touch"],
  ["/privacy-policy", "neutral", "Legal", "Privacy Policy",
   "How CompQsoft collects, uses and protects personal information.",
   "Questions about your data?"],
  ["/cookies-policy", "neutral", "Legal", "Cookies Policy",
   "How this site uses cookies and how to control them.",
   "Questions about your data?"],
  ["/terms-and-conditions", "neutral", "Legal", "Terms and Conditions",
   "The terms governing use of this website.",
   "Questions?"],
  ["/unsubscribe", "neutral", "Legal", "Unsubscribe",
   "Remove your address from CompQsoft mailing lists.",
   "Need something else?"],
];

const componentName = (route) =>
  route
    .slice(1)
    .split(/[-/]/)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join("") + "Page";

let written = 0;

for (const [route, practice, eyebrow, title, lead, ctaTitle] of SPECS) {
  const page = pages[route];
  const dir = join(root, "app", route.slice(1));
  mkdirSync(dir, { recursive: true });

  const hasContent = Boolean(page?.blocks?.length);

  const source = `import type { Metadata } from "next";
import { pageFor, seoFor } from "@/lib/content";
import { CtaBand, Hero } from "@/components/sections";
${hasContent ? 'import { PageProse } from "@/components/page-content";\n' : ""}
const PRACTICE = ${JSON.stringify(practice)} as const;
const PATH = ${JSON.stringify(route)};
const seo = seoFor(PATH);

export const metadata: Metadata = {
  title: { absolute: seo?.title ?? ${JSON.stringify(`${title} - CompQsoft`)} },
  description: seo?.description ?? ${JSON.stringify(lead)},
  alternates: { canonical: PATH },
};

export default function ${componentName(route)}() {
  const page = pageFor(PATH);

  return (
    <main>
      <Hero
        compact
        practice={PRACTICE}
        eyebrow=${JSON.stringify(eyebrow)}
        title={page?.title?.replace(/\\s*-\\s*CompQsoft$/, "") ?? ${JSON.stringify(title)}}
        lead=${JSON.stringify(lead)}
      />
${
  hasContent
    ? `
      {page && <PageProse blocks={page.blocks} practice={PRACTICE} />}
`
    : ""
}
      <CtaBand practice={PRACTICE} title=${JSON.stringify(ctaTitle)} />
    </main>
  );
}
`;

  writeFileSync(join(dir, "page.tsx"), source);
  written++;
  console.log(
    `  ${hasContent ? "copy" : "stub"}  app${route}/page.tsx`,
  );
}

console.log(`\n${written} pages written.`);
if (!existsSync(join(root, "app/erc"))) console.log("note: /erc had no captured copy");
