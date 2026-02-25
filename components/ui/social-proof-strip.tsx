import type { Review } from "@/lib/types/content";

type SocialProofStripProps = {
  title?: string;
  reviews: Review[];
};

export function SocialProofStrip({
  title = "What DFW homeowners say",
  reviews,
}: SocialProofStripProps) {
  if (reviews.length === 0) {
    return null;
  }

  return (
    <section className="space-y-4">
      <h3 className="text-lg font-semibold tracking-tight text-ink">{title}</h3>
      <div className="grid gap-4 md:grid-cols-2">
        {reviews.map((review) => (
          <article key={review.id} className="rounded-lg border border-line bg-surface p-4">
            <p className="text-sm leading-6 text-muted">“{review.text}”</p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.05em] text-ink">
              {review.author} · {review.location}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
