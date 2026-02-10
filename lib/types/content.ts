export const DFW_CITIES = [
  "Dallas",
  "Fort Worth",
  "Plano",
  "Frisco",
  "McKinney",
  "Allen",
  "Irving",
  "Arlington",
  "Southlake",
  "Grapevine",
  "Colleyville",
  "Highland Park",
  "University Park",
  "Prosper",
  "Coppell",
  "Flower Mound",
] as const;

export type DfwCity = (typeof DFW_CITIES)[number];

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

export function isDfwCity(city: string): city is DfwCity {
  const cityLower = city.trim().toLowerCase();
  return DFW_CITIES.some((candidate) => candidate.toLowerCase() === cityLower);
}
