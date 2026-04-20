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
    services: ["Floor Plans", "Construction Docs", "Permit Support"],
  },
  {
    title: "Modern Family Home",
    location: "Dallas, TX",
    sqFt: "5,400",
    turnaround: "18 days",
    image: "/hectorpachano_Photorealistic_3D_architectural_render_of_a_lux_302dcd34-2992-410a-baca-2a11508e029c_0.png",
    services: ["Concept Design", "3D Renders", "Floor Plans"],
  },
  {
    title: "Contemporary Estate",
    location: "Southlake, TX",
    sqFt: "6,800",
    turnaround: "21 days",
    image: "/hectorpachano_architectural_floor_plan_3D_isometric_view_mode_2f29cc4b-8226-422c-9f1a-7f98ce131593_1.png",
    services: ["Floor Plans", "3D Renders", "Construction Docs", "MEP"],
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

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(cards, { opacity: 1, y: 0 });
      });

      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          // Sticky cards parallax scale effect
          cards.forEach((card, i) => {
            if (i === cards.length - 1) return;
            
            gsap.to(card, {
              scale: 0.95,
              opacity: 0.5,
              transformOrigin: "top center",
              ease: "none",
              scrollTrigger: {
                trigger: cards[i + 1],
                start: "top 85%",
                end: "top 20%",
                scrub: true,
              },
            });
          });

          // Image parallax inside cards
          const images = gsap.utils.toArray<HTMLElement>("[data-project-image]");
          images.forEach((img) => {
            const card = img.closest("[data-project-card]");
            if (!card) return;
            gsap.fromTo(
              img,
              { yPercent: -5 },
              {
                yPercent: 5,
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

      mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
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
          title="Drafting packages delivered for regional custom homes"
          description="Recent documentation packages produced for builders across DFW & North Texas — from schematic floor plans to permit-ready construction documents."
        />

        <div className="flex flex-col gap-10 md:gap-24 relative pb-10">
          {BUILDER_PROJECTS.map((project, index) => (
            <article
              key={project.title}
              data-project-card
              className="group overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow-card)] md:sticky"
              style={{ top: `calc(12vh + ${index * 16}px)`, zIndex: index + 1 }}
            >
              <div className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden bg-canvas">
                <div data-project-image className="absolute -top-[5%] left-0 right-0 h-[110%]">
                  <Image
                    src={project.image}
                    alt={`${project.title} — ${project.location}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="100vw"
                  />
                </div>
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 flex gap-3">
                  <span className="rounded-full bg-white/95 px-3 py-1.5 text-xs md:text-sm font-semibold text-black backdrop-blur-sm">
                    {project.sqFt} sf
                  </span>
                  <span className="rounded-full bg-accent/95 px-3 py-1.5 text-xs md:text-sm font-semibold text-on-accent backdrop-blur-sm">
                    {project.turnaround}
                  </span>
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 md:p-8">
                <div>
                  <h3 className="type-h3-standard text-xl md:text-2xl">{project.title}</h3>
                  <p className="mt-1.5 text-sm md:text-base text-muted">{project.location}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {project.services.map((service) => (
                    <span
                      key={service}
                      className="rounded-md border border-line bg-canvas px-3 py-1.5 text-xs md:text-sm text-muted"
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
