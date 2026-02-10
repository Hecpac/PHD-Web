"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type IdleWindow = Window & {
  requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
  cancelIdleCallback?: (handle: number) => void;
};

export function HeroVisual() {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [overlayVisible, setOverlayVisible] = useState(true);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    const idleWindow = window as IdleWindow;

    if (idleWindow.requestIdleCallback) {
      const idleId = idleWindow.requestIdleCallback(() => setOverlayVisible(false), {
        timeout: 1200,
      });

      return () => idleWindow.cancelIdleCallback?.(idleId);
    }

    const timeout = window.setTimeout(() => setOverlayVisible(false), 550);
    return () => window.clearTimeout(timeout);
  }, [shouldReduceMotion]);

  return (
    <div ref={containerRef} className="relative overflow-hidden rounded-sm border border-line bg-surface shadow-2xl">
      <motion.div style={{ y: shouldReduceMotion ? 0 : imageY }}>
        <Image
          src="/projects/north-dallas-courtyard-residence/living.jpg"
          alt="Modern custom home interior in Dallas-Fort Worth"
          width={2000}
          height={2998}
          className="h-full w-full object-cover"
          priority
          fetchPriority="high"
          sizes="(min-width: 1024px) 45vw, 100vw"
        />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-canvas/30 to-transparent" />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-canvas/55 backdrop-blur-md"
        initial={{ opacity: 1 }}
        animate={{ opacity: shouldReduceMotion ? 0 : overlayVisible ? 1 : 0 }}
        transition={{ duration: shouldReduceMotion ? 0.01 : 0.22, ease: "easeOut" }}
      />
    </div>
  );
}
