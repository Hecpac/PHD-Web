import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { JsonLd } from "@/components/ui/json-ld";
import { MultiStepForm } from "@/components/ui/multi-step-form";
import { SocialLinks } from "@/components/ui/social-links";
import { createBreadcrumbSchema } from "@/lib/seo/schema";
import { getSiteUrl, siteConfig } from "@/lib/config/site";

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = getSiteUrl();

  return {
    title: "Contact | Schedule a DFW Consultation",
    description:
      "Start your Dallas-Fort Worth custom home intake and schedule a design-build consultation.",
    openGraph: {
      title: "Contact | Schedule a DFW Consultation",
      description:
        "Start your Dallas-Fort Worth custom home intake and schedule a design-build consultation.",
    },
    alternates: {
      canonical: `${siteUrl}/contact`,
    },
  };
}

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ])}
      />
      <section className="section-shell border-t border-line">
        <Container swiss className="space-y-6 pt-6">
          <header className="space-y-3">
            <p className="font-mono text-xs uppercase tracking-[0.05em] text-muted">BOFU Qualifier</p>
            <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Vision Builder — qualify your DFW custom home project
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-muted">
              Skip the generic contact form. Share lot status, target zone, and investment range so we can route your project with the right priority.
            </p>
          </header>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-line py-3">
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="inline-flex min-h-[44px] min-w-[44px] items-center text-sm text-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:min-h-7"
            >
              {siteConfig.contactEmail}
            </a>
            <SocialLinks />
          </div>

          <MultiStepForm />
        </Container>
      </section>
    </>
  );
}
