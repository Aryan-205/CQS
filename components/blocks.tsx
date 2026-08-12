import type { Block } from "@/lib/content";

/**
 * Renders the block AST produced by scripts/parse-content.mjs.
 *
 * Inline markup in content.md is a single construct — `**bold**` — so it is
 * parsed here rather than pulling in a markdown runtime.
 */
function Inline({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} className="font-medium text-ink">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

export function Blocks({
  blocks,
  className = "",
}: {
  blocks: Block[];
  className?: string;
}) {
  return (
    <div className={`measure space-y-6 ${className}`}>
      {blocks.map((block, i) => {
        if (block.type === "heading") {
          return (
            <h3 key={i} className="text-h3 text-ink pt-4 first:pt-0">
              <Inline text={block.text} />
            </h3>
          );
        }
        if (block.type === "para") {
          return (
            <p key={i} className="text-base text-body">
              <Inline text={block.text} />
            </p>
          );
        }
        return (
          <ul key={i} className="space-y-3">
            {block.items.map((item, j) => (
              <li key={j} className="text-base text-body">
                <span className="flex gap-3">
                  <span
                    className="mt-[0.7em] h-[3px] w-3 shrink-0 bg-brand-blue"
                    aria-hidden
                  />
                  <span>
                    <Inline text={item.text} />
                    {item.children && (
                      <ul className="mt-2 space-y-2 pl-4">
                        {item.children.map((child, k) => (
                          <li key={k} className="text-sm text-muted">
                            <Inline text={child} />
                          </li>
                        ))}
                      </ul>
                    )}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        );
      })}
    </div>
  );
}
