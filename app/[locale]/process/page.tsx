import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { GsapProcessTimeline } from "@/components/process/gsap-process-timeline";
import { JsonLd } from "@/components/ui/json-ld";
import { getSiteUrl } from "@/lib/config/site";
import { getProcessSteps } from "@/lib/data";
import { createBreadcrumbSchema, createHowToSchema } from "@/lib/seo/schema";

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = getSiteUrl();
  const t = await getTranslations("processPage");

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    keywords: [
      "process",
      "design-build process",
      "decision gates",
      "custom home building",
      "DFW",
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
      canonical: `${siteUrl}/process`,
      languages: { en: `${siteUrl}/en/process`, es: `${siteUrl}/es/process` },
    },
  };
}

export default async function ProcessPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("processPage");
  const steps = await getProcessSteps(locale);

  return (
    <>
      <JsonLd
        data={createBreadcrumbSchema([
          { name: t("breadcrumbHome"), href: "/" },
          { name: t("breadcrumbProcess"), href: "/process" },
        ])}
      />
      <JsonLd data={createHowToSchema(steps)} />
      <GsapProcessTimeline steps={steps} />
    </>
  );
}
