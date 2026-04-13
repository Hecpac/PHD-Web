"use client";

import { useRef } from "react";
import Image from "next/image";

import { gsap, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { CtaLink } from "@/components/ui/cta-link";
import type { Project, GalleryImage } from "@/lib/types/content";
import { cn } from "@/lib/utils";

function getCardImage(project: Project): GalleryImage | undefined {
  return project.heroImage ?? project.gallery[0];
}

function ProjectCapsule({ project, index }: { project: Project; index: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const cardImage = getCardImage(project);

  useGSAP(() => {
    if (!containerRef.current || !bgRef.current || !textRef.current) return;

    gsap.set(bgRef.current, { yPercent: 0 });
    gsap.set(textRef.current, { opacity: 1, y: 0 });

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      // Parallax simétrico: imagen se desplaza -10% → 10% durante el scroll
      gsap.fromTo(
        bgRef.current,
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // Text reveal: aparece al entrar en viewport, sin scrub (duración fija)
      gsap.from(textRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-[68dvh] w-full overflow-hidden rounded-[2.5rem] shadow-2xl sm:h-[72dvh] sm:rounded-[3.5rem] lg:sticky lg:top-0 lg:h-dvh"
      )}
      style={{ zIndex: index + 1 }}
    >
      {/* Imagen de fondo con parallax */}
      <div
        ref={bgRef}
        className={cn(
          "pointer-events-none absolute inset-0 z-0 w-full h-full top-0 lg:h-[120%] lg:-top-[10%]"
        )}
      >
        <Image
          src={cardImage?.src ?? "/projects/duplex/hero.jpg"}
          alt={cardImage?.alt ?? project.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority={index === 0}
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Contenido centrado verticalmente */}
      <div
        ref={textRef}
        className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center sm:px-6"
      >
        <h3 className="mb-4 text-4xl font-medium tracking-tight text-white sm:text-6xl lg:text-7xl">
          {project.title}
        </h3>
        <p className="mb-8 font-mono text-xs uppercase tracking-widest text-white/80 sm:text-sm">
          {project.location.display}
        </p>
        <CtaLink
          href={`/projects/${project.slug}`}
          variant="secondary"
          eventName="gallery_interaction"
          className="border-white/20 bg-white/10 text-white backdrop-blur-md transition-colors duration-300 hover:border-white hover:bg-white hover:text-ink"
        >
          Explore Project
        </CtaLink>
      </div>
    </div>
  );
}

type FeaturedProjectsSectionProps = {
  projects: Project[];
};

export function FeaturedProjectsSection({ projects }: FeaturedProjectsSectionProps) {
  return (
    <section
      id="featured-projects"
      className="relative overflow-visible bg-[#1c1c1c] pt-24 pb-0 text-white sm:pt-32"
    >
      <Container swiss className="mb-16 space-y-10">
        <SectionHeading
          eyebrow="Featured Projects"
          title={
            <>
              Built work across{" "}
              <em className="not-italic text-accent">DFW, North Texas & Southern Oklahoma</em>
            </>
          }
          description="Portfolio evidence comes first. Each project reflects design intent, execution discipline, and documented handoff quality."
        />
      </Container>

      {/* Edge-to-edge con px mínimo para mostrar bordes redondeados vs fondo rojo */}
      <div className="px-3 sm:px-4">
        <div className="relative flex flex-col">
          {projects.map((project, index) => (
            <ProjectCapsule key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
