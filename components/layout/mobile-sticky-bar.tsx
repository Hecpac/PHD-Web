"use client";

import { CalendarDays, Phone } from "lucide-react";

import { CtaLink } from "@/components/ui/cta-link";
import { getCtaConfig } from "@/lib/config/site";

export function MobileStickyBar() {
  const { phoneDisplay, phoneHref, scheduleUrl } = getCtaConfig();

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white/90 p-2 backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-screen-sm gap-2">
        <CtaLink
          href={phoneHref}
          variant="secondary"
          eventName="cta_call_click"
          className="min-h-11 flex-1 rounded-md border-line bg-surface px-2 text-[12px] font-semibold uppercase tracking-[0.04em]"
        >
          <Phone className="mr-1.5 h-3.5 w-3.5" />
          Call {phoneDisplay}
        </CtaLink>

        <CtaLink
          href={scheduleUrl}
          target="_blank"
          rel="noreferrer"
          eventName="cta_schedule_click"
          className="min-h-11 flex-1 rounded-md px-2 text-[12px] font-semibold uppercase tracking-[0.04em]"
        >
          <CalendarDays className="mr-1.5 h-3.5 w-3.5" />
          Schedule
        </CtaLink>
      </div>
    </div>
  );
}
