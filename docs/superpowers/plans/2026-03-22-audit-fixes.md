# PHD Audit Fixes — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix all P0 and P1 issues from the 6-domain audit, plus high-ROI P2 quick wins.

**Architecture:** Sequential tasks grouped by blast radius — security first (Next.js upgrade), then a11y P0s, then performance wins, then cleanup. Each task is independently committable.

**Tech Stack:** Next.js 16, React 19, TypeScript 5, Tailwind 4, pnpm

---

## Task 1: Upgrade Next.js to fix CSRF + DoS vulnerabilities

**Files:**
- Modify: `package.json:25` (next version)
- Modify: `package.json:39` (eslint-config-next version)

- [ ] **Step 1: Upgrade Next.js**

```bash
pnpm update next@latest eslint-config-next@latest
```

- [ ] **Step 2: Verify build passes**

```bash
pnpm build
```
Expected: Build succeeds with no errors.

- [ ] **Step 3: Run existing tests**

```bash
pnpm test:unit
```
Expected: All tests pass.

- [ ] **Step 4: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "fix(security): upgrade next to >=16.1.7 — closes CSRF + DoS vulns"
```

---

## Task 2: Create app/error.tsx error boundary

**Files:**
- Create: `app/error.tsx`

- [ ] **Step 1: Create the error boundary**

```tsx
"use client";

import Link from "next/link";

import { Container } from "@/components/layout/container";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="section-shell">
      <Container swiss className="space-y-5">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Error</p>
        <h1 className="text-3xl font-semibold tracking-tight">Something went wrong</h1>
        <p className="text-sm leading-6 text-muted">
          An unexpected error occurred. Try again or return to the homepage.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={reset}
            className="inline-flex text-sm font-medium underline-offset-4 hover:underline"
          >
            Try again
          </button>
          <Link href="/" className="inline-flex text-sm font-medium underline-offset-4 hover:underline">
            Back to home
          </Link>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
pnpm build
```
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add app/error.tsx
git commit -m "fix(ux): add global error boundary — prevents white screens on render errors"
```

---

## Task 3: Fix accessibility P0s (aria-atomic, aria-hidden, lightbox label)

**Files:**
- Modify: `components/home/contact-terminal.tsx:349`
- Modify: `components/home/hero-section.tsx:212`
- Modify: `components/ui/lightbox.tsx:114`

- [ ] **Step 1: Add aria-atomic to form status message**

In `components/home/contact-terminal.tsx`, find line 349:
```
                  aria-live="polite"
```
Replace with:
```
                  aria-live="polite"
                  aria-atomic="true"
```

- [ ] **Step 2: Add aria-hidden to decorative divider**

In `components/home/hero-section.tsx`, find line 212:
```
                <div className="h-[1px] w-12 bg-white/30" />
```
Replace with:
```
                <div className="h-[1px] w-12 bg-white/30" aria-hidden="true" />
```

- [ ] **Step 3: Make lightbox label dynamic**

In `components/ui/lightbox.tsx`, the `LightboxContent` component needs `currentIndex` and `images` to build a dynamic label. Find line 114:
```
      aria-label="Image lightbox"
```
Replace with:
```
      aria-label={`Image ${currentIndex + 1} of ${images.length}${currentImage.alt ? `: ${currentImage.alt}` : ""}`}
```

This works because `currentIndex` (line 24) and `images` (props) are already in scope, and `currentImage` is derived at line 107 (`const currentImage = images[currentIndex]`).

- [ ] **Step 4: Verify build**

```bash
pnpm build
```
Expected: Build succeeds.

- [ ] **Step 5: Commit**

```bash
git add components/home/contact-terminal.tsx components/home/hero-section.tsx components/ui/lightbox.tsx
git commit -m "fix(a11y): close 3 WCAG P0 violations — aria-atomic, aria-hidden, lightbox label"
```

---

## Task 4: Remove unused theme CSS files

**Files:**
- Delete: `theme/material/light-mc.css`
- Delete: `theme/material/light-hc.css`

- [ ] **Step 1: Verify files are not imported anywhere**

```bash
grep -r "light-mc\|light-hc" --include="*.css" --include="*.ts" --include="*.tsx" .
```
Expected: No results (globals.css only imports `light.css`).

- [ ] **Step 2: Delete the files**

```bash
rm theme/material/light-mc.css theme/material/light-hc.css
```

