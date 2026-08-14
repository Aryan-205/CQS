/**
 * Editorial layouts for the deep pages — services and the two practices.
 *
 * These pages carry the densest copy on the site and boxed card grids flatten
 * it, so they are built from a small set of image-led layouts instead: one
 * dark band at the top, one at the credential line, and white, hairline-ruled
 * sections in between. Lists rather than grids wherever the count varies, so
 * a section never ends on a dead cell.
 *
 * Rules held from the design system: white ground, 400/500 weights only,
 * hierarchy from size and colour, borders not shadows, brand primaries as
 * fills and rules rather than as text.
 */
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Block, Practice, Record } from "@/lib/content";
import { eyebrowClass, ruleClass } from "@/lib/content";
import { Blocks } from "@/components/blocks";
import { Arrow } from "@/components/icons";
import {
  Band,
  Button,
  EditorialCard,
  Eyebrow,
  SectionHead,
  TextLink,
} from "@/components/sections";

/* =========================================================================
   Hero — full viewport, less the header, so the band closes on the fold.
   Title left, the ask right: two things, far apart, nothing between them.
   ========================================================================= */
export function PageHero({
  eyebrow,
  title,
  image,
  practice = "commercial",
  actions,
}: {
  eyebrow: string;
  title: string;
  image?: string;
  practice?: Practice;
  actions?: { label: string; href: string }[];
}) {
  return (
    <section className="relative isolate overflow-hidden grad-hero">
      {image && (
        <>
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="graded-deep object-cover opacity-70"
          />
          <div className="absolute inset-0 scrim-plain" aria-hidden />
        </>
      )}
      <div className="absolute inset-0 hairline-grid opacity-50" aria-hidden />

      <div className="shell relative flex min-h-[calc(100svh-var(--header-h))] flex-col justify-end pb-20 pt-32 sm:pb-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <Eyebrow practice={practice} onDark>
              {eyebrow}
            </Eyebrow>
            {/* The one place on the page the type runs to hero scale. */}
            <h1 className="mt-10 max-w-[15ch] text-hero text-on-black">{title}</h1>
          </div>

          {actions && actions.length > 0 && (
            <div className="flex flex-wrap gap-3 lg:col-span-4 lg:col-start-9 lg:justify-end">
              {actions.map((action, i) => (
                <Button
                  key={action.href}
                  href={action.href}
                  variant={i === 0 ? "primary" : "secondary"}
                  onDark
                >
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>

      <span
        className={`absolute inset-x-0 bottom-0 h-1 ${ruleClass(practice)}`}
        aria-hidden
      />
    </section>
  );
}

/* =========================================================================
   Overview — the record's own copy, given a picture and a lead.
   The first heading is lifted out to carry the band, and the first paragraph
   is set one step up from body: the page opens on the copy, not on a card.
   ========================================================================= */
export function OverviewSplit({
  blocks,
  image,
  practice = "commercial",
  eyebrow = "Overview",
}: {
  blocks: Block[];
  image?: { src: string; alt?: string };
  practice?: Practice;
  eyebrow?: string;
}) {
  // content.md leaves a few stray `**` markers where a heading was empty on
  // the live site. They render as literal asterisks, so they are dropped here.
  const clean = blocks.filter(
    (block) =>
      block.type === "list" || block.text.replace(/[*\s]/g, "").length > 0,
  );

  const first = clean[0];
  const heading =
    first?.type === "heading" ? first.text.replace(/\*/g, "").trim() : undefined;
  const afterHeading = heading ? clean.slice(1) : clean;

  const leadBlock = afterHeading[0];
  const lead =
    leadBlock?.type === "para" ? leadBlock.text.replace(/\*/g, "") : undefined;
  const body = lead ? afterHeading.slice(1) : afterHeading;

  return (
    <Band size="large">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
        {/* Copy leads in the DOM; the picture moves left only on wide screens. */}
        <div className="lg:col-span-6 lg:col-start-7 lg:row-start-1">
          <Eyebrow practice={practice}>{eyebrow}</Eyebrow>
          {heading && (
            <h2 className="mt-7 max-w-[22ch] text-h1 text-ink">{heading}</h2>
          )}
          {lead && (
            <p className="measure mt-8 text-lg text-body">{lead}</p>
          )}
          {body.length > 0 && <Blocks blocks={body} className="mt-8" />}
        </div>

        {image && (
          <div className="lg:col-span-5 lg:row-start-1 lg:self-start lg:sticky lg:top-28">
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
      </div>
    </Band>
  );
}

/* =========================================================================
   MediaSplit — a picture and a statement, side by side. The same 12-column
   rhythm as the overview, with an empty gutter column between the two halves;
   `reverse` puts the media on the left so consecutive splits alternate.
   ========================================================================= */
export function MediaSplit({
  eyebrow,
  title,
  children,
  image,
  ratio = "portrait",
  reverse = false,
  action,
  pills,
  tone = "white",
  practice = "commercial",
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  image: { src: string; alt?: string };
  ratio?: "portrait" | "landscape" | "wide";
  /** Media left instead of right. Alternate down a page. */
  reverse?: boolean;
  action?: { label: string; href: string };
  /** Short outline chips under the copy — certifications, platforms, agencies. */
  pills?: string[];
  tone?: "white" | "tint";
  practice?: Practice;
}) {
  const aspect =
    ratio === "landscape"
      ? "aspect-[4/3]"
      : ratio === "wide"
        ? "aspect-[16/10]"
        : "aspect-[4/5]";

  return (
    <Band tone={tone} practice={practice} size="large">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
        {/* Copy first in the DOM either way; only the column start moves. */}
        <div
          className={`lg:col-span-6 lg:row-start-1 ${
            reverse ? "lg:col-start-7" : "lg:col-start-1"
          }`}
        >
          {eyebrow && <Eyebrow practice={practice}>{eyebrow}</Eyebrow>}
          <h2 className="mt-7 max-w-[22ch] text-h1 text-ink">{title}</h2>
          {children && (
            <div className="measure mt-8 space-y-6 text-lg text-body">
              {children}
            </div>
          )}

          {pills && pills.length > 0 && (
            <ul className="mt-10 flex flex-wrap gap-3">
              {pills.map((pill) => (
                <li
                  key={pill}
                  className="rounded-pill border border-line px-5 py-2 text-sm text-ink"
                >
                  {pill}
                </li>
              ))}
            </ul>
          )}

          {action && (
            <div className="mt-10">
              <TextLink href={action.href}>{action.label}</TextLink>
            </div>
          )}
        </div>

        {/* Sticky, because a competency section can run far longer than its
            picture and a short image stranded at the top of a tall column
            reads as a mistake. */}
        <div
          className={`lg:sticky lg:top-28 lg:col-span-5 lg:row-start-1 lg:self-start ${
            reverse ? "lg:col-start-1" : "lg:col-start-8"
          }`}
        >
          <div
            className={`relative overflow-hidden rounded-card bg-black ${aspect}`}
          >
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
      </div>
    </Band>
  );
}

/* =========================================================================
   EditorialGrid — image-led cards in a row of three. Every listing on a deep
   page uses this rather than a text card, so the page carries pictures the
   whole way down.
   ========================================================================= */
export function EditorialGrid({
  eyebrow,
  title,
  lead,
  action,
  cards,
  columns = 3,
  tone = "white",
  practice = "commercial",
}: {
  eyebrow?: string;
  title?: string;
  lead?: string;
  action?: { label: string; href: string };
  cards: {
    href: string;
    image?: string;
    title: string;
    eyebrow?: string;
    excerpt?: string;
    cta?: string;
  }[];
  columns?: 2 | 3;
  tone?: "white" | "tint";
  practice?: Practice;
}) {
  if (!cards.length) return null;

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
      <ul
        className={`grid gap-10 sm:grid-cols-2 lg:gap-12 ${
          columns === 3 ? "lg:grid-cols-3" : ""
        }`}
      >
        {cards.map((card) => (
          <li key={card.href}>
            <EditorialCard
              href={card.href}
              image={card.image}
              category={card.eyebrow}
              title={card.title}
              excerpt={card.excerpt}
              cta={card.cta}
              size="compact"
            />
          </li>
        ))}
      </ul>
    </Band>
  );
}

/* =========================================================================
   SpecList — label and value on a hairline. Contract vehicles and federal
   identifiers, where the value is a code and mono is the right typeface for
   exactly this one job.
   ========================================================================= */
export function SpecList({
  eyebrow,
  title,
  lead,
  rows,
  action,
  tone = "white",
  practice = "government",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  rows: {
    label: string;
    value: string;
    mono?: boolean;
    /** Agency seal, where the row is a customer rather than a spec. */
    logo?: { src: string; alt?: string };
  }[];
  action?: { label: string; href: string };
  tone?: "white" | "tint";
  practice?: Practice;
}) {
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
      <dl className="border-t border-line">
        {rows.map((row) => (
          <div
            key={row.label}
            className="grid gap-2 border-b border-line py-6 sm:grid-cols-12 sm:gap-10"
          >
            <dt className="flex items-center gap-5 text-h4 text-ink sm:col-span-5">
              {row.logo && (
                <span className="relative block h-14 w-14 shrink-0">
                  <Image
                    src={row.logo.src}
                    alt={row.logo.alt ?? ""}
                    fill
                    sizes="56px"
                    className="object-contain mix-blend-multiply"
                  />
                </span>
              )}
              {row.label}
            </dt>
            <dd
              className={`text-base text-body sm:col-span-7 ${
                row.mono ? "font-mono text-code text-ink" : ""
              }`}
            >
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </Band>
  );
}

/* =========================================================================
   NameStrip — customers, agencies, platforms. Names set large and muted on a
   hairline: a credibility list, not a logo wall.
   ========================================================================= */
export function NameStrip({
  eyebrow,
  title,
  names,
  tone = "white",
  practice = "commercial",
}: {
  eyebrow?: string;
  title?: string;
  names: string[];
  tone?: "white" | "tint";
  practice?: Practice;
}) {
  return (
    <Band tone={tone} practice={practice}>
      <SectionHead eyebrow={eyebrow} title={title} practice={practice} />
      <ul className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {names.map((name) => (
          <li
            key={name}
            className="bg-bg px-7 py-8 text-h4 text-ink sm:px-8"
          >
            {name}
          </li>
        ))}
      </ul>
    </Band>
  );
}

/* =========================================================================
   LinkList — what the service actually contains.
   A list, not a grid: the count varies from five to nine across the fourteen
   services and a three-column grid ends on dead cells at five, seven and
   eight. Rows also give the title room to be read rather than truncated.
   ========================================================================= */
export function LinkList({
  eyebrow = "What we do",
  title,
  lead,
  items,
  practice = "commercial",
  tone = "tint",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  items: { title: string; href: string; description?: string }[];
  practice?: Practice;
  tone?: "white" | "tint";
}) {
  if (!items.length) return null;

  return (
    <Band tone={tone} practice={practice} size="large">
      <SectionHead eyebrow={eyebrow} title={title} lead={lead} practice={practice} />

      <ul className="border-t border-line">
        {items.map((item, i) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="group grid items-baseline gap-x-10 gap-y-4 border-b border-line py-9 transition-colors duration-150 ease-brand lg:grid-cols-12"
            >
              <span className="tabular text-stat-label uppercase text-muted lg:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-h3 text-ink transition-colors duration-150 ease-brand group-hover:text-link lg:col-span-5">
                {item.title}
              </h3>
              {item.description && (
                <p className="text-base text-body lg:col-span-5">
                  {item.description}
                </p>
              )}
              <span className="flex self-center text-muted transition-colors duration-150 ease-brand group-hover:text-link lg:col-span-1 lg:justify-end">
                <Arrow className="h-4 w-4 transition-transform duration-150 ease-brand group-hover:translate-x-1" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Band>
  );
}

/* =========================================================================
   ApproachSteps — the delivery model. Each stage carries a glyph rather than
   an ordinal: the sequence already reads left to right, so the marker is free
   to carry meaning. Bare line drawings, no filled container behind them.
   ========================================================================= */
export function ApproachSteps({
  eyebrow = "How we deliver",
  title,
  lead,
  steps,
  practice = "commercial",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  steps: { title: string; description: string; icon: ReactNode }[];
  practice?: Practice;
}) {
  return (
    <Band size="large">
      <SectionHead eyebrow={eyebrow} title={title} lead={lead} practice={practice} />

      <ol className="grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <li key={step.title} className="border-t border-line pt-9">
            <span
              className={`block h-12 w-12 ${
                practice === "government" ? "text-brand-red" : "text-brand-blue"
              }`}
            >
              {step.icon}
            </span>
            <h3 className="mt-9 text-h4 text-ink">{step.title}</h3>
            <p className="mt-4 text-sm text-body">{step.description}</p>
          </li>
        ))}
      </ol>
    </Band>
  );
}

/* =========================================================================
   AssuranceBand — the credential block. Black, because a buyer scanning for
   appraisal level and registrations should not have to hunt for them.
   ========================================================================= */
export function AssuranceBand({
  eyebrow = "Assurance",
  title,
  lead,
  certifications,
  identifiers,
  image,
  practice = "commercial",
}: {
  eyebrow?: string;
  title: string;
  lead: string;
  certifications: string[];
  identifiers?: { label: string; value: string }[];
  image?: { src: string; alt?: string };
  practice?: Practice;
}) {
  return (
    <section className="relative isolate overflow-hidden grad-hero py-28 sm:py-36">
      {image && (
        <>
          <Image
            src={image.src}
            alt=""
            fill
            sizes="100vw"
            className="graded-deep object-cover opacity-45"
          />
          <div className="absolute inset-0 scrim-plain" aria-hidden />
        </>
      )}
      <div className="absolute inset-0 hairline-grid opacity-50" aria-hidden />

      <div className="shell relative grid gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <Eyebrow practice={practice} onDark>
            {eyebrow}
          </Eyebrow>
          <h2 className="mt-7 max-w-[18ch] text-h1 text-on-black">{title}</h2>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <p className="measure text-lg text-on-black-mute">{lead}</p>

          <ul className="mt-10 flex flex-wrap gap-3">
            {certifications.map((item) => (
              <li
                key={item}
                className="rounded-pill border border-white/25 px-5 py-2 text-sm text-on-black"
              >
                {item}
              </li>
            ))}
          </ul>

          {identifiers && identifiers.length > 0 && (
            <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-6 border-t border-white/15 pt-8">
              {identifiers.map((id) => (
                <div key={id.label}>
                  <dt className="text-stat-label uppercase text-on-black-mute">
                    {id.label}
                  </dt>
                  {/* Mono earns its one job here: federal identifiers. */}
                  <dd className="mt-2 font-mono text-code text-on-black">
                    {id.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>

      <span
        className={`absolute inset-x-0 bottom-0 h-1 ${ruleClass(practice)}`}
        aria-hidden
      />
    </section>
  );
}

/* =========================================================================
   FaqPanel — heading sticky on the left, questions on the right. The
   FAQPage schema fires from here; the standalone /faq/ URLs are 301s.
   ========================================================================= */
export function FaqPanel({
  title = "Frequently asked",
  faqs,
  practice = "commercial",
  limit = 8,
}: {
  title?: string;
  faqs: Record[];
  practice?: Practice;
  /** Service-specific questions are passed first, so the cut keeps those. */
  limit?: number;
}) {
  const shown = faqs.slice(0, limit);
  if (!shown.length) return null;

  return (
    <Band id="faq" tone="tint" practice={practice} size="large">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
          <Eyebrow practice={practice}>Questions</Eyebrow>
          <h2 className="mt-7 text-h1 text-ink">{title}</h2>
          <p className="mt-7 text-base text-body">
            Anything not covered here, ask us directly.
          </p>
          <div className="mt-6">
            <TextLink href="/contact-us">Talk to our team</TextLink>
          </div>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <div className="border-t border-line">
            {shown.map((faq) => (
              <details key={faq.slug} className="group border-b border-line py-7">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-8 text-h4 text-ink transition-colors duration-150 ease-brand marker:hidden hover:text-link">
                  {faq.title}
                  <span
                    className={`mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-pill text-ink transition-transform duration-[180ms] ease-brand group-open:rotate-45 ${ruleClass(practice)}`}
                    aria-hidden
                  >
                    +
                  </span>
                </summary>
                <div className="pt-5">
                  <Blocks blocks={faq.blocks} />
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: shown.map((faq) => ({
              "@type": "Question",
              name: faq.title,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.blocks
                  .filter((b): b is Extract<Block, { type: "para" }> =>
                    Boolean(b.type === "para"),
                  )
                  .map((b) => b.text.replace(/\*\*/g, ""))
                  .join(" "),
              },
            })),
          }),
        }}
      />
    </Band>
  );
}

/* =========================================================================
   Pager — the next two services, on a hairline. Fourteen sibling pages
   are the most useful thing at the foot of any one of them.
   ========================================================================= */
export function Pager({
  items,
  practice = "commercial",
}: {
  items: { title: string; href: string }[];
  practice?: Practice;
}) {
  if (!items.length) return null;

  return (
    <section className="border-t border-line">
      <div className="shell">
        <p
          className={`pt-14 text-eyebrow uppercase ${eyebrowClass(practice)}`}
        >
          Continue
        </p>
        <ul className="grid md:grid-cols-2">
          {items.map((item, i) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`group flex items-center justify-between gap-8 py-10 ${
                  i === 0 ? "md:pr-12" : "border-t border-line md:border-l md:border-t-0 md:pl-12"
                }`}
              >
                <span className="text-h3 text-ink transition-colors duration-150 ease-brand group-hover:text-link">
                  {item.title}
                </span>
                <Arrow className="h-4 w-4 shrink-0 text-muted transition-transform duration-150 ease-brand group-hover:translate-x-1 group-hover:text-link" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
