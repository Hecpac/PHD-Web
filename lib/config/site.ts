export const siteConfig = {
  name: "DFW Modern Design-Build",
  shortName: "DFW Design-Build",
  description:
    "Custom modern homes in Dallas-Fort Worth with an architecture-first, design-build process.",
  serviceArea: "Dallas-Fort Worth Metroplex",
};

export type NavItem = {
  href: string;
  label: string;
  children?: readonly { href: string; label: string }[];
};

export const siteNavigation: readonly NavItem[] = [
  { href: "/about", label: "About" },
  {
    href: "/services",
    label: "Services",
    children: [
      { href: "/services/architectural-design", label: "Architectural Design" },
      { href: "/services/interior-design", label: "Interior Design & Planning" },
      { href: "/services/consulting", label: "Consulting Services" },
      { href: "/services/project-management", label: "Project Management" },
      { href: "/services/landscape-architecture", label: "Landscape Architecture" },
      { href: "/services/3d-rendering", label: "3D Rendering Visualization" },
      { href: "/services/feasibility-studies", label: "Feasibility Studies" },
    ],
  },
  { href: "/projects", label: "Projects" },
  { href: "/reviews", label: "Reviews" },
  { href: "/blogs", label: "Blogs" },
  { href: "/contact", label: "Contact" },
] as const;

const DEFAULT_SITE_URL = "http://localhost:3000";
const DEFAULT_SCHEDULE_URL =
  "https://cal.com/dfw-modern-design-build/consultation";
const DEFAULT_PHONE_E164 = "+14695550101";

export function getSiteUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!envUrl) {
    return DEFAULT_SITE_URL;
  }

  return envUrl.endsWith("/") ? envUrl.slice(0, -1) : envUrl;
}

export type CtaConfig = {
  scheduleUrl: string;
  phoneE164: string;
  phoneDisplay: string;
  phoneHref: string;
};

function formatUsPhone(phoneE164: string): string {
  const digits = phoneE164.replace(/\D/g, "");

  if (digits.length === 11 && digits.startsWith("1")) {
    return `(${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 11)}`;
  }

  return phoneE164;
}

export function getCtaConfig(): CtaConfig {
  const scheduleUrl = process.env.NEXT_PUBLIC_SCHEDULE_URL?.trim() || DEFAULT_SCHEDULE_URL;
  const rawPhone = process.env.NEXT_PUBLIC_PHONE_E164?.trim() || DEFAULT_PHONE_E164;
  const phoneE164 = rawPhone.startsWith("+") ? rawPhone : `+${rawPhone.replace(/\D/g, "")}`;

  return {
    scheduleUrl,
    phoneE164,
    phoneDisplay: formatUsPhone(phoneE164),
    phoneHref: `tel:${phoneE164}`,
  };
}
