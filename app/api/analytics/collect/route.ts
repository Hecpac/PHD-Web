import { headers } from "next/headers";

import { checkRateLimit } from "@/lib/rate-limit";

type IncomingEvent = {
  event: string;
  timestamp?: number;
  [key: string]: unknown;
};

function isValidEvent(payload: unknown): payload is IncomingEvent {
  if (!payload || typeof payload !== "object") return false;
  const event = (payload as Record<string, unknown>).event;
  return typeof event === "string" && event.length > 0;
}

async function persistLocally(payload: Record<string, unknown>): Promise<void> {
  const { appendFile, mkdir } = await import("node:fs/promises");
  const { dirname } = await import("node:path");

  const filePath = process.env.ANALYTICS_EVENTS_FILE?.trim() || "/tmp/phd-analytics-events.ndjson";
  await mkdir(dirname(filePath), { recursive: true });
  await appendFile(filePath, `${JSON.stringify(payload)}\n`, "utf8");
}

async function forwardToWebhook(payload: Record<string, unknown>): Promise<void> {
  const webhookUrl = process.env.ANALYTICS_EVENTS_WEBHOOK_URL?.trim();
  if (!webhookUrl) {
    await persistLocally(payload);
    return;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.ANALYTICS_WEBHOOK_BEARER_TOKEN || process.env.CONTACT_WEBHOOK_BEARER_TOKEN
          ? { Authorization: `Bearer ${process.env.ANALYTICS_WEBHOOK_BEARER_TOKEN ?? process.env.CONTACT_WEBHOOK_BEARER_TOKEN}` }
          : {}),
      },
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  const rl = checkRateLimit(`analytics:${ip}`);
  if (!rl.allowed) {
    return new Response(JSON.stringify({ ok: false }), { status: 429 });
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, error: "invalid_json" }), { status: 400 });
  }

  if (!isValidEvent(body)) {
    return new Response(JSON.stringify({ ok: false, error: "invalid_event" }), { status: 422 });
  }

  const headersList = await headers();

  const payload = {
    ...body,
    ip,
    path: headersList.get("referer") || "",
    receivedAt: new Date().toISOString(),
    source: "phd-web-analytics",
  };

  try {
    await forwardToWebhook(payload);
  } catch {
    return new Response(JSON.stringify({ ok: false, error: "delivery_failed" }), { status: 202 });
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
}
