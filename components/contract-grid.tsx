import Image from "next/image";
import type { PageBlock, Practice } from "@/lib/content";
import { ruleClass } from "@/lib/content";
import { Band, SectionHead, TextLink } from "@/components/sections";

/**
 * The prime-contract awards as a two-up grid rather than one long scroll.
 *
 * The archive stores each award as a loose run of blocks — the agency mark,
 * then the award's heading, then its write-up and a "Read More" link. Rendered
 * linearly that is a single column running most of a metre down the page, and
 * a capture manager scanning for one vehicle has to read all of them. Grouping
 * the run back into records and laying them two across halves the scroll and
 * lets the marks act as the index.
 *
 * No borders and no dividers: the gutter and the agency mark carry the
 * separation, per the design system's preference for space over decoration.
 */

type Entry = {
  logo?: { src: string; alt: string };
  title: string;
  body: PageBlock[];
  action?: { label: string; href: string };
};

/**
 * The archive's "Read More" targets are the old site's, and three of them are
 * broken there: a truncated slug, a protocol-relative path that a router would
 * read as an external host, and a media path that only resolves on the old
 * origin. Fixed here rather than in the parsed content, which is a verbatim
 * capture.
 */
const HREF_FIXES: Record<string, string> = {
  "/disa-encorei": "/disa-encoreiii",
  "//oasis": "/oasis",
};

function normalizeHref(href: string) {
  const fixed = HREF_FIXES[href] ?? href;
  return fixed.startsWith("/wp-content")
    ? `https://www.compqsoft.com${fixed}`
    : fixed;
}

/**
 * Regroups the flat block run into one record per award.
 *
 * An H1-H3 opens a record and any image immediately before it is that award's
 * mark — a few awards carry no mark at all, which is why the heading, not the
 * image, is what starts a record. Everything up to the next heading is the
 * body. The trailing "SUB CONTRACTS" heading closes the set; the page renders
 * that list itself.
 */
function groupContracts(blocks: PageBlock[]): Entry[] {
  const entries: Entry[] = [];
  let pendingImage: { src: string; alt: string } | undefined;
  let current: Entry | undefined;

  for (const block of blocks) {
    if (block.type === "image") {
      pendingImage = { src: block.src, alt: block.alt };
      continue;
    }

    if (block.type === "heading" && block.level <= 3) {
      // The page's own Hero already carries the H1, and SUB CONTRACTS is not
      // an award — it ends the set.
      if (block.level === 1) continue;
      if (/^sub\s*contracts/i.test(block.text.trim())) break;

      current = { logo: pendingImage, title: block.text, body: [] };
      pendingImage = undefined;
      entries.push(current);
      continue;
    }

    if (!current) continue;

    if (block.type === "button" || block.type === "link") {
      current.action = { label: block.label, href: normalizeHref(block.href) };
      continue;
    }

    current.body.push(block);
  }

  return entries;
}

export function ContractGrid({
  blocks,
  eyebrow,
  title,
  lead,
  practice = "neutral",
  tone = "white",
}: {
  blocks: PageBlock[];
  eyebrow?: string;
  title?: string;
  lead?: string;
  practice?: Practice;
  tone?: "white" | "tint";
}) {
  const entries = groupContracts(blocks);
  if (entries.length === 0) return null;

  return (
    <Band tone={tone} practice={practice}>
      <SectionHead
        eyebrow={eyebrow}
        title={title}
        lead={lead}
        practice={practice}
      />

      <div className="grid gap-x-14 gap-y-16 md:grid-cols-2 lg:gap-x-24 lg:gap-y-20">
        {entries.map((entry) => (
          <article key={entry.title} className="flex flex-col">
            {/* Fixed box whether or not there is a mark, so the headings sit
                on one line across the row. `mix-blend-multiply` drops the
                white plate the JPG seals carry onto the page ground. */}
            <div className="relative mb-8 h-24 w-full max-w-[280px]">
              {entry.logo && (
                <Image
                  src={entry.logo.src}
                  alt=""
                  fill
                  sizes="280px"
                  className="object-contain object-left mix-blend-multiply"
                />
              )}
            </div>

            <h3 className="text-h3 text-ink">{entry.title}</h3>

            <div className="mt-4 space-y-3">
              {entry.body.map((block, i) => {
                if (block.type === "para") {
                  return (
                    <p key={i} className="text-sm text-body">
                      {block.text}
                    </p>
                  );
                }

                // H5/H6 inside a write-up — one award (AESIP) runs subheads.
                // Kept as a small tracked label so the card holds to the
                // three-level hierarchy.
                if (block.type === "heading") {
                  return (
                    <p
                      key={i}
                      className="pt-3 text-eyebrow uppercase text-muted"
                    >
                      {block.text}
                    </p>
                  );
                }

                return null;
              })}
            </div>

            {entry.action && (
              <div className="mt-6">
                <TextLink href={entry.action.href}>
                  {entry.action.label}
                </TextLink>
              </div>
            )}
          </article>
        ))}
      </div>
    </Band>
  );
}

/**
 * The sub-contract vehicles, verbatim from content.md:1175.
 *
 * They are names without links on the old site, so they carry as a plain
 * marked list — three across, no rules, the same clean treatment as the grid
 * above it.
 */
export function SubContracts({
  items,
  practice = "neutral",
  tone = "tint",
}: {
  items: string[];
  practice?: Practice;
  tone?: "white" | "tint";
}) {
  return (
    <Band tone={tone} practice={practice}>
      <SectionHead
        eyebrow="Also available through"
        title="Sub contracts"
        practice={practice}
      />
      <ul className="grid gap-x-12 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-base text-body">
            <span
              className={`mt-[0.7em] h-[3px] w-3 shrink-0 ${ruleClass(practice)}`}
              aria-hidden
            />
            {item}
          </li>
        ))}
      </ul>
    </Band>
  );
}
