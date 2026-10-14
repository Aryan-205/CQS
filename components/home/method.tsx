import { Band, Eyebrow } from "@/components/sections";

export type MethodStep = { title: string; description: string };

/**
 * The one band on the homepage that is text only.
 *
 * Everything above and below it is a horizontal grid of image-led cards, so a
 * fourth grid — which is what ProcessSteps and ApproachSteps both render, and
 * both are already spent on the practice and service pages — would read as one
 * more shelf. This reads down a column instead: a hairline ledger with the
 * stage number set large and quiet against small type.
 *
 * The numbering is information rather than decoration. Assessment precedes
 * development, which precedes implementation, which precedes sustainment; the
 * order is the content, so it is allowed to be numbered.
 */
export function MethodLedger({
  eyebrow = "Q Methodology",
  title,
  lead,
  footnote,
  steps,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  /** The appraisal line. Plain text, not pills — the pills belong to the
   *  credential slab, and running them twice dilutes both. */
  footnote?: string;
  steps: MethodStep[];
}) {
  return (
    <Band tone="tint" practice="commercial" size="large">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-20">
        {/* Sticky by CSS alone: no scroll listener, nothing pinned, nothing
            hijacked. The head simply stays with the list it introduces. */}
        <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)] lg:self-start">
          <Eyebrow practice="commercial">{eyebrow}</Eyebrow>
          <h2 className="measure-title mt-5 text-h1 text-ink">{title}</h2>
          {lead && <p className="measure-lead mt-5 text-lg text-body">{lead}</p>}
          {footnote && (
            <p className="mt-8 border-t border-line pt-6 text-sm text-muted">
              {footnote}
            </p>
          )}
        </div>

        <ol className="border-t border-line">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="group grid grid-cols-[auto_1fr] items-baseline gap-x-8 gap-y-2 border-b border-line py-8 transition-colors duration-150 ease-brand hover:border-ink/20 sm:gap-x-12 sm:py-10"
            >
              {/* Large, quiet, tabular. The figure is structure — the sentence
                  beside it is the content — so it sits well below body contrast
                  and only takes brand colour when the row is under the cursor. */}
              <span
                aria-hidden
                className="tabular text-stat text-muted/40 transition-colors duration-150 ease-brand group-hover:text-brand-blue"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <h3 className="text-h3 text-ink">{step.title}</h3>
                <p className="measure mt-3 text-base text-body">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Band>
  );
}
