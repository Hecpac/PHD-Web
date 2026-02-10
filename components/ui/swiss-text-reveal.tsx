"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

type SwissTextRevealProps = {
  children: ReactNode;
  /** Reveal mode: line-by-line, word-by-word, or character-by-character */
  mode?: "line" | "word" | "char";
  /** Additional class names */
  className?: string;
  /** HTML tag for the wrapper */
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "span" | "div";
  /** Stagger delay between each line/char in seconds */
  stagger?: number;
  /** Only animate once when entering viewport */
  once?: boolean;
};

const springTransition = { type: "spring" as const, stiffness: 70, damping: 18 };

/**
 * Swiss-style text reveal animation.
 * Reveals text line-by-line or character-by-character using framer-motion.
 * Respects prefers-reduced-motion.
 */
export function SwissTextReveal({
  children,
  mode = "line",
  className,
  as: Tag = "div",
  stagger = 0.06,
  once = true,
}: SwissTextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once, margin: "-10%" });
  const shouldReduceMotion = useReducedMotion();

  // If reduced motion, render static text immediately
  if (shouldReduceMotion) {
    return <Tag className={className}>{children}</Tag>;
  }

  const text = typeof children === "string" ? children : "";

  if (mode === "char" && text) {
    const chars = text.split("");

    return (
      <Tag ref={ref as any} className={cn("inline-block", className)} aria-label={text}>
        {chars.map((char, i) => (
          <motion.span
            key={`${i}-${char}`}
            className="inline-block"
            aria-hidden="true"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ ...springTransition, delay: i * stagger }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </Tag>
    );
  }

  // Word mode: split by spaces
  if (mode === "word" && text) {
    const words = text.split(" ");

    return (
      <Tag ref={ref as any} className={cn("inline-block", className)} aria-label={text}>
        {words.map((word, i) => (
          <span key={`${i}-${word}`} className="inline-block whitespace-nowrap">
            <motion.span
              className="inline-block"
              aria-hidden="true"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ ...springTransition, delay: i * stagger }}
            >
              {word}
            </motion.span>
            {/* Add space after word unless it's the last one */}
            {i < words.length - 1 && <span className="inline-block">&nbsp;</span>}
          </span>
        ))}
      </Tag>
    );
  }

  // Line mode: split by newline or treat as single line
  const lines = text ? text.split("\n") : [children];

  return (
    <Tag ref={ref as any} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className="block"
            initial={{ opacity: 0, y: "100%" }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: "100%" }}
            transition={{ ...springTransition, delay: i * stagger }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
