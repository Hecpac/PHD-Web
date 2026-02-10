import { cn } from "@/lib/utils";
import { SwissTextReveal } from "@/components/ui/swiss-text-reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  /** Render the title as h1 when this is the page-level heading. Defaults to h2. */
  as?: "h1" | "h2";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  as: Heading = "h2",
}: SectionHeadingProps) {
  return (
    <header className={cn("space-y-4", className)}>
      {eyebrow ? (
        <p className="type-mono-label text-muted">{eyebrow}</p>
      ) : null}
      <Heading className="type-display max-w-4xl">
        <SwissTextReveal mode="word" as="span">
          {title}
        </SwissTextReveal>
      </Heading>
      {description ? (
        <p className="type-subhead max-w-3xl text-muted">{description}</p>
      ) : null}
    </header>
  );
}
