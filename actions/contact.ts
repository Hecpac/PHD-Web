"use server";

import { headers } from "next/headers";

import { checkRateLimit } from "@/lib/rate-limit";
import { isDfwCity } from "@/lib/types/content";

type ContactFormErrors = Partial<{
  name: string;
  email: string;
  city: string;
  message: string;
}>;

export type ContactFormState = {
  success: boolean;
  message: string;
  errors: ContactFormErrors;
};

export const LOT_STATUS_OPTIONS = ["have-lot", "looking-lot"] as const;
export type LotStatus = (typeof LOT_STATUS_OPTIONS)[number];

export const INVESTMENT_RANGE_OPTIONS = ["1.5-3m", "3m+"] as const;
export type InvestmentRange = (typeof INVESTMENT_RANGE_OPTIONS)[number];

type VisionBuilderErrors = Partial<{
  lotStatus: string;
  targetZone: string;
  investmentRange: string;
  name: string;
  email: string;
  message: string;
}>;

export type VisionBuilderState = {
  success: boolean;
  message: string;
  errors: VisionBuilderErrors;
};

type UTMAttribution = {
  source: string;
  medium: string;
  campaign: string;
  content: string;
  term: string;
  landingPath: string;
};

type ContactLead = {
  name: string;
  email: string;
  city: string;
  phone: string;
  message: string;
  submittedAt: string;
  source: "website-contact-form";
  utm: UTMAttribution;
};

type VisionBuilderLead = {
  lotStatus: LotStatus;
  targetZone: string;
  investmentRange: InvestmentRange;
  name: string;
  email: string;
  phone: string;
  message: string;
  submittedAt: string;
  source: "vision-builder";
  qualification: "qualified" | "nurture" | "not_fit";
  lifecycleStage: "ready_now" | "nurture";
  utm: UTMAttribution;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CHEAP_REMODEL_REGEX = /\b(remodel|renovation|kitchen|bath|bathroom|cheap|budget)\b/i;

function getString(formData: FormData, field: string): string {
  const value = formData.get(field);
  return typeof value === "string" ? value.trim() : "";
}

function extractUtm(formData: FormData): UTMAttribution {
  return {
    source: getString(formData, "utm_source"),
    medium: getString(formData, "utm_medium"),
    campaign: getString(formData, "utm_campaign"),
    content: getString(formData, "utm_content"),
    term: getString(formData, "utm_term"),
    landingPath: getString(formData, "utm_landing_path"),
  };
}

function validateForm(fields: {
  name: string;
  email: string;
  city: string;
  message: string;
}): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!fields.name) {
    errors.name = "Name is required.";
  } else if (fields.name.length < 2) {
    errors.name = "Please enter your full name.";
  }

  if (!fields.email) {
    errors.email = "Email is required.";
  } else if (!EMAIL_REGEX.test(fields.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!fields.city) {
    errors.city = "Please select a DFW city.";
  } else if (!isDfwCity(fields.city)) {
    errors.city = "We currently accept projects in DFW only.";
  }

  if (!fields.message) {
    errors.message = "Project goals are required.";
  } else if (fields.message.length < 20) {
    errors.message = "Please include a bit more project detail.";
  }

  return errors;
}

function isLotStatus(value: string): value is LotStatus {
  return LOT_STATUS_OPTIONS.includes(value as LotStatus);
}

function isInvestmentRange(value: string): value is InvestmentRange {
  return INVESTMENT_RANGE_OPTIONS.includes(value as InvestmentRange);
}

