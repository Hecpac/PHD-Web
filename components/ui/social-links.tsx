import { Facebook, Instagram, Music2, type LucideIcon } from "lucide-react";

import { siteConfig } from "@/lib/config/site";
import { cn } from "@/lib/utils";

type SocialLinksProps = {
  iconOnly?: boolean;
  className?: string;
  linkClassName?: string;
};

const iconByLabel: Record<string, LucideIcon> = {
  TikTok: Music2,
  Facebook,
  Instagram,
};

export function SocialLinks({ iconOnly = false, className, linkClassName }: SocialLinksProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {siteConfig.socialLinks.map((social) => {
        const Icon = iconByLabel[social.label] ?? Music2;

        return (
          <a
            key={social.href}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            className={cn(
              "inline-flex min-h-[44px] min-w-[44px] items-center gap-2 rounded-md text-sm text-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
              iconOnly &&
                "justify-center border border-line/80 bg-surface/70 p-2 hover:border-accent/40 hover:bg-accent-soft",
              linkClassName,
            )}
            aria-label={`${social.label} (opens in a new tab)`}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {iconOnly ? <span className="sr-only">{social.label}</span> : <span>{social.label}</span>}
          </a>
        );
      })}
    </div>
  );
}
