import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { CtaLink } from "@/components/ui/cta-link";
import { JsonLd } from "@/components/ui/json-ld";
import { ProjectGallerySection } from "@/components/ui/project-gallery-section";
import { ProjectViewTracker } from "@/components/ui/project-view-tracker";
import { getProjectBySlug, getProjects } from "@/lib/data";
import { getCtaConfig, getSiteUrl } from "@/lib/config/site";
import {
  createProjectPageBreadcrumbSchema,
  createProjectSchema,
} from "@/lib/seo/schema";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  const siteUrl = getSiteUrl();

  if (!project) {
    return {
      title: "Project Not Found",
      alternates: {
        canonical: `${siteUrl}/projects`,
      },
    };
  }

  const ogImage = project.heroImage ?? project.gallery[0];

  return {
    title: `${project.title} | ${project.location.city}`,
    description: `${project.summary} Located in ${project.location.display}, Dallas-Fort Worth Metroplex.`,
    keywords: [
      `custom home ${project.location.city}`,
      "custom home Dallas-Fort Worth",
      `${project.style} home ${project.location.city} TX`,
      "DFW custom home builder",
      "design-build Dallas-Fort Worth",
    ],
    openGraph: {
      title: `${project.title} | Custom Home in ${project.location.city}`,
      description: `${project.summary} Located in ${project.location.display}, Dallas-Fort Worth Metroplex.`,
      url: `${siteUrl}/projects/${project.slug}`,
      ...(ogImage?.src && {
        images: [{ url: ogImage.src, alt: ogImage.alt }],
      }),
    },
    other: {
      "geo.region": "US-TX",
      "geo.placename": `${project.location.city}, TX`,
    },
    alternates: {
      canonical: `${siteUrl}/projects/${project.slug}`,
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { scheduleUrl } = getCtaConfig();

  return (
    <article className="section-shell">
      <JsonLd data={createProjectPageBreadcrumbSchema(project)} />
      <JsonLd data={createProjectSchema(project)} />
      <ProjectViewTracker slug={project.slug} />
      <Container swiss className="space-y-8">
        <header className="space-y-4">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{project.location.display}</p>
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">{project.title}</h1>
          <p className="text-reading text-base leading-7 text-muted">{project.summary}</p>
        </header>

        <div className="grid gap-5 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <ProjectGallerySection images={project.gallery} projectTitle={project.title} />
          </div>

          <aside className="space-y-5 lg:col-span-4" aria-label="Project details">
            <div className="rounded-2xl border border-line bg-surface p-5">
              <h2 className="text-lg font-semibold">Project Specs</h2>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                {project.specs?.sqft ? <li>{project.specs.sqft.toLocaleString()} sq ft</li> : null}
                {project.specs?.beds ? <li>{project.specs.beds} bedrooms</li> : null}
                {project.specs?.baths ? <li>{project.specs.baths} bathrooms</li> : null}
                {project.specs?.stories ? <li>{project.specs.stories} stories</li> : null}
                <li>{project.style} style</li>
                <li>Completed in {project.year}</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-line bg-surface p-5">
              <h2 className="text-lg font-semibold">Highlights</h2>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                {project.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-2">
                    <span aria-hidden className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-line bg-surface p-5">
              <h2 className="text-lg font-semibold">Start Your DFW Project</h2>
              <p className="mt-2 text-sm leading-6 text-muted">
                Planning a custom home in Dallas-Fort Worth? Share your brief and schedule a consultation.
              </p>
              <div className="mt-4">
                <CtaLink
                  href={scheduleUrl}
                  target="_blank"
                  rel="noreferrer"
                  eventName="cta_schedule_click"
                >
                  Schedule Consultation
                </CtaLink>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </article>
  );
}
