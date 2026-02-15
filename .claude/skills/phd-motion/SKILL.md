---
name: phd-motion
description: Build and refine motion in the PHD project using GSAP, ScrollTrigger, and Framer Motion with performance-safe and accessible defaults. Use when implementing hero transitions, scroll reveals, page transitions, magnetic/hover effects, or reduced-motion fallbacks in React components.
---

# PHD Motion

Apply motion that feels precise and architectural, not ornamental.

## Motion decision tree

1. Use CSS utility motion for simple hover/press feedback.
2. Use Framer Motion for component-local state/viewport reveals.
3. Use GSAP + ScrollTrigger for timeline-based, scroll-synced, or pinned sequences.

Read `references/motion-recipes.md` before editing major motion flows.

## Implementation rules

- Respect `prefers-reduced-motion` in every animated feature.
- Animate `transform` and `opacity` first; avoid layout-thrashing properties.
- Scope GSAP effects to component refs and clean up matchMedia/timelines on unmount.
- Keep easing and duration aligned with existing project defaults unless a page-specific reason exists.
- Avoid stacking multiple competing motion systems on the same element.

## QA checklist

- Motion works at mobile and desktop breakpoints.
- No hydration flash or hidden-content issue for critical LCP text.
- Reduced-motion mode renders meaningful static UI.
- Scroll performance remains smooth with no obvious jank.
