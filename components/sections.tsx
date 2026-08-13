import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Block, Practice, Record } from "@/lib/content";
import { eyebrowClass, ruleClass, tintClass } from "@/lib/content";
import { Blocks } from "@/components/blocks";
import { Arrow } from "@/components/icons";

/* =========================================================================
   Band — every section is one of these. White and tint alternate down the
   page; the tint is the practice colour. Never two tints adjacent.
   ========================================================================= */
export function Band({
  children,
  tone = "white",
  practice = "neutral",
  size = "normal",
  wide = false,
  id,
}: {
  children: ReactNode;
  tone?: "white" | "tint";
  practice?: Practice;
  size?: "normal" | "large";
  wide?: boolean;
  id?: string;
}) {
  const bg = tone === "tint" ? tintClass(practice) : "bg-bg";
  const pad = size === "large" ? "py-20 sm:py-32" : "py-16 sm:py-24";
  return (
    <section id={id} className={`${bg} ${pad}`}>
      <div className={wide ? "shell-wide" : "shell"}>{children}</div>
    </section>
  );
}

/** Eyebrow: uppercase, tracked, with a short brand rule. Level one of the
 *  three-level hierarchy every band uses. */
export function Eyebrow({
  children,
  practice = "neutral",
  onDark = false,
}: {
  children: ReactNode;
  practice?: Practice;
  onDark?: boolean;
}) {
  return (
    <p
      className={`flex items-center gap-3 text-eyebrow uppercase ${
        onDark ? "text-on-black" : eyebrowClass(practice)
      }`}
    >
      <span className={`h-[3px] w-6 ${ruleClass(practice)}`} aria-hidden />
      {children}
    </p>
  );
}

/** Section head — eyebrow, heading, lead. The only three levels a band gets. */
export function SectionHead({
  eyebrow,
  title,
  lead,
  practice = "neutral",
  onDark = false,
  action,
  align = "left",
}: {
  eyebrow?: string;
  title?: string;
  lead?: string;
  practice?: Practice;
  onDark?: boolean;
  action?: { label: string; href: string };
  align?: "left" | "split";
}) {
  if (!eyebrow && !title && !lead) return null;

  return (
    <div
      className={`mb-12 ${
        align === "split"
          ? "flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          : ""
      }`}
    >
      <div>
        {eyebrow && (
          <Eyebrow practice={practice} onDark={onDark}>
            {eyebrow}
          </Eyebrow>
        )}
        {title && (
          <h2
            className={`measure mt-5 text-h2 ${onDark ? "text-on-black" : "text-ink"}`}
          >
            {title}
          </h2>
        )}
        {lead && (
          <p
            className={`measure mt-5 text-lg ${onDark ? "text-on-black-mute" : "text-body"}`}
          >
            {lead}
          </p>
        )}
      </div>
      {action && (
        <TextLink href={action.href} onDark={onDark}>
          {action.label}
        </TextLink>
      )}
    </div>
  );
}

/* =========================================================================
   Buttons and links
   ========================================================================= */
export function Button({
  href,
  children,
  variant = "primary",
  onDark = false,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  onDark?: boolean;
}) {
  // On white the primary is a black pill; on black it inverts to white, per
  // the deck's "The IT Edge for Lean Government" button.
  const style =
    variant === "primary"
      ? onDark
        ? "bg-bg text-ink hover:bg-on-black-mute"
        : "bg-black text-on-black hover:bg-body"
      : onDark
        ? "border border-white/30 text-on-black hover:border-on-black hover:bg-white/5"
        : "border border-line text-ink hover:border-ink hover:bg-tint-neutral";

  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2.5 rounded-pill px-7 py-3.5 text-base transition-colors duration-150 ease-brand ${style}`}
    >
      {children}
      <Arrow className="h-3.5 w-3.5 transition-transform duration-150 ease-brand group-hover:translate-x-1" />
    </Link>
  );
}

/** Prose-weight link with the 2px brand underline the design system calls for. */
export function TextLink({
  href,
  children,
  onDark = false,
}: {
  href: string;
  children: ReactNode;
  onDark?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex shrink-0 items-center gap-2 border-b-2 border-brand-blue pb-1 text-base transition-colors duration-150 ease-brand ${
        onDark ? "text-on-black hover:text-brand-blue" : "text-link hover:text-link-hover"
      }`}
    >
      {children}
      <Arrow className="h-3 w-3 transition-transform duration-150 ease-brand group-hover:translate-x-1" />
    </Link>
  );
}

