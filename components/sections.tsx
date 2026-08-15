import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Block, Practice, Record } from "@/lib/content";
import { eyebrowClass, glowClass, ruleClass } from "@/lib/content";
import { Blocks } from "@/components/blocks";
import { Arrow } from "@/components/icons";
import { Logo } from "@/components/logo";

/* =========================================================================
   Band — every section is one of these. The ground is white the whole way
   down; `tone="tint"` no longer paints a tinted band, it drops a very light
   red/blue bloom behind the content. Rhythm without a change of ground.
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
  /** `tight` is for the band that follows a hero directly — the hero already
   *  gave the eye a rest, so the full 128px reads as a hole in the page. */
  size?: "tight" | "normal" | "large";
  wide?: boolean;
  id?: string;
}) {
  const pad =
    size === "large"
      ? "py-28 sm:py-40"
      : size === "tight"
        ? "py-14 sm:py-20"
        : "py-24 sm:py-32";
  return (
    <section id={id} className={`relative isolate bg-bg ${pad}`}>
      {tone === "tint" && <Glow practice={practice} />}
      <div className={wide ? "shell-wide" : "shell"}>{children}</div>
    </section>
  );
}

/** The scattered brand bloom. Static, pointer-transparent, behind everything. */
export function Glow({ practice = "neutral" }: { practice?: Practice }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 -z-10 ${glowClass(practice)}`}
      aria-hidden
    />
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
  mark = false,
}: {
  eyebrow?: string;
  title?: string;
  lead?: string;
  practice?: Practice;
  onDark?: boolean;
  action?: { label: string; href: string };
  align?: "left" | "split";
  /**
   * Hangs the company lockup off the end of the head, at four times the size
   * it runs at in the header. Transparent artwork straight onto the white
   * ground — no plate, no tint, no opacity fade, because the mark is only ever
   * shown as drawn. Reserved for the bands that are statements about the
   * company itself rather than about a service.
   */
  mark?: boolean;
}) {
  if (!eyebrow && !title && !lead) return null;

  return (
    <div
      className={`mb-14 sm:mb-16 ${
        align === "split" || mark
          ? "flex flex-col gap-10 md:flex-row md:items-end md:justify-between md:gap-16"
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
            className={`measure mt-5 text-h1 ${onDark ? "text-on-black" : "text-ink"}`}
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
      {mark && (
        <Logo
          variant="full"
          tone={onDark ? "dark" : "light"}
          className="h-14 shrink-0 sm:h-16 lg:h-20"
          priority={false}
          decorative
        />
      )}
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
          compact
            ? "min-h-[260px] py-14 sm:min-h-[320px] sm:py-16"
            : "min-h-[420px] py-20 sm:min-h-[520px] sm:py-28"
        }`}
      >
        {eyebrow && (
          <Eyebrow practice={practice} onDark>
            {eyebrow}
          </Eyebrow>
        )}
        <h1
          className={`measure text-on-black ${compact ? "mt-4 text-h1" : "mt-6 text-display"}`}
        >
          {title}
        </h1>
        {lead && (
          <p
            className={`measure text-lg text-on-black-mute ${compact ? "mt-4" : "mt-6"}`}
          >
            {lead}
          </p>
        )}
        {actions && actions.length > 0 && (
          <div
            className={`flex flex-wrap gap-3 ${compact ? "mt-7" : "mt-9"}`}
          >
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
  mark = false,
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
  /** Hang the company lockup off the head. See `SectionHead`. */
  mark?: boolean;
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
        mark={mark}
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
            className="group grid h-32 place-items-center bg-bg px-6 transition-colors duration-150 ease-brand hover:bg-tint-neutral"
          >
            {/* Full-colour marks — the alliance-partner set, which is the only
                colour artwork the media library holds. No filter of any kind:
                a partner mark is the partner's, not ours to recolour. */}
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              className="h-auto max-h-14 w-auto max-w-[150px] object-contain mix-blend-multiply"
              unoptimized
            />
          </li>
        ))}
      </ul>
    </Band>
  );
}

/* =========================================================================
   7a. IdentifierStrip — the registrations a contracting officer checks first.

   These are codes, not headings. The archive marks each value up as an H4 and
   drops the label that belongs above it, so the rebuilt page would otherwise
   render four unlabelled 24px numbers in a column — the wrong size and, worse,
   no way to tell a CAGE code from a DUNS number.

   So: the label carries at stat-label (13px, uppercase, tracked, muted) and
   the value at code (14px mono, ink). Mono earns its one sanctioned job here.
   Small type is correct — a reference figure is scanned and copied, never
   read, and setting it large only costs the page its hierarchy.
   ========================================================================= */
export function IdentifierStrip({
  eyebrow = "Company information",
  title,
  lead,
  identifiers,
  tone = "white",
  practice = "government",
  columns = 5,
}: {
  eyebrow?: string;
  title?: string;
  lead?: string;
  identifiers: readonly { label: string; value: string }[];
  tone?: "white" | "tint";
  practice?: Practice;
  columns?: 4 | 5;
}) {
  if (!identifiers.length) return null;

  return (
    <Band tone={tone} practice={practice}>
      {(eyebrow || title || lead) && (
        <div className="mb-10">
          {eyebrow && <Eyebrow practice={practice}>{eyebrow}</Eyebrow>}
          {/* h3 rather than the h1 SectionHead would set: this band is a
              reference row, and a 46px heading over 14px codes is top-heavy. */}
          {title && <h2 className="mt-5 text-h3 text-ink">{title}</h2>}
          {lead && <p className="measure mt-4 text-sm text-body">{lead}</p>}
        </div>
      )}

      <dl
        className={`grid gap-px border border-line bg-line sm:grid-cols-2 ${
          columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-5"
        }`}
      >
        {identifiers.map((id) => (
          <div key={id.label} className="bg-bg px-6 py-7 sm:px-7">
            <dt className="text-stat-label uppercase text-muted">{id.label}</dt>
            <dd className="mt-3 font-mono text-code text-ink">{id.value}</dd>
          </div>
        ))}
      </dl>
    </Band>
  );
}

/**
 * CertStrip — the socio-economic registrations.
 *
 * A set-aside status has no mark of its own: it is a registration in SAM, not
 * a certificate with artwork, so there is nothing to put in a LogoWall. It is
 * also the single fact that decides whether a contracting officer can buy from
 * CompQsoft at all, which is more weight than a row of pills carries. Each
 * status therefore gets a cell, a brand-filled marker and a line saying what
 * it means in a procurement, and the company lockup hangs off the head so the
 * band reads as a statement about the firm rather than as a caption.
 */
export function CertStrip({
  eyebrow,
  title,
  lead,
  items,
  tone = "white",
  practice = "neutral",
  mark = false,
}: {
  eyebrow?: string;
  title?: string;
  lead?: string;
  items: { title: string; description: string; icon?: ReactNode }[];
  tone?: "white" | "tint";
  practice?: Practice;
  mark?: boolean;
}) {
  if (!items.length) return null;

  return (
    <Band tone={tone} practice={practice}>
      <SectionHead
        eyebrow={eyebrow}
        title={title}
        lead={lead}
        practice={practice}
        mark={mark}
      />

      <ul className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li key={item.title} className="bg-bg p-7 sm:p-8">
            {item.icon && (
              <span
                className={`mb-6 grid h-12 w-12 place-items-center rounded-pill text-ink ${ruleClass(practice)}`}
              >
                {item.icon}
              </span>
            )}
            <h3 className="text-h4 text-ink">{item.title}</h3>
            <p className="mt-3 text-sm text-body">{item.description}</p>
          </li>
        ))}
      </ul>
    </Band>
  );
}

/* =========================================================================
   7b. LogoWall — customers, certifications, contract vehicles.

   PartnerGrid is a mark-only wall: it works because every technology partner
   is recognised from its wordmark alone. A federal seal is not a wordmark —
   the DLA and DeCA seals are near-identical at 56px — so this wall pairs the
   artwork with the name, and lets the caption carry a line of context.

   The logo is optional. A customer with no mark in the media library renders
   as the name alone rather than borrowing someone else's artwork, and the
   fixed-height plate above the name keeps the row baselines aligned either
   way. Marks are never recoloured — federal insignia especially — so the only
   treatment is `mix-blend-multiply`, which drops the white plate the JPG
   marks carry onto the page ground.
   ========================================================================= */
export type WallItem = {
  name: string;
  logo?: { src: string; alt?: string };
  caption?: string;
  href?: string;
};

export function LogoWall({
  eyebrow,
  title,
  lead,
  items,
  tone = "white",
  practice = "neutral",
  columns = 4,
  action,
}: {
  eyebrow?: string;
  title?: string;
  lead?: string;
  items: WallItem[];
  tone?: "white" | "tint";
  practice?: Practice;
  columns?: 3 | 4 | 5 | 6;
  action?: { label: string; href: string };
}) {
  if (!items.length) return null;

  const cols = {
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
    5: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
    6: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6",
  }[columns];

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

      <ul className={`grid gap-px border border-line bg-line ${cols}`}>
        {items.map((item) => {
          const inner = (
            <>
              {/* Fixed plate, whether or not there is a mark to put on it, so
                  the names below sit on one line across the row. */}
              <span className="relative block h-16 w-full">
                {item.logo && (
                  <Image
                    src={item.logo.src}
                    alt={item.logo.alt ?? item.name}
                    fill
                    sizes="180px"
                    className="object-contain mix-blend-multiply"
                  />
                )}
              </span>
              <span className="mt-7 block text-h4 text-ink">{item.name}</span>
              {item.caption && (
                <span className="mt-3 block text-sm text-body">{item.caption}</span>
              )}
            </>
          );

          const base =
            "group relative flex h-full flex-col items-center bg-bg p-7 text-center transition-colors duration-150 ease-brand sm:p-8";

          return (
            <li key={item.name} className="bg-bg">
              {item.href ? (
                <Link href={item.href} className={`${base} hover:bg-tint-neutral`}>
                  {/* The rule that fills on hover — the card's practice signal. */}
                  <span
                    className={`absolute inset-x-0 top-0 h-[3px] w-0 transition-[width] duration-[180ms] ease-brand group-hover:w-full ${ruleClass(practice)}`}
                    aria-hidden
                  />
                  {inner}
                </Link>
              ) : (
                <div className={base}>{inner}</div>
              )}
            </li>
          );
        })}
      </ul>
    </Band>
  );
}

/* =========================================================================
   7c. PeopleGrid — leadership and the team.

   A portrait, the name, the role. The photograph is deliberately NOT run
   through `.graded`: that filter exists to pull mission photography cool and
   desaturated so it sits with the palette, and applied to a headshot it only
   makes skin look ill. The practice rule under each portrait carries the
   brand signal instead.
   ========================================================================= */
export function PeopleGrid({
  eyebrow,
  title,
  lead,
  people,
  tone = "white",
  practice = "neutral",
  columns = 3,
  action,
}: {
  eyebrow?: string;
  title?: string;
  lead?: string;
  people: {
    name: string;
    role?: string;
    href?: string;
    image?: { src: string; alt?: string };
    description?: string;
  }[];
  tone?: "white" | "tint";
  practice?: Practice;
  columns?: 3 | 4 | 5;
  action?: { label: string; href: string };
}) {
  if (!people.length) return null;

  const cols = {
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
    5: "sm:grid-cols-3 lg:grid-cols-5",
  }[columns];

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

      <ul className={`grid gap-x-10 gap-y-14 ${cols}`}>
        {people.map((person) => {
          const inner = (
            <>
              <span className="relative block aspect-square w-full overflow-hidden bg-tint-neutral">
                {person.image ? (
                  <Image
                    src={person.image.src}
                    alt={person.image.alt || person.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover object-top transition-transform duration-[240ms] ease-brand group-hover:scale-[1.02]"
                  />
                ) : (
                  /* No portrait on file — the initials keep the cell a
                     deliberate object rather than an empty box. */
                  <span className="grid h-full w-full place-items-center text-h1 text-muted">
                    {person.name
                      .split(" ")
                      .map((part) => part[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                )}
                <span
                  className={`absolute inset-x-0 bottom-0 h-1 ${ruleClass(practice)}`}
                  aria-hidden
                />
              </span>

              <span className="mt-7 block text-h3 text-ink transition-colors duration-150 ease-brand group-hover:text-link">
                {person.name}
              </span>
              {person.role && (
                <span className="mt-3 block text-stat-label uppercase text-muted">
                  {person.role}
                </span>
              )}
              {person.description && (
                <span className="mt-4 block text-sm text-body">
                  {person.description}
                </span>
              )}
            </>
          );

          return (
            <li key={person.name}>
              {person.href ? (
                <Link href={person.href} className="group block">
                  {inner}
                </Link>
              ) : (
                <div className="group block">{inner}</div>
              )}
            </li>
          );
        })}
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
  limit = 6,
}: {
  title?: string;
  faqs: Record[];
  practice?: Practice;
  tone?: "white" | "tint";
  /**
   * Six is the whole accordion. Callers pass everything they have and the cut
   * happens here, in the order they supplied — service-specific questions
   * first, the generic ones last — so what survives is the half a visitor
   * came for. The schema below is cut with it: marking up questions that are
   * not on the page is exactly what the FAQPage spec forbids.
   */
  limit?: number;
}) {
  const shown = faqs.slice(0, limit);
  if (!shown.length) return null;

  return (
    <Band id="faq" tone={tone} practice={practice}>
      <SectionHead eyebrow="Questions" title={title} practice={practice} />
      <div className="divide-y divide-line border-y border-line">
        {shown.map((faq) => (
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
    <section className="relative isolate bg-bg py-32 sm:py-44">
      <Glow practice={practice} />
      <div className="shell flex flex-col items-center text-center">
        <span
          className={`mb-10 block h-[3px] w-16 ${ruleClass(practice)}`}
          aria-hidden
        />
        <h2 className="max-w-[18ch] text-display text-ink">{title}</h2>
        {lead && (
          <p className="mt-7 max-w-[58ch] text-lg text-body">{lead}</p>
        )}
        <div className="mt-12 flex flex-wrap justify-center gap-3">
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
  size = "normal",
  filters,
}: {
  records: Record[];
  basePath: string;
  practice?: Practice;
  tone?: "white" | "tint";
  columns?: 2 | 3;
  empty?: string;
  /** Supply a fallback when the CMS record carries no image. */
  imageFor?: (record: Record) => string | undefined;
  size?: "tight" | "normal" | "large";
  /** Filter controls. They belong in the grid's own band — as a band of their
   *  own they stack two lots of section padding into one empty gap. */
  filters?: ReactNode;
}) {
  if (!records.length) {
    return (
      <Band tone={tone} practice={practice} size={size}>
        {filters && <div className="mb-10">{filters}</div>}
        <p className="text-lg text-muted">{empty}</p>
      </Band>
    );
  }

  return (
    <Band tone={tone} practice={practice} size={size}>
      {filters && <div className="mb-10 sm:mb-12">{filters}</div>}
      <div
        className={`grid gap-x-10 gap-y-16 ${columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}
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
            size="compact"
          />
        ))}
      </div>
    </Band>
  );
}

