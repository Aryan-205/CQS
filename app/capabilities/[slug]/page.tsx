import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  bySlug,
  byCategory,
  capabilities,
  excerpt,
  services,
  seoFor,
} from "@/lib/content";
import { CardGrid, CtaBand, Hero, Prose } from "@/components/sections";

const PRACTICE = "commercial" as const;

export function generateStaticParams() {
  return capabilities.map((capability) => ({ slug: capability.slug }));
}

export async function generateMetadata(
  props: PageProps<"/capabilities/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const capability = bySlug(capabilities, slug);
  if (!capability) return {};
  // Old site served these under the misspelled /service-capabalities/ path.
  const seo = seoFor(`/service-capabalities/${slug}`);
  return {
    title: seo?.title ?? capability.title,
    description: seo?.description ?? excerpt(capability, 155),
    alternates: { canonical: `/capabilities/${slug}` },
  };
}

export default async function CapabilityPage(
  props: PageProps<"/capabilities/[slug]">,
) {
  const { slug } = await props.params;
  const capability = bySlug(capabilities, slug);
  if (!capability) notFound();

  const parent = services.find((s) => s.category === capability.category);
  const siblings = byCategory(capabilities, capability.category)
    .filter((c) => c.slug !== capability.slug)
    .slice(0, 6);

  return (
    <main>
      <Hero
        compact
        practice={PRACTICE}
        eyebrow={capability.category ?? "Capability"}
        title={capability.title}
        actions={
          parent
            ? [{ label: `All ${parent.title}`, href: `/services/${parent.slug}` }]
            : undefined
        }
      />

      <Prose blocks={capability.blocks} />

      {siblings.length > 0 && (
        <CardGrid
          tone="tint"
          practice={PRACTICE}
          eyebrow="Related"
          title="Other capabilities in this service"
          cards={siblings.map((sibling) => ({
            title: sibling.title,
            href: `/capabilities/${sibling.slug}`,
            description: excerpt(sibling, 110),
          }))}
        />
      )}

      <CtaBand
        practice={PRACTICE}
        title="Need this capability on your programme?"
        lead="We will scope it against your environment and constraints."
      />
    </main>
  );
}
