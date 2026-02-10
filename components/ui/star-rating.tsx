import { cn } from "@/lib/utils";

type StarRatingProps = {
  rating: number;
  max?: number;
  className?: string;
};

export function StarRating({ rating, max = 5, className }: StarRatingProps) {
  return (
    <div
      className={cn("flex gap-0.5", className)}
      role="img"
      aria-label={`${rating} out of ${max} stars`}
    >
      {Array.from({ length: max }, (_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill={i < rating ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.2"
          aria-hidden="true"
          className={i < rating ? "text-accent" : "text-muted/40"}
        >
          <path d="M8 1.5l2.09 4.26 4.71.69-3.4 3.32.8 4.69L8 12.26l-4.2 2.2.8-4.69-3.4-3.32 4.71-.69L8 1.5z" />
        </svg>
      ))}
    </div>
  );
}
