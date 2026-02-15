"use client";

import { useRef } from "react";
import Image from "next/image";

import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { animateSwissEntrance } from "@/lib/gsap/animations";
import { cn } from "@/lib/utils";

/* ──────────────────────────────────────────────
   Types
   ────────────────────────────────────────────── */

type BentoCellSpan = "1x1" | "2x1" | "1x2" | "2x2";

export type BentoItem = {
  id: string;
  title: string;
  description?: string;
  eyebrow?: string;
  /** Stat or metric value displayed large */
  stat?: string | React.ReactNode;
  /** Unit or label below the stat */
  statLabel?: string;
  /** Image source for visual cells */
  imageSrc?: string;
  imageAlt?: string;
  /** Grid span: columns x rows */
  span?: BentoCellSpan;
  /** Visual variant */
  variant?: "default" | "accent" | "surface" | "image";
};

type BentoGridProps = {
  items: BentoItem[];
  className?: string;
};

/* ──────────────────────────────────────────────
   Grid span → CSS class mapping
   ────────────────────────────────────────────── */

const spanClasses: Record<BentoCellSpan, string> = {
  "1x1": "",
  "2x1": "md:col-span-2",
  "1x2": "md:row-span-2",
  "2x2": "md:col-span-2 md:row-span-2",
};

const minHeightClasses: Record<BentoCellSpan, string> = {
  "1x1": "min-h-[clamp(14rem,34vw,19rem)]",
  "2x1": "min-h-[clamp(15rem,32vw,21rem)]",
  "1x2": "min-h-[clamp(18rem,46vw,30rem)]",
  "2x2": "min-h-[clamp(20rem,52vw,34rem)]",
};

const variantClasses: Record<NonNullable<BentoItem["variant"]>, string> = {
  default: "brand-red-outline brand-red-surface bg-surface border border-line",
  accent: "bg-accent text-on-accent",
  surface: "brand-red-outline brand-red-surface-2 bg-surface-2 border border-line",
  image: "brand-red-outline relative overflow-hidden border border-line",
};

/* ──────────────────────────────────────────────
   BentoCell
   ────────────────────────────────────────────── */

function BentoCell({ item }: { item: BentoItem }) {
  const span = item.span ?? "1x1";
  const variant = item.variant ?? "default";

  return (
    <article
      className={cn(
        "bento-cell flex flex-col justify-end p-5 sm:p-6",
        minHeightClasses[span],
        spanClasses[span],
        variantClasses[variant],
      )}
    >
      {/* Image background */}
      {variant === "image" && item.imageSrc ? (
        <>
          <Image
            src={item.imageSrc}
            alt={item.imageAlt ?? item.title}
            fill
            sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
          {/* Gradient overlay for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        </>
      ) : null}

      {/* Content layer */}
      <div className={cn("relative z-10", variant === "image" && "text-white")}>
        {item.eyebrow ? (
          <p
            className={cn(
              "type-mono-label mb-2",
              variant === "accent" ? "text-on-accent/70" : variant === "image" ? "text-white/70" : "text-muted",
            )}
          >
            {item.eyebrow}
          </p>
        ) : null}

        {/* Stat display */}
        {item.stat ? (
          <div className="mb-3">
            <p className="type-hero font-black tabular-nums">{item.stat}</p>
            {item.statLabel ? (
              <p
                className={cn(
                  "type-caption mt-1",
                  variant === "accent" ? "text-on-accent/70" : variant === "image" ? "text-white/60" : "text-muted",
                )}
              >
                {item.statLabel}
              </p>
            ) : null}
          </div>
        ) : null}

        <h3 className="type-heading">{item.title}</h3>

        {item.description ? (
          <p
            className={cn(
              "mt-2 text-sm leading-6",
              variant === "accent" ? "text-on-accent/80" : variant === "image" ? "text-white/80" : "text-muted",
            )}
          >
            {item.description}
          </p>
        ) : null}
      </div>
    </article>
  );
}

/* ──────────────────────────────────────────────
   BentoGrid — Animated container
   ────────────────────────────────────────────── */

export function BentoGrid({ items, className }: BentoGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    const cells = gsap.utils.toArray<HTMLElement>(".bento-cell", containerRef.current);
    if (!cells.length) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      animateSwissEntrance(cells, {
        y: 60,
        scale: 0.96,
        stagger: { amount: 0.4, from: "random" },
        duration: 0.9,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: containerRef.current!,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Refresh ScrollTrigger after grid images load
      // to recalculate positions
      ScrollTrigger.refresh();
    });

    // Reduced motion: opacity-only fade, no translate
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.from(cells, {
        opacity: 0,
        duration: 0.3,
        stagger: 0.05,
        scrollTrigger: {
          trigger: containerRef.current!,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    });
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className={cn(
        "grid grid-cols-1 gap-px",
        "sm:grid-cols-2",
        "lg:grid-cols-4",
        className,
      )}
    >
      {items.map((item) => (
        <BentoCell key={item.id} item={item} />
      ))}
    </div>
  );
}
