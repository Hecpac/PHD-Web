"use client";

import { useRef, useEffect, useState, useSyncExternalStore, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type SwissMarqueeProps = {
  children: ReactNode;
  /** Speed in pixels per second */
  speed?: number;
  /** Direction of movement */
  direction?: "left" | "right";
  /** Pause on hover */
  pauseOnHover?: boolean;
  /** Additional class names */
  className?: string;
  /** Gap between repeated items */
  gap?: string;
};

function subscribeToReducedMotion(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

/**
 * Swiss-style horizontal marquee/ticker.
 * Continuous text movement in the typographic poster tradition.
 * Pauses on hover, respects prefers-reduced-motion with static fallback.
 * Uses CSS animations (transform only) for optimal performance.
 */
export function SwissMarquee({
  children,
  speed = 40,
  direction = "left",
  pauseOnHover = true,
  className,
  gap = "var(--space-8, 64px)",
}: SwissMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [duration, setDuration] = useState(20);

  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  // Calculate animation duration from content width in an effect
  useEffect(() => {
    if (prefersReducedMotion) return;

    // Defer measurement to after paint so the DOM is laid out
    const id = requestAnimationFrame(() => {
      const container = containerRef.current;
      if (!container) return;

      const firstChild = container.querySelector("[data-marquee-content]") as HTMLElement | null;
      if (!firstChild) return;

      const contentWidth = firstChild.scrollWidth;
      setDuration(Math.max(contentWidth / speed, 5));
    });

    return () => cancelAnimationFrame(id);
  }, [speed, prefersReducedMotion]);

  // Reduced motion: static display
  if (prefersReducedMotion) {
    return (
      <div
        className={cn(
          "overflow-hidden border-y border-line py-4",
          className,
        )}
        role="marquee"
        aria-live="off"
      >
        <div className="flex items-center" style={{ gap }}>
          {children}
        </div>
      </div>
    );
  }

  const animationDirection = direction === "left" ? "normal" : "reverse";

  return (
    <div
      ref={containerRef}
      className={cn(
        "group overflow-hidden border-y border-line py-4",
        className,
      )}
      role="marquee"
      aria-live="off"
    >
      <div
        className={cn(
          "flex w-max items-center",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
        )}
        style={{
          gap,
          animation: `swiss-marquee ${duration}s linear infinite`,
          animationDirection,
        }}
      >
        {/* Original content */}
        <div className="flex shrink-0 items-center" style={{ gap }} data-marquee-content>
          {children}
        </div>
        {/* Duplicate for seamless loop */}
        <div className="flex shrink-0 items-center" style={{ gap }} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
