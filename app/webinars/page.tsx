import type { Metadata } from "next";
import { seoFor, webinars } from "@/lib/content";
import { CtaBand, Hero, ListingGrid } from "@/components/sections";

const PATH = "/webinars";
const seo = seoFor(PATH);

export const metadata: Metadata = {
  title: seo?.title ?? "Webinars",
  description:
    seo?.description ??
    "Briefings and recorded sessions from the CompQsoft team.",
  alternates: { canonical: PATH },
};

export default function WebinarsPage() {
  return (
    <main>
      <Hero
        compact
        eyebrow="Insights"
        title="Webinars"
        lead="Recorded briefings on federal IT modernization and the Microsoft estate."
      />

      <ListingGrid
        records={webinars}
        basePath="/webinar"
        empty="No webinars published yet."
      />

      <CtaBand
        title="Want a session for your team?"
        lead="We run briefings tailored to your programme and its constraints."
      />
    </main>
  );
}
