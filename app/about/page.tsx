import type { Metadata } from "next";
import Image from "next/image";

import { Container } from "@/components/layout/container";
import { JsonLd } from "@/components/ui/json-ld";
import { SectionHeading } from "@/components/ui/section-heading";
import { createBreadcrumbSchema } from "@/lib/seo/schema";
import { getSiteUrl } from "@/lib/config/site";

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = getSiteUrl();

  return {
    title: "About | Premium Home Design",
    description:
      "All-in-one residential design studio founded by a husband-and-wife team with 10+ years in drafting, interior design, construction coordination, and custom cabinetry across DFW, North Texas, and Southern Oklahoma.",
    keywords: [
      "about",
      "Premium Home Design",
      "husband and wife design studio",
      "all-in-one residential design",
      "custom home design",
      "interior design",
      "custom cabinetry",
      "Dallas-Fort Worth",
      "North Texas",
      "Southern Oklahoma",
    ],
    openGraph: {
      title: "About | Premium Home Design",
      description:
        "All-in-one residential design studio founded by a husband-and-wife team with 10+ years in drafting, interior design, construction coordination, and custom cabinetry across DFW, North Texas, and Southern Oklahoma.",
    },
    twitter: {
      card: "summary_large_image",
      site: "@PHDhomes",
    },
    alternates: {
      canonical: `${siteUrl}/about`,
    },
  };
}

const principles = [
  {
    title: "Seamless process",
    description:
      "One team, one timeline, one direction. No handoffs between designer, builder, and cabinetmaker — and no gaps where details fall through.",
  },
  {
    title: "Cohesive design vision",
    description:
      "Every drawing, finish, and cabinet is coordinated against the same design intent, so the home reads as one considered space rather than a patchwork of vendors.",
  },
  {
    title: "Tailored to each client",
    description:
      "We don't repeat floor plans or reuse spec packages. Every project is shaped around the family who will live in it — the way they move, cook, host, and rest.",
  },
];

const differentiators = [
  {
    stat: "835+",
    label: "Custom homes delivered",
    detail: "Across Dallas, Fort Worth, Frisco, Southlake, Prosper, and Highland Park.",
  },
  {
    stat: "94%",
    label: "On-schedule completion",
    detail: "Driven by critical-path scheduling and proactive trade coordination.",
  },
  {
    stat: "4",
    label: "Decision gates per project",
    detail: "Structured approval checkpoints that prevent budget surprises and scope drift.",
  },
  {
    stat: "1",
    label: "Point of contact",
    detail: "A dedicated project manager from preconstruction through warranty.",
  },
];

const values = [
  {
    title: "Everything under one roof",
    description:
      "Drafting, floor plans, interior design, construction coordination, and custom cabinetry all live on the same team. You never have to translate intent across vendors or chase accountability when something doesn't match the drawings.",
  },
  {
    title: "A design vision that stays intact",
    description:
      "Because the same people design the space and coordinate its construction, decisions made on paper show up in the finished home. Nothing gets value-engineered into something it was never meant to be.",
  },
  {
    title: "Efficient from concept to completion",
    description:
      "Fewer handoffs means fewer delays. Our integrated approach compresses the number of meetings, clarifications, and rework loops that usually stretch residential projects past their deadline.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
        ])}
      />

      {/* Hero section */}
      <section className="section-shell" aria-labelledby="about-heading">
        <Container swiss className="space-y-8">
          <SectionHeading
            as="h1"
            titleId="about-heading"
            eyebrow="About"
            title="A true all-in-one studio for residential design and construction"
            description="From drafting and floor plans to interior design, construction coordination, and custom cabinetry — every detail is handled by our team, in one place. Our integrated approach eliminates the need to juggle multiple vendors, allowing for a seamless process, a cohesive design vision, and efficient execution from concept to completion."
          />

          <div className="grid gap-4 md:grid-cols-3">
            {principles.map((principle) => (
              <article key={principle.title} className="border border-line bg-surface p-6">
                <h2 className="text-base font-bold text-ink">{principle.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted">{principle.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Numbers section */}
      <section className="section-shell border-t border-line section-bone">
        <Container swiss className="space-y-8">
          <SectionHeading
            as="h2"
            eyebrow="Track Record"
            title="Numbers from the field"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {differentiators.map((item) => (
              <div key={item.label} className="space-y-2">
                <p className="text-5xl font-bold tabular-nums text-accent">{item.stat}</p>
                <h3 className="type-h3-compact text-ink">{item.label}</h3>
                <p className="text-sm leading-6 text-muted">{item.detail}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Values section */}
      <section className="section-shell border-t border-line">
        <Container swiss className="space-y-8">
          <SectionHeading
            as="h2"
            eyebrow="How We Think"
            title="What sets us apart across the region"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {values.map((value) => (
              <article key={value.title} className="border border-line bg-surface p-6">
                <h3 className="type-h3-compact text-ink">{value.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{value.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Our Story section */}
      <section
        className="section-shell border-t border-line section-bone"
        aria-labelledby="our-story-heading"
      >
        <Container swiss className="space-y-10">
          <SectionHeading
            as="h2"
            titleId="our-story-heading"
            eyebrow="Our Story"
            title="Founded by a husband-and-wife team with 10+ years in residential design and construction"
          />
          <div className="grid gap-10 md:grid-cols-[minmax(0,460px)_1fr] md:items-center">
            <div className="mx-auto w-full max-w-[460px] overflow-hidden border border-line bg-surface md:mx-0">
              <Image
                src="/about/founders.jpg"
                alt="Founders of Premium Home Design reviewing architectural plans on site"
                width={735}
                height={1316}
                sizes="(min-width: 768px) 460px, min(100vw, 460px)"
                className="h-auto w-full"
              />
            </div>
            <div className="space-y-6">
              <p className="type-subhead max-w-prose text-muted">
                At Premium Home Design, we provide a true all-in-one experience for residential projects.
              </p>
              <p className="max-w-prose text-base leading-7 text-muted">
                From drafting and floor plans to interior design, construction coordination, and custom cabinetry design, every detail is handled by our team — all in one place.
              </p>
              <p className="max-w-prose text-base leading-7 text-muted">
                Our integrated approach eliminates the need to work with multiple vendors, allowing for a seamless process, a cohesive design vision, and efficient execution from concept to completion.
              </p>
              <p className="max-w-prose text-base leading-7 text-muted">
                Founded by a husband-and-wife team with over 10 years of experience in residential design and construction, we are committed to delivering thoughtful, well-executed spaces tailored to each client.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