- [ ] **Step 3: Verify build**

```bash
pnpm build
```
Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add theme/material/light-mc.css theme/material/light-hc.css
git commit -m "chore: remove unused light-mc and light-hc theme variants"
```

---

## Task 5: Remove system prompt files from git tracking

**Files:**
- Modify: `.gitignore`
- Remove from tracking: `SOUL.md`, `AGENTS.md`, `IDENTITY.md`, `HEARTBEAT.md`, `TOOLS.md`, `BOOTSTRAP.md`

All 6 files are currently tracked by git. `SOUL.md`, `AGENTS.md`, and `BOOTSTRAP.md` are already in `.gitignore` but still tracked (need `git rm --cached`). The others need to be added to `.gitignore` too.

- [ ] **Step 1: Add missing files to .gitignore**

In `.gitignore`, find:
```
AGENTS.md
```
Replace with:
```
AGENTS.md
IDENTITY.md
HEARTBEAT.md
TOOLS.md
```

- [ ] **Step 2: Remove ALL 6 files from git tracking**

```bash
git rm --cached SOUL.md AGENTS.md IDENTITY.md HEARTBEAT.md TOOLS.md BOOTSTRAP.md
```

- [ ] **Step 3: Commit**

```bash
git add .gitignore
git commit -m "chore: remove system prompt files from git tracking"
```

---

## Task 6: Fix CSP — remove own domain from frame-src

**Files:**
- Modify: `next.config.ts:30`

Note: Removing `'unsafe-inline'` from `script-src` requires nonce-based CSP infrastructure (middleware + nonce prop on all `<Script>` tags), which is a larger task. We keep `'unsafe-inline'` for now and only fix the `frame-src` clickjacking vector.

- [ ] **Step 1: Remove own domain from frame-src**

In `next.config.ts`, find:
```
      "frame-src 'self' https://calendly.com https://www.premiumhome.design",
```
Replace with:
```
      "frame-src 'self' https://calendly.com",
```

- [ ] **Step 2: Verify build**

```bash
pnpm build
```
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add next.config.ts
git commit -m "fix(security): remove own domain from CSP frame-src to prevent clickjacking"
```

---

## Task 7: Add rate limiting to /api/revalidate

**Files:**
- Modify: `app/api/revalidate/route.ts`

- [ ] **Step 1: Add rate limiting and remove timestamp from response**

Replace the entire file `app/api/revalidate/route.ts` with:

```typescript
import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

import { checkRateLimit } from "@/lib/rate-limit";

/**
 * Webhook endpoint for Sanity on-demand revalidation
 *
 * Configure this URL in your Sanity project webhooks:
 * POST https://your-domain.com/api/revalidate
 * Header: Authorization: Bearer YOUR_SECRET
 *
 * Environment variables required:
 * - REVALIDATE_SECRET: Secret token to authenticate webhook requests
 */
export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";

    const rl = checkRateLimit(`revalidate:${ip}`);
    if (!rl.allowed) {
      return NextResponse.json({ ok: false }, { status: 429 });
    }

    const expectedSecret = process.env.REVALIDATE_SECRET;

    if (!expectedSecret) {
      return NextResponse.json({ ok: false }, { status: 500 });
    }

    // Accept token from Authorization header (preferred) or query param (legacy)
    const authHeader = request.headers.get("authorization");
    const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
    const secret = bearerToken ?? request.nextUrl.searchParams.get("secret");

    if (secret !== expectedSecret) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }

    revalidateTag("sanity");

    return NextResponse.json(
      { revalidated: true, tag: "sanity" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
```

Changes: added rate limiting (5 req/10min per IP), removed `now: Date.now()` from response.

- [ ] **Step 2: Verify build**

```bash
pnpm build
```
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add app/api/revalidate/route.ts
git commit -m "fix(security): add rate limiting to revalidate endpoint, remove timestamp leak"
```

---

## Task 8: Sanitize GTM ID to prevent XSS

**Files:**
- Modify: `components/analytics/gtm.tsx`

- [ ] **Step 1: Sanitize the GTM ID**

In `components/analytics/gtm.tsx`, find:
```
export function GoogleTagManager({ id }: Props) {
  return (
    <Script
      id="gtm-init"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${id}');`,
      }}
    />
  );
}
```

Replace with:

```
export function GoogleTagManager({ id }: Props) {
  // Sanitize: GTM IDs are always GTM-XXXXXX format
  const safeId = id.replace(/[^a-zA-Z0-9_-]/g, "");
  return (
    <Script
      id="gtm-init"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${safeId}');`,
      }}
    />
  );
}
```

- [ ] **Step 2: Verify build**

```bash
pnpm build
```
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add components/analytics/gtm.tsx
git commit -m "fix(security): sanitize GTM ID to prevent XSS injection"
```

