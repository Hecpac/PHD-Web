"use client";

import { useState } from "react";
import type { EmblaCarouselType } from "embla-carousel";

import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { CtaLink } from "@/components/ui/cta-link";
import { FeaturedProjectsGrid } from "@/components/home/featured-projects-grid";
import { CarouselDots, CarouselNextButton, CarouselPrevButton, useCarouselButtons } from "@/components/ui/carousel-controls";
import type { Project } from "@/lib/types/content";

type FeaturedProjectsSectionProps = {
  projects: Project[];
};

export function FeaturedProjectsSection({ projects }: FeaturedProjectsSectionProps) {
  const [emblaApi, setEmblaApi] = useState<EmblaCarouselType>();
  const { canPrev, canNext, scrollPrev, scrollNext } = useCarouselButtons(emblaApi);

  return (
    <section id="featured-projects" className="section-shell">
      <Container swiss className="space-y-10">
        <SectionHeading
          eyebrow="Featured Projects"
          title="Built work across the DFW Metroplex"
          description="Portfolio evidence comes first. Each project reflects design intent, execution discipline, and documented handoff quality."
        />
      </Container>

      <div className="overflow-hidden">
        <FeaturedProjectsGrid
          projects={projects}
          prioritizeFirst
          onApiChange={setEmblaApi}
        />
      </div>

      {projects.length > 1 && (
        <Container swiss>
          <div className="pt-5 sm:pt-6">
            <div className="mx-auto flex w-fit items-center gap-3 rounded-full border border-line/90 bg-surface/92 px-3 py-2 shadow-[0_10px_25px_-20px_rgba(15,15,15,0.75)]">
              <CarouselPrevButton
                onClick={scrollPrev}
                disabled={!canPrev}
                aria-label="Previous featured project"
                className="h-10 w-10"
              />
              <CarouselDots emblaApi={emblaApi} className="gap-1.5" />
              <CarouselNextButton
                onClick={scrollNext}
                disabled={!canNext}
                aria-label="Next featured project"
                className="h-10 w-10"
              />
            </div>
          </div>
        </Container>
      )}

      <Container swiss>
        <div className="pt-6 sm:pt-8">
          <div className="mx-auto flex max-w-xl justify-center rounded-xl border border-line/90 bg-surface/92 px-4 py-4 sm:w-fit sm:px-6 sm:py-5">
            <CtaLink
              href="/projects"
              variant="secondary"
              eventName="gallery_interaction"
              className="w-full min-h-11 rounded-md border-line/80 bg-surface text-ink/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas sm:w-auto"
            >
              View All Projects
            </CtaLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