/* =========================================================================
   1. Hero — full-bleed dark banner. Real mission photography under the brand
   gradient, headline over a scrim. The homepage variant carries video and is
   built separately in components/home/hero.tsx.
   ========================================================================= */
export function Hero({
  eyebrow,
  title,
  lead,
  actions,
  practice = "neutral",
  image,
  compact = false,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  actions?: { label: string; href: string }[];
  practice?: Practice;
  /** Banner photography. Omit and the brand gradient carries the band alone. */
  image?: string;
  /** Half height — record pages, where the body copy is the point. */
  compact?: boolean;
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
            className="graded object-cover opacity-55"
          />
          <div className="absolute inset-0 scrim" aria-hidden />
        </>
      )}
      <div className="absolute inset-0 hairline-grid opacity-60" aria-hidden />

      <div
        className={`shell relative flex flex-col justify-end ${
          compact ? "min-h-[300px] py-16 sm:min-h-[360px]" : "min-h-[420px] py-20 sm:min-h-[520px] sm:py-28"
        }`}
      >
        {eyebrow && (
          <Eyebrow practice={practice} onDark>
            {eyebrow}
          </Eyebrow>
        )}
        <h1
          className={`measure mt-6 text-on-black ${compact ? "text-h1" : "text-display"}`}
        >
          {title}
        </h1>
        {lead && (
          <p className="measure mt-6 text-lg text-on-black-mute">{lead}</p>
        )}
        {actions && actions.length > 0 && (
          <div className="mt-9 flex flex-wrap gap-3">
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

      {/* Practice signal at the foot of the banner, the deck's colour coding. */}
      <span
        className={`absolute inset-x-0 bottom-0 h-1 ${ruleClass(practice)}`}
        aria-hidden
      />
    </section>
  );
}

/* =========================================================================
   2. Intro — a heading plus lead copy, capped at 70ch.
   ========================================================================= */
export function Intro({
  eyebrow,
  title,
  children,
  practice = "neutral",
  tone = "white",
  aside,
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  practice?: Practice;
  tone?: "white" | "tint";
  /** Optional right-hand column — pull quotes, stat pairs, a media card. */
  aside?: ReactNode;
}) {
  return (
    <Band tone={tone} practice={practice}>
      <div className={aside ? "grid gap-12 lg:grid-cols-[1fr_auto] lg:gap-20" : ""}>
        <div>
          {eyebrow && <Eyebrow practice={practice}>{eyebrow}</Eyebrow>}
          <h2 className="measure mt-5 text-h2 text-ink">{title}</h2>
          {children && (
            <div className="measure mt-6 space-y-5 text-lg text-body">
              {children}
            </div>
          )}
        </div>
        {aside}
      </div>
    </Band>
  );
}

/* =========================================================================
   3. CardGrid — capabilities, services, related content.
   Cards are hairline-bordered with a practice-coloured top rule that fills
   on hover; the whole card lifts 2px. No shadows.
   ========================================================================= */
export type Card = {
  title: string;
  href?: string;
  description?: string;
  eyebrow?: string;
  icon?: string;
};

