import {
  fallbackBlogPosts,
  fallbackFaqs,
  fallbackProcessSteps,
  fallbackProjects,
  fallbackReviews,
  fallbackServiceDetails,
  fallbackServices,
} from "@/lib/data/fallback";
import { hasSanityConfig, sanityClient } from "@/lib/sanity/client";
import type { QueryParams } from "next-sanity";
import {
  blogPostBySlugQuery,
  blogPostsQuery,
  faqsQuery,
  featuredProjectsWithHeroQuery,
  homeHeroQuery,
  processStepsQuery,
  projectBySlugQuery,
  projectsQuery,
  reviewsQuery,
  serviceDetailBySlugQuery,
  serviceDetailsQuery,
  servicesQuery,
} from "@/lib/sanity/queries";
import type { BlogPost, FAQ, HomeHero, ProcessStep, Project, Review, Service, ServiceDetail } from "@/lib/types/content";
import { isDfwCity } from "@/lib/types/content";

type SanityImage = {
  url?: string;
  alt?: string;
  width?: number;
  height?: number;
};

type SanityProject = {
  _id?: string;
  title?: string;
  slug?: string;
  location?: {
    city?: string;
    neighborhood?: string;
  };
  style?: string;
  year?: number;
  summary?: string;
  description?: string;
  gallery?: SanityImage[];
  highlights?: string[];
  specs?: {
    sqft?: number;
    beds?: number;
    baths?: number;
    stories?: number;
  };
  isFeatured?: boolean;
  featuredOrder?: number;
  heroImage?: SanityImage;
  tags?: string[];
};

type SanityService = {
  _id?: string;
  title?: string;
  summary?: string;
  deliverables?: string[];
  order?: number;
  icon?: string;
};

type SanityProcessStep = {
  _id?: string;
  stepNumber?: number;
  title?: string;
  description?: string;
  deliverables?: string[];
  decisionGate?: string;
};

type SanityFaq = {
  _id?: string;
  question?: string;
  answer?: string;
  category?: string;
};

