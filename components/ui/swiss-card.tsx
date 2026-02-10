"use client";

import { useRef, type ReactNode, type MouseEvent, CSSProperties } from "react";
import { useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

type SwissCardProps = {
  children: ReactNode;
  className?: string;
  /** Show spotlight effect on hover */
  spotlight?: boolean;
  /** Make the card interactive (clickable) */
  href?: string;
  /** onClick handler */
  onClick?: () => void;
};

/**
 * Swiss-style grid card with Aceternity-inspired spotlight hover effect.
 * Clean geometric borders, semantic color tokens, accessible focus states.
 * 
 * Performance: Uses CSS variables for 60fps spotlight tracking.
 */
export function SwissCard({
  children,
  className,
  spotlight = true,
  href,
  onClick,
}: SwissCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!spotlight || shouldReduceMotion || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
    cardRef.current.style.setProperty("--spotlight-opacity", "1");
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty("--spotlight-opacity", "0");
  };

  const isInteractive = Boolean(href || onClick);

  const content = (
    <div
      ref={cardRef}
      className={cn(
        "group relative overflow-hidden border border-line bg-surface p-6 transition-[border-color] duration-150",
        isInteractive && "cursor-pointer mi-card-lift mi-press hover:border-accent/30",
        className,
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        isInteractive
          ? (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onClick?.();
            }
          }
          : undefined
      }
      style={{
        "--mouse-x": "0px",
        "--mouse-y": "0px",
        "--spotlight-opacity": "0",
      } as CSSProperties}
    >
      {/* Spotlight gradient overlay - pure CSS driven */}
      {spotlight && !shouldReduceMotion ? (
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 ease-in-out"
          style={{
            opacity: "var(--spotlight-opacity)",
            background: `radial-gradient(320px circle at var(--mouse-x) var(--mouse-y), color-mix(in oklab, var(--color-accent), transparent 88%), transparent 70%)`,
          }}
          aria-hidden="true"
        />
      ) : null}

      {/* Top accent line */}
      <div
        className="pointer-events-none absolute left-0 top-0 h-px w-0 bg-accent transition-all duration-300 ease-out group-hover:w-full"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        className="block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {content}
      </a>
    );
  }

  return content;
}
