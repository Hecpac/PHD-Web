import { AnimatedNavLink } from "@/components/layout/animated-nav-link";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { NavDropdown } from "@/components/layout/nav-dropdown";
import { CtaLink } from "@/components/ui/cta-link";
import { SocialLinks } from "@/components/ui/social-links";
import { getCtaConfig, siteNavigation } from "@/lib/config/site";

export function SiteHeader() {
  const ctaConfig = getCtaConfig();

  return (
    <>
      <header className="fixed top-0 z-50 w-full bg-black/60 backdrop-blur-md" role="banner">
        <div className="container-swiss">
          <div className="flex items-center justify-between py-4 md:py-6">
            {/* Spacer — logo 3D is fixed in bottom-left via FloatingLogo */}
            <div className="w-10 shrink-0 md:hidden" />

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
