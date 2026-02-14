"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";
import Link from "next/link";

import { trackEvent, type AnalyticsEventName } from "@/lib/analytics/events";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

type CtaVariant = "primary" | "secondary" | "ghost";

type CtaLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  eventName?: AnalyticsEventName;
  eventPayload?: Record<string, unknown>;
  variant?: CtaVariant;
  withArrow?: boolean;
};

const baseClassName =
  "inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm border px-6 py-3 text-sm font-bold uppercase tracking-[0.05em] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const variantClassNames: Record<CtaVariant, string> = {
  primary:
    "cta-primary-fill border-accent bg-accent text-on-accent hover:bg-accent-hover active:bg-accent-pressed shadow-[6px_6px_0_#000] hover:translate-x-[6px] hover:translate-y-[6px] hover:shadow-none hover:text-white transition-all duration-300 ease-[cubic-bezier(0.87,0,0.13,1)]",
  secondary: "border-line bg-surface text-ink hover:bg-surface-2",
  ghost: "mi-underline-reveal border-transparent bg-transparent text-ink px-0",
};

function isInternalHref(href: string): boolean {
  return href.startsWith("/") && !href.startsWith("//");
}

export function CtaLink({
  href,
  children,
  className,
  eventName,
  eventPayload,
  onClick,
  variant = "primary",
  withArrow = false,
  ...props
}: CtaLinkProps) {
  const classNames = cn(baseClassName, "group", variantClassNames[variant], className);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    if (event.defaultPrevented || !eventName) {
      return;
    }

    trackEvent(eventName, eventPayload);
  };

  const content = (
    <span className="relative z-10 inline-flex items-center">
      {children}
      {withArrow && (
        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
      )}
    </span>
  );

  const linkElement = isInternalHref(href) ? (
    <Link href={href} className={classNames} onClick={handleClick} data-cursor="expand" {...props}>
      {content}
    </Link>
  ) : (
    <a href={href} className={classNames} onClick={handleClick} data-cursor="expand" {...props}>
      {content}
    </a>
  );

  return linkElement;
}
