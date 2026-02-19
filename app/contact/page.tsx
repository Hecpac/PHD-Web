import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { ContactTerminal } from "@/components/home/contact-terminal";
import { JsonLd } from "@/components/ui/json-ld";
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
      <Container swiss className="space-y-3 pt-6">
        <h1 className="sr-only">Contact for Dallas-Fort Worth consultation</h1>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-line py-3">
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="inline-flex min-h-[44px] min-w-[44px] items-center text-sm text-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:min-h-7"
          >
            {siteConfig.contactEmail}
          </a>
          <SocialLinks />
        </div>
      </Container>
      <ContactTerminal />
    </>
  );
}
