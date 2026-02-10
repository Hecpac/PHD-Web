import { getSiteUrl, siteConfig } from "@/lib/config/site";
import type { BlogPost, FAQ, Project } from "@/lib/types/content";

export function createLocalBusinessSchema() {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteUrl,
    telephone: process.env.NEXT_PUBLIC_PHONE_E164 || "+14695550101",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dallas",
      addressRegion: "TX",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 32.7767,
      longitude: -96.797,
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 32.7767,
        longitude: -96.797,
      },
      geoRadius: "80000",
    },
    serviceArea: {
      "@type": "AdministrativeArea",
      name: "Dallas-Fort Worth Metroplex",
    },
    priceRange: "$$$",
    sameAs: [],
  };
}

export function createWebSiteSchema() {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteUrl,
    description: siteConfig.description,
    inLanguage: "en-US",
  };
}

export function createBreadcrumbSchema(
  items: { name: string; href: string }[],
) {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.href}`,
    })),
  };
}

export function createFaqSchema(faqs: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function createImageGallerySchema(projects: Project[]) {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: `Custom Home Projects – ${siteConfig.serviceArea}`,
    description: `Featured custom home projects by ${siteConfig.name} across the Dallas–Fort Worth Metroplex.`,
    url: `${siteUrl}/projects`,
    associatedMedia: projects.map((project) => {
      const image = project.gallery[0];
      return {
        "@type": "ImageObject",
        name: project.title,
        description: project.summary,
        contentUrl: image ? `${siteUrl}${image.src}` : undefined,
        thumbnailUrl: image ? `${siteUrl}${image.src}` : undefined,
        width: image?.width,
        height: image?.height,
        contentLocation: {
          "@type": "Place",
          name: project.location.display,
          address: {
            "@type": "PostalAddress",
            addressLocality: project.location.city,
            addressRegion: "TX",
            addressCountry: "US",
          },
        },
      };
    }),
  };
}

export function createProjectSchema(project: Project) {
  const siteUrl = getSiteUrl();
  const image = project.heroImage ?? project.gallery[0];

  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: project.title,
    description: project.summary,
    url: `${siteUrl}/projects/${project.slug}`,
    image: image ? `${siteUrl}${image.src}` : undefined,
    datePosted: `${project.year}-01-01`,
    ...(project.specs?.sqft && {
      floorSize: {
        "@type": "QuantitativeValue",
        value: project.specs.sqft,
        unitCode: "FTK",
        unitText: "sq ft",
      },
    }),
    ...(project.specs?.beds && {
      numberOfRooms: project.specs.beds,
    }),
    ...(project.specs?.baths && {
      numberOfBathroomsTotal: project.specs.baths,
    }),
    location: {
      "@type": "Place",
      name: project.location.display,
      address: {
        "@type": "PostalAddress",
        addressLocality: project.location.city,
        addressRegion: "TX",
        addressCountry: "US",
      },
    },
    provider: {
      "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
      name: siteConfig.name,
      url: siteUrl,
      areaServed: {
        "@type": "AdministrativeArea",
        name: "Dallas-Fort Worth Metroplex",
      },
    },
  };
}

export function createProjectPageBreadcrumbSchema(project: Project) {
  return createBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: project.title, href: `/projects/${project.slug}` },
  ]);
}

export function createFeaturedProjectsCollectionSchema(projects: Project[]) {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Featured Custom Homes – Dallas–Fort Worth`,
    description: `A curated collection of custom home projects by ${siteConfig.name} in the Dallas–Fort Worth Metroplex.`,
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => {
      const image = project.gallery[0];
      return {
        "@type": "ListItem",
        position: index + 1,
        name: project.title,
        url: `${siteUrl}/projects/${project.slug}`,
        image: image ? `${siteUrl}${image.src}` : undefined,
      };
    }),
  };
}

export function createBlogPostSchema(post: BlogPost) {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Organization",
      name: post.author || siteConfig.name,
    },
    publisher: {
      "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
      name: siteConfig.name,
      url: siteUrl,
    },
    datePublished: post.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blogs/${post.slug}`,
    },
    url: `${siteUrl}/blogs/${post.slug}`,
    inLanguage: "en-US",
    about: {
      "@type": "Thing",
      name: `Custom Home Building in Dallas–Fort Worth`,
    },
  };
}

export function createBlogCollectionSchema(posts: BlogPost[]) {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Blog – ${siteConfig.name}`,
    description: `Articles on architecture, construction, budgeting, and the design-build process for custom homes in Dallas–Fort Worth.`,
    url: `${siteUrl}/blogs`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: posts.length,
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: post.title,
        url: `${siteUrl}/blogs/${post.slug}`,
      })),
    },
    publisher: {
      "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
      name: siteConfig.name,
      url: siteUrl,
    },
  };
}

export function createBlogBreadcrumbSchema(post?: BlogPost) {
  const items = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blogs" },
  ];

  if (post) {
    items.push({ name: post.title, href: `/blogs/${post.slug}` });
  }

  return createBreadcrumbSchema(items);
}
