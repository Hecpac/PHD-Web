/**
 * Logo navigation regression test.
 *
 * Verifies that clicking the floating logo from any inner route lands the
 * home page at the hero (scrollY ~ 0), not mid-page on HeroRenderSection.
 *
 * Run: npx playwright test scripts/test-logo-navigation.ts --config=playwright-nav.config.ts
 */
import { test, expect, type Page } from "@playwright/test";

const BASE = process.env.BASE_URL || "http://localhost:3100";
const START_ROUTES = ["/for-builders", "/services", "/blogs", "/contact"];

async function waitForLogoReady(page: Page) {
  // The floating logo is dynamically loaded after idle callback (~1.2s).
  // Its aria-label starts with "Premium Home Design" or "Premium Home Drafting";
  // the header's mobile logo uses "Go to homepage" (and is md:hidden on desktop),
  // so we match by brand name to disambiguate.
  const logo = page.locator('a[aria-label^="Premium Home"]').first();
  await logo.waitFor({ state: "visible", timeout: 15_000 });
  return logo;
}

async function scrollHalfway(page: Page) {
  await page.evaluate(() => {
    window.scrollTo(0, Math.round(document.documentElement.scrollHeight / 2));
  });
  await page.waitForTimeout(300);
}

for (const route of START_ROUTES) {
  test(`logo click from ${route} lands on home hero`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE}${route}`, { waitUntil: "networkidle" });

    // Scroll into the page so the starting scroll position is non-zero.
    await scrollHalfway(page);
    const scrollBefore = await page.evaluate(() => window.scrollY);
    expect(scrollBefore).toBeGreaterThan(200);

    // Click the floating logo (last matching Link — the floating one).
    const logo = await waitForLogoReady(page);
    await logo.click();

    // Wait for route transition to complete.
    await page.waitForURL(`${BASE}/`, { timeout: 5_000 });
    // Let Lenis RAF + TransitionProvider (600ms enter + 200 hold + 600 exit) settle.
    await page.waitForTimeout(1800);

    // Assertions
    const scrollAfter = await page.evaluate(() => window.scrollY);
    const heroVisible = await page.evaluate(() => {
      const hero = document.getElementById("hero");
      if (!hero) return { found: false };
      const rect = hero.getBoundingClientRect();
      return {
        found: true,
        top: Math.round(rect.top),
        bottom: Math.round(rect.bottom),
        height: Math.round(rect.height),
      };
    });

    console.log(`[${route}]`, {
      scrollBefore,
      scrollAfter,
      heroVisible,
    });

    expect(heroVisible.found).toBe(true);
    // Hero must be at viewport top (<=50px tolerance for margins)
    expect(Math.abs(heroVisible.top)).toBeLessThanOrEqual(80);
    // scrollY must be at top (tolerance for sticky header offset)
    expect(scrollAfter).toBeLessThan(100);
  });
}
