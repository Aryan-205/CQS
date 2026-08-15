import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { bySlug, caseStudies, excerpt, seoFor } from "@/lib/content";
import { CtaBand, Hero, ListingGrid, Prose } from "@/components/sections";
import { caseStudyImage } from "@/lib/media";

const PRACTICE = "commercial" as const;

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata(
  props: PageProps<"/case-study/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const study = bySlug(caseStudies, slug);
  if (!study) return {};
  const seo = seoFor(`/case-study/${slug}`);
  return {
    title: seo?.title ?? study.title,
    description: seo?.description ?? excerpt(study, 155),
    alternates: { canonical: `/case-study/${slug}` },
  };
}

export default async function CaseStudyPage(
  props: PageProps<"/case-study/[slug]">,
) {
  const { slug } = await props.params;
  const study = bySlug(caseStudies, slug);
  if (!study) notFound();

  const related = caseStudies
    .filter((s) => s.slug !== study.slug)
    .slice(0, 3);

  return (
    <main>
      <Hero
        image={caseStudyImage(study)}
        compact
        practice={PRACTICE}
        eyebrow="Case study"
        title={study.title}
        actions={[{ label: "All case studies", href: "/case-studies" }]}
      />

      <Prose blocks={study.blocks} size="tight" />

      <ListingGrid
        tone="tint"
        practice={PRACTICE}
        records={related}
        basePath="/case-study"
      />

      <CtaBand
        practice={PRACTICE}
        title="Facing a similar problem?"
        lead="Tell us what you are working with and we will show you what comparable programmes achieved."
      />
    </main>
  );
}
