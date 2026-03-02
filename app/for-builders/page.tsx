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
import { getSiteUrl } from "@/lib/config/site";
import {
  createB2BDraftingServiceSchema,
  createBreadcrumbSchema,
  createFaqSchema,
} from "@/lib/seo/schema";

export function generateMetadata(): Metadata {
  const siteUrl = getSiteUrl();

  return {
    title: "Architectural Drafting Services Dallas Fort Worth | Outsourced Construction Documents",
    description:
      "Outsource permit-ready construction documents, custom home floor plans, 3D renders, and full CDs to a DFW-exclusive drafting partner. 5-7 day turnaround for Dallas-Fort Worth builders.",
    openGraph: {
      title: "Architectural Drafting Services Dallas Fort Worth | Outsourced Construction Documents",
      description:
        "Permit-ready custom home floor plans, 3D renders, and full construction documents for DFW builders. 5-7 day turnaround.",
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
    title: "DFW Permit Fluency",
    description:
      "We know the submission requirements for Dallas, Fort Worth, Frisco, Plano, and surrounding cities.",
  },
  {
    title: "Consistent Quality",
    description: "Every set follows the same QA checklist — consistent output across all your projects.",
  },
  {
    title: "Fast Turnaround",
    description: "Schematic sets in 5–7 days. Full CDs in 2–3 weeks depending on scope.",
  },
  {
    title: "Builder-Friendly Format",
    description: "Documents delivered in AutoCAD, Revit, or PDF — whatever your field team prefers.",
  },
  {
    title: "White-Label Ready",
    description: "All deliverables can be branded with your company title block and logo.",
  },
] as const;

/* ── FAQ ── */

const B2B_FAQS = [
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
      "Schematic sets are delivered in 5–7 business days. Full construction document packages take 2–3 weeks depending on complexity and coordination requirements.",
  },
  {
    id: "revisions",
    title: "How are revisions handled?",
    content:
      "Each project includes one round of revisions at the schematic phase and one at the CD phase. Additional revision rounds are available at a flat hourly rate agreed upfront.",
  },
  {
    id: "software",
    title: "What software do you use?",
    content:
      "We work primarily in AutoCAD and Revit. Files are delivered in your preferred format — DWG, RVT, or PDF. We can also adapt to Chief Architect if needed.",
  },
  {
    id: "white-label",
    title: "Can deliverables be white-labeled?",
    content:
      "Yes. All documents can use your company title block, logo, and branding. Your clients will never see our name on the drawings.",
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
              <article
                key={service.number}
                className="flex flex-col justify-between border border-line bg-surface p-6"
              >
                <div>
                  <p className="font-mono text-xs font-medium tracking-widest text-accent">
                    {service.number}
                  </p>
                  <h3 className="mt-2 type-heading text-ink">{service.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{service.summary}</p>
                </div>
                <ul className="mt-4 space-y-1" aria-label={`${service.title} deliverables`}>
                  {service.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-2 text-xs text-muted">
                      <span
                        className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent"
                        aria-hidden="true"
                      />
                      {d}
                    </li>
                  ))}
                </ul>
              </article>
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
            title="Common questions from builders"
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
