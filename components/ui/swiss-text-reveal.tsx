"use client";

import React, { useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type SwissTextRevealProps = {
  children: ReactNode;
  /** Reveal mode: line-by-line, word-by-word, or character-by-character */
  mode?: "line" | "word" | "char";
  /** Base delay before reveal starts (seconds) */
  delay?: number;
  /** Additional class names */
  className?: string;
  /** HTML tag for the wrapper */
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "span" | "div";
  /** Stagger delay between each line/char in seconds */
  stagger?: number;
  /** Only animate once when entering viewport */
  once?: boolean;
  /** Skip initial hidden state so text is visible before hydration (use for LCP content) */
  noInitialHide?: boolean;
};

/**
 * Swiss-style text reveal animation using GSAP.
 * Reveals text line-by-line, word-by-word, or character-by-character.
 *
 * Performance: Uses GSAP ScrollTrigger for 60fps animations.
 * Accessibility: Respects prefers-reduced-motion.
 */
export function SwissTextReveal({
  children,
  mode = "line",
  delay = 0,
  className,
  as: Tag = "span",
  stagger = 0.06,
  once = true,
  noInitialHide = false,
}: SwissTextRevealProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const setContainerRef = (el: HTMLElement | null) => {
    containerRef.current = el;
  };

  useGSAP(
    () => {
      if (shouldReduceMotion) return;

      const container = containerRef.current;
      if (!container) return;

      const targets = Array.from(
        container.querySelectorAll<HTMLSpanElement>("[data-swiss-reveal]"),
      );

      if (!targets.length) return;

      if (!noInitialHide) {
        gsap.set(targets, {
          yPercent: 120,
          opacity: 0,
          rotateX: mode === "char" ? -20 : 0,
        });
      }

      gsap.to(targets, {
        yPercent: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1.2,
        ease: "power4.out",
        stagger: {
          amount: mode === "char" ? stagger * targets.length * 0.5 : undefined,
          each: mode !== "char" ? stagger : undefined,
          from: "start",
        },
        delay,
        scrollTrigger: {
          trigger: container,
          start: "top 85%",
          toggleActions: once ? "play none none none" : "play none none reverse",
        },
      });
    },
    {
      scope: containerRef,
      dependencies: [shouldReduceMotion, mode, delay, stagger, once, noInitialHide, children],
    },
  );

  if (shouldReduceMotion) {
    return <Tag className={className}>{children}</Tag>;
  }

  const text = typeof children === "string" ? children : "";

  if (mode === "char" && text) {
    const chars = text.split("");

    return (
      <Tag
        ref={setContainerRef}
        className={cn("inline-block leading-tight", className)}
      >
        <span className="sr-only">{text}</span>
        <span aria-hidden="true">
          {chars.map((char, i) => (
            <span
              key={`${i}-${char}`}
              className="inline-block overflow-hidden align-top"
            >
              <span
                data-swiss-reveal
                className="inline-block origin-bottom will-change-transform"
              >
                {char === " " ? "\u00A0" : char}
              </span>
            </span>
          ))}
        </span>
      </Tag>
    );
  }

  if (mode === "word" && text) {
    const words = text.split(" ");

    return (
      <Tag
        ref={setContainerRef}
        className={cn("inline-block leading-tight", className)}
      >
        <span className="sr-only">{text}</span>
        <span aria-hidden="true">
          {words.map((word, i) => (
            <span
              key={`${i}-${word}`}
              className="inline-block overflow-hidden align-top whitespace-nowrap mr-[0.25em]"
            >
              <span data-swiss-reveal className="inline-block will-change-transform">
                {word}
              </span>
            </span>
          ))}
        </span>
      </Tag>
    );
  }

  // Line mode: split by newline (or treat non-string children as a single line)
  const lines = text ? text.split("\n") : [children];

  return (
    <Tag ref={setContainerRef} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden align-top">
          <span data-swiss-reveal className="block will-change-transform">
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
