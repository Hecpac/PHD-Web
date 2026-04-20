import type { Metadata } from "next";

import { B2BContactForm } from "@/components/for-builders/b2b-contact-form";
import { B2BHero } from "@/components/for-builders/b2b-hero";
import { B2BProcess } from "@/components/for-builders/b2b-process";
import { B2BBespokeDesign } from "@/components/for-builders/b2b-bespoke-design";
import { BuilderProjectsShowcase } from "@/components/for-builders/builder-projects";
import { BuilderTrustBar } from "@/components/for-builders/builder-trust-bar";
import { Container } from "@/components/layout/container";
import { Accordion } from "@/components/ui/accordion";
import { JsonLd } from "@/components/ui/json-ld";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlareCard } from "@/components/ui/glare-card";
import { getSiteUrl } from "@/lib/config/site";
import {
  createB2BDraftingServiceSchema,
  createBreadcrumbSchema,
  createFaqSchema,
} from "@/lib/seo/schema";

export function generateMetadata(): Metadata {
  const siteUrl = getSiteUrl();

  return {
    title: "Architectural Drafting Services — DFW & North Texas | Outsourced Construction Documents",
    description:
      "Outsource permit-ready construction documents, custom home floor plans, and 3D renders to a regional drafting partner. 7-10 day turnaround for builders across Dallas-Fort Worth & North Texas.",
    keywords: [
      "B2B",
      "drafting services",
      "construction documents",
      "architects",
      "builders",
      "DFW",
      "North Texas",
    ],
    openGraph: {
      title: "Architectural Drafting Services — DFW & North Texas | Outsourced Construction Documents",
      description:
        "Permit-ready custom home floor plans, 3D renders, and construction documents for builders across DFW & North Texas. 7-10 day turnaround.",
    },
    twitter: {
      card: "summary_large_image",
      site: "@PHDhomes",
    },
    alternates: {
      canonical: `${siteUrl}/for-builders`,
    },
  };
}

/* ── B2B Services ── */

const B2B_SERVICES = [
  {
    number: "01",
    title: "Floor Plans & Construction Drawings",
    summary: "Dimensioned plans ready for permit and field use.",
    deliverables: ["Detailed floor plans", "Dimensioned layouts", "Room schedules"],
  },
  {
    number: "02",
    title: "3D Renders & Visualizations",
    summary: "Photorealistic renders for client presentations and marketing.",
    deliverables: ["Exterior renderings", "Interior perspectives", "Virtual walkthroughs"],
  },
  {
    number: "03",
    title: "Permit-Ready Documentation",
    summary: "Complete drawing sets formatted for your local jurisdiction.",
    deliverables: ["City-specific formatting", "Code compliance notes", "Submittal packages"],
  },
  {
    number: "04",
    title: "Structural Coordination",
    summary: "Coordination with structural engineers and foundation plans.",
    deliverables: ["Foundation plans", "Framing details", "Engineer coordination"],
  },
  {
    number: "05",
    title: "MEP Layouts",
    summary: "Mechanical, electrical, and plumbing coordination drawings.",
    deliverables: ["HVAC layouts", "Electrical plans", "Plumbing riser diagrams"],
  },
  {
    number: "06",
    title: "Elevations & Sections",
    summary: "Exterior elevations and building sections with material callouts.",
    deliverables: ["All-side elevations", "Building sections", "Material specifications"],
  },
] as const;

/* ── Value Props ── */

const VALUE_PROPS = [
  {
    title: "No Overhead",
    description: "Scale drafting capacity without hiring full-time staff or managing CAD licenses.",
  },
  {
    title: "Regional Permit Fluency",
    description:
      "We know the submission requirements for Dallas, Fort Worth, Frisco, Plano, Sherman, and other cities across DFW & North Texas.",
  },
  {
    title: "Consistent Quality",
    description: "Every set follows the same QA checklist — consistent output across all your projects.",
  },
  {
    title: "Fast Turnaround",
    description: "Schematic sets delivered in 7–10 business days.",
  },
  {
    title: "Builder-Friendly Format",
    description: "Plans delivered as printed 11×17 sets and PDF via email — ready for the field.",
  },
] as const;

/* ── FAQ ── */

