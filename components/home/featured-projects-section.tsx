"use client";

import { useRef } from "react";

import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { CtaLink } from "@/components/ui/cta-link";
import { FeaturedProjectsGrid } from "@/components/home/featured-projects-grid";
import { gsap, useGSAP } from "@/lib/gsap";
import { createPinScrub } from "@/lib/gsap/scroll-animations";
import type { Project } from "@/lib/types/content";

type FeaturedProjectsSectionProps = {
  projects: Project[];
};

export function FeaturedProjectsSection({ projects }: FeaturedProjectsSectionProps) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!triggerRef.current || !contentRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      createPinScrub({
        trigger: triggerRef.current!,
        content: contentRef.current!,
        totalPanels: projects.length,
        scrubSmoothing: 0.5,
      });

      // Contra-parallax on card images
      const images = contentRef.current!.querySelectorAll<HTMLElement>("[data-parallax-image]");
      images.forEach((img) => {
        gsap.fromTo(
          img,
          { xPercent: -10 },
          {
            xPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: triggerRef.current!,
              scrub: true,
              start: "top top",
              end: () => `+=${contentRef.current!.scrollWidth - triggerRef.current!.offsetWidth}`,
            },
          }
        );
      });
    });
  }, { scope: triggerRef, dependencies: [projects.length] });

  return (
    <section id="featured-projects" className="section-shell">
      <Container swiss className="space-y-10">
        <SectionHeading
          eyebrow="Featured Projects"
          title="Built work across the DFW Metroplex"
          description="Portfolio evidence comes first. Each project reflects design intent, execution discipline, and documented handoff quality."
        />
      </Container>

      <div ref={triggerRef} className="overflow-hidden">
        <FeaturedProjectsGrid
          ref={contentRef}
          projects={projects}
          prioritizeFirst
        />
      </div>

      <Container swiss>
        <div className="pt-7 sm:pt-8">
          <div className="mx-auto flex max-w-xl justify-center rounded-xl border border-line/85 bg-surface/85 px-4 py-5 sm:w-fit sm:px-6">
            <CtaLink
              href="/projects"
              variant="secondary"
              eventName="gallery_interaction"
              className="w-full min-h-11 sm:w-auto"
            >
              View All Projects
            </CtaLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
