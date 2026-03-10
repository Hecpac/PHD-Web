"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const FloatingLogo = dynamic(
  () => import("@/components/ui/floating-logo").then((mod) => mod.FloatingLogo),
  { ssr: false },
);

const CustomCursor = dynamic(
  () => import("@/components/ui/custom-cursor").then((mod) => mod.CustomCursor),
  { ssr: false },
);

function shouldEnableEnhancements() {
  if (typeof window === "undefined") return false;

  const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const isSmallViewport = window.matchMedia("(max-width: 1023px)").matches;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;

  return !isCoarsePointer && !isSmallViewport && !prefersReducedMotion && !saveData;
}

export function LazyEnhancements() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!shouldEnableEnhancements()) {
      return;
    }

    const activate = () => setEnabled(true);

    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(activate, { timeout: 1500 });
      return () => window.cancelIdleCallback(id);
    }

    const timeoutId = globalThis.setTimeout(activate, 1200);
    return () => globalThis.clearTimeout(timeoutId);
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <>
      <FloatingLogo />
      <CustomCursor />
    </>
  );
}
