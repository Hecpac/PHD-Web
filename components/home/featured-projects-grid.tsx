"use client";

import { useRef } from "react";
import Image from "next/image";

import { CtaLink } from "@/components/ui/cta-link";
import { gsap, useGSAP } from "@/lib/gsap";
import { createStaggerReveal } from "@/lib/gsap/scroll-animations";
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

export function FeaturedProjectsGrid({ projects, prioritizeFirst = false }: FeaturedProjectsGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!gridRef.current) return;
    createStaggerReveal({
      trigger: gridRef.current,
      targets: gsap.utils.toArray<HTMLElement>(gridRef.current.querySelectorAll("article")),
      stagger: 0.12,
      y: 24,
      start: "top 80%",
    });
  }, { scope: gridRef });

  return (
    <div ref={gridRef} className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
      {projects.map((project, index) => {
        const cardImage = getCardImage(project);

        return (
          <article
            key={project.id}
            className={`group overflow-hidden rounded-lg border border-line bg-surface ${index % 2 === 1 ? "md:mt-16" : ""}`}
          >
            {/* Image with overlay label */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={cardImage?.src ?? "/projects/north-dallas-courtyard-residence/hero.jpg"}
                alt={cardImage?.alt ?? `${project.title} in ${project.location.city}`}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
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

            {/* Text below image */}
            <div className="space-y-4 p-6 md:p-8">
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
