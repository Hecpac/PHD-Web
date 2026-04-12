# GEO Optimization (Option A) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make Premium Home Design discoverable by AI search engines (ChatGPT, Perplexity, Gemini, Claude) via llms.txt, explicit AI bot permissions, and enriched entity schemas.

**Architecture:** Static Markdown files for LLM consumption, updated robots.ts with per-bot rules, and new Organization + Person JSON-LD schemas injected in root layout alongside existing WebSite and LocalBusiness schemas.

**Tech Stack:** Next.js 16 App Router, TypeScript, Schema.org JSON-LD

---

## File Structure

| File | Action | Responsibility |
|---|---|---|
| `public/llms.txt` | Create | Concise Markdown summary for LLMs |
| `public/llms-full.txt` | Create | Expanded version with services, projects, FAQs |
| `app/robots.ts` | Modify | Add explicit AI bot allow rules |
| `lib/config/site.ts` | Modify | Add `entityLinks` array to `siteConfig` |
| `lib/seo/schema.ts` | Modify | Add `createOrganizationSchema()`, `createFounderSchema()`, expand `sameAs` |
| `app/layout.tsx` | Modify | Inject Organization + Person schemas |

---

### Task 1: Create `public/llms.txt`

**Files:**
- Create: `public/llms.txt`

- [ ] **Step 1: Create the file**

```markdown
# Premium Home Design

> Design-build custom home builder serving Dallas-Fort Worth, North Texas,
> and Southern Oklahoma. 835+ homes delivered since 2016. Licensed firm
> offering design, drafting, construction management, and interior design
> under one roof.

## About

- Licensed design-build firm based in Irving, TX (not just drafting or brokerage)
- Decision-gated process: discovery, concept, documentation, build, handover
- Open-book budgeting with allowance tracking and no hidden markups
- Service area: ~80-mile radius from DFW Metroplex into North Texas and Southern Oklahoma
- Bilingual team (English and Spanish)

## Services

- [Custom Home Design](https://www.premiumhome.design/services/custom-home-design): Concept through permit-ready construction documentation
- [Interior Design & Planning](https://www.premiumhome.design/services/interior-design): Finish selections, millwork, lighting, furniture coordination
- [3D Rendering Visualization](https://www.premiumhome.design/services/3d-rendering): Photorealistic renders and virtual walkthroughs
- [Project Management](https://www.premiumhome.design/services/project-management): Schedule, budget, and quality control for custom builds
- [Consulting Services](https://www.premiumhome.design/services/consulting): Bid review, lot feasibility, scope assessment
- [Landscape Design](https://www.premiumhome.design/services/landscape-design): DFW climate-adapted outdoor environments
- [Feasibility Studies](https://www.premiumhome.design/services/feasibility-studies): Zoning, soils, utilities, and budget analysis before commitment
- [B2B Drafting for Builders](https://www.premiumhome.design/for-builders): Outsourced permit-ready plans and construction documents for residential builders

## Key Pages

- [Projects Portfolio](https://www.premiumhome.design/projects): Featured custom homes across DFW
- [Design-Build Process](https://www.premiumhome.design/process): Four-stage process with decision gates
- [Client Reviews](https://www.premiumhome.design/reviews): Verified homeowner testimonials
- [Blog](https://www.premiumhome.design/blogs): Articles on cost, engineering, design trends, and regulations
- [FAQ](https://www.premiumhome.design/faq): Common questions about custom home building in DFW
- [Dallas-Fort Worth Service Area](https://www.premiumhome.design/dallas-fort-worth): Cities and regions served
- [Contact](https://www.premiumhome.design/contact): Project intake form

## Contact

- Phone: (972) 603-6794
- Email: info@premiumhome.design
- Address: 511 E John W Carpenter Fwy, Suite 597, Irving, TX 75062
- Website: https://www.premiumhome.design
```

Write this content to `public/llms.txt`.

- [ ] **Step 2: Verify the file is served**

Run: `curl -s http://localhost:3000/llms.txt | head -3`
Expected: `# Premium Home Design`

- [ ] **Step 3: Commit**

```bash
git add public/llms.txt
git commit -m "feat(geo): add llms.txt for AI search engine discovery"
```

---

### Task 2: Create `public/llms-full.txt`

**Files:**
- Create: `public/llms-full.txt`

- [ ] **Step 1: Create the file**

