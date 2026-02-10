import Image from "next/image";

import { Container } from "@/components/layout/container";
import { CtaLink } from "@/components/ui/cta-link";
import { SwissTextReveal } from "@/components/ui/swiss-text-reveal";
import { getCtaConfig } from "@/lib/config/site";

export function HeroSection() {
  const { phoneDisplay, phoneHref, scheduleUrl } = getCtaConfig();

  return (
    <section
      id="hero"
      aria-label="Hero — DFW custom home builder"
      className="relative min-h-[85vh] bg-canvas"
    >
      {/* Full-width hero image with cinematic treatment */}
      <div className="absolute inset-0">
        <Image
          src="/hero-architecture.svg"
          alt="Modern architecture in Dallas-Fort Worth"
          fill
          priority
          fetchPriority="high"
          className="object-cover opacity-32"
          sizes="100vw"
          unoptimized
        />
      </div>
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/88 to-canvas/65" />

      {/* Content overlay — flush left, bottom aligned */}
      <Container swiss className="relative z-10">
        <div className="flex min-h-[85vh] items-end pb-16">
          <div className="max-w-3xl space-y-6">
            <p className="font-mono text-xs uppercase tracking-[0.05em] text-muted">
              DFW Modern Design-Build
            </p>

            <h1 className="text-5xl font-bold leading-[0.95] tracking-[-0.04em] text-ink sm:text-6xl lg:text-[5.25rem]">
              <SwissTextReveal mode="word" stagger={0.1}>
                Architectural custom homes, delivered with builder-grade control.
              </SwissTextReveal>
            </h1>

            <p className="max-w-2xl text-lg leading-relaxed text-ink/90">
              We plan, coordinate, and build modern residences exclusively across Dallas-Fort Worth.
              Every phase is tied to clear deliverables and decision gates.
            </p>

            <div
              className="flex flex-col gap-4 pt-4 sm:flex-row sm:items-center"
              role="group"
              aria-label="Call to action"
            >
              <CtaLink
                href={scheduleUrl}
                target="_blank"
                rel="noreferrer"
                eventName="cta_schedule_click"
                withArrow
              >
                Schedule Consultation
              </CtaLink>
              <CtaLink
                href={phoneHref}
                eventName="cta_call_click"
                variant="secondary"
              >
                Call {phoneDisplay}
              </CtaLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
