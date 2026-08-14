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
          // The archive uses H2-H6 fairly loosely; map everything to two
          // visual levels so the three-level hierarchy rule holds.
          const Tag = block.level <= 2 ? "h2" : "h3";
          const size = block.level <= 2 ? "text-h2" : "text-h3";
          return (
            <Tag key={i} className={`${size} pt-6 text-ink first:pt-0`}>
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

/** Full band wrapper for the common case. */
export function PageProse({
  blocks,
  practice = "neutral",
  tone = "white",
  eyebrow,
  showImages = false,
}: {
  blocks: PageBlock[];
  practice?: Practice;
  tone?: "white" | "tint";
  eyebrow?: string;
  showImages?: boolean;
}) {
  return (
    <Band tone={tone} practice={practice}>
      {eyebrow && (
        <div className="mb-10">
          <Eyebrow practice={practice}>{eyebrow}</Eyebrow>
        </div>
      )}
      <PageBlocks blocks={blocks} practice={practice} showImages={showImages} />
    </Band>
  );
}
