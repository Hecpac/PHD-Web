import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

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
  const t = await getTranslations("dfwPage");

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
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
      title: t("ogTitle"),
      description: t("ogDescription"),
    },
    twitter: {
      card: "summary_large_image",
      site: "@PHDhomes",
    },
    alternates: {
      canonical: `${siteUrl}/dallas-fort-worth`,
      languages: { en: `${siteUrl}/en/dallas-fort-worth`, es: `${siteUrl}/es/dallas-fort-worth` },
    },
  };
}

export default async function DallasFortWorthPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("dfwPage");
  const { scheduleUrl, phoneHref, phoneDisplay } = getCtaConfig();

  const whyRegional = [
    {
      title: t("why1Title"),
      description: t("why1Description"),
    },
    {
      title: t("why2Title"),
      description: t("why2Description"),
    },
    {
      title: t("why3Title"),
      description: t("why3Description"),
    },
  ];

  const marketFacts = [
    { stat: t("stat1Value"), label: t("stat1Label"), detail: t("stat1Detail") },
    {
      stat: String(SERVICE_AREA_CITIES.length),
      label: t("stat2Label"),
      detail: t("stat2Detail"),
    },
    { stat: t("stat3Value"), label: t("stat3Label"), detail: t("stat3Detail") },
    { stat: t("stat4Value"), label: t("stat4Label"), detail: t("stat4Detail") },
  ];

  return (
    <>
      <JsonLd
        data={createBreadcrumbSchema([
          { name: t("breadcrumbHome"), href: "/" },
          { name: t("breadcrumbDfw"), href: "/dallas-fort-worth" },
        ])}
      />

      {/* Hero */}
      <section className="section-shell" aria-labelledby="dfw-heading">
        <Container swiss className="space-y-8">
          <SectionHeading
            as="h1"
            titleId="dfw-heading"
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
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
            eyebrow={t("citiesEyebrow")}
            title={t("citiesTitle", { count: SERVICE_AREA_CITIES.length })}
            description={t("citiesDescription")}
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
            eyebrow={t("whyEyebrow")}
            title={t("whyTitle")}
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
            eyebrow={t("policyEyebrow")}
            title={t("policyTitle")}
          />

          <div className="border border-line bg-surface p-6">
            <ul className="space-y-3 text-sm leading-6 text-muted">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden="true" />
                {t("policy1")}
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden="true" />
                {t("policy2")}
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden="true" />
                {t("policy3")}
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
                {t("scheduleConsultation")}
              </CtaLink>
              <CtaLink href={phoneHref} eventName="cta_call_click">
                {t("callPrefix")} {phoneDisplay}
              </CtaLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
