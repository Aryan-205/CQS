import type { Metadata } from "next";
import { pageFor, seoFor } from "@/lib/content";
import { CtaBand, Hero } from "@/components/sections";
import { PageProse } from "@/components/page-content";
import { bannerFor } from "@/lib/media";

const PRACTICE = "neutral" as const;
const PATH = "/employee-resources";
const seo = seoFor(PATH);

export const metadata: Metadata = {
  title: { absolute: seo?.title ?? "Employee Resources - CompQsoft" },
  description: seo?.description ?? "Holiday and pay calendars, portal links and HR contacts for CompQsoft employees.",
  alternates: { canonical: PATH },
};

export default function EmployeeResourcesPage() {
  const page = pageFor(PATH);

  return (
    <main>
      <Hero
        image={bannerFor(PATH)}
        compact
        practice={PRACTICE}
        eyebrow="Employees"
        title={page?.title?.replace(/\s*-\s*CompQsoft$/, "") ?? "Employee Resources"}
        lead="Holiday and pay calendars, portal links and HR contacts for CompQsoft employees."
      />

      {page && <PageProse blocks={page.blocks} practice={PRACTICE} />}

      <CtaBand practice={PRACTICE} title="Need help from HR?" />
    </main>
  );
}
