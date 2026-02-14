"use client";

import { useRef } from "react";
import Image from "next/image";

import { gsap, useGSAP } from "@/lib/gsap";
import type { Project } from "@/lib/types/content";

type ImageGridStripProps = {
  projects: Project[];
};

const sectionImage = "/render/hero-between-heroes.svg";

export function ImageGridStrip({ projects }: ImageGridStripProps) {
  const cityCount = projects.length;
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const section = sectionRef.current!;
      const image = imageRef.current!;

      gsap.set(section, { clipPath: "inset(100% 0 0 0)" });
      gsap.set(image, { scale: 1.15 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        onStart() {
          section.style.willChange = "clip-path";
          image.style.willChange = "transform";
        },
        onComplete() {
          section.style.willChange = "auto";
          image.style.willChange = "auto";
        },
      });

      tl.to(section, {
        clipPath: "inset(0%)",
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
      gsap.set(sectionRef.current!, { clipPath: "inset(0%)" });
      gsap.set(imageRef.current!, { scale: 1 });
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      aria-label="Section divider visual"
      className="relative border-y border-line"
    >
      <div ref={imageRef} className="absolute inset-0">
        <Image
          src={sectionImage}
          alt="Dallas-Fort Worth custom homes visual"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/30 to-black/55" />
      <div className="relative container-swiss flex min-h-[36vh] items-center py-10 sm:min-h-[42vh] sm:py-14">
        <p className="max-w-xl text-sm font-medium uppercase tracking-[0.06em] text-white sm:text-base">
          Featured portfolio from {cityCount} DFW projects.
        </p>
      </div>
    </section>
  );
}
