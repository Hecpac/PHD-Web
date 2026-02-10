import { HeroSection } from "@/components/home/hero-section";
import { LedgerSection } from "@/components/home/ledger-section";
import { BlueprintSection } from "@/components/home/blueprint-section";
import { BentoSection } from "@/components/home/bento-section";
import { DfwSection } from "@/components/home/dfw-section";
import { FeaturedProjectsSection } from "@/components/home/featured-projects-section";
import { HowWeWorkSection } from "@/components/home/how-we-work-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { TrustSection } from "@/components/home/trust-section";
import { ImageGridStrip } from "@/components/home/image-grid-strip";
import { ContactTerminal } from "@/components/home/contact-terminal";
import { FaqSection } from "@/components/home/faq-section";
import { getServices, getProcessSteps, getProjects, getReviews, getFaqs } from "@/lib/data";

export default async function HomePage() {
  const [services, processSteps, projects, reviews, faqs] = await Promise.all([
    getServices(),
    getProcessSteps(),
    getProjects(),
    getReviews(),
    getFaqs(),
  ]);

  return (
    <>
      <HeroSection />
      <ImageGridStrip projects={projects} />
      <LedgerSection services={services} />
      <HowWeWorkSection />
      <BlueprintSection steps={processSteps} />
      <FeaturedProjectsSection projects={projects.slice(0, 3)} />
      <BentoSection />
      <DfwSection />
      <TrustSection />
      <TestimonialsSection reviews={reviews} />
      <FaqSection faqs={faqs} />
      <ContactTerminal />
    </>
  );
}
