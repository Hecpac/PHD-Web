export type AnalyticsEventName =
  | "cta_schedule_click"
  | "cta_call_click"
  | "form_start"
  | "submit_contact"
  | "form_submit"
  | "form_error"
  | "project_view"
  | "service_view"
  | "scroll_depth"
  | "cta_visible"
  | "gallery_interaction";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

function sendToCollector(event: Record<string, unknown>): void {
  try {
    const body = JSON.stringify(event);

    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" });
      navigator.sendBeacon("/api/analytics/collect", blob);
      return;
    }

    fetch("/api/analytics/collect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {
      // best-effort telemetry only
    });
  } catch {
    // never block UX because of analytics transport errors
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
  sendToCollector(event);

  if (process.env.NODE_ENV !== "production") {
    console.info("[analytics]", event);
  }
}
