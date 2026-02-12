import Image from "next/image";

import type { Project } from "@/lib/types/content";

type ImageGridStripProps = {
  projects: Project[];
};

const sectionImage = "/render/hero-between-heroes.svg";

export function ImageGridStrip({ projects }: ImageGridStripProps) {
  const cityCount = projects.length;

  return (
    <section
      aria-label="Section divider visual"
      className="relative border-y border-line"
    >
      <Image
        src={sectionImage}
        alt="Dallas-Fort Worth custom homes visual"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/35" />
      <div className="relative container-swiss flex min-h-[48vh] items-center py-12 sm:py-16">
        <p className="max-w-xl text-sm font-medium uppercase tracking-[0.06em] text-white sm:text-base">
          Featured portfolio from {cityCount} DFW projects.
        </p>
      </div>
    </section>
  );
}
