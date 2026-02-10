"use client";

import { useRef, useCallback, useSyncExternalStore, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

type ParallaxLayerProps = {
  children: ReactNode;
  speed?: number;
  axis?: "y" | "x";
  disableBelow?: number;
  className?: string;
};

function useMediaQuery(query: string | undefined): boolean {
  const subscribe = useCallback(
    (callback: () => void) => {
      if (!query) return () => {};
      const mql = window.matchMedia(query);
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    },
    [query],
  );

  const getSnapshot = useCallback(() => {
    if (!query) return true;
    return window.matchMedia(query).matches;
  }, [query]);

  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function ParallaxLayer({
  children,
  speed = 0.2,
  axis = "y",
  disableBelow,
  className,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const mediaQuery = disableBelow
    ? `(min-width: ${disableBelow}px)`
    : undefined;
  const aboveBreakpoint = useMediaQuery(mediaQuery);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const value = useTransform(
    scrollYProgress,
    [0, 1],
    [speed * -100, speed * 100],
  );

  if (shouldReduceMotion || !aboveBreakpoint) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} style={{ overflow: "hidden" }} className={className}>
      <motion.div style={axis === "y" ? { y: value } : { x: value }}>
        {children}
      </motion.div>
    </div>
  );
}
