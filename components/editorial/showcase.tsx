/**
 * Additional section layouts for the service pages.
 *
 * The service template already carries an overview split, a counter band, a
 * capability list, the four-stage approach, the credential band and the FAQ
 * panel. These are the layouts that sit between them: the ones that argue a
 * case rather than list a set — a shift from today's system to the target
 * one, a phased plan, a side-by-side comparison, the commercial models.
 *
 * Same rules as the rest of the deep pages: white ground, borders instead of
 * shadows, 400/500 weights, brand primaries as fills and rules carrying ink
 * text, three hierarchy levels per band and nothing more. Every one of these
 * renders on the server — no layout here needs state.
 */
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Practice } from "@/lib/content";
import { ruleClass } from "@/lib/content";
import { Arrow, Check } from "@/components/icons";
import { Band, Button, Eyebrow, SectionHead, TextLink } from "@/components/sections";

/** A brand-filled marker always carries ink, never white — the contrast table. */
const markerClass = (practice: Practice) => `${ruleClass(practice)} text-ink`;

/* =========================================================================
   1. ShiftPanels — the argument the page is actually making, stated as two
   columns: what the current system costs, what the target one gives back.
   Practice colour splits them, so the eye reads the change before the words:
   the constraint column is marked red, the outcome column blue.
   ========================================================================= */
