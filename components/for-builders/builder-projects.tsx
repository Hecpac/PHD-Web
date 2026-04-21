"use client";

import { useRef } from "react";
import Image from "next/image";

import { useTranslations } from "next-intl";

import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { gsap, useGSAP } from "@/lib/gsap";

export function BuilderProjectsShowcase() {
  const t = useTranslations("forBuildersPage");
  const sectionRef = useRef<HTMLElement>(null);

  const BUILDER_PROJECTS = [
    {
      title: t("project1Title"),
      location: t("project1Location"),
      sqFt: "4,200",
      turnaround: t("project1Turnaround"),
      image: "/for-builders/projects/project-1.jpg",
      services: [t("projectServiceFloorPlans"), t("projectServiceConstructionDocs"), t("projectServicePermitSupport")],
    },
    {
      title: t("project2Title"),
      location: t("project2Location"),
      sqFt: "5,400",
      turnaround: t("project2Turnaround"),
      image: "/hectorpachano_Photorealistic_3D_architectural_render_of_a_lux_302dcd34-2992-410a-baca-2a11508e029c_0.png",
      services: [t("projectServiceConceptDesign"), t("projectService3dRenders"), t("projectServiceFloorPlans")],
    },
    {
      title: t("project3Title"),
      location: t("project3Location"),
      sqFt: "6,800",
      turnaround: t("project3Turnaround"),
      image: "/hectorpachano_architectural_floor_plan_3D_isometric_view_mode_2f29cc4b-8226-422c-9f1a-7f98ce131593_1.png",
      services: [t("projectServiceFloorPlans"), t("projectService3dRenders"), t("projectServiceConstructionDocs"), t("projectServiceMEP")],
    },
    {
      title: t("project4Title"),
      location: t("project4Location"),
      sqFt: "3,600",
      turnaround: t("project4Turnaround"),
      image: "/for-builders/projects/project-3.jpg",
      services: [t("projectServiceFloorPlans"), t("projectServiceElevations"), t("projectServicePermitSupport")],
    },
  ];

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
          eyebrow={t("projectsEyebrow")}
          title={t("projectsTitle")}
          description={t("projectsDescription")}
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
