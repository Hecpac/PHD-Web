/**
 * Devil's Advocate Visual Audit
 * Takes screenshots of every route and generates an unfiltered critique.
 * Usage: npx playwright test scripts/devils-advocate-audit.ts
 */
import { test, expect, type Page } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";

const BASE = process.env.BASE_URL || "http://localhost:3000";
const OUT_DIR = path.resolve(__dirname, "../.devils-advocate");

const ROUTES = [
  { name: "home", path: "/" },
  { name: "about", path: "/about" },
  { name: "services", path: "/services" },
  { name: "projects", path: "/projects" },
  { name: "process", path: "/process" },
  { name: "dallas-fort-worth", path: "/dallas-fort-worth" },
  { name: "reviews", path: "/reviews" },
  { name: "blogs", path: "/blogs" },
  { name: "faq", path: "/faq" },
  { name: "contact", path: "/contact" },
];

const VIEWPORTS = [
  { name: "mobile", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 900 },
];

// Ensure output dir exists
fs.mkdirSync(OUT_DIR, { recursive: true });

async function scrollFullPage(page: Page) {
  await page.evaluate(async () => {
    await new Promise<void>((resolve) => {
      let totalHeight = 0;
      const distance = 400;
      const timer = setInterval(() => {
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= document.body.scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          resolve();
        }
      }, 100);
    });
  });
  // Wait for lazy-loaded content to settle
  await page.waitForTimeout(500);
}

