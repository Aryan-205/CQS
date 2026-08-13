@AGENTS.md

# CompQsoft rebuild — project brief and design system

## What this project is

A rebuild of compqsoft.com. CompQsoft is a ~28-year-old, minority-owned US IT services and consulting firm running two businesses off one brand:

- **Federal government services** — prime contractor on DoD/DHS/HHS work: unified communications, network engineering, cybersecurity, logistics software sustainment.
- **Commercial digital transformation** — mostly Microsoft stack (Dynamics 365, Azure, Power Platform, Copilot/GenAI), plus Salesforce, ServiceNow, SAP.

`content.md` in the repo root is the single source of truth for copy. It is a 1.2 MB verbatim archive of the live site: 328 URLs, full nav tree, per-page rendered content in visual order, all CMS records, media library, and per-URL SEO metadata. **Read the relevant section of `content.md` before writing any page — never invent copy.**

| Section | Line | Holds |
| --- | --- | --- |
| 1. Research brief | 26 | What the company does, why, audience-to-page map, company facts |
| 2. Site architecture | 93 | Every URL, grouped by type |
| 3. Global chrome | 457 | Utility bar, full nav tree, search overlay, footer, cookie notice |
| 4. Page-by-page content | 613 | Rendered blocks in visual order, per page |
| 5. Content collections | 5417 | Canonical CMS body copy per record |
| 6. Taxonomy | — | Category IDs binding capabilities and FAQs to services |
| 7. Media library | — | Every image URL, alt text, dimensions |
| 8. SEO metadata | — | Title tag and meta description for all 328 URLs |

### Audiences

| Audience | Entry point | Needs to see |
| --- | --- | --- |
| Federal contracting officer / capture manager | `/government-it-services/`, `/compliance/`, `/primecontracts/` | UEI/CAGE, contract vehicles, past performance, certifications, capability statement |
| Commercial CIO / line-of-business buyer | `/technologygroup/`, `/services/*` | Service depth, capability cards, case studies, partner badges |
| Analyst / researcher | `/about-us/`, `/leadership-team/`, `/blogs/` | Story, scale numbers, leadership, thought leadership |
| Candidate | `/life-at-compqsoft/`, `/openings/` | Values, benefits, live job board |
| Existing employee | `/employee-resources/` | Holiday and pay calendars, portal links, HR contact |

### Design intent

White page. Minimal animation, limited to microinteractions. Hero is video or image. The focus is quality text content — 328 pages of dense, credibility-carrying prose that has to stay readable and scannable. Navigation to deep pages must be fast. Hierarchy comes from size, weight, and color, not decoration.

### Brand tone (from the brand deck dials)

Necessity, not luxury. Serious, not playful. Professional, not casual. Modern-leaning. Slightly synthetic rather than natural. Moderately complex rather than reductive.

What that means in practice: no ornament, no serif, no illustration, no playful motion. Gradients and controlled glow are on-brand because the brand reads synthetic. Photography is real mission imagery, graded — never stock-warm lifestyle shots. "Moderately complex" is permission to keep dense technical information on the page; do not flatten pages into marketing fluff.

---

## Design system

### Brand primaries — verbatim from the brand guidelines

```
--brand-black  #000000   RGB 0 0 0
--brand-red    #EE4743   RGB 238 71 67
--brand-blue   #01A7E5   RGB 1 167 229
--brand-white  #FFFFFF
```

The logo is the blue wordmark `COMP_SOFT` with the `Q` in red. It works unmodified on both white and black. Never recolor it, never place it on a mid-tone or a busy photo — when it sits on imagery, put it in a white or black rounded container, as the deck does.

### The two rules that govern color

**1. White is the page. Black is never a page background.** Black survives only inside contained elements — the hero band, the credential band, primary button fills, and the footer. Nothing else. Below the hero, scrolling any page, the reader is on white or a faint brand tint the entire way down.

**2. Brand colors are fills, not text.** At full saturation they fail contrast as text on white but pass strongly as backgrounds with **black text** on them:

| | as text on `#FFFFFF` | as a fill, with `#0A0A0A` text on it |
| --- | --- | --- |
| `--brand-blue` `#01A7E5` | 2.7:1 — **fails** | 7.7:1 — pass |
| `--brand-red` `#EE4743` | 3.7:1 — **fails** | 5.6:1 — pass |

This is the unlock. The primaries appear at full saturation, frequently and at scale, as chip fills, rules, markers, icon shapes, and tinted bands — always carrying black text, never white. Where brand color genuinely has to *be* text, use the darkened siblings below.

### Tokens

