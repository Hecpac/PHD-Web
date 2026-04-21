"use client";

import { useActionState, useState } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

import { submitLeadMagnet, type LeadMagnetState } from "@/actions/lead-magnet";
import { cn } from "@/lib/utils";

const initialState: LeadMagnetState = {
  success: false,
  message: "",
  errors: {},
};

type LeadMagnetBannerProps = {
  className?: string;
  compact?: boolean;
};

export function LeadMagnetBanner({ className, compact = false }: LeadMagnetBannerProps) {
  const t = useTranslations("leadMagnet");
  const [state, formAction, isPending] = useActionState(submitLeadMagnet, initialState);
  const pathname = usePathname();
  const [utm] = useState(() => {
    if (typeof window === "undefined") {
      return {
        source: "",
        medium: "",
        campaign: "",
        content: "",
        term: "",
      };
    }

    const params = new URLSearchParams(window.location.search);
    return {
      source: params.get("utm_source") || "",
      medium: params.get("utm_medium") || "",
      campaign: params.get("utm_campaign") || "",
      content: params.get("utm_content") || "",
      term: params.get("utm_term") || "",
    };
  });

  return (
    <section className={cn("rounded-xl border border-line bg-surface p-4 sm:p-6", className)}>
      <p className="font-mono text-xs uppercase tracking-[0.05em] text-muted">{t("eyebrow")}</p>
      <h2 className="mt-2 text-xl font-semibold tracking-tight text-ink">
        {t("title")}
      </h2>
      <p className="mt-2 text-sm leading-6 text-muted">
        {t("description")}
      </p>

      <form action={formAction} className={cn("mt-4 flex flex-col gap-3", compact ? "sm:flex-row" : "sm:max-w-xl")}> 
        <input type="hidden" name="page" value={pathname || "unknown"} />
        <input type="hidden" name="utm_source" value={utm.source} />
        <input type="hidden" name="utm_medium" value={utm.medium} />
        <input type="hidden" name="utm_campaign" value={utm.campaign} />
        <input type="hidden" name="utm_content" value={utm.content} />
        <input type="hidden" name="utm_term" value={utm.term} />

        <label className="sr-only" htmlFor="lead-magnet-email">
          {t("emailLabel")}
        </label>
        <input
          id="lead-magnet-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={t("emailPlaceholder")}
          className={cn(
            "min-h-11 flex-1 rounded-md border border-line bg-canvas px-3 text-sm text-ink placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
            state.errors?.email && "border-danger",
          )}
          aria-invalid={Boolean(state.errors?.email) || undefined}
        />

        <button
          type="submit"
          disabled={isPending}
          className="min-h-11 rounded-md border border-accent bg-accent px-4 text-sm font-semibold text-on-accent disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? t("sending") : t("getGuide")}
        </button>
      </form>

      {state.message ? (
        <p
          className={cn(
            "mt-3 rounded-md border p-3 text-sm",
            state.success
              ? "border-accent-soft bg-accent-soft text-accent-soft-ink"
              : "border-danger bg-danger-soft text-danger-soft-ink",
          )}
          role={!state.success ? "alert" : "status"}
          aria-live="polite"
        >
          {state.message}
        </p>
      ) : null}
    </section>
  );
}
