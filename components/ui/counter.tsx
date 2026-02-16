"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

type CounterProps = {
  value: number;
  direction?: "up" | "down";
  className?: string;
  prefix?: string;
  suffix?: string;
};

export function Counter({
  value,
  direction = "up",
  className,
  prefix = "",
  suffix = "",
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const motionValue = useMotionValue(direction === "down" ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    const target = direction === "down" ? 0 : value;

    if (shouldReduceMotion) {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.floor(target).toLocaleString()}${suffix}`;
      }
      return;
    }

    motionValue.set(target);
  }, [direction, isInView, motionValue, prefix, shouldReduceMotion, suffix, value]);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.floor(latest).toLocaleString()}${suffix}`;
      }
    });

    return unsubscribe;
  }, [prefix, shouldReduceMotion, springValue, suffix]);

  return <span ref={ref} className={className} />;
}