```
/* Grounds — white and faint brand tints, practice-coded */
--color-bg            #FFFFFF   page background, the default everywhere
--color-tint-blue     #F2FAFE   alternating band on Commercial / service pages
--color-tint-red      #FEF5F5   alternating band on Government / vehicle pages
--color-tint-neutral  #F7F8F9   alternating band on neutral pages

/* Text on white or tint */
--color-ink       #0A0A0A   headings, strong text            19.6:1
--color-body      #3A3F45   paragraph text                   10.6:1
--color-muted     #63696F   meta, captions, labels            5.6:1
--color-line      #E3E6E9   hairline borders, dividers

/* Brand as text — darkened siblings, minimum change to pass AA */
--color-link        #017AAD   links, CTAs, eyebrows           4.7:1
--color-link-hover  #015E86
--color-red-text    #D93A36   Government eyebrows, emphasis   4.6:1

/* Brand at full saturation — fills, rules, markers, icons. Black text on top. */
--brand-blue   #01A7E5
--brand-red    #EE4743

/* Black — contained elements only, never a page ground */
--color-black      #000000   hero media card, primary buttons, footer
--color-on-black   #FFFFFF                                    21:1
--color-on-black-mute #A6ACB2                                  9.2:1
```

### Where the primaries actually appear on white

Use them generously — this is what makes the page read as CompQsoft rather than as a generic white template.

| Element | Treatment |
| --- | --- |
| Section eyebrow | `--color-link` uppercase, tracked, with a 24×3px `--brand-blue` rule above it |
| Numbered markers (values, process steps) | Full `--brand-blue` or `--brand-red` circle, `--color-ink` numeral, ≥24px |
| Card accent | 4px left rule in the practice color, full saturation |
| Chips, tags, category pills | Brand fill, `--color-ink` text, `--radius-pill` |
| Links in prose | `--color-link` text with a 2px `--brand-blue` underline |
| Icons | `--brand-blue` glyph on white, or white glyph in a brand-filled circle |
| Stat counters | `--color-ink` numeral, `--brand-red` or `--brand-blue` rule beneath |
| Focus ring | 2px `--brand-blue`, 2px offset |
| Active nav item | `--color-link` text, 2px `--brand-blue` underline |
| Alternating bands | `--color-tint-blue` / `--color-tint-red`, never gray |

Never: `--brand-blue` or `--brand-red` as body text, heading text, or any text below 24px on a white or tint ground.

### Gradients

The deck's black-to-red and black-to-blue gradients are strong and they stay — but **contained**, never as a page background.

```
--grad-hero   radial-gradient(90% 90% at 0% 0%,   #EE4743 0%, transparent 62%),
              radial-gradient(90% 90% at 0% 100%, #01A7E5 0%, transparent 62%),
              #000000

--grad-red    linear-gradient(180deg, #000000 0%, #EE4743 100%)
--grad-blue   linear-gradient(180deg, #000000 0%, #01A7E5 100%)
```

`--grad-hero` lives inside the hero media card and any full-bleed image overlay — a black rounded rectangle sitting on a white page, red bloom top-left, blue bloom bottom-left, exactly the deck's title slide, just framed rather than full-bleed. `--grad-red` and `--grad-blue` are for media overlays and the footer's top edge.

On white grounds, no hard gradients. The only gradient permitted on a light ground is a wash from `#FFFFFF` to a tint at ≤10% — used sparingly, to soften a band transition.

**Practice color coding**: red signals Government and defense contexts, blue signals Commercial and technology contexts. This mirrors the logo and gives the dual-audience IA a signal the visitor reads before the words. It drives the tint band, card rules, markers, and eyebrow rules. It does **not** drive link color — `--color-link` is the same site-wide, no exceptions. Neutral pages (About, Careers, Insights) use `--color-tint-neutral` and blue accents.

### Typography

Brand font is **Codec Pro** (Zetafonts), letter-spacing 0%, weights Regular and Medium. It is a commercial licence — a webfont licence must be purchased before it can ship. **Fallback if unlicensed: Outfit** (Google Fonts) — geometric sans, single-storey `a`, closest free match to Codec Pro's skeleton. Do not substitute Inter or Poppins; both read visibly different at display size.

```
font-family: "Codec Pro", "Outfit", system-ui, sans-serif;
```

