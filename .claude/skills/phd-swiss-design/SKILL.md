---
name: phd-swiss-design
description: Maintain and extend the PHD visual design system (Swiss grid, typography scale, Material token themes, and utility classes). Use when editing app/globals.css, theme/*.css, layout wrappers, or component classNames to keep spacing, type hierarchy, color semantics, and accessibility consistent.
---

# PHD Swiss Design System

Keep visual work aligned with the existing Swiss + Material direction in this repo.

## Quick workflow

1. Read `references/system-map.md` before changing layout, type, or theme behavior.
2. Reuse existing design tokens and utility classes instead of introducing ad-hoc values.
3. Keep spacing in 8px rhythm and preserve semantic color usage (`bg-surface`, `text-muted`, `border-line`, etc.).
4. Validate responsive behavior at mobile/tablet/desktop breakpoints.
5. Validate accessibility states (`focus-visible`, contrast, minimum target size).

## Hard rules

- Prefer token-based color and typography variables over literal hex values.
- Prefer `container-swiss` + `swiss-grid*` utilities over bespoke layout wrappers.
- Keep heading hierarchy and type classes (`type-hero`, `type-display`, `type-subhead`, etc.) consistent.
- Add motion only when it supports comprehension; ensure reduced-motion fallback exists.
- Keep new utilities in the theme files, not scattered in random component CSS.

## Output standard

When asked to design or restyle UI, deliver:

- Updated files
- A short list of visual decisions (grid, type, color, spacing)
- A quick regression checklist (responsive + accessibility)