```markdown
# Premium Home Design — Full Reference

> Design-build custom home builder serving Dallas-Fort Worth, North Texas,
> and Southern Oklahoma. 835+ homes delivered since 2016. Licensed firm
> offering design, drafting, construction management, and interior design
> under one roof.

## About

- Licensed design-build firm based in Irving, TX (not just drafting or brokerage)
- Founded: 2016 by Hector Pachano
- Decision-gated process: discovery, concept, documentation, build, handover
- Open-book budgeting with allowance tracking and no hidden markups
- Service area: ~80-mile radius from DFW Metroplex into North Texas and Southern Oklahoma
- Bilingual team (English and Spanish)

## Services

### Custom Home Design
Concept through permit-ready construction documentation. Site analysis, massing studies, schematic design, design development, material coordination, and permit-ready CD sets — all calibrated for DFW lot conditions, codes, and climate.
URL: https://www.premiumhome.design/services/custom-home-design

### Interior Design & Planning
Interior environments designed for how DFW families actually live. Finish selections, millwork detailing, lighting design, and furniture layouts coordinated before construction begins to eliminate costly change orders.
URL: https://www.premiumhome.design/services/interior-design

### 3D Rendering Visualization
Photorealistic 3D renderings and virtual walkthroughs showing materials, lighting, and spatial relationships as they will appear in the built project. Used during design reviews to validate decisions before construction.
URL: https://www.premiumhome.design/services/3d-rendering

### Project Management
Schedule, budget, and quality control for custom homes. Weekly reporting, milestone inspections, and documented decision gates. 94% on-time completion rate across DFW projects.
URL: https://www.premiumhome.design/services/project-management

### Consulting Services
Expert guidance for owners navigating the custom home process. Bid review, lot feasibility evaluation, project scope assessment, builder selection guidance, and construction progress audits.
URL: https://www.premiumhome.design/services/consulting

### Landscape Design
Outdoor environments engineered for the DFW climate. Heat-tolerant plantings, smart irrigation, drainage engineering, hardscape, pools, and outdoor living spaces coordinated with the home's structural and MEP systems.
URL: https://www.premiumhome.design/services/landscape-design

### Feasibility Studies
Data-driven lot and project analysis before commitment. Zoning compliance, site survey, utility assessment, preliminary budget range, risk identification, and go/no-go recommendation.
URL: https://www.premiumhome.design/services/feasibility-studies

### B2B Drafting for Builders
Outsourced architectural drafting and construction documents for residential builders. Permit-ready custom home floor plans, 3D renders, and full CD packages with 5-7 day turnaround.
URL: https://www.premiumhome.design/for-builders

## Featured Projects

### Roxcliff Residence — Dallas
Modern residential build with clean white interiors, custom cabinetry, and coordinated lighting. All-in-one delivery: drafting, design, construction, and cabinetry in-house.
URL: https://www.premiumhome.design/projects/roxcliff

### Bickers Residence — Dallas
URL: https://www.premiumhome.design/projects/1930-bickers

## Design-Build Process

1. **Discovery & Feasibility**: Validate lot constraints, priorities, and budget ranges. Deliverables: project brief, site constraints memo, initial budget band.
2. **Concept & Cost Alignment**: Align scope, systems, and cost before drawings advance. Deliverables: concept package, engineering assumptions, updated target budget.
3. **Documentation & Permits**: Coordinate technical documentation for permitting and procurement. Deliverables: permit submittal set, bid-ready scopes, milestone schedule.
4. **Build & Handover**: Manage construction through QA checkpoints and owner walkthroughs. Deliverables: progress reporting, punch completion, warranty handoff packet.

URL: https://www.premiumhome.design/process

## Service Area

DFW core: Dallas, Fort Worth, Plano, Frisco, McKinney, Allen, Irving, Arlington, Southlake, Grapevine, Colleyville, Highland Park, University Park, Prosper, Coppell, Flower Mound.

DFW extended: Denton, Lewisville, Carrollton, Richardson, Garland, Keller, Mansfield, Rockwall, Little Elm, The Colony.

North Texas: Sherman, Denison, Gainesville, Greenville, Waxahachie, Weatherford, Granbury.

Southern Oklahoma: Durant, Ardmore.

URL: https://www.premiumhome.design/dallas-fort-worth

## Frequently Asked Questions

**What area do you serve?**
We accept design-build projects across Dallas-Fort Worth, North Texas, and Southern Oklahoma — within roughly 80 miles of Dallas.

**How long does a custom home take to build?**
Most custom homes in the 3,500-6,000 sqft range take 12-18 months from permit to move-in. Preconstruction adds 3-5 months.

**What does a custom home cost per square foot?**
Pricing varies by design complexity, structure, finish level, site conditions, and municipality. We develop a project-specific budget range during Discovery.

**How do you keep budget decisions transparent?**
Every phase includes clear deliverables, decision gates, and allowance tracking. Weekly reports include budget status and change-order tracking.

**Do you handle permits and HOA approvals?**
Yes. We manage permitting across DFW municipalities, North Texas counties, and Southern Oklahoma cities, plus HOA design review submissions.

URL: https://www.premiumhome.design/faq

## Blog (Recent Articles)

- [The True Cost of Building a Custom Home in DFW (2026)](https://www.premiumhome.design/blogs/true-cost-building-custom-home-dfw-2026)
- [Building on Expansive Clay Soils in North Texas](https://www.premiumhome.design/blogs/building-expansive-clay-soils-north-texas)
- [Navigating Design Review Boards: Highland Park & Beyond](https://www.premiumhome.design/blogs/navigating-architectural-review-boards-highland-park)
- [2026 Interior Design Trends for DFW Custom Homes](https://www.premiumhome.design/blogs/2026-interior-design-trends-dfw)
- [Luxury Outdoor Living for the North Texas Climate](https://www.premiumhome.design/blogs/luxury-outdoor-living-north-texas-climate)
- [Heat-Tolerant Landscaping for DFW Estates](https://www.premiumhome.design/blogs/heat-tolerant-landscaping-dfw-estates)

## Contact

- Phone: (972) 603-6794
- Email: info@premiumhome.design
- Address: 511 E John W Carpenter Fwy, Suite 597, Irving, TX 75062
- Website: https://www.premiumhome.design
```

