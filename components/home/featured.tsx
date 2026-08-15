import Image from "next/image";
import Link from "next/link";
import { Band, SectionHead } from "@/components/sections";
import { Arrow } from "@/components/icons";

export type FeatureItem = {
  href: string;
  image: string;
  label: string;
  title: string;
};

/**
 * One story at full size, three beside it as rows. The rows are image-left,
 * text-right, so the eye runs down a single column of headlines rather than
 * across a grid — the fastest read there is for a stack of unrelated items.
 *
 * No chips, no filter buttons, no carousel: the section holds four things, and
 * four things do not need navigation.
 */
export function Featured({
  eyebrow,
  title,
  action,
  lead,
  items,
}: {
  eyebrow: string;
  title: string;
  action: { label: string; href: string };
  lead: FeatureItem;
  items: FeatureItem[];
}) {
  return (
    <Band tone="tint" practice="neutral">
      <SectionHead
        eyebrow={eyebrow}
        title={title}
        action={action}
        align="split"
      />

      <div className="grid gap-x-16 gap-y-14 lg:grid-cols-[1.15fr_1fr]">
        <Link href={lead.href} className="group flex flex-col">
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-tint-neutral">
            <Image
              src={lead.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="graded object-cover transition-transform duration-[240ms] ease-brand group-hover:scale-[1.03]"
            />
          </div>
          <p className="mt-6 text-stat-label uppercase text-muted">
            {lead.label}
          </p>
          <h3 className="mt-3 max-w-[24ch] text-h2 text-ink transition-colors duration-150 ease-brand group-hover:text-link">
            {lead.title}
          </h3>
        </Link>

        {/* The rail hangs from the top of the lead image, not the middle of the
            column: `justify-center` left the first headline floating below the
            image edge and the gap under the last one unexplained. Rows are
            hairline-separated and top-aligned, so the labels sit on one line
            down the column however many lines a title runs to. */}
        <ul className="flex flex-col divide-y divide-line border-y border-line lg:self-start">
          {items.map((item) => (
            <li key={item.href} className="py-7 first:pt-0 last:pb-0">
              <Link href={item.href} className="group flex items-start gap-6">
                <div className="relative aspect-[4/3] w-32 shrink-0 overflow-hidden bg-tint-neutral sm:w-40">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="160px"
                    className="graded object-cover transition-transform duration-[240ms] ease-brand group-hover:scale-[1.04]"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-stat-label uppercase text-muted">
                    {item.label}
                  </p>
                  <h3 className="mt-2 text-h4 text-ink transition-colors duration-150 ease-brand group-hover:text-link">
                    {item.title}
                  </h3>
                </div>
                {/* Aligned to the label's cap height, not the row's centre. */}
                <Arrow className="mt-1 hidden h-4 w-4 shrink-0 text-muted transition-transform duration-150 ease-brand group-hover:translate-x-1 sm:block" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Band>
  );
}
