import type { Metadata } from "next";
import Link from "next/link";
import { seoFor } from "@/lib/content";
import { company } from "@/lib/site";
import { bannerFor } from "@/lib/media";
import {
  Band,
  Eyebrow,
  Hero,
  IdentifierStrip,
  SectionHead,
} from "@/components/sections";
import { Arrow, MapPin, Phone } from "@/components/icons";
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

/**
 * Three published lines, one per audience, in the order the utility bar runs
 * them. A phone number is the fastest route off this page, so they come before
 * the form rather than beside it — a caller should not have to read a form to
 * find the number that would have saved them writing one.
 */
const DESKS = [
  {
    label: "Government",
    practice: "government" as const,
    phone: "571-999-6955",
    description:
      "Contracting officers, capture managers and program offices — DoD, DHS, HHS and civilian agencies.",
    link: { label: "Government IT services", href: "/government-it-services" },
  },
  {
    label: "Commercial",
    practice: "commercial" as const,
    phone: "571-200-3923",
    description:
      "CIOs and line-of-business buyers modernizing on Microsoft, Salesforce, ServiceNow or SAP.",
    link: { label: "Commercial IT services", href: "/technologygroup" },
  },
  {
    label: "Vendors, employees, HR",
    practice: "neutral" as const,
    phone: "703-775-1564",
    description:
      "Subcontractors and teaming partners, invoicing questions, and anything HR handles.",
    link: { label: "Employee resources", href: "/employee-resources" },
  },
];

const OFFICES = [
  {
    label: "Corporate office",
    city: "Leesburg, Virginia",
    address: company.corporateOffice,
    note: "Registered address for contract correspondence and federal filings.",
  },
  {
    label: "Houston office",
    city: "Houston, Texas",
    address: company.houstonOffice,
    note: "Where CompQsoft was founded in 1997, and the commercial delivery base.",
  },
];

/** What the sender gets back, so the form is not a message into a void. */
const NEXT_STEPS = [
  "Your message routes to the desk you picked — it is not a shared inbox.",
  "Someone who does the work replies, usually within one business day.",
  "If it needs scoping, we book a call before proposing anything.",
];

/**
 * The two audiences that most often land here by mistake. Both have a page
 * that answers them properly, and neither is served by an enquiry form.
 */
const ELSEWHERE = [
  {
    title: "Applying for a job",
    description: "Live openings are posted on the careers board, not handled here.",
    href: "/openings",
    cta: "View open roles",
  },
  {
    title: "Already an employee",
    description: "Holiday and pay calendars, portal links and the HR contact.",
    href: "/employee-resources",
    cta: "Employee resources",
  },
  {
    title: "Checking our credentials",
    description: "Appraisals, certifications and the prime contract vehicles.",
    href: "/compliance",
    cta: "Compliance",
  },
];

