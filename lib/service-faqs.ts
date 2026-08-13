/**
 * Supplementary service FAQs.
 *
 * The CMS set in `content/faqs.json` is generated from content.md and carries
 * between zero and four questions per service — three services have none at
 * all, so the accordion never renders for them. These records top the CMS set
 * up. They are authored, not archived, so they live here rather than in
 * `content/`, which `scripts/parse-content.mjs` overwrites.
 *
 * Answers restate facts already on the site — the four-stage engagement model,
 * the DevSecOps and Agile delivery posture, ITSM sustainment, the federal
 * registrations — rather than introducing new claims.
 */
import type { Record } from "@/lib/content";

type Entry = { question: string; answer: string };

function toRecord(slug: string, category: string | undefined, entry: Entry): Record {
  const id = entry.question
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return {
    title: entry.question,
    // Namespaced so an authored key can never collide with a CMS FAQ slug.
    slug: `cq-${slug}-${id}`,
    url: `/services/${slug}#faq`,
    category,
    blocks: [{ type: "para", text: entry.answer }],
  };
}

/** Asked of every service, so they are written without a service name in them. */
const SHARED: Entry[] = [
  {
    question: "How does an engagement with CompQsoft start?",
    answer:
      "Every engagement opens with a comprehensive assessment. We map your current environment, constraints, integrations and objectives before proposing anything, so the scope you approve is based on what is actually running rather than on a template. The assessment output is a prioritized roadmap with the effort, sequence and dependencies made explicit.",
  },
  {
    question: "What delivery methodology do you use?",
    answer:
      "Delivery runs on Agile and Scrum with DevSecOps practices and CI/CD pipelines throughout, so security and quality gates sit inside the pipeline rather than at the end of it. You get working increments on a fixed cadence, a shared backlog, and demonstrable progress between releases instead of a single hand-off at the close of the project.",
  },
  {
    question: "What happens after go-live?",
    answer:
      "Go-live is a milestone, not the end of the engagement. Ongoing support runs on ITSM-based processes covering incident, problem and change management, alongside continuous optimization — performance tuning, cost management, and adoption of new platform capabilities as they ship.",
  },
  {
    question: "Can CompQsoft work alongside our in-house team or an incumbent vendor?",
    answer:
      "Yes. We deliver as a full engagement team, as a co-delivery partner working inside your existing structure, or as targeted specialist capacity where a particular skill set is missing. Knowledge transfer is part of the work in every model — the objective is a team that can operate the solution once we step back.",
  },
  {
    question: "Do you support federal agencies as well as commercial organizations?",
    answer:
      "Both. CompQsoft has served commercial clients and federal agencies — including the Department of Defense, DHS and HHS — for over 25 years, and holds UEI KTU8QJE27RN8 and CAGE 1TTA2 with a primary NAICS of 541512. Commercial and government work is delivered by the same engineering organization, so federal security and compliance discipline carries into commercial engagements.",
  },
  {
    question: "How are engagements priced and scoped?",
    answer:
      "Scope and commercial model follow the assessment. Well-defined work with a stable scope suits a fixed-price statement of work; discovery-led or evolving programs suit time-and-materials or a managed capacity model. We will tell you which one fits before you ask for a number.",
  },
  {
    question: "How do we get started?",
    answer:
      "Tell us where you are today and what outcome you need. Reach the commercial team on 571-200-3923, the government team on 571-999-6955, or use the contact form — the first conversation is a scoping discussion, not a sales call.",
  },
];

/** Service-specific additions, keyed by service slug. */
const PER_SERVICE: globalThis.Record<string, Entry[]> = {
  "copilot-and-generative-ai-services": [
    {
      question: "Is our organization ready for Microsoft 365 Copilot?",
      answer:
        "Copilot surfaces whatever a user already has access to, so readiness is mostly a data and permissions question rather than a licensing one. We start with strategic planning and assessment: reviewing tenant configuration, SharePoint and Teams permissions, data classification and oversharing risk, then remediating before the first licence is assigned.",
    },
    {
      question: "Where should an organization use Copilot rather than a custom AI solution?",
      answer:
        "Copilot is the right answer where the work sits inside Microsoft 365 — drafting, summarizing, meeting recall, and search across existing content. A custom AI solution earns its cost where the process is specific to your business, spans systems Copilot cannot reach, or needs its own model behaviour and guardrails. Most clients end up running both.",
    },
    {
      question: "How do you govern generative AI once it is deployed?",
      answer:
        "Governance is designed alongside the deployment, not after it: usage policy, data boundaries, retention, auditing, and a review loop for prompts and outputs. Innovation and continuous improvement then runs as an ongoing capability, so new platform features are evaluated and adopted deliberately rather than by default.",
    },
  ],
  "dynamics-365-finance-and-operations": [
    {
      question: "What is the difference between Dynamics 365 Finance & Operations and Business Central?",
      answer:
        "Business Central targets small and mid-sized organizations with a single, broadly standard operating model. Finance & Operations is built for large or diversified companies — multiple legal entities, currencies and jurisdictions, complex supply chain, manufacturing and warehouse operations — and carries the depth in financial management, tax and asset management that scale requires.",
    },
    {
      question: "How long does a Dynamics 365 F&O implementation take?",
      answer:
        "It depends on entity count, process complexity and how much legacy data has to move. A single-entity finance-first rollout is a matter of months; a multi-entity global program covering finance, supply chain, warehouse and manufacturing is longer and is phased deliberately, so value lands with each release instead of at the end.",
    },
    {
      question: "Can Dynamics 365 F&O integrate with the systems we already run?",
      answer:
        "Yes. F&O integrates through Dataverse and the wider Power Platform, so CRM applications, Power BI reporting, Power Automate workflows and third-party systems share one data layer. Where a legacy system stays in place, we build the integration rather than force a rewrite.",
    },
  ],
  "business-intelligence-consulting-services": [
    {
      question: "Where should we start if we have no BI capability today?",
      answer:
        "With strategy, not tooling. We analyze what decisions the business actually needs to make, define a BI strategy aligned to those goals, and only then design the data warehouse, integration and visualization layers. Starting with a dashboard produces a dashboard nobody uses.",
    },
    {
      question: "Do we need a data warehouse, or can we report straight from source systems?",
      answer:
        "Direct reporting works while there is one system and one definition of each metric. Once figures have to reconcile across finance, operations and CRM, a warehouse and master data management are what make the numbers agree. We size that layer to the question you are trying to answer, not to a reference architecture.",
    },
    {
      question: "How do you make self-service BI work without losing control of the numbers?",
      answer:
        "Governed self-service: certified datasets and shared measures owned centrally, with report building open to the business on top of them. Combined with data strategy and master data management, that gives analysts freedom over presentation while a metric keeps one definition across the organization.",
    },
  ],
};

/**
 * Authored FAQs for a service, ready to append to the CMS set. Records are
 * tagged with the service's category so they read as part of the same group.
 */
export function extraServiceFaqs(slug: string, category?: string): Record[] {
  const entries = [...(PER_SERVICE[slug] ?? []), ...SHARED];
  return entries.map((entry) => toRecord(slug, category, entry));
}
