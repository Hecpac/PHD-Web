---
name: phd-section-composer
description: Compose or refactor landing-page and inner-page sections for the PHD site using existing layout and UI primitives. Use when creating new sections, reorganizing page flow, rewriting section hierarchy, or standardizing CTA/heading/card patterns in app/* and components/home/*.
---

# PHD Section Composer

Build new sections by reusing project primitives first, then extending only where needed.

## Section workflow

1. Read `references/section-patterns.md` and identify the closest existing section pattern.
2. Start with existing primitives (`Container`, `SwissSection`, `SectionHeading`, `CtaLink`, `SwissCard`).
3. Keep section structure semantic: heading, supporting copy, evidence/content, CTA.
4. Preserve rhythm with `section-shell` spacing and Swiss grid utilities.
5. Wire analytics event names for key CTAs when relevant.

## Composition rules

- Prefer composition of existing components over one-off monolithic JSX.
- Keep copy blocks constrained to readable widths (`max-w-*`, `text-reading`, `type-prose`).
- Keep CTA variants consistent with existing patterns (`primary`, `secondary`, `ghost`).
- Keep navigation and section anchors straightforward and predictable.
- Reuse surface and border conventions (`bg-surface`, `border-line`) to maintain visual continuity.

## Done criteria

- Section is visually consistent with current pages.
- Responsive layout reads correctly at mobile/tablet/desktop.
- Interaction and CTA affordances are clear.
- Accessibility and analytics hooks are preserved.
