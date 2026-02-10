import Link from "next/link";

import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { DFW_CITIES } from "@/lib/types/content";

const featuredCities = DFW_CITIES.slice(0, 8);

export function DfwSection() {
  return (
    <section id="dfw" className="section-shell border-t border-line">
      <Container swiss className="space-y-8">
        <SectionHeading
          eyebrow="Service Area"
          title="Dallas-Fort Worth only"
          description="We focus exclusively on DFW projects to maintain local permitting fluency, trade relationships, and execution quality."
        />

        <div className="border border-line bg-surface p-6">
          <p className="text-sm leading-6 text-muted">
            Current focus includes {featuredCities.join(", ")}, and surrounding DFW neighborhoods.
          </p>
          <Link href="/dallas-fort-worth" className="mt-4 inline-flex text-sm font-bold uppercase tracking-[0.05em] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
            View full Dallas-Fort Worth service area
          </Link>
        </div>
      </Container>
    </section>
  );
}
