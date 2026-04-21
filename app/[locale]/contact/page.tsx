import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Container } from "@/components/layout/container";
import { JsonLd } from "@/components/ui/json-ld";
import { MultiStepForm } from "@/components/ui/multi-step-form";
import { SocialLinks } from "@/components/ui/social-links";
import { createBreadcrumbSchema } from "@/lib/seo/schema";
import { getCtaConfig, getSiteUrl, siteConfig } from "@/lib/config/site";

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = getSiteUrl();
  const t = await getTranslations("contactPage");

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    keywords: [
      "contact",
      "consultation",
      "design-build inquiry",
      "DFW custom homes",
      "North Texas custom homes",
    ],
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
    },
    twitter: {
      card: "summary_large_image",
      site: "@PHDhomes",
    },
    alternates: {
      canonical: `${siteUrl}/contact`,
      languages: { en: `${siteUrl}/en/contact`, es: `${siteUrl}/es/contact` },
    },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contactPage");
  const { phoneDisplay, phoneHref } = getCtaConfig();

  return (
    <>
      <JsonLd
        data={createBreadcrumbSchema([
          { name: t("breadcrumbHome"), href: "/" },
          { name: t("breadcrumbContact"), href: "/contact" },
        ])}
      />
      <section className="section-shell border-t border-line">
        <Container swiss className="space-y-6 pt-6">
          <header className="space-y-3">
            <p className="font-mono text-xs uppercase tracking-[0.05em] text-muted">{t("eyebrow")}</p>
            <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              {t("title")}
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-muted">
              {t("description")}
            </p>
          </header>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-line py-3">
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="inline-flex min-h-[44px] min-w-[44px] items-center text-sm text-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:min-h-7"
            >
              {siteConfig.contactEmail}
            </a>
            <a
              href={phoneHref}
              className="inline-flex min-h-[44px] min-w-[44px] items-center text-sm text-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:min-h-7"
            >
              {phoneDisplay}
            </a>
            <span className="text-sm text-muted">{t("hours")}</span>
            <span className="text-sm text-muted">{t("region")}</span>
            <SocialLinks />
          </div>

          <div className="grid gap-4 rounded-xl border border-line bg-surface p-5 text-sm text-muted sm:grid-cols-3">
            <div>
              <p className="font-semibold text-ink">{t("responseTimeTitle")}</p>
              <p className="mt-1 leading-6">{t("responseTimeDesc")}</p>
            </div>
            <div>
              <p className="font-semibold text-ink">{t("bestFitTitle")}</p>
              <p className="mt-1 leading-6">{t("bestFitDesc")}</p>
            </div>
            <div>
              <p className="font-semibold text-ink">{t("notFitTitle")}</p>
              <p className="mt-1 leading-6">{t("notFitDesc")}</p>
            </div>
          </div>

          <MultiStepForm />
        </Container>
      </section>
    </>
  );
}