function validateVisionBuilder(fields: {
  lotStatus: string;
  targetZone: string;
  investmentRange: string;
  name: string;
  email: string;
  message: string;
}): VisionBuilderErrors {
  const errors: VisionBuilderErrors = {};

  if (!isLotStatus(fields.lotStatus)) {
    errors.lotStatus = "Please choose your lot status.";
  }

  if (!fields.targetZone) {
    errors.targetZone = "Please select your target zone.";
  } else if (!isDfwCity(fields.targetZone)) {
    errors.targetZone = "We currently focus on Dallas-Fort Worth only.";
  }

  if (!isInvestmentRange(fields.investmentRange)) {
    errors.investmentRange = "Please choose your investment range.";
  }

  if (!fields.name || fields.name.length < 2) {
    errors.name = "Please enter your full name.";
  }

  if (!fields.email) {
    errors.email = "Email is required.";
  } else if (!EMAIL_REGEX.test(fields.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (fields.message && fields.message.length < 12) {
    errors.message = "Add a bit more detail so we can route your inquiry.";
  }

  return errors;
}

function classifyVisionLead(fields: {
  lotStatus: LotStatus;
  investmentRange: InvestmentRange;
  message: string;
}): VisionBuilderLead["qualification"] {
  const isCheapRemodel = CHEAP_REMODEL_REGEX.test(fields.message) && fields.investmentRange === "1.5-3m";

  if (isCheapRemodel) {
    return "not_fit";
  }

  if (fields.lotStatus === "looking-lot") {
    return "nurture";
  }

  return "qualified";
}

async function postToWebhook(
  payload: ContactLead | VisionBuilderLead,
  options?: { urlEnvKey?: "CONTACT_WEBHOOK_URL" | "LEAD_MAGNET_WEBHOOK_URL" | "VISION_BUILDER_WEBHOOK_URL" },
): Promise<void> {
  const urlEnvKey = options?.urlEnvKey ?? "CONTACT_WEBHOOK_URL";
  const webhookUrl = process.env[urlEnvKey]?.trim();

  if (!webhookUrl) {
    throw new Error(`${urlEnvKey} is not configured`);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
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
      signal: controller.signal,
    });

    if (!res.ok) {
      throw new Error(`Webhook responded with ${res.status}`);
    }
  } finally {
    clearTimeout(timeout);
  }
}

async function persistLeadLocally(
  payload: ContactLead | VisionBuilderLead,
  options?: { pathEnvKey?: "CONTACT_LEADS_FILE" | "VISION_BUILDER_LEADS_FILE" },
): Promise<void> {
  const { appendFile, mkdir } = await import("node:fs/promises");
  const { dirname } = await import("node:path");

  const pathEnvKey = options?.pathEnvKey ?? "CONTACT_LEADS_FILE";
  const fallbackPath = pathEnvKey === "VISION_BUILDER_LEADS_FILE"
    ? "/tmp/phd-vision-builder-leads.ndjson"
    : "/tmp/phd-contact-leads.ndjson";

  const path = process.env[pathEnvKey]?.trim() || fallbackPath;
  await mkdir(dirname(path), { recursive: true });
  await appendFile(path, `${JSON.stringify(payload)}\n`, "utf8");
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // Rate limit: 5 submissions per 10 minutes per IP (per warm instance).
  // Fails open if headers() is unavailable.
  try {
    const headersList = await headers();
    const ip =
      headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      headersList.get("x-real-ip") ??
      "anonymous";
    const rl = checkRateLimit(`contact:${ip}`);
    if (!rl.allowed) {
      return {
        success: false,
        message: "Too many submissions. Please wait a few minutes and try again.",
        errors: {},
      };
    }
  } catch {
    // Fail open — don't block legitimate users due to a headers() error
  }

  const fields = {
    name: getString(formData, "name"),
    email: getString(formData, "email"),
    city: getString(formData, "city"),
    phone: getString(formData, "phone"),
    message: getString(formData, "message"),
  };
  const utm = extractUtm(formData);

  const errors = validateForm(fields);

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: "Please review the highlighted fields and try again.",
      errors,
    };
  }

  const payload: ContactLead = {
    ...fields,
    submittedAt: new Date().toISOString(),
    source: "website-contact-form",
    utm,
  };

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL?.trim();

  // Guard: in production, a missing webhook is a misconfiguration — fail explicitly.
  // Persisting to /tmp is ephemeral on serverless and must never run in production.
  if (process.env.NODE_ENV === "production" && !webhookUrl) {
    console.error(
      JSON.stringify({
        level: "error",
        event: "contact_delivery_misconfigured",
        message: "CONTACT_WEBHOOK_URL is not set in the production environment",
        timestamp: new Date().toISOString(),
      })
    );
    return {
      success: false,
      message: "We couldn't submit your brief right now. Please try again or call us directly.",
      errors: {},
    };
  }

  try {
    if (webhookUrl) {
      await postToWebhook(payload);
    } else {
      // dev / test only — /tmp is ephemeral and unsuitable for production
      await persistLeadLocally(payload);
    }
  } catch (error) {
    console.error(
      JSON.stringify({
        level: "error",
        event: "contact_delivery_failed",
        error: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString(),
      })
    );
    return {
      success: false,
      message: "We couldn't submit your brief right now. Please try again or call us directly.",
      errors: {},
    };
  }

  return {
    success: true,
    message: "Thanks. Your project brief was received. We will follow up within 1 business day.",
    errors: {},
  };
}

