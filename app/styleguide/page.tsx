import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

/* ---------------------------------------------------------------------------
   Internal verification page. Not linked, not indexed, not in the sitemap.
   Delete before launch, or leave it — noindex keeps it out of search.
   Every token in globals.css should be visible somewhere on this page.
--------------------------------------------------------------------------- */

function Band({
  children,
  tint,
  label,
}: {
  children: React.ReactNode;
  tint?: "blue" | "red" | "neutral";
  label: string;
}) {
  const bg =
    tint === "blue"
      ? "bg-tint-blue"
      : tint === "red"
        ? "bg-tint-red"
        : tint === "neutral"
          ? "bg-tint-neutral"
          : "bg-bg";
  return (
    <section className={`${bg} py-16 sm:py-24`}>
      <div className="shell">
        <p className="text-eyebrow uppercase text-muted mb-10">{label}</p>
        {children}
      </div>
    </section>
  );
}

function Swatch({
  name,
  hex,
  note,
  className,
  onDark,
}: {
  name: string;
  hex: string;
  note: string;
  className: string;
  onDark?: boolean;
}) {
  return (
    <div>
      <div
        className={`${className} h-20 rounded-card border border-line flex items-end p-3`}
      >
        <span
          className={`text-code font-mono ${onDark ? "text-on-black" : "text-ink"}`}
        >
          {hex}
        </span>
      </div>
      <p className="text-sm text-ink mt-2">{name}</p>
      <p className="text-sm text-muted">{note}</p>
    </div>
  );
}

