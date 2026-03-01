"use client";

import { useEffect } from "react";

import { trackEvent } from "@/lib/analytics/events";

type PageIntentTrackerProps = {
  entityType: "project" | "service";
  slug: string;
};

const SCROLL_THRESHOLDS = [50, 75] as const;

function getScrollDepthPercent(): number {
  const doc = document.documentElement;
  const scrollable = Math.max(1, doc.scrollHeight - doc.clientHeight);
  const scrolled = Math.max(0, window.scrollY || doc.scrollTop || 0);
  return Math.min(100, Math.round((scrolled / scrollable) * 100));
}

export function PageIntentTracker({ entityType, slug }: PageIntentTrackerProps) {
  useEffect(() => {
    const firedDepth = new Set<number>();
    let hasFiredView = false;

    const fireViewEvent = (depth: number) => {
      if (hasFiredView) return;
      hasFiredView = true;

      if (entityType === "project") {
        trackEvent("project_view", { slug, depth, path: window.location.pathname });
      } else {
        trackEvent("service_view", { slug, depth, path: window.location.pathname });
      }
    };

    const evaluateScroll = () => {
      const depth = getScrollDepthPercent();

      for (const threshold of SCROLL_THRESHOLDS) {
        if (depth >= threshold && !firedDepth.has(threshold)) {
          firedDepth.add(threshold);
          trackEvent("scroll_depth", {
            entityType,
            slug,
            depth: threshold,
            path: window.location.pathname,
          });

          if (threshold === 50) {
            fireViewEvent(threshold);
          }
        }
      }
    };

    const onScroll = () => evaluateScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    evaluateScroll();

    const seenCtas = new Set<string>();
    const ctaObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const element = entry.target as HTMLElement;
          const ctaId = element.dataset.analyticsCta || element.getAttribute("aria-label") || "unknown-cta";

          if (seenCtas.has(ctaId)) continue;
          seenCtas.add(ctaId);

          trackEvent("cta_visible", {
            entityType,
            slug,
            ctaId,
            depth: getScrollDepthPercent(),
            path: window.location.pathname,
          });
        }
      },
      { threshold: 0.5 },
    );

    const ctaElements = document.querySelectorAll<HTMLElement>("[data-analytics-cta]");
    ctaElements.forEach((node) => ctaObserver.observe(node));

    return () => {
      window.removeEventListener("scroll", onScroll);
      ctaObserver.disconnect();
    };
  }, [entityType, slug]);

  return null;
}
