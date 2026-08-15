import Image from "next/image";
import Link from "next/link";
import type { PageBlock, Practice } from "@/lib/content";
import { Band, Button, Eyebrow } from "@/components/sections";

/**
 * Renders the verbatim copy captured from the old site (content.md Section 4)
 * through the design system. Used for the copy-heavy pages — contract
 * vehicles, legal, sustainability — where the value is the text itself and
 * inventing a bespoke layout would only risk dropping content.
 *
 * The H1 is skipped: the page's Hero already renders it.
 */
export function PageBlocks({
  blocks,
  practice = "neutral",
  skipFirstHeading = true,
  showImages = false,
}: {
  blocks: PageBlock[];
  practice?: Practice;
  skipFirstHeading?: boolean;
  /**
   * Render the archive's `[IMG]` blocks.
   *
   * Off by default because on most of these pages the pictures are decorative
   * icon bullets that the page already renders properly through a card grid,
   * and repeating them inside the prose only duplicates the section. It is
   * turned on for the contract-vehicle pages, where the image is the award's
   * own seal or vehicle mark sitting directly above its write-up — there the
   * artwork is the credential and dropping it loses information.
   */
  showImages?: boolean;
}) {
  // Resolved up front rather than tracked while mapping, so the render stays
  // a pure function of its props.
  const droppedH1 = skipFirstHeading
    ? blocks.findIndex((b) => b.type === "heading" && b.level === 1)
    : -1;

  return (
    <div className="measure space-y-6">
      {blocks.map((block, i) => {
        if (block.type === "heading") {
          if (i === droppedH1) return null;
          // The archive uses H2-H6 loosely — a section title and a full
          // sentence can both arrive as H5 — so the levels are collapsed onto
          // three sizes and, crucially, three amounts of space above them.
          // Size alone was leaving a sub-heading floating between the
          // paragraph it belongs to and the one it does not.
          const level = block.level <= 2 ? 2 : block.level <= 4 ? 3 : 4;
          const Tag = (["h2", "h3", "h4"] as const)[level - 2];
          const size = (["text-h2", "text-h3", "text-h4"] as const)[level - 2];
          const space = (["pt-14", "pt-10", "pt-7"] as const)[level - 2];
          return (
            <Tag key={i} className={`${size} ${space} text-ink first:pt-0`}>
              {block.text}
            </Tag>
          );
        }

        if (block.type === "para") {
          return (
            <p key={i} className="text-base text-body">
              {block.text}
            </p>
          );
        }

        if (block.type === "button") {
          return (
            <div key={i} className="pt-2">
              <Button href={block.href}>{block.label}</Button>
            </div>
          );
        }

        if (block.type === "link") {
          return (
            <p key={i}>
              <Link
                href={block.href}
                className="text-base text-link underline decoration-brand-blue decoration-2 underline-offset-4 transition-colors duration-150 ease-brand hover:text-link-hover"
              >
                {block.label}
              </Link>
            </p>
          );
        }

        if (block.type === "list") {
          return (
            <ul key={i} className="space-y-3">
              {block.items.map((item) => (
                <li key={item.href + item.label} className="flex gap-3">
                  <span
                    className={`mt-[0.7em] h-[3px] w-3 shrink-0 ${
                      practice === "government"
                        ? "bg-brand-red"
                        : "bg-brand-blue"
                    }`}
                    aria-hidden
                  />
                  <Link
                    href={item.href}
                    className="text-base text-link transition-colors duration-150 ease-brand hover:text-link-hover"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === "image" && showImages) {
          // A seal or vehicle mark, not a photograph: bounded height, never
          // cropped, never recoloured. `mix-blend-multiply` drops the white
          // plate the JPG marks carry onto the page ground. The archive's alt
          // text is often the whole heading repeated, so the mark is treated
          // as decorative when the heading beneath it already says the name.
          const label = block.alt?.trim();
          const heading = blocks[i + 1];
          const named =
            heading?.type === "heading" &&
            label !== undefined &&
            heading.text.trim().startsWith(label.slice(0, 24));

          return (
            <div key={i} className="relative h-24 w-full max-w-[240px] pt-4">
              <Image
                src={block.src}
                alt={named ? "" : (label ?? "")}
                fill
                sizes="240px"
                className="object-contain object-left mix-blend-multiply"
              />
            </div>
          );
        }

        // Everything else — including images when they are not wanted — is
        // dropped rather than rendered as an empty box.
        return null;
      })}
    </div>
  );
}

/**
 * Full band wrapper for the common case.
 *
 * `layout="rail"` hangs the eyebrow and section title in the left margin and
 * runs the prose in its own column, which is the right shape when the band is
 * one long passage of copy rather than a stack of sub-sections: the reader
 * gets a single measure to follow and the band stops reading as an
 * afterthought pinned to the page's left edge.
 */
export function PageProse({
  blocks,
  practice = "neutral",
  tone = "white",
  eyebrow,
  title,
  showImages = false,
  layout = "stacked",
}: {
  blocks: PageBlock[];
  practice?: Practice;
  tone?: "white" | "tint";
  eyebrow?: string;
  title?: string;
  showImages?: boolean;
  layout?: "stacked" | "rail";
}) {
  const prose = (
    <PageBlocks blocks={blocks} practice={practice} showImages={showImages} />
  );

  if (layout === "rail") {
    return (
      <Band tone={tone} practice={practice}>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            {eyebrow && <Eyebrow practice={practice}>{eyebrow}</Eyebrow>}
            {title && (
              <h2 className="mt-6 max-w-[18ch] text-h2 text-ink">{title}</h2>
            )}
          </div>
          <div className="lg:col-span-7 lg:col-start-6">{prose}</div>
        </div>
      </Band>
    );
  }

  return (
    <Band tone={tone} practice={practice}>
      {(eyebrow || title) && (
        <div className="mb-10">
          {eyebrow && <Eyebrow practice={practice}>{eyebrow}</Eyebrow>}
          {title && <h2 className="mt-6 text-h2 text-ink">{title}</h2>}
        </div>
      )}
      {prose}
    </Band>
  );
}
