"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import type { EmblaCarouselType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

import { CtaLink } from "@/components/ui/cta-link";
import { gsap } from "@/lib/gsap";
import type { Project, GalleryImage } from "@/lib/types/content";

const BLUR_PLACEHOLDER =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjEwIiBmaWxsPSIjNTg1QjYzIi8+PC9zdmc+";

type FeaturedProjectsGridProps = {
  projects: Project[];
  prioritizeFirst?: boolean;
  onApiChange?: (api: EmblaCarouselType | undefined) => void;
};

function formatSqft(sqft: number): string {
  return sqft.toLocaleString() + " sq. ft.";
}

function getCardImage(project: Project): GalleryImage | undefined {
  return project.heroImage ?? project.gallery[0];
}

export function FeaturedProjectsGrid({ projects, prioritizeFirst = false, onApiChange }: FeaturedProjectsGridProps) {
  const shouldReduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);

  const autoplayPlugin = useMemo(() => {
    if (shouldReduceMotion || projects.length <= 1) {
      return null;
    }

    return Autoplay({
      delay: 2000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      stopOnFocusIn: true,
      playOnInit: true,
    });
  }, [projects.length, shouldReduceMotion]);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      containScroll: "trimSnaps",
      dragFree: false,
      duration: shouldReduceMotion ? 0 : 26,
      loop: projects.length > 1,
    },
    autoplayPlugin ? [autoplayPlugin] : [],
  );

  useEffect(() => {
    onApiChange?.(emblaApi);
    return () => onApiChange?.(undefined);
  }, [emblaApi, onApiChange]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (!emblaApi) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        emblaApi.scrollPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        emblaApi.scrollNext();
      }
    },
    [emblaApi]
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track || shouldReduceMotion) return;

    const canHoverWithPrecision = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!canHoverWithPrecision) return;

    const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-project-card]"));
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
  }, [shouldReduceMotion]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || shouldReduceMotion) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-project-card]"));

      cards.forEach((card) => {
        const parallaxLayer = card.querySelector<HTMLElement>("[data-parallax-image]");
        if (!parallaxLayer) return;

        gsap.fromTo(
          parallaxLayer,
          { yPercent: 7 },
          {
            yPercent: -7,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          },
        );
      });
    });

    return () => {
      mm.revert();
    };
  }, [projects.length, shouldReduceMotion]);

  return (
    <div aria-roledescription="carousel" aria-label="Featured projects carousel" className="relative">
      <div
        ref={emblaRef}
        className="overflow-hidden"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        role="region"
      >
        <div
          ref={trackRef}
          className="ml-[4vw] flex touch-pan-y gap-6 pr-[4vw] sm:ml-[6vw] sm:gap-7 sm:pr-[6vw] md:ml-[8vw] md:gap-8 md:pr-[8vw] lg:ml-[10vw] lg:pr-[10vw]"
          aria-live="polite"
        >
          {projects.map((project, index) => {
            const cardImage = getCardImage(project);

            return (
              <article
                key={project.id}
                data-project-card
                role="group"
                aria-roledescription="slide"
                aria-label={`Slide ${index + 1} of ${projects.length}: ${project.title}`}
                className="group min-w-0 flex-[0_0_92vw] overflow-hidden rounded-lg border border-line bg-surface sm:flex-[0_0_88vw] md:flex-[0_0_84vw] lg:flex-[0_0_74vw] xl:flex-[0_0_68vw] 2xl:flex-[0_0_65vw] motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_22px_40px_-32px_rgba(15,15,15,0.85)]"
              >
                {/* Image with overlay label + grayscale effect */}
                <div className="relative aspect-[5/4] overflow-hidden grayscale transition-[filter] duration-[900ms] ease-out group-hover:grayscale-0 sm:aspect-[16/11] md:aspect-[16/10]">
                  <div
                    data-parallax-image
                    className="absolute inset-0 will-change-transform motion-safe:transition-transform motion-safe:duration-[1200ms] motion-safe:ease-out motion-safe:group-hover:translate-x-1"
                  >
                    <div data-hover-image className="relative h-full w-full will-change-transform">
                      <div className="relative h-full w-full motion-safe:transition-transform motion-safe:duration-[900ms] motion-safe:ease-out motion-safe:group-hover:scale-[1.025]">
                        <Image
                          src={cardImage?.src ?? "/projects/north-dallas-courtyard-residence/hero.jpg"}
                          alt={cardImage?.alt ?? `${project.title} in ${project.location.city}`}
                          fill
                          sizes="(min-width: 1536px) 65vw, (min-width: 1280px) 68vw, (min-width: 1024px) 74vw, (min-width: 768px) 84vw, (min-width: 640px) 88vw, 92vw"
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
                    className="min-h-[44px] min-w-[44px] w-fit px-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    Explore Project
                  </CtaLink>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
