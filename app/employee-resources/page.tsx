import type { Metadata } from "next";
import { seoFor } from "@/lib/content";
import { CtaBand } from "@/components/sections";
import {
  Console,
  DarkStatement,
  DownloadChips,
  HolidayWall,
  PayLedger,
  PortalTiles,
  UtilityHero,
} from "@/components/careers/sections";
import { CalendarDays, Download, Globe, Wallet } from "@/components/icons";
import {
  AcrobatMark,
  NotepadPlusPlusMark,
  SevenZipMark,
  TeamsMark,
} from "@/components/vendor-marks";

const PRACTICE = "neutral" as const;
const PATH = "/employee-resources";
const seo = seoFor(PATH);

export const metadata: Metadata = {
  title: { absolute: seo?.title ?? "Employee Resources - CompQsoft" },
  description:
    seo?.description ??
    "Holiday and pay calendars, portal links and HR contacts for CompQsoft employees.",
  alternates: { canonical: PATH },
};

/** The four things the page holds. An employee wants exactly one of them. */
const SECTIONS = [
  {
    label: "Portals",
    href: "#portals",
    note: "Timesheets, benefits, 401(k), learning",
    icon: <Globe className="h-8 w-8" />,
  },
  {
    label: "Downloads",
    href: "#downloads",
    note: "The standard desktop set",
    icon: <Download className="h-8 w-8" />,
  },
  {
    label: "Holidays",
    href: "#holidays",
    note: "11 federal holidays in 2026",
    icon: <CalendarDays className="h-8 w-8" />,
  },
  {
    label: "Pay schedule",
    href: "#pay",
    note: "24 periods and check dates",
    icon: <Wallet className="h-8 w-8" />,
  },
];

/**
 * Portal links. Only the destinations content.md actually records are linked —
 * Costpoint, the LMS and webmail were captured as "CLICK HERE" with no href,
 * so those tiles carry the purpose and no link rather than a guessed URL.
 * Wire them in when IT supplies the addresses.
 */
const PORTALS = [
  {
    title: "Deltek Costpoint",
    description:
      "Enter your timesheet and log hours. Anything wrong with Costpoint goes to the finance team.",
  },
  {
    title: "Paylocity",
    description:
      "The employee portal: benefits, direct deposit setup and pay statements.",
    action: { label: "Open Paylocity", href: "https://www.paylocity.com" },
  },
  {
    title: "Percipio learning",
    description:
      "The CompQsoft learning management system, reached through the web portal.",
  },
  {
    title: "401(k) with Empower",
    description:
      "Enrolment help on 1-855-756-4738. Representatives take calls Monday to Friday, 8 a.m. to 10 p.m. Eastern, and Saturdays 9 a.m. to 5:30 p.m. Eastern.",
    action: { label: "Call Empower", href: "tel:+18557564738" },
  },
  {
    title: "Web mail",
    description: "Read CompQsoft mail from outside the corporate network.",
  },
  {
    title: "Employment verification",
    description:
      "HR handles verification letters and employment confirmations on 703-775-1564.",
    action: { label: "Call HR", href: "tel:+17037751564" },
  },
];

/** Vendor download pages, not mirrors. Marks are the vendors' own. */
const DOWNLOADS = [
  {
    label: "Microsoft Teams",
    note: "Windows · macOS · mobile",
    href: "https://www.microsoft.com/microsoft-teams/download-app",
    mark: <TeamsMark className="h-9 w-9" />,
  },
  {
    label: "7-Zip",
    note: "Windows · archive tool",
    href: "https://www.7-zip.org/download.html",
    mark: <SevenZipMark className="h-9 w-9" />,
  },
  {
    label: "Adobe Acrobat Reader",
    note: "Windows · macOS",
    href: "https://get.adobe.com/reader/",
    mark: <AcrobatMark className="h-9 w-9" />,
  },
  {
    label: "Notepad++",
    note: "Windows · text editor",
    href: "https://notepad-plus-plus.org/downloads/",
    mark: <NotepadPlusPlusMark className="h-9 w-9" />,
  },
];

/** 2026 holiday schedule, verbatim from content.md:1737. */
const HOLIDAYS = [
  { month: "Jan", day: "01", weekday: "Thursday", name: "New Year’s Day" },
  {
    month: "Jan",
    day: "19",
    weekday: "Monday",
    name: "Birthday of Martin Luther King, Jr.",
  },
  { month: "Feb", day: "16", weekday: "Monday", name: "Washington’s Birthday*" },
  { month: "May", day: "25", weekday: "Monday", name: "Memorial Day" },
  {
    month: "Jun",
    day: "19",
    weekday: "Friday",
    name: "Juneteenth National Independence Day",
  },
  { month: "Jul", day: "03", weekday: "Friday", name: "Independence Day" },
  { month: "Sep", day: "07", weekday: "Monday", name: "Labor Day" },
  { month: "Oct", day: "12", weekday: "Monday", name: "Columbus Day" },
  { month: "Nov", day: "11", weekday: "Wednesday", name: "Veterans Day" },
  { month: "Nov", day: "26", weekday: "Thursday", name: "Thanksgiving Day" },
  { month: "Dec", day: "25", weekday: "Friday", name: "Christmas Day" },
];

