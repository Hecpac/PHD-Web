import Image from "next/image";
import { ParallaxLayer } from "@/components/ui/parallax-layer";

import type { Project } from "@/lib/types/content";

const sectionImage = "/render/hero-between-heroes.svg";
const sectionParallaxSpeed = 0.32;

type ImageGridStripProps = {
  projects: Project[];
};

export function ImageGridStrip({ projects }: ImageGridStripProps) {
  const cityCount = projects.length;

  return (
    <section
      aria-label="Section divider visual"
      className="relative overflow-hidden border-y border-line"
    >
      <ParallaxLayer speed={sectionParallaxSpeed} disableBelow={768} className="absolute inset-0">
        <div className="relative h-[120%] w-full -translate-y-[10%]">
          <Image
            src={sectionImage}
            alt="Dallas-Fort Worth custom homes visual"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </ParallaxLayer>
      <div className="absolute inset-0 bg-black/35" />
      <div className="relative container-swiss flex min-h-[48vh] items-center py-12 sm:py-16">
        <p className="max-w-xl text-sm font-medium uppercase tracking-[0.06em] text-white sm:text-base">
          Featured portfolio from {cityCount} DFW projects.
        </p>
      </div>
    </section>
  );
}