Write this content to `public/llms-full.txt`.

- [ ] **Step 2: Verify the file is served**

Run: `curl -s http://localhost:3000/llms-full.txt | head -3`
Expected: `# Premium Home Design — Full Reference`

- [ ] **Step 3: Commit**

```bash
git add public/llms-full.txt
git commit -m "feat(geo): add llms-full.txt with expanded service and project details"
```

---

### Task 3: Update `app/robots.ts` with AI bot rules

**Files:**
- Modify: `app/robots.ts:1-17`

- [ ] **Step 1: Replace the entire file content**

```typescript
import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/config/site";

const AI_BOTS = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "PerplexityBot",
  "Applebot-Extended",
  "Google-Extended",
  "Amazonbot",
  "cohere-ai",
] as const;

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: [
      ...AI_BOTS.map((bot) => ({
        userAgent: bot,
        allow: "/" as const,
      })),
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `pnpm tsc --noEmit --pretty 2>&1 | grep -E "robots|error" | head -5`
Expected: No errors related to `robots.ts`

- [ ] **Step 3: Verify robots.txt output**

Run: `curl -s http://localhost:3000/robots.txt`
Expected output should contain:
```
User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /
...
User-agent: *
Allow: /

Sitemap: https://www.premiumhome.design/sitemap.xml
```

- [ ] **Step 4: Commit**

```bash
git add app/robots.ts
git commit -m "feat(geo): allow AI search bots explicitly in robots.txt"
```

---

### Task 4: Add `entityLinks` to `siteConfig`

**Files:**
- Modify: `lib/config/site.ts:6-8` (SiteConfig type)
- Modify: `lib/config/site.ts:36-49` (siteConfig object)

- [ ] **Step 1: Add `entityLinks` to the SiteConfig type**

In `lib/config/site.ts`, find:

```typescript
  socialLinks: readonly SocialLink[];
};
```

Replace with:

```typescript
  socialLinks: readonly SocialLink[];
  entityLinks: readonly string[];
};
```

- [ ] **Step 2: Add `entityLinks` to the siteConfig object**

In `lib/config/site.ts`, find:

```typescript
  ] as const,
};
```

(This is the closing of the `socialLinks` array and `siteConfig` object, lines 49-50.)

Replace with:

```typescript
  ] as const,
  entityLinks: [
    "https://www.google.com/maps/place/Premium+Home+Design",
    "https://www.instagram.com/pachanodesign",
  ] as const,
};
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `pnpm tsc --noEmit --pretty 2>&1 | grep "error" | head -5`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add lib/config/site.ts
git commit -m "feat(geo): add entityLinks to siteConfig for schema sameAs expansion"
```

---

### Task 5: Add `createOrganizationSchema()` and `createFounderSchema()` to schema.ts

