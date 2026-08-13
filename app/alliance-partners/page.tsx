import type { Metadata } from "next";
import { partners, seoFor } from "@/lib/content";
import { CardGrid, CtaBand, Hero, Intro } from "@/components/sections";
import { bannerFor } from "@/lib/media";

const PRACTICE = "commercial" as const;
const PATH = "/alliance-partners";
const seo = seoFor(PATH);

export const metadata: Metadata = {
  title: seo?.title ?? "Alliance Partners",
  description:
    seo?.description ??
    "The technology and alliance partners CompQsoft builds on across federal and commercial programmes.",
  alternates: { canonical: PATH },
};

export default function AlliancePartnersPage() {
  return (
    <main>
      <Hero
        image={bannerFor(PATH)}
        compact
        practice={PRACTICE}
        eyebrow="About"
        title="Alliance partners"
        lead="Our clients rely on us as trusted advisors for navigating their technology choices. These are the platforms and partners we build on."
      />

      <Intro
        tone="tint"
        practice={PRACTICE}
        eyebrow="Ecosystem"
        title="Partnerships that shorten delivery"
      >
        <p>
          Partner accreditation means we bring proven reference architectures
          and direct escalation paths rather than starting from scratch on every
          engagement.
        </p>
      </Intro>

      <CardGrid
        practice={PRACTICE}
        cards={partners.map((partner) => ({
          title: partner.title,
          href: `/alliance-partner/${partner.slug}`,
        }))}
        columns={4}
      />

      <CtaBand
        practice={PRACTICE}
        title="Building on one of these platforms?"
        lead="We hold the partnerships and the delivery experience to make it work in production."
      />
    </main>
  );
}