for (const route of ROUTES) {
  for (const vp of VIEWPORTS) {
    test(`${route.name} — ${vp.name} (${vp.width}x${vp.height})`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      const response = await page.goto(`${BASE}${route.path}`, {
        waitUntil: "networkidle",
        timeout: 30000,
      });

      // Check HTTP status
      expect(response?.status()).toBeLessThan(400);

      // Scroll to trigger lazy content
      await scrollFullPage(page);

      // Full-page screenshot
      const filename = `${route.name}--${vp.name}.png`;
      await page.screenshot({
        path: path.join(OUT_DIR, filename),
        fullPage: true,
      });

      // Collect issues per page
      const issues: string[] = [];

      // 1. Check for console errors
      const consoleErrors: string[] = [];
      page.on("console", (msg) => {
        if (msg.type() === "error") consoleErrors.push(msg.text());
      });

      // 2. Check missing alt text
      const missingAlts = await page.$$eval("img:not([alt])", (imgs) =>
        imgs.map((img) => (img as HTMLImageElement).src)
      );
      if (missingAlts.length > 0) {
        issues.push(
          `ACCESSIBILITY: ${missingAlts.length} images missing alt text:\n${missingAlts.map((s) => `  - ${s}`).join("\n")}`
        );
      }

      // 3. Empty alt on non-decorative images
      const emptyAlts = await page.$$eval(
        'img[alt=""]:not([role="presentation"]):not([aria-hidden="true"])',
        (imgs) => imgs.map((img) => (img as HTMLImageElement).src)
      );
      if (emptyAlts.length > 0) {
        issues.push(
          `ACCESSIBILITY: ${emptyAlts.length} images with empty alt but not marked decorative:\n${emptyAlts.map((s) => `  - ${s}`).join("\n")}`
        );
      }

      // 4. Check touch target sizes (< 24x24)
      const smallTargets = await page.$$eval(
        "a, button, [role='button'], input, select, textarea",
        (els) =>
          els
            .filter((el) => {
              const rect = el.getBoundingClientRect();
              return (
                rect.width > 0 &&
                rect.height > 0 &&
                (rect.width < 24 || rect.height < 24)
              );
            })
            .map((el) => ({
              tag: el.tagName,
              text: (el.textContent || "").trim().slice(0, 50),
              w: Math.round(el.getBoundingClientRect().width),
              h: Math.round(el.getBoundingClientRect().height),
            }))
      );
      if (smallTargets.length > 0) {
        issues.push(
          `TOUCH TARGETS: ${smallTargets.length} elements below 24x24:\n${smallTargets.map((t) => `  - <${t.tag}> "${t.text}" → ${t.w}x${t.h}`).join("\n")}`
        );
      }

      // 5. Check focus-visible on interactive elements
      const noFocusVisible = await page.$$eval(
        "a, button, [role='button'], input, select, textarea",
        (els) =>
          els
            .filter((el) => {
              const style = getComputedStyle(el);
              return style.outlineStyle === "none" && style.outlineWidth === "0px";
            })
            .map((el) => ({
              tag: el.tagName,
              text: (el.textContent || "").trim().slice(0, 50),
            }))
      );
      if (noFocusVisible.length > 5) {
        issues.push(
          `FOCUS VISIBLE: ${noFocusVisible.length} interactive elements have outline:none (may lack focus indicator)`
        );
      }

      // 6. Check color contrast on text (basic heuristic)
      const lowContrastCount = await page.$$eval(
        "p, span, h1, h2, h3, h4, h5, h6, a, li, td, th, label",
        (els) => {
          function luminance(r: number, g: number, b: number) {
            const [rs, gs, bs] = [r, g, b].map((c) => {
              c /= 255;
              return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
            });
            return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
          }
          function parseColor(color: string): [number, number, number] | null {
            const m = color.match(
              /rgba?\((\d+),\s*(\d+),\s*(\d+)/
            );
            return m ? [+m[1], +m[2], +m[3]] : null;
          }
          let count = 0;
          for (const el of els) {
            const style = getComputedStyle(el);
            const fg = parseColor(style.color);
            const bg = parseColor(style.backgroundColor);
            if (fg && bg) {
              const l1 = luminance(...fg);
              const l2 = luminance(...bg);
              const ratio =
                (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
              if (ratio < 4.5) count++;
            }
          }
          return count;
        }
      );
      if (lowContrastCount > 0) {
        issues.push(
          `CONTRAST: ~${lowContrastCount} text elements may have contrast ratio < 4.5:1 (WCAG AA)`
        );
      }

      // 7. Check broken images
      const brokenImages = await page.$$eval("img", (imgs) =>
        imgs
          .filter(
            (img) =>
              (img as HTMLImageElement).complete &&
              (img as HTMLImageElement).naturalWidth === 0
          )
          .map((img) => (img as HTMLImageElement).src)
      );
      if (brokenImages.length > 0) {
        issues.push(
          `BROKEN IMAGES: ${brokenImages.length}:\n${brokenImages.map((s) => `  - ${s}`).join("\n")}`
        );
      }

      // 8. Check for horizontal overflow
      const hasOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      if (hasOverflow) {
        issues.push(
          `LAYOUT: Horizontal overflow detected at ${vp.width}px — content wider than viewport`
        );
      }

      // 9. Missing heading hierarchy
      const headings = await page.$$eval("h1, h2, h3, h4, h5, h6", (els) =>
        els.map((el) => parseInt(el.tagName[1]))
      );
      for (let i = 1; i < headings.length; i++) {
        if (headings[i] - headings[i - 1] > 1) {
          issues.push(
            `SEMANTICS: Heading level skipped from h${headings[i - 1]} to h${headings[i]}`
          );
          break;
        }
      }

      // 10. Multiple h1 tags
      const h1Count = headings.filter((h) => h === 1).length;
      if (h1Count > 1) {
        issues.push(`SEMANTICS: ${h1Count} <h1> tags found — should be exactly 1`);
      }
      if (h1Count === 0) {
        issues.push(`SEMANTICS: No <h1> tag found on page`);
      }

      // Write issues log
      const logFile = path.join(OUT_DIR, `${route.name}--${vp.name}.issues.txt`);
      if (issues.length > 0) {
        fs.writeFileSync(logFile, issues.join("\n\n"));
      } else {
        fs.writeFileSync(logFile, "No issues detected.");
      }
    });
  }
}
