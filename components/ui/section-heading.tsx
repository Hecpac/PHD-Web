import { cn } from "@/lib/utils";
import { SwissTextReveal } from "@/components/ui/swiss-text-reveal";
import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
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
    <hgroup className={cn("flex flex-col", className)}>
      {eyebrow ? (
        <span className="mb-4 block type-mono-label text-muted md:mb-5">
          {eyebrow}
        </span>
      ) : null}
      <Heading
        id={titleId}
        className={cn(
          "type-display max-w-4xl",
          description ? "mb-5 md:mb-8" : ""
        )}
      >
        <SwissTextReveal mode="word" as="span" noInitialHide>
          {title}
        </SwissTextReveal>
      </Heading>
      {description ? (
        <p className="type-subhead max-w-prose text-muted">{description}</p>
      ) : null}
    </hgroup>
  );
}
