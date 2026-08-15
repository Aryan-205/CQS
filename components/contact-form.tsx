"use client";

import { useId, useState, useSyncExternalStore } from "react";
import { Arrow, ChevronDown } from "@/components/icons";

/**
 * Enquiry form. Field names match the old Contact Form 7 endpoint
 * (content.md:1793) so an existing handler keeps working. Two are added:
 *
 * - `source` — every service page already links here as
 *   `/contact-us?source=<Service>`, and the old form threw that away.
 * - `department` — the site's whole IA forks government / commercial, and the
 *   page publishes a different phone line for each. A message that does not
 *   say which desk it is for lands on someone's list to triage by hand.
 *
 * No submit endpoint is wired yet — the POST target is a decision for whoever
 * owns the CRM. Until then this validates client-side and reports that.
 *
 * Fields are hairline-ruled rather than boxed. A boxed field on a white page
 * draws a second rectangle around copy that is already inside a column, and
 * six of them stacked read as a form to survive rather than a message to write.
 */

/** Routes the enquiry. First option is empty so nothing is pre-selected for
 *  the sender — a defaulted select is the most-answered-wrongly control there
 *  is, and this one decides who reads the message. */
const DEPARTMENTS = [
  "Government / federal programs",
  "Commercial / digital transformation",
  "Partnerships and alliances",
  "Vendors, invoicing and HR",
  "Something else",
] as const;

const FIELDS = [
  {
    name: "fullname",
    label: "Full name",
    type: "text",
    placeholder: "Jordan Reyes",
    autoComplete: "name",
    required: true,
  },
  {
    name: "company",
    label: "Organization",
    type: "text",
    placeholder: "Agency or company",
    autoComplete: "organization",
    required: true,
  },
  {
    name: "email",
    label: "Email address",
    type: "email",
    placeholder: "you@organization.gov",
    autoComplete: "email",
    required: true,
  },
  {
    name: "phone",
    label: "Phone number",
    type: "tel",
    placeholder: "+1 (123) 456-7890",
    autoComplete: "tel",
    // Optional on purpose. The old form demanded it; a phone number is not
    // needed to answer an email, and requiring one costs enquiries.
    required: false,
  },
] as const;

/**
 * Hairline field: 2px rule at rest and on focus, so nothing shifts.
 *
 * `outline-none` is deliberately absent. The rule going blue is a nice
 * confirmation but only about 2.2:1 against the resting grey, short of the 3:1
 * WCAG 2.2 asks of a focus indicator, so the global `:focus-visible` outline is
 * left to do the accessible half of the job.
 */
const FIELD_CLASS =
  "w-full rounded-none border-0 border-b-2 border-line bg-transparent pb-3 text-lg text-ink transition-colors duration-150 ease-brand placeholder:text-muted focus:border-brand-blue";

const LABEL_CLASS =
  "mb-3 flex items-baseline gap-2 text-stat-label uppercase text-muted";

const SUBSCRIBE_NEVER = () => () => {};

/** Same string every call, so useSyncExternalStore never re-renders on it. */
const readSource = () =>
  new URLSearchParams(window.location.search).get("source")?.replace(/&amp;/g, "&") ??
  null;

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const statusId = useId();

  // Service pages link in as /contact-us?source=Cyber+Security+Services. Read
  // it straight off the URL rather than through useSearchParams, which would
  // opt the whole route out of static rendering. The query never changes while
  // the form is mounted, so the store has nothing to subscribe to.
  const source = useSyncExternalStore(SUBSCRIBE_NEVER, readSource, () => null);

  return (
    <form
      className="space-y-10"
      aria-describedby={submitted ? statusId : undefined}
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
              {!field.required && (
                <span className="text-sm normal-case tracking-normal text-muted">
                  (optional)
                </span>
              )}
            </label>
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              autoComplete={field.autoComplete}
              required={field.required}
              placeholder={field.placeholder}
              className={FIELD_CLASS}
            />
          </div>
        ))}

        <div className="sm:col-span-2">
          <label htmlFor="department" className={LABEL_CLASS}>
            Who should read this
          </label>
          {/* The chevron is drawn rather than left to the UA, so the control
              matches the hairline fields either side of it on every platform. */}
          <div className="relative">
            <select
              id="department"
              name="department"
              required
              defaultValue=""
              className={`${FIELD_CLASS} appearance-none pr-8 [&:invalid]:text-muted`}
            >
              <option value="" disabled>
                Select a team
              </option>
              {DEPARTMENTS.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute bottom-4 right-0 h-4 w-4 text-muted" />
          </div>
        </div>

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
            aria-describedby="message-hint"
            className={`${FIELD_CLASS} resize-y`}
          />
          <p id="message-hint" className="mt-3 text-sm text-muted">
            Timelines, contract vehicle or platform, and any constraints you
            already know about — the more of it here, the fewer rounds it takes.
          </p>
        </div>
      </div>

      <div className="flex items-start gap-3 border-t border-line pt-8">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          required
          className="mt-1.5 h-4 w-4 shrink-0 accent-[#01A7E5]"
        />
        <label htmlFor="consent" className="measure text-sm text-muted">
          I agree to the{" "}
          <a
            href="/terms-and-conditions"
            className="text-link underline decoration-brand-blue decoration-2 underline-offset-4 transition-colors duration-150 ease-brand hover:text-link-hover"
          >
            terms and conditions
          </a>{" "}
          and the{" "}
          <a
            href="/privacy-policy"
            className="text-link underline decoration-brand-blue decoration-2 underline-offset-4 transition-colors duration-150 ease-brand hover:text-link-hover"
          >
            privacy policy
          </a>
          .
        </label>
      </div>

      <button
        type="submit"
        className="group inline-flex items-center gap-2.5 rounded-pill bg-black px-8 py-4 text-base text-on-black transition-colors duration-150 ease-brand hover:bg-body"
      >
        Send message
        <Arrow className="h-3.5 w-3.5 transition-transform duration-150 ease-brand group-hover:translate-x-1" />
      </button>

      {submitted && (
        <p
          id={statusId}
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
