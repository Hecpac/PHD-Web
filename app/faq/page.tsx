import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { JsonLd } from "@/components/ui/json-ld";
import { SectionHeading } from "@/components/ui/section-heading";
import { getFaqs } from "@/lib/data";
import { createBreadcrumbSchema, createFaqSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "FAQ | Dallas-Fort Worth Custom Homes",
  description:
    "Frequently asked questions about custom home design-build services in Dallas-Fort Worth.",
  openGraph: {
    title: "FAQ | Dallas-Fort Worth Custom Homes",
    description:
      "Frequently asked questions about custom home design-build services in Dallas-Fort Worth.",
  },
  alternates: {
    canonical: "/faq",
  },
};

export default async function FaqPage() {
  const faqs = await getFaqs();

  return (
    <section className="section-shell" aria-labelledby="faq-heading">
      <JsonLd data={createFaqSchema(faqs)} />
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "FAQ", href: "/faq" },
        ])}
      />
      <Container className="space-y-8">
        <SectionHeading
          as="h1"
          eyebrow="FAQ"
          title="Answers for DFW project planning"
          description="Common questions about process, timeline, and service area for modern custom homes in Dallas-Fort Worth."
        />

        <div className="space-y-4">
          {faqs.map((faq) => (
            <details key={faq.id} className="rounded-2xl border border-line bg-surface p-5">
              <summary className="cursor-pointer text-base font-medium">{faq.question}</summary>
              <p className="mt-3 text-sm leading-6 text-muted">{faq.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
