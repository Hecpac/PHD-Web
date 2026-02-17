import type { Metadata } from "next";
import dynamic from "next/dynamic";

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

  return {
    alternates: {
      canonical: siteUrl,
    },
  };
}

export default async function HomePage() {
  const [heroData, services, processSteps, featuredProjects, reviews, faqs] = await Promise.all([
    getHomeHero(),
    getServices(),
    getProcessSteps(),
    getFeaturedProjects(),
    getReviews(),
    getFaqs(),
  ]);

  return (
    <>
      <HeroSection heroImage={heroData.heroImage} />
      <HeroRenderSection />
      <LedgerSection services={services} />
      <HowWeWorkSection />
      <BlueprintSection steps={processSteps} />

      <div className="content-auto">
        <FeaturedProjectsSection projects={featuredProjects} />
      </div>
      <div className="content-auto">
        <BentoSection />
      </div>
      <div className="content-auto">
        <DfwSection />
      </div>
      <div className="content-auto">
        <TrustSection />
      </div>
      <div className="content-auto">
        <WhyChooseUsSection />
      </div>
      <div className="content-auto">
        <TestimonialsSection reviews={reviews} />
      </div>
      <div className="content-auto">
        <FaqSection faqs={faqs} />
      </div>
      <div className="content-auto">
        <ContactTerminal />
      </div>
    </>
  );
}
