import type { Metadata } from "next";
import Image from "next/image";

import { Container } from "@/components/layout/container";
import { CtaLink } from "@/components/ui/cta-link";
import { JsonLd } from "@/components/ui/json-ld";
import { SectionHeading } from "@/components/ui/section-heading";
import { getSiteUrl } from "@/lib/config/site";
import { getProjects } from "@/lib/data";
import { createBreadcrumbSchema } from "@/lib/seo/schema";

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = getSiteUrl();

  return {
    title: "Portfolio Projects in Dallas-Fort Worth",
    description:
      "Explore custom home projects delivered across the Dallas-Fort Worth Metroplex.",
    openGraph: {
      title: "Portfolio Projects in Dallas-Fort Worth",
      description:
        "Explore custom home projects delivered across the Dallas-Fort Worth Metroplex.",
    },
    alternates: {
      canonical: `${siteUrl}/projects`,
    },
  };
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <section className="section-shell" aria-labelledby="projects-heading">
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Projects", href: "/projects" },
        ])}
      />
      <Container className="space-y-10">
        <h1 className="sr-only" id="projects-heading">Portfolio projects in Dallas-Fort Worth</h1>
        <SectionHeading
          eyebrow="Portfolio"
          title="Custom home projects in DFW"
          description="Built work that demonstrates architectural clarity, planning discipline, and field execution quality."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <article key={project.id} className="overflow-hidden rounded-2xl border border-line bg-surface">
              <div className="relative aspect-[16/10] border-b border-line/80">
                <Image
                  src={project.gallery[0]?.src ?? "/projects/north-dallas-courtyard-residence/hero.jpg"}
                  alt={project.gallery[0]?.alt ?? `${project.title} project image`}
                  fill
                  sizes="(min-width: 768px) 50vw, 95vw"
                  className="object-cover"
                />
              </div>
              <div className="space-y-3 p-5">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{project.location.display}</p>
                <h2 className="text-2xl font-semibold tracking-tight">{project.title}</h2>
                <p className="text-sm leading-6 text-muted">{project.summary}</p>
                <CtaLink href={`/projects/${project.slug}`} variant="ghost" className="px-0">
                  View project details
                </CtaLink>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
