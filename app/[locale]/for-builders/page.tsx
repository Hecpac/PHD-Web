import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { B2BContactForm } from "@/components/for-builders/b2b-contact-form";
import { B2BHero } from "@/components/for-builders/b2b-hero";
import { B2BProcess } from "@/components/for-builders/b2b-process";
import { B2BBespokeDesign } from "@/components/for-builders/b2b-bespoke-design";
import { BuilderProjectsShowcase } from "@/components/for-builders/builder-projects";
import { BuilderTrustBar } from "@/components/for-builders/builder-trust-bar";
import { Container } from "@/components/layout/container";
import { Accordion } from "@/components/ui/accordion";
import { JsonLd } from "@/components/ui/json-ld";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlareCard } from "@/components/ui/glare-card";
import { getSiteUrl } from "@/lib/config/site";
import {
  createB2BDraftingServiceSchema,
  createBreadcrumbSchema,
  createFaqSchema,
} from "@/lib/seo/schema";

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = getSiteUrl();
  const t = await getTranslations("forBuildersPage");

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    keywords: [
      "B2B",
      "drafting services",
      "construction documents",
      "architects",
      "builders",
      "DFW",
      "North Texas",
    ],
    openGraph: {
      title: t("metaTitle"),
      description: t("ogDescription"),
    },
    twitter: {
      card: "summary_large_image",
      site: "@PHDhomes",
    },
    alternates: {
      canonical: `${siteUrl}/for-builders`,
      languages: { en: `${siteUrl}/en/for-builders`, es: `${siteUrl}/es/for-builders` },
    },
  };
}

export default async function ForBuildersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("forBuildersPage");

  const B2B_SERVICES = [
    {
      number: "01",
      title: t("service1Title"),
      summary: t("service1Summary"),
      deliverables: [t("service1Del1"), t("service1Del2"), t("service1Del3")],
    },
    {
      number: "02",
      title: t("service2Title"),
      summary: t("service2Summary"),
      deliverables: [t("service2Del1"), t("service2Del2"), t("service2Del3")],
    },
    {
      number: "03",
      title: t("service3Title"),
      summary: t("service3Summary"),
      deliverables: [t("service3Del1"), t("service3Del2"), t("service3Del3")],
    },
    {
      number: "04",
      title: t("service4Title"),
      summary: t("service4Summary"),
      deliverables: [t("service4Del1"), t("service4Del2"), t("service4Del3")],
    },
    {
      number: "05",
      title: t("service5Title"),
      summary: t("service5Summary"),
      deliverables: [t("service5Del1"), t("service5Del2"), t("service5Del3")],
    },
    {
      number: "06",
      title: t("service6Title"),
      summary: t("service6Summary"),
      deliverables: [t("service6Del1"), t("service6Del2"), t("service6Del3")],
    },
  ];

  const VALUE_PROPS = [
    { title: t("valueProp1Title"), description: t("valueProp1Desc") },
    { title: t("valueProp2Title"), description: t("valueProp2Desc") },
    { title: t("valueProp3Title"), description: t("valueProp3Desc") },
    { title: t("valueProp4Title"), description: t("valueProp4Desc") },
    { title: t("valueProp5Title"), description: t("valueProp5Desc") },
  ];

  const B2B_FAQS = [
    { id: "services", title: t("faq1Title"), content: t("faq1Content") },
    { id: "builders", title: t("faq2Title"), content: t("faq2Content") },
    { id: "design-decisions", title: t("faq3Title"), content: t("faq3Content") },
    { id: "differentiator", title: t("faq4Title"), content: t("faq4Content") },
    { id: "pricing", title: t("faq5Title"), content: t("faq5Content") },
    { id: "turnaround", title: t("faq6Title"), content: t("faq6Content") },
    { id: "revisions", title: t("faq7Title"), content: t("faq7Content") },
    { id: "minimum", title: t("faq8Title"), content: t("faq8Content") },
  ];

  const faqsForSchema = B2B_FAQS.map((f) => ({
    id: f.id,
    question: f.title,
    answer: f.content,
    category: "B2B",
  }));

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: t("breadcrumbHome"), href: "/" },
    { name: t("breadcrumbForBuilders"), href: "/for-builders" },
  ]);
  const serviceSchema = createB2BDraftingServiceSchema();
  const faqSchema = createFaqSchema(faqsForSchema);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />

      {/* 1. Hero */}
      <B2BHero />

      {/* 2. Bespoke Design & Visualization */}
      <B2BBespokeDesign />

      {/* 3. Trust Bar */}
      <BuilderTrustBar />

      {/* 4. Services Grid */}
      <section id="b2b-services" className="section-shell border-t border-line">
        <Container swiss className="space-y-8">
          <SectionHeading
            eyebrow={t("servicesEyebrow")}
            title={t("servicesTitle")}
            description={t("servicesDescription")}
          />

          <div className="grid gap-px border border-line md:grid-cols-2 xl:grid-cols-3">
            {B2B_SERVICES.map((service) => (
              <GlareCard key={service.number} className="h-full w-full">
                <article
                  className="group/card flex h-full flex-col justify-between border border-line bg-surface p-6 transition-colors duration-300 hover:bg-red-600"
                >
                  <div>
                    <p className="font-mono text-xs font-medium tracking-widest text-accent group-hover/card:text-red-100">
                      {service.number}
                    </p>
                    <h3 className="mt-2 type-heading text-ink group-hover/card:text-white">{service.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted group-hover/card:text-red-50">{service.summary}</p>
                  </div>
                  <ul className="mt-4 space-y-1" aria-label={`${service.title} deliverables`}>
                    {service.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-xs text-muted group-hover/card:text-white">
                        <span
                          className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent group-hover/card:bg-white"
                          aria-hidden="true"
                        />
                        {d}
                      </li>
                    ))}
                  </ul>
                </article>
              </GlareCard>
            ))}
          </div>
        </Container>
      </section>

      {/* 5. Builder Projects */}
      <BuilderProjectsShowcase />

      {/* 6. Process */}
      <B2BProcess />

      {/* 7. Why Outsource */}
      <section id="why-outsource" className="section-shell border-t border-line">
        <Container swiss className="space-y-8">
          <SectionHeading
            eyebrow={t("whyEyebrow")}
            title={t("whyTitle")}
            description={t("whyDescription")}
          />

          <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3" aria-label={t("whyAriaLabel")}>
            {VALUE_PROPS.map((item) => (
              <li key={item.title}>
                <article className="rounded-xl border border-line bg-surface p-6 shadow-[var(--shadow-card)]">
                  <h3 className="type-h3-compact">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{item.description}</p>
                </article>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 8. FAQ */}
      <section id="b2b-faq" className="section-shell border-t border-line">
        <Container swiss className="space-y-8">
          <SectionHeading
            eyebrow={t("faqEyebrow")}
            title={t("faqTitle")}
            description={t("faqDescription")}
          />

          <Accordion items={B2B_FAQS} />
        </Container>
      </section>

      {/* 9. Contact Form */}
      <B2BContactForm />
    </>
  );
}
