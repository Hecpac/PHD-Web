'use client';

import { useGSAP } from '@gsap/react';
import { type RefObject } from 'react';
import type { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  revealHeadline,
  revealBody,
  scrambleReveal,
  type TextRevealOptions,
} from './text-reveals';

export type TextRevealType = 'headline' | 'body' | 'scramble';

export interface UseTextRevealOptions
  extends Omit<TextRevealOptions, 'scrollTrigger'> {
  scrollTrigger?: boolean | ScrollTrigger.Vars;
}

/**
 * React hook for text reveal animations
 *
 * @param ref - React ref to the text element
 * @param type - Type of reveal animation: 'headline' | 'body' | 'scramble'
 * @param options - Animation options including ScrollTrigger config
 *
 * @returns GSAP timeline for external control
 *
 * @example
 * ```tsx
 * const ref = useRef<HTMLHeadingElement>(null);
 * const timeline = useTextReveal(ref, 'headline', {
 *   scrollTrigger: { start: 'top 80%' }
 * });
 * ```
 */
export function useTextReveal(
  ref: RefObject<HTMLElement>,
  type: TextRevealType,
  options?: UseTextRevealOptions,
) {
  const timeline = useGSAP(
    () => {
      if (!ref.current) return;

      // Default ScrollTrigger configuration
      const defaultScrollTrigger: ScrollTrigger.Vars = {
        trigger: ref.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      };

      // Merge ScrollTrigger options
      let scrollTriggerConfig: ScrollTrigger.Vars | undefined;

      if (options?.scrollTrigger === false) {
        // Explicitly disabled
        scrollTriggerConfig = undefined;
      } else if (
        options?.scrollTrigger === true ||
        options?.scrollTrigger === undefined
      ) {
        // Use default
        scrollTriggerConfig = defaultScrollTrigger;
      } else {
        // Merge with provided config
        scrollTriggerConfig = {
          ...defaultScrollTrigger,
          ...options.scrollTrigger,
        };
      }

      const revealOptions: TextRevealOptions = {
        ...options,
        scrollTrigger: scrollTriggerConfig,
      };

      // Select and execute appropriate reveal function
      switch (type) {
        case 'headline':
          return revealHeadline(ref.current, revealOptions);
        case 'body':
          return revealBody(ref.current, revealOptions);
        case 'scramble':
          return scrambleReveal(ref.current, revealOptions);
        default:
          throw new Error(`Unknown text reveal type: ${type}`);
      }
    },
    { scope: ref, dependencies: [type, options] },
  );

  return timeline;
}
