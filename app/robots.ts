import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Internal design verification page — noindex is also set in its metadata.
      disallow: ["/styleguide"],
    },
    sitemap: "https://www.compqsoft.com/sitemap.xml",
  };
}