---

## Task 9: Dynamic import for SmoothScroll (Lenis + GSAP)

**Files:**
- Modify: `app/layout.tsx:135`
- Modify: `components/layout/smooth-scroll.tsx` (no changes needed — already client)

The goal is to lazy-load the `SmoothScroll` component so Lenis + GSAP ScrollTrigger (~95K gzip) are not in the initial bundle for mobile users.

- [ ] **Step 1: Create lazy wrapper**

In `app/layout.tsx`, find the import for SmoothScroll (near top of file):
```
import { SmoothScroll } from "@/components/layout/smooth-scroll";
```

Replace with:
```
import dynamic from "next/dynamic";

const SmoothScroll = dynamic(
  () => import("@/components/layout/smooth-scroll").then((m) => m.SmoothScroll),
  { ssr: false },
);
```

- [ ] **Step 2: Verify build**

```bash
pnpm build
```
Expected: Build succeeds. SmoothScroll now code-split into separate chunk.

- [ ] **Step 3: Verify dev server renders correctly**

```bash
pnpm dev &
sleep 3
curl -s http://localhost:3000 | head -20
kill %1
```
Expected: Page renders. Smooth scroll loads only on desktop with fine pointer.

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx
git commit -m "perf: lazy-load SmoothScroll — saves ~95K gzip on mobile"
```

---

## Task 10: Tree-shake Three.js imports

**Files:**
- Modify: `components/ui/floating-logo-scene.tsx:17,58,67,69,74`

The file uses THREE in exactly 2 ways:
1. `THREE.Group` as a ref type (line 58): `useRef<THREE.Group>(null)`
2. `THREE.MathUtils.lerp` for interpolation (lines 67, 69, 74)

- [ ] **Step 1: Replace wildcard import with named imports**

In `components/ui/floating-logo-scene.tsx`, find:
```
import * as THREE from "three";
```
Replace with:
```
import { type Group, MathUtils } from "three";
```

- [ ] **Step 2: Update ref type**

Find:
```
  const groupRef = useRef<THREE.Group>(null);
```
Replace with:
```
  const groupRef = useRef<Group>(null);
```

- [ ] **Step 3: Update MathUtils calls (3 occurrences)**

Find and replace all `THREE.MathUtils.lerp` with `MathUtils.lerp`:

```
        THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, delta * 10),
```
→
```
        MathUtils.lerp(groupRef.current.scale.x, targetScale, delta * 10),