export function CardGrid({
  eyebrow,
  title,
  lead,
  cards,
  practice = "neutral",
  tone = "white",
  columns = 3,
  action,
  numbered = false,
}: {
  eyebrow?: string;
  title?: string;
  lead?: string;
  cards: Card[];
  practice?: Practice;
  tone?: "white" | "tint";
  columns?: 2 | 3 | 4;
  action?: { label: string; href: string };
  /** Numbered markers instead of icons — values, principles, differentiators. */
  numbered?: boolean;
}) {
  const cols =
    columns === 2
      ? "sm:grid-cols-2"
      : columns === 4
        ? "sm:grid-cols-2 lg:grid-cols-4"
        : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <Band tone={tone} practice={practice}>
      <SectionHead
        eyebrow={eyebrow}
        title={title}
        lead={lead}
        practice={practice}
        action={action}
        align={action ? "split" : "left"}
      />

      <div className={`grid gap-px border border-line bg-line ${cols}`}>
        {cards.map((card, index) => {
          const inner = (
            <>
              {/* The rule that fills on hover — the card's practice signal. */}
              <span
                className={`absolute inset-x-0 top-0 h-[3px] w-0 transition-[width] duration-[180ms] ease-brand group-hover:w-full ${ruleClass(practice)}`}
                aria-hidden
              />

              {numbered ? (
                <span
                  className={`tabular mb-6 grid h-11 w-11 place-items-center rounded-pill text-h4 text-ink ${ruleClass(practice)}`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              ) : card.icon ? (
                <Image
                  src={card.icon}
                  alt=""
                  width={44}
                  height={44}
                  className="mb-6 h-11 w-11 object-contain"
                  unoptimized
                />
              ) : null}

              {card.eyebrow && (
                <p className={`mb-3 text-eyebrow uppercase ${eyebrowClass(practice)}`}>
                  {card.eyebrow}
                </p>
              )}
              <h3 className="text-h4 text-ink">{card.title}</h3>
              {card.description && (
                <p className="mt-3 text-sm text-body">{card.description}</p>
              )}
              {card.href && (
                <span className="mt-6 inline-flex items-center gap-2 text-sm text-link">
                  Learn more
                  <Arrow className="h-3 w-3 transition-transform duration-150 ease-brand group-hover:translate-x-1" />
                </span>
              )}
            </>
          );

          // The hairline is the grid gap, so each cell is a plain white plane.
          const base =
            "group relative flex flex-col bg-bg p-7 transition-colors duration-150 ease-brand sm:p-8";

          return card.href ? (
            <Link
              key={card.title}
              href={card.href}
              className={`${base} hover:bg-tint-neutral`}
            >
              {inner}
            </Link>
          ) : (
            <div key={card.title} className={base}>
              {inner}
            </div>
          );
        })}
      </div>
    </Band>
  );
}

/* =========================================================================
   4. ProcessSteps — numbered pill markers, per the brand deck.
   ========================================================================= */
export function ProcessSteps({
  eyebrow,
  title,
  steps,
  practice = "neutral",
  tone = "tint",
}: {
  eyebrow?: string;
  title?: string;
  steps: { title: string; description: string }[];
  practice?: Practice;
  tone?: "white" | "tint";
}) {
  return (
    <Band tone={tone} practice={practice}>
      <SectionHead eyebrow={eyebrow} title={title} practice={practice} />

      <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <li key={step.title} className="relative">
            {/* The connector: a hairline running to the next marker. */}
            {i < steps.length - 1 && (
              <span
                className="absolute left-14 top-7 hidden h-px w-[calc(100%-3.5rem)] bg-line lg:block"
                aria-hidden
              />
            )}
            <span
              className={`tabular relative grid h-14 w-14 place-items-center rounded-pill text-h3 text-ink ${ruleClass(practice)}`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-6 text-h4 text-ink">{step.title}</h3>
            <p className="mt-3 text-sm text-body">{step.description}</p>
          </li>
        ))}
      </ol>
    </Band>
  );
}

/* =========================================================================
   5. Counters — stat figures. Values are real, from content.md.
   The count-up lives in components/counter.tsx; it renders the final value
   immediately under prefers-reduced-motion.
   ========================================================================= */
export { Counters } from "@/components/counters";

/* =========================================================================
   6. LogoStrip / 7. CertStrip — trust markers.
   ========================================================================= */
export function LogoStrip({
  title,
  items,
  tone = "tint",
  practice = "neutral",
}: {
  title?: string;
  items: string[];
  tone?: "white" | "tint";
  practice?: Practice;
}) {
  return (
    <Band tone={tone} practice={practice}>
      {title && (
        <p className="mb-10 text-stat-label uppercase text-muted">{title}</p>
      )}
      <ul className="flex flex-wrap items-center gap-x-10 gap-y-6">
        {items.map((item) => (
          <li key={item} className="text-h4 text-muted">
            {item}
          </li>
        ))}
      </ul>
    </Band>
  );
}

