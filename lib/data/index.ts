import {
  fallbackBlogPosts,
  fallbackFaqs,
  fallbackProcessSteps,
  fallbackProcessStepsEs,
  fallbackProjects,
  fallbackReviews,
  fallbackServiceDetails,
  fallbackServices,
  fallbackServicesEs,
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
import { isServiceCity, SERVICE_AREA_CITIES } from "@/lib/types/content";

function getStateForCity(city: string): string | undefined {
  const cityLower = city.trim().toLowerCase();
  return SERVICE_AREA_CITIES.find((c) => c.name.toLowerCase() === cityLower)?.state;
}

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

  if (!title || !city || !isServiceCity(city)) {
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
      display: neighborhood
        ? `${neighborhood}, ${city}`
        : `${city}, ${getStateForCity(city) ?? "TX"}`,
    },
    style: doc.style?.trim() || "Modern",
    year: doc.year ?? 2026,
    summary: doc.summary?.trim() || "Custom home delivery across DFW & North Texas.",
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

type SanityServiceDetail = {
  _id?: string;
  slug?: string;
  title?: string;
  summary?: string;
  description?: string;
  deliverables?: string[];
  benefits?: string[];
  order?: number;
  icon?: string;
};

type SanityReview = {
  _id?: string;
  author?: string;
  location?: string;
  rating?: number;
  text?: string;
  projectType?: string;
  date?: string;
};

function normalizeServiceDetail(doc: SanityServiceDetail): ServiceDetail | null {
  const title = doc.title?.trim();
  const summary = doc.summary?.trim();
  const description = doc.description?.trim();
  const slug = doc.slug?.trim();

  if (!title || !summary || !description || !slug) {
    return null;
  }

  return {
    id: doc._id || `service-detail-${slug}`,
    slug,
    title,
    summary,
    description,
    deliverables: doc.deliverables?.filter(Boolean) ?? [],
    benefits: doc.benefits?.filter(Boolean) ?? [],
    order: doc.order ?? 99,
    icon: doc.icon || "Dot",
  };
}

function normalizeReview(doc: SanityReview): Review | null {
  const author = doc.author?.trim();
  const text = doc.text?.trim();

  if (!author || !text || typeof doc.rating !== "number") {
    return null;
  }

  return {
    id: doc._id || `review-${slugify(author)}`,
    author,
    location: doc.location?.trim() || "Dallas-Fort Worth, TX",
    rating: Math.min(5, Math.max(1, doc.rating)),
    text,
    projectType: doc.projectType?.trim() || "Custom Home",
    date: doc.date?.trim() || new Date().getFullYear().toString(),
  };
}

type SanityBlogPost = {
  _id?: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  category?: string;
  author?: string;
  date?: string;
  readTime?: string;
  content?: string;
  coverImage?: SanityImage;
  tags?: string[];
};

function normalizeBlogPost(doc: SanityBlogPost): BlogPost | null {
  const title = doc.title?.trim();
  const slug = doc.slug?.trim();
  const excerpt = doc.excerpt?.trim();

  if (!title || !slug || !excerpt) {
    return null;
  }

  return {
    id: doc._id || `blog-${slug}`,
    title,
    slug,
    excerpt,
    category: doc.category?.trim() || "General",
    author: doc.author?.trim() || "Premium Home Design",
    date: doc.date?.trim() || new Date().toISOString().split("T")[0],
    readTime: doc.readTime?.trim() || "5 min read",
    content: doc.content,
    coverImage: doc.coverImage?.url
      ? {
          src: doc.coverImage.url,
          alt: doc.coverImage.alt?.trim() || `${title} cover image`,
          width: doc.coverImage.width ?? 1200,
          height: doc.coverImage.height ?? 630,
        }
      : undefined,
    tags: doc.tags?.filter(Boolean),
  };
}

function sortBlogPostsByDateDesc(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort((left, right) => {
    const leftTime = Date.parse(left.date);
    const rightTime = Date.parse(right.date);
    const safeLeftTime = Number.isNaN(leftTime) ? 0 : leftTime;
    const safeRightTime = Number.isNaN(rightTime) ? 0 : rightTime;

    return safeRightTime - safeLeftTime;
  });
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

export async function getProjects(locale = "en"): Promise<Project[]> {
  const docs = await fetchFromSanity<SanityProject[]>(projectsQuery, fallbackProjects, { locale });

  if (!hasSanityConfig) {
    return docs as Project[];
  }

  const normalized = (docs as SanityProject[])
    .map(normalizeProject)
    .filter((project): project is Project => Boolean(project));

  return normalized.length > 0 ? normalized : fallbackProjects;
}

export async function getProjectBySlug(slug: string, locale = "en"): Promise<Project | null> {
  if (!hasSanityConfig || !sanityClient) {
    return fallbackProjects.find((project) => project.slug === slug) ?? null;
  }

  const doc = await fetchFromSanity<SanityProject | null>(projectBySlugQuery, null, { slug, locale });

  if (doc) {
    const normalized = normalizeProject(doc);
    if (normalized) {
      return normalized;
    }
  }

  return fallbackProjects.find((project) => project.slug === slug) ?? null;
}

export async function getFeaturedProjects(locale = "en"): Promise<Project[]> {
  const fallbackFeatured = fallbackProjects.filter((p) => p.isFeatured);
  const docs = await fetchFromSanity<SanityProject[]>(featuredProjectsWithHeroQuery, fallbackFeatured, { locale });

  if (!hasSanityConfig) {
    return docs as Project[];
  }

  const normalized = (docs as SanityProject[])
    .map(normalizeProject)
    .filter((project): project is Project => Boolean(project));

  return normalized.length > 0 ? normalized : fallbackFeatured;
}

export async function getServices(locale = "en"): Promise<Service[]> {
  const fb = locale === "es" ? fallbackServicesEs : fallbackServices;
  const docs = await fetchFromSanity<SanityService[]>(servicesQuery, fb, { locale });

  if (!hasSanityConfig) {
    return docs as Service[];
  }

  const normalized = (docs as SanityService[])
    .map(normalizeService)
    .filter((service): service is Service => Boolean(service))
    .sort((a, b) => a.order - b.order);

  return normalized.length > 0 ? normalized : fb;
}

export async function getProcessSteps(locale = "en"): Promise<ProcessStep[]> {
  const fb = locale === "es" ? fallbackProcessStepsEs : fallbackProcessSteps;
  const docs = await fetchFromSanity<SanityProcessStep[]>(processStepsQuery, fb, { locale });

  if (!hasSanityConfig) {
    return docs as ProcessStep[];
  }

  const normalized = (docs as SanityProcessStep[])
    .map(normalizeProcessStep)
    .filter((step): step is ProcessStep => Boolean(step))
    .sort((a, b) => a.stepNumber - b.stepNumber);

  return normalized.length > 0 ? normalized : fb;
}

export async function getFaqs(locale = "en"): Promise<FAQ[]> {
  const docs = await fetchFromSanity<SanityFaq[]>(faqsQuery, fallbackFaqs, { locale });

  if (!hasSanityConfig) {
    return docs as FAQ[];
  }

  const normalized = (docs as SanityFaq[])
    .map(normalizeFaq)
    .filter((faq): faq is FAQ => Boolean(faq));

  return normalized.length > 0 ? normalized : fallbackFaqs;
}

export async function getServiceDetails(locale = "en"): Promise<ServiceDetail[]> {
  const docs = await fetchFromSanity<SanityServiceDetail[]>(serviceDetailsQuery, [], { locale });
  if (!hasSanityConfig) return fallbackServiceDetails;

  const normalized = (docs as SanityServiceDetail[])
    .map(normalizeServiceDetail)
    .filter((s): s is ServiceDetail => Boolean(s));

  return normalized.length > 0 ? normalized : fallbackServiceDetails;
}

export async function getServiceDetailBySlug(slug: string, locale = "en"): Promise<ServiceDetail | null> {
  if (!hasSanityConfig || !sanityClient) {
    return fallbackServiceDetails.find((s) => s.slug === slug) ?? null;
  }
  const doc = await fetchFromSanity<SanityServiceDetail | null>(serviceDetailBySlugQuery, null, { slug, locale });
  if (doc) {
    const normalized = normalizeServiceDetail(doc);
    if (normalized) return normalized;
  }
  return fallbackServiceDetails.find((s) => s.slug === slug) ?? null;
}

export async function getReviews(locale = "en"): Promise<Review[]> {
  const docs = await fetchFromSanity<SanityReview[]>(reviewsQuery, [], { locale });
  if (!hasSanityConfig) return fallbackReviews;

  const normalized = (docs as SanityReview[])
    .map(normalizeReview)
    .filter((r): r is Review => Boolean(r));

  return normalized.length > 0 ? normalized : fallbackReviews;
}

export async function getBlogPosts(locale = "en"): Promise<BlogPost[]> {
  const docs = await fetchFromSanity<SanityBlogPost[]>(blogPostsQuery, [], { locale });
  if (!hasSanityConfig) return sortBlogPostsByDateDesc(fallbackBlogPosts);

  const normalized = (docs as SanityBlogPost[])
    .map(normalizeBlogPost)
    .filter((p): p is BlogPost => Boolean(p));

  return normalized.length > 0
    ? sortBlogPostsByDateDesc(normalized)
    : sortBlogPostsByDateDesc(fallbackBlogPosts);
}

export async function getBlogPostBySlug(slug: string, locale = "en"): Promise<BlogPost | null> {
  if (!hasSanityConfig || !sanityClient) {
    return fallbackBlogPosts.find((post) => post.slug === slug) ?? null;
  }

  const doc = await fetchFromSanity<SanityBlogPost | null>(blogPostBySlugQuery, null, { slug, locale });
  if (doc) {
    const normalized = normalizeBlogPost(doc);
    if (normalized) return normalized;
  }
  return fallbackBlogPosts.find((post) => post.slug === slug) ?? null;
}

type SanityHomeHero = {
  _id?: string;
  heroImage?: SanityImage;
};

const fallbackHomeHero: HomeHero = {
  id: "default-hero",
  heroImage: {
    src: "/hero-home.jpeg",
    alt: "Modern luxury kitchen with marble island and pendant lighting in a DFW custom home",
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
