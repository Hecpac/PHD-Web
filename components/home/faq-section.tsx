import { Container } from "@/components/layout/container";
import { Accordion } from "@/components/ui/accordion";
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
                    <div className="lg:col-span-7">
                        <Accordion items={displayedFaqs} className="brand-red-outline brand-red-surface rounded-xl border border-line/90 bg-surface/92 px-5 sm:px-6" />
                    </div>
                </div>
            </Container>
        </section>
    );
}