export default function StyleguidePage() {
  return (
    <main>
      {/* ---------------- Hero pattern ---------------- */}
      <Band label="Hero — white band, black media card">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-eyebrow uppercase text-link mb-4 flex items-center gap-3">
              <span className="h-[3px] w-6 bg-brand-blue" aria-hidden />
              Government IT Services
            </p>
            <h1 className="text-display text-ink measure">
              The IT Edge for Lean Government
            </h1>
            <p className="text-lg text-body measure mt-6">
              CompQsoft is an IT services and consulting company specializing in
              digital transformation, cloud solutions, data and AI, automation,
              and next-generation technologies like generative AI.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#buttons"
                className="rounded-pill bg-black px-7 py-3.5 text-base text-on-black transition-colors duration-150 ease-brand hover:bg-body"
              >
                Explore our Government services
              </a>
              <a
                href="#buttons"
                className="rounded-pill border border-line px-7 py-3.5 text-base text-ink transition-colors duration-150 ease-brand hover:border-ink"
              >
                Contact us
              </a>
            </div>
          </div>

          {/* The deck's gradient, framed instead of full-bleed. */}
          <div
            className="rounded-card aspect-video w-full"
            style={{
              background:
                "radial-gradient(90% 90% at 0% 0%, #EE4743 0%, transparent 62%), radial-gradient(90% 90% at 0% 100%, #01A7E5 0%, transparent 62%), #000000",
            }}
          >
            <div className="flex h-full items-end p-6">
              <p className="text-on-black-mute text-sm font-mono">
                --grad-hero · video composites here at 30–45% opacity
              </p>
            </div>
          </div>
        </div>
      </Band>

      {/* ---------------- Type scale ---------------- */}
      <Band label="Type scale — Geist, weights 400 and 500 only" tint="neutral">
        <div className="space-y-8">
          <div>
            <p className="text-code font-mono text-muted mb-2">
              text-display · 40→64 · 400
            </p>
            <p className="text-display text-ink">The IT Edge</p>
          </div>
          <div>
            <p className="text-code font-mono text-muted mb-2">
              text-h1 · 32→46 · 500
            </p>
            <p className="text-h1 text-ink">Government IT Services</p>
          </div>
          <div>
            <p className="text-code font-mono text-muted mb-2">
              text-h2 · 26→34 · 500
            </p>
            <p className="text-h2 text-ink">Core competencies</p>
          </div>
          <div>
            <p className="text-code font-mono text-muted mb-2">
              text-h3 · 24 · 500
            </p>
            <p className="text-h3 text-ink">Unified Communications</p>
          </div>
          <div>
            <p className="text-code font-mono text-muted mb-2">
              text-h4 · 19 · 500
            </p>
            <p className="text-h4 text-ink">Network Management</p>
          </div>
          <div>
            <p className="text-code font-mono text-muted mb-2">
              text-lg · 19 · 400 · lead paragraph
            </p>
            <p className="text-lg text-body measure">
              For nearly three decades, CompQsoft has delivered IT services and
              consulting to Federal agencies, as well as state and local
              governments.
            </p>
          </div>
          <div>
            <p className="text-code font-mono text-muted mb-2">
              text-base · 17 · 400 · default, capped at 70ch
            </p>
            <p className="text-base text-body measure">
              CompQsoft performs comprehensive network management in our DISA,
              Navy, Coast Guard, and DeCA prime contracts. Through our
              implementation of network management best practices, including
              agnostic transport, data centricity, and secure architectures such
              as Zero Trust, we ensure network resiliency, rationalization
              through network consolidations, security through ICAM
              incorporation, and increased flexibility and adaptability through
              implementations of open standards to reduce SWaP.
            </p>
          </div>
          <div>
            <p className="text-code font-mono text-muted mb-2">
              text-sm · 15 · 400 · meta
            </p>
            <p className="text-sm text-muted">Published 25 March 2025</p>
          </div>
          <div>
            <p className="text-code font-mono text-muted mb-2">
              text-code · 14 · mono · federal identifiers only
            </p>
            <p className="text-code font-mono text-ink">
              UEI KTU8QJE27RN8 · CAGE 1TTA2 · DUNS 140460283 · NAICS 541512
            </p>
          </div>
        </div>
      </Band>

      {/* ---------------- Color ---------------- */}
      <Band label="Grounds and text — contrast measured against white">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Swatch
            name="bg"
            hex="#FFFFFF"
            note="page background, the default"
            className="bg-bg"
          />
          <Swatch
            name="tint-blue"
            hex="#F2FAFE"
            note="Commercial + service bands"
            className="bg-tint-blue"
          />
          <Swatch
            name="tint-red"
            hex="#FEF5F5"
            note="Government + vehicle bands"
            className="bg-tint-red"
          />
          <Swatch
            name="tint-neutral"
            hex="#F7F8F9"
            note="About, Careers, Insights"
            className="bg-tint-neutral"
          />
          <Swatch
            name="ink"
            hex="#0A0A0A"
            note="headings · 19.6:1"
            className="bg-ink"
            onDark
          />
          <Swatch
            name="body"
            hex="#3A3F45"
            note="paragraphs · 10.6:1"
            className="bg-body"
            onDark
          />
          <Swatch
            name="muted"
            hex="#63696F"
            note="meta, captions · 5.6:1"
            className="bg-muted"
            onDark
          />
          <Swatch
            name="line"
            hex="#E3E6E9"
            note="hairlines, dividers"
            className="bg-line"
          />
        </div>

        <h3 className="text-h3 text-ink mt-16 mb-6">
          Brand as text — darkened siblings
        </h3>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Swatch
            name="link"
            hex="#017AAD"
            note="links, eyebrows, CTAs · 4.7:1"
            className="bg-link"
            onDark
          />
          <Swatch
            name="link-hover"
            hex="#015E86"
            note="hover, pressed"
            className="bg-link-hover"
            onDark
          />
          <Swatch
            name="red-text"
            hex="#D93A36"
            note="Government eyebrows · 4.6:1"
            className="bg-red-text"
            onDark
          />
        </div>

        <h3 className="text-h3 text-ink mt-16 mb-2">
          Brand at full saturation — fills only
        </h3>
        <p className="text-base text-body measure mb-6">
          These two carry <strong className="font-medium text-ink">ink</strong>{" "}
          text, never white. As text on white they measure 2.7:1 and 3.7:1 and
          fail AA — so they never appear as type below 24px on a light ground.
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Swatch
            name="brand-blue"
            hex="#01A7E5"
            note="ink on it · 7.7:1"
            className="bg-brand-blue"
          />
          <Swatch
            name="brand-red"
            hex="#EE4743"
            note="ink on it · 5.6:1"
            className="bg-brand-red"
          />
          <Swatch
            name="black"
            hex="#000000"
            note="media card, buttons, footer"
            className="bg-black"
            onDark
          />
        </div>
      </Band>

      {/* ---------------- Brand colors doing real work ---------------- */}
      <Band label="Where the primaries appear on white" tint="blue">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Numbered markers */}
          <div>
            <h3 className="text-h3 text-ink mb-6">Numbered markers</h3>
            <ol className="space-y-4">
              {[
                ["01", "Mission-Led Partnership"],
                ["02", "Innovation with Accountability"],
                ["03", "Engineering-Driven Impact"],
                ["04", "Future-Ready Mindset"],
              ].map(([n, label], i) => (
                <li key={n} className="flex items-center gap-4">
                  <span
                    className={`grid h-14 w-14 shrink-0 place-items-center rounded-pill ${
                      i % 2 === 0 ? "bg-brand-blue" : "bg-brand-red"
                    } text-h3 text-ink tabular`}
                  >
                    {n}
                  </span>
                  <span className="text-h4 text-ink">{label}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Cards with practice rules */}
          <div>
            <h3 className="text-h3 text-ink mb-6">Card accent rules</h3>
            <div className="space-y-4">
              <article className="rounded-card border border-line border-l-4 border-l-brand-red bg-bg p-6 transition-colors duration-150 ease-brand hover:border-ink hover:border-l-brand-red">
                <p className="text-eyebrow uppercase text-red-text mb-2">
                  Government
                </p>
                <h4 className="text-h4 text-ink">Unified Communications</h4>
                <p className="text-sm text-body mt-2">
                  VoIP and AV/VTC for DISA, DeCA, and Joint Service Provider.
                </p>
              </article>
              <article className="rounded-card border border-line border-l-4 border-l-brand-blue bg-bg p-6 transition-colors duration-150 ease-brand hover:border-ink hover:border-l-brand-blue">
                <p className="text-eyebrow uppercase text-link mb-2">
                  Commercial
                </p>
                <h4 className="text-h4 text-ink">Power Platform &amp; RPA</h4>
                <p className="text-sm text-body mt-2">
                  Automate processes across the Microsoft estate.
                </p>
              </article>
            </div>
          </div>

          {/* Chips */}
          <div>
            <h3 className="text-h3 text-ink mb-6">Chips and tags</h3>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-pill bg-brand-blue px-4 py-1.5 text-sm text-ink">
                Cloud Migration
              </span>
              <span className="rounded-pill bg-brand-red px-4 py-1.5 text-sm text-ink">
                Cybersecurity
              </span>
              <span className="rounded-pill border border-line bg-bg px-4 py-1.5 text-sm text-body">
                Data &amp; AI
              </span>
            </div>
          </div>

          {/* Links in prose */}
          <div>
            <h3 className="text-h3 text-ink mb-6">Links in prose</h3>
            <p className="text-base text-body measure">
              CompQsoft holds prime positions on{" "}
              <a
                href="#"
                className="text-link decoration-brand-blue decoration-2 underline underline-offset-4 transition-colors duration-150 ease-brand hover:text-link-hover"
              >
                DISA ENCORE III
              </a>
              ,{" "}
              <a
                href="#"
                className="text-link decoration-brand-blue decoration-2 underline underline-offset-4 transition-colors duration-150 ease-brand hover:text-link-hover"
              >
                NITAAC CIO-SP3
              </a>
              , and{" "}
              <a
                href="#"
                className="text-link decoration-brand-blue decoration-2 underline underline-offset-4 transition-colors duration-150 ease-brand hover:text-link-hover"
              >
                OASIS SB Pool 3
              </a>
              .
            </p>
          </div>
        </div>
      </Band>

      {/* ---------------- Counters ---------------- */}
      <Band label="Stat counters">
        <div className="grid gap-10 sm:grid-cols-3">
          {[
            ["28", "Years of Delivering Excellence", "bg-brand-red"],
            ["240", "Locations", "bg-brand-blue"],
            ["200", "Global Customers", "bg-brand-red"],
          ].map(([n, label, rule]) => (
            <div key={label}>
              <p className="text-stat text-ink tabular">
                {n}
                <span className="text-link">+</span>
              </p>
              <span className={`mt-4 mb-3 block h-[3px] w-12 ${rule}`} />
              <p className="text-stat-label uppercase text-muted">{label}</p>
            </div>
          ))}
        </div>
      </Band>

      {/* ---------------- Buttons ---------------- */}
      <Band label="Buttons — pill, per the brand deck" tint="neutral" >
        <div id="buttons" className="flex flex-wrap items-center gap-4">
          <button className="rounded-pill bg-black px-7 py-3.5 text-base text-on-black transition-colors duration-150 ease-brand hover:bg-body">
            Primary
          </button>
          <button className="rounded-pill border border-line px-7 py-3.5 text-base text-ink transition-colors duration-150 ease-brand hover:border-ink">
            Secondary
          </button>
          <button className="rounded-pill px-2 py-3.5 text-base text-link underline decoration-brand-blue decoration-2 underline-offset-4 transition-colors duration-150 ease-brand hover:text-link-hover">
            Tertiary
          </button>
          <button
            disabled
            className="rounded-pill bg-line px-7 py-3.5 text-base text-muted"
          >
            Disabled
          </button>
        </div>
        <p className="text-sm text-muted mt-6">
          Tab through these — the focus ring is 2px brand blue at 2px offset.
        </p>
      </Band>

      {/* ---------------- Footer ---------------- */}
      <footer className="bg-black py-16 sm:py-24">
        <div className="shell">
          <p className="text-eyebrow uppercase text-on-black-mute mb-6">
            Footer — the one full-bleed black surface
          </p>
          <p className="text-h2 text-on-black measure">
            The IT Edge for Lean Government
          </p>
          <p className="text-base text-on-black-mute measure mt-4">
            On black, the primaries run at full saturation. Here are{" "}
            <a
              href="#"
              className="text-brand-blue underline underline-offset-4 transition-opacity duration-150 ease-brand hover:opacity-80"
            >
              brand blue
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="text-brand-red underline underline-offset-4 transition-opacity duration-150 ease-brand hover:opacity-80"
            >
              brand red
            </a>{" "}
            as links — 7.7:1 and 5.6:1 against black, both pass.
          </p>
          <p className="text-code font-mono text-on-black-mute mt-10">
            UEI KTU8QJE27RN8 · CAGE 1TTA2 · FEIN 76-0554431
          </p>
        </div>
      </footer>
    </main>
  );
}
