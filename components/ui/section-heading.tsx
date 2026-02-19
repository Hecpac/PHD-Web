import { cn } from "@/lib/utils";
import { SwissTextReveal } from "@/components/ui/swiss-text-reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  /** Optional id for the rendered heading element (h1/h2). */
  titleId?: string;
  /** Render the title as h1 when this is the page-level heading. Defaults to h2. */
  as?: "h1" | "h2";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  titleId,
  as: Heading = "h2",
}: SectionHeadingProps) {
  return (
    <header className={cn("space-y-4", className)}>
      {eyebrow ? (
        <span className="block type-mono-label text-muted">{eyebrow}</span>
      ) : null}
      <Heading id={titleId} className="type-display max-w-4xl">
        <SwissTextReveal mode="word" as="span" noInitialHide>
          {title}
        </SwissTextReveal>
      </Heading>
      {description ? (
        <p className="type-subhead max-w-3xl text-muted">{description}</p>
      ) : null}
    </header>
  );
}
