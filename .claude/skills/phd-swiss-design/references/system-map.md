# System Map

## Canonical files

- `app/globals.css` → global foundations, spacing rhythm, section utilities, accessibility defaults.
- `theme/tokens.material.css` → semantic token mapping (`--color-*`, `--font-*`, radius) + light/dark variants.
- `theme/swiss-grid.css` → 12-column grid, asymmetric presets, responsive behavior.
- `theme/swiss-typography.css` → modular type scale, line-height rhythm, tracking.
- `theme/micro-interactions.css` → lightweight interaction utilities.
- `components/layout/swiss-section.tsx` → semantic wrapper for Swiss layouts.

## Grid conventions

- Use 8px baseline rhythm (`--baseline`, `--space-*`).
- Prefer:
  - `swiss-grid` for 12-column composition
  - `swiss-grid-2-1` / `swiss-grid-1-2` / `swiss-grid-golden` for asymmetric layouts
- Respect mobile collapse behavior from `swiss-grid.css` instead of adding custom media logic first.

## Typography conventions

- Core classes: `type-hero`, `type-display`, `type-title`, `type-heading`, `type-subhead`, `type-body`, `type-caption`, `type-mono-label`.
- Keep large headlines tight in tracking and balanced (`text-balance` when useful).
- Keep prose constrained with `text-reading` or `type-prose` patterns.

## Color + surface conventions

- Use semantic colors, not raw palette values, in components.
- Typical pairings:
  - Page base: `bg-canvas text-ink`
  - Elevated block: `bg-surface border-line`
  - Secondary surface: `bg-surface-2`
  - Metadata: `text-muted`
  - Primary CTA/action: `bg-accent text-on-accent`

## Accessibility checks

- Keep interactive targets >= 44px height.
- Preserve clear focus rings (`focus-visible:ring-*` or outline).
- Keep contrast robust in both light and dark variants.
- Provide reduced-motion-safe presentation if interaction relies on animation.
