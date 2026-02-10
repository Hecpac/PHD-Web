"use client";

import { gsap } from "@/lib/gsap";
import { animateSwissEntrance } from "@/lib/gsap/animations";

export interface PinScrubOptions {
  trigger: HTMLElement;
  content: HTMLElement;
  totalPanels: number;
  scrubSmoothing?: number;
  snapPoints?: number[];
}

export function createPinScrub({ trigger, content, scrubSmoothing = 0.5, snapPoints }: PinScrubOptions) {
  const mm = gsap.matchMedia();

  mm.add(
    {
      isDesktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
    },
    (context) => {
      const { isDesktop } = context.conditions!;
      if (!isDesktop) return;

      const totalWidth = content.scrollWidth - trigger.offsetWidth;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger,
          pin: true,
          scrub: scrubSmoothing,
          end: () => `+=${totalWidth}`,
          invalidateOnRefresh: true,
          ...(snapPoints && { snap: { snapTo: snapPoints, duration: 0.3, delay: 0 } }),
        },
      });

      tl.to(content, {
        x: -totalWidth,
        ease: "none",
      });

      return () => {
        // Cleanup handled by matchMedia revert
      };
    }
  );

  return mm;
}

export interface StaggerRevealOptions {
  trigger: HTMLElement;
  targets: string | HTMLElement[];
  stagger?: number;
  y?: number;
  start?: string;
}

export function createStaggerReveal({ trigger, targets, stagger = 0.08, y = 40, start = "top 80%" }: StaggerRevealOptions) {
  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    animateSwissEntrance(targets, {
      y,
      stagger,
      scrollTrigger: {
        trigger,
        start,
        toggleActions: "play none none none",
      },
    });
  });

  mm.add("(prefers-reduced-motion: reduce)", () => {
    gsap.set(targets, { opacity: 1, y: 0 });
  });

  return mm;
}

export interface SequentialTimelineOptions {
  trigger: HTMLElement;
  steps: HTMLElement[];
  connector?: HTMLElement;
  stagger?: number;
}

export function createSequentialTimeline({ trigger, steps, connector, stagger = 0.15 }: SequentialTimelineOptions) {
  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger,
        start: "top 75%",
        toggleActions: "play none none none",
      },
    });

    // Animate steps sequentially
    steps.forEach((step, i) => {
      tl.from(
        step,
        {
          opacity: 0,
          y: 30,
          duration: 0.7,
          ease: "expo.out",
        },
        i * stagger
      );
    });

    // Animate connector line if present
    if (connector) {
      tl.from(
        connector,
        {
          scaleY: 0,
          transformOrigin: "top center",
          duration: 0.8,
          ease: "expo.out",
        },
        0.1
      );
    }
  });

  mm.add("(prefers-reduced-motion: reduce)", () => {
    gsap.set(steps, { opacity: 1, y: 0 });
    if (connector) gsap.set(connector, { scaleY: 1 });
  });

  return mm;
}
