/**
 * Parses content.md (the 1.2 MB verbatim archive of the old site) into typed
 * JSON under content/. Re-run with `node scripts/parse-content.mjs` whenever
 * content.md changes — never hand-edit the generated files.
 *
 * content.md is the single source of truth for copy. See CLAUDE.md.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const raw = readFileSync(join(root, "content.md"), "utf8");
const lines = raw.split("\n");

const outDir = join(root, "content");
mkdirSync(outDir, { recursive: true });

/** Strip the live domain so every href becomes a local route. */
const localPath = (url) =>
  (url || "")
    .replace(/^https?:\/\/(www\.)?compqsoft\.com/, "")
    .replace(/\/$/, "") || "/";

/* -------------------------------------------------------------------------
   Body parsing: content.md bodies use a small, consistent markdown subset.
   `###### x` is a subheading, `  * x` a bullet (one nesting level), and
   everything else is a paragraph. Parsing to blocks here means no markdown
   runtime in the app and fully typed rendering.
------------------------------------------------------------------------- */
function parseBody(bodyLines) {
  const blocks = [];
  let list = null;

  const flushList = () => {
    if (list) {
      blocks.push(list);
      list = null;
    }
  };

  for (const line of bodyLines) {
    const text = line.trimEnd();
    if (!text.trim()) {
      flushList();
      continue;
    }
    if (text.startsWith("*(no body copy")) continue;

    const heading = text.match(/^######\s+(.*)$/);
    if (heading) {
      flushList();
      // Headings are sometimes wrapped in bold in the source; strip it.
      blocks.push({
        type: "heading",
        text: heading[1].replace(/^\*\*(.*)\*\*$/, "$1").trim(),
      });
      continue;
    }

    // `  * item` top level, `    * item` nested one deeper.
    const bullet = text.match(/^(\s*)\*\s+(.*)$/);
    if (bullet) {
      const depth = bullet[1].length >= 4 ? 1 : 0;
      const item = bullet[2].trim().replace(/\s*:\s*$/, "");
      if (!list) list = { type: "list", items: [] };
      if (depth === 1 && list.items.length) {
        const parent = list.items[list.items.length - 1];
        (parent.children ||= []).push(item);
      } else {
        list.items.push({ text: item });
      }
      continue;
    }

    flushList();
    blocks.push({ type: "para", text: text.trim() });
  }
  flushList();
  return blocks;
}

/* -------------------------------------------------------------------------
   Collection records: `#### Title`, `- **Key:** value` metadata, then body.
------------------------------------------------------------------------- */
function sectionLines(headingText) {
  const start = lines.findIndex((l) => l.trim() === headingText);
  if (start === -1) throw new Error(`Section not found: ${headingText}`);
  let end = lines.length;
  for (let i = start + 1; i < lines.length; i++) {
    if (/^#{1,3} /.test(lines[i])) {
      end = i;
      break;
    }
  }
  return lines.slice(start + 1, end);
}

function parseCollection(headingText) {
  const body = sectionLines(headingText);
  const records = [];
  let current = null;

  for (const line of body) {
    const title = line.match(/^####\s+(.*)$/);
    if (title) {
      if (current) records.push(current);
      current = { title: title[1].trim(), _body: [] };
      continue;
    }
    if (!current) continue;

    // Blank lines sit between the title, the metadata block and the body.
    // Dropping them while the body is still empty keeps the metadata guard
    // below honest — otherwise the first blank line ends metadata parsing.
    if (!line.trim() && current._body.length === 0) continue;

    const meta = line.match(/^-\s+\*\*(.+?):\*\*\s*(.*)$/);
    if (meta && current._body.length === 0) {
      const [, key, value] = meta;
      if (key === "URL") {
        current.url = localPath(value.trim());
      } else if (key === "Slug") {
        const slug = value.match(/`([^`]+)`/);
        if (slug) current.slug = slug[1];
        const published = value.match(/\*\*Published:\*\*\s*([\d-]+)/);
        if (published) current.published = published[1];
        const modified = value.match(/\*\*Modified:\*\*\s*([\d-]+)/);
        if (modified) current.modified = modified[1];
      } else if (key === "Category") {
        current.category = value.trim();
      } else if (key === "Featured image") {
        const src = value.match(/^(\S+)/);
        const alt = value.match(/\(alt:\s*"([^"]*)"\)/);
        if (src) current.image = { src: src[1], alt: alt ? alt[1] : "" };
      }
      continue;
    }
    current._body.push(line);
  }
  if (current) records.push(current);

  return records.map(({ _body, ...rest }) => ({
    ...rest,
    blocks: parseBody(_body),
  }));
}

/* -------------------------------------------------------------------------
   Section 4: rendered page content, as `[H1] text` / `[P] text` /
   `[BTN] "label" -> url` lines inside fenced blocks, keyed by page URL.
   Used as the reference copy when hand-building the 29 static pages.
------------------------------------------------------------------------- */
function parseRenderedPages() {
  const start = lines.findIndex((l) =>
    l.startsWith("## 4. Page-by-Page Content"),
  );
  const end = lines.findIndex((l) => l.startsWith("## 5. Content Collections"));
  const body = lines.slice(start, end);

  const pages = {};
  let url = null;
  let meta = {};
  let inFence = false;
  let buffer = [];

  const flush = () => {
    if (url && buffer.length) {
      pages[url] = { ...meta, blocks: parseRenderedBlocks(buffer) };
    }
    buffer = [];
  };

  for (const line of body) {
    const heading = line.match(/^###\s+(https?:\/\/\S+)/);
    if (heading) {
      flush();
      url = localPath(heading[1]);
      meta = {};
      continue;
    }
    const title = line.match(/^-\s+\*\*Page title \(SEO\):\*\*\s*(.*)$/);
    if (title) {
      meta.title = title[1].trim();
      continue;
    }
    const desc = line.match(/^-\s+\*\*Meta description:\*\*\s*(.*)$/);
    if (desc) {
      meta.description = desc[1].trim();
      continue;
    }
    if (line.trim() === "```") {
      inFence = !inFence;
      continue;
    }
    if (inFence) buffer.push(line);
  }
  flush();
  return pages;
}

function parseRenderedBlocks(bufferLines) {
  const blocks = [];
  let list = null;

  for (const line of bufferLines) {
    const text = line.trim();
    if (!text) continue;

    const listItem = text.match(/^-\s+(.*?)\s+->\s+(\S+)$/);
    if (list && listItem) {
      list.items.push({ label: listItem[1], href: localPath(listItem[2]) });
      continue;
    }
    if (list) {
      blocks.push(list);
      list = null;
    }

    const tag = text.match(/^\[([A-Z0-9]+)\]\s*(.*)$/);
    if (!tag) continue;
    const [, kind, rest] = tag;

    if (kind === "LIST") {
      list = { type: "list", items: [] };
    } else if (kind === "BTN" || kind === "LINK") {
      const m = rest.match(/^"(.*)"\s*->\s*(\S+)$/);
      if (m)
        blocks.push({
          type: kind === "BTN" ? "button" : "link",
          label: m[1],
          href: localPath(m[2]),
        });
    } else if (kind === "IMG") {
      const src = rest.match(/src=(\S+)/);
      const alt = rest.match(/alt="([^"]*)"/);
      blocks.push({
        type: "image",
        src: src ? src[1] : "",
        // Alt text in the archive sometimes contains markup from the theme.
        alt: alt ? alt[1].replace(/<\/?span>/g, "").trim() : "",
      });
    } else if (/^H[1-6]$/.test(kind)) {
      blocks.push({ type: "heading", level: Number(kind[1]), text: rest });
    } else if (kind === "P") {
      blocks.push({ type: "para", text: rest });
    }
  }
  if (list) blocks.push(list);
  return blocks;
}

/* ------------------------------------------------------------------------- */
function parseTable(startMarker, columns) {
  const start = lines.findIndex((l) => l.startsWith(startMarker));
  const rows = [];
  for (let i = start; i < lines.length; i++) {
    const line = lines[i];
    if (!line.startsWith("|")) {
      if (rows.length) break;
      continue;
    }
    const cells = line
      .split("|")
      .slice(1, -1)
      .map((c) => c.trim());
    if (cells.length !== columns.length) continue;
    if (/^-+$/.test(cells[0].replace(/\s/g, ""))) continue;
    if (cells[0] === columns[0]) continue;
    rows.push(cells);
  }
  return rows;
}

/* ------------------------------------------------------------------------- */
const write = (name, data) => {
  writeFileSync(
    join(outDir, `${name}.json`),
    JSON.stringify(data, null, 2) + "\n",
  );
  const count = Array.isArray(data) ? data.length : Object.keys(data).length;
  console.log(`  ${String(count).padStart(4)}  content/${name}.json`);
};

console.log("Parsing content.md …\n");

write("services", parseCollection("### Services (14 records)"));
write("capabilities", parseCollection("### Service Capabilities (85 records)"));
write("case-studies", parseCollection("### Case Studies (25 records)"));
write("blogs", parseCollection("### Blog Posts (36 records)"));
write("faqs", parseCollection("### FAQs (30 records)"));
write("leadership", parseCollection("### Leadership Team (5 records)"));
write("partners", parseCollection("### Alliance Partners (14 records)"));
write("webinars", parseCollection("### Webinars (1 records)"));

write(
  "taxonomy",
  parseTable("## 6. Taxonomy", ["ID", "Category", "Slug", "Count"]).map(
    ([id, name, slug, count]) => ({
      id: Number(id),
      name,
      slug: slug.replace(/`/g, ""),
      count: Number(count),
    }),
  ),
);

write(
  "seo",
  Object.fromEntries(
    parseTable("## 8. SEO Metadata", ["URL", "Title tag", "Meta description"])
      .filter(([url]) => url.startsWith("http"))
      .map(([url, title, description]) => [
        localPath(url),
        { title, description },
      ]),
  ),
);

write("pages", parseRenderedPages());

console.log("\nDone.");
