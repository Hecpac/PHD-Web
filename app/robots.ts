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
