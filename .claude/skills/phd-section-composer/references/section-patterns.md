# Section Patterns

## Core primitives

- `components/layout/container.tsx` → standard/max-width container, optional Swiss mode.
- `components/layout/swiss-section.tsx` → semantic section wrapper + grid presets.
- `components/ui/section-heading.tsx` → eyebrow/title/description pattern.
- `components/ui/cta-link.tsx` → tracked CTA variants.
- `components/ui/swiss-card.tsx` → base card with optional spotlight and interaction affordances.

## Home page sequence reference

Current order in `app/page.tsx`:

1. `HeroSection`
2. `ImageGridStrip`
3. `LedgerSection`
4. `HowWeWorkSection`
5. `BlueprintSection`
6. `FeaturedProjectsSection`
7. `BentoSection`
8. `DfwSection`
9. `TrustSection`
10. `WhyChooseUsSection`
11. `TestimonialsSection`
12. `FaqSection`
13. `ContactTerminal`

Use this order as a narrative baseline: introduce value, prove credibility, remove objections, then convert.

## Reusable section skeleton

```tsx
<section className="section-shell">
  <Container swiss>
    <SectionHeading
      eyebrow="..."
      title="..."
      description="..."
    />

    <div className="swiss-grid mt-8 gap-6">
      {/* content blocks */}
    </div>

    <div className="mt-8 flex gap-3">
      <CtaLink href="..." eventName="cta_schedule_click">Primary</CtaLink>
      <CtaLink href="..." variant="secondary">Secondary</CtaLink>
    </div>
  </Container>
</section>
```

## CTA + analytics notes

Use available analytics event names from `lib/analytics/events.ts`:

- `cta_schedule_click`
- `cta_call_click`
- `form_start`
- `form_submit`
- `form_error`
- `project_view`
- `gallery_interaction`

## Common anti-patterns to avoid

- Overwriting tokenized styles with many literal colors.
- Using inconsistent heading/copy scales across adjacent sections.
- Deeply nested wrappers that break reading order or keyboard flow.
- Adding multiple visual concepts in one section (keep one intent per section).
