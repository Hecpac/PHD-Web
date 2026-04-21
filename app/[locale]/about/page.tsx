import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Container } from "@/components/layout/container";
import { JsonLd } from "@/components/ui/json-ld";
import { SectionHeading } from "@/components/ui/section-heading";
import { createBreadcrumbSchema } from "@/lib/seo/schema";
import { getSiteUrl } from "@/lib/config/site";

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = getSiteUrl();
  const t = await getTranslations("about");

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    keywords: [
      "about",
      "Premium Home Design",
      "husband and wife design studio",
      "all-in-one residential design",
      "custom home design",
      "interior design",
      "custom cabinetry",
      "Dallas-Fort Worth",
      "North Texas",
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
      canonical: `${siteUrl}/about`,
      languages: { en: `${siteUrl}/en/about`, es: `${siteUrl}/es/about` },
    },
  };
}

const PRINCIPLE_KEYS = ["principle1", "principle2", "principle3"] as const;
const STAT_KEYS = ["stat1", "stat2", "stat3", "stat4"] as const;
const VALUE_KEYS = ["value1", "value2", "value3"] as const;

export default async function AboutPage() {
  const t = await getTranslations("about");

  return (
    <>
      <JsonLd
        data={createBreadcrumbSchema([
          { name: t("breadcrumbHome"), href: "/" },
          { name: t("breadcrumbAbout"), href: "/about" },
        ])}
      />

      <section className="section-shell" aria-labelledby="about-heading">
        <Container swiss className="space-y-8">
          <SectionHeading
            as="h1"
            titleId="about-heading"
            eyebrow={t("heroEyebrow")}
            title={t("heroTitle")}
            description={t("heroDescription")}
          />

          <div className="grid gap-4 md:grid-cols-3">
            {PRINCIPLE_KEYS.map((key) => (
              <article key={key} className="border border-line bg-surface p-6">
                <h2 className="text-base font-bold text-ink">{t(`${key}Title`)}</h2>
                <p className="mt-2 text-sm leading-6 text-muted">{t(`${key}Description`)}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-shell border-t border-line section-bone">
        <Container swiss className="space-y-8">
          <SectionHeading
            as="h2"
            eyebrow={t("trackRecordEyebrow")}
            title={t("trackRecordTitle")}
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STAT_KEYS.map((key) => (
              <div key={key} className="space-y-2">
                <p className="text-5xl font-bold tabular-nums text-accent">{t(`${key}Value`)}</p>
                <h3 className="type-h3-compact text-ink">{t(`${key}Label`)}</h3>
                <p className="text-sm leading-6 text-muted">{t(`${key}Detail`)}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-shell border-t border-line">
        <Container swiss className="space-y-8">
          <SectionHeading
            as="h2"
            eyebrow={t("valuesEyebrow")}
            title={t("valuesTitle")}
          />
          <div className="grid gap-6 md:grid-cols-3">
            {VALUE_KEYS.map((key) => (
              <article key={key} className="border border-line bg-surface p-6">
                <h3 className="type-h3-compact text-ink">{t(`${key}Title`)}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{t(`${key}Description`)}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section
        className="section-shell border-t border-line section-bone"
        aria-labelledby="our-story-heading"
      >
        <Container swiss className="space-y-10">
          <SectionHeading
            as="h2"
            titleId="our-story-heading"
            eyebrow={t("storyEyebrow")}
            title={t("storyTitle")}
          />
          <div className="grid gap-10 md:grid-cols-[minmax(0,460px)_1fr] md:items-center">
            <div className="mx-auto w-full max-w-[460px] overflow-hidden border border-line bg-surface md:mx-0">
              <Image
                src="/about/founders.jpg"
                alt={t("storyImageAlt")}
                width={735}
                height={1316}
                sizes="(min-width: 768px) 460px, min(100vw, 460px)"
                className="h-auto w-full"
              />
            </div>
            <div className="space-y-6">
              <p className="type-subhead max-w-prose text-muted">
                {t("storyLead")}
              </p>
              <p className="max-w-prose text-base leading-7 text-muted">
                {t("storyParagraph1")}
              </p>
              <p className="max-w-prose text-base leading-7 text-muted">
                {t("storyParagraph2")}
              </p>
              <p className="max-w-prose text-base leading-7 text-muted">
                {t("storyParagraph3")}
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
