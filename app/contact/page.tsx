import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { JsonLd } from "@/components/ui/json-ld";
import { MultiStepForm } from "@/components/ui/multi-step-form";
import { SocialLinks } from "@/components/ui/social-links";
import { createBreadcrumbSchema } from "@/lib/seo/schema";
import { getCtaConfig, getSiteUrl, siteConfig } from "@/lib/config/site";

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
  const { phoneDisplay, phoneHref } = getCtaConfig();

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
            <a
              href={phoneHref}
              className="inline-flex min-h-[44px] min-w-[44px] items-center text-sm text-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:min-h-7"
            >
              {phoneDisplay}
            </a>
            <span className="text-sm text-muted">Mon–Fri · 9:00 AM–6:00 PM</span>
            <span className="text-sm text-muted">Dallas–Fort Worth projects only</span>
            <SocialLinks />
          </div>

          <div className="grid gap-4 rounded-xl border border-line bg-surface p-5 text-sm text-muted sm:grid-cols-3">
            <div>
              <p className="font-semibold text-ink">Response time</p>
              <p className="mt-1 leading-6">Most qualified inquiries receive a response within 1 business day.</p>
            </div>
            <div>
              <p className="font-semibold text-ink">Best fit</p>
              <p className="mt-1 leading-6">Ground-up custom homes, preconstruction, and architect-led project delivery in DFW.</p>
            </div>
            <div>
              <p className="font-semibold text-ink">Not a fit?</p>
              <p className="mt-1 leading-6">We do not route generic remodeling or out-of-market requests through this intake.</p>
            </div>
          </div>

          <MultiStepForm />
        </Container>
      </section>
    </>
  );
}
