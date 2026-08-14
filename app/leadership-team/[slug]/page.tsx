import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { bySlug, excerpt, leaderRole, leadership, seoFor } from "@/lib/content";
import {
  Band,
  CtaBand,
  Eyebrow,
  Hero,
  PeopleGrid,
  Prose,
} from "@/components/sections";

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
  const role = leaderRole(person.slug);

  // The opening paragraph runs beside the portrait, so the prose below picks
  // up from the second — the biography is told once, not twice.
  const opening = person.blocks[0];
  const lead = person.image && opening?.type === "para" ? opening.text : undefined;
  const proseBlocks = lead ? person.blocks.slice(1) : person.blocks;

  return (
    <main>
      <Hero
        compact
        practice={PRACTICE}
        eyebrow="Leadership"
        title={person.title}
        lead={role}
        actions={[{ label: "Leadership team", href: "/leadership-team" }]}
      />

      {/* The portrait sits beside the opening of the biography rather than in
          the hero: the hero band is dark mission photography, and a headshot
          dropped into it would have to be graded to survive, which is the one
          thing you must not do to a picture of a person. */}
      {person.image && (
        <Band practice={PRACTICE}>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-4">
              <div className="relative aspect-square overflow-hidden rounded-card bg-tint-neutral">
                <Image
                  src={person.image.src}
                  alt={person.title}
                  fill
                  priority
                  sizes="(min-width: 1024px) 32vw, 100vw"
                  className="object-cover object-top"
                />
                <span
                  className="absolute inset-x-0 bottom-0 h-1 bg-brand-blue"
                  aria-hidden
                />
              </div>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <Eyebrow practice={PRACTICE}>{role ?? "Leadership"}</Eyebrow>
              <h2 className="mt-7 text-h1 text-ink">{person.title}</h2>
              {lead && <p className="measure mt-8 text-lg text-body">{lead}</p>}
            </div>
          </div>
        </Band>
      )}

      {proseBlocks.length > 0 && <Prose blocks={proseBlocks} />}

      <PeopleGrid
        tone="tint"
        practice={PRACTICE}
        eyebrow="Leadership"
        title="Also on the team"
        columns={4}
        people={others.map((other) => ({
          name: other.title,
          role: leaderRole(other.slug),
          href: `/leadership-team/${other.slug}`,
          image: other.image,
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