```
hero      80 / 1.00  400  on-black        full-bleed homepage H1 only, -0.03em
display   64 / 1.02  400  ink / on-deep   interior hero H1, letter-spacing -0.02em
h1        46 / 1.08  500  ink
h2        34 / 1.15  500  ink             uppercase on dark bands, per deck
h3        24 / 1.30  500  ink
h4        19 / 1.40  500  ink
body-lg   19 / 1.70  400  body            intros, lead paragraphs
body      17 / 1.75  400  body            default
small     15 / 1.60  400  muted
eyebrow   12 / 1.20  500  link            uppercase, +0.12em
code      14 / 1.50  400  ink             MONO, e.g. UEI KTU8QJE27RN8
stat-num  64 / 1.00  400  ink / on-deep   tabular-nums
stat-lbl  13 / 1.40  500  muted           uppercase, +0.10em
```

Note the weight ladder is **400 / 500 only** — the brand specifies Regular and Medium. Hierarchy comes from size and color, not from bold. Display sizes lean on 400 at large scale, matching the deck's thin, wide headline look. Never use 600 or 700.

Mono is retained for one job only: federal identifiers and codes (UEI, CAGE, DUNS, contract vehicle numbers). It is not a brand font, so it never appears in headings, eyebrows, or stat labels — those use the brand sans, uppercase and tracked out. **JetBrains Mono** for that narrow role.

Mobile: display → 40, h1 → 32, h2 → 26. Body holds at 17.

**Exactly three hierarchy levels per band**: eyebrow (uppercase, tracked, accent) → heading (ink, large, 500) → body (body color, 400). Nothing else. A fourth level is how a minimal design turns to mush.

Body copy caps at **70ch** measure. This matters more than any other rule here, because text quality is the point of the site.

### Shape

The deck is emphatically pill-shaped — buttons and the numbered value chips are fully rounded.

```
--radius-pill    9999px   buttons, chips, pills, tags, the numbered value markers
--radius-card    12px     cards, media containers, logo lockup containers
--radius-none    0        full-bleed bands
```

Primary button on white: black fill, white text, pill. Primary button on black: white fill, black text, pill — exactly as the deck's "The IT Edge for Lean Government" button. Secondary: 1px `--color-line` outline, transparent fill, pill.

### Space and structure

- 4px base unit. Section padding 96px desktop, 64px mobile; hero and closing CTA bands get 128px.
- Content shell max-width 1280px, 12-column grid, 24px gutters (16px mobile).
- **Borders, not shadows,** for structure — a 1px `--color-line` hairline. One shadow token exists, for layers that genuinely float (mega-menu panel, mobile drawer): `0 8px 24px -8px rgba(0,0,0,0.16)`.
- Band rhythm: `bg` → tint → `bg` → tint, alternating all the way down. The tint is the practice color for that page. Never two tint bands adjacent, never a gray band.

### Motion

Microinteractions only. Motion confirms an action; it never introduces content.

```
--ease      cubic-bezier(0.2, 0, 0, 1)
--dur-fast  120ms   hover, focus, button press
--dur-base  180ms   dropdown, accordion, mega-menu panel
--dur-slow  240ms   sticky header state change
```

Permitted: link underline grow, button fill shift, card border darken plus 2px lift, mega-menu fade with 4px translate, sticky header shadow on scroll, accordion height, stat counter counting up once when scrolled into view.

Not permitted: parallax, scroll-jacking, entrance animations on section reveal, auto-rotating carousels, spinning or looping decorative motion, **animated gradients** — the blooms are static.

`prefers-reduced-motion: reduce` collapses all durations to 0.01ms, pauses the hero video, and renders stat counters at their final value immediately.

The counter writes its figure straight to the DOM through a ref rather than through React state: the server-rendered markup already carries the final value, so there is nothing to reconcile, no hydration mismatch, and the number is present for a crawler or a screen reader from the first paint.

### Hero

**Full-bleed black band carrying `--grad-hero`.** This is the one surface where black runs edge to edge above the fold; everything below it is white. The reference set is GDIT, RTX and Lockheed Martin — a dark banner, real mission photography, headline bottom-left over a scrim.

