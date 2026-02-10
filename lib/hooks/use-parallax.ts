"use client";

import { useRef } from "react";
import {
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

type UseParallaxOptions = {
  speed?: number;
  axis?: "y" | "x";
};

type UseParallaxReturn = {
  ref: React.RefObject<HTMLElement | null>;
  value: MotionValue<number>;
  isDisabled: boolean;
};

export function useParallax({
  speed = 0.2,
  axis = "y",
}: UseParallaxOptions = {}): UseParallaxReturn {
  const ref = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const value = useTransform(
    scrollYProgress,
    [0, 1],
    axis === "y"
      ? [speed * -100, speed * 100]
      : [speed * -100, speed * 100],
  );

  return {
    ref,
    value,
    isDisabled: !!shouldReduceMotion,
  };
}
