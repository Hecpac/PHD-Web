import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { getTranslations } from "next-intl/server";

import { HeroSection } from "@/components/home/hero-section";
import { HeroRenderSection } from "@/components/home/hero-render-section";
import { LedgerSection } from "@/components/home/ledger-section";
import { BlueprintSection } from "@/components/home/blueprint-section";
import { BentoSection } from "@/components/home/bento-section";
import { HowWeWorkSection } from "@/components/home/how-we-work-section";
import { TrustSection } from "@/components/home/trust-section";
import { FaqSection } from "@/components/home/faq-section";
import { getFeaturedProjects, getFaqs, getHomeHero, getProcessSteps, getReviews, getServices } from "@/lib/data";
import { getSiteUrl } from "@/lib/config/site";

const FeaturedProjectsSection = dynamic(() =>
  import("@/components/home/featured-projects-section").then((mod) => mod.FeaturedProjectsSection),
);

const DfwSection = dynamic(() =>
  import("@/components/home/dfw-section").then((mod) => mod.DfwSection),
);

const WhyChooseUsSection = dynamic(() =>
  import("@/components/home/why-choose-us-section").then((mod) => mod.WhyChooseUsSection),
);

const TestimonialsSection = dynamic(() =>
  import("@/components/home/testimonials-section").then((mod) => mod.TestimonialsSection),
);

const ContactTerminal = dynamic(() =>
  import("@/components/home/contact-terminal").then((mod) => mod.ContactTerminal),
);

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = getSiteUrl();
  const t = await getTranslations("home");

  return {
    title: { absolute: t("metaTitle") },
    description: t("metaDescription"),
    keywords: [
      "custom home builder",
      "design-build",
      "Dallas-Fort Worth",
      "DFW custom homes",
      "North Texas custom homes",
      "Sherman custom home builder",
      "luxury homes",
      "new construction",
    ],
    alternates: {
      canonical: siteUrl,
      languages: { en: `${siteUrl}/en`, es: `${siteUrl}/es` },
    },
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const [heroData, services, processSteps, featuredProjects, reviews, faqs] = await Promise.all([
    getHomeHero(),
    getServices(locale),
    getProcessSteps(locale),
    getFeaturedProjects(locale),
    getReviews(locale),
    getFaqs(locale),
  ]);

  return (
    <>
      <HeroSection heroImage={heroData.heroImage} />
      <HeroRenderSection />
      
      <div className="relative lg:z-50 bg-canvas">
        <LedgerSection services={services} />
        <HowWeWorkSection />
        <BlueprintSection steps={processSteps} />
        <FeaturedProjectsSection projects={featuredProjects} />
        <BentoSection />
        <DfwSection />
        <TrustSection />
        <WhyChooseUsSection />
        <TestimonialsSection reviews={reviews} />
        <FaqSection faqs={faqs} />
        <ContactTerminal />
      </div>
    </>
  );
}