const B2B_FAQS = [
  {
    id: "services",
    title: "What services do you provide?",
    content:
      "We offer custom home plans, detailed construction drawings, and photorealistic 3D visualizations. We also assist with material selections, design direction, and builder coordination.",
  },
  {
    id: "builders",
    title: "Do you work with builders?",
    content:
      "Yes, we regularly partner with builders as their design and drafting team, providing seamless support from concept to build-ready plans.",
  },
  {
    id: "design-decisions",
    title: "Can you help with design decisions?",
    content:
      "Absolutely. We guide clients through layout, materials, and overall design direction to ensure a cohesive and functional result.",
  },
  {
    id: "differentiator",
    title: "What makes you different?",
    content:
      "We combine design, drafting, and real construction experience, allowing us to create plans that are not only beautiful but also practical and buildable.",
  },
  {
    id: "pricing",
    title: "How is pricing structured?",
    content:
      "We price per project based on scope and square footage. Volume partners receive tiered pricing — the more homes per month, the lower the per-project cost. Request a quote for a custom rate card.",
  },
  {
    id: "turnaround",
    title: "What's the typical turnaround time?",
    content:
      "Schematic sets are delivered in 7–10 business days. We work at the client's pace — no phase moves forward until the current one is fully approved.",
  },
  {
    id: "revisions",
    title: "How are revisions handled?",
    content:
      "We work at the client's pace. We do not move forward to the next phase until the current one is fully approved, ensuring complete satisfaction at every step.",
  },
  {
    id: "minimum",
    title: "Is there a minimum commitment?",
    content:
      "No long-term contract required. You can start with a single project to evaluate quality and turnaround before committing to volume pricing.",
  },
];

const faqsForSchema = B2B_FAQS.map((f) => ({
  id: f.id,
  question: f.title,
  answer: f.content,
  category: "B2B",
}));

export default function ForBuildersPage() {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "For Builders", href: "/for-builders" },
  ]);
  const serviceSchema = createB2BDraftingServiceSchema();
  const faqSchema = createFaqSchema(faqsForSchema);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />

      {/* 1. Hero */}
      <B2BHero />

      {/* 2. Bespoke Design & Visualization */}
      <B2BBespokeDesign />

      {/* 3. Trust Bar */}
      <BuilderTrustBar />

      {/* 4. Services Grid */}
      <section id="b2b-services" className="section-shell border-t border-line">
        <Container swiss className="space-y-8">
          <SectionHeading
            eyebrow="Comprehensive Documentation"
            title="Execution rigor with verified quality checkpoints"
            description="Our operational side ensures your custom designs are perfectly translated into permit-ready construction documents for predictable execution."
          />

          <div className="grid gap-px border border-line md:grid-cols-2 xl:grid-cols-3">
            {B2B_SERVICES.map((service) => (
              <GlareCard key={service.number} className="h-full w-full">
                <article
                  className="group/card flex h-full flex-col justify-between border border-line bg-surface p-6 transition-colors duration-300 hover:bg-red-600"
                >
                  <div>
                    <p className="font-mono text-xs font-medium tracking-widest text-accent group-hover/card:text-red-100">
                      {service.number}
                    </p>
                    <h3 className="mt-2 type-heading text-ink group-hover/card:text-white">{service.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted group-hover/card:text-red-50">{service.summary}</p>
                  </div>
                  <ul className="mt-4 space-y-1" aria-label={`${service.title} deliverables`}>
                    {service.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-xs text-muted group-hover/card:text-white">
                        <span
                          className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent group-hover/card:bg-white"
                          aria-hidden="true"
                        />
                        {d}
                      </li>
                    ))}
                  </ul>
                </article>
              </GlareCard>
            ))}
          </div>
        </Container>
      </section>

      {/* 5. Builder Projects */}
      <BuilderProjectsShowcase />

      {/* 6. Process */}
      <B2BProcess />

      {/* 7. Why Outsource */}
      <section id="why-outsource" className="section-shell border-t border-line">
        <Container swiss className="space-y-8">
          <SectionHeading
            eyebrow="Why Outsource"
            title="Scale your output without scaling your team"
            description="Partnering with a dedicated drafting team means consistent quality, faster permits, and zero overhead."
          />

          <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3" aria-label="Value propositions">
            {VALUE_PROPS.map((item) => (
              <li key={item.title}>
                <article className="rounded-xl border border-line bg-surface p-6 shadow-[var(--shadow-card)]">
                  <h3 className="type-h3-compact">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{item.description}</p>
                </article>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 8. FAQ */}
      <section id="b2b-faq" className="section-shell border-t border-line">
        <Container swiss className="space-y-8">
          <SectionHeading
            eyebrow="FAQ"
            title="Common questions"
            description="Straight answers on pricing, turnaround, and how the partnership works."
          />

          <Accordion items={B2B_FAQS} />
        </Container>
      </section>

      {/* 9. Contact Form */}
      <B2BContactForm />
    </>
  );
}
