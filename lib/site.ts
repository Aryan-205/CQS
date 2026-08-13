/**
 * Global chrome: nav tree, footer columns, company facts.
 * Transcribed from content.md Section 3 (lines 457-611).
 *
 * Paths reflect the rebuild's IA, not the old site's: /capabilities/ replaces
 * the misspelled /service-capabalities/, and /faq/ + /category/ + /opening/
 * URLs are redirects rather than routes. See the redirect table in CLAUDE.md.
 */

export type NavLink = { label: string; href: string };

export type NavColumn = {
  heading: string;
  href?: string;
  links: NavLink[];
};

export type NavItem = {
  label: string;
  href?: string;
  /** Which practice colours this panel's rules and eyebrows. */
  practice?: "government" | "commercial" | "neutral";
  columns?: NavColumn[];
  featured?: {
    eyebrow: string;
    title: string;
    href: string;
  };
};

/**
 * The old utility strip above the nav. The bar it belonged to is gone — the
 * three destinations are reachable from the Practices and Careers panels and
 * from the footer, so the strip was a third row of chrome for nothing.
 */
export const practiceEntries: (NavLink & { marker?: "red" | "blue" })[] = [
  { label: "Government", href: "/government-it-services", marker: "red" },
  { label: "Commercial", href: "/technologygroup", marker: "blue" },
  { label: "Employee Resources", href: "/employee-resources" },
];

export const primaryNav: NavItem[] = [
  {
    label: "Services",
    practice: "commercial",
    columns: [
      {
        heading: "Microsoft",
        href: "/technologygroup",
        links: [
          {
            label: "Microsoft Dynamics 365 ERP",
            href: "/services/dynamics-365-erp-applications",
          },
          {
            label: "Microsoft Dynamics 365 CE",
            href: "/services/dynamics-365-crm-applications",
          },
          { label: "Data & AI", href: "/services/data-analytics-ai" },
          {
            label: "Business Intelligence",
            href: "/services/business-intelligence-consulting-services",
          },
          {
            label: "Microsoft Modern Workplace",
            href: "/services/modern-workplace",
          },
          {
            label: "Power Platform & RPA",
            href: "/services/power-platform-and-rpa",
          },
          {
            label: "Cloud Migration",
            href: "/services/cloud-migration-and-modernization",
          },
          {
            label: "App Modernization",
            href: "/services/application-modernization",
          },
        ],
      },
      {
        heading: "Other platforms",
        links: [
          { label: "Cyber Security", href: "/services/cyber-security-services" },
          { label: "Salesforce", href: "/services/salesforce-services" },
          { label: "ServiceNow", href: "/services/servicenow-services" },
          { label: "SAP", href: "/services/sap" },
          {
            label: "Copilot & Generative AI",
            href: "/services/copilot-and-generative-ai-services",
          },
          {
            label: "Dynamics 365 Finance & Operations",
            href: "/services/dynamics-365-finance-and-operations",
          },
        ],
      },
    ],
    featured: {
      eyebrow: "Case study",
      title:
        "Dynamics 365 Finance centralizes operations for a leading real estate firm",
      href: "/case-study/dynamics-365-finance-case-study",
    },
  },
  {
    label: "Practices",
    practice: "government",
    columns: [
      {
        heading: "Government",
        href: "/government-it-services",
        links: [
          { label: "Government IT Services", href: "/government-it-services" },
          { label: "Compliance", href: "/compliance" },
          { label: "Prime Contracts", href: "/primecontracts" },
        ],
      },
      {
        heading: "Commercial",
        href: "/technologygroup",
        links: [
          { label: "Commercial IT Services", href: "/technologygroup" },
          { label: "Alliance Partners", href: "/alliance-partners" },
        ],
      },
    ],
    featured: {
      eyebrow: "Contract vehicles",
      title: "DISA ENCORE III, CIO-SP3, OASIS SB Pool 3, CMS SPARC, DLA JETS",
      href: "/primecontracts",
    },
  },
  {
    label: "Insights",
    practice: "neutral",
    columns: [
      {
        heading: "Insights",
        links: [
          { label: "Blogs", href: "/blogs" },
          { label: "Case Studies", href: "/case-studies" },
          { label: "Webinars", href: "/webinars" },
        ],
      },
    ],
  },
  {
    label: "Careers",
    practice: "neutral",
    columns: [
      {
        heading: "Careers",
        links: [
          { label: "Life at CompQsoft", href: "/life-at-compqsoft" },
          { label: "Open Positions", href: "/openings" },
          { label: "Employee Resources", href: "/employee-resources" },
        ],
      },
    ],
  },
  {
    label: "About",
    practice: "neutral",
    columns: [
      {
        heading: "About",
        links: [
          { label: "About Us", href: "/about-us" },
          { label: "Leadership Team", href: "/leadership-team" },
          { label: "Alliance Partners", href: "/alliance-partners" },
          { label: "Contact Us", href: "/contact-us" },
        ],
      },
    ],
  },
];

