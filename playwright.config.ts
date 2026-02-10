import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./scripts",
  testMatch: "devils-advocate-audit.ts",
  timeout: 60_000,
  retries: 0,
  reporter: [["list"], ["json", { outputFile: ".devils-advocate/results.json" }]],
  use: {
    baseURL: process.env.BASE_URL || "http://localhost:3000",
    screenshot: "off",
    trace: "off",
  },
});
