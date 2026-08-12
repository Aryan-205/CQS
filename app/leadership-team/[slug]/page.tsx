import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { bySlug, excerpt, leadership, seoFor } from "@/lib/content";
import { CardGrid, CtaBand, Hero, Prose } from "@/components/sections";

const PRACTICE = "neutral" as const;

export function generateStaticParams() {
  return leadership.map((person) => ({ slug: person.slug }));
}

export async function generateMetadata(
  props: PageProps<"/leadership-team/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const person = bySlug(leadership, slug);
  if (!person) return {};
  const seo = seoFor(`/leadership-team/${slug}`);
  return {
    title: seo?.title ?? person.title,
    description: seo?.description ?? excerpt(person, 155),
    alternates: { canonical: `/leadership-team/${slug}` },
  };
}

export default async function LeaderPage(
  props: PageProps<"/leadership-team/[slug]">,
) {
  const { slug } = await props.params;
  const person = bySlug(leadership, slug);
  if (!person) notFound();

  const others = leadership.filter((p) => p.slug !== person.slug);

  return (
    <main>
      <Hero
        compact
        practice={PRACTICE}
        eyebrow="Leadership"
        title={person.title}
        actions={[{ label: "Leadership team", href: "/leadership-team" }]}
      />

      <Prose blocks={person.blocks} />

      <CardGrid
        tone="tint"
        practice={PRACTICE}
        eyebrow="Leadership"
        title="Also on the team"
        columns={4}
        cards={others.map((other) => ({
          title: other.title,
          href: `/leadership-team/${other.slug}`,
        }))}
      />

      <CtaBand
        practice={PRACTICE}
        title="Work with our team"
        lead="From strategic consulting to leading-edge technologies, we enable experiences that transform organizations for success."
      />
    </main>
  );
}
