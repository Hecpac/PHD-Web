import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { LedgerSection } from "@/components/home/ledger-section";
import { JsonLd } from "@/components/ui/json-ld";
import { SectionHeading } from "@/components/ui/section-heading";
import { getSiteUrl } from "@/lib/config/site";
import { getServiceDetails, getServices } from "@/lib/data";
import { createBreadcrumbSchema } from "@/lib/seo/schema";

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
  const [services, serviceDetails] = await Promise.all([
    getServices(),
    getServiceDetails(),
  ]);

  return (
    <>
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
        ])}
      />

      {/* Service directory */}
      <section className="section-shell border-b border-line">
        <Container swiss className="space-y-8">
          <SectionHeading
            as="h1"
            eyebrow="Services"
            title="Full-scope design-build capabilities for DFW"
            description="Every service is structured around deliverables, decision gates, and documented handoffs."
          />
          <div className="grid gap-px border border-line md:grid-cols-2 xl:grid-cols-3">
            {serviceDetails.map((detail) => (
              <Link
                key={detail.id}
                href={`/services/${detail.slug}`}
                className="group flex flex-col justify-between border border-line bg-surface p-6 hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <div>
                  <p className="type-mono-label text-muted">{detail.icon}</p>
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
        </Container>
      </section>

      {/* Existing interactive ledger */}
      <LedgerSection services={services} withHeading={false} />
    </>
  );
}
