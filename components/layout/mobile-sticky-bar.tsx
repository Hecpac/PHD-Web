"use client";

import { CalendarDays, Phone } from "lucide-react";
import { useTranslations } from "next-intl";

import { CtaLink } from "@/components/ui/cta-link";
import { getCtaConfig } from "@/lib/config/site";

export function MobileStickyBar() {
  const t = useTranslations("layout");
  const { phoneDisplay, phoneHref, scheduleUrl } = getCtaConfig();

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white/90 p-2 backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-screen-sm gap-2">
        <CtaLink
          href={phoneHref}
          variant="secondary"
          eventName="cta_call_click"
          className="min-h-11 flex-1 rounded-md border-red-600 bg-red-600 px-2 text-[12px] font-semibold uppercase tracking-[0.04em] text-white active:bg-red-700"
        >
          <Phone className="mr-1.5 h-3.5 w-3.5" />
          {t("footer.callPrefix")} {phoneDisplay}
        </CtaLink>

        <CtaLink
          href={scheduleUrl}
          {...(scheduleUrl.startsWith("http") && { target: "_blank", rel: "noreferrer" })}
          eventName="cta_schedule_click"
          className="min-h-11 flex-1 rounded-md border-red-600 bg-red-600 px-2 text-[12px] font-semibold uppercase tracking-[0.04em] text-white active:bg-red-700"
        >
          <CalendarDays className="mr-1.5 h-3.5 w-3.5" />
          {t("schedule")}
        </CtaLink>
      </div>
    </div>
  );
}
