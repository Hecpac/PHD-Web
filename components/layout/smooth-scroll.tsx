"use client";

import { useRef } from "react";
import Lenis from "lenis";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/hooks/use-isomorphic-layout-effect";

/**
 * SmoothScroll — global provider that initializes Lenis and syncs it
 * with GSAP ScrollTrigger through a single RAF loop.
 *
 * Wrap the root layout's children with this component.
 * Respects prefers-reduced-motion: skips Lenis entirely.
 *
 * Cleanup: destroys Lenis, removes ticker callback, and reverts
 * the GSAP context on unmount.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafCallbackRef = useRef<((time: number) => void) | null>(null);

  useIsomorphicLayoutEffect(() => {
    // Respect user preference — skip smooth scroll entirely
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    // ── Create GSAP context for scoped cleanup ──
    const ctx = gsap.context(() => {
      // ── Initialize Lenis ──
      const lenis = new Lenis({
        lerp: 0.08,
        smoothWheel: true,
        // Native touch scroll on mobile — no JS interpolation
      });

      lenisRef.current = lenis;

      // ── Sync Lenis → ScrollTrigger ──
      lenis.on("scroll", ScrollTrigger.update);

      // ── Configure ScrollTrigger to use Lenis's scrollerProxy ──
      ScrollTrigger.scrollerProxy(document.body, {
        scrollTop(value) {
          if (arguments.length && value !== undefined) {
            lenis.scrollTo(value, { immediate: true });
          }
          return lenis.animatedScroll;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
      });

      // ── Drive Lenis from GSAP ticker (single RAF loop) ──
      const rafCallback = (time: number) => {
        lenis.raf(time * 1000); // GSAP uses seconds, Lenis uses ms
      };
      rafCallbackRef.current = rafCallback;
      gsap.ticker.add(rafCallback);

      // ── Disable GSAP lag smoothing to avoid conflict with Lenis ──
      gsap.ticker.lagSmoothing(0);
    });

    // ── Cleanup on unmount ──
    return () => {
      ctx.revert();

      if (rafCallbackRef.current) {
        gsap.ticker.remove(rafCallbackRef.current);
        rafCallbackRef.current = null;
      }

      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, []);

  return <>{children}</>;
}
