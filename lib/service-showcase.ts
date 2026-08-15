/**
 * Authored, per-service sections for the service template.
 *
 * The CMS record behind a service page carries a heading and three or four
 * paragraphs — enough for the overview band and nothing else. Everything a
 * buyer actually asks next (what is in the suite, what changes versus what
 * they run today, in what order, on what commercial model) has to be written.
 *
 * These entries are authored rather than archived, so they live here rather
 * than under `content/`, which `scripts/parse-content.mjs` overwrites — the
 * same split `lib/service-faqs.ts` uses.
 *
 * Claims are held to what the site already states or to documented Microsoft
 * platform behaviour. No client names, no invented metrics, no testimonials:
 * the one quotation is CompQsoft's own copy from content.md, attributed to
 * the company rather than put in a customer's mouth.
 *
 * Only `dynamics-365-erp-applications` is populated. A service with no entry
 * renders exactly as it did before.
 */

export type ServiceShowcase = {
  shift?: {
    title: string;
    lead?: string;
    before: { label: string; items: string[] };
    after: { label: string; items: string[] };
  };
  modules?: {
    title: string;
    lead?: string;
    items: { title: string; description: string; href?: string }[];
  };
  quote?: { text: string; attribution: string; role?: string };
  comparison?: {
    title: string;
    lead?: string;
    columns: string[];
    rows: { label: string; values: (boolean | string)[] }[];
    footnote?: string;
  };
  readiness?: {
    title: string;
    lead?: string;
    signals: { title: string; description: string }[];
    note?: string;
  };
  phases?: {
    title: string;
    lead?: string;
    items: {
      title: string;
      duration: string;
      description: string;
      outputs?: string[];
    }[];
  };
  plans?: {
    title: string;
    lead?: string;
    items: {
      name: string;
      duration: string;
      summary: string;
      includes: string[];
      featured?: boolean;
    }[];
  };
  roles?: {
    title: string;
    lead?: string;
    items: { role: string; headline: string; body: string }[];
  };
  ecosystem?: {
    title: string;
    lead?: string;
    hub: { title: string; caption?: string };
    nodes: { title: string; caption: string }[];
  };
  callout?: string;
};