export async function submitVisionBuilder(
  _prevState: VisionBuilderState,
  formData: FormData,
): Promise<VisionBuilderState> {
  try {
    const headersList = await headers();
    const ip =
      headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      headersList.get("x-real-ip") ??
      "anonymous";
    const rl = checkRateLimit(`vision-builder:${ip}`);

    if (!rl.allowed) {
      return {
        success: false,
        message: "Too many submissions. Please wait a few minutes and try again.",
        errors: {},
      };
    }
  } catch {
    // Fail open
  }

  const fields = {
    lotStatus: getString(formData, "lotStatus"),
    targetZone: getString(formData, "targetZone"),
    investmentRange: getString(formData, "investmentRange"),
    name: getString(formData, "name"),
    email: getString(formData, "email"),
    phone: getString(formData, "phone"),
    message: getString(formData, "message"),
  };
  const utm = extractUtm(formData);

  const errors = validateVisionBuilder(fields);

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: "Please review the highlighted fields and try again.",
      errors,
    };
  }

  const lotStatus = fields.lotStatus as LotStatus;
  const investmentRange = fields.investmentRange as InvestmentRange;

  const qualification = classifyVisionLead({
    lotStatus,
    investmentRange,
    message: fields.message,
  });

  const payload: VisionBuilderLead = {
    lotStatus,
    targetZone: fields.targetZone,
    investmentRange,
    name: fields.name,
    email: fields.email,
    phone: fields.phone,
    message: fields.message,
    submittedAt: new Date().toISOString(),
    source: "vision-builder",
    qualification,
    lifecycleStage: lotStatus === "looking-lot" ? "nurture" : "ready_now",
    utm,
  };

  const webhookUrl = process.env.VISION_BUILDER_WEBHOOK_URL?.trim() || process.env.CONTACT_WEBHOOK_URL?.trim();

  if (process.env.NODE_ENV === "production" && !webhookUrl) {
    console.error(
      JSON.stringify({
        level: "error",
        event: "vision_builder_delivery_misconfigured",
        message: "VISION_BUILDER_WEBHOOK_URL and CONTACT_WEBHOOK_URL are not set in production.",
        timestamp: new Date().toISOString(),
      }),
    );

    return {
      success: false,
      message: "We couldn't submit your vision right now. Please try again.",
      errors: {},
    };
  }

  try {
    if (webhookUrl) {
      const urlEnvKey = process.env.VISION_BUILDER_WEBHOOK_URL?.trim()
        ? "VISION_BUILDER_WEBHOOK_URL"
        : "CONTACT_WEBHOOK_URL";
      await postToWebhook(payload, { urlEnvKey });
    } else {
      await persistLeadLocally(payload, { pathEnvKey: "VISION_BUILDER_LEADS_FILE" });
    }
  } catch (error) {
    console.error(
      JSON.stringify({
        level: "error",
        event: "vision_builder_delivery_failed",
        error: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString(),
      }),
    );

    return {
      success: false,
      message: "We couldn't submit your vision right now. Please try again.",
      errors: {},
    };
  }

  if (qualification === "not_fit") {
    return {
      success: true,
      message:
        "Thanks for sharing your goals. Your inquiry is better suited for our partner remodeling network, and we'll route it accordingly.",
      errors: {},
    };
  }

  if (payload.lifecycleStage === "nurture") {
    return {
      success: true,
      message:
        "Great start. You're in our early-planning track—expect a planning guide and follow-up to help with lot + timeline decisions.",
      errors: {},
    };
  }

  return {
    success: true,
    message: "Excellent. Your brief is qualified and our team will contact you within 1 business day.",
    errors: {},
  };
}
