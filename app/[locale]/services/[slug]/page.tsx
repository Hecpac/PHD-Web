import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageIntentTracker } from "@/components/analytics/page-intent-tracker";
import { Container } from "@/components/layout/container";
import { CtaLink } from "@/components/ui/cta-link";
import { JsonLd } from "@/components/ui/json-ld";
import { LeadMagnetBanner } from "@/components/ui/lead-magnet-banner";
import { SectionHeading } from "@/components/ui/section-heading";
import { SocialProofStrip } from "@/components/ui/social-proof-strip";
import { getSiteUrl } from "@/lib/config/site";
import { getFaqs, getReviews, getServiceDetailBySlug, getServiceDetails } from "@/lib/data";
import { createBreadcrumbSchema, createFaqSchema, createServiceSchema } from "@/lib/seo/schema";

type ServicePageProps = {
  params: Promise<{ slug: string; locale: string }>;
};

const FAQ_CATEGORY_MAP: Record<string, string[]> = {
  "custom-home-design": ["Design", "Process", "Timeline"],
  "interior-design": ["Design", "Process", "Budget"],
  "landscape-design": ["Design", "Process", "Service Area"],
  "3d-rendering": ["Design", "Process"],
  consulting: ["Process", "Budget", "Timeline"],
  "project-management": ["Process", "Timeline", "Budget"],
  "feasibility-studies": ["Budget", "Process", "Timeline"],
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
    title: `${service.title} | Custom Home Services — DFW & North Texas`,
    description: service.summary,
    openGraph: {
      title: `${service.title} | Design-Build Services — DFW & North Texas`,
      description: service.summary,
      images: [{ url: `${siteUrl}/og-default.jpg`, alt: "Premium Home Design" }],
    },
    alternates: {
      canonical: `${siteUrl}/services/${service.slug}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("serviceDetailPage");
  const [service, reviews, faqs] = await Promise.all([
    getServiceDetailBySlug(slug, locale),
    getReviews(locale),
    getFaqs(locale),
  ]);

  if (!service) {
    notFound();
  }

  const contextualReviews = reviews.slice(0, 2);
  const mappedCategories = FAQ_CATEGORY_MAP[service.slug] ?? ["Process", "Budget", "Timeline"];
  const serviceFaqs = faqs
    .filter((faq) => mappedCategories.includes(faq.category))
    .slice(0, 5);

  return (
    <>
      <JsonLd
        data={createBreadcrumbSchema([
          { name: t("breadcrumbHome"), href: "/" },
          { name: t("breadcrumbServices"), href: "/services" },
          { name: service.title, href: `/services/${service.slug}` },
        ])}
      />
      <JsonLd data={createServiceSchema(service)} />
      {serviceFaqs.length > 0 ? <JsonLd data={createFaqSchema(serviceFaqs)} /> : null}
      <PageIntentTracker entityType="service" slug={service.slug} />
      <section className="section-shell" aria-labelledby="service-heading">
        <Container swiss className="space-y-10">
          <SectionHeading
            as="h1"
            titleId="service-heading"
            eyebrow={t("eyebrow")}
            title={service.title}
            description={service.summary}
          />

          <div className="max-w-3xl">
            <p className="type-prose text-muted">{service.description}</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="group border border-line bg-surface p-6 transition-[transform,border-color,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_8px_24px_-4px_rgb(0_0_0/0.12)]">
              <h3 className="type-h3-standard mb-4 transition-colors duration-200 group-hover:text-accent">{t("deliverables")}</h3>
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

            <div className="group border border-line bg-surface p-6 transition-[transform,border-color,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_8px_24px_-4px_rgb(0_0_0/0.12)]">
              <h3 className="type-h3-standard mb-4 transition-colors duration-200 group-hover:text-accent">{t("whyItMatters")}</h3>
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

          <SocialProofStrip title={t("socialProofTitle")} reviews={contextualReviews} />

          <LeadMagnetBanner />

          {serviceFaqs.length > 0 ? (
            <section className="group space-y-4 rounded-xl border border-line bg-surface p-6 transition-[transform,border-color,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_8px_24px_-4px_rgb(0_0_0/0.12)]" aria-label="Service FAQs">
              <h3 className="text-lg font-semibold tracking-tight text-ink">{t("faqTitle")}</h3>
              <ul className="space-y-3">
                {serviceFaqs.map((faq) => (
                  <li key={faq.id} className="text-sm leading-6 text-muted">
                    <span className="font-semibold text-ink">{faq.question}</span>
                    <p>{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <div className="border-t border-line pt-8">
            <p className="mb-4 text-sm text-muted">
              {t("readyToDiscuss", { service: service.title.toLowerCase() })}
            </p>
            <CtaLink
              href="/contact"
              eventName="cta_schedule_click"
              data-analytics-cta="service_primary_contact"
            >
              {t("ctaButton")}
            </CtaLink>
          </div>
        </Container>
      </section>
    </>
  );
}
