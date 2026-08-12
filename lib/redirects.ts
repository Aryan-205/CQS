// Relative, not `@/` — this module is imported by next.config.ts, which is
// compiled outside the app's module graph and does not resolve the alias.
import faqs from "../content/faqs.json";
import taxonomy from "../content/taxonomy.json";
import services from "../content/services.json";
import capabilities from "../content/capabilities.json";

/**
 * 301s for the URLs the rebuild drops. Decided in CLAUDE.md: 115 old URLs
 * redirect to a parent that actually serves the visitor, rather than being
 * rebuilt as thin or dead pages. No link equity is lost.
 *
 * Generated from the content layer so the lists cannot drift out of sync.
 */
type Redirect = {
  source: string;
  destination: string;
  permanent: boolean;
};

/** Categories that survive as real listing pages rather than redirecting. */
const KEPT_CATEGORIES = new Set(["blogs", "government", "commercial"]);

export function buildRedirects(): Redirect[] {
  const redirects: Redirect[] = [];

  // 30 FAQ pages → the parent service page's accordion. Each FAQ binds to a
  // service through the category taxonomy; anything unmatched goes to /blogs.
  for (const faq of faqs) {
    const parent = services.find((s) => s.category === faq.category);
    redirects.push({
      source: `/faq/${faq.slug}`,
      destination: parent ? `/services/${parent.slug}#faq` : "/blogs",
      permanent: true,
    });
  }

  // 69 legacy job listings → the live Paylocity board.
  redirects.push({
    source: "/opening/:slug",
    destination: "/openings",
    permanent: true,
  });

  // 16 WordPress category archives → the filtered blog listing.
  for (const category of taxonomy) {
    if (KEPT_CATEGORIES.has(category.slug)) continue;
    redirects.push({
      source: `/category/${category.slug}`,
      destination: `/blogs?category=${category.slug}`,
      permanent: true,
    });
  }
  redirects.push(
    { source: "/category/blogs", destination: "/blogs", permanent: true },
    {
      source: "/category/blogs/government",
      destination: "/blogs?category=government",
      permanent: true,
    },
    {
      source: "/category/blogs/commercial",
      destination: "/blogs?category=commercial",
      permanent: true,
    },
  );

  // The old site's capability slug was misspelled `service-capabalities`.
  for (const capability of capabilities) {
    redirects.push({
      source: `/service-capabalities/${capability.slug}`,
      destination: `/capabilities/${capability.slug}`,
      permanent: true,
    });
  }

  // Renamed and retired routes.
  redirects.push(
    {
      source: "/commercial-it-services",
      destination: "/technologygroup",
      permanent: true,
    },
    { source: "/service-capabalities", destination: "/blogs", permanent: true },
  );

  return redirects;
}
