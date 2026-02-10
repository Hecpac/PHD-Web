import Link from "next/link";

import { MobileMenu } from "@/components/layout/mobile-menu";
import { NavDropdown } from "@/components/layout/nav-dropdown";
import { CtaLink } from "@/components/ui/cta-link";
import { getCtaConfig, siteConfig, siteNavigation } from "@/lib/config/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const ctaConfig = getCtaConfig();

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-canvas"
      >
        Skip to main content
      </a>
      <header className="sticky top-0 z-50 border-b border-line/50 bg-canvas/80 backdrop-blur-header" role="banner">
        <div className="container-swiss flex items-center justify-between gap-4 py-4">
          <Link href="/" className="text-sm font-bold uppercase tracking-[0.05em]" aria-label={`${siteConfig.shortName} — Home`}>
            {siteConfig.shortName}
          </Link>

          <nav aria-label="Primary navigation" className="hidden items-center gap-6 md:flex">
            {siteNavigation.map((item) =>
              item.children ? (
                <NavDropdown
                  key={item.href}
                  label={item.label}
                  href={item.href}
                  items={item.children}
                />
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm text-muted hover:text-ink focus-visible:outline-none",
                    item.href === "/contact" && "text-ink",
                  )}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-2">
            <CtaLink
              href={ctaConfig.scheduleUrl}
              target="_blank"
              rel="noreferrer"
              eventName="cta_schedule_click"
              className="hidden md:inline-flex"
            >
              Schedule Consultation
            </CtaLink>

            <MobileMenu navigation={siteNavigation} cta={ctaConfig} />
          </div>
        </div>
      </header>
    </>
  );
}
