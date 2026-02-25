"use client";

import { useState } from "react";
import { X } from "lucide-react";

import { trackEvent } from "@/lib/analytics/events";

type BookingModalProps = {
  title?: string;
  description?: string;
  bookingUrl: string;
  triggerLabel?: string;
  analyticsId?: string;
};

export function BookingModal({
  title = "Book your consultation",
  description = "Choose a time that works for you.",
  bookingUrl,
  triggerLabel = "Book Consultation",
  analyticsId,
}: BookingModalProps) {
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
    trackEvent("cta_schedule_click", { source: "booking_modal" });
  };

  const closeModal = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        data-analytics-cta={analyticsId}
        className="inline-flex min-h-[52px] items-center justify-center rounded-sm border border-accent bg-accent px-7 py-[14px] text-[14px] font-bold uppercase tracking-[0.05em] text-on-accent transition-colors duration-[var(--dur-fast)] hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {triggerLabel}
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[180] flex items-center justify-center bg-ink/65 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <div className="w-full max-w-4xl rounded-xl border border-line bg-surface shadow-[var(--shadow-card)]">
            <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4">
              <div>
                <h3 className="text-lg font-semibold text-ink">{title}</h3>
                <p className="mt-1 text-sm text-muted">{description}</p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="rounded-md border border-line p-2 text-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                aria-label="Close booking modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="h-[70vh] w-full">
              <iframe
                src={bookingUrl}
                title="Booking scheduler"
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