const mapsUrl = (address: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

const telHref = (phone: string) => `tel:+1${phone.replace(/-/g, "")}`;

export default function ContactPage() {
  return (
    <main>
      <Hero
        eyebrow="Contact"
        title="Talk to the team that does the work"
        lead="From strategic consulting to leading-edge technologies, we enable experiences that transform organizations for success."
        image={bannerFor(PATH)}
        practice="neutral"
        compact
      />

      {/* ---- Call the right desk ---------------------------------------- */}
      {/* Three cards, one per published line. The practice colour is the same
          signal the utility bar and the homepage fork use, so a returning
          visitor recognises which column is theirs before reading it. */}
      <Band tone="tint" practice="neutral">
        <SectionHead
          eyebrow="By phone"
          title="Three lines, one per audience"
          lead="Each goes to a different desk. Calling the right one is faster than any form on this page."
        />

        <div className="grid gap-px border border-line bg-line lg:grid-cols-3">
          {DESKS.map((desk) => (
            <div key={desk.phone} className="flex flex-col bg-bg p-7 sm:p-8">
              <Eyebrow practice={desk.practice}>{desk.label}</Eyebrow>

              <a
                href={telHref(desk.phone)}
                className="mt-6 inline-flex items-center gap-3 text-h2 text-ink transition-colors duration-150 ease-brand hover:text-link"
              >
                <Phone className="h-5 w-5 shrink-0 text-brand-blue" />
                {desk.phone}
              </a>

              <p className="mt-4 flex-1 text-sm text-body">{desk.description}</p>

              <Link
                href={desk.link.href}
                className="group mt-7 inline-flex items-center gap-2 self-start text-sm text-link transition-colors duration-150 ease-brand hover:text-link-hover"
              >
                {desk.link.label}
                <Arrow className="h-3 w-3 transition-transform duration-150 ease-brand group-hover:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm text-muted">
          Fax <span className="font-mono text-code text-body">281-968-2077</span>
          {" · "}
          Lines are staffed 9am–5pm ET, Monday to Friday.
        </p>
      </Band>

      {/* ---- The form --------------------------------------------------- */}
      {/* Plain white ground and a single column of fields. The old page put the
          form beside a full-height black rail, which made the one thing you
          came here to do the quieter half of a two-column split. */}
      <Band id="message" size="large">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7">
            <Eyebrow>By message</Eyebrow>
            <h2 className="measure-title mt-5 text-h1 text-ink">
              Tell us what you are trying to solve
            </h2>
            <p className="measure-lead mt-5 text-lg text-body">
              Five fields and a message. If it is time-sensitive, call the line
              above instead.
            </p>

            <div className="mt-14">
              <ContactForm />
            </div>
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+2.5rem)]">
              <p className="text-stat-label uppercase text-muted">
                What happens next
              </p>

              <ol className="mt-7 border-t border-line">
                {NEXT_STEPS.map((step, index) => (
                  <li
                    key={step}
                    className="flex gap-5 border-b border-line py-6"
                  >
                    <span className="tabular grid h-8 w-8 shrink-0 place-items-center rounded-pill bg-brand-blue text-sm text-ink">
                      {index + 1}
                    </span>
                    <span className="text-sm text-body">{step}</span>
                  </li>
                ))}
              </ol>

              <p className="mt-8 text-sm text-muted">
                We do not sell or share what you send. See the{" "}
                <Link
                  href="/privacy-policy"
                  className="text-link underline decoration-brand-blue decoration-2 underline-offset-4 transition-colors duration-150 ease-brand hover:text-link-hover"
                >
                  privacy policy
                </Link>
                .
              </p>
            </div>
          </aside>
        </div>
      </Band>

      {/* ---- Offices ----------------------------------------------------- */}
      <Band tone="tint" practice="neutral">
        <SectionHead
          eyebrow="In person"
          title="Two offices"
          lead="Mail and visitors go to the office that holds the relationship. Both addresses are current."
        />

        <div className="grid gap-px border border-line bg-line sm:grid-cols-2">
          {OFFICES.map((office) => (
            <div key={office.label} className="flex flex-col bg-bg p-7 sm:p-9">
              <p className="text-stat-label uppercase text-muted">
                {office.label}
              </p>
              <h3 className="mt-4 text-h3 text-ink">{office.city}</h3>

              <address className="mt-5 not-italic text-base text-body">
                {office.address}
              </address>

              <p className="mt-4 flex-1 text-sm text-muted">{office.note}</p>

              {/* Opens Google Maps in a new tab — an external destination, so
                  it is marked as one rather than stealing the tab. */}
              <a
                href={mapsUrl(office.address)}
                target="_blank"
                rel="noreferrer"
                className="group mt-7 inline-flex items-center gap-2 self-start text-sm text-link transition-colors duration-150 ease-brand hover:text-link-hover"
              >
                <MapPin className="h-4 w-4 shrink-0" />
                Get directions
                <span className="sr-only"> (opens in a new tab)</span>
                <Arrow className="h-3 w-3 transition-transform duration-150 ease-brand group-hover:translate-x-1" />
              </a>
            </div>
          ))}
        </div>
      </Band>

      {/* ---- Federal reference ------------------------------------------- */}
      {/* A contracting officer checking registrations before they call should
          not have to open a capability statement to do it. */}
      <IdentifierStrip
        eyebrow="For contracting officers"
        title="Registrations and codes"
        lead="CompQsoft, Inc. is registered in SAM.gov and holds prime positions on DISA ENCORE III, CMS SPARC, NITAAC CIO-SP3, OASIS SB and DLA JETS 2.0."
        identifiers={company.identifiers}
      />

      {/* ---- Wrong desk --------------------------------------------------- */}
      <Band tone="tint" practice="neutral" size="tight">
        <h2 className="text-h3 text-ink">Looking for something else?</h2>

        <ul className="mt-9 grid gap-px border border-line bg-line sm:grid-cols-3">
          {ELSEWHERE.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group relative flex h-full flex-col bg-bg p-7 transition-colors duration-150 ease-brand hover:bg-tint-neutral"
              >
                <span
                  className="absolute inset-x-0 top-0 h-[3px] w-0 bg-brand-blue transition-[width] duration-[180ms] ease-brand group-hover:w-full"
                  aria-hidden
                />
                <span className="text-h4 text-ink">{item.title}</span>
                <span className="mt-3 flex-1 text-sm text-body">
                  {item.description}
                </span>
                <span className="mt-6 inline-flex items-center gap-2 text-sm text-link">
                  {item.cta}
                  <Arrow className="h-3 w-3 transition-transform duration-150 ease-brand group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Band>
    </main>
  );
}
