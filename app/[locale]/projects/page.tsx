import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Container } from "@/components/layout/container";
import { JsonLd } from "@/components/ui/json-ld";
import { SectionHeading } from "@/components/ui/section-heading";
import { getSiteUrl } from "@/lib/config/site";
import { getProjects } from "@/lib/data";
import { createBreadcrumbSchema } from "@/lib/seo/schema";

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = getSiteUrl();
  const t = await getTranslations("projectsPage");

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    keywords: [
      "portfolio",
      "custom home projects",
      "residential design",
      "DFW",
      "North Texas",
    ],
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
    },
    twitter: {
      card: "summary_large_image",
      site: "@PHDhomes",
    },
    alternates: {
      canonical: `${siteUrl}/projects`,
      languages: { en: `${siteUrl}/en/projects`, es: `${siteUrl}/es/projects` },
    },
  };
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("projectsPage");
  const projects = await getProjects(locale);

  return (
    <>
      <JsonLd
        data={createBreadcrumbSchema([
          { name: t("breadcrumbHome"), href: "/" },
          { name: t("breadcrumbProjects"), href: "/projects" },
        ])}
      />

      <section className="section-shell" aria-labelledby="projects-heading">
        <Container swiss>
          <SectionHeading
            as="h1"
            titleId="projects-heading"
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
          />
        </Container>
      </section>

      <section
        className="border-t border-line bg-line"
        aria-label={t("galleryLabel")}
      >
        <ul className="grid list-none grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            const coverImage = project.heroImage ?? project.gallery[0];
            return (
              <li key={project.id} className="relative">
                <Link
                  href={`/projects/${project.slug}`}
                  className="group relative block aspect-[3/4] overflow-hidden bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg sm:aspect-[4/5]"
                  aria-label={`${project.title} — ${project.location.display}`}
                >
                  {coverImage ? (
                    <Image
                      src={coverImage.src}
                      alt={coverImage.alt}
                      fill
                      priority={index < 3}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                    />
                  ) : null}

                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                  />

                  <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6 text-white sm:p-7">
                    <span className="type-mono-label text-white/80">
                      {project.location.display}
                    </span>
                    <h2 className="text-balance text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                      {project.title}
                    </h2>
                    <span className="mt-1 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/80 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      {t("viewProject")}
                      <span aria-hidden className="inline-block">→</span>
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
