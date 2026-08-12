import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { bySlug, excerpt, seoFor, webinars } from "@/lib/content";
import { CtaBand, Hero, Prose } from "@/components/sections";

const PRACTICE = "neutral" as const;

export function generateStaticParams() {
  return webinars.map((webinar) => ({ slug: webinar.slug }));
}

export async function generateMetadata(
  props: PageProps<"/webinar/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const webinar = bySlug(webinars, slug);
  if (!webinar) return {};
  const seo = seoFor(`/webinar/${slug}`);
  return {
    title: seo?.title ?? webinar.title,
    description: seo?.description ?? excerpt(webinar, 155),
    alternates: { canonical: `/webinar/${slug}` },
  };
}

export default async function WebinarPage(props: PageProps<"/webinar/[slug]">) {
  const { slug } = await props.params;
  const webinar = bySlug(webinars, slug);
  if (!webinar) notFound();

  return (
    <main>
      <Hero
        compact
        practice={PRACTICE}
        eyebrow="Webinar"
        title={webinar.title}
        actions={[{ label: "All webinars", href: "/webinars" }]}
      />

      <Prose blocks={webinar.blocks} />

      <CtaBand
        practice={PRACTICE}
        title="Want a session for your team?"
        lead="We run briefings tailored to your programme and its constraints."
      />
    </main>
  );
}
