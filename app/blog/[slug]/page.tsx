import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogs, bySlug, excerpt, seoFor } from "@/lib/content";
import { CtaBand, Hero, ListingGrid, Prose } from "@/components/sections";

const PRACTICE = "neutral" as const;

export function generateStaticParams() {
  return blogs.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = bySlug(blogs, slug);
  if (!post) return {};
  const seo = seoFor(`/blog/${slug}`);
  return {
    title: seo?.title ?? post.title,
    description: seo?.description ?? excerpt(post, 155),
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      publishedTime: post.published,
      modifiedTime: post.modified,
    },
  };
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = bySlug(blogs, slug);
  if (!post) notFound();

  const related = blogs.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <main>
      <Hero
        compact
        practice={PRACTICE}
        eyebrow={
          post.published
            ? new Date(post.published).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                timeZone: "UTC",
              })
            : "Insight"
        }
        title={post.title}
        actions={[{ label: "All insights", href: "/blogs" }]}
      />

      <Prose blocks={post.blocks} />

      <ListingGrid
        tone="tint"
        practice={PRACTICE}
        records={related}
        basePath="/blog"
      />

      <CtaBand
        practice={PRACTICE}
        title="Want to go deeper on this?"
        lead="Our engineers are happy to walk through how this applies to your environment."
      />
    </main>
  );
}
