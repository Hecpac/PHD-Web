import Link from "next/link";

import { CtaLink } from "@/components/ui/cta-link";
import { getCtaConfig, siteConfig, siteNavigation } from "@/lib/config/site";

export function SiteFooter() {
  const { phoneDisplay, phoneHref, scheduleUrl } = getCtaConfig();
  const serviceNav = siteNavigation.find((item) => item.href === "/services");
  const serviceChildren = serviceNav?.children ?? [];
  const copyrightYear = new Date().getFullYear().toString();

  return (
    <footer
      id="site-footer"
      className="fixed bottom-0 left-0 right-0 border-t border-line bg-surface/65"
      style={{ zIndex: -1 }}
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="container-swiss py-12 md:py-14">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-5 lg:col-span-5">
            <p className="font-mono text-xs uppercase tracking-[0.05em] text-muted">DFW Only</p>
            <h2 className="type-title text-ink">
              Architecture-first design-build across Dallas-Fort Worth.
            </h2>
            <p className="max-w-md text-sm leading-6 text-muted">
              We operate as a focused regional team so your project gets consistent planning,
              trade coordination, and schedule control from concept to handover.
            </p>

            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full border border-line bg-canvas px-2.5 py-1 text-xs text-muted">
                Now booking 2026 starts
              </span>
              <span className="inline-flex items-center rounded-full border border-line bg-canvas px-2.5 py-1 text-xs text-muted">
                Dallas-Fort Worth Metroplex
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <CtaLink href={phoneHref} eventName="cta_call_click" variant="secondary" className="bg-canvas">
                Call {phoneDisplay}
              </CtaLink>
              <CtaLink
                href={scheduleUrl}
                target="_blank"
                rel="noreferrer"
                eventName="cta_schedule_click"
              >
                Schedule Consultation
              </CtaLink>
            </div>

            <div className="space-y-2 pt-1">
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                aria-label={`Email ${siteConfig.contactEmail}`}
                className="inline-flex min-h-[44px] min-w-[44px] items-center text-sm text-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:min-h-7"
              >
                {siteConfig.contactEmail}
              </a>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {siteConfig.socialLinks.map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${social.label} (opens in a new tab)`}
                    className="inline-flex min-h-[44px] min-w-[44px] items-center text-sm text-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:min-h-7"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-7">
            <nav aria-label="Footer primary navigation" className="space-y-3">
              <p className="font-mono text-xs uppercase tracking-[0.05em] text-muted">Explore</p>
              <ul className="space-y-2">
                {siteNavigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-flex min-h-[44px] min-w-[44px] items-center text-sm text-ink hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:min-h-7"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="space-y-3">
              <p className="font-mono text-xs uppercase tracking-[0.05em] text-muted">Core Services</p>
              <ul className="space-y-2">
                {serviceChildren.slice(0, 5).map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-flex min-h-[44px] min-w-[44px] items-center text-sm text-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:min-h-7"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/services"
                className="inline-flex min-h-[44px] min-w-[44px] items-center pt-1 text-sm font-medium text-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:min-h-7"
              >
                View full services
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
          <Link
            href="/dallas-fort-worth"
            className="inline-flex min-h-[44px] min-w-[44px] items-center text-sm text-muted underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:min-h-7"
          >
            Service Area: Dallas&ndash;Fort Worth
          </Link>
          <p className="text-xs text-muted">
            &copy; {copyrightYear} {siteConfig.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