export function ShiftPanels({
  eyebrow = "The shift",
  title,
  lead,
  before,
  after,
  tone = "white",
  practice = "commercial",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  before: { label: string; items: string[] };
  after: { label: string; items: string[] };
  tone?: "white" | "tint";
  practice?: Practice;
}) {
  return (
    <Band tone={tone} practice={practice} size="large">
      <SectionHead eyebrow={eyebrow} title={title} lead={lead} practice={practice} />

      {/* One hairline between the panels on desktop, above on mobile — the
          gap-px on a line-coloured ground draws it without a border rule. */}
      <div className="grid gap-px border border-line bg-line lg:grid-cols-2">
        <div className="bg-bg p-9 sm:p-12">
          <p className="flex items-center gap-3 text-eyebrow uppercase text-muted">
            <span className="h-[3px] w-6 bg-brand-red" aria-hidden />
            {before.label}
          </p>
          <ul className="mt-9 space-y-6">
            {before.items.map((item) => (
              <li key={item} className="flex gap-5 text-base text-body">
                {/* A bar, not a cross: this is the state of things, not an error. */}
                <span
                  className="mt-3 h-[3px] w-4 shrink-0 bg-brand-red"
                  aria-hidden
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-bg p-9 sm:p-12">
          <p className="flex items-center gap-3 text-eyebrow uppercase text-link">
            <span className="h-[3px] w-6 bg-brand-blue" aria-hidden />
            {after.label}
          </p>
          <ul className="mt-9 space-y-6">
            {after.items.map((item) => (
              <li key={item} className="flex gap-5 text-base text-ink">
                <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-pill bg-brand-blue text-ink">
                  <Check className="h-3.5 w-3.5" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Band>
  );
}

/* =========================================================================
   2. ModuleGrid — the applications inside a suite, as a ruled grid of cells
   rather than as floating cards. Hairlines only, so nine modules read as one
   object; a linked cell lights its title and arrow on hover.
   ========================================================================= */
export function ModuleGrid({
  eyebrow = "The suite",
  title,
  lead,
  action,
  modules,
  tone = "white",
  practice = "commercial",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  action?: { label: string; href: string };
  modules: { title: string; description: string; href?: string }[];
  tone?: "white" | "tint";
  practice?: Practice;
}) {
  if (!modules.length) return null;

  return (
    <Band tone={tone} practice={practice} size="large">
      <SectionHead
        eyebrow={eyebrow}
        title={title}
        lead={lead}
        practice={practice}
        action={action}
        align={action ? "split" : "left"}
      />

      <ul className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((module, i) => {
          const body = (
            <>
              <span className="tabular text-stat-label uppercase text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-7 text-h3 text-ink transition-colors duration-150 ease-brand group-hover:text-link">
                {module.title}
              </h3>
              <p className="mt-4 text-sm text-body">{module.description}</p>
              {module.href && (
                <span className="mt-8 flex text-muted transition-colors duration-150 ease-brand group-hover:text-link">
                  <Arrow className="h-4 w-4 transition-transform duration-150 ease-brand group-hover:translate-x-1" />
                </span>
              )}
            </>
          );

          return (
            <li key={module.title} className="bg-bg">
              {module.href ? (
                <Link href={module.href} className="group block h-full p-9 sm:p-10">
                  {body}
                </Link>
              ) : (
                <div className="group h-full p-9 sm:p-10">{body}</div>
              )}
            </li>
          );
        })}
      </ul>
    </Band>
  );
}

/* =========================================================================
   3. PhaseTimeline — the plan, on a vertical rail. The four-stage approach
   band answers "how do you work"; this answers "what happens, in what order,
   and roughly when" — so each phase carries a duration and its deliverables.
   ========================================================================= */
export function PhaseTimeline({
  eyebrow = "The programme",
  title,
  lead,
  phases,
  action,
  tone = "tint",
  practice = "commercial",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  phases: {
    title: string;
    duration: string;
    description: string;
    outputs?: string[];
  }[];
  action?: { label: string; href: string };
  tone?: "white" | "tint";
  practice?: Practice;
}) {
  return (
    <Band tone={tone} practice={practice} size="large">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
          <Eyebrow practice={practice}>{eyebrow}</Eyebrow>
          <h2 className="mt-7 text-h1 text-ink">{title}</h2>
          {lead && <p className="mt-7 text-base text-body">{lead}</p>}
          {action && (
            <div className="mt-8">
              <TextLink href={action.href}>{action.label}</TextLink>
            </div>
          )}
        </div>

        {/* The rail is the list's own left border; markers sit astride it. */}
        <ol className="relative border-l border-line lg:col-span-7 lg:col-start-6">
          {phases.map((phase, i) => (
            <li
              key={phase.title}
              className="relative pb-14 pl-10 last:pb-0 sm:pl-14"
            >
              <span
                className={`absolute -left-6 top-0 grid h-12 w-12 place-items-center rounded-pill text-h4 tabular ${markerClass(practice)}`}
                aria-hidden
              >
                {i + 1}
              </span>
              <p className="font-mono text-code uppercase text-muted">
                {phase.duration}
              </p>
              <h3 className="mt-3 text-h3 text-ink">{phase.title}</h3>
              <p className="measure mt-4 text-base text-body">
                {phase.description}
              </p>
              {phase.outputs && phase.outputs.length > 0 && (
                <ul className="mt-6 flex flex-wrap gap-3">
                  {phase.outputs.map((output) => (
                    <li
                      key={output}
                      className="rounded-pill border border-line px-4 py-1.5 text-sm text-ink"
                    >
                      {output}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </div>
    </Band>
  );
}

/* =========================================================================
   4. ComparisonMatrix — the buying question, answered in a table. A brand dot
   is present, a hairline dash is not, and a string is a qualified answer;
   nothing is decided by a colour alone, so the legend row carries the words.
   ========================================================================= */
export function ComparisonMatrix({
  eyebrow = "Compare",
  title,
  lead,
  columns,
  rows,
  footnote,
  tone = "white",
  practice = "commercial",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  /** Two or three options, read left to right. The last is the recommendation. */
  columns: string[];
  rows: { label: string; values: (boolean | string)[] }[];
  footnote?: string;
  tone?: "white" | "tint";
  practice?: Practice;
}) {
  return (
    <Band tone={tone} practice={practice} size="large">
      <SectionHead eyebrow={eyebrow} title={title} lead={lead} practice={practice} />

      {/* Wide tables scroll inside their own box; the page never does. */}
      <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <table className="w-full min-w-[44rem] border-collapse text-left">
          <thead>
            <tr className="border-b border-line">
              <th className="w-2/5 py-6 pr-8 text-stat-label uppercase text-muted">
                Requirement
              </th>
              {columns.map((column, i) => (
                <th key={column} className="py-6 pr-8 align-bottom">
                  <span className="block text-h4 text-ink">{column}</span>
                  {/* The last column is the one being recommended, so it gets
                      the practice rule under it and the others do not. */}
                  {i === columns.length - 1 && (
                    <span
                      className={`mt-3 block h-1 w-12 ${ruleClass(practice)}`}
                      aria-hidden
                    />
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-b border-line align-top">
                <th className="py-6 pr-8 text-base text-ink">{row.label}</th>
                {row.values.map((value, i) => (
                  <td key={`${row.label}-${i}`} className="py-6 pr-8 text-base text-body">
                    {typeof value === "string" ? (
                      value
                    ) : value ? (
                      <span className="flex items-center gap-3 text-ink">
                        <span
                          className={`grid h-6 w-6 shrink-0 place-items-center rounded-pill ${markerClass(practice)}`}
                        >
                          <Check className="h-3.5 w-3.5" />
                        </span>
                        <span className="sr-only">Included</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-3 text-muted">
                        <span className="h-[2px] w-5 bg-line" aria-hidden />
                        <span className="sr-only">Not included</span>
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {footnote && <p className="mt-8 text-sm text-muted">{footnote}</p>}
    </Band>
  );
}

/* =========================================================================
   5. StatementQuote — one sentence at display scale, on a practice rule. The
   position the page is taking, pulled out of the prose so a scanning reader
   gets it without reading the prose.
   ========================================================================= */
export function StatementQuote({
  quote,
  attribution,
  role,
  tone = "tint",
  practice = "commercial",
}: {
  quote: string;
  attribution: string;
  role?: string;
  tone?: "white" | "tint";
  practice?: Practice;
}) {
  return (
    <Band tone={tone} practice={practice}>
      <figure className="grid gap-12 lg:grid-cols-12">
        <blockquote className="lg:col-span-9">
          <p className="max-w-[24ch] text-display text-ink sm:max-w-[26ch]">
            {quote}
          </p>
        </blockquote>
        <figcaption className="lg:col-span-3 lg:self-end">
          <span
            className={`block h-1 w-16 ${ruleClass(practice)}`}
            aria-hidden
          />
          <p className="mt-6 text-h4 text-ink">{attribution}</p>
          {role && (
            <p className="mt-2 text-stat-label uppercase text-muted">{role}</p>
          )}
        </figcaption>
      </figure>
    </Band>
  );
}

/* =========================================================================
   6. EcosystemHub — what the platform touches. A ruled 3×3 with the platform
   itself filled in the middle cell and the systems it connects to around it:
   the integration story told as a picture, without an illustration.
   ========================================================================= */
export function EcosystemHub({
  eyebrow = "Ecosystem",
  title,
  lead,
  hub,
  nodes,
  tone = "white",
  practice = "commercial",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  hub: { title: string; caption?: string };
  /** Eight, so the hub lands dead centre of a 3×3 on desktop. */
  nodes: { title: string; caption: string }[];
  tone?: "white" | "tint";
  practice?: Practice;
}) {
  // The hub is spliced into the middle of the ring so a single grid renders
  // the whole thing — no absolute positioning, and it degrades to a plain
  // stack on mobile without a second layout.
  const middle = Math.min(4, nodes.length);
  const cells = [
    ...nodes.slice(0, middle),
    { hub: true as const, ...hub },
    ...nodes.slice(middle),
  ];

  return (
    <Band tone={tone} practice={practice} size="large">
      <SectionHead eyebrow={eyebrow} title={title} lead={lead} practice={practice} />

      <ul className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {cells.map((cell) =>
          "hub" in cell ? (
            <li
              key={cell.title}
              className={`flex flex-col justify-center p-9 sm:p-10 ${ruleClass(practice)}`}
            >
              <h3 className="text-h2 text-ink">{cell.title}</h3>
              {cell.caption && (
                <p className="mt-4 text-sm text-ink/80">{cell.caption}</p>
              )}
            </li>
          ) : (
            <li key={cell.title} className="bg-bg p-9 sm:p-10">
              <h3 className="text-h4 text-ink">{cell.title}</h3>
              <p className="mt-3 text-sm text-body">{cell.caption}</p>
            </li>
          ),
        )}
      </ul>
    </Band>
  );
}

/* =========================================================================
   7. EngagementPlans — the commercial models, as three ruled columns. Not
   prices: the shape of the work, what is delivered, and who each one suits.
   One column may be marked as the usual starting point.
   ========================================================================= */
export function EngagementPlans({
  eyebrow = "Ways to start",
  title,
  lead,
  plans,
  tone = "tint",
  practice = "commercial",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  plans: {
    name: string;
    duration: string;
    summary: string;
    includes: string[];
    action?: { label: string; href: string };
    /** The recommended entry point — carries the practice rule on top. */
    featured?: boolean;
  }[];
  tone?: "white" | "tint";
  practice?: Practice;
}) {
  return (
    <Band tone={tone} practice={practice} size="large">
      <SectionHead eyebrow={eyebrow} title={title} lead={lead} practice={practice} />

      <ul className="grid gap-px border border-line bg-line lg:grid-cols-3">
        {plans.map((plan) => (
          <li key={plan.name} className="flex flex-col bg-bg p-9 sm:p-10">
            <span
              className={`h-1 w-14 ${plan.featured ? ruleClass(practice) : "bg-line"}`}
              aria-hidden
            />
            <h3 className="mt-8 text-h3 text-ink">{plan.name}</h3>
            {/* Mono is doing its one job here: a figure, not a phrase. */}
            <p className="mt-3 font-mono text-code uppercase text-muted">
              {plan.duration}
            </p>
            <p className="mt-6 text-base text-body">{plan.summary}</p>

            <ul className="mt-8 space-y-4 border-t border-line pt-8">
              {plan.includes.map((item) => (
                <li key={item} className="flex gap-4 text-sm text-ink">
                  <span
                    className={`mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-pill ${markerClass(practice)}`}
                    aria-hidden
                  >
                    <Check className="h-3 w-3" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            {plan.action && (
              <div className="mt-10 pt-2">
                <TextLink href={plan.action.href}>{plan.action.label}</TextLink>
              </div>
            )}
          </li>
        ))}
      </ul>
    </Band>
  );
}

/* =========================================================================
   8. ReadinessChecklist — qualification, put on the page instead of in a
   discovery call. A reader who recognises four of these knows the page is
   about them; one who recognises none saves everybody a meeting.
   ========================================================================= */
export function ReadinessChecklist({
  eyebrow = "Readiness",
  title,
  lead,
  signals,
  note,
  action,
  tone = "white",
  practice = "commercial",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  signals: { title: string; description: string }[];
  note?: string;
  action?: { label: string; href: string };
  tone?: "white" | "tint";
  practice?: Practice;
}) {
  return (
    <Band tone={tone} practice={practice} size="large">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-4">
          <Eyebrow practice={practice}>{eyebrow}</Eyebrow>
          <h2 className="mt-7 text-h1 text-ink">{title}</h2>
          {lead && <p className="mt-7 text-base text-body">{lead}</p>}
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <ul className="grid gap-x-12 sm:grid-cols-2">
            {signals.map((signal) => (
              <li key={signal.title} className="border-t border-line py-8">
                <span
                  className={`grid h-8 w-8 place-items-center rounded-pill ${markerClass(practice)}`}
                  aria-hidden
                >
                  <Check className="h-4 w-4" />
                </span>
                <h3 className="mt-6 text-h4 text-ink">{signal.title}</h3>
                <p className="mt-3 text-sm text-body">{signal.description}</p>
              </li>
            ))}
          </ul>

          {(note || action) && (
            <div className="mt-10 flex flex-col gap-6 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
              {note && <p className="measure text-base text-body">{note}</p>}
              {action && (
                <Button href={action.href} variant="secondary">
                  {action.label}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </Band>
  );
}

/* =========================================================================
   9. RoleSplit — the same programme, read from each seat that has to sign off
   on it. Picture on the left, an accordion of roles on the right: a CFO and a
   supply chain lead want different sentences, and both are on this page.
   ========================================================================= */
export function RoleSplit({
  eyebrow = "By role",
  title,
  lead,
  image,
  roles,
  tone = "white",
  practice = "commercial",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  image?: { src: string; alt?: string };
  roles: { role: string; headline: string; body: string }[];
  tone?: "white" | "tint";
  practice?: Practice;
}) {
  return (
    <Band tone={tone} practice={practice} size="large">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
        {image && (
          <div className="lg:sticky lg:top-28 lg:col-span-5 lg:row-start-1 lg:self-start">
            <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-black">
              <Image
                src={image.src}
                alt={image.alt ?? ""}
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="graded object-cover"
              />
              <span
                className={`absolute inset-x-0 bottom-0 h-1 ${ruleClass(practice)}`}
                aria-hidden
              />
            </div>
          </div>
        )}

        <div className="lg:col-span-6 lg:col-start-7 lg:row-start-1">
          <Eyebrow practice={practice}>{eyebrow}</Eyebrow>
          <h2 className="mt-7 max-w-[20ch] text-h1 text-ink">{title}</h2>
          {lead && <p className="measure mt-7 text-lg text-body">{lead}</p>}

          {/* The first role is open, so the section is never a stack of closed
              rows with nothing to read. */}
          <div className="mt-10 border-t border-line">
            {roles.map((role, i) => (
              <details
                key={role.role}
                open={i === 0}
                className="group border-b border-line py-7"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-8 marker:hidden">
                  <span>
                    <span className="block text-stat-label uppercase text-muted">
                      {role.role}
                    </span>
                    <span className="mt-3 block text-h4 text-ink transition-colors duration-150 ease-brand group-hover:text-link">
                      {role.headline}
                    </span>
                  </span>
                  <span
                    className={`mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-pill text-ink transition-transform duration-[180ms] ease-brand group-open:rotate-45 ${ruleClass(practice)}`}
                    aria-hidden
                  >
                    +
                  </span>
                </summary>
                <p className="measure pt-5 text-base text-body">{role.body}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </Band>
  );
}

/* =========================================================================
   10. InlineCallout — a single hairline row between two heavy bands. One
   sentence and one action, at the point in the page where a reader who is
   already convinced should be able to leave.
   ========================================================================= */
export function InlineCallout({
  text,
  action,
  practice = "commercial",
}: {
  text: ReactNode;
  action: { label: string; href: string };
  practice?: Practice;
}) {
  return (
    <section className="border-y border-line">
      <div className="shell flex flex-col gap-8 py-12 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-start gap-5 text-h4 text-ink sm:items-center">
          <span
            className={`mt-2 h-6 w-1 shrink-0 sm:mt-0 ${ruleClass(practice)}`}
            aria-hidden
          />
          {text}
        </p>
        <Button href={action.href}>{action.label}</Button>
      </div>
    </section>
  );
}
