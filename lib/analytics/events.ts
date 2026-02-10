export type AnalyticsEventName =
  | "cta_schedule_click"
  | "cta_call_click"
  | "form_start"
  | "form_submit"
  | "form_error"
  | "project_view"
  | "gallery_interaction";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function trackEvent(
  eventName: AnalyticsEventName,
  payload: Record<string, unknown> = {},
): void {
  if (typeof window === "undefined") {
    return;
  }

  const event = {
    event: eventName,
    ...payload,
    timestamp: Date.now(),
  };

  window.dataLayer?.push(event);
  window.dispatchEvent(new CustomEvent("dfw:analytics", { detail: event }));

  if (process.env.NODE_ENV !== "production") {
    // Keep event visibility while integration with external analytics is pending.
    console.info("[analytics]", event);
  }
}
