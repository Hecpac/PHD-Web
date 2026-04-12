import { getCtaConfig, getSiteUrl, siteConfig } from "@/lib/config/site";
import {
  SERVICE_AREA_CITIES,
  type BlogPost,
  type FAQ,
  type ProcessStep,
  type Project,
  type Review,
  type ServiceDetail,
} from "@/lib/types/content";

const STATE_NAME: Record<string, string> = {
  TX: "Texas",
  OK: "Oklahoma",
};

/** Schema.org Place[] for areaServed — explicit cities + parent states. */
function buildAreaServed() {
  const cities = SERVICE_AREA_CITIES.map((c) => ({
    "@type": "City" as const,
    name: c.name,
    containedInPlace: {
      "@type": "State" as const,
      name: STATE_NAME[c.state] ?? c.state,
    },
  }));

  const states = Array.from(new Set(SERVICE_AREA_CITIES.map((c) => c.state))).map((code) => ({
    "@type": "State" as const,
    name: STATE_NAME[code] ?? code,
  }));

  return [...states, ...cities];
}

export function createLocalBusinessSchema(reviews?: Review[]) {
  const siteUrl = getSiteUrl();
  const { phoneE164 } = getCtaConfig();

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteUrl,
    telephone: phoneE164,
    email: siteConfig.contactEmail,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 32.978,
      longitude: -97.0319,
    },
    areaServed: [
      {
        "@type": "GeoCircle",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: 32.7767,
          longitude: -96.797,
        },
        // ~80 miles — covers DFW Metroplex, North Texas, and Southern Oklahoma border.
        geoRadius: "130000",
      },
      ...buildAreaServed(),
    ],
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 32.7767,
        longitude: -96.797,
      },
      geoRadius: "130000",
    },
    priceRange: "$$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    sameAs: siteConfig.socialLinks.map((social) => social.href),
  };

  if (reviews && reviews.length > 0) {
    const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: avg.toFixed(1),
      reviewCount: String(reviews.length),
    };
  }

  return schema;
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
    ...(project.year && { datePosted: `${project.year}-01-01` }),
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
      areaServed: buildAreaServed(),
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
    dateModified: post.date,
    ...(post.coverImage && {
      image: {
        "@type": "ImageObject",
        url: `${siteUrl}${post.coverImage.src}`,
      },
    }),
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
    description: `Articles on design, construction, budgeting, and the design-build process for custom homes in Dallas–Fort Worth.`,
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

export function createHowToSchema(steps: ProcessStep[]) {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Build a Custom Home in DFW, North Texas & Southern Oklahoma",
    description:
      "A stage-based design-build process with decision gates for custom home projects across Dallas-Fort Worth, North Texas, and Southern Oklahoma.",
    url: `${siteUrl}/process`,
    provider: {
      "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
      name: siteConfig.name,
      url: siteUrl,
    },
    step: steps.map((step) => ({
      "@type": "HowToStep",
      position: step.stepNumber,
      name: step.title,
      text: step.description,
      itemListElement: step.deliverables.map((d) => ({
        "@type": "HowToDirection",
        text: d,
      })),
    })),
  };
}

export function createServiceSchema(service: ServiceDetail) {
  const siteUrl = getSiteUrl();
  const { phoneE164 } = getCtaConfig();

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.summary,
    url: `${siteUrl}/services/${service.slug}`,
    provider: {
      "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
      name: siteConfig.name,
      url: siteUrl,
      telephone: phoneE164,
      areaServed: buildAreaServed(),
    },
    areaServed: buildAreaServed(),
    serviceType: service.title,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.title} Deliverables`,
      itemListElement: service.deliverables.map((d) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: d,
        },
      })),
    },
  };
}

export function createB2BDraftingServiceSchema() {
  const siteUrl = getSiteUrl();
  const { phoneE164 } = getCtaConfig();

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Outsourced Architectural Drafting & Construction Documents for North Texas & Oklahoma Builders",
    description:
      "Permit-ready custom home floor plans, 3D renders, and full construction document packages with 5-7 day turnaround for residential builders across Dallas-Fort Worth, North Texas, and Southern Oklahoma.",
    url: `${siteUrl}/for-builders`,
    provider: {
      "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
      name: siteConfig.name,
      url: siteUrl,
      telephone: phoneE164,
      areaServed: buildAreaServed(),
    },
    areaServed: buildAreaServed(),
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Residential builders and general contractors",
    },
    serviceType: "Architectural Drafting",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "B2B Drafting Services",
      itemListElement: [
        "Floor Plans & Construction Drawings",
        "3D Renders & Visualizations",
        "Permit-Ready Documentation",
        "Structural Coordination",
        "MEP Layouts",
        "Elevations & Sections",
      ].map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name },
      })),
    },
  };
}

export function createReviewPageSchema(reviews: Review[]) {
  const siteUrl = getSiteUrl();
  const { phoneE164 } = getCtaConfig();
  const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    name: siteConfig.name,
    url: siteUrl,
    telephone: phoneE164,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dallas",
      addressRegion: "TX",
      addressCountry: "US",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: avg.toFixed(1),
      reviewCount: String(reviews.length),
      bestRating: "5",
      worstRating: "1",
    },
    review: reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      reviewRating: {
        "@type": "Rating",
        ratingValue: String(r.rating),
        bestRating: "5",
        worstRating: "1",
      },
      reviewBody: r.text,
      datePublished: r.date,
    })),
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
