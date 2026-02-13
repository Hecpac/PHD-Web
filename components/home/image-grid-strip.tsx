import { ParallaxLayer } from "@/components/ui/parallax-layer";

import type { Project } from "@/lib/types/content";

const sectionVideo = "/render/hectorpachano_split_screen_architectural_visualization_left_h_d6ab600a.mp4";
const sectionPoster = "/render/hero-between-heroes.svg";
const sectionParallaxSpeed = 0.32;

type ImageGridStripProps = {
  projects: Project[];
};

export function ImageGridStrip({ projects }: ImageGridStripProps) {
  const cityCount = projects.length;

  return (
    <section
      aria-label="Section divider visual"
      className="relative min-h-[48vh] overflow-hidden border-y border-line"
    >
      <ParallaxLayer speed={sectionParallaxSpeed} disableBelow={768} className="absolute inset-0">
        <div className="relative h-full min-h-[48vh] w-full">
          <video
            src={sectionVideo}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={sectionPoster}
            aria-hidden="true"
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