/**
 * The site's repeating editorial unit — image, then a quiet meta line, then
 * the title. Meta sits above the title by default: it is the label a scanning
 * reader uses to decide whether the headline is theirs to read.
 */
export function EditorialCard({
  href,
  image,
  category,
  title,
  date,
  excerpt,
  cta,
  size = "normal",
  meta = "above",
}: {
  href: string;
  image?: string;
  category?: string;
  title: string;
  date?: string;
  excerpt?: string;
  /** Reading cue under the copy. The first word carries the brand underline. */
  cta?: string;
  size?: "normal" | "large" | "compact";
  meta?: "above" | "below";
}) {
  const formatted =
    date &&
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });

  const metaLine = (category || formatted) && (
    <p className="text-stat-label uppercase text-muted">
      {[category, formatted].filter(Boolean).join(" · ")}
    </p>
  );

  return (
    <Link href={href} className="group flex flex-col">
      {image && (
        <div
          className={`relative w-full overflow-hidden bg-tint-neutral ${
            size === "large" ? "aspect-[16/10]" : "aspect-[4/3]"
          } ${meta === "above" ? "mb-5" : "mb-6"}`}
        >
          <Image
            src={image}
            alt=""
            fill
            sizes={
              size === "large"
                ? "(min-width: 1024px) 60vw, 100vw"
                : size === "compact"
                  ? "(min-width: 1024px) 25vw, 100vw"
                  : "(min-width: 640px) 33vw, 100vw"
            }
            className="graded object-cover transition-transform duration-[240ms] ease-brand group-hover:scale-[1.03]"
          />
        </div>
      )}

      {meta === "above" && metaLine}

      <h3
        className={`text-ink transition-colors duration-150 ease-brand group-hover:text-link ${
          meta === "above" ? "mt-2.5" : ""
        } ${size === "large" ? "text-h2" : size === "compact" ? "text-h4" : "text-h3"}`}
      >
        {title}
      </h3>

      {excerpt && <p className="mt-4 text-base text-body">{excerpt}</p>}

      {meta === "below" && (category || formatted) && (
        <div className="mt-4">{metaLine}</div>
      )}

      {cta && (
        <span className="mt-6 inline-flex items-center gap-1.5 text-base text-body transition-colors duration-150 ease-brand group-hover:text-link">
          <span className="border-b-2 border-brand-blue pb-0.5">
            {cta.split(" ")[0]}
          </span>
          {cta.split(" ").slice(1).join(" ")}
        </span>
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
  size = "normal",
}: {
  blocks: Block[];
  tone?: "white" | "tint";
  practice?: Practice;
  size?: "tight" | "normal" | "large";
}) {
  return (
    <Band tone={tone} practice={practice} size={size}>
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
   14. CredentialBand — the federal proof block. White like every other band;
   what makes it findable is the mono type, the rules and the isolation, not
   a change of ground.
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
    <section className="relative isolate bg-bg py-24 sm:py-32">
      <Glow practice="government" />
      <div className="shell relative grid gap-16 lg:grid-cols-[1fr_1fr] lg:gap-24">
        <div>
          <Eyebrow practice="government">{eyebrow}</Eyebrow>
          <h2 className="measure mt-5 text-h1 text-ink">{title}</h2>
          {lead && <p className="measure mt-5 text-lg text-body">{lead}</p>}

          <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3">
            {identifiers.map((id) => (
              <div key={id.label}>
                <dt className="text-stat-label uppercase text-muted">
                  {id.label}
                </dt>
                <dd className="mt-2 font-mono text-code text-ink">{id.value}</dd>
              </div>
            ))}
          </dl>

          {action && (
            <div className="mt-12">
              <Button href={action.href}>{action.label}</Button>
            </div>
          )}
        </div>

        <div className="space-y-12">
          {vehicles && vehicles.length > 0 && (
            <div>
              <p className="mb-5 text-stat-label uppercase text-muted">
                Contract vehicles
              </p>
              <ul className="divide-y divide-line border-y border-line">
                {vehicles.map((vehicle) => (
                  <li key={vehicle.href}>
                    <Link
                      href={vehicle.href}
                      className="group flex items-center justify-between gap-6 py-4 text-base text-body transition-colors duration-150 ease-brand hover:text-link"
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
              <p className="mb-5 text-stat-label uppercase text-muted">
                Certifications and set-asides
              </p>
              <ul className="flex flex-wrap gap-2.5">
                {certifications.map((cert) => (
                  <li
                    key={cert}
                    className="rounded-pill border border-line px-4 py-2 text-sm text-ink"
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
