import Link from "next/link";
import {
  company,
  footerColumns,
  legalLinks,
  socials,
  utilityLinks,
} from "@/lib/site";
import { Logo } from "@/components/logo";
import { Arrow } from "@/components/icons";

/**
 * The one full-bleed black surface below the fold. Brand primaries run at full
 * saturation here — 7.7:1 and 5.6:1 against black, both pass.
 *
 * The top edge carries the deck's black-to-blue gradient as a 3px rule, which
 * is the only place a hard gradient touches the page ground.
 */
export function SiteFooter() {
  return (
    <footer className="relative isolate overflow-hidden bg-black">
      <span className="block h-[3px] grad-blue" aria-hidden />
      <div className="absolute inset-0 hairline-grid opacity-40" aria-hidden />

      <div className="relative">
        {/* Newsletter */}
        <div className="border-b border-white/10">
          <div className="shell flex flex-col gap-8 py-14 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-h3 text-on-black">
                Never miss an update from us
              </h2>
              <p className="mt-2.5 text-base text-on-black-mute">
                Insights on federal IT modernization and the Microsoft estate.
              </p>
            </div>
            <form className="flex w-full max-w-md gap-2" action="/contact-us">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                name="your-email"
                required
                placeholder="Enter your email"
                className="min-w-0 flex-1 rounded-pill border border-white/20 bg-transparent px-5 py-3 text-base text-on-black placeholder:text-on-black-mute focus:border-brand-blue focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-pill bg-bg px-6 py-3 text-base text-ink transition-colors duration-150 ease-brand hover:bg-on-black-mute"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Link columns */}
        <div className="shell grid gap-x-8 gap-y-12 py-16 sm:grid-cols-2 lg:grid-cols-6">
          {footerColumns.map((column) => (
            <div key={column.heading}>
              <p className="mb-5 text-eyebrow uppercase text-on-black">
                {column.heading}
              </p>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-on-black-mute transition-colors duration-150 ease-brand hover:text-brand-blue"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="mb-5 text-eyebrow uppercase text-on-black">
              Get in touch
            </p>
            <address className="space-y-4 text-sm not-italic text-on-black-mute">
              <p>
                <span className="block text-on-black">Corporate office</span>
                {company.corporateOffice}
              </p>
              <p>
                <span className="block text-on-black">Houston office</span>
                {company.houstonOffice}
              </p>
            </address>
            <ul className="mt-5 space-y-2.5">
              {company.phones.map((phone) => (
                <li key={phone.value} className="text-sm text-on-black-mute">
                  {phone.label}
                  <br />
                  <a
                    href={`tel:${phone.value.replace(/-/g, "")}`}
                    className="text-brand-blue transition-opacity duration-150 ease-brand hover:opacity-80"
                  >
                    {phone.value}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Identifiers — the first thing a contracting officer looks for. */}
        <div className="border-t border-white/10">
          <div className="shell flex flex-wrap items-center gap-x-8 gap-y-3 py-6">
            {company.identifiers.map((id) => (
              <p
                key={id.label}
                className="font-mono text-code text-on-black-mute"
              >
                <span className="text-stat-label uppercase">{id.label}</span>{" "}
                <span className="text-on-black">{id.value}</span>
              </p>
            ))}
            <Link
              href="/primecontracts"
              className="group ml-auto inline-flex items-center gap-2 text-sm text-brand-blue"
            >
              Capability statement
              <Arrow className="h-3 w-3 transition-transform duration-150 ease-brand group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Utility + legal */}
        <div className="border-t border-white/10">
          <div className="shell flex flex-col gap-8 py-10">
            <ul className="flex flex-wrap gap-x-7 gap-y-2.5">
              {utilityLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-on-black-mute transition-colors duration-150 ease-brand hover:text-brand-blue"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
              <Logo className="h-6 w-auto" />

              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {socials.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="text-sm text-on-black-mute transition-colors duration-150 ease-brand hover:text-brand-blue"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <p className="text-sm text-on-black-mute">
                © CompQsoft.com. All Rights Reserved 2026.
              </p>
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-on-black-mute transition-colors duration-150 ease-brand hover:text-brand-blue"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
