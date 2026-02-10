import { groq } from "next-sanity";

export const projectsQuery = groq`
  *[_type == "project"] | order(year desc) {
    _id,
    title,
    "slug": slug.current,
    location {
      city,
      neighborhood
    },
    style,
    year,
    summary,
    highlights,
    specs,
    isFeatured,
    gallery[] {
      "url": asset->url,
      alt,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height
    }
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    location {
      city,
      neighborhood
    },
    style,
    year,
    summary,
    highlights,
    specs,
    isFeatured,
    gallery[] {
      "url": asset->url,
      alt,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height
    }
  }
`;

export const featuredProjectsQuery = groq`
  *[_type == "project" && isFeatured == true] | order(featuredOrder asc) [0...6] {
    _id,
    title,
    "slug": slug.current,
    location {
      city,
      neighborhood
    },
    style,
    year,
    summary,
    description,
    highlights,
    specs,
    isFeatured,
    featuredOrder,
    tags,
    "displayLocation": select(
      defined(location.neighborhood) => location.neighborhood + ", " + location.city,
      location.city + ", DFW Metroplex"
    ),
    "heroImage": heroImage {
      "url": asset->url,
      alt,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height
    },
    gallery[] {
      "url": asset->url,
      alt,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height
    }
  }
`;

export const featuredProjectsWithHeroQuery = groq`
  *[_type == "project" && isFeatured == true] | order(featuredOrder asc) [0...6] {
    ...,
    "displayLocation": select(
      defined(location.neighborhood) => location.neighborhood + ", " + location.city,
      location.city + ", DFW Metroplex"
    ),
    "heroImage": heroImage {
      "url": asset->url,
      alt,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height
    },
    gallery[] {
      "url": asset->url,
      alt,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height
    }
  }
`;

export const projectBySlugDetailQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    location {
      city,
      neighborhood
    },
    style,
    year,
    summary,
    description,
    highlights,
    specs,
    isFeatured,
    featuredOrder,
    tags,
    "heroImage": heroImage {
      "url": asset->url,
      alt,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height
    },
    gallery[] {
      "url": asset->url,
      alt,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height
    }
  }
`;

export const servicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    summary,
    deliverables,
    order,
    icon
  }
`;

export const processStepsQuery = groq`
  *[_type == "processStep"] | order(stepNumber asc) {
    _id,
    stepNumber,
    title,
    description,
    deliverables,
    decisionGate
  }
`;

export const faqsQuery = groq`
  *[_type == "faq"] | order(category asc, question asc) {
    _id,
    question,
    answer,
    category
  }
`;

export const serviceDetailsQuery = groq`
  *[_type == "serviceDetail"] | order(order asc) {
    _id,
    "slug": slug.current,
    title,
    summary,
    description,
    deliverables,
    benefits,
    order,
    icon
  }
`;

export const serviceDetailBySlugQuery = groq`
  *[_type == "serviceDetail" && slug.current == $slug][0] {
    _id,
    "slug": slug.current,
    title,
    summary,
    description,
    deliverables,
    benefits,
    order,
    icon
  }
`;

export const reviewsQuery = groq`
  *[_type == "review"] | order(date desc) {
    _id,
    author,
    location,
    rating,
    text,
    projectType,
    date
  }
`;

export const blogPostsQuery = groq`
  *[_type == "blogPost"] | order(date desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    category,
    author,
    date,
    readTime
  }
`;

export const blogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    category,
    author,
    date,
    readTime,
    content,
    "coverImage": coverImage {
      "url": asset->url,
      alt,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height
    },
    tags
  }
`;
