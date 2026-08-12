import Link from "next/link";
import type { ReactNode } from "react";
import type { Block, Practice, Record } from "@/lib/content";
import { eyebrowClass, ruleClass, tintClass } from "@/lib/content";
import { Blocks } from "@/components/blocks";

/* =========================================================================
   Band — every section is one of these. White and tint alternate down the
   page; the tint is the practice colour. Never two tints adjacent.
   ========================================================================= */
export function Band({
  children,
  tone = "white",
  practice = "neutral",
  size = "normal",
  id,
}: {
  children: ReactNode;
  tone?: "white" | "tint";
  practice?: Practice;
  size?: "normal" | "large";
  id?: string;
}) {
  const bg = tone === "tint" ? tintClass(practice) : "bg-bg";
  const pad = size === "large" ? "py-20 sm:py-32" : "py-16 sm:py-24";
  return (
    <section id={id} className={`${bg} ${pad}`}>
      <div className="shell">{children}</div>
    </section>
  );
}

/** Eyebrow: uppercase, tracked, with a short brand rule. Level one of the
 *  three-level hierarchy every band uses. */
export function Eyebrow({
  children,
  practice = "neutral",
}: {
  children: ReactNode;
  practice?: Practice;
}) {
  return (
    <p
      className={`flex items-center gap-3 text-eyebrow uppercase ${eyebrowClass(practice)}`}
    >
      <span className={`h-[3px] w-6 ${ruleClass(practice)}`} aria-hidden />
      {children}
    </p>
  );
}

export function Button({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
}) {
  const style =
    variant === "primary"
      ? "bg-black text-on-black hover:bg-body"
      : "border border-line text-ink hover:border-ink";
  return (
    <Link
      href={href}
      className={`inline-block rounded-pill px-7 py-3.5 text-base transition-colors duration-150 ease-brand ${style}`}
    >
      {children}
    </Link>
  );
}

/* =========================================================================
   1. Hero — white band, ink headline, black gradient media card.
   ========================================================================= */
