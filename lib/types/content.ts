/**
 * Cities within ~80 mi of Dallas where we accept project intake.
 * Spans the DFW Metroplex, North Texas, and Southern Oklahoma.
 * Single source of truth — used by forms, validation, and SEO schema.
 */
export const SERVICE_AREA_CITIES = [
  // DFW core
  { name: "Dallas", state: "TX" },
  { name: "Fort Worth", state: "TX" },
  { name: "Plano", state: "TX" },
  { name: "Frisco", state: "TX" },
  { name: "McKinney", state: "TX" },
  { name: "Allen", state: "TX" },
  { name: "Irving", state: "TX" },
  { name: "Arlington", state: "TX" },
  { name: "Southlake", state: "TX" },
  { name: "Grapevine", state: "TX" },
  { name: "Colleyville", state: "TX" },
  { name: "Highland Park", state: "TX" },
  { name: "University Park", state: "TX" },
  { name: "Prosper", state: "TX" },
  { name: "Coppell", state: "TX" },
  { name: "Flower Mound", state: "TX" },
  // DFW extended metro
  { name: "Denton", state: "TX" },
  { name: "Lewisville", state: "TX" },
  { name: "Carrollton", state: "TX" },
  { name: "Richardson", state: "TX" },
  { name: "Garland", state: "TX" },
  { name: "Keller", state: "TX" },
  { name: "Mansfield", state: "TX" },
  { name: "Rockwall", state: "TX" },
  { name: "Little Elm", state: "TX" },
  { name: "The Colony", state: "TX" },
  // North Texas (~40–80 mi)
  { name: "Sherman", state: "TX" },
  { name: "Denison", state: "TX" },
  { name: "Gainesville", state: "TX" },
  { name: "Greenville", state: "TX" },
  { name: "Waxahachie", state: "TX" },
  { name: "Weatherford", state: "TX" },
  { name: "Granbury", state: "TX" },
  // Southern Oklahoma border (~80–100 mi)
  { name: "Durant", state: "OK" },
  { name: "Ardmore", state: "OK" },
] as const;

export type ServiceAreaCity = (typeof SERVICE_AREA_CITIES)[number];
export type ServiceCityName = ServiceAreaCity["name"];

export type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type ProjectSpecs = {
  sqft?: number;
  beds?: number;
  baths?: number;
  stories?: number;
};

export type Project = {
  id: string;
  title: string;
  slug: string;
  location: {
    city: string;
    neighborhood?: string;
    display: string;
  };
  style: string;
  year: number;
  summary: string;
  description?: string;
  gallery: GalleryImage[];
  highlights: string[];
  specs?: ProjectSpecs;
  isFeatured: boolean;
  featuredOrder?: number;
  heroImage?: GalleryImage;
  tags?: string[];
};

export type Service = {
  id: string;
  title: string;
  summary: string;
  deliverables: string[];
  order: number;
  icon: string;
};

export type ProcessStep = {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  deliverables: string[];
  decisionGate?: string;
};

export type FAQ = {
  id: string;
  question: string;
  answer: string;
  category: string;
};

export type ServiceDetail = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  deliverables: string[];
  benefits: string[];
  order: number;
  icon: string;
};

export type Review = {
  id: string;
  author: string;
  location: string;
  rating: number;
  text: string;
  projectType: string;
  date: string;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  content?: string;
  coverImage?: GalleryImage;
  tags?: string[];
};

export type HomeHero = {
  id: string;
  heroImage?: GalleryImage;
};

export function isServiceCity(city: string): city is ServiceCityName {
  const cityLower = city.trim().toLowerCase();
  return SERVICE_AREA_CITIES.some(
    (candidate) => candidate.name.toLowerCase() === cityLower,
  );
}