async function fetchFromSanity<T>(query: string, fallbackValue: T, params?: QueryParams) {
  if (!hasSanityConfig || !sanityClient) {
    return fallbackValue;
  }

  try {
    const safeParams: QueryParams = params ?? {};
    const result = await sanityClient.fetch<T>(query, safeParams, {
      next: { tags: ['sanity'] }
    });

    if (result == null) {
      return fallbackValue;
    }

    if (Array.isArray(result) && result.length === 0) {
      return fallbackValue;
    }

    return result;
  } catch (error) {
    console.warn("Sanity fetch failed. Falling back to static data.", error);
    return fallbackValue;
  }
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function normalizeProject(doc: SanityProject): Project | null {
  const title = doc.title?.trim();
  const city = doc.location?.city?.trim();

  if (!title || !city || !isDfwCity(city)) {
    return null;
  }

  const slug = doc.slug?.trim() || slugify(title);
  const neighborhood = doc.location?.neighborhood?.trim();

  return {
    id: doc._id || `project-${slug}`,
    title,
    slug,
    location: {
      city,
      neighborhood,
      display: neighborhood ? `${neighborhood}, ${city}` : `${city}, DFW Metroplex`,
    },
    style: doc.style?.trim() || "Modern",
    year: doc.year ?? 2026,
    summary: doc.summary?.trim() || "Custom home delivery in DFW.",
    description: doc.description?.trim() || undefined,
    gallery:
      doc.gallery
        ?.filter((image) => Boolean(image.url))
        .map((image) => ({
          src: image.url as string,
          alt: image.alt?.trim() || `${title} gallery image`,
          width: image.width ?? 1600,
          height: image.height ?? 1000,
        })) ?? [],
    highlights: doc.highlights?.filter(Boolean) ?? [],
    specs: doc.specs,
    isFeatured: Boolean(doc.isFeatured),
    featuredOrder: doc.featuredOrder,
    heroImage: doc.heroImage?.url
      ? {
          src: doc.heroImage.url,
          alt: doc.heroImage.alt?.trim() || `${title} hero image`,
          width: doc.heroImage.width ?? 1600,
          height: doc.heroImage.height ?? 1000,
        }
      : undefined,
    tags: doc.tags?.filter(Boolean),
  };
}

function normalizeService(doc: SanityService): Service | null {
  const title = doc.title?.trim();
  const summary = doc.summary?.trim();

  if (!title || !summary) {
    return null;
  }

  return {
    id: doc._id || `service-${slugify(title)}`,
    title,
    summary,
    deliverables: doc.deliverables?.filter(Boolean) ?? [],
    order: doc.order ?? 99,
    icon: doc.icon || "Dot",
  };
}

function normalizeProcessStep(doc: SanityProcessStep): ProcessStep | null {
  const title = doc.title?.trim();
  const description = doc.description?.trim();

  if (!title || !description || typeof doc.stepNumber !== "number") {
    return null;
  }

  return {
    id: doc._id || `process-step-${doc.stepNumber}`,
    stepNumber: doc.stepNumber,
    title,
    description,
    deliverables: doc.deliverables?.filter(Boolean) ?? [],
    decisionGate: doc.decisionGate?.trim(),
  };
}

function normalizeFaq(doc: SanityFaq): FAQ | null {
  const question = doc.question?.trim();
  const answer = doc.answer?.trim();

  if (!question || !answer) {
    return null;
  }

  return {
    id: doc._id || `faq-${slugify(question)}`,
    question,
    answer,
    category: doc.category?.trim() || "General",
  };
}

export async function getProjects(): Promise<Project[]> {
  const docs = await fetchFromSanity<SanityProject[]>(projectsQuery, fallbackProjects);

  if (!hasSanityConfig) {
    return docs as Project[];
  }

  const normalized = (docs as SanityProject[])
    .map(normalizeProject)
    .filter((project): project is Project => Boolean(project));

  return normalized.length > 0 ? normalized : fallbackProjects;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (!hasSanityConfig || !sanityClient) {
    return fallbackProjects.find((project) => project.slug === slug) ?? null;
  }

  const doc = await fetchFromSanity<SanityProject | null>(projectBySlugQuery, null, { slug });

  if (doc) {
    const normalized = normalizeProject(doc);
    if (normalized) {
      return normalized;
    }
  }

  return fallbackProjects.find((project) => project.slug === slug) ?? null;
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const fallbackFeatured = fallbackProjects.filter((p) => p.isFeatured);
  const docs = await fetchFromSanity<SanityProject[]>(featuredProjectsWithHeroQuery, fallbackFeatured);

  if (!hasSanityConfig) {
    return docs as Project[];
  }

  const normalized = (docs as SanityProject[])
    .map(normalizeProject)
    .filter((project): project is Project => Boolean(project));

  return normalized.length > 0 ? normalized : fallbackFeatured;
}

export async function getServices(): Promise<Service[]> {
  const docs = await fetchFromSanity<SanityService[]>(servicesQuery, fallbackServices);

  if (!hasSanityConfig) {
    return docs as Service[];
  }

  const normalized = (docs as SanityService[])
    .map(normalizeService)
    .filter((service): service is Service => Boolean(service))
    .sort((a, b) => a.order - b.order);

  return normalized.length > 0 ? normalized : fallbackServices;
}

export async function getProcessSteps(): Promise<ProcessStep[]> {
  const docs = await fetchFromSanity<SanityProcessStep[]>(processStepsQuery, fallbackProcessSteps);

  if (!hasSanityConfig) {
    return docs as ProcessStep[];
  }

  const normalized = (docs as SanityProcessStep[])
    .map(normalizeProcessStep)
    .filter((step): step is ProcessStep => Boolean(step))
    .sort((a, b) => a.stepNumber - b.stepNumber);

  return normalized.length > 0 ? normalized : fallbackProcessSteps;
}

export async function getFaqs(): Promise<FAQ[]> {
  const docs = await fetchFromSanity<SanityFaq[]>(faqsQuery, fallbackFaqs);

  if (!hasSanityConfig) {
    return docs as FAQ[];
  }

  const normalized = (docs as SanityFaq[])
    .map(normalizeFaq)
    .filter((faq): faq is FAQ => Boolean(faq));

  return normalized.length > 0 ? normalized : fallbackFaqs;
}

export async function getServiceDetails(): Promise<ServiceDetail[]> {
  const docs = await fetchFromSanity<ServiceDetail[]>(serviceDetailsQuery, fallbackServiceDetails);
  if (!hasSanityConfig) return docs;
  return Array.isArray(docs) && docs.length > 0 ? docs : fallbackServiceDetails;
}

export async function getServiceDetailBySlug(slug: string): Promise<ServiceDetail | null> {
  if (!hasSanityConfig || !sanityClient) {
    return fallbackServiceDetails.find((s) => s.slug === slug) ?? null;
  }
  const doc = await fetchFromSanity<ServiceDetail | null>(serviceDetailBySlugQuery, null, { slug });
  if (doc) return doc;
  return fallbackServiceDetails.find((s) => s.slug === slug) ?? null;
}

export async function getReviews(): Promise<Review[]> {
  const docs = await fetchFromSanity<Review[]>(reviewsQuery, fallbackReviews);
  if (!hasSanityConfig) return docs;
  return Array.isArray(docs) && docs.length > 0 ? docs : fallbackReviews;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const docs = await fetchFromSanity<BlogPost[]>(blogPostsQuery, fallbackBlogPosts);
  if (!hasSanityConfig) return docs;
  return Array.isArray(docs) && docs.length > 0 ? docs : fallbackBlogPosts;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!hasSanityConfig || !sanityClient) {
    return fallbackBlogPosts.find((post) => post.slug === slug) ?? null;
  }

  const doc = await fetchFromSanity<BlogPost | null>(blogPostBySlugQuery, null, { slug });
  if (doc) return doc;
  return fallbackBlogPosts.find((post) => post.slug === slug) ?? null;
}

type SanityHomeHero = {
  _id?: string;
  heroImage?: SanityImage;
};

const fallbackHomeHero: HomeHero = {
  id: "default-hero",
  heroImage: {
    src: "/projects/north-dallas-courtyard-residence/hero.jpg",
    alt: "Front elevation of a modern custom home in Dallas-Fort Worth",
    width: 1600,
    height: 1000,
  },
};

export async function getHomeHero(): Promise<HomeHero> {
  const doc = await fetchFromSanity<SanityHomeHero | null>(homeHeroQuery, null);

  if (!doc || !doc.heroImage?.url) {
    return fallbackHomeHero;
  }

  return {
    id: doc._id || "home-hero",
    heroImage: {
      src: doc.heroImage.url,
      alt: doc.heroImage.alt?.trim() || "Modern custom home in Dallas-Fort Worth",
      width: doc.heroImage.width ?? 1600,
      height: doc.heroImage.height ?? 1000,
    },
  };
}
