import type { Metadata } from "next";
import { excerpt, leaderRole, leadership, seoFor } from "@/lib/content";
import { CtaBand, Hero, PeopleGrid } from "@/components/sections";
import { bannerFor } from "@/lib/media";

const PATH = "/leadership-team";
const seo = seoFor(PATH);

export const metadata: Metadata = {
  title: seo?.title ?? "Leadership Team",
  description:
    seo?.description ??
    "The leadership team running CompQsoft's federal and commercial practices.",
  alternates: { canonical: PATH },
};

export default function LeadershipIndexPage() {
  return (
    <main>
      <Hero
        image={bannerFor(PATH)}
        compact
        eyebrow="About"
        title="Leadership team"
        lead="The people accountable for how CompQsoft delivers, across both practices."
      />

      <PeopleGrid
        eyebrow="Meet our leaders"
        people={leadership.map((person) => ({
          name: person.title,
          role: leaderRole(person.slug),
          href: `/leadership-team/${person.slug}`,
          image: person.image,
          description: excerpt(person, 140),
        }))}
        columns={3}
      />

      <CtaBand
        title="Want to talk to us directly?"
        lead="From strategic consulting to leading-edge technologies, we enable experiences that transform organizations for success."
      />
    </main>
  );
}