/** Real partner marks, in a hairline grid. Static — the design system rules
 *  out looping decorative motion, so no marquee. */
export function PartnerGrid({
  eyebrow = "Alliances",
  title,
  lead,
  logos,
  tone = "tint",
  practice = "neutral",
  action,
}: {
  eyebrow?: string;
  title?: string;
  lead?: string;
  logos: { src: string; alt: string; width: number; height: number }[];
  tone?: "white" | "tint";
  practice?: Practice;
  action?: { label: string; href: string };
}) {
  return (
    <Band tone={tone} practice={practice}>
      <SectionHead
        eyebrow={eyebrow}
        title={title}
        lead={lead}
        practice={practice}
        action={action}
        align={action ? "split" : "left"}
      />
      <ul className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3 lg:grid-cols-5">
        {logos.map((logo) => (
          <li
            key={logo.alt}
            className="group grid h-28 place-items-center bg-bg px-6 transition-colors duration-150 ease-brand hover:bg-tint-neutral"
          >
            {/* The supplied marks are white-on-transparent, cut for a dark
                band. Inverting gives a true black mark on the white page —
                uniform, because every mark in the set is monochrome. */}
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              className="h-auto max-h-10 w-auto max-w-[140px] object-contain opacity-60 invert transition-opacity duration-150 ease-brand group-hover:opacity-100"
              unoptimized
            />
          </li>
        ))}
      </ul>
    </Band>
  );
}

export function CertStrip({
  title,
  items,
  tone = "white",
  practice = "neutral",
}: {
  title?: string;
  items: string[];
  tone?: "white" | "tint";
  practice?: Practice;
}) {
  return (
    <Band tone={tone} practice={practice}>
      {title && (
        <p className="mb-8 text-stat-label uppercase text-muted">{title}</p>
      )}
      <ul className="flex flex-wrap gap-3">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-pill border border-line px-5 py-2 text-sm text-ink"
          >
            {item}
          </li>
        ))}
      </ul>
    </Band>
  );
}

/* =========================================================================
   8. FaqAccordion — FAQs live here, not on their own URLs. The schema fires
   from this component's parent page. See the redirect table in CLAUDE.md.
   ========================================================================= */
