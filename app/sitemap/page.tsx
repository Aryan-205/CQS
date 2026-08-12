import type { Metadata } from "next";
import Link from "next/link";
import {
  blogs,
  capabilities,
  caseStudies,
  leadership,
  partners,
  seoFor,
  services,
  webinars,
} from "@/lib/content";
import { Band, Hero } from "@/components/sections";
import { footerColumns } from "@/lib/site";

const PATH = "/sitemap";
const seo = seoFor(PATH);

export const metadata: Metadata = {
  title: seo?.title ?? "Site Map",
  description:
    seo?.description ?? "Every page on the CompQsoft site, in one place.",
  alternates: { canonical: PATH },
};

/** The header's search icon points here — an HTML sitemap is the honest
 *  fallback until a real search index exists. */
export default function SitemapPage() {
  const groups = [
    {
      heading: "Main pages",
      links: footerColumns.flatMap((column) => column.links),
    },
    {
      heading: "Services",
      links: services.map((s) => ({
        label: s.title,
        href: `/services/${s.slug}`,
      })),
    },
    {
      heading: "Capabilities",
      links: capabilities.map((c) => ({
        label: c.title,
        href: `/capabilities/${c.slug}`,
      })),
    },
    {
      heading: "Case studies",
      links: caseStudies.map((c) => ({
        label: c.title,
        href: `/case-study/${c.slug}`,
      })),
    },
    {
      heading: "Blogs",
      links: blogs.map((b) => ({ label: b.title, href: `/blog/${b.slug}` })),
    },
    {
      heading: "Leadership",
      links: leadership.map((p) => ({
        label: p.title,
        href: `/leadership-team/${p.slug}`,
      })),
    },
    {
      heading: "Alliance partners",
      links: partners.map((p) => ({
        label: p.title,
        href: `/alliance-partner/${p.slug}`,
      })),
    },
    {
      heading: "Webinars",
      links: webinars.map((w) => ({
        label: w.title,
        href: `/webinar/${w.slug}`,
      })),
    },
  ];

  return (
    <main>
      <Hero
        compact
        eyebrow="Site map"
        title="Every page on this site"
        lead="Looking for something specific? Everything we publish is listed below."
      />

      <Band>
        <div className="space-y-16">
          {groups.map((group) => (
            <section key={group.heading}>
              <h2 className="mb-6 flex items-center gap-3 text-h3 text-ink">
                <span className="h-[3px] w-6 bg-brand-blue" aria-hidden />
                {group.heading}
                <span className="text-sm text-muted">{group.links.length}</span>
              </h2>
              <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-base text-link transition-colors duration-150 ease-brand hover:text-link-hover"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </Band>
    </main>
  );
}
