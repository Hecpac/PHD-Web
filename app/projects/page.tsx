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

function getCardSpan(index: number) {
  if (index % 4 === 0) return "xl:col-span-7";
  if (index % 4 === 1) return "xl:col-span-5";
  return "xl:col-span-6";
}

export default async function ProjectsPage() {
  const projects = await getProjects();
  const [leadProject, ...remainingProjects] = projects;

  return (
    <section className="section-shell" aria-labelledby="projects-heading">
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Projects", href: "/projects" },
        ])}
      />
      <Container swiss className="space-y-10 md:space-y-12">
        <SectionHeading
          as="h1"
          eyebrow="Portfolio"
          title="Custom home projects in DFW"
          description="Built work that demonstrates architectural clarity, planning discipline, and field execution quality."
        />

        {leadProject ? (
          <article className="overflow-hidden border border-line bg-surface">
            <div className="grid gap-0 lg:grid-cols-12">
              <div className="relative aspect-[16/10] border-b border-line/80 lg:col-span-7 lg:aspect-auto lg:min-h-[34rem] lg:border-b-0 lg:border-r">
                <Image
                  src={leadProject.gallery[0]?.src ?? "/projects/north-dallas-courtyard-residence/hero.jpg"}
                  alt={leadProject.gallery[0]?.alt ?? `${leadProject.title} project image`}
                  fill
                  priority
                  fetchPriority="high"
                  sizes="(min-width: 1280px) 56vw, (min-width: 1024px) 58vw, 100vw"
                  className="object-cover"
                />
              </div>

              <div className="flex min-w-0 flex-col justify-between gap-6 p-6 sm:p-8 lg:col-span-5">
                <div className="space-y-4">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                    Featured Case · {leadProject.location.display}
                  </p>
                  <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                    {leadProject.title}
                  </h2>
                  <p className="text-reading text-sm leading-7 text-muted">{leadProject.summary}</p>
                </div>

                <div className="space-y-5 border-t border-line pt-5">
                  {leadProject.tags?.length ? (
                    <ul className="flex flex-wrap gap-2" aria-label="Project tags">
                      {leadProject.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-sm border border-line bg-surface-2 px-3 py-1 text-xs text-muted"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  <CtaLink href={`/projects/${leadProject.slug}`} variant="ghost" className="px-0">
                    Review full case study
                  </CtaLink>
                </div>
              </div>
            </div>
          </article>
        ) : null}

        {remainingProjects.length ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-12" aria-label="Additional projects">
            {remainingProjects.map((project, index) => (
              <article
                key={project.id}
                className={`overflow-hidden border border-line bg-surface transition-colors hover:border-accent/40 ${getCardSpan(index)}`}
              >
                <div className="relative aspect-[16/10] border-b border-line/80">
                  <Image
                    src={project.gallery[0]?.src ?? "/projects/north-dallas-courtyard-residence/hero.jpg"}
                    alt={project.gallery[0]?.alt ?? `${project.title} project image`}
                    fill
                    sizes="(min-width: 1280px) 45vw, (min-width: 768px) 50vw, 95vw"
                    className="object-cover"
                  />
                </div>

                <div className="space-y-3 p-5 sm:p-6">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                    {project.location.display}
                  </p>
                  <h2 className="text-balance text-2xl font-semibold tracking-tight">{project.title}</h2>
                  <p className="line-clamp-3 text-sm leading-6 text-muted">{project.summary}</p>

                  <CtaLink href={`/projects/${project.slug}`} variant="ghost" className="px-0">
                    View project details
                  </CtaLink>
                </div>
              </article>
            ))}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
