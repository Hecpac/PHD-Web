import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type GridLayout =
  | "12-col"
  | "2-1"
  | "1-2"
  | "golden"
  | "golden-reverse"
  | "halves"
  | "thirds"
  | "quarters";

type Alignment = "start" | "center" | "end" | "stretch";

type SwissSectionProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  /** Grid layout preset. Defaults to "12-col". */
  columns?: GridLayout;
  /** Grid gap as baseline multiples (8px units). Defaults to 3 (24px). */
  gap?: 1 | 2 | 3 | 4 | 6 | 8;
  /** Vertical alignment of grid items. */
  align?: Alignment;
  /** Render as a semantic HTML element. Defaults to "section". */
  as?: "section" | "div" | "article" | "aside";
};

const layoutClasses: Record<GridLayout, string> = {
  "12-col": "swiss-grid",
  "2-1": "swiss-grid-2-1",
  "1-2": "swiss-grid-1-2",
  golden: "swiss-grid-golden",
  "golden-reverse": "swiss-grid-golden-reverse",
  halves: "swiss-grid-halves",
  thirds: "swiss-grid-thirds",
  quarters: "swiss-grid-quarters",
};

const alignClasses: Record<Alignment, string> = {
  start: "swiss-align-start",
  center: "swiss-align-center",
  end: "swiss-align-end",
  stretch: "swiss-align-stretch",
};

const gapValues: Record<number, string> = {
  1: "8px",
  2: "16px",
  3: "24px",
  4: "32px",
  6: "48px",
  8: "64px",
};

export function SwissSection({
  children,
  columns = "12-col",
  gap = 3,
  align,
  as: Tag = "section",
  className,
  style,
  ...props
}: SwissSectionProps) {
  return (
    <Tag
      className={cn(
        "container-swiss section-shell",
        layoutClasses[columns],
        align && alignClasses[align],
        className,
      )}
      style={{
        "--grid-gutter": gapValues[gap],
        ...style,
      } as React.CSSProperties}
      {...props}
    >
      {children}
    </Tag>
  );
}
