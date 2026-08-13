import type { Metadata } from "next";
import { seoFor } from "@/lib/content";
import { company } from "@/lib/site";
import { Band, Hero } from "@/components/sections";
import { ContactForm } from "@/components/contact-form";
import { bannerFor } from "@/lib/media";

const PATH = "/contact-us";
const seo = seoFor(PATH);

export const metadata: Metadata = {
  title: seo?.title ?? "Contact Us",
  description:
    seo?.description ??
    "Connect with CompQsoft. From strategic consulting to leading-edge technologies, we enable experiences that transform organizations for success.",
  alternates: { canonical: PATH },
};

export default function ContactPage() {
  return (
    <main>
      <Hero
        image={bannerFor(PATH)}
        compact
        eyebrow="Contact"
        title="Connect with CompQsoft"
        lead="From strategic consulting to leading-edge technologies, we enable experiences that transform organizations for success."
      />

      <Band tone="tint">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <h2 className="mb-8 text-h2 text-ink">Send us a message</h2>
            <ContactForm />
          </div>

          <div className="space-y-12">
            <div>
              <h2 className="mb-6 text-h2 text-ink">Contact departments</h2>
              <dl className="divide-y divide-line border-y border-line">
                {company.phones.map((phone) => (
                  <div key={phone.value} className="py-4">
                    <dt className="text-stat-label uppercase text-muted">
                      {phone.label}
                    </dt>
                    <dd className="mt-1">
                      <a
                        href={`tel:${phone.value.replace(/-/g, "")}`}
                        className="text-h3 text-link transition-colors duration-150 ease-brand hover:text-link-hover"
                      >
                        {phone.value}
                      </a>
                    </dd>
                  </div>
                ))}
                <div className="py-4">
                  <dt className="text-stat-label uppercase text-muted">Fax</dt>
                  <dd className="mt-1 text-h3 text-ink">281-968-2077</dd>
                </div>
              </dl>
            </div>

            <div>
              <h2 className="mb-6 text-h2 text-ink">Reach us</h2>
              <div className="space-y-6">
                <div>
                  <p className="text-stat-label uppercase text-muted">
                    Corporate office
                  </p>
                  <p className="mt-2 text-base text-body">
                    {company.corporateOffice}
                  </p>
                </div>
                <div>
                  <p className="text-stat-label uppercase text-muted">
                    Houston office
                  </p>
                  <p className="mt-2 text-base text-body">
                    {company.houstonOffice}
                  </p>
                </div>
              </div>
            </div>

            {/* A contracting officer looks for these before anything else. */}
            <div>
              <h2 className="mb-6 text-h2 text-ink">Federal identifiers</h2>
              <dl className="divide-y divide-line border-y border-line">
                {company.identifiers.map((id) => (
                  <div key={id.label} className="flex gap-8 py-3">
                    <dt className="w-24 shrink-0 text-stat-label uppercase text-muted">
                      {id.label}
                    </dt>
                    <dd className="font-mono text-code text-ink">{id.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </Band>
    </main>
  );
}
