# Motion Recipes

## Canonical motion files

- `lib/gsap/index.ts` → GSAP plugin registration + defaults.
- `lib/gsap/animations.ts` → reusable Swiss entrance/connector animation helpers.
- `lib/gsap/scroll-animations.ts` → pin-scrub, stagger reveal, sequential timeline utilities.
- `components/ui/swiss-text-reveal.tsx` → Framer-based line/word/char reveal.
- `components/ui/page-transition.tsx` → route transition overlays.
- `components/ui/magnetic.tsx` → cursor-responsive magnetic behavior.
- `components/home/hero-section.tsx` → complex hero timeline + parallax orchestration.

## Preferred motion patterns

### 1) Entry reveal for content blocks

- Use `animateSwissEntrance(...)` for reusable reveal behavior.
- Default start: `top 80%`, no overshoot, clean opacity + y transition.

### 2) Scroll storytelling / pinning

- Use `createPinScrub(...)` for horizontal progress experiences.
- Keep scrub values moderate; verify text readability while pinned.

### 3) Text choreography

- Use `SwissTextReveal` for hero/headline choreography.
- Use `noInitialHide` on critical above-the-fold text to avoid hidden pre-hydration states.

### 4) Route transitions

- Keep transitions short and purposeful.
- Use route-aware variants (already present in `page-transition.tsx`) instead of inventing per-page overlays.

## Reduced motion policy

- For GSAP flows, set final visible state with `gsap.set(...)` under reduce mode.
- For Framer components, branch early and return static markup when `useReducedMotion()` is true.
- Never hide core content behind animation-only reveal logic.

## Performance guardrails

- Prefer compositor-safe properties (`transform`, `opacity`).
- Use temporary `will-change` promotion and demotion patterns (already implemented in `animations.ts`).
- Avoid large simultaneous timelines on long pages; split by section triggers.
