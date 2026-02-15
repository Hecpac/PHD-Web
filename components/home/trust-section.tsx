import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";

const trustPoints = [
  {
    title: "Documented Decision Gates",
    description: "Key approvals are explicit at every stage, from concept alignment to release-to-build.",
  },
  {
    title: "Builder + Design Coordination",
    description: "Architecture intent and construction realities are coordinated before field execution.",
  },
  {
    title: "Transparent Owner Updates",
    description: "Progress, issues, and next decisions are communicated in plain language and on cadence.",
  },
];

export function TrustSection() {
  return (
    <section id="trust" className="section-shell section-shell-tight section-brand-wash-soft border-t border-line section-brand-divider">
      <Container swiss className="space-y-8">
        <SectionHeading
          eyebrow="Trust"
          title="Confidence built through evidence, not claims"
          description="Our process is designed to reduce surprises and keep design quality intact during execution."
        />

        <div className="brand-red-outline grid gap-px border border-line md:grid-cols-3">
          {trustPoints.map((item) => (
            <article key={item.title} className="brand-red-outline brand-red-surface rounded-xl border border-line bg-surface p-6">
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{item.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
