"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";

import { trackEvent } from "@/lib/analytics/events";

type BookingModalProps = {
  title?: string;
  description?: string;
  bookingUrl: string;
  triggerLabel?: string;
  analyticsId?: string;
};

export function BookingModal({
  title,
  description,
  bookingUrl,
  triggerLabel,
  analyticsId,
}: BookingModalProps) {
  const t = useTranslations("bookingModal");
  const resolvedTitle = title ?? t("defaultTitle");
  const resolvedDescription = description ?? t("defaultDescription");
  const resolvedTrigger = triggerLabel ?? t("defaultTrigger");
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const openModal = () => {
    setOpen(true);
    trackEvent("cta_schedule_click", { source: "booking_modal" });
  };

  const closeModal = useCallback(() => setOpen(false), []);

  // Focus close button on open + trap focus + Escape key
  useEffect(() => {
    if (!open) return;

    closeRef.current?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeModal();
        return;
      }

      if (e.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, iframe, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, closeModal]);

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        data-analytics-cta={analyticsId}
        className="inline-flex min-h-[52px] items-center justify-center rounded-sm border border-accent bg-accent px-7 py-[14px] text-[14px] font-bold uppercase tracking-[0.05em] text-on-accent transition-colors duration-[var(--dur-fast)] hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {resolvedTrigger}
      </button>

      {open ? (
        <div
          ref={dialogRef}
          className="fixed inset-0 z-[180] flex items-center justify-center bg-ink/65 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={resolvedTitle}
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div className="w-full max-w-4xl rounded-xl border border-line bg-surface shadow-[var(--shadow-card)]">
            <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4">
              <div>
                <h3 className="text-lg font-semibold text-ink">{resolvedTitle}</h3>
                <p className="mt-1 text-sm text-muted">{resolvedDescription}</p>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={closeModal}
                className="rounded-md border border-line p-2 text-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                aria-label={t("closeLabel")}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="h-[70vh] w-full">
              <iframe
                src={bookingUrl}
                title={t("iframeTitle")}
                className="h-full w-full rounded-b-xl"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
