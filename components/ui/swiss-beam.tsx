"use client";

import { useRef, type CSSProperties } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

type SwissBeamProps = {
  /** Orientation of the beam line */
  direction?: "horizontal" | "vertical";
  /** Length of the beam (CSS value) */
  length?: string;
  /** Thickness of the beam in pixels */
  thickness?: number;
  /** Color — defaults to accent */
  color?: string;
  /** Additional class names */
  className?: string;
  /** Animate only once */
  once?: boolean;
  /** Animation delay in seconds */
  delay?: number;
};

const springTransition = { type: "spring" as const, stiffness: 70, damping: 18 };

/**
 * Swiss-style animated beam/line effect.
 * A geometric, minimalist line that animates into view using
 * transform (scaleX/scaleY) for zero-layout-shift performance.
 * Inspired by pmndrs post-processing beam aesthetics.
 */
export function SwissBeam({
  direction = "horizontal",
  length = "100%",
  thickness = 1,
  color,
  className,
  once = true,
  delay = 0,
}: SwissBeamProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-20px" });
  const shouldReduceMotion = useReducedMotion();

  const isHorizontal = direction === "horizontal";

  const style: CSSProperties = {
    width: isHorizontal ? length : `${thickness}px`,
    height: isHorizontal ? `${thickness}px` : length,
    background: color ?? "var(--color-accent)",
    transformOrigin: isHorizontal ? "left center" : "center top",
  };

  // Reduced motion: show the line immediately, no animation
  if (shouldReduceMotion) {
    return (
      <div
        ref={ref}
        className={cn("shrink-0", className)}
        style={style}
        aria-hidden="true"
      />
    );
  }

  return (
    <motion.div
      ref={ref}
      className={cn("shrink-0", className)}
      style={style}
      aria-hidden="true"
      initial={isHorizontal ? { scaleX: 0 } : { scaleY: 0 }}
      animate={
        isInView
          ? isHorizontal
            ? { scaleX: 1 }
            : { scaleY: 1 }
          : isHorizontal
            ? { scaleX: 0 }
            : { scaleY: 0 }
      }
      transition={{ ...springTransition, delay }}
    />
  );
}

/**
 * Swiss-style animated crosshair / grid intersection marker.
 * Two perpendicular beams forming a + shape.
 */
export function SwissCrosshair({
  size = 32,
  thickness = 1,
  color,
  className,
  once = true,
  delay = 0,
}: {
  size?: number;
  thickness?: number;
  color?: string;
  className?: string;
  once?: boolean;
  delay?: number;
}) {
  return (
    <div
      className={cn("relative", className)}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <div className="absolute left-0 top-1/2 -translate-y-1/2">
        <SwissBeam
          direction="horizontal"
          length={`${size}px`}
          thickness={thickness}
          color={color}
          once={once}
          delay={delay}
        />
      </div>
      <div className="absolute left-1/2 top-0 -translate-x-1/2">
        <SwissBeam
          direction="vertical"
          length={`${size}px`}
          thickness={thickness}
          color={color}
          once={once}
          delay={delay + 0.1}
        />
      </div>
    </div>
  );
}
