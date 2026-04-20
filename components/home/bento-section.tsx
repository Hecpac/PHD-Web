import { Container } from "@/components/layout/container";
import { BentoGrid, type BentoItem } from "@/components/ui/bento-grid";
import { SectionHeading } from "@/components/ui/section-heading";
import { Counter } from "@/components/ui/counter";

const bentoItems: BentoItem[] = [
  {
    id: "bento-design-build",
    eyebrow: "Single Contract",
    title: "Design-Build Delivery",
    description:
      "Design, engineering, and construction managed under one agreement. One team, one schedule, one point of accountability across DFW & North Texas.",
    span: "2x2",
    variant: "image",
    imageSrc: "/projects/duplex/kitchen-dining.jpg",
    imageAlt: "Open kitchen and dining with marble island in a modern duplex in Dallas",
  },
  {
    id: "bento-projects",
    eyebrow: "Track Record",
    // Integrated Counter component
    stat: <Counter value={60} suffix="+" />,
    statLabel: "Custom homes delivered across the region",
    title: "Built Portfolio",
    span: "1x1",
    variant: "accent",
  },
  {
    id: "bento-timeline",
    eyebrow: "Predictability",
    // Integrated Counter component
    stat: <Counter value={94} suffix="%" />,
    statLabel: "On-time completion rate",
    title: "Schedule Discipline",
    span: "1x1",
    variant: "surface",
  },
  {
    id: "bento-transparency",
    eyebrow: "Process",
    title: "Decision Gates at Every Phase",
    description:
      "Budget alignment, scope verification, and owner approval before advancing. No surprises, no ambiguity.",
    span: "2x1",
    variant: "image",
    imageSrc: "/projects/duplex/hero.jpg",
    imageAlt: "Modern duplex front elevation in East Dallas",
  },
  {
    id: "bento-quality",
    eyebrow: "Execution",
    title: "Milestone QA Inspections",
    description:
      "Third-party and internal quality checkpoints at foundation, framing, rough-in, and final walkthrough.",
    span: "1x1",
    variant: "surface",
  },
  {
    id: "bento-dfw",
    eyebrow: "Service Area",
    title: "DFW · North Texas",
    description:
      "Trade partners, code knowledge, and site practices calibrated across the Metroplex and North Texas — from downtown Dallas to Sherman and the outer corridor.",
    span: "1x1",
    variant: "image",
    imageSrc: "/projects/806-mango/rear-pool.jpg",
    imageAlt: "Rear exterior with pool of a modern home in Coppell, DFW",
  },
];

export function BentoSection() {
  return (
    <section id="bento" className="section-shell section-brand-wash-soft border-t border-line section-brand-divider">
      <Container swiss className="space-y-10">
        <SectionHeading
          eyebrow="Why Us"
          title="Engineered for precision, built across the region"
          description="A design-build practice structured around transparency, schedule control, and documented quality at every milestone."
        />
        <BentoGrid items={bentoItems} className="brand-red-outline border border-line" />
      </Container>
    </section>
  );
}
