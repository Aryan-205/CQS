"use client";

import { useState } from "react";

/**
 * Enquiry form. Field names match the old Contact Form 7 endpoint
 * (content.md:1793) so an existing handler keeps working.
 *
 * No submit endpoint is wired yet — POST target is a decision for whoever
 * owns the CRM. Until then this validates client-side and reports that.
 */
const fields = [
  { name: "fullname", label: "Full Name", type: "text", placeholder: "Enter your full name" },
  { name: "company", label: "Company Name", type: "text", placeholder: "Enter your company name" },
  { name: "email", label: "Email Address", type: "email", placeholder: "Enter your email" },
  { name: "phone", label: "Phone Number", type: "tel", placeholder: "+1 (123) 456-7890" },
] as const;

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="measure space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      {fields.map((field) => (
        <div key={field.name}>
          <label
            htmlFor={field.name}
            className="mb-2 block text-stat-label uppercase text-muted"
          >
            {field.label}
          </label>
          <input
            id={field.name}
            name={field.name}
            type={field.type}
            required
            placeholder={field.placeholder}
            className="w-full rounded-card border border-line bg-bg px-5 py-3 text-base text-ink placeholder:text-muted focus:border-brand-blue focus:outline-none"
          />
        </div>
      ))}

      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-stat-label uppercase text-muted"
        >
          Your Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Type your message here"
          className="w-full rounded-card border border-line bg-bg px-5 py-3 text-base text-ink placeholder:text-muted focus:border-brand-blue focus:outline-none"
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          required
          className="mt-1.5 h-4 w-4 accent-[#01A7E5]"
        />
        <label htmlFor="consent" className="text-sm text-body">
          I agree to the{" "}
          <a
            href="/terms-and-conditions"
            className="text-link underline decoration-brand-blue decoration-2 underline-offset-4"
          >
            terms and conditions
          </a>
          .
        </label>
      </div>

      <button
        type="submit"
        className="rounded-pill bg-black px-7 py-3.5 text-base text-on-black transition-colors duration-150 ease-brand hover:bg-body"
      >
        Send message
      </button>

      {submitted && (
        <p
          role="status"
          className="rounded-card border border-line border-l-4 border-l-brand-blue p-4 text-sm text-body"
        >
          Form validated, but no submit endpoint is connected yet. Wire this to
          your CRM or form service before launch.
        </p>
      )}
    </form>
  );
}
