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
    <section
      id="trust"
      className="section-shell border-t border-line"
      aria-label="Trust points"
    >
      <Container swiss className="space-y-8">
        <SectionHeading
          eyebrow="Trust"
          title="Confidence built through evidence, not claims"
          description="Our process is designed to reduce surprises and keep design quality intact during execution."
        />

        <ul className="grid gap-6 md:grid-cols-3" aria-label="Trust points">
          {trustPoints.map((item) => (
            <li key={item.title}>
              <article className="rounded-xl border border-line bg-surface p-6 shadow-[var(--shadow-card)]">
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{item.description}</p>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
