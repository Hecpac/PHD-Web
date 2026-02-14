import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { JsonLd } from "@/components/ui/json-ld";
import { SectionHeading } from "@/components/ui/section-heading";
import { createBreadcrumbSchema } from "@/lib/seo/schema";
import { getSiteUrl } from "@/lib/config/site";

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = getSiteUrl();

  return {
    title: "About | DFW Design-Build Team",
    description:
      "Learn how our architecture + builder workflow delivers modern custom homes across the DFW Metroplex.",
    openGraph: {
      title: "About | DFW Design-Build Team",
      description:
        "Learn how our architecture + builder workflow delivers modern custom homes across the DFW Metroplex.",
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
      "Architecture decisions are documented and enforced through construction — not diluted by value-engineering shortcuts.",
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
    stat: "60+",
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
    title: "DFW-only focus",
    description:
      "We build exclusively in the Dallas-Fort Worth Metroplex. This constraint is intentional — it means deeper trade relationships, faster permitting knowledge, and construction timelines calibrated to local conditions.",
  },
  {
    title: "Architecture-first, builder-backed",
    description:
      "Most builders treat design as a preliminary step. We treat it as the foundation. Our team includes architecture-trained professionals who protect design intent through every construction decision.",
  },
  {
    title: "No surprises",
    description:
      "Our phased process with documented decision gates means you always know the scope, cost, and timeline before the next phase begins. Change orders are documented with full cost and schedule impact before any work proceeds.",
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
        <Container className="space-y-8">
          <SectionHeading
            as="h1"
            eyebrow="About"
            title="A design-build practice focused on modern homes in DFW"
            description="We combine architecture rigor with construction control to deliver custom homes that match the drawings, meet the budget, and finish on schedule."
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
        <Container className="space-y-8">
          <SectionHeading
            eyebrow="Track Record"
            title="Numbers from the field"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {differentiators.map((item) => (
              <div key={item.label} className="space-y-2">
                <p className="text-5xl font-bold tabular-nums text-accent">{item.stat}</p>
                <p className="text-base font-bold text-ink">{item.label}</p>
                <p className="text-sm leading-6 text-muted">{item.detail}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Values section */}
      <section className="section-shell border-t border-line">
        <Container className="space-y-8">
          <SectionHeading
            eyebrow="How We Think"
            title="What sets us apart in DFW"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {values.map((value) => (
              <article key={value.title} className="border border-line bg-surface p-6">
                <h3 className="text-base font-bold text-ink">{value.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{value.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Credentials section */}
      <section className="section-shell border-t border-line section-bone">
        <Container className="space-y-6">
          <SectionHeading
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
