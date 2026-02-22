import Link from "next/link";

import { AnimatedNavLink } from "@/components/layout/animated-nav-link";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { NavDropdown } from "@/components/layout/nav-dropdown";
import { CtaLink } from "@/components/ui/cta-link";
import { SocialLinks } from "@/components/ui/social-links";
import { getCtaConfig, siteConfig, siteNavigation } from "@/lib/config/site";

export function SiteHeader() {
  const ctaConfig = getCtaConfig();

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-on-accent"
      >
        Skip to main content
      </a>
      <header className="absolute top-0 z-50 w-full" role="banner">
        <div className="container-swiss">
          <div className="flex items-center justify-between py-4 md:py-6">
            <Link
              href="/"
              className="font-mono text-xs uppercase tracking-[0.15em] font-medium text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/55 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              aria-label={`${siteConfig.shortName} — Home`}
            >
              {siteConfig.shortName}
            </Link>

            <nav
              aria-label="Primary navigation"
              className="hidden items-center gap-4 md:flex lg:gap-8"
            >
              {siteNavigation.map((item) =>
                item.children ? (
                  <NavDropdown
                    key={item.href}
                    label={item.label}
                    href={item.href}
                    items={item.children}
                  />
                ) : (
                  <AnimatedNavLink key={item.href} href={item.href}>
                    {item.label}
                  </AnimatedNavLink>
                ),
              )}
            </nav>

            <div className="flex items-center gap-3">
              <SocialLinks
                iconOnly
                className="hidden lg:flex"
                linkClassName="!min-h-10 !min-w-10 text-white/60 hover:text-white transition-colors border-0 shadow-none bg-transparent"
              />
              <div aria-hidden className="hidden h-3 w-px bg-white/30 lg:block mx-1" />
              <CtaLink
                href={ctaConfig.scheduleUrl}
                target="_blank"
                rel="noreferrer"
                eventName="cta_schedule_click"
                variant="ghost"
                className="hidden md:inline-flex text-[10px] sm:text-[11px] uppercase tracking-[0.15em] font-mono px-0 border-b-0 text-white/80 hover:text-white focus-visible:outline-none rounded-none"
              >
                ( SCHEDULE )
              </CtaLink>

              <div className="md:hidden">
                <MobileMenu navigation={siteNavigation} cta={ctaConfig} />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
