import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageIntentTracker } from "@/components/analytics/page-intent-tracker";
import { Container } from "@/components/layout/container";
import { BookingModal } from "@/components/ui/booking-modal";
import { CtaLink } from "@/components/ui/cta-link";
import { JsonLd } from "@/components/ui/json-ld";
import { ProjectGallerySection } from "@/components/ui/project-gallery-section";
import { SocialProofStrip } from "@/components/ui/social-proof-strip";
import { getProjectBySlug, getProjects, getReviews } from "@/lib/data";
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
    description: `${project.summary} Located in ${project.location.display}, within our DFW · North Texas · Southern Oklahoma service area.`,
    keywords: [
      `custom home ${project.location.city}`,
      "custom home Dallas-Fort Worth",
      ...(project.style ? [`${project.style} home ${project.location.city}`] : []),
      "DFW custom home builder",
      "North Texas custom home builder",
      "Southern Oklahoma custom home builder",
      "design-build Dallas-Fort Worth",
    ],
    openGraph: {
      title: `${project.title} | Custom Home in ${project.location.city}`,
      description: `${project.summary} Located in ${project.location.display}, within our DFW · North Texas · Southern Oklahoma service area.`,
      url: `${siteUrl}/projects/${project.slug}`,
      ...(ogImage?.src && {
        images: [{ url: `${siteUrl}${ogImage.src}`, alt: ogImage.alt }],
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

function getContextualCta(project: { location: { city: string } }) {
  const city = project.location.city.toLowerCase();

  if (city.includes("highland park")) {
    return {
      title: "Planning in Highland Park?",
      body: "We’ll walk through design review, timeline risk, and permit sequencing before design starts.",
      button: "Book Highland Park Feasibility Call",
    };
  }

  if (city.includes("southlake")) {
    return {
      title: "Building in Southlake?",
      body: "Get a scope and budget discussion calibrated for luxury lots, timeline constraints, and finish level.",
      button: "Book Southlake Consultation",
    };
  }

  if (city.includes("prosper")) {
    return {
      title: "Planning in Prosper?",
      body: "We’ll align lot-readiness, utilities, and project scope before your first design milestone.",
      button: "Book Prosper Project Call",
    };
  }

  return {
    title: `Planning in ${project.location.city}?`,
    body: `Discuss design-build scope, budget guardrails, and execution path for a custom home in ${project.location.city}.`,
    button: `Book ${project.location.city} Consultation`,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const [project, reviews] = await Promise.all([getProjectBySlug(slug), getReviews()]);

  if (!project) {
    notFound();
  }

  const { scheduleUrl, phoneHref, phoneDisplay } = getCtaConfig();
  const cta = getContextualCta(project);
  const contextualReviews = reviews
    .filter((review) => review.location.toLowerCase().includes(project.location.city.toLowerCase()))
    .slice(0, 1);
  const socialProof = contextualReviews.length > 0 ? contextualReviews : reviews.slice(0, 1);

  return (
    <article className="py-8 sm:py-12 lg:py-16">
      <JsonLd data={createProjectPageBreadcrumbSchema(project)} />
      <JsonLd data={createProjectSchema(project)} />
      <PageIntentTracker entityType="project" slug={project.slug} />
      <Container swiss className="space-y-4 sm:space-y-8">
        <hgroup className="space-y-2 sm:space-y-4">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{project.location.display}</p>
          <h1 className="text-balance text-2xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">{project.title}</h1>
          <p className="text-reading text-sm leading-6 text-muted sm:text-base sm:leading-7">{project.summary}</p>
        </hgroup>

        <div className="grid gap-5 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <ProjectGallerySection images={project.gallery} projectTitle={project.title} />
          </div>

          <aside className="space-y-5 lg:col-span-4" aria-label="Project details">
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
              <h2 className="text-lg font-semibold">{cta.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">{cta.body}</p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <BookingModal
                  bookingUrl={scheduleUrl}
                  triggerLabel={cta.button}
                  title="Book your custom home consultation"
                  description="Pick a slot and we will review your project scope live."
                  analyticsId="project_primary_schedule"
                />
                <CtaLink
                  href={phoneHref}
                  eventName="cta_call_click"
                  variant="secondary"
                  data-analytics-cta="project_primary_call"
                >
                  Call {phoneDisplay}
                </CtaLink>
              </div>
            </div>
          </aside>
        </div>

        <SocialProofStrip
          title={`Client feedback from ${project.location.city} and nearby areas`}
          reviews={socialProof}
        />
      </Container>
    </article>
  );
}
