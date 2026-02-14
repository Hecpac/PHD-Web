import type { Metadata } from "next";

import { BlogList } from "@/components/blog/blog-list";
import { Container } from "@/components/layout/container";
import { JsonLd } from "@/components/ui/json-ld";
import { SectionHeading } from "@/components/ui/section-heading";
import { getSiteUrl } from "@/lib/config/site";
import { getBlogPosts } from "@/lib/data";
import {
  createBlogBreadcrumbSchema,
  createBlogCollectionSchema,
} from "@/lib/seo/schema";

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = getSiteUrl();

  return {
    title: "Blog | Insights for DFW Custom Homes",
    description:
      "Articles on architecture, construction, budgeting, and the design-build process for custom homes in Dallas-Fort Worth.",
    openGraph: {
      title: "Blog | DFW Custom Home Building Insights",
      description:
        "Articles on architecture, construction, budgeting, and the design-build process for custom homes in Dallas-Fort Worth.",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: "Blog | DFW Custom Home Building Insights",
      description:
        "Articles on architecture, construction, budgeting, and the design-build process for custom homes in Dallas-Fort Worth.",
    },
    alternates: {
      canonical: `${siteUrl}/blogs`,
      types: {
        "application/rss+xml": "/blogs/feed.xml",
      },
    },
  };
}

export default async function BlogsPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <JsonLd data={createBlogBreadcrumbSchema()} />
      <JsonLd data={createBlogCollectionSchema(posts)} />
      <section className="section-shell" aria-labelledby="blog-heading">
        <Container swiss className="space-y-10">
          <SectionHeading
            as="h1"
            eyebrow="Blog"
            title="Insights on building custom homes in DFW"
            description="Practical knowledge from our design-build team on architecture, process, budgets, and the realities of building in the Dallas-Fort Worth Metroplex."
          />

          <BlogList posts={posts} />
        </Container>
      </section>
    </>
  );
}