export function Hero({
  eyebrow,
  title,
  lead,
  actions,
  practice = "neutral",
  compact = false,
  video,
  poster,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  actions?: { label: string; href: string }[];
  practice?: Practice;
  compact?: boolean;
  video?: string;
  poster?: string;
}) {
  // The deck's gradient, framed rather than full-bleed: red bloom top-left,
  // blue bloom bottom-left, blooms held to the outer 40% of the frame.
  const gradHero =
    "radial-gradient(90% 90% at 0% 0%, #EE4743 0%, transparent 62%), radial-gradient(90% 90% at 0% 100%, #01A7E5 0%, transparent 62%), #000000";

  return (
    <section className={compact ? "py-14 sm:py-20" : "py-20 sm:py-32"}>
      <div
        className={`shell ${compact ? "" : "grid gap-12 lg:grid-cols-2 lg:items-center"}`}
      >
        <div>
          {eyebrow && <Eyebrow practice={practice}>{eyebrow}</Eyebrow>}
          <h1
            className={`${compact ? "text-h1" : "text-display"} measure mt-5 text-ink`}
          >
            {title}
          </h1>
          {lead && <p className="measure mt-6 text-lg text-body">{lead}</p>}
          {actions && actions.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3">
              {actions.map((action, i) => (
                <Button
                  key={action.href}
                  href={action.href}
                  variant={i === 0 ? "primary" : "secondary"}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </div>

        {!compact && (
          <div
            className="aspect-video w-full overflow-hidden rounded-card"
            style={{ background: gradHero }}
          >
            {video && (
              // Muted, looping, no controls. The poster carries mobile,
              // slow connections and reduced-motion users, so it has to
              // work as a finished still on its own.
              <video
                autoPlay
                muted
                loop
                playsInline
                poster={poster}
                className="h-full w-full object-cover opacity-40"
              >
                <source src={video} type="video/mp4" />
              </video>
            )}
          </div>
        )}
      </div>
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
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  practice?: Practice;
  tone?: "white" | "tint";
}) {
  return (
    <Band tone={tone} practice={practice}>
      {eyebrow && <Eyebrow practice={practice}>{eyebrow}</Eyebrow>}
      <h2 className="measure mt-5 text-h2 text-ink">{title}</h2>
      {children && (
        <div className="measure mt-6 space-y-5 text-lg text-body">
          {children}
        </div>
      )}
    </Band>
  );
}

/* =========================================================================
   3. CardGrid — capabilities, services, related content.
   ========================================================================= */
export type Card = {
  title: string;
  href?: string;
  description?: string;
  eyebrow?: string;
};

export function CardGrid({
  eyebrow,
  title,
  lead,
  cards,
  practice = "neutral",
  tone = "white",
  columns = 3,
}: {
  eyebrow?: string;
  title?: string;
  lead?: string;
  cards: Card[];
  practice?: Practice;
  tone?: "white" | "tint";
  columns?: 2 | 3 | 4;
}) {
  const cols =
    columns === 2
      ? "sm:grid-cols-2"
      : columns === 4
        ? "sm:grid-cols-2 lg:grid-cols-4"
        : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <Band tone={tone} practice={practice}>
      {(eyebrow || title) && (
        <div className="mb-12">
          {eyebrow && <Eyebrow practice={practice}>{eyebrow}</Eyebrow>}
          {title && <h2 className="measure mt-5 text-h2 text-ink">{title}</h2>}
          {lead && <p className="measure mt-5 text-lg text-body">{lead}</p>}
        </div>
      )}

      <div className={`grid gap-6 ${cols}`}>
        {cards.map((card) => {
          const inner = (
            <>
              {card.eyebrow && (
                <p
                  className={`mb-3 text-eyebrow uppercase ${eyebrowClass(practice)}`}
                >
                  {card.eyebrow}
                </p>
              )}
              <h3 className="text-h4 text-ink">{card.title}</h3>
              {card.description && (
                <p className="mt-3 text-sm text-body">{card.description}</p>
              )}
              {card.href && (
                <p className="mt-5 text-sm text-link">Learn more →</p>
              )}
            </>
          );

          const base = `rounded-card border border-line border-l-4 bg-bg p-6 transition-colors duration-150 ease-brand ${
            practice === "government"
              ? "border-l-brand-red"
              : "border-l-brand-blue"
          }`;

          return card.href ? (
            <Link
              key={card.title}
              href={card.href}
              className={`${base} hover:border-ink ${
                practice === "government"
                  ? "hover:border-l-brand-red"
                  : "hover:border-l-brand-blue"
              }`}
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
      {(eyebrow || title) && (
        <div className="mb-12">
          {eyebrow && <Eyebrow practice={practice}>{eyebrow}</Eyebrow>}
          {title && <h2 className="measure mt-5 text-h2 text-ink">{title}</h2>}
        </div>
      )}

      <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <li key={step.title}>
            <span
              className={`grid h-14 w-14 place-items-center rounded-pill ${ruleClass(practice)} tabular text-h3 text-ink`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-5 text-h4 text-ink">{step.title}</h3>
            <p className="mt-3 text-sm text-body">{step.description}</p>
          </li>
        ))}
      </ol>
    </Band>
  );
}

/* =========================================================================
   5. Counters — stat figures. Values are real, from content.md.
   ========================================================================= */
export function Counters({
  title,
  stats,
  practice = "neutral",
  tone = "white",
}: {
  title?: string;
  stats: { value: string; suffix?: string; label: string }[];
  practice?: Practice;
  tone?: "white" | "tint";
}) {
  return (
    <Band tone={tone} practice={practice}>
      {title && <h2 className="mb-12 text-h2 text-ink">{title}</h2>}
      <div className="grid gap-10 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="tabular text-stat text-ink">
              {stat.value}
              {stat.suffix && <span className="text-link">{stat.suffix}</span>}
            </p>
            <span
              className={`mt-4 mb-3 block h-[3px] w-12 ${ruleClass(practice)}`}
            />
            <p className="text-stat-label uppercase text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </Band>
  );
}

/* =========================================================================
   6. LogoStrip / 7. CertStrip — trust markers. Text-only until real logo
   assets land; swapping in <Image> later touches only this component.
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
      <h2 className="mb-10 text-h2 text-ink">{title}</h2>
      <div className="measure divide-y divide-line border-y border-line">
        {faqs.map((faq) => (
          <details key={faq.slug} className="group py-5">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-h4 text-ink marker:hidden">
              {faq.title}
              <span
                className="mt-2 text-link transition-transform duration-150 ease-brand group-open:rotate-45"
                aria-hidden
              >
                +
              </span>
            </summary>
            <div className="pt-4">
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
   9. CtaBand — tint ground, ink headline, black pill. One per page.
   ========================================================================= */
export function CtaBand({
  title = "Ready to talk?",
  lead,
  action = { label: "Contact us", href: "/contact-us" },
  practice = "neutral",
}: {
  title?: string;
  lead?: string;
  action?: { label: string; href: string };
  practice?: Practice;
}) {
  return (
    <section className={`${tintClass(practice)} py-20 sm:py-32`}>
      <div className="shell">
        <span
          className={`mb-8 block h-[3px] w-16 ${ruleClass(practice)}`}
          aria-hidden
        />
        <h2 className="measure text-h1 text-ink">{title}</h2>
        {lead && <p className="measure mt-5 text-lg text-body">{lead}</p>}
        <div className="mt-8">
          <Button href={action.href}>{action.label}</Button>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   10. ListingGrid — blogs, case studies, capabilities, partners.
   ========================================================================= */
export function ListingGrid({
  records,
  basePath,
  practice = "neutral",
  tone = "white",
  columns = 3,
  empty = "Nothing here yet.",
}: {
  records: Record[];
  basePath: string;
  practice?: Practice;
  tone?: "white" | "tint";
  columns?: 2 | 3;
  empty?: string;
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
        className={`grid gap-6 ${columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}
      >
        {records.map((record) => (
          <Link
            key={record.slug}
            href={`${basePath}/${record.slug}`}
            className={`rounded-card border border-line border-l-4 bg-bg p-6 transition-colors duration-150 ease-brand hover:border-ink ${
              practice === "government"
                ? "border-l-brand-red hover:border-l-brand-red"
                : "border-l-brand-blue hover:border-l-brand-blue"
            }`}
          >
            {record.category && record.category !== "Uncategorized" && (
              <p
                className={`mb-3 text-eyebrow uppercase ${eyebrowClass(practice)}`}
              >
                {record.category}
              </p>
            )}
            <h3 className="text-h4 text-ink">{record.title}</h3>
            {record.published && (
              <p className="mt-3 text-sm text-muted">
                {new Date(record.published).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  timeZone: "UTC",
                })}
              </p>
            )}
            <p className="mt-5 text-sm text-link">Read more →</p>
          </Link>
        ))}
      </div>
    </Band>
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
