import type { Metadata } from "next";
import { pageFor, seoFor } from "@/lib/content";
import { CtaBand, Hero } from "@/components/sections";

const PRACTICE = "neutral" as const;
const PATH = "/erc";
const seo = seoFor(PATH);

export const metadata: Metadata = {
  title: { absolute: seo?.title ?? "ERC - CompQsoft" },
  description: seo?.description ?? "Employee Retention Credit information.",
  alternates: { canonical: PATH },
};

export default function ErcPage() {
  const page = pageFor(PATH);

  return (
    <main>
      <Hero
        compact
        practice={PRACTICE}
        eyebrow="Corporate"
        title={page?.title?.replace(/\s*-\s*CompQsoft$/, "") ?? "ERC"}
        lead="Employee Retention Credit information."
      />

      <CtaBand practice={PRACTICE} title="Get in touch" />
    </main>
  );
}
