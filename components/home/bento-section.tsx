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
      "Architecture, engineering, and construction managed under one agreement. One team, one schedule, one point of accountability across the DFW Metroplex.",
    span: "2x2",
    variant: "image",
    imageSrc: "/projects/fort-worth-bluff-house/kitchen.jpg",
    imageAlt: "Modern kitchen and living layout in a Dallas-Fort Worth custom home",
  },
  {
    id: "bento-projects",
    eyebrow: "Track Record",
    // Integrated Counter component
    stat: <Counter value={60} suffix="+" />,
    statLabel: "Custom homes delivered in DFW",
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
    variant: "default",
  },
  {
    id: "bento-quality",
    eyebrow: "Execution",
    title: "Milestone QA Inspections",
    description:
      "Third-party and internal quality checkpoints at foundation, framing, rough-in, and final walkthrough.",
    span: "1x2",
    variant: "surface",
  },
  {
    id: "bento-dfw",
    eyebrow: "Service Area",
    title: "Dallas–Fort Worth Exclusively",
    description:
      "Every trade partner, code requirement, and site condition is calibrated for DFW. We don't spread thin outside the Metroplex.",
    span: "1x1",
    variant: "default",
  },
];

export function BentoSection() {
  return (
    <section id="bento" className="section-shell section-brand-wash-soft border-t border-line section-brand-divider">
      <Container swiss className="space-y-10">
        <SectionHeading
          eyebrow="Why Us"
          title="Engineered for precision, built for DFW"
          description="A design-build practice structured around transparency, schedule control, and documented quality at every milestone."
        />
        <BentoGrid items={bentoItems} className="brand-red-outline border border-line" />
      </Container>
    </section>
  );
}