```

```
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
```
→
```
      groupRef.current.rotation.x = MathUtils.lerp(
```

```
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
```
→
```
      groupRef.current.rotation.y = MathUtils.lerp(
```

- [ ] **Step 4: Verify build**

```bash
pnpm build
```
Expected: Build succeeds. Three.js tree-shaken to only include MathUtils + Group type (type-only import produces no runtime code).

- [ ] **Step 5: Commit**

```bash
git add components/ui/floating-logo-scene.tsx
git commit -m "perf: tree-shake Three.js — named imports only (Group type + MathUtils)"
```

---

## Task 11: Fix unsafe type assertion in data layer

**Files:**
- Modify: `lib/data/index.ts:434`

The issue: `fallbackServiceDetails` is typed as `ServiceDetail[]` (all required fields) but `fetchFromSanity<T>` expects `SanityServiceDetail[]` (all optional fields). These types are incompatible, hence the `as unknown as` double assertion.

The fix: pass an empty array as the `fetchFromSanity` fallback since `getServiceDetails()` already returns `fallbackServiceDetails` directly when Sanity fails (line 441: `return normalized.length > 0 ? normalized : fallbackServiceDetails`).

- [ ] **Step 1: Replace the double assertion**

In `lib/data/index.ts`, find:
```
  const docs = await fetchFromSanity<SanityServiceDetail[]>(serviceDetailsQuery, fallbackServiceDetails as unknown as SanityServiceDetail[]);
```
Replace with:
```
  const docs = await fetchFromSanity<SanityServiceDetail[]>(serviceDetailsQuery, []);
```

- [ ] **Step 2: Verify build**

```bash
pnpm build
```
Expected: Build succeeds with no type errors.

- [ ] **Step 3: Run tests**

```bash
pnpm test:unit
```
Expected: All tests pass.

- [ ] **Step 4: Commit**

```bash
git add lib/data/index.ts
git commit -m "fix(types): remove unsafe double assertion on fallbackServiceDetails"
```

---

## Task 12: Compress hero images

**Files:**
- Modify: `public/hero-home.jpeg` (2.97 MB → target <500 KB)
- Modify: `public/blueprint-kitchen.jpeg` (3.34 MB → target <500 KB)

- [ ] **Step 1: Check if sharp CLI or sips is available**

```bash
which sips || which sharp || which convert
```

macOS has `sips` built in. Use it to re-compress:

```bash
cd /Users/hector/Projects/PHD/public
# Backup originals
cp hero-home.jpeg hero-home.jpeg.bak
cp blueprint-kitchen.jpeg blueprint-kitchen.jpeg.bak
# Recompress to quality 80 (good balance)
sips -s formatOptions 80 hero-home.jpeg
sips -s formatOptions 80 blueprint-kitchen.jpeg
```

If file sizes are still >800KB, resize dimensions too:
```bash
sips --resampleWidth 2400 hero-home.jpeg
sips --resampleWidth 2400 blueprint-kitchen.jpeg
```

- [ ] **Step 2: Verify sizes reduced**

```bash
ls -la public/hero-home.jpeg public/blueprint-kitchen.jpeg
```
Expected: Each file <800KB.

- [ ] **Step 3: Remove backups**

```bash
rm public/hero-home.jpeg.bak public/blueprint-kitchen.jpeg.bak
```

- [ ] **Step 4: Verify build**

```bash
pnpm build
```
Expected: Build succeeds, images still load correctly.

- [ ] **Step 5: Commit**

```bash
git add public/hero-home.jpeg public/blueprint-kitchen.jpeg
git commit -m "perf: compress hero images — saves ~5MB"
```

---

## Task 13: Add Twitter Cards to pages missing them

**Files:**
- Modify: `app/about/page.tsx`
- Modify: `app/services/page.tsx`
- Modify: `app/contact/page.tsx`
- Modify: `app/process/page.tsx`
- Modify: `app/reviews/page.tsx`
- Modify: `app/dallas-fort-worth/page.tsx`
- Modify: `app/faq/page.tsx`
- Modify: `app/for-builders/page.tsx`
- Modify: `app/projects/page.tsx`

- [ ] **Step 1: For each page with a `metadata` or `generateMetadata` export, add a `twitter` property**

Pattern to add inside each metadata object (adapt title/description per page):

```typescript
twitter: {
  card: "summary_large_image",
  site: "@PHDhomes",
},
```

The `title` and `description` are inherited from the top-level metadata keys, so only `card` and `site` are required.

Add this block to each page's metadata export. Work through all 9 pages.

- [ ] **Step 2: Verify build**

```bash
pnpm build
```
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add app/about/page.tsx app/services/page.tsx app/contact/page.tsx app/process/page.tsx app/reviews/page.tsx app/dallas-fort-worth/page.tsx app/faq/page.tsx app/for-builders/page.tsx app/projects/page.tsx
git commit -m "fix(seo): add Twitter Card metadata to 9 pages"
```

---

## Summary

| Task | Domain | Severity | Est. Time |
|------|--------|----------|-----------|
| 1. Upgrade Next.js | Security | P0 | 5 min |
| 2. Error boundary | Code Quality | P1 | 5 min |
| 3. A11y P0 fixes | Accessibility | P0 | 10 min |
| 4. Remove dead CSS | Performance | P1 | 2 min |
| 5. Git-remove system files | Security | P2 | 2 min |
| 6. Fix CSP frame-src | Security | P2 | 3 min |
| 7. Rate limit revalidate | Security | P1 | 5 min |
| 8. Sanitize GTM | Security | P2 | 3 min |
| 9. Lazy-load SmoothScroll | Performance | P1 | 5 min |
| 10. Tree-shake Three.js | Performance | P1 | 10 min |
| 11. Fix unsafe type cast | Code Quality | P1 | 10 min |
| 12. Compress hero images | Performance | P1 | 5 min |
| 13. Twitter Cards | SEO | P2 | 15 min |
