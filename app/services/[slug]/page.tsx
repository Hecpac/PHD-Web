import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { CtaLink } from "@/components/ui/cta-link";
import { JsonLd } from "@/components/ui/json-ld";
import { SectionHeading } from "@/components/ui/section-heading";
import { getSiteUrl } from "@/lib/config/site";
import { getServiceDetailBySlug, getServiceDetails } from "@/lib/data";
import { createBreadcrumbSchema } from "@/lib/seo/schema";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const services = await getServiceDetails();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceDetailBySlug(slug);
  const siteUrl = getSiteUrl();

  if (!service) {
    return {
      title: "Service Not Found",
      alternates: {
        canonical: `${siteUrl}/services`,
      },
    };
  }

  return {
    title: `${service.title} | DFW Custom Home Services`,
    description: service.summary,
    openGraph: {
      title: `${service.title} | DFW Design-Build Services`,
      description: service.summary,
    },
    alternates: {
      canonical: `${siteUrl}/services/${service.slug}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await getServiceDetailBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: service.title, href: `/services/${service.slug}` },
        ])}
      />
      <section className="section-shell" aria-labelledby="service-heading">
        <Container swiss className="space-y-10">
          <SectionHeading
            as="h1"
            eyebrow={`Services — ${service.icon}`}
            title={service.title}
            description={service.summary}
          />

          {/* Description */}
          <div className="max-w-3xl">
            <p className="text-sm leading-7 text-muted">{service.description}</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Deliverables */}
            <div className="border border-line bg-surface p-6">
              <h3 className="type-heading mb-4">Deliverables</h3>
              <ul className="space-y-3">
                {service.deliverables.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-muted">
                    <span
                      aria-hidden
                      className="mt-2 h-1 w-1 shrink-0 bg-accent"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="border border-line bg-surface p-6">
              <h3 className="type-heading mb-4">Why It Matters</h3>
              <ul className="space-y-3">
                {service.benefits.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-muted">
                    <span
                      aria-hidden
                      className="mt-2 h-1 w-1 shrink-0 bg-accent"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="border-t border-line pt-8">
            <p className="mb-4 text-sm text-muted">
              Ready to discuss {service.title.toLowerCase()} for your DFW project?
            </p>
            <CtaLink href="/contact" eventName="cta_schedule_click">
              Schedule Consultation
            </CtaLink>
          </div>
        </Container>
      </section>
    </>
  );
}
