"use client";

import { useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useReducedMotion } from "framer-motion";

import { CarouselDots, CarouselPrevButton, CarouselNextButton, useCarouselButtons } from "@/components/ui/carousel-controls";
import type { GalleryImage } from "@/lib/types/content";

type ProjectGalleryProps = {
  images: GalleryImage[];
  projectTitle: string;
  onImageClick?: (index: number) => void;
};

export function ProjectGallery({ images, projectTitle, onImageClick }: ProjectGalleryProps) {
  const shouldReduceMotion = useReducedMotion();

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      dragFree: false,
      duration: shouldReduceMotion ? 0 : 25,
    },
    shouldReduceMotion ? [] : [Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true })],
  );

  const { canPrev, canNext, scrollPrev, scrollNext } = useCarouselButtons(emblaApi);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") { e.preventDefault(); scrollPrev(); }
      else if (e.key === "ArrowRight") { e.preventDefault(); scrollNext(); }
    },
    [scrollPrev, scrollNext],
  );

  if (images.length === 0) return null;

  return (
    <div
      aria-roledescription="carousel"
      aria-label={`${projectTitle} gallery`}
      className="relative"
    >
      {/* Viewport */}
      <div
        ref={emblaRef}
        className="overflow-hidden rounded-2xl border border-line bg-surface"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        role="region"
      >
        <div className="flex">
          {images.map((image, idx) => (
            <div
              key={`${image.src}-${idx}`}
              className="min-w-0 flex-[0_0_100%]"
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${idx + 1} of ${images.length}: ${image.alt}`}
            >
              <button
                type="button"
                onClick={() => onImageClick?.(idx)}
                className="block w-full focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent"
                aria-label={`View ${image.alt} in lightbox`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  className="h-auto w-full object-cover"
                  sizes="(min-width: 1024px) 65vw, 95vw"
                  {...(idx === 0 ? { priority: true, fetchPriority: "high" as const } : {})}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      {images.length > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-2">
            <CarouselPrevButton onClick={scrollPrev} disabled={!canPrev} aria-label="Previous image" />
            <CarouselNextButton onClick={scrollNext} disabled={!canNext} aria-label="Next image" />
          </div>
          <CarouselDots emblaApi={emblaApi} />
        </div>
      )}
    </div>
  );
}
