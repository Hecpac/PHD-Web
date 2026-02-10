import { ScrollRevealImage } from "@/components/ui/scroll-reveal-image";
import { ParallaxLayer } from "@/components/ui/parallax-layer";

import type { Project } from "@/lib/types/content";

const parallaxSpeeds = [0.15, 0.25, -0.1, 0.2];

type ImageGridStripProps = {
  projects: Project[];
};

export function ImageGridStrip({ projects }: ImageGridStripProps) {
  // Collect up to 4 gallery images from projects
  const images = projects
    .flatMap((p) =>
      p.gallery.map((img) => ({
        ...img,
        projectTitle: p.title,
      })),
    )
    .slice(0, 4);

  if (images.length === 0) return null;

  return (
    <section aria-label="Project gallery highlights" className="py-4">
      <div className="container-swiss">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
          {images.map((image, index) => (
            <ParallaxLayer
              key={`${image.src}-${index}`}
              speed={parallaxSpeeds[index] ?? 0.2}
              disableBelow={768}
            >
              <ScrollRevealImage
                wrapperClassName="group relative aspect-[5/4] rounded-sm"
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="transition-transform duration-700 ease-out group-hover:scale-105"
                direction="up"
                delay={index * 0.1}
              />
            </ParallaxLayer>
          ))}
        </div>
      </div>
    </section>
  );
}
