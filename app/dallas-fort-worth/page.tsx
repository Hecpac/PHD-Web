import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { CtaLink } from "@/components/ui/cta-link";
import { JsonLd } from "@/components/ui/json-ld";
import { LeadMagnetBanner } from "@/components/ui/lead-magnet-banner";
import { SectionHeading } from "@/components/ui/section-heading";
import { getCtaConfig, getSiteUrl } from "@/lib/config/site";
import { createBreadcrumbSchema } from "@/lib/seo/schema";
import { SERVICE_AREA_CITIES } from "@/lib/types/content";

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = getSiteUrl();

  return {
    title: "Service Area — DFW & North Texas",
    description:
      "Custom home design-build service area covering Dallas-Fort Worth & North Texas (Sherman, Denton, Weatherford) — across the DFW Metroplex & North Texas.",
    keywords: [
      "Dallas-Fort Worth",
      "DFW",
      "North Texas",
      "service area",
      "Dallas",
      "Fort Worth",
      "Plano",
      "Frisco",
      "Sherman",
    ],
    openGraph: {
      title: "Service Area | DFW · North Texas Design-Build",
      description:
        "Custom home design-build service area covering Dallas-Fort Worth & North Texas across the DFW Metroplex.",
    },
    twitter: {
      card: "summary_large_image",
      site: "@PHDhomes",
    },
    alternates: {
      canonical: `${siteUrl}/dallas-fort-worth`,
    },
  };
}

const whyRegional = [
  {
    title: "Deeper trade relationships",
    description:
      "Years of building across DFW & North Texas means we work with the same vetted subcontractors project after project. This reduces risk, improves quality, and keeps timelines tight.",
  },
  {
    title: "Multi-jurisdiction permitting fluency",
    description:
      "Every municipality has different codes, review timelines, and inspection processes. We know the specifics for each city we serve — from Highland Park's design review board to Prosper's rapid-growth infrastructure requirements.",
  },
  {
    title: "Climate-calibrated construction",
    description:
      "North Texas has expansive clay soils, summer heat loads, and storm patterns that demand specific foundation, envelope, and drainage strategies. Our methods are tuned for North Texas conditions, not generic best practices.",
  },
];

const marketFacts = [
  { stat: "7.6M+", label: "Metro population", detail: "DFW is the 4th largest metro in the U.S." },
  {
    stat: String(SERVICE_AREA_CITIES.length),
    label: "Cities served",
    detail: "DFW & North Texas",
  },
  { stat: "DFW+", label: "Service area", detail: "DFW Metroplex & North Texas" },
  { stat: "$250–$500+", label: "Cost per sqft range", detail: "Varies by city, lot, and finishes" },
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
            titleId="dfw-heading"
            eyebrow="Service Area"
            title="Custom homes across DFW & North Texas"
            description="Regional focus is a strategic choice. Across the DFW Metroplex & North Texas, we deliver better outcomes — fluent permitting across multiple jurisdictions, deeper trade networks, and construction methods proven for North Texas conditions."
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
            title={`${SERVICE_AREA_CITIES.length} communities across the region`}
            description="We accept projects in the following cities and their surrounding neighborhoods, spanning DFW & North Texas."
          />

          <div className="grid grid-cols-2 gap-px border border-line sm:grid-cols-3 md:grid-cols-4">
            {SERVICE_AREA_CITIES.map((city) => (
              <div
                key={`${city.name}-${city.state}`}
                className="flex items-center gap-3 border border-line bg-surface px-4 py-4"
              >
                <span className="h-2 w-2 shrink-0 bg-accent" aria-hidden="true" />
                <span className="text-sm font-medium text-ink">
                  {city.name}
                  <span className="ml-1 text-xs font-normal text-muted">{city.state}</span>
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Why regional focus */}
      <section className="section-shell border-t border-line">
        <Container swiss className="space-y-8">
          <SectionHeading
            eyebrow="Why Regional Focus"
            title="Tight geography produces better outcomes"
          />

          <div className="grid gap-6 md:grid-cols-3">
            {whyRegional.map((item) => (
              <article key={item.title} className="border border-line bg-surface p-6">
                <h3 className="type-h3-compact text-ink">{item.title}</h3>
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
            title="Regional project intake"
          />

          <div className="border border-line bg-surface p-6">
            <ul className="space-y-3 text-sm leading-6 text-muted">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden="true" />
                Active project intake covers the DFW Metroplex & North Texas.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden="true" />
                Project pages and recommendations are scoped to North Texas market realities.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden="true" />
                Out-of-area inquiries beyond the corridor are redirected to local partner recommendations when possible.
              </li>
            </ul>

            <div style={{ "--color-accent": "rgb(212 45 62)", "--color-accent-hover": "rgb(190 34 50)", "--color-on-accent": "rgb(255 244 245)" } as React.CSSProperties}>
              <LeadMagnetBanner className="mt-6" compact />
            </div>

            <div
              className="mt-6 flex flex-wrap items-center gap-3"
              style={{ "--color-accent": "rgb(212 45 62)", "--color-accent-hover": "rgb(190 34 50)", "--color-on-accent": "rgb(255 244 245)" } as React.CSSProperties}
            >
              <CtaLink
                href={scheduleUrl}
                {...(scheduleUrl.startsWith("http") && { target: "_blank", rel: "noreferrer" })}
                eventName="cta_schedule_click"
              >
                Schedule a Consultation
              </CtaLink>
              <CtaLink href={phoneHref} eventName="cta_call_click">
                Call {phoneDisplay}
              </CtaLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