const SHOWCASE: globalThis.Record<string, ServiceShowcase> = {
  "dynamics-365-erp-applications": {
    shift: {
      title: "What changes when the ERP moves to the cloud",
      lead: "The overview above is the argument in prose. This is the same argument in two columns — the constraints an on-premises ERP imposes, and what replaces each of them.",
      before: {
        label: "On-premises ERP today",
        items: [
          "Upgrades are projects. Version drift builds until a re-implementation is the only way out.",
          "Capacity is bought years ahead, sized for a peak that may never arrive.",
          "Reporting runs on extracts, so finance and operations reconcile figures instead of acting on them.",
          "Customizations are code in the core, and every one of them is a reason not to upgrade.",
          "AI and automation sit outside the system of record, if they exist at all.",
        ],
      },
      after: {
        label: "With Dynamics 365",
        items: [
          "Continuous service updates on Microsoft's release cadence — no upgrade project to fund.",
          "Capacity follows demand, and the cost of it moves from capital to operating spend.",
          "Finance, supply chain and project data share one model, so one figure has one definition.",
          "Extensions sit beside the core through Dataverse and Power Platform, not inside it.",
          "AI, automation and analytics are part of the platform, governed with the rest of it.",
        ],
      },
    },

    modules: {
      title: "The applications in the ERP suite",
      lead: "Dynamics 365 is deployed application by application, not as one monolith. Most programmes start with finance or supply chain and add from there.",
      items: [
        {
          title: "Dynamics 365 Finance",
          description:
            "Comprehensive financial management: streamline operations, make informed decisions, and drive growth with confidence.",
          href: "/capabilities/dynamics-365-finance",
        },
        {
          title: "Dynamics 365 Supply Chain",
          description:
            "Intelligent insights and real-time visibility that reduce cost and improve collaboration across the supply chain.",
          href: "/capabilities/dynamics-365-supply-chain",
        },
        {
          title: "Dynamics 365 Project Operations",
          description:
            "End-to-end project management — plan, execute and deliver while protecting profitability and client satisfaction.",
          href: "/capabilities/dynamics-365-project-operations",
        },
        {
          title: "Dynamics 365 Human Resources",
          description:
            "AI-driven insight and tooling that streamlines HR processes and lifts employee engagement.",
          href: "/capabilities/dynamics-365-human-resources",
        },
        {
          title: "Intelligent Order Management",
          description:
            "Order orchestration across every channel and touchpoint, so fulfilment holds up as demand moves.",
          href: "/capabilities/dynamics-365-intelligent-order-management",
        },
        {
          title: "Business Central",
          description:
            "The mid-market path: one broadly standard operating model, deployed quickly, with room to grow into Finance & Operations.",
          href: "/services/dynamics-365-finance-and-operations",
        },
      ],
    },

    quote: {
      // Verbatim from the service record in content.md — the company's own
      // position, attributed to the company. Not a customer testimonial.
      text: "Confidently move to the cloud with AI-powered ERP and unlock the agility needed to lead the way in today's rapidly evolving marketplace.",
      attribution: "CompQsoft",
      role: "Microsoft Dynamics 365 practice",
    },

    comparison: {
      title: "Three ways to modernize, and what each one actually buys",
      lead: "Every ERP conversation starts with the same three options. They are not equivalent, and the difference is worth stating before the business case is written.",
      columns: [
        "Stay on-premises",
        "Lift and shift to IaaS",
        "Dynamics 365 cloud ERP",
      ],
      rows: [
        {
          label: "Platform updates",
          values: ["Upgrade projects", "Upgrade projects", "Continuous service updates"],
        },
        {
          label: "Capacity model",
          values: ["Sized for peak", "Elastic infrastructure", "Elastic, per application"],
        },
        { label: "Cost profile", values: ["Capital", "Mixed", "Operating"] },
        { label: "AI and Copilot capabilities built in", values: [false, false, true] },
        { label: "Embedded Power BI and shared data model", values: [false, false, true] },
        { label: "Extend without touching the core", values: [false, false, true] },
        {
          label: "Data centre and hardware refresh",
          values: ["Yours", "Provider's", "Provider's"],
        },
        {
          label: "Time before the first measurable outcome",
          values: ["Long", "Short, but nothing changes functionally", "Per release wave"],
        },
      ],
      footnote:
        "Lift and shift is a legitimate first move where a data centre exit has a deadline. It buys time; it does not modernize the ERP.",
    },

    readiness: {
      title: "Signals it is time to move",
      lead: "Recognise four or more of these and the question has stopped being whether to modernize.",
      signals: [
        {
          title: "You are two or more versions behind",
          description:
            "Each skipped release makes the next upgrade larger, and the gap only closes in one direction.",
        },
        {
          title: "Month-end runs on spreadsheets",
          description:
            "Figures are extracted, reconciled and re-keyed before anyone can act on them.",
        },
        {
          title: "Supply chain visibility stops at your own walls",
          description:
            "Supplier, inventory and demand signals arrive too late to change a decision.",
        },
        {
          title: "Customizations block every upgrade",
          description:
            "Code in the core means the cost of staying current is a re-implementation.",
        },
        {
          title: "Hardware refresh is on the horizon",
          description:
            "A capital cycle is the cheapest possible moment to ask whether the capital is needed at all.",
        },
        {
          title: "AI is on the roadmap with nowhere to land",
          description:
            "Copilot and analytics need a governed data platform underneath them, not a data extract.",
        },
      ],
      note: "Recognise most of these? The assessment is the next step, and it is scoped in weeks rather than quarters.",
    },

    phases: {
      title: "How an ERP programme runs",
      lead: "The four stages above describe every CompQsoft engagement. This is what they look like on an ERP programme specifically — durations are indicative and follow entity count, process complexity and how much legacy data has to move.",
      items: [
        {
          title: "Assessment and roadmap",
          duration: "Weeks 1–4",
          description:
            "We map the current environment, integrations, data quality and process complexity, then set the wave sequence against your objectives. Nothing is proposed before this is done.",
          outputs: ["Current-state map", "Fit-gap analysis", "Prioritized roadmap", "Business case inputs"],
        },
        {
          title: "Design and pilot",
          duration: "Weeks 4–12",
          description:
            "Target process design against your requirements rather than a template, a configured pilot in a single entity or function, and the integration and data migration approach proved on real data.",
          outputs: ["Solution design", "Configured pilot", "Migration approach", "Integration design"],
        },
        {
          title: "Implementation in waves",
          duration: "Per release",
          description:
            "Delivery runs on Agile and Scrum with DevSecOps practices and CI/CD throughout, releasing by entity, function or geography so value lands with each wave instead of at the end of the programme.",
          outputs: ["Working increments", "Data migration runs", "UAT and cutover", "Adoption and enablement"],
        },
        {
          title: "Sustainment and optimization",
          duration: "Ongoing",
          description:
            "ITSM-based support covering incident, problem and change management, alongside continuous optimization — performance, licence and cost management, and adoption of new platform capabilities as they ship.",
          outputs: ["Managed support", "Release adoption", "Cost management", "Continuous improvement"],
        },
      ],
    },

    plans: {
      title: "Ways to start",
      lead: "Scope and commercial model follow the assessment. We will tell you which one fits before you ask for a number.",
      items: [
        {
          name: "ERP readiness assessment",
          duration: "2–4 weeks",
          summary:
            "A fixed-scope look at what you run today and what moving would take. Ends in a roadmap you own, whoever delivers it.",
          includes: [
            "Current-state and integration map",
            "Fit-gap against Dynamics 365",
            "Data quality and migration sizing",
            "Prioritized roadmap and business case inputs",
          ],
          featured: true,
        },
        {
          name: "Guided implementation",
          duration: "Phased, per wave",
          summary:
            "Full delivery of the roadmap in release waves — design, configuration, migration, integration and cutover, with your team working alongside ours.",
          includes: [
            "Target process design",
            "Configuration and extension build",
            "Data migration and integration",
            "UAT, cutover and enablement",
          ],
        },
        {
          name: "Managed ERP support",
          duration: "Ongoing",
          summary:
            "ITSM-based sustainment after go-live, plus the optimization work that keeps a live ERP current instead of drifting back into version debt.",
          includes: [
            "Incident, problem and change management",
            "Release adoption and regression testing",
            "Performance and cost optimization",
            "Roadmap reviews as capabilities ship",
          ],
        },
      ],
    },

    roles: {
      title: "The same programme, from each seat that has to sign it off",
      lead: "An ERP decision is rarely one person's. These are the four the business case usually has to satisfy.",
      items: [
        {
          role: "Finance",
          headline: "Close faster, and on figures nobody has to reconcile",
          body: "Finance, supply chain and project data sit in one model, so a figure has one definition across the organization. Reporting moves off extracts and onto embedded analytics, and the cost of the platform moves from a capital cycle to operating spend that tracks what you actually use.",
        },
        {
          role: "Supply chain",
          headline: "See the disruption while there is still time to act on it",
          body: "Real-time visibility across inventory, demand and supplier signals, with order orchestration that holds across channels. Planning and fulfilment work from the same data as finance, so a decision made in one is visible in the other immediately rather than at month-end.",
        },
        {
          role: "IT and the ERP owner",
          headline: "Stay current without an upgrade project to fund",
          body: "Continuous service updates replace version-by-version upgrades. Extensions sit beside the core through Dataverse and Power Platform instead of in it, so customization stops being the reason you cannot move — and the hardware refresh cycle stops being your problem.",
        },
        {
          role: "The programme sponsor",
          headline: "Value lands per wave, not at the end",
          body: "Delivery runs in release waves by entity, function or geography, so the business sees working capability on a cadence and the programme can be re-sequenced against what it learns. Assessment first means the scope you approve is based on what is running, not on a template.",
        },
      ],
    },

    ecosystem: {
      title: "What the ERP is connected to",
      lead: "Dynamics 365 ERP is not deployed on its own. These are the platform pieces around it that carry the data, the extensions and the AI.",
      hub: {
        title: "Dynamics 365 ERP",
        caption: "Finance, supply chain, projects and people, on one data model",
      },
      nodes: [
        {
          title: "Dataverse",
          caption: "The shared data layer every application and extension reads from.",
        },
        {
          title: "Power BI",
          caption: "Embedded reporting on live data instead of on nightly extracts.",
        },
        {
          title: "Power Apps and Power Automate",
          caption: "Process automation and interfaces built beside the core, not inside it.",
        },
        {
          title: "Azure",
          caption: "Identity, integration, data services and the security posture underneath.",
        },
        {
          title: "Dynamics 365 CRM",
          caption: "Sales and service on the same platform, so the customer record is one record.",
        },
        {
          title: "Microsoft 365 and Teams",
          caption: "Approvals and collaboration where people already work.",
        },
        {
          title: "Copilot and AI",
          caption: "Assistive and analytical AI governed with the rest of the tenant.",
        },
        {
          title: "Legacy and third-party systems",
          caption: "Where a system stays in place, we build the integration rather than force a rewrite.",
        },
      ],
    },

    callout:
      "Every engagement opens with an assessment, not a proposal.",
  },
};

export const serviceShowcase = (slug: string): ServiceShowcase | undefined =>
  SHOWCASE[slug];
