import type { Metadata } from "next";
import { seoFor } from "@/lib/content";
import { CtaBand } from "@/components/sections";
import {
  CareersHero,
  IndexRows,
  Ledger,
  PracticePanels,
  Statement,
  Triptych,
} from "@/components/careers/sections";
import {
  Award,
  CalendarCheck,
  Coins,
  GradCap,
  HealthCross,
  Lightbulb,
  People,
  ShieldHeart,
  Sun,
  Target,
  Tooth,
  Umbrella,
} from "@/components/icons";
import { careersMedia, practiceMedia } from "@/lib/media";

/** Careers is a neutral page: blue accents, no practice claim. */
const PRACTICE = "neutral" as const;
const PATH = "/life-at-compqsoft";
const seo = seoFor(PATH);

export const metadata: Metadata = {
  title: { absolute: seo?.title ?? "Life at CompQsoft - CompQsoft" },
  description:
    seo?.description ??
    "Our values, our benefits, and what it is like to build a career here.",
  alternates: { canonical: PATH },
};

/**
 * The four values. Titles are verbatim from the careers page (content.md:1660);
 * the descriptions are the company's own gloss on each, from the About page
 * (content.md:750), so a value carries meaning rather than a bare label.
 */
const VALUES = [
  {
    title: "Excellence Delivered",
    description:
      "We use our “Q” Methodology to produce high-quality output that meets our client’s requirements.",
    icon: <Award className="h-14 w-14" />,
  },
  {
    title: "Proactive Problem Solving",
    description:
      "Our highly skilled employees utilize their full capabilities to identify and resolve obstacles.",
    icon: <Lightbulb className="h-14 w-14" />,
  },
  {
    title: "Culture of Dignity and Respect",
    description:
      "Respect is critical to any human endeavor, and we consider it a basic company tenet.",
    icon: <People className="h-14 w-14" />,
  },
  {
    title: "Customer-Centered Success",
    description:
      "We are successful only when we achieve success for our customers. This is the focus of all we do.",
    icon: <Target className="h-14 w-14" />,
  },
];

/**
 * The W2 compensation package, verbatim from content.md:1673. The tag on the
 * right is the kind of cover each item is — it turns eight loose benefits into
 * a schedule a candidate can compare against their current one.
 */
const BENEFITS = [
  {
    title: "401(k) with employer match",
    tag: "Retirement",
    icon: <Coins className="h-8 w-8" />,
  },
  {
    title: "Life insurance",
    tag: "Protection",
    icon: <ShieldHeart className="h-8 w-8" />,
  },
  {
    title: "Health insurance",
    tag: "Health",
    icon: <HealthCross className="h-8 w-8" />,
  },
  { title: "Dental insurance", tag: "Health", icon: <Tooth className="h-8 w-8" /> },
  {
    title: "Long and short-term disability insurance",
    tag: "Protection",
    icon: <Umbrella className="h-8 w-8" />,
  },
  { title: "Sick leave", tag: "Time", icon: <CalendarCheck className="h-8 w-8" /> },
  {
    title: "Training, education and certification assistance",
    tag: "Development",
    icon: <GradCap className="h-8 w-8" />,
  },
  {
    title: "Vacation and holiday plan",
    tag: "Time",
    icon: <Sun className="h-8 w-8" />,
  },
];

const PANELS = [
  {
    href: "/government-it-services",
    image: practiceMedia.government,
    label: "Government",
    title: "Federal programme delivery",
    description:
      "Unified communications, network engineering, cybersecurity and logistics software sustainment for DoD, DHS and HHS customers.",
    practice: "government" as const,
  },
  {
    href: "/technologygroup",
    image: practiceMedia.commercial,
    label: "Commercial",
    title: "Digital transformation",
    description:
      "Dynamics 365, Azure, Power Platform and Copilot work for commercial customers across the Microsoft stack and beyond.",
    practice: "commercial" as const,
  },
];

export default function LifeAtCompqsoftPage() {
  return (
    <main>
      <CareersHero
        eyebrow="Careers"
        title="Build your future with us"
        lead="People are at the heart of our business. Two practices, one standard, and a package that does not have to be negotiated for."
        image={careersMedia.culture}
        practice={PRACTICE}
        actions={[
          { label: "Explore open positions", href: "/openings" },
          { label: "Employee resources", href: "/employee-resources" },
        ]}
        stats={[
          { value: "130+", label: "Countries we work across" },
          { value: "240+", label: "Locations" },
          { value: "28+", label: "Years delivering" },
        ]}
      />

      <Statement eyebrow="What it is like here" practice={PRACTICE} pad="wide">
        <p>
          We believe that people are at the heart of our business, driving
          innovation and success. With a presence in over 130 countries and a
          diverse team speaking multiple languages, we collaborate with
          customers across regions to deliver daily excellence.
        </p>
        <p>
          At CompQsoft, our values are more than words on a page — they are the
          guiding principles that shape our culture. We promise you a friendly,
          inclusive, and supportive work environment where you can learn, grow,
          and be challenged every day.
        </p>
      </Statement>

      <IndexRows
        eyebrow="Our values"
        title="The four principles we work to"
        items={VALUES}
        practice={PRACTICE}
      />

      <Triptych
        images={[careersMedia.workplace, careersMedia.team, practiceMedia.commercial]}
        caption="Federal operations, the delivery team, and the commercial practice"
        practice={PRACTICE}
      />

      <Ledger
        eyebrow="Benefits"
        title="What the W2 package covers"
        lead="CompQsoft is committed to attracting and retaining highly skilled professionals. Every item below is standard for W2 employees, not a plan tier to be bought up to."
        items={BENEFITS}
        practice={PRACTICE}
      />

      <PracticePanels
        eyebrow="Where you would work"
        title="Two practices, one standard"
        panels={PANELS}
      />

      <CtaBand
        practice={PRACTICE}
        title="Ready to take the next step in your career journey?"
        lead="Apply now and unlock your potential with CompQsoft."
        action={{ label: "Explore open positions", href: "/openings" }}
        secondary={{ label: "Contact us", href: "/contact-us" }}
      />
    </main>
  );
}
