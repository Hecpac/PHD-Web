import { getBlogPosts } from "@/lib/data";
import { getSiteUrl, siteConfig } from "@/lib/config/site";

export async function GET() {
  const siteUrl = getSiteUrl();
  const posts = await getBlogPosts();

  const items = posts
    .map(
      (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${siteUrl}/blogs/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/blogs/${post.slug}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category>${escapeXml(post.category)}</category>
    </item>`,
    )
    .join("\n");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.name)} – Blog</title>
    <link>${siteUrl}/blogs</link>
    <description>Articles on architecture, construction, budgeting, and the design-build process for custom homes in Dallas-Fort Worth.</description>
    <language>en-us</language>
    <atom:link href="${siteUrl}/blogs/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
