'use client';

import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

// Register plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(CustomEase, ScrollTrigger, SplitText, ScrambleTextPlugin);

  // Register custom 'swiss' ease if not already registered
  if (!CustomEase.get('swiss')) {
    CustomEase.create('swiss', 'M0,0 C0.85,0 0.15,1 1,1');
  }
}

export interface TextRevealOptions {
  scrollTrigger?: ScrollTrigger.Vars;
  duration?: number;
  stagger?: number;
  delay?: number;
}

/**
 * Headline reveal with character split, dramatic entrance from below with rotation
 * Based on Blueprint Type 1: Hero Headline
 */
export function revealHeadline(
  element: HTMLElement | string,
  options?: TextRevealOptions
): gsap.core.Timeline {
  const target = typeof element === 'string' ? document.querySelector(element) : element;
  if (!target) throw new Error('Element not found for revealHeadline');

  const tl = gsap.timeline({
    scrollTrigger: options?.scrollTrigger,
  });

  // Split into characters
  const split = new SplitText(target, { type: 'chars' });
  const chars = split.chars || [];

  // Set initial state
  gsap.set(chars, {
    yPercent: 120,
    rotationX: -90,
    opacity: 0,
    transformOrigin: '50% 100%',
  });

  // Animate in
  tl.to(chars, {
    yPercent: 0,
    rotationX: 0,
    opacity: 1,
    duration: options?.duration ?? 0.8,
    stagger: options?.stagger ?? 0.02,
    ease: 'swiss',
    delay: options?.delay ?? 0,
    onComplete: () => {
      split.revert();
    },
  });

  return tl;
}

/**
 * Body text reveal with line split, smooth upward fade with clip-path
 * Based on Blueprint Type 2: Section Titles (adapted for body text)
 */
export function revealBody(
  element: HTMLElement | string,
  options?: TextRevealOptions
): gsap.core.Timeline {
  const target = typeof element === 'string' ? document.querySelector(element) : element;
  if (!target) throw new Error('Element not found for revealBody');

  const tl = gsap.timeline({
    scrollTrigger: options?.scrollTrigger,
  });

  // Split into lines
  const split = new SplitText(target, { type: 'lines' });
  const lines = split.lines || [];

  // Set initial state
  gsap.set(lines, {
    y: 40,
    opacity: 0,
    clipPath: 'inset(100% 0 0 0)',
  });

  // Animate in
  tl.to(lines, {
    y: 0,
    opacity: 1,
    clipPath: 'inset(0% 0 0 0)',
    duration: options?.duration ?? 0.6,
    stagger: options?.stagger ?? 0.1,
    ease: 'power3.out',
    delay: options?.delay ?? 0,
    onComplete: () => {
      split.revert();
    },
  });

  return tl;
}

/**
 * Scramble reveal for technical/monospace text
 * Uses ScrambleText plugin for digital/glitch effect
 */
export function scrambleReveal(
  element: HTMLElement | string,
  options?: TextRevealOptions
): gsap.core.Timeline {
  const target = typeof element === 'string' ? document.querySelector(element) : element;
  if (!target) throw new Error('Element not found for scrambleReveal');

  const tl = gsap.timeline({
    scrollTrigger: options?.scrollTrigger,
  });

  // Store original text
  const originalText = target.textContent || '';

  // Set initial scrambled state
  gsap.set(target, { opacity: 1 });

  // Animate with scramble
  tl.to(target, {
    duration: options?.duration ?? 1.2,
    scrambleText: {
      text: originalText,
      chars: '01',
      speed: 0.4,
      revealDelay: 0.5,
    },
    delay: options?.delay ?? 0,
    ease: 'none',
  });

  return tl;
}
