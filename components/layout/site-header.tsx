import Link from "next/link";

import { AnimatedNavLink } from "@/components/layout/animated-nav-link";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { NavDropdown } from "@/components/layout/nav-dropdown";
import { CtaLink } from "@/components/ui/cta-link";
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
      <header className="sticky top-0 z-50 pt-3" role="banner">
        <div className="container-swiss">
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-line/70 bg-canvas/85 px-4 py-3 shadow-[0_10px_28px_rgb(0_0_0/0.08)] backdrop-blur-header md:gap-5 md:px-6">
            <Link
              href="/"
              className="type-mono-label inline-flex items-center rounded-md px-2 py-1.5 font-bold text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              aria-label={`${siteConfig.shortName} — Home`}
            >
              {siteConfig.shortName}
            </Link>

            <nav
              aria-label="Primary navigation"
              className="hidden items-center gap-1 rounded-xl border border-line/70 bg-surface/75 p-1 backdrop-blur-header md:flex"
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

            <div className="flex items-center gap-2 md:gap-3">
              <div aria-hidden className="hidden h-7 w-px bg-line/80 md:block" />
              <CtaLink
                href={ctaConfig.scheduleUrl}
                target="_blank"
                rel="noreferrer"
                eventName="cta_schedule_click"
                className="hidden md:inline-flex md:min-h-10 md:px-5"
              >
                Schedule Consultation
              </CtaLink>

              <MobileMenu navigation={siteNavigation} cta={ctaConfig} />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
