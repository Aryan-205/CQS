import type { Metadata } from "next";
import Link from "next/link";
import { blogs, seoFor, taxonomy } from "@/lib/content";
import { Band, CtaBand, Hero, ListingGrid } from "@/components/sections";
import { bannerFor } from "@/lib/media";
import { blogImage } from "@/lib/media";

const PATH = "/blogs";
const seo = seoFor(PATH);

export const metadata: Metadata = {
  title: seo?.title ?? "Blogs",
  description:
    seo?.description ??
    "Insights on federal IT modernization, cloud, data and AI from the CompQsoft team.",
  alternates: { canonical: PATH },
};

/**
 * This page absorbs the old site's 19 /category/ archive URLs through the
 * `category` search param — those URLs 301 here. See CLAUDE.md.
 */
export default async function BlogsPage(props: PageProps<"/blogs">) {
  const params = await props.searchParams;
  const raw = params.category;
  const active = Array.isArray(raw) ? raw[0] : raw;

  // Only offer categories that actually have posts behind them.
  const categories = taxonomy.filter((category) =>
    blogs.some((post) => post.category === category.name),
  );

  const selected = categories.find((c) => c.slug === active);
  const posts = selected
    ? blogs.filter((post) => post.category === selected.name)
    : blogs;

  return (
    <main>
      <Hero
        image={bannerFor(PATH)}
        compact
        eyebrow="Insights"
        title={selected ? selected.name : "Blogs"}
        lead={
          selected
            ? `${posts.length} post${posts.length === 1 ? "" : "s"} on ${selected.name}.`
            : "Perspectives on federal IT modernization, the Microsoft estate, cloud, data and AI."
        }
      />

      {categories.length > 0 && (
        <Band tone="tint" size="normal">
          <p className="mb-5 text-stat-label uppercase text-muted">
            Filter by topic
          </p>
          <ul className="flex flex-wrap gap-2">
            <li>
              <Link
                href="/blogs"
                className={`inline-block rounded-pill px-4 py-1.5 text-sm transition-colors duration-150 ease-brand ${
                  selected
                    ? "border border-line text-body hover:border-ink"
                    : "bg-brand-blue text-ink"
                }`}
              >
                All
              </Link>
            </li>
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/blogs?category=${category.slug}`}
                  className={`inline-block rounded-pill px-4 py-1.5 text-sm transition-colors duration-150 ease-brand ${
                    selected?.slug === category.slug
                      ? "bg-brand-blue text-ink"
                      : "border border-line text-body hover:border-ink"
                  }`}
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </Band>
      )}

      <ListingGrid
        imageFor={blogImage}
        records={posts}
        basePath="/blog"
        empty="No posts in this topic yet."
      />

      <CtaBand
        title="Want to go deeper?"
        lead="Our engineers are happy to walk through how any of this applies to your environment."
      />
    </main>
  );
}
