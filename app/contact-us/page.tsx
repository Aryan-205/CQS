import type { Metadata } from "next";
import { seoFor } from "@/lib/content";
import { company } from "@/lib/site";
import { Eyebrow } from "@/components/sections";
import { ContactForm } from "@/components/contact-form";

const PATH = "/contact-us";
const seo = seoFor(PATH);

export const metadata: Metadata = {
  title: seo?.title ?? "Contact Us",
  description:
    seo?.description ??
    "Connect with CompQsoft. From strategic consulting to leading-edge technologies, we enable experiences that transform organizations for success.",
  alternates: { canonical: PATH },
};

/** Three published lines, one per audience — the fastest route off this page. */
const LINES = [
  { label: "Government customers", value: "571-999-6955" },
  { label: "Commercial customers", value: "571-200-3923" },
  { label: "Vendors, employees, HR", value: "703-775-1564" },
] as const;

const OFFICES = [
  { label: "Corporate office", address: company.corporateOffice },
  { label: "Houston office", address: company.houstonOffice },
] as const;

export default function ContactPage() {
  return (
    <main className="lg:grid lg:grid-cols-12">
      {/* ---- Left rail: everything you can reach without a form ---------- */}
      <aside className="relative isolate overflow-hidden grad-hero lg:col-span-5 lg:sticky lg:top-[var(--header-h)] lg:h-[calc(100svh-var(--header-h))] lg:overflow-y-auto">
        <div className="absolute inset-0 hairline-grid opacity-50" aria-hidden />

        <div className="relative px-6 pb-20 pt-16 sm:px-10 lg:px-14 lg:py-16">
          <Eyebrow onDark>Contact</Eyebrow>
          <h1 className="mt-8 max-w-[14ch] text-h1 text-on-black">
            Talk to the team that does the work
          </h1>
          <p className="mt-6 max-w-[46ch] text-base text-on-black-mute">
            From strategic consulting to leading-edge technologies, we enable
            experiences that transform organizations for success.
          </p>

          <dl className="mt-14 border-t border-white/15">
            {LINES.map((line) => (
              <div key={line.value} className="border-b border-white/15 py-5">
                <dt className="text-stat-label uppercase text-on-black-mute">
                  {line.label}
                </dt>
                <dd className="mt-1.5">
                  <a
                    href={`tel:${line.value.replace(/-/g, "")}`}
                    className="text-h3 text-on-black transition-colors duration-150 ease-brand hover:text-brand-blue"
                  >
                    {line.value}
                  </a>
                </dd>
              </div>
            ))}
            <div className="border-b border-white/15 py-5">
              <dt className="text-stat-label uppercase text-on-black-mute">
                Fax
              </dt>
              <dd className="mt-1.5 text-h4 text-on-black">281-968-2077</dd>
            </div>
          </dl>

          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {OFFICES.map((office) => (
              <div key={office.label}>
                <p className="text-stat-label uppercase text-on-black-mute">
                  {office.label}
                </p>
                <p className="mt-2.5 text-sm text-on-black">{office.address}</p>
              </div>
            ))}
          </div>

          {/* A contracting officer scans for these first. Mono, one line. */}
          <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/15 pt-8">
            {company.identifiers.map((id) => (
              <li key={id.label} className="text-sm">
                <span className="text-on-black-mute">{id.label} </span>
                <span className="font-mono text-code text-on-black">
                  {id.value}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Practice signal, closing the panel. */}
        <span
          className="absolute inset-x-0 bottom-0 h-1 bg-brand-blue lg:inset-y-0 lg:left-auto lg:right-0 lg:h-auto lg:w-1"
          aria-hidden
        />
      </aside>

      {/* ---- Right: the form -------------------------------------------- */}
      <div className="px-6 py-24 sm:px-10 lg:col-span-7 lg:px-20 lg:py-32">
        <div className="mx-auto max-w-[46rem]">
          <h2 className="max-w-[18ch] text-h2 text-ink">
            Tell us what you are trying to solve
          </h2>
          <p className="measure mt-5 text-base text-body">
            Fill this in and it reaches the right desk. If it is
            time-sensitive, call the line beside it instead.
          </p>

          <div className="mt-14">
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}