export const footerColumns: NavColumn[] = [
  {
    heading: "Services",
    links: [
      {
        label: "Microsoft Dynamics 365 ERP",
        href: "/services/dynamics-365-erp-applications",
      },
      {
        label: "Microsoft Dynamics 365 CE",
        href: "/services/dynamics-365-crm-applications",
      },
      { label: "Data & AI", href: "/services/data-analytics-ai" },
      {
        label: "Business Intelligence",
        href: "/services/business-intelligence-consulting-services",
      },
      { label: "Microsoft Modern Workplace", href: "/services/modern-workplace" },
      { label: "Power Platform & RPA", href: "/services/power-platform-and-rpa" },
      {
        label: "Cloud Migration",
        href: "/services/cloud-migration-and-modernization",
      },
      { label: "App Modernization", href: "/services/application-modernization" },
      { label: "Cyber Security", href: "/services/cyber-security-services" },
      { label: "Salesforce", href: "/services/salesforce-services" },
      { label: "ServiceNow", href: "/services/servicenow-services" },
      { label: "SAP", href: "/services/sap" },
    ],
  },
  {
    heading: "Practices",
    links: [
      { label: "Government", href: "/government-it-services" },
      { label: "Commercial", href: "/technologygroup" },
      { label: "Compliance", href: "/compliance" },
    ],
  },
  {
    heading: "Insights",
    links: [
      { label: "Blogs", href: "/blogs" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Webinars", href: "/webinars" },
    ],
  },
  {
    heading: "Careers",
    links: [
      { label: "Life at CompQsoft", href: "/life-at-compqsoft" },
      { label: "Open Positions", href: "/openings" },
    ],
  },
  {
    heading: "About us",
    links: [
      { label: "About", href: "/about-us" },
      { label: "Leadership Team", href: "/leadership-team" },
      { label: "Alliance Partners", href: "/alliance-partners" },
      { label: "Contact Us", href: "/contact-us" },
    ],
  },
];

export const utilityLinks: NavLink[] = [
  { label: "Careers", href: "/life-at-compqsoft" },
  { label: "Employee Resource Center", href: "/employee-resources" },
  { label: "Contract Vehicles", href: "/primecontracts" },
  { label: "Site Map", href: "/sitemap" },
  { label: "Full Disclosures", href: "/full-disclosures" },
  { label: "Unsubscribe", href: "/unsubscribe" },
];

export const legalLinks: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Cookies Policy", href: "/cookies-policy" },
];

export const socials: NavLink[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/compqsoft-inc" },
  { label: "Facebook", href: "https://www.facebook.com/compqsoft" },
  { label: "X", href: "https://twitter.com/CompQsoft" },
  { label: "YouTube", href: "https://www.youtube.com/@CompQsoft" },
];

export const company = {
  name: "CompQsoft",
  tagline: "The IT Edge for Lean Government",
  corporateOffice: "161 Fort Evans Road, Unit #225, Leesburg, VA 20176",
  houstonOffice:
    "11445 Compaq Center, West DR BLDG CCA6, Houston, TX 77070-1433",
  phones: [
    { label: "Commercial customers", value: "571-200-3923" },
    { label: "Government customers", value: "571-999-6955" },
    { label: "Vendors, Employees, HR", value: "703-775-1564" },
  ],
  identifiers: [
    { label: "UEI", value: "KTU8QJE27RN8" },
    { label: "CAGE", value: "1TTA2" },
    { label: "FEIN", value: "76-0554431" },
    { label: "DUNS", value: "140460283" },
    { label: "NAICS", value: "541512" },
  ],
} as const;
