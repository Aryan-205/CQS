import type { MetadataRoute } from "next";
import {
  blogs,
  capabilities,
  caseStudies,
  leadership,
  partners,
  services,
  webinars,
} from "@/lib/content";

const BASE = "https://www.compqsoft.com";

/** Hand-built routes. Dynamic routes are appended from the content layer. */
const STATIC_ROUTES = [
  "/",
  "/about-us",
  "/government-it-services",
  "/technologygroup",
  "/compliance",
  "/primecontracts",
  "/cio-sp3",
  "/disa-encoreiii",
  "/cms-sparc",
  "/oasis",
  "/dlajets",
  "/leadership-team",
  "/alliance-partners",
  "/case-studies",
  "/blogs",
  "/webinars",
  "/life-at-compqsoft",
  "/openings",
  "/employee-resources",
  "/contact-us",
  "/ghgemissions",
  "/erc",
  "/full-disclosures",
  "/socials",
  "/sitemap",
  "/privacy-policy",
  "/cookies-policy",
  "/terms-and-conditions",
  "/unsubscribe",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${BASE}${route}`,
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));

  const collections = [
    { records: services, base: "/services", priority: 0.8 },
    { records: capabilities, base: "/capabilities", priority: 0.5 },
    { records: caseStudies, base: "/case-study", priority: 0.6 },
    { records: blogs, base: "/blog", priority: 0.6 },
    { records: leadership, base: "/leadership-team", priority: 0.4 },
    { records: partners, base: "/alliance-partner", priority: 0.4 },
    { records: webinars, base: "/webinar", priority: 0.4 },
  ];

  for (const { records, base, priority } of collections) {
    for (const record of records) {
      entries.push({
        url: `${BASE}${base}/${record.slug}`,
        lastModified: record.modified ?? record.published,
        changeFrequency: "monthly",
        priority,
      });
    }
  }

  return entries;
}
