"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type BeforeAfterSliderProps = {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
};

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  className,
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));

    setSliderPosition(percent);
  }, []);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove],
  );

  const onTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove],
  );

  const stopDragging = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", stopDragging);
      window.addEventListener("touchmove", onTouchMove, { passive: false });
      window.addEventListener("touchend", stopDragging);
    } else {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", stopDragging);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", stopDragging);
    }

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", stopDragging);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", stopDragging);
    };
  }, [isDragging, onMouseMove, onTouchMove, stopDragging]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden select-none touch-none group",
        "aspect-[4/3] md:aspect-[16/9] rounded-xl border border-line bg-surface-2",
        "[container-type:inline-size]", // Enable container queries
        className
      )}
      onMouseDown={(e) => {
        setIsDragging(true);
        handleMove(e.clientX);
      }}
      onTouchStart={(e) => {
        setIsDragging(true);
        handleMove(e.touches[0].clientX);
      }}
    >
      {/* Background (After) Image - e.g. 3D Render */}
      <Image
        src={afterImage}
        alt={afterLabel}
        fill
        className="object-cover"
        priority
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <div className="absolute top-2 right-2 md:top-4 md:right-4 z-10 max-w-[45%] rounded-md bg-canvas/80 px-2 md:px-3 py-1 backdrop-blur-sm">
        <span className="block truncate font-mono text-[9px] md:text-xs font-semibold tracking-widest text-accent uppercase">{afterLabel}</span>
      </div>

      {/* Foreground (Before) Image - e.g. Floor Plan */}
      <div
        className="absolute inset-y-0 left-0 z-20 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        {/* The inner container must be exactly the width of the main container (100cqw) so the image doesn't squish */}
        <div className="relative h-full" style={{ width: "100cqw" }}>
           <Image
            src={beforeImage}
            alt={beforeLabel}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      <div className="absolute top-2 left-2 md:top-4 md:left-4 z-30 max-w-[45%] rounded-md bg-canvas/80 px-2 md:px-3 py-1 backdrop-blur-sm">
        <span className="block truncate font-mono text-[9px] md:text-xs font-semibold tracking-widest text-muted uppercase">{beforeLabel}</span>
      </div>

      {/* Slider Handle */}
      <div
        className="absolute inset-y-0 z-30 w-1 cursor-ew-resize bg-accent shadow-[0_0_10px_rgba(0,0,0,0.5)]"
        style={{ left: `calc(${sliderPosition}% - 2px)` }}
      >
        <div className="absolute top-1/2 left-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-on-accent shadow-lg transition-transform group-hover:scale-110">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6" />
            <path d="m15 18-6-6 6-6" />
          </svg>
        </div>
      </div>
    </div>
  );
}
