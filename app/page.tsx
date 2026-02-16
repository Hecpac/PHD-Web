import type { Metadata } from "next";
import { HeroSection } from "@/components/home/hero-section";
import { LedgerSection } from "@/components/home/ledger-section";
import { BlueprintSection } from "@/components/home/blueprint-section";
import { BentoSection } from "@/components/home/bento-section";
import { DfwSection } from "@/components/home/dfw-section";
import { FeaturedProjectsSection } from "@/components/home/featured-projects-section";
import { HowWeWorkSection } from "@/components/home/how-we-work-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { TrustSection } from "@/components/home/trust-section";
import { WhyChooseUsSection } from "@/components/home/why-choose-us-section";
import { ImageGridStrip } from "@/components/home/image-grid-strip";
import { ContactTerminal } from "@/components/home/contact-terminal";
import { FaqSection } from "@/components/home/faq-section";
import { getFeaturedProjects, getFaqs, getHomeHero, getProcessSteps, getProjects, getReviews, getServices } from "@/lib/data";
import { getSiteUrl } from "@/lib/config/site";

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = getSiteUrl();

  return {
    alternates: {
      canonical: siteUrl,
    },
  };
}

export default async function HomePage() {
  const [heroData, services, processSteps, projects, featuredProjects, reviews, faqs] = await Promise.all([
    getHomeHero(),
    getServices(),
    getProcessSteps(),
    getProjects(),
    getFeaturedProjects(),
    getReviews(),
    getFaqs(),
  ]);

  return (
    <>
      <HeroSection heroImage={heroData.heroImage} />
      <ImageGridStrip projects={projects} />
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
