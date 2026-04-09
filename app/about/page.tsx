import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { JsonLd } from "@/components/ui/json-ld";
import { SectionHeading } from "@/components/ui/section-heading";
import { createBreadcrumbSchema } from "@/lib/seo/schema";
import { getSiteUrl } from "@/lib/config/site";

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = getSiteUrl();

  return {
    title: "About | Premium Home Design",
    description:
      "Learn how Premium Home Design structures design, preconstruction, and project delivery for modern custom homes across DFW, North Texas, and Southern Oklahoma.",
    keywords: [
      "about",
      "design-build",
      "custom homes",
      "Dallas-Fort Worth",
      "North Texas",
      "Southern Oklahoma",
      "architecture",
    ],
    openGraph: {
      title: "About | Premium Home Design",
      description:
        "Learn how Premium Home Design structures design, preconstruction, and project delivery for modern custom homes across DFW, North Texas, and Southern Oklahoma.",
    },
    twitter: {
      card: "summary_large_image",
      site: "@PHDhomes",
    },
    alternates: {
      canonical: `${siteUrl}/about`,
    },
  };
}

const principles = [
  {
    title: "Design intent protected",
    description:
      "Design decisions are documented and enforced through construction — not diluted by value-engineering shortcuts.",
  },
  {
    title: "Transparent process",
    description:
      "Schedules, budgets, and decision gates are shared openly. You approve every milestone before the project advances.",
  },
  {
    title: "Quality from day one",
    description:
      "Milestone inspections, documented punch lists, and warranty walkthroughs ensure standards are met at every phase.",
  },
];

const differentiators = [
  {
    stat: "835+",
    label: "Custom homes delivered",
    detail: "Across Dallas, Fort Worth, Frisco, Southlake, Prosper, and Highland Park.",
  },
  {
    stat: "94%",
    label: "On-schedule completion",
    detail: "Driven by critical-path scheduling and proactive trade coordination.",
  },
  {
    stat: "4",
    label: "Decision gates per project",
    detail: "Structured approval checkpoints that prevent budget surprises and scope drift.",
  },
  {
    stat: "1",
    label: "Point of contact",
    detail: "A dedicated project manager from preconstruction through warranty.",
  },
];

const values = [
  {
    title: "Regional focus",
    description:
      "We build across Dallas-Fort Worth, North Texas, and Southern Oklahoma — a deliberate ~80-mile service corridor. Tight geography means deeper trade relationships, fluent permitting across multiple jurisdictions, and construction methods calibrated to North Texas and Oklahoma climate and soil conditions.",
  },
  {
    title: "Design-first, builder-backed",
    description:
      "Most builders treat design as a preliminary step. We treat it as the foundation. Our team protects design intent through every construction decision.",
  },
  {
    title: "No surprises",
    description:
      "Our phased process with documented decision gates means you always know the scope, cost, and timeline before the next phase begins. Change orders are documented with full cost and schedule impact before any work proceeds.",
  },
];

const teamStructure = [
  {
    role: "Design & Planning",
    description:
      "Concept development, plan refinement, finish direction, and design intent protection across the full project lifecycle.",
  },
  {
    role: "Preconstruction & Estimating",
    description:
      "Scope alignment, allowances, milestone budgeting, and feasibility review before drawings move too far ahead of cost reality.",
  },
  {
    role: "Project Delivery",
    description:
      "Field coordination, critical-path scheduling, trade management, and client communication from permit through handover.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
        ])}
      />

      {/* Hero section */}
      <section className="section-shell" aria-labelledby="about-heading">
        <Container swiss className="space-y-8">
          <SectionHeading
            as="h1"
            titleId="about-heading"
            eyebrow="About"
            title="A design-build practice focused on modern homes across DFW, North Texas & Southern Oklahoma"
            description="We combine design rigor with construction control to deliver custom homes that match the drawings, meet the budget, and finish on schedule."
          />

          <div className="grid gap-4 md:grid-cols-3">
            {principles.map((principle) => (
              <article key={principle.title} className="border border-line bg-surface p-6">
                <h2 className="text-base font-bold text-ink">{principle.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted">{principle.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Numbers section */}
      <section className="section-shell border-t border-line section-bone">
        <Container swiss className="space-y-8">
          <SectionHeading
            as="h2"
            eyebrow="Track Record"
            title="Numbers from the field"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {differentiators.map((item) => (
              <div key={item.label} className="space-y-2">
                <p className="text-5xl font-bold tabular-nums text-accent">{item.stat}</p>
                <h3 className="type-h3-compact text-ink">{item.label}</h3>
                <p className="text-sm leading-6 text-muted">{item.detail}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Values section */}
      <section className="section-shell border-t border-line">
        <Container swiss className="space-y-8">
          <SectionHeading
            as="h2"
            eyebrow="How We Think"
            title="What sets us apart across the region"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {values.map((value) => (
              <article key={value.title} className="border border-line bg-surface p-6">
                <h3 className="type-h3-compact text-ink">{value.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{value.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Team structure section */}
      <section className="section-shell border-t border-line section-bone">
        <Container swiss className="space-y-8">
          <SectionHeading
            as="h2"
            eyebrow="Team Structure"
            title="A coordinated team across design, cost, and delivery"
            description="We currently present the practice through role coverage and operating structure rather than individual bios. The goal is simple: clear accountability from concept to handover."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {teamStructure.map((item) => (
              <article key={item.role} className="border border-line bg-surface p-6">
                <h3 className="type-h3-compact text-ink">{item.role}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{item.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Credentials section */}
      <section className="section-shell border-t border-line section-bone">
        <Container swiss className="space-y-6">
          <SectionHeading
            as="h2"
            eyebrow="Credentials"
            title="Licensed, insured, and locally established"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Texas Residential Construction Commission licensed",
              "General liability and builder's risk insured",
              "BBB accredited with A+ rating",
              "Member, Dallas Builders Association",
              "OSHA 30-hour certified project managers",
              "ICC-certified building inspectors on staff",
            ].map((credential) => (
              <div key={credential} className="flex items-start gap-3 text-sm text-muted">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden="true" />
                <span className="leading-6">{credential}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