export function FaqAccordion({
  title = "Frequently asked questions",
  faqs,
  practice = "neutral",
  tone = "white",
}: {
  title?: string;
  faqs: Record[];
  practice?: Practice;
  tone?: "white" | "tint";
}) {
  if (!faqs.length) return null;

  return (
    <Band id="faq" tone={tone} practice={practice}>
      <SectionHead eyebrow="Questions" title={title} practice={practice} />
      <div className="divide-y divide-line border-y border-line">
        {faqs.map((faq) => (
          <details key={faq.slug} className="group py-6">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-8 text-h4 text-ink transition-colors duration-150 ease-brand marker:hidden hover:text-link">
              {faq.title}
              <span
                className={`mt-1.5 grid h-7 w-7 shrink-0 place-items-center rounded-pill text-ink transition-transform duration-[180ms] ease-brand group-open:rotate-45 ${ruleClass(practice)}`}
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

      {/* FAQPage schema fires here — the standalone /faq/ URLs are 301s. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
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
   9. CtaBand — one per page, immediately above the footer.
   ========================================================================= */
export function CtaBand({
  title = "Ready to talk?",
  lead,
  action = { label: "Contact us", href: "/contact-us" },
  secondary,
  practice = "neutral",
}: {
  title?: string;
  lead?: string;
  action?: { label: string; href: string };
  secondary?: { label: string; href: string };
  practice?: Practice;
}) {
  return (
    <section className={`${tintClass(practice)} py-20 sm:py-32`}>
      <div className="shell flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span
            className={`mb-8 block h-[3px] w-16 ${ruleClass(practice)}`}
            aria-hidden
          />
          <h2 className="measure text-h1 text-ink">{title}</h2>
          {lead && <p className="measure mt-5 text-lg text-body">{lead}</p>}
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <Button href={action.href}>{action.label}</Button>
          {secondary && (
            <Button href={secondary.href} variant="secondary">
              {secondary.label}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   10. ListingGrid — blogs, case studies, capabilities, partners.
   Editorial cards: image, category, title, date.
   ========================================================================= */
export function ListingGrid({
  records,
  basePath,
  practice = "neutral",
  tone = "white",
  columns = 3,
  empty = "Nothing here yet.",
  imageFor,
}: {
  records: Record[];
  basePath: string;
  practice?: Practice;
  tone?: "white" | "tint";
  columns?: 2 | 3;
  empty?: string;
  /** Supply a fallback when the CMS record carries no image. */
  imageFor?: (record: Record) => string | undefined;
}) {
  if (!records.length) {
    return (
      <Band tone={tone} practice={practice}>
        <p className="text-lg text-muted">{empty}</p>
      </Band>
    );
  }

  return (
    <Band tone={tone} practice={practice}>
      <div
        className={`grid gap-x-8 gap-y-12 ${columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}
      >
        {records.map((record) => (
          <EditorialCard
            key={record.slug}
            href={`${basePath}/${record.slug}`}
            image={imageFor?.(record) ?? record.image?.src}
            category={
              record.category && record.category !== "Uncategorized"
                ? record.category
                : undefined
            }
            title={record.title}
            date={record.published}
            practice={practice}
          />
        ))}
      </div>
    </Band>
  );
}

/** The site's repeating editorial unit — image over a category, title, date. */
export function EditorialCard({
  href,
  image,
  category,
  title,
  date,
  excerpt,
  practice = "neutral",
  size = "normal",
}: {
  href: string;
  image?: string;
  category?: string;
  title: string;
  date?: string;
  excerpt?: string;
  practice?: Practice;
  size?: "normal" | "large";
}) {
  return (
    <Link href={href} className="group flex flex-col">
      {image && (
        <div
          className={`relative mb-6 w-full overflow-hidden rounded-card bg-tint-neutral ${
            size === "large" ? "aspect-[16/10]" : "aspect-[4/3]"
          }`}
        >
          <Image
            src={image}
            alt=""
            fill
            sizes={size === "large" ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 640px) 33vw, 100vw"}
            className="graded object-cover transition-transform duration-[240ms] ease-brand group-hover:scale-[1.03]"
          />
        </div>
      )}
      {category && (
        <p className={`mb-3 text-eyebrow uppercase ${eyebrowClass(practice)}`}>
          {category}
        </p>
      )}
      <h3
        className={`text-ink transition-colors duration-150 ease-brand group-hover:text-link ${
          size === "large" ? "text-h2" : "text-h4"
        }`}
      >
        {title}
      </h3>
      {excerpt && <p className="mt-3 text-sm text-body">{excerpt}</p>}
      {date && (
        <p className="mt-4 text-stat-label uppercase text-muted">
          {new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            timeZone: "UTC",
          })}
        </p>
      )}
    </Link>
  );
}

/* =========================================================================
   11. Prose — long-form body copy from the content layer.
   ========================================================================= */
export function Prose({
  blocks,
  tone = "white",
  practice = "neutral",
}: {
  blocks: Block[];
  tone?: "white" | "tint";
  practice?: Practice;
}) {
  return (
    <Band tone={tone} practice={practice}>
      <Blocks blocks={blocks} />
    </Band>
  );
}

/* =========================================================================
   12. SpecTable — contract vehicle identifiers, credentials.
   ========================================================================= */
export function SpecTable({
  title,
  rows,
  tone = "tint",
  practice = "neutral",
}: {
  title?: string;
  rows: { label: string; value: string }[];
  tone?: "white" | "tint";
  practice?: Practice;
}) {
  return (
    <Band tone={tone} practice={practice}>
      {title && <h2 className="mb-10 text-h2 text-ink">{title}</h2>}
      <dl className="measure divide-y divide-line border-y border-line">
        {rows.map((row) => (
          <div key={row.label} className="flex flex-wrap gap-x-8 gap-y-1 py-4">
            <dt className="w-48 shrink-0 text-stat-label uppercase text-muted">
              {row.label}
            </dt>
            <dd className="font-mono text-code text-ink">{row.value}</dd>
          </div>
        ))}
      </dl>
    </Band>
  );
}

/* =========================================================================
   13. FeatureSplit — a media panel beside copy. The workhorse for practice
   pages: half real photography, half dense text.
   ========================================================================= */
export function FeatureSplit({
  eyebrow,
  title,
  children,
  image,
  imageAlt = "",
  action,
  practice = "neutral",
  tone = "white",
  reverse = false,
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  image: string;
  imageAlt?: string;
  action?: { label: string; href: string };
  practice?: Practice;
  tone?: "white" | "tint";
  /** Media on the left instead of the right. Alternate down a page. */
  reverse?: boolean;
}) {
  return (
    <Band tone={tone} practice={practice}>
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className={reverse ? "lg:order-2" : ""}>
          {eyebrow && <Eyebrow practice={practice}>{eyebrow}</Eyebrow>}
          <h2 className="measure mt-5 text-h2 text-ink">{title}</h2>
          {children && (
            <div className="measure mt-6 space-y-5 text-base text-body">
              {children}
            </div>
          )}
          {action && (
            <div className="mt-8">
              <Button href={action.href} variant="secondary">
                {action.label}
              </Button>
            </div>
          )}
        </div>

        <div
          className={`relative aspect-[4/3] overflow-hidden rounded-card bg-black ${reverse ? "lg:order-1" : ""}`}
        >
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="graded object-cover"
          />
          {/* The practice signal, bottom edge of the media card. */}
          <span
            className={`absolute inset-x-0 bottom-0 h-1 ${ruleClass(practice)}`}
            aria-hidden
          />
        </div>
      </div>
    </Band>
  );
}

/* =========================================================================
   14. CredentialBand — the federal proof block. Black, because a contracting
   officer scanning for UEI and CAGE should not have to hunt.
   ========================================================================= */
export function CredentialBand({
  eyebrow = "Contracting",
  title,
  lead,
  identifiers,
  vehicles,
  certifications,
  action,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  identifiers: readonly { label: string; value: string }[];
  vehicles?: { label: string; href: string }[];
  certifications?: string[];
  action?: { label: string; href: string };
}) {
  return (
    <section className="relative isolate overflow-hidden grad-hero py-20 sm:py-28">
      <div className="absolute inset-0 hairline-grid opacity-60" aria-hidden />
      <div className="shell relative grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <div>
          <Eyebrow practice="government" onDark>
            {eyebrow}
          </Eyebrow>
          <h2 className="measure mt-5 text-h2 text-on-black">{title}</h2>
          {lead && (
            <p className="measure mt-5 text-lg text-on-black-mute">{lead}</p>
          )}

          <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3">
            {identifiers.map((id) => (
              <div key={id.label}>
                <dt className="text-stat-label uppercase text-on-black-mute">
                  {id.label}
                </dt>
                <dd className="mt-1.5 font-mono text-code text-on-black">
                  {id.value}
                </dd>
              </div>
            ))}
          </dl>

          {action && (
            <div className="mt-10">
              <Button href={action.href} onDark>
                {action.label}
              </Button>
            </div>
          )}
        </div>

        <div className="space-y-10">
          {vehicles && vehicles.length > 0 && (
            <div>
              <p className="mb-5 text-stat-label uppercase text-on-black-mute">
                Contract vehicles
              </p>
              <ul className="divide-y divide-white/10 border-y border-white/10">
                {vehicles.map((vehicle) => (
                  <li key={vehicle.href}>
                    <Link
                      href={vehicle.href}
                      className="group flex items-center justify-between gap-6 py-4 text-base text-on-black transition-colors duration-150 ease-brand hover:text-brand-blue"
                    >
                      {vehicle.label}
                      <Arrow className="h-3.5 w-3.5 shrink-0 transition-transform duration-150 ease-brand group-hover:translate-x-1" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {certifications && certifications.length > 0 && (
            <div>
              <p className="mb-5 text-stat-label uppercase text-on-black-mute">
                Certifications and set-asides
              </p>
              <ul className="flex flex-wrap gap-2.5">
                {certifications.map((cert) => (
                  <li
                    key={cert}
                    className="rounded-pill border border-white/20 px-4 py-2 text-sm text-on-black"
                  >
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
