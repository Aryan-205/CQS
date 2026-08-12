import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { bySlug, partners, seoFor } from "@/lib/content";
import { CardGrid, CtaBand, Hero, Prose } from "@/components/sections";

const PRACTICE = "commercial" as const;

export function generateStaticParams() {
  return partners.map((partner) => ({ slug: partner.slug }));
}

export async function generateMetadata(
  props: PageProps<"/alliance-partner/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const partner = bySlug(partners, slug);
  if (!partner) return {};
  const seo = seoFor(`/alliance-partner/${slug}`);
  return {
    title: seo?.title ?? partner.title,
    description:
      seo?.description ??
      `${partner.title} is an alliance partner of CompQsoft.`,
    alternates: { canonical: `/alliance-partner/${slug}` },
  };
}

export default async function PartnerPage(
  props: PageProps<"/alliance-partner/[slug]">,
) {
  const { slug } = await props.params;
  const partner = bySlug(partners, slug);
  if (!partner) notFound();

  const others = partners.filter((p) => p.slug !== partner.slug).slice(0, 8);

  return (
    <main>
      <Hero
        compact
        practice={PRACTICE}
        eyebrow="Alliance partner"
        title={partner.title}
        lead={`CompQsoft partners with ${partner.title} to deliver technology programmes across federal and commercial engagements.`}
        actions={[{ label: "All partners", href: "/alliance-partners" }]}
      />

      {/* Partner records in content.md are image/label only — no body copy. */}
      {partner.blocks.length > 0 && <Prose blocks={partner.blocks} />}

      <CardGrid
        tone="tint"
        practice={PRACTICE}
        eyebrow="Ecosystem"
        title="Other alliance partners"
        columns={4}
        cards={others.map((other) => ({
          title: other.title,
          href: `/alliance-partner/${other.slug}`,
        }))}
      />

      <CtaBand
        practice={PRACTICE}
        title="Building on this platform?"
        lead="We hold the partnerships and the delivery experience to make it work in production."
      />
    </main>
  );
}
