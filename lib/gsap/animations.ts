"use client";

import { gsap, ScrollTrigger } from "@/lib/gsap";

/* ──────────────────────────────────────────────
   Swiss Mechanical Ease
   ──────────────────────────────────────────────
   Emulates precision machinery: controlled engagement,
   steady traverse, exact landing. No organic overshoot.
   Power 3.5 out curve — between power3 and power4.
   ────────────────────────────────────────────── */
function swissMechanicalEase(t: number): number {
  return 1 - Math.pow(1 - t, 3.5);
}

/* ──────────────────────────────────────────────
   will-change lifecycle helpers
   ──────────────────────────────────────────────
   Promote to compositor layer only during animation
   to avoid permanent GPU memory allocation.
   ────────────────────────────────────────────── */
function promoteTargets(targets: gsap.TweenTarget): void {
  const elements = gsap.utils.toArray<HTMLElement>(targets);
  elements.forEach((el) => {
    el.style.willChange = "transform, opacity";
  });
}

function demoteTargets(targets: gsap.TweenTarget): void {
  const elements = gsap.utils.toArray<HTMLElement>(targets);
  elements.forEach((el) => {
    el.style.willChange = "auto";
  });
}

/* ──────────────────────────────────────────────
   animateSwissEntrance
   ──────────────────────────────────────────────
   Reusable scroll-triggered entrance animation
   with the Swiss mechanical ease and dynamic
   will-change management.

   Usage:
     animateSwissEntrance(".card", { stagger: 0.1 });
     animateSwissEntrance(ref.current!, {
       y: 60, duration: 1, scrollTrigger: false,
     });
   ────────────────────────────────────────────── */
export interface SwissEntranceOptions {
  /** Vertical offset in px (default: 40) */
  y?: number;
  /** Horizontal offset in px (default: 0) */
  x?: number;
  /** Starting opacity (default: 0) */
  opacity?: number;
  /** Starting scale (default: 1 — no scale) */
  scale?: number;
  /** Duration in seconds (default: 0.9) */
  duration?: number;
  /** Stagger between elements (number or GSAP stagger config) */
  stagger?: number | gsap.StaggerVars;
  /** Delay before start in seconds */
  delay?: number;
  /** Override ease (default: swiss mechanical) */
  ease?: string | ((t: number) => number);
  /**
   * ScrollTrigger config.
   * - `true` (default): auto-trigger at "top 80%"
   * - `false`: no ScrollTrigger (plays immediately)
   * - object: custom ScrollTrigger.Vars
   */
  scrollTrigger?: ScrollTrigger.Vars | boolean;
}

export function animateSwissEntrance(
  targets: gsap.TweenTarget,
  options: SwissEntranceOptions = {},
): gsap.core.Timeline {
  const {
    y = 40,
    x = 0,
    opacity = 0,
    scale = 1,
    duration = 0.9,
    stagger,
    delay = 0,
    ease = swissMechanicalEase,
    scrollTrigger: stConfig = true,
  } = options;

  // Resolve ScrollTrigger configuration
  let scrollTriggerVars: ScrollTrigger.Vars | undefined;

  if (stConfig === true) {
    // Default: trigger at top 80% of viewport
    const firstTarget = gsap.utils.toArray<HTMLElement>(targets)[0];
    scrollTriggerVars = {
      trigger: firstTarget,
      start: "top 80%",
      toggleActions: "play none none none",
    };
  } else if (stConfig && typeof stConfig === "object") {
    scrollTriggerVars = stConfig;
  }
  // stConfig === false → no ScrollTrigger

  const tl = gsap.timeline({
    delay,
    scrollTrigger: scrollTriggerVars,
    onStart: () => promoteTargets(targets),
    onComplete: () => demoteTargets(targets),
  });

  tl.from(targets, {
    y,
    x,
    opacity,
    scale,
    duration,
    ease,
    stagger,
  });

  return tl;
}

/* ──────────────────────────────────────────────
   animateConnectorLine
   ──────────────────────────────────────────────
   Scroll-triggered vertical line reveal using
   scaleY from 0 with the Swiss mechanical ease.
   ────────────────────────────────────────────── */
export function animateConnectorLine(
  target: gsap.TweenTarget,
  options: {
    duration?: number;
    scrollTrigger?: ScrollTrigger.Vars | boolean;
  } = {},
): gsap.core.Timeline {
  const { duration = 0.8, scrollTrigger: stConfig = true } = options;

  let scrollTriggerVars: ScrollTrigger.Vars | undefined;
  if (stConfig === true) {
    const firstTarget = gsap.utils.toArray<HTMLElement>(target)[0];
    scrollTriggerVars = {
      trigger: firstTarget,
      start: "top 80%",
      toggleActions: "play none none none",
    };
  } else if (stConfig && typeof stConfig === "object") {
    scrollTriggerVars = stConfig;
  }

  const tl = gsap.timeline({
    scrollTrigger: scrollTriggerVars,
    onStart: () => promoteTargets(target),
    onComplete: () => demoteTargets(target),
  });

  tl.from(target, {
    scaleY: 0,
    transformOrigin: "top center",
    duration,
    ease: swissMechanicalEase,
  });

  return tl;
}
