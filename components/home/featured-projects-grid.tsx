"use client";

import { forwardRef, useCallback, useEffect, useRef } from "react";
import Image from "next/image";

import { CtaLink } from "@/components/ui/cta-link";
import type { Project, GalleryImage } from "@/lib/types/content";

const BLUR_PLACEHOLDER =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjEwIiBmaWxsPSIjNTg1QjYzIi8+PC9zdmc+";

type FeaturedProjectsGridProps = {
  projects: Project[];
  prioritizeFirst?: boolean;
};

function formatSqft(sqft: number): string {
  return sqft.toLocaleString() + " sq. ft.";
}

function getCardImage(project: Project): GalleryImage | undefined {
  return project.heroImage ?? project.gallery[0];
}

export const FeaturedProjectsGrid = forwardRef<HTMLDivElement, FeaturedProjectsGridProps>(
  function FeaturedProjectsGrid({ projects, prioritizeFirst = false }, ref) {
    const internalRef = useRef<HTMLDivElement>(null);
    const containerRef = (ref as React.RefObject<HTMLDivElement | null>) ?? internalRef;

    // Keyboard navigation for horizontal scroll
    const handleKeyDown = useCallback(
      (e: KeyboardEvent) => {
        const el = containerRef.current;
        if (!el) return;

        // Only handle when section is roughly in viewport
        const rect = el.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;

        const cards = el.querySelectorAll("article");
        if (!cards.length) return;
        const cardWidth = cards[0].offsetWidth + 32; // gap-8 = 32px

        if (e.key === "ArrowRight") {
          el.scrollBy({ left: cardWidth, behavior: "smooth" });
        } else if (e.key === "ArrowLeft") {
          el.scrollBy({ left: -cardWidth, behavior: "smooth" });
        }
      },
      [containerRef]
    );

    useEffect(() => {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    return (
      <div
        ref={containerRef}
        className="flex flex-nowrap gap-8 px-[5vw] md:px-[5vw] max-md:overflow-x-auto max-md:snap-x max-md:snap-mandatory max-md:scroll-pl-[5vw] max-md:-webkit-overflow-scrolling-touch"
      >
        {projects.map((project, index) => {
          const cardImage = getCardImage(project);

          return (
            <article
              key={project.id}
              className="group w-[85vw] flex-shrink-0 overflow-hidden rounded-lg border border-line bg-surface md:w-[45vw] lg:w-[35vw] max-md:snap-start"
            >
              {/* Image with overlay label + grayscale effect */}
              <div className="relative aspect-[4/3] overflow-hidden grayscale transition-all duration-[1200ms] ease-out group-hover:grayscale-0">
                <Image
                  data-parallax-image
                  src={cardImage?.src ?? "/projects/north-dallas-courtyard-residence/hero.jpg"}
                  alt={cardImage?.alt ?? `${project.title} in ${project.location.city}`}
                  fill
                  sizes="(min-width: 1024px) 35vw, (min-width: 768px) 45vw, 85vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                  placeholder="blur"
                  blurDataURL={BLUR_PLACEHOLDER}
                  {...(prioritizeFirst && index === 0
                    ? { priority: true, fetchPriority: "high" as const }
                    : {})}
                />
                {/* Overlay label */}
                <div className="absolute bottom-4 left-4 rounded-sm bg-canvas/70 px-3 py-1.5 backdrop-blur-sm">
                  <p className="font-mono text-xs uppercase tracking-[0.05em] text-ink">
                    {project.location.display}
                  </p>
                </div>
              </div>

              {/* Metadata with hover reveal */}
              <div className="space-y-4 p-6 md:p-8 translate-y-2.5 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                <div className="space-y-3">
                  <h3 className="text-xl font-bold md:text-2xl">{project.title}</h3>
                  <p className="font-mono text-sm uppercase tracking-[0.05em] text-muted">
                    {project.style} · {project.year}
                    {project.specs?.sqft ? ` · ${formatSqft(project.specs.sqft)}` : ""}
                  </p>

                  {/* Tags */}
                  {project.tags && project.tags.length > 0 ? (
                    <ul className="flex flex-wrap gap-2" aria-label="Project tags">
                      {project.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full border border-line bg-surface-2 px-3 py-1 font-mono text-xs uppercase tracking-[0.05em] text-muted"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>

                <CtaLink
                  href={`/projects/${project.slug}`}
                  variant="ghost"
                  eventName="gallery_interaction"
                  className="min-h-7 min-w-7 w-fit px-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  Explore Project
                </CtaLink>
              </div>
            </article>
          );
        })}
      </div>
    );
  }
);
