"use client";

import { useRef } from "react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { gsap, useGSAP } from "@/lib/gsap";
import { DFW_CITIES } from "@/lib/types/content";

const featuredCities = DFW_CITIES.slice(0, 8);

/** Inline SVG pattern: topographic contour circles */
const TOPO_PATTERN = `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='10' fill='none' stroke='%23ffffff08' stroke-width='.5'/%3E%3Ccircle cx='30' cy='30' r='20' fill='none' stroke='%23ffffff06' stroke-width='.5'/%3E%3Ccircle cx='30' cy='30' r='28' fill='none' stroke='%23ffffff04' stroke-width='.5'/%3E%3C/svg%3E")`;

export function DfwSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !bgRef.current) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(bgRef.current!, { clipPath: "circle(10% at 50% 50%)" });

        gsap.to(bgRef.current!, {
          clipPath: "circle(150% at 50% 50%)",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current!,
            start: "top 90%",
            end: "bottom 50%",
            scrub: true,
          },
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(bgRef.current!, { clipPath: "none" });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="dfw"
      className="section-shell relative border-t border-line"
    >
      {/* Expanding circle background */}
      <div
        ref={bgRef}
        className="absolute inset-0"
        style={{
          backgroundColor: "#111",
          backgroundImage: TOPO_PATTERN,
          backgroundSize: "60px 60px",
          clipPath: "circle(10% at 50% 50%)",
        }}
        aria-hidden="true"
      />

      <Container swiss className="relative z-10 space-y-8">
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
