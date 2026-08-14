"use client";

import { useState, useSyncExternalStore } from "react";
import { Arrow } from "@/components/icons";

/**
 * Enquiry form. Field names match the old Contact Form 7 endpoint
 * (content.md:1793) so an existing handler keeps working. `source` is added:
 * every service page already links here as `/contact-us?source=<Service>`, and
 * the old form threw that away.
 *
 * No submit endpoint is wired yet — the POST target is a decision for whoever
 * owns the CRM. Until then this validates client-side and reports that.
 *
 * Fields are hairline-ruled rather than boxed. A boxed field on a white page
 * draws a second rectangle around copy that is already inside a column, and
 * six of them stacked read as a form to survive rather than a message to write.
 */
const FIELDS = [
  {
    name: "fullname",
    label: "Full name",
    type: "text",
    placeholder: "Jordan Reyes",
    autoComplete: "name",
    half: true,
  },
  {
    name: "company",
    label: "Organization",
    type: "text",
    placeholder: "Agency or company",
    autoComplete: "organization",
    half: true,
  },
  {
    name: "email",
    label: "Email address",
    type: "email",
    placeholder: "you@organization.gov",
    autoComplete: "email",
    half: true,
  },
  {
    name: "phone",
    label: "Phone number",
    type: "tel",
    placeholder: "+1 (123) 456-7890",
    autoComplete: "tel",
    half: true,
  },
] as const;

/** Hairline field: 2px rule at rest and on focus, so nothing shifts. */
const FIELD_CLASS =
  "w-full border-0 border-b-2 border-line bg-transparent pb-3 text-lg text-ink transition-colors duration-150 ease-brand placeholder:text-muted focus:border-brand-blue focus:outline-none";

const LABEL_CLASS = "mb-3 block text-stat-label uppercase text-muted";

const SUBSCRIBE_NEVER = () => () => {};

/** Same string every call, so useSyncExternalStore never re-renders on it. */
const readSource = () =>
  new URLSearchParams(window.location.search).get("source")?.replace(/&amp;/g, "&") ??
  null;

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  // Service pages link in as /contact-us?source=Cyber+Security+Services. Read
  // it straight off the URL rather than through useSearchParams, which would
  // opt the whole route out of static rendering. The query never changes while
  // the form is mounted, so the store has nothing to subscribe to.
  const source = useSyncExternalStore(SUBSCRIBE_NEVER, readSource, () => null);

  return (
    <form
      className="space-y-12"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      {source && (
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 border-l-2 border-brand-blue pl-5 text-base text-body">
          <span className="text-stat-label uppercase text-muted">Regarding</span>
          {source}
          <input type="hidden" name="source" value={source} />
        </p>
      )}

      <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
        {FIELDS.map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name} className={LABEL_CLASS}>
              {field.label}
            </label>
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              autoComplete={field.autoComplete}
              required
              placeholder={field.placeholder}
              className={FIELD_CLASS}
            />
          </div>
        ))}

        <div className="sm:col-span-2">
          <label htmlFor="message" className={LABEL_CLASS}>
            Your message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="What are you trying to solve, and by when?"
            className={`${FIELD_CLASS} resize-y`}
          />
        </div>
      </div>

      <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          className="group inline-flex items-center gap-2.5 self-start rounded-pill bg-black px-8 py-4 text-base text-on-black transition-colors duration-150 ease-brand hover:bg-body"
        >
          Send message
          <Arrow className="h-3.5 w-3.5 transition-transform duration-150 ease-brand group-hover:translate-x-1" />
        </button>

        <div className="flex items-start gap-3 sm:max-w-[34ch]">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            required
            className="mt-1 h-4 w-4 shrink-0 accent-[#01A7E5]"
          />
          <label htmlFor="consent" className="text-sm text-muted">
            I agree to the{" "}
            <a
              href="/terms-and-conditions"
              className="text-link underline decoration-brand-blue decoration-2 underline-offset-4 transition-colors duration-150 ease-brand hover:text-link-hover"
            >
              terms and conditions
            </a>
            .
          </label>
        </div>
      </div>

      {submitted && (
        <p
          role="status"
          className="border-l-2 border-brand-blue py-1 pl-5 text-sm text-body"
        >
          Form validated, but no submit endpoint is connected yet. Wire this to
          your CRM or form service before launch.
        </p>
      )}
    </form>
  );
}
