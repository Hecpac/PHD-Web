import { Container } from "@/components/layout/container";
import { Accordion } from "@/components/ui/accordion";
import { CtaLink } from "@/components/ui/cta-link";
import { SectionHeading } from "@/components/ui/section-heading";
import type { FAQ } from "@/lib/types/content";

type FaqSectionProps = {
    faqs: FAQ[];
    id?: string;
};

export function FaqSection({ faqs, id = "faq" }: FaqSectionProps) {
    // Take only top 5-6 FAQs for the homepage to avoid clutter
    const displayedFaqs = faqs.slice(0, 6).map((faq) => ({
        id: faq.id,
        title: faq.question,
        content: <p>{faq.answer}</p>,
    }));

    return (
        <section id={id} className="section-shell section-shell-tight section-brand-band border-t border-line section-brand-divider">
            <Container swiss>
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-24">
                    <div className="lg:col-span-5">
                        <SectionHeading
                            eyebrow="Common Questions"
                            title="Clarity before commitment"
                            description="We believe in answering hard questions upfront. Here is what most prospective owners ask us about building in DFW."
                        />
                    </div>
                    <div className="lg:col-span-7 space-y-5">
                        <Accordion items={displayedFaqs} className="brand-red-outline brand-red-surface rounded-xl border border-line/90 bg-surface/92 px-5 sm:px-6" />
                        <div className="flex flex-col gap-3 rounded-xl border border-line bg-surface p-5 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="font-semibold text-ink">Still deciding if the project is a fit?</p>
                                <p className="mt-1 text-sm leading-6 text-muted">Share your lot status, target zone, and budget direction. We will point you to the right next step.</p>
                            </div>
                            <CtaLink
                                href="#contact"
                                variant="primary"
                                eventName="cta_schedule_click"
                                className="min-h-11 px-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
                            >
                                Start Project Intake
                            </CtaLink>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
