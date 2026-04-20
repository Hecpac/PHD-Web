"use client";

import Link from "next/link";

import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SERVICE_AREA_CITIES } from "@/lib/types/content";

const featuredCities = SERVICE_AREA_CITIES.slice(0, 8).map((c) => c.name);

/** Inline SVG pattern: topographic contour circles */
const TOPO_PATTERN = `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='10' fill='none' stroke='%23cb213118' stroke-width='.5'/%3E%3Ccircle cx='30' cy='30' r='20' fill='none' stroke='%23cb213112' stroke-width='.5'/%3E%3Ccircle cx='30' cy='30' r='28' fill='none' stroke='%23cb21310d' stroke-width='.5'/%3E%3C/svg%3E")`;

export function DfwSection() {
  return (
    <section
      id="dfw"
      className="section-shell section-intake-gradient relative border-t border-line"
      style={{
        backgroundImage: `${TOPO_PATTERN}, linear-gradient(145deg, #2a0d13 0%, #7c1628 48%, #1e2024 100%)`,
        backgroundSize: "60px 60px, auto",
      }}
    >
      <Container swiss className="relative z-10 space-y-8">
        <SectionHeading
          eyebrow="Service Area"
          title="Dallas-Fort Worth & North Texas"
          description="A regional design-build practice grounded in DFW, extending across North Texas — local permitting fluency, trade relationships, and execution quality across the corridor."
        />

        <div className="brand-red-outline brand-red-surface rounded-xl border border-line bg-surface p-6 shadow-sm">
          <p className="text-sm leading-6 text-muted">
            Active intake includes {featuredCities.join(", ")}, and other communities within ~80 miles of Dallas.
          </p>
          <Link href="/dallas-fort-worth" className="mt-4 inline-flex min-h-[44px] min-w-[44px] items-center text-sm font-bold uppercase tracking-[0.05em] text-ink underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
            View full service area
          </Link>
        </div>
      </Container>
    </section>
  );
}