Layer order, bottom to top: `--grad-hero` → photography or video, graded cool, 40–55% opacity → `.grad-bloom` (the deck's red and blue blooms re-laid so the brand survives the footage) → `.scrim` (holds the headline at 21:1 whatever frame the video is on) → `.hairline-grid`. A 4px practice-coloured rule closes the bottom edge.

**Homepage** (`components/home/hero.tsx`): `min-h-svh`, `<video muted loop playsinline autoplay>` over a poster still. The poster is what mobile, slow connections and reduced-motion users see, so it must work as a finished still — it renders as a real `<Image>` under the video, not only in the `poster` attribute. Reduced motion pauses the video. The dual-practice split is pinned to the foot of the band: Government with a red marker, Commercial with a blue one — the first choice a visitor makes, before they read a word.

The header rides transparently over this band and turns solid past 80px of scroll, or the moment a mega panel opens. Routes that opt in are listed in `OVERLAY_ROUTES` in `components/site-header.tsx`; every other route gets the ordinary sticky white bar.

**Interior pages** (`Hero` in `components/sections.tsx`): the same band at roughly half height, banner photography instead of video, no split. Banners resolve through `lib/media.ts` — `bannerFor(path)` for hand-built pages, `serviceBanner(slug)` for services. Records use the wide 1500×468 / 2250×702 crops, never the 773×915 portraits: a portrait cropped to a banner loses its subject. Pages with no banner fall through to the gradient alone, which is a finished treatment, not a placeholder. `compact` halves it again for record pages, where the body copy is the point.

### CTA band

Tint ground, not black. Headline in `--color-ink`, black pill primary button, brand-colored rule or marker for the practice signal. One per page, immediately above the footer.

### Imagery

Real mission photography — DoD operations centers, naval vessels, network operations floors. Graded cool and slightly desaturated so it sits with the palette; never warm, never stock-lifestyle. The `.graded` utility (`saturate(0.72) contrast(1.06) brightness(0.94)`) applies it; every photograph on the site carries it. When the logo appears over an image it goes in a `--radius-card` white or black container with generous padding, per the deck.

Every URL comes from `lib/media.ts`, transcribed from content.md Section 7 — no component holds a raw CDN URL. The host is allow-listed in `next.config.ts` so `next/image` can optimise it; when the assets migrate into `/public`, only the `CDN` constant changes.

**Partner marks are white-on-transparent PNGs**, cut for a dark band, so they are invisible on the white page. `PartnerGrid` inverts them to true black. That works only because every mark in the set is monochrome — check any new logo before adding it, and if it is full-colour, drop the invert for that grid rather than recolouring the mark.

### Navbar

```
┌───────────────────────────────────────────────┐
│           GOVERNMENT · COMMERCIAL · Employees │ 32px, surface bg
├───────────────────────────────────────────────┤
│ LOGO   Services Practices Insights Careers    │ 68px, white, hairline base
│        About              [search] [Contact]  │
└───────────────────────────────────────────────┘
   ↓ hover Services
┌───────────────────────────────────────────────┐
│ MICROSOFT      OTHER PLATFORMS   FEATURED     │
│ Dynamics ERP   Cyber Security    ▸ Case study │
│ Dynamics CE    Salesforce          card       │
│ Data & AI      ServiceNow                     │
│ Power Platform SAP                            │
└───────────────────────────────────────────────┘
```

White bar, hairline base, black text, `--color-link` on hover and active. Utility-bar GOVERNMENT gets a red left marker, COMMERCIAL a blue one — the practice coding, applied at its smallest scale. Contact CTA is a black pill.

Full-width mega panel, columns grouped by vendor, one featured card per panel. Sticky, condensing to 56px past 80px of scroll. Opens on hover with a ~100ms intent delay on desktop, on click or Enter for keyboard, closes on Escape. Mobile becomes a full-screen drawer with expanding sections. The nav tree to implement is recorded verbatim at `content.md:465-505`.

---

## Route map

The 328 URLs are **not 328 hand-built pages**. They are 12 route templates plus data. Build the templates; the content collections fill them.

The old site has 328 URLs because WordPress auto-published a page for every CMS record. The rebuild ships **209 URLs from 36 route files** — 29 hand-built pages plus 7 `[slug]` templates. The rest are 301'd to a parent that actually serves the visitor.

| Route | Type | Count | Source |
| --- | --- | --- | --- |
| `/` | Static page | 1 | `content.md:617` |
| Top-level marketing (`/about-us/`, `/compliance/`, `/primecontracts/`, vehicle pages, legal…) | Static pages, hand-built | 29 | `content.md:97`, bodies in Section 4 |
| `/services/[slug]` | Dynamic | 14 | Section 5, Services |
| `/capabilities/[slug]` | Dynamic | 85 | Section 5, Service Capabilities |
| `/case-study/[slug]` | Dynamic | 25 | Section 5, Case Studies |
| `/blog/[slug]` | Dynamic | 36 | Section 5, Blog Posts |
| `/leadership-team/[slug]` | Dynamic | 5 | Section 5, Leadership |
| `/alliance-partner/[slug]` | Dynamic | 14 | Section 5, Alliance Partners |
| `/webinar/[slug]` | Dynamic | 1 | Section 5, Webinars |

The `/blogs` listing takes a `?category=` query param and absorbs the taxonomy in Section 6; it is one of the 29 hand-built pages, not a separate template.

**29 hand-built pages + 7 `[slug]` templates = 36 route files.** The real work is not the routes — it is the repeatable section components every page is assembled from, in `components/sections.tsx`: `Hero`, `Intro`, `CardGrid`, `ProcessSteps`, `Counters`, `LogoStrip`, `PartnerGrid`, `CertStrip`, `FaqAccordion`, `CtaBand`, `ListingGrid`, `EditorialCard`, `Prose`, `SpecTable`, `FeatureSplit`, `CredentialBand`, plus `ContactForm`.

`Band` wraps all of them and owns the white/tint alternation. `SectionHead` owns the eyebrow → heading → lead trio, so the three-level rule cannot drift band to band. `EditorialCard` is the repeating image-led unit behind every listing and the homepage work and latest sections. `CredentialBand` is the federal proof block — black, because a contracting officer scanning for UEI and CAGE should not have to hunt.

Homepage-only pieces live in `components/home/`: the video hero and the Government/Commercial service tabs.

### Redirects — decided, do not rebuild these as pages

| Old URLs | Why dropped | 301 target |
| --- | --- | --- |
| 30 × `/faq/*` | Each is one question and one ~50-word paragraph. The same text already renders as an accordion on the parent service page with `FAQPage` schema, so these are thin duplicates. The schema fires from the service page and wins the rich result there. | `/services/<parent>#faq` |
| 69 × `/opening/*` | All published 2024-05-07 and frozen. Live jobs come from the Paylocity embed at `/openings/`. These outrank the real board and dead-end candidates on filled roles. | `/openings/` |
| 16 × `/category/*` | WordPress archive pages, titled "… Archives". Duplicates a filtered `/blogs` listing. `uncategorized` (6 posts) and `ghgemissions` (5) are mis-tagged junk. | `/blogs?category=<slug>` |

Keep `category/blogs`, `category/blogs/government`, `category/blogs/commercial` as real listing pages — they map to the dual-practice IA.

This was decided without Google Search Console data, on the reasoning that it is cheap to reverse and expensive to defer: the copy stays in `content.md`, so promoting a FAQ or category back to a standalone page later is an afternoon's work, while carrying 118 dead pages through every design and QA pass is permanent cost. **After launch, pull Search Console.** If any redirected URL shows real impressions, promote it back with data rather than a guess.

### Content notes

- The live site's `service-capabalities` slug is misspelled. The rebuild uses `/capabilities/`, with a redirect from the old path.
- Copy says **Department of Defense**, not "Department of War". `content.md` uses "Department of War" throughout — change it on every page.
- The brand font is Codec Pro but the licence is not yet purchased. Build on the `Outfit` fallback; the swap is a one-line change in the font stack when the licence lands.
- Known content errors to fix, not copy forward: ISO certifications cited with superseded revisions (9001:2008, 27001:2005, 20000:2005); "For 28 years" on `/about-us/` versus "nearly two decades" on `/government-it-services/`; the Instagram footer link points at the site root, not a profile; several vehicle pages are stubs marked "Coming soon".

### Brand copy from the deck

Tagline: **The IT Edge for Lean Government**

Who we are: "CompQsoft is an IT services and consulting company specializing in digital transformation, cloud solutions, data and AI, automation, and next-generation technologies like generative AI. The company has over 25 years of experience serving startups, small and medium businesses, enterprises, and federal agencies, including the Department of Defense and state and local governments."

Values — numbered pill markers, per the deck layout:

1. **Mission-Led Partnership** — We align with our clients' missions and focus on clear, measurable outcomes.
2. **Innovation with Accountability** — We use cloud, data, AI, and automation with strong governance for secure, compliant delivery.
3. **Engineering-Driven Impact** — We apply deep engineering expertise to modernize systems and support mission-critical work.
4. **Future-Ready Mindset** — We learn fast, adapt quickly, and help clients stay ahead in a changing digital world.

Note the deck says "Department of Defense" while `content.md` says "Department of War" throughout. Pick one and apply it everywhere.

### Company facts

Corporate office 161 Fort Evans Road, Unit #225, Leesburg, VA 20176 · Houston office 11445 Compaq Center, West DR BLDG CCA6, Houston, TX 77070-1433. Phones: commercial 571-200-3923, government 571-999-6955, vendors/HR 703-775-1564, fax 281-968-2077. Founder and CEO Madina Shaik, founded 1997 in Houston. UEI `KTU8QJE27RN8` · CAGE `1TTA2` · FEIN `76-0554431` · DUNS `140460283` · primary NAICS `541512`.
