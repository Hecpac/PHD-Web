"use client";

import { useRef } from "react";
import Image from "next/image";

import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { gsap, useGSAP } from "@/lib/gsap";

const BUILDER_PROJECTS = [
  {
    title: "Modern Farmhouse",
    location: "Frisco, TX",
    sqFt: "4,200",
    turnaround: "14 days",
    image: "/for-builders/projects/project-1.jpg",
    services: ["Floor Plans", "Full CDs", "Permit Support"],
  },
  {
    title: "Contemporary Estate",
    location: "Southlake, TX",
    sqFt: "6,800",
    turnaround: "21 days",
    image: "/for-builders/projects/project-2.jpg",
    services: ["Floor Plans", "3D Renders", "Full CDs", "MEP"],
  },
  {
    title: "Transitional Custom",
    location: "Plano, TX",
    sqFt: "3,600",
    turnaround: "10 days",
    image: "/for-builders/projects/project-3.jpg",
    services: ["Floor Plans", "Elevations", "Permit Support"],
  },
] as const;

export function BuilderProjectsShowcase() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-project-card]");
      if (!cards.length) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(cards, {
          opacity: 0,
          y: 40,
          stagger: 0.12,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(cards, { opacity: 1, y: 0 });
      });

      // Image parallax inside cards — desktop + motion-safe
      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const images = gsap.utils.toArray<HTMLElement>("[data-project-image]");
          images.forEach((img) => {
            const card = img.closest("[data-project-card]");
            if (!card) return;
            gsap.fromTo(
              img,
              { yPercent: -8 },
              {
                yPercent: 8,
                ease: "none",
                force3D: true,
                scrollTrigger: {
                  trigger: card,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              }
            );
          });
        }
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="builder-projects"
      className="section-shell border-t border-line"
    >
      <Container swiss className="space-y-8">
        <SectionHeading
          eyebrow="Builder Projects"
          title="Construction documents delivered for DFW custom homes"
          description="Recent documentation packages produced for local builders — from schematic floor plans to full permit-ready CDs."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {BUILDER_PROJECTS.map((project) => (
            <article
              key={project.title}
              data-project-card
              className="group overflow-hidden rounded-xl border border-line bg-surface shadow-[var(--shadow-card)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <div data-project-image className="absolute -top-[10%] left-0 right-0 h-[120%]">
                  <Image
                    src={project.image}
                    alt={`${project.title} — ${project.location}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute bottom-3 left-3 flex gap-2">
                  <span className="rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-black">
                    {project.sqFt} sf
                  </span>
                  <span className="rounded-full bg-accent/90 px-2.5 py-1 text-xs font-semibold text-on-accent">
                    {project.turnaround}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="type-h3-compact">{project.title}</h3>
                <p className="mt-0.5 text-xs text-muted">{project.location}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.services.map((service) => (
                    <span
                      key={service}
                      className="rounded-md border border-line bg-canvas px-2 py-0.5 text-[11px] text-muted"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
