"use server";

import { headers } from "next/headers";

import { checkRateLimit } from "@/lib/rate-limit";

type LeadMagnetErrors = Partial<{
  email: string;
}>;

export type LeadMagnetState = {
  success: boolean;
  message: string;
  errors: LeadMagnetErrors;
};

type LeadMagnetPayload = {
  email: string;
  page: string;
  source: "cost-timeline-guide-2026";
  submittedAt: string;
  utm: {
    source: string;
    medium: string;
    campaign: string;
    content: string;
    term: string;
  };
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

async function postToWebhook(payload: LeadMagnetPayload): Promise<void> {
  const webhookUrl = process.env.LEAD_MAGNET_WEBHOOK_URL?.trim();
  if (!webhookUrl) {
    throw new Error("LEAD_MAGNET_WEBHOOK_URL is not configured");
  }

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(process.env.CONTACT_WEBHOOK_BEARER_TOKEN
        ? { Authorization: `Bearer ${process.env.CONTACT_WEBHOOK_BEARER_TOKEN}` }
        : {}),
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Webhook responded with ${res.status}`);
  }
}

async function persistLocally(payload: LeadMagnetPayload): Promise<void> {
  const { appendFile, mkdir } = await import("node:fs/promises");
  const { dirname } = await import("node:path");

  const filePath = process.env.LEAD_MAGNET_LEADS_FILE?.trim() || "/tmp/phd-lead-magnet.ndjson";
  await mkdir(dirname(filePath), { recursive: true });
  await appendFile(filePath, `${JSON.stringify(payload)}\n`, "utf8");
}

export async function submitLeadMagnet(
  _prevState: LeadMagnetState,
  formData: FormData,
): Promise<LeadMagnetState> {
  try {
    const headersList = await headers();
    const ip =
      headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      headersList.get("x-real-ip") ??
      "anonymous";

    const rl = checkRateLimit(`lead-magnet:${ip}`);
    if (!rl.allowed) {
      return {
        success: false,
        message: "Too many requests. Please try again in a few minutes.",
        errors: {},
      };
    }
  } catch {
    // Fail open
  }

  const email = getString(formData, "email");
  const page = getString(formData, "page") || "unknown";

  if (!email) {
    return {
      success: false,
      message: "Please review your email.",
      errors: { email: "Email is required." },
    };
  }

  if (!EMAIL_REGEX.test(email)) {
    return {
      success: false,
      message: "Please review your email.",
      errors: { email: "Please enter a valid email address." },
    };
  }

  const payload: LeadMagnetPayload = {
    email,
    page,
    source: "cost-timeline-guide-2026",
    submittedAt: new Date().toISOString(),
    utm: {
      source: getString(formData, "utm_source"),
      medium: getString(formData, "utm_medium"),
      campaign: getString(formData, "utm_campaign"),
      content: getString(formData, "utm_content"),
      term: getString(formData, "utm_term"),
    },
  };

  const webhookUrl = process.env.LEAD_MAGNET_WEBHOOK_URL?.trim();

  if (process.env.NODE_ENV === "production" && !webhookUrl) {
    return {
      success: false,
      message: "Guide is temporarily unavailable. Please try again later.",
      errors: {},
    };
  }

  try {
    if (webhookUrl) {
      await postToWebhook(payload);
    } else {
      await persistLocally(payload);
    }
  } catch {
    return {
      success: false,
      message: "Guide is temporarily unavailable. Please try again later.",
      errors: {},
    };
  }

  return {
    success: true,
    message: "Perfect — check your inbox for the 2026 Cost & Timeline Guide.",
    errors: {},
  };
}