/** 2026 W-2 pay schedule, verbatim from content.md:1753. */
const PAY_PERIODS = [
  { no: "01", period: "01/01 – 01/15", check: "01/22/2026", day: "Thursday" },
  { no: "02", period: "01/16 – 01/31", check: "02/06/2026", day: "Friday" },
  { no: "03", period: "02/01 – 02/15", check: "02/20/2026", day: "Friday" },
  { no: "04", period: "02/16 – 02/28", check: "03/06/2026", day: "Friday" },
  { no: "05", period: "03/01 – 03/15", check: "03/20/2026", day: "Friday" },
  { no: "06", period: "03/16 – 03/31", check: "04/07/2026", day: "Tuesday" },
  { no: "07", period: "04/01 – 04/15", check: "04/22/2026", day: "Wednesday" },
  { no: "08", period: "04/16 – 04/30", check: "05/07/2026", day: "Thursday" },
  { no: "09", period: "05/01 – 05/15", check: "05/22/2026", day: "Friday" },
  { no: "10", period: "05/16 – 05/31", check: "06/05/2026", day: "Friday" },
  { no: "11", period: "06/01 – 06/15", check: "06/22/2026", day: "Monday" },
  { no: "12", period: "06/16 – 06/30", check: "07/07/2026", day: "Tuesday" },
  { no: "13", period: "07/01 – 07/15", check: "07/22/2026", day: "Wednesday" },
  { no: "14", period: "07/16 – 07/31", check: "08/07/2026", day: "Friday" },
  { no: "15", period: "08/01 – 08/15", check: "08/21/2026", day: "Friday" },
  { no: "16", period: "08/16 – 08/31", check: "09/04/2026", day: "Friday" },
  { no: "17", period: "09/01 – 09/15", check: "09/22/2026", day: "Tuesday" },
  { no: "18", period: "09/16 – 09/30", check: "10/07/2026", day: "Wednesday" },
  { no: "19", period: "10/01 – 10/15", check: "10/22/2026", day: "Thursday" },
  { no: "20", period: "10/16 – 10/31", check: "11/06/2026", day: "Friday" },
  { no: "21", period: "11/01 – 11/15", check: "11/20/2026", day: "Friday" },
  { no: "22", period: "11/16 – 11/30", check: "12/07/2026", day: "Monday" },
  { no: "23", period: "12/01 – 12/15", check: "12/22/2026", day: "Tuesday" },
  { no: "24", period: "12/16 – 12/31", check: "01/07/2027", day: "Thursday" },
];

export default function EmployeeResourcesPage() {
  return (
    <main>
      <UtilityHero
        eyebrow="Employees"
        title="Employee Resource Center"
        lead="Portals, downloads and the 2026 calendars, in one place."
        contact={{ label: "703-775-1564", href: "tel:+17037751564" }}
        practice={PRACTICE}
      />

      <Console items={SECTIONS} practice={PRACTICE} />

      <PortalTiles
        id="portals"
        eyebrow="Portals"
        title="Every system, and what it is for"
        lead="Time, pay, benefits and learning each live in their own system. This is the index."
        items={PORTALS}
        practice={PRACTICE}
        mark
      />

      <DownloadChips
        id="downloads"
        eyebrow="Downloads"
        title="Standard desktop software"
        items={DOWNLOADS}
        practice={PRACTICE}
      />

      <HolidayWall
        id="holidays"
        eyebrow="Holidays"
        title="2026 holiday schedule"
        lead="CompQsoft observes 11 federal holidays from January to December, as per the client schedule, calculated on a pro rata basis."
        holidays={HOLIDAYS}
        practice={PRACTICE}
        note={
          <p>
            *Designated “Washington’s Birthday” in section 6103(a) of title 5 of
            the United States Code, the law that specifies holidays for federal
            employees. Other institutions may use other names; it is our policy
            to always use the name designated in the law.
          </p>
        }
      />

      <PayLedger
        id="pay"
        eyebrow="Pay schedule"
        title="2026 pay periods and check dates"
        lead="This schedule applies to W-2 employees of CompQsoft. All periods run to the 15th and the end of the month."
        periods={PAY_PERIODS}
        practice={PRACTICE}
        note={
          <p>
            On a 1099 or subcontracting for CompQsoft? Email your question to{" "}
            <a
              href="mailto:financeteam@compqsoft.com"
              className="text-link underline decoration-brand-blue decoration-2 underline-offset-4 transition-colors duration-150 ease-brand hover:text-link-hover"
            >
              financeteam@compqsoft.com
            </a>
            .
          </p>
        }
      />

      <DarkStatement eyebrow="Quality policy" practice={PRACTICE}
        contacts={[
          { label: "HR", value: "703-775-1564", href: "tel:+17037751564" },
          {
            label: "Finance team",
            value: "financeteam@compqsoft.com",
            href: "mailto:financeteam@compqsoft.com",
          },
        ]}
      >
        <p>
          CompQsoft Inc. shall strive to exceed customer expectations of cost,
          quality, performance and delivery of products and services by
          continually improving and adopting the Quality Management System,
          technology, knowledge and skills, while encompassing all statutory,
          regulatory, health, safety and environmental requirements at the
          workplace.
        </p>
      </DarkStatement>

      <CtaBand
        practice={PRACTICE}
        title="Something not here?"
        lead="HR takes employee questions on 703-775-1564, weekdays."
        action={{ label: "Contact us", href: "/contact-us" }}
        secondary={{ label: "Life at CompQsoft", href: "/life-at-compqsoft" }}
      />
    </main>
  );
}
