"use client";

import { useRef } from "react";
import Image from "next/image";

import { gsap, useGSAP } from "@/lib/gsap";
import type { Project } from "@/lib/types/content";

type ImageGridStripProps = {
  projects: Project[];
};

const FALLBACK_SECTION_IMAGE = "/projects/north-dallas-courtyard-residence/hero.jpg";
const REVEAL_FALLBACK_BG = "linear-gradient(145deg, #5b0f1d 0%, #b71f3f 52%, #7d1630 100%)";

export function ImageGridStrip({ projects }: ImageGridStripProps) {
  const cityCount = projects.length;
  const sectionRef = useRef<HTMLElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const showcaseProject = projects.find((project) => project.heroImage) ?? projects[0];
  const sectionImage = showcaseProject?.heroImage?.src ?? FALLBACK_SECTION_IMAGE;
  const sectionAlt = showcaseProject?.heroImage?.alt ?? "Dallas-Fort Worth custom homes visual";

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const section = sectionRef.current!;
      const reveal = revealRef.current!;
      const image = imageRef.current!;

      // Avoid “black window” showing the sticky hero behind:
      // keep section background visible; only clip the inner reveal wrapper.
      gsap.set(reveal, { clipPath: "inset(100% 0 0 0)", yPercent: 8, autoAlpha: 0.82 });
      gsap.set(image, { scale: 1.15 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        onStart() {
          reveal.style.willChange = "clip-path, transform, opacity";
          image.style.willChange = "transform";
        },
        onComplete() {
          reveal.style.willChange = "auto";
          image.style.willChange = "auto";
        },
      });

      tl.to(reveal, {
        clipPath: "inset(0%)",
        yPercent: 0,
        autoAlpha: 1,
        duration: 1.4,
        ease: "power4.out",
      }).to(
        image,
        {
          scale: 1,
          duration: 1.4,
          ease: "power4.out",
        },
        "<",
      );
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(revealRef.current!, { clipPath: "inset(0%)", yPercent: 0, autoAlpha: 1 });
      gsap.set(imageRef.current!, { scale: 1 });
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      aria-label="Section divider visual"
      className="relative overflow-hidden border-y border-line"
      style={{ background: REVEAL_FALLBACK_BG }}
    >
      <div ref={revealRef} className="relative">
        <div ref={imageRef} className="absolute inset-0">
          <Image
            src={sectionImage}
            alt={sectionAlt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-canvas/68 via-canvas/36 to-canvas/52" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(120% 90% at 10% 8%, color-mix(in oklab, var(--color-accent), transparent 87%) 0%, transparent 62%)",
          }}
        />
        <div className="relative container-swiss flex min-h-[30vh] items-center py-9 sm:min-h-[36vh] sm:py-12">
          <p className="max-w-xl rounded-md border border-line/70 bg-canvas/78 px-4 py-2 text-sm font-medium uppercase tracking-[0.06em] text-ink sm:text-base">
            Featured portfolio from {cityCount} DFW projects.
          </p>
        </div>
      </div>
    </section>
  );
}
