import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Container } from "@/components/layout/container";
import { JsonLd } from "@/components/ui/json-ld";
import { SectionHeading } from "@/components/ui/section-heading";
import { getSiteUrl } from "@/lib/config/site";
import { getFaqs } from "@/lib/data";
import { createBreadcrumbSchema, createFaqSchema } from "@/lib/seo/schema";

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = getSiteUrl();
  const t = await getTranslations("faqPage");

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    keywords: ["FAQ", "custom home questions", "design-build", "DFW"],
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
    },
    twitter: {
      card: "summary_large_image",
      site: "@PHDhomes",
    },
    alternates: {
      canonical: `${siteUrl}/faq`,
      languages: { en: `${siteUrl}/en/faq`, es: `${siteUrl}/es/faq` },
    },
  };
}

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("faqPage");
  const faqs = await getFaqs(locale);

  return (
    <section className="section-shell" aria-labelledby="faq-heading">
      <JsonLd data={createFaqSchema(faqs)} />
      <JsonLd
        data={createBreadcrumbSchema([
          { name: t("breadcrumbHome"), href: "/" },
          { name: t("breadcrumbFaq"), href: "/faq" },
        ])}
      />
      <Container swiss className="space-y-8">
        <SectionHeading
          as="h1"
          titleId="faq-heading"
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <div className="space-y-4">
          {faqs.map((faq) => (
            <details key={faq.id} className="rounded-2xl border border-line bg-surface p-5">
              <summary
                className="cursor-pointer list-none text-base font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {faq.question}
              </summary>
              <p className="mt-3 text-sm leading-6 text-muted">{faq.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
