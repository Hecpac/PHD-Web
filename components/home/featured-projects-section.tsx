import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { CtaLink } from "@/components/ui/cta-link";
import { FeaturedProjectsGrid } from "@/components/home/featured-projects-grid";
import type { Project } from "@/lib/types/content";

type FeaturedProjectsSectionProps = {
  projects: Project[];
};

export function FeaturedProjectsSection({ projects }: FeaturedProjectsSectionProps) {
  return (
    <section id="featured-projects" className="section-shell">
      <Container swiss className="space-y-10">
        <SectionHeading
          eyebrow="Featured Projects"
          title="Built work across the DFW Metroplex"
          description="Portfolio evidence comes first. Each project reflects design intent, execution discipline, and documented handoff quality."
        />

        <FeaturedProjectsGrid projects={projects} prioritizeFirst />

        <div className="flex justify-center pt-4">
          <CtaLink
            href="/projects"
            variant="secondary"
            eventName="gallery_interaction"
          >
            View All Projects
          </CtaLink>
        </div>
      </Container>
    </section>
  );
}
