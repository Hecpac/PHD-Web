import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { ContactTerminal } from "@/components/home/contact-terminal";
import { JsonLd } from "@/components/ui/json-ld";
import { createBreadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Contact | Schedule a DFW Consultation",
  description:
    "Start your Dallas-Fort Worth custom home intake and schedule a design-build consultation.",
  openGraph: {
    title: "Contact | Schedule a DFW Consultation",
    description:
      "Start your Dallas-Fort Worth custom home intake and schedule a design-build consultation.",
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ])}
      />
      <Container className="pt-6">
        <h1 className="sr-only">Contact for Dallas-Fort Worth consultation</h1>
      </Container>
      <ContactTerminal />
    </>
  );
}
