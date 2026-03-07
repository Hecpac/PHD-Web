import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { LedgerSection } from "@/components/home/ledger-section";
import { ServiceIcon } from "@/components/ui/service-icon";
import { JsonLd } from "@/components/ui/json-ld";
import { LeadMagnetBanner } from "@/components/ui/lead-magnet-banner";
import { SectionHeading } from "@/components/ui/section-heading";
import { SocialProofStrip } from "@/components/ui/social-proof-strip";
import { getSiteUrl } from "@/lib/config/site";
import { getReviews, getServiceDetails, getServices } from "@/lib/data";
import { createBreadcrumbSchema } from "@/lib/seo/schema";
import { cn } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = getSiteUrl();

  return {
    title: "Services | Capabilities for DFW Homes",
    description:
      "Capabilities and deliverables for architecture-forward custom home projects in Dallas-Fort Worth.",
    openGraph: {
      title: "Services | Capabilities for DFW Homes",
      description:
        "Capabilities and deliverables for architecture-forward custom home projects in Dallas-Fort Worth.",
    },
    alternates: {
      canonical: `${siteUrl}/services`,
    },
  };
}

export default async function ServicesPage() {
  const [services, serviceDetails, reviews] = await Promise.all([
    getServices(),
    getServiceDetails(),
    getReviews(),
  ]);
  const detailCount = serviceDetails.length;
  const desktopRemainder = detailCount % 3;

  return (
    <>
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
        ])}
      />

      <section className="section-shell border-b border-line">
        <Container swiss className="space-y-8">
          <SectionHeading
            as="h1"
            eyebrow="Services"
            title="Full-scope design-build capabilities for DFW"
            description="Every service is structured around deliverables, decision gates, and documented handoffs."
          />
          <div className="grid gap-px border border-line md:grid-cols-2 xl:grid-cols-6">
            {serviceDetails.map((detail, index) => (
              <Link
                key={detail.id}
                href={`/services/${detail.slug}`}
                className={cn(
                  "group flex flex-col justify-between border border-line bg-surface p-6 transition-all duration-200 ease-out hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_8px_24px_-4px_rgb(0_0_0/0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent xl:col-span-2",
                  desktopRemainder === 1 && index === detailCount - 1 && "xl:col-span-6",
                  desktopRemainder === 2 && index >= detailCount - 2 && "xl:col-span-3",
                )}
              >
                <div>
                  <ServiceIcon name={detail.icon} className="h-5 w-5 text-muted" />
                  <h2 className="mt-2 type-heading text-ink group-hover:text-accent">
                    {detail.title}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {detail.summary}
                  </p>
                </div>
                <p className="mt-4 text-xs font-bold uppercase tracking-[0.05em] text-accent">
                  Learn more &rarr;
                </p>
              </Link>
            ))}
          </div>

          <LeadMagnetBanner compact />
          <SocialProofStrip reviews={reviews.slice(0, 2)} />
        </Container>
      </section>

      <LedgerSection services={services} withHeading={false} />
    </>
  );
}
