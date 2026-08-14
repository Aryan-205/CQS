/**
 * Careers layouts.
 *
 * The three careers pages have three different jobs — persuade a candidate,
 * serve an employee a reference document, and get someone into the job board —
 * so they are built from three different structures rather than from the
 * site's standard hero / split / card-grid rhythm.
 *
 * Design system rules held throughout: white ground, black only inside
 * contained elements, brand primaries as fills and rules carrying ink text,
 * 400/500 weights, hairlines rather than shadows, motion only on hover.
 */
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Media } from "@/lib/media";
import type { Practice } from "@/lib/content";
import { eyebrowClass, glowClass, ruleClass } from "@/lib/content";
import { Arrow } from "@/components/icons";
import { Button, Eyebrow } from "@/components/sections";

/* =========================================================================
   CareersHero — the signature open on /life-at-compqsoft.

   Headline left at hero scale, one framed photograph on the right that hangs
   past the foot of the black band into the white page, and the company's
   scale set as a rail along the bottom rather than as a separate stats
   section further down. The overhang is the one structural risk on the page;
   everything under it stays quiet.
   ========================================================================= */
export function CareersHero({
  eyebrow,
  title,
  lead,
  actions,
  image,
  stats,
  practice = "neutral",
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  actions?: { label: string; href: string }[];
  image: Media;
  stats: { value: string; label: string }[];
  practice?: Practice;
}) {
  return (
    <section className="relative z-10 grad-hero">
      <div className="absolute inset-0 hairline-grid opacity-60" aria-hidden />

      <div className="shell relative pb-16 pt-32 sm:pb-20 sm:pt-40">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Eyebrow practice={practice} onDark>
              {eyebrow}
            </Eyebrow>
            <h1 className="mt-10 max-w-[13ch] text-hero text-on-black">
              {title}
            </h1>
            {lead && (
              <p className="measure mt-8 text-lg text-on-black-mute">{lead}</p>
            )}
            {actions && actions.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-3">
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

          {/* Hangs 96px past the band on wide screens; stacked and flush on
              narrow ones, where an overhang would only steal vertical space. */}
          <div className="lg:col-span-5 lg:col-start-8">
            <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-black lg:-mb-24">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="graded object-cover"
              />
              <span
                className={`absolute inset-x-0 bottom-0 h-1 ${ruleClass(practice)}`}
                aria-hidden
              />
            </div>
          </div>
        </div>

        <dl className="mt-16 grid gap-px border-t border-white/15 sm:grid-cols-3 lg:max-w-[58%]">
          {stats.map((stat) => (
            <div key={stat.label} className="pt-7">
              <dt className="text-stat-label uppercase text-on-black-mute">
                {stat.label}
              </dt>
              <dd className="tabular mt-3 text-h1 text-on-black">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <span
        className={`absolute inset-x-0 bottom-0 h-1 ${ruleClass(practice)}`}
        aria-hidden
      />
    </section>
  );
}

/* =========================================================================
   Statement — copy alone, with the eyebrow hanging in the left margin. Used
   where the page needs to slow down: no picture, no card, nothing to click.
   ========================================================================= */
export function Statement({
  eyebrow,
  children,
  practice = "neutral",
  pad = "normal",
}: {
  eyebrow: string;
  children: ReactNode;
  practice?: Practice;
  /** `wide` clears the hero's overhanging photograph. */
  pad?: "normal" | "wide";
}) {
  return (
    <section
      className={`bg-bg ${pad === "wide" ? "pb-24 pt-32 sm:pb-32 sm:pt-44" : "py-24 sm:py-32"}`}
    >
      <div className="shell grid gap-8 lg:grid-cols-12 lg:gap-16">
        <p
          className={`text-eyebrow uppercase lg:col-span-3 ${eyebrowClass(practice)}`}
        >
          {eyebrow}
        </p>
        <div className="space-y-8 text-lg text-body lg:col-span-8 lg:col-start-4 [&_strong]:text-ink">
          {children}
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   IndexRows — the four values.

   A full-width row each rather than a card in a four-up grid: the values are
   not a sequence and not comparable quantities, they are four separate
   statements, and a row gives each one the width to be read. The glyph sits
   in the left gutter at 56px, which is the only place on the site an icon
   runs that large.
   ========================================================================= */
export function IndexRows({
  eyebrow,
  title,
  items,
  practice = "neutral",
  tone = "white",
}: {
  eyebrow?: string;
  title?: string;
  items: { title: string; description: string; icon: ReactNode }[];
  practice?: Practice;
  tone?: "white" | "tint";
}) {
  if (!items.length) return null;

  const glyph = practice === "government" ? "text-brand-red" : "text-brand-blue";

  return (
    <section className="relative isolate bg-bg py-24 sm:py-32">
      {tone === "tint" && (
        <div
          className={`pointer-events-none absolute inset-0 -z-10 ${glowClass(practice)}`}
          aria-hidden
        />
      )}
      <div className="shell">
        {(eyebrow || title) && (
          <div className="mb-16 max-w-[24ch]">
            {eyebrow && <Eyebrow practice={practice}>{eyebrow}</Eyebrow>}
            {title && <h2 className="mt-6 text-h1 text-ink">{title}</h2>}
          </div>
        )}

        <ul className="border-t border-line">
          {items.map((item) => (
            <li
              key={item.title}
              className="grid gap-6 border-b border-line py-12 lg:grid-cols-12 lg:gap-16"
            >
              <span className={`block h-14 w-14 lg:col-span-1 ${glyph}`}>
                {item.icon}
              </span>
              <h3 className="text-h2 text-ink lg:col-span-5 lg:col-start-3">
                {item.title}
              </h3>
              <p className="measure text-lg text-body lg:col-span-4 lg:col-start-9">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* =========================================================================
   Triptych — three photographs edge to edge, hairline between them, one
   caption line under the set. Imagery as a band rather than as decoration
   inside a card.
   ========================================================================= */
export function Triptych({
  images,
  caption,
  practice = "neutral",
}: {
  images: Media[];
  caption?: string;
  practice?: Practice;
}) {
  if (!images.length) return null;

  return (
    <section className="bg-bg">
      <div className="grid gap-px bg-line sm:grid-cols-3">
        {images.map((image) => (
          <div key={image.src} className="relative aspect-[3/4] bg-black">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 640px) 33vw, 100vw"
              className="graded object-cover"
            />
          </div>
        ))}
      </div>
      {caption && (
        <div className="shell">
          <p className="flex items-center gap-3 py-6 text-stat-label uppercase text-muted">
            <span
              className={`h-[3px] w-6 ${ruleClass(practice)}`}
              aria-hidden
            />
            {caption}
          </p>
        </div>
      )}
    </section>
  );
}

/* =========================================================================
   Ledger — the eight benefits, as an index rather than eight cards.

   Name on the left at heading size, the kind of cover it is on the right as a
   quiet label. Eight cards would have made the package look like a marketing
   grid; a ledger makes it look like a schedule, which is what it is.
   ========================================================================= */
export function Ledger({
  eyebrow,
  title,
  lead,
  items,
  practice = "neutral",
  tone = "tint",
}: {
  eyebrow?: string;
  title?: string;
  lead?: string;
  items: { title: string; tag: string; icon: ReactNode }[];
  practice?: Practice;
  tone?: "white" | "tint";
}) {
  if (!items.length) return null;

  const glyph = practice === "government" ? "text-brand-red" : "text-brand-blue";

  return (
    <section className="relative isolate bg-bg py-24 sm:py-32">
      {tone === "tint" && (
        <div
          className={`pointer-events-none absolute inset-0 -z-10 ${glowClass(practice)}`}
          aria-hidden
        />
      )}
      <div className="shell">
        <div className="mb-16 grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-6">
            {eyebrow && <Eyebrow practice={practice}>{eyebrow}</Eyebrow>}
            {title && <h2 className="mt-6 text-h1 text-ink">{title}</h2>}
          </div>
          {lead && (
            <p className="text-base text-body lg:col-span-5 lg:col-start-8">
              {lead}
            </p>
          )}
        </div>

        <dl className="border-t border-line">
          {items.map((item) => (
            <div
              key={item.title}
              className="flex flex-wrap items-center justify-between gap-x-10 gap-y-3 border-b border-line py-7"
            >
              <dt className="flex items-center gap-6 text-h3 text-ink">
                <span className={`block h-8 w-8 shrink-0 ${glyph}`}>
                  {item.icon}
                </span>
                {item.title}
              </dt>
              <dd className="text-stat-label uppercase text-muted">
                {item.tag}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* =========================================================================
   PracticePanels — the dual-audience choice, made once more at the point a
   candidate has to pick a side. Two full-bleed halves, red and blue, black
   photography under a scrim. No white gap between them.
   ========================================================================= */
export function PracticePanels({
  eyebrow,
  title,
  panels,
}: {
  eyebrow?: string;
  title?: string;
  panels: {
    href: string;
    image: Media;
    label: string;
    title: string;
    description: string;
    practice: Practice;
  }[];
}) {
  return (
    <section className="bg-bg pb-0 pt-24 sm:pt-32">
      {(eyebrow || title) && (
        <div className="shell mb-14 max-w-[26ch]">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          {title && <h2 className="mt-6 text-h1 text-ink">{title}</h2>}
        </div>
      )}

      <div className="grid gap-px bg-line md:grid-cols-2">
        {panels.map((panel) => (
          <Link
            key={panel.href}
            href={panel.href}
            className="group relative isolate flex min-h-[26rem] flex-col justify-end overflow-hidden bg-black p-8 sm:min-h-[32rem] sm:p-12"
          >
            <Image
              src={panel.image.src}
              alt=""
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="graded-deep object-cover transition-transform duration-[240ms] ease-brand group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 scrim-plain" aria-hidden />

            <div className="relative">
              <p className="flex items-center gap-3 text-eyebrow uppercase text-on-black">
                <span
                  className={`h-[3px] w-6 ${ruleClass(panel.practice)}`}
                  aria-hidden
                />
                {panel.label}
              </p>
              <h3 className="mt-6 max-w-[16ch] text-h1 text-on-black">
                {panel.title}
              </h3>
              <p className="measure mt-5 text-base text-on-black-mute">
                {panel.description}
              </p>
              <span className="mt-8 inline-flex items-center gap-2 text-base text-on-black">
                <span className="border-b-2 border-white/40 pb-1 transition-colors duration-150 ease-brand group-hover:border-on-black">
                  See the practice
                </span>
                <Arrow className="h-3.5 w-3.5 transition-transform duration-150 ease-brand group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* =========================================================================
   The employee resource centre.
   ========================================================================= */

/**
 * UtilityHero — short, because nobody arrives here to read. The page title,
 * the HR number, and nothing else.
 */
export function UtilityHero({
  eyebrow,
  title,
  lead,
  contact,
  practice = "neutral",
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  contact?: { label: string; href: string };
  practice?: Practice;
}) {
  return (
    <section className="relative grad-hero">
      <div className="absolute inset-0 hairline-grid opacity-60" aria-hidden />
      <div className="shell relative flex flex-col gap-8 pb-24 pt-32 sm:flex-row sm:items-end sm:justify-between sm:pb-28 sm:pt-40">
        <div>
          <Eyebrow practice={practice} onDark>
            {eyebrow}
          </Eyebrow>
          <h1 className="mt-8 max-w-[16ch] text-display text-on-black">
            {title}
          </h1>
          {lead && (
            <p className="measure mt-6 text-lg text-on-black-mute">{lead}</p>
          )}
        </div>

        {contact && (
          <a
            href={contact.href}
            className="group inline-flex shrink-0 items-center gap-3 rounded-pill border border-white/30 px-6 py-3.5 text-base text-on-black transition-colors duration-150 ease-brand hover:border-on-black hover:bg-white/5"
          >
            <span className="text-stat-label uppercase text-on-black-mute">
              HR
            </span>
            <span className="tabular font-mono text-code">{contact.label}</span>
          </a>
        )}
      </div>
      {/* No closing rule here: the console card below sits across this edge
          and carries the practice colour on its own top instead. */}
    </section>
  );
}

/**
 * Console — the signature of the resource centre: a white card that sits
 * across the foot of the hero carrying the four things the page holds. An
 * employee lands, sees four doors, and takes one. Nothing else competes.
 */
export function Console({
  items,
  practice = "neutral",
}: {
  items: { label: string; href: string; note: string; icon: ReactNode }[];
  practice?: Practice;
}) {
  const glyph = practice === "government" ? "text-brand-red" : "text-brand-blue";

  return (
    <section className="relative z-10 bg-bg">
      <div className="shell -mt-16 sm:-mt-20">
        <span className={`block h-1 ${ruleClass(practice)}`} aria-hidden />
        <ul className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="group flex h-full flex-col bg-bg p-7 transition-colors duration-150 ease-brand hover:bg-tint-neutral sm:p-8"
              >
                <span className={`block h-8 w-8 ${glyph}`}>{item.icon}</span>
                <span className="mt-6 text-h4 text-ink transition-colors duration-150 ease-brand group-hover:text-link">
                  {item.label}
                </span>
                <span className="mt-2 text-sm text-muted">{item.note}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/**
 * PortalTiles — one tile per system, each with what it is for and the way in.
 * Systems are not ranked, so they run as a grid rather than as a list.
 */
export function PortalTiles({
  id,
  eyebrow,
  title,
  lead,
  items,
  practice = "neutral",
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  lead?: string;
  items: {
    title: string;
    description: string;
    action?: { label: string; href: string };
  }[];
  practice?: Practice;
}) {
  return (
    <section id={id} className="bg-bg py-24 sm:py-32">
      <div className="shell">
        <div className="mb-14 grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-6">
            {eyebrow && <Eyebrow practice={practice}>{eyebrow}</Eyebrow>}
            <h2 className="mt-6 text-h1 text-ink">{title}</h2>
          </div>
          {lead && (
            <p className="text-base text-body lg:col-span-5 lg:col-start-8">
              {lead}
            </p>
          )}
        </div>

        <ul className="grid gap-px border border-line bg-line sm:grid-cols-2">
          {items.map((item) => (
            <li
              key={item.title}
              className="flex flex-col bg-bg p-8 sm:p-10"
            >
              <h3 className="text-h3 text-ink">{item.title}</h3>
              <p className="mt-4 text-base text-body">{item.description}</p>
              <div className="mt-8 pt-2">
                {item.action ? (
                  <a
                    href={item.action.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 border-b-2 border-brand-blue pb-1 text-base text-link transition-colors duration-150 ease-brand hover:text-link-hover"
                  >
                    {item.action.label}
                    <Arrow className="h-3 w-3 transition-transform duration-150 ease-brand group-hover:translate-x-1" />
                  </a>
                ) : (
                  <span className="text-sm text-muted">
                    Internal network only
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** DownloadChips — the standard desktop set, as pills. Four small links do
 *  not need four cards. */
export function DownloadChips({
  id,
  eyebrow,
  title,
  items,
  practice = "neutral",
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  items: { label: string; href: string; note?: string }[];
  practice?: Practice;
}) {
  return (
    <section id={id} className="bg-bg pb-24 sm:pb-32">
      <div className="shell border-t border-line pt-14">
        {eyebrow && <Eyebrow practice={practice}>{eyebrow}</Eyebrow>}
        <h2 className="mt-6 max-w-[20ch] text-h2 text-ink">{title}</h2>
        <ul className="mt-10 flex flex-wrap gap-3">
          {items.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-pill border border-line px-6 py-3 text-base text-ink transition-colors duration-150 ease-brand hover:border-ink hover:bg-tint-neutral"
              >
                {item.label}
                {item.note && (
                  <span className="text-sm text-muted">{item.note}</span>
                )}
                <Arrow className="h-3 w-3 rotate-90 text-muted transition-transform duration-150 ease-brand group-hover:translate-y-0.5" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/**
 * HolidayWall — eleven dates as a wall of chips rather than a two-column
 * table. A holiday calendar is scanned for "when is the next one", and a
 * date block answers that faster than a row of text does.
 */
export function HolidayWall({
  id,
  eyebrow,
  title,
  lead,
  holidays,
  note,
  practice = "neutral",
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  lead?: string;
  holidays: { month: string; day: string; weekday: string; name: string }[];
  note?: ReactNode;
  practice?: Practice;
}) {
  return (
    <section id={id} className="relative isolate bg-bg py-24 sm:py-32">
      <div
        className={`pointer-events-none absolute inset-0 -z-10 ${glowClass(practice)}`}
        aria-hidden
      />
      <div className="shell">
        <div className="mb-14 grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-6">
            {eyebrow && <Eyebrow practice={practice}>{eyebrow}</Eyebrow>}
            <h2 className="mt-6 text-h1 text-ink">{title}</h2>
          </div>
          {lead && (
            <p className="text-base text-body lg:col-span-5 lg:col-start-8">
              {lead}
            </p>
          )}
        </div>

        <ul className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {holidays.map((holiday) => (
            <li key={holiday.name} className="flex gap-6 bg-bg p-7 sm:p-8">
              {/* Brand fill carrying ink text — the one treatment the palette
                  allows at full saturation. */}
              <span className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-card bg-brand-blue text-ink">
                <span className="text-stat-label uppercase">
                  {holiday.month}
                </span>
                <span className="tabular text-h3 leading-none">
                  {holiday.day}
                </span>
              </span>
              <span className="flex flex-col justify-center">
                <span className="text-stat-label uppercase text-muted">
                  {holiday.weekday}
                </span>
                <span className="mt-1.5 text-h4 text-ink">{holiday.name}</span>
              </span>
            </li>
          ))}
        </ul>

        {note && <div className="measure mt-10 text-sm text-muted">{note}</div>}
      </div>
    </section>
  );
}

/**
 * PayLedger — 24 pay periods in two columns of twelve, split at the half
 * year. A single 24-row table runs longer than a screen and forces the reader
 * to hold the column headings in their head while they scroll.
 */
export function PayLedger({
  id,
  eyebrow,
  title,
  lead,
  periods,
  note,
  practice = "neutral",
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  lead?: string;
  periods: { no: string; period: string; check: string; day: string }[];
  note?: ReactNode;
  practice?: Practice;
}) {
  const half = Math.ceil(periods.length / 2);
  const columns = [periods.slice(0, half), periods.slice(half)];

  return (
    <section id={id} className="bg-bg py-24 sm:py-32">
      <div className="shell">
        <div className="mb-14 grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-6">
            {eyebrow && <Eyebrow practice={practice}>{eyebrow}</Eyebrow>}
            <h2 className="mt-6 text-h1 text-ink">{title}</h2>
          </div>
          {lead && (
            <p className="text-base text-body lg:col-span-5 lg:col-start-8">
              {lead}
            </p>
          )}
        </div>

        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-2">
          {columns.map((column, i) => (
            <dl key={i} className="border-t border-line">
              <div className="flex justify-between gap-8 border-b border-line py-4">
                <span className="text-stat-label uppercase text-muted">
                  Period
                </span>
                <span className="text-stat-label uppercase text-muted">
                  Check date
                </span>
              </div>
              {column.map((row) => (
                <div
                  key={row.no}
                  className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b border-line py-4"
                >
                  <dt className="flex items-baseline gap-5">
                    <span className="tabular text-stat-label text-muted">
                      {row.no}
                    </span>
                    <span className="tabular font-mono text-code text-ink">
                      {row.period}
                    </span>
                  </dt>
                  <dd className="flex items-baseline gap-4">
                    <span className="tabular font-mono text-code text-ink">
                      {row.check}
                    </span>
                    <span className="text-sm text-muted">{row.day}</span>
                  </dd>
                </div>
              ))}
            </dl>
          ))}
        </div>

        {note && <div className="measure mt-10 text-sm text-muted">{note}</div>}
      </div>
    </section>
  );
}

/**
 * DarkStatement — a contained black band for the one piece of copy on the
 * resource centre that is a commitment rather than a reference: the quality
 * policy. Black is allowed here because it is a card on a white page.
 */
export function DarkStatement({
  eyebrow,
  children,
  contacts,
  practice = "neutral",
}: {
  eyebrow: string;
  children: ReactNode;
  contacts?: { label: string; value: string; href: string }[];
  practice?: Practice;
}) {
  return (
    <section className="bg-bg pb-24 sm:pb-32">
      <div className="shell">
        <div className="relative overflow-hidden rounded-card grad-hero p-10 sm:p-16">
          <div
            className="absolute inset-0 hairline-grid opacity-50"
            aria-hidden
          />
          <div className="relative grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Eyebrow practice={practice} onDark>
                {eyebrow}
              </Eyebrow>
            </div>
            <div className="lg:col-span-8">
              <div className="measure text-lg text-on-black">{children}</div>

              {contacts && contacts.length > 0 && (
                <dl className="mt-12 grid gap-8 border-t border-white/15 pt-8 sm:grid-cols-2">
                  {contacts.map((contact) => (
                    <div key={contact.href}>
                      <dt className="text-stat-label uppercase text-on-black-mute">
                        {contact.label}
                      </dt>
                      <dd className="mt-2">
                        <a
                          href={contact.href}
                          className="font-mono text-code text-on-black underline decoration-brand-blue decoration-2 underline-offset-4 transition-colors duration-150 ease-brand hover:text-brand-blue"
                        >
                          {contact.value}
                        </a>
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   The job board.
   ========================================================================= */

/**
 * BoardHero — the shortest hero on the site. The board is the page, so the
 * banner gets the headline, three facts on a rail, and gets out of the way.
 */
export function BoardHero({
  eyebrow,
  title,
  lead,
  facts,
  image,
  practice = "neutral",
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  facts: { label: string; value: string }[];
  image?: string;
  practice?: Practice;
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
            className="graded-deep object-cover opacity-60"
          />
          <div className="absolute inset-0 scrim-plain" aria-hidden />
        </>
      )}
      <div className="absolute inset-0 hairline-grid opacity-50" aria-hidden />

      <div className="shell relative pb-14 pt-32 sm:pb-16 sm:pt-40">
        <Eyebrow practice={practice} onDark>
          {eyebrow}
        </Eyebrow>
        <h1 className="mt-8 max-w-[18ch] text-display text-on-black">{title}</h1>
        {lead && (
          <p className="measure mt-6 text-lg text-on-black-mute">{lead}</p>
        )}

        <dl className="mt-14 grid gap-8 border-t border-white/15 pt-8 sm:grid-cols-3">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="text-stat-label uppercase text-on-black-mute">
                {fact.label}
              </dt>
              <dd className="mt-2 text-base text-on-black">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <span
        className={`absolute inset-x-0 bottom-0 h-1 ${ruleClass(practice)}`}
        aria-hidden
      />
    </section>
  );
}

/**
 * BoardFrame — the Paylocity embed, framed and given the full 1536px shell.
 * The header line says where the listing comes from, because the board's own
 * styling will never match the page and a reader should know why.
 */
export function BoardFrame({
  src,
  title,
  source,
}: {
  src: string;
  title: string;
  source: string;
}) {
  return (
    <section className="bg-bg py-16 sm:py-20">
      <div className="shell-wide">
        <div className="overflow-hidden rounded-card border border-line bg-bg">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line px-6 py-4 sm:px-8">
            <p className="flex items-center gap-3 text-stat-label uppercase text-muted">
              <span
                className="h-2 w-2 rounded-pill bg-brand-blue"
                aria-hidden
              />
              {source}
            </p>
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 border-b-2 border-brand-blue pb-1 text-sm text-link transition-colors duration-150 ease-brand hover:text-link-hover"
            >
              Open in a new tab
              <Arrow className="h-3 w-3 transition-transform duration-150 ease-brand group-hover:translate-x-1" />
            </a>
          </div>
          <iframe
            src={src}
            title={title}
            className="h-[1100px] w-full sm:h-[1400px]"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

/** NoteColumns — plain text columns under the board. Utility copy, no cards. */
export function NoteColumns({
  notes,
  practice = "neutral",
}: {
  notes: { title: string; body: ReactNode }[];
  practice?: Practice;
}) {
  return (
    <section className="bg-bg pb-24 sm:pb-32">
      <div className="shell grid gap-10 border-t border-line pt-12 md:grid-cols-3">
        {notes.map((note) => (
          <div key={note.title}>
            <p
              className={`text-eyebrow uppercase ${eyebrowClass(practice)}`}
            >
              {note.title}
            </p>
            <div className="mt-4 text-base text-body">{note.body}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