**Files:**
- Modify: `lib/seo/schema.ts:92` (expand sameAs in LocalBusiness)
- Modify: `lib/seo/schema.ts` (add two new functions at end of file)

- [ ] **Step 1: Expand `sameAs` in `createLocalBusinessSchema`**

In `lib/seo/schema.ts`, find:

```typescript
    sameAs: siteConfig.socialLinks.map((social) => social.href),
```

Replace with:

```typescript
    sameAs: [
      ...siteConfig.socialLinks.map((social) => social.href),
      ...siteConfig.entityLinks,
    ],
```

- [ ] **Step 2: Add `createFounderSchema()` at the end of the file**

After the closing `}` of `createBlogBreadcrumbSchema` (line 479), append:

```typescript

export function createFounderSchema() {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Hector Pachano",
    jobTitle: "Founder",
    worksFor: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteUrl,
    },
    sameAs: ["https://www.instagram.com/pachanodesign"],
  };
}

export function createOrganizationSchema() {
  const siteUrl = getSiteUrl();
  const { phoneE164 } = getCtaConfig();

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: siteUrl,
    logo: `${siteUrl}/logo/logo.png`,
    foundingDate: "2016",
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.zip,
      addressCountry: "US",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: phoneE164,
      contactType: "customer service",
      areaServed: "US",
      availableLanguage: ["English", "Spanish"],
    },
    founder: {
      "@type": "Person",
      name: "Hector Pachano",
      jobTitle: "Founder",
      sameAs: ["https://www.instagram.com/pachanodesign"],
    },
    sameAs: [
      ...siteConfig.socialLinks.map((social) => social.href),
      ...siteConfig.entityLinks,
    ],
  };
}
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `pnpm tsc --noEmit --pretty 2>&1 | grep "error" | head -5`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add lib/seo/schema.ts
git commit -m "feat(geo): add Organization and Person schemas, expand sameAs in LocalBusiness"
```

---

### Task 6: Inject Organization + Person schemas in layout.tsx

**Files:**
- Modify: `app/layout.tsx:22` (import)
- Modify: `app/layout.tsx:136-137` (add JsonLd entries)

- [ ] **Step 1: Update the import**

In `app/layout.tsx`, find:

```typescript
import { createLocalBusinessSchema, createWebSiteSchema } from "@/lib/seo/schema";
```

Replace with:

```typescript
import {
  createLocalBusinessSchema,
  createOrganizationSchema,
  createFounderSchema,
  createWebSiteSchema,
} from "@/lib/seo/schema";
```

- [ ] **Step 2: Add the JsonLd components**

In `app/layout.tsx`, find:

```typescript
        <JsonLd data={createWebSiteSchema()} />
        <JsonLd data={createLocalBusinessSchema(reviews)} />
```

Replace with:

```typescript
        <JsonLd data={createWebSiteSchema()} />
        <JsonLd data={createLocalBusinessSchema(reviews)} />
        <JsonLd data={createOrganizationSchema()} />
        <JsonLd data={createFounderSchema()} />
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `pnpm tsc --noEmit --pretty 2>&1 | grep "error" | head -5`
Expected: No errors

- [ ] **Step 4: Verify schemas render in HTML**

Run: `curl -s http://localhost:3000 | grep -o '"@type":"Organization"'`
Expected: `"@type":"Organization"`

Run: `curl -s http://localhost:3000 | grep -o '"@type":"Person"'`
Expected: `"@type":"Person"`

- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx
git commit -m "feat(geo): inject Organization and Person JSON-LD schemas in root layout"
```

---

### Task 7: Final verification

- [ ] **Step 1: Verify all new endpoints**

Run each and confirm output:

```bash
curl -s http://localhost:3000/llms.txt | head -1
# Expected: "# Premium Home Design"

curl -s http://localhost:3000/llms-full.txt | head -1
# Expected: "# Premium Home Design — Full Reference"

curl -s http://localhost:3000/robots.txt | grep -c "User-agent"
# Expected: 9 (8 AI bots + 1 wildcard)
```

- [ ] **Step 2: Validate JSON-LD count on homepage**

Run: `curl -s http://localhost:3000 | grep -c 'application/ld+json'`
Expected: `4` (WebSite + LocalBusiness + Organization + Person)

- [ ] **Step 3: Run TypeScript check on full project**

Run: `pnpm tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Run build**

Run: `pnpm build 2>&1 | tail -5`
Expected: Build succeeds
