"use client";

import { useCallback, useEffect, useState } from "react";
import type { EmblaCarouselType } from "embla-carousel";
import { cn } from "@/lib/utils";

type ButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  "aria-label": string;
};

export function CarouselPrevButton({ onClick, disabled, className, "aria-label": ariaLabel }: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={cn(
        "inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-ink transition-colors hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-40 disabled:pointer-events-none",
        className,
      )}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

export function CarouselNextButton({ onClick, disabled, className, "aria-label": ariaLabel }: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={cn(
        "inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-ink transition-colors hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-40 disabled:pointer-events-none",
        className,
      )}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

type DotsProps = {
  emblaApi: EmblaCarouselType | undefined;
  className?: string;
};

export function CarouselDots({ emblaApi, className }: DotsProps) {
  const [, rerender] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onUpdate = () => rerender((n) => n + 1);
    emblaApi.on("select", onUpdate);
    emblaApi.on("reInit", onUpdate);
    return () => {
      emblaApi.off("select", onUpdate);
      emblaApi.off("reInit", onUpdate);
    };
  }, [emblaApi]);

  const scrollSnaps = emblaApi?.scrollSnapList() ?? [];
  const selectedIndex = emblaApi?.selectedScrollSnap() ?? 0;

  return (
    <div className={cn("flex justify-center gap-1", className)} role="group" aria-label="Slide indicators">
      {scrollSnaps.map((_, idx) => (
        <button
          key={idx}
          type="button"
          aria-label={`Go to slide ${idx + 1}`}
          aria-current={idx === selectedIndex ? "true" : undefined}
          onClick={() => emblaApi?.scrollTo(idx)}
          className="flex min-h-[24px] min-w-[24px] items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <span
            className={cn(
              "block h-2 w-2 rounded-full transition-[transform,opacity] duration-200",
              idx === selectedIndex ? "scale-x-[3] bg-accent" : "bg-line",
            )}
          />
        </button>
      ))}
    </div>
  );
}

export function useCarouselButtons(emblaApi: EmblaCarouselType | undefined) {
  const [, rerender] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onUpdate = () => rerender((n) => n + 1);
    emblaApi.on("select", onUpdate);
    emblaApi.on("reInit", onUpdate);
    return () => {
      emblaApi.off("select", onUpdate);
      emblaApi.off("reInit", onUpdate);
    };
  }, [emblaApi]);

  const canPrev = emblaApi?.canScrollPrev() ?? false;
  const canNext = emblaApi?.canScrollNext() ?? false;

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return { canPrev, canNext, scrollPrev, scrollNext };
}
