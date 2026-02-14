"use client";

import { forwardRef, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";

import { CtaLink } from "@/components/ui/cta-link";
import { gsap } from "@/lib/gsap";
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
    const shouldReduceMotion = useReducedMotion();

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

    useEffect(() => {
      const container = containerRef.current;
      if (!container || shouldReduceMotion) return;

      const canHoverWithPrecision = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      if (!canHoverWithPrecision) return;

      const cards = Array.from(container.querySelectorAll<HTMLElement>("[data-project-card]"));
      const cleanups = cards.map((card) => {
        const hoverImage = card.querySelector<HTMLElement>("[data-hover-image]");
        if (!hoverImage) return () => {};

        const xTo = gsap.quickTo(hoverImage, "x", { duration: 0.45, ease: "power3.out" });
        const yTo = gsap.quickTo(hoverImage, "y", { duration: 0.45, ease: "power3.out" });

        const onMove = (event: PointerEvent) => {
          const rect = card.getBoundingClientRect();
          const relX = (event.clientX - rect.left) / rect.width - 0.5;
          const relY = (event.clientY - rect.top) / rect.height - 0.5;

          xTo(gsap.utils.clamp(-8, 8, relX * 14));
          yTo(gsap.utils.clamp(-6, 6, relY * 12));
        };

        const reset = () => {
          xTo(0);
          yTo(0);
        };

        card.addEventListener("pointermove", onMove, { passive: true });
        card.addEventListener("pointerleave", reset);
        card.addEventListener("pointercancel", reset);

        return () => {
          card.removeEventListener("pointermove", onMove);
          card.removeEventListener("pointerleave", reset);
          card.removeEventListener("pointercancel", reset);
          gsap.set(hoverImage, { x: 0, y: 0 });
        };
      });

      return () => {
        cleanups.forEach((cleanup) => cleanup());
      };
    }, [containerRef, shouldReduceMotion]);

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
              data-project-card
              className="group w-[min(86vw,27rem)] flex-shrink-0 overflow-hidden rounded-lg border border-line bg-surface sm:w-[min(74vw,31rem)] md:w-[min(52vw,36rem)] lg:w-[min(36vw,31rem)] max-md:snap-start motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_22px_40px_-32px_rgba(15,15,15,0.85)]"
            >
              {/* Image with overlay label + grayscale effect */}
              <div className="relative aspect-[5/4] overflow-hidden grayscale transition-[filter] duration-[900ms] ease-out group-hover:grayscale-0 sm:aspect-[16/11] md:aspect-[16/10]">
                <div data-parallax-image className="absolute inset-0 will-change-transform">
                  <div data-hover-image className="relative h-full w-full will-change-transform">
                    <div className="relative h-full w-full motion-safe:transition-transform motion-safe:duration-[900ms] motion-safe:ease-out motion-safe:group-hover:scale-[1.025]">
                      <Image
                        src={cardImage?.src ?? "/projects/north-dallas-courtyard-residence/hero.jpg"}
                        alt={cardImage?.alt ?? `${project.title} in ${project.location.city}`}
                        fill
                        sizes="(min-width: 1024px) 35vw, (min-width: 768px) 45vw, 85vw"
                        className="object-cover"
                        placeholder="blur"
                        blurDataURL={BLUR_PLACEHOLDER}
                        {...(prioritizeFirst && index === 0
                          ? { priority: true, fetchPriority: "high" as const }
                          : {})}
                      />
                    </div>
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/55 to-transparent" />
                {/* Overlay label */}
                <div className="absolute bottom-4 left-4 rounded-sm bg-canvas/75 px-3 py-1.5 backdrop-blur-sm">
                  <p className="font-mono text-xs uppercase tracking-[0.05em] text-ink">
                    {project.location.display}
                  </p>
                </div>
              </div>

              {/* Metadata with hover reveal */}
              <div className="space-y-4 p-5 opacity-100 transition-[opacity,transform] duration-500 ease-out sm:p-6 md:p-7 md:motion-safe:translate-y-2 md:motion-safe:opacity-70 md:motion-safe:group-hover:translate-y-0 md:motion-safe:group-hover:opacity-100">
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
