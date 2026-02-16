import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { CtaLink } from "@/components/ui/cta-link";
import { JsonLd } from "@/components/ui/json-ld";
import { SectionHeading } from "@/components/ui/section-heading";
import { getCtaConfig, getSiteUrl } from "@/lib/config/site";
import { createBreadcrumbSchema } from "@/lib/seo/schema";
import { DFW_CITIES } from "@/lib/types/content";

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = getSiteUrl();

  return {
    title: "Dallas-Fort Worth Service Area",
    description:
      "Custom home design-build service area covering Dallas, Fort Worth, Plano, Frisco, Southlake, and the entire DFW Metroplex.",
    openGraph: {
      title: "Dallas-Fort Worth Service Area | DFW Modern Design-Build",
      description:
        "Custom home design-build service area covering Dallas, Fort Worth, Plano, Frisco, Southlake, and the entire DFW Metroplex.",
    },
    alternates: {
      canonical: `${siteUrl}/dallas-fort-worth`,
    },
  };
}

const whyDfwOnly = [
  {
    title: "Deeper trade relationships",
    description:
      "Years of building exclusively in DFW means we work with the same vetted subcontractors project after project. This reduces risk, improves quality, and keeps timelines tight.",
  },
  {
    title: "Faster permitting knowledge",
    description:
      "Every DFW municipality has different codes, review timelines, and inspection processes. We know the specifics for each city we serve — from Highland Park's architectural review board to Prosper's rapid-growth infrastructure requirements.",
  },
  {
    title: "Climate-calibrated construction",
    description:
      "North Texas expansive clay soils, summer heat loads, and storm patterns demand specific foundation, envelope, and drainage strategies. Our methods are tuned for DFW conditions, not generic best practices.",
  },
];

const marketFacts = [
  { stat: "7.6M+", label: "Metro population", detail: "4th largest metro in the U.S." },
  { stat: "16", label: "Cities served", detail: "From Dallas to Flower Mound" },
  { stat: "$250–$500+", label: "Cost per sqft range", detail: "Varies by city, lot, and finishes" },
  { stat: "12–18 mo", label: "Typical build timeline", detail: "For 3,500–6,000 sqft homes" },
];

export default function DallasFortWorthPage() {
  const { scheduleUrl, phoneHref, phoneDisplay } = getCtaConfig();

  return (
    <>
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Dallas-Fort Worth", href: "/dallas-fort-worth" },
        ])}
      />

      {/* Hero */}
      <section className="section-shell" aria-labelledby="dfw-heading">
        <Container swiss className="space-y-8">
          <SectionHeading
            as="h1"
            eyebrow="Service Area"
            title="We build exclusively in Dallas-Fort Worth"
            description="Geographic focus is a strategic choice, not a limitation. By serving only the DFW Metroplex, we deliver better outcomes — faster permitting, deeper trade networks, and construction methods proven for North Texas conditions."
          />

          {/* DFW market stats */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {marketFacts.map((item) => (
              <div key={item.label} className="space-y-1">
                <p className="text-4xl font-bold tabular-nums text-accent">{item.stat}</p>
                <p className="text-sm font-bold text-ink">{item.label}</p>
                <p className="text-sm text-muted">{item.detail}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Cities grid */}
      <section className="section-shell border-t border-line section-bone">
        <Container swiss className="space-y-8">
          <SectionHeading
            eyebrow="Cities We Serve"
            title="16 communities across the Metroplex"
            description="We accept projects in the following DFW cities and their surrounding neighborhoods."
          />

          <div className="grid grid-cols-2 gap-px border border-line sm:grid-cols-3 md:grid-cols-4">
            {DFW_CITIES.map((city) => (
              <div
                key={city}
                className="flex items-center gap-3 border border-line bg-surface px-4 py-4"
              >
                <span className="h-2 w-2 shrink-0 bg-accent" aria-hidden="true" />
                <span className="text-sm font-medium text-ink">{city}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Why DFW only */}
      <section className="section-shell border-t border-line">
        <Container swiss className="space-y-8">
          <SectionHeading
            eyebrow="Why DFW Only"
            title="Focus produces better outcomes"
          />

          <div className="grid gap-6 md:grid-cols-3">
            {whyDfwOnly.map((item) => (
              <article key={item.title} className="border border-line bg-surface p-6">
                <h3 className="text-base font-bold text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{item.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Policy + CTA */}
      <section className="section-shell border-t border-line section-bone">
        <Container swiss className="space-y-6">
          <SectionHeading
            eyebrow="Policy"
            title="DFW-only project intake"
          />

          <div className="border border-line bg-surface p-6">
            <ul className="space-y-3 text-sm leading-6 text-muted">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden="true" />
                All active project intake is limited to Dallas-Fort Worth locations.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden="true" />
                Project pages and recommendations are scoped to DFW market realities.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden="true" />
                Out-of-area inquiries are redirected to local partner recommendations when possible.
              </li>
            </ul>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <CtaLink
                href={scheduleUrl}
                target="_blank"
                rel="noreferrer"
                eventName="cta_schedule_click"
              >
                Schedule a DFW Consultation
              </CtaLink>
              <CtaLink href={phoneHref} eventName="cta_call_click" variant="secondary">
                Call {phoneDisplay}
              </CtaLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
