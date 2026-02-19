"use server";

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

type ContactLead = {
  name: string;
  email: string;
  city: string;
  phone: string;
  message: string;
  submittedAt: string;
  source: "website-contact-form";
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getString(formData: FormData, field: string): string {
  const value = formData.get(field);
  return typeof value === "string" ? value.trim() : "";
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

async function postToWebhook(payload: ContactLead): Promise<void> {
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL?.trim();
  if (!webhookUrl) {
    throw new Error("CONTACT_WEBHOOK_URL is not configured");
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

async function persistLeadLocally(payload: ContactLead): Promise<void> {
  const { appendFile, mkdir } = await import("node:fs/promises");
  const { dirname } = await import("node:path");

  const path = process.env.CONTACT_LEADS_FILE?.trim() || "/tmp/phd-contact-leads.ndjson";
  await mkdir(dirname(path), { recursive: true });
  await appendFile(path, `${JSON.stringify(payload)}\n`, "utf8");
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const fields = {
    name: getString(formData, "name"),
    email: getString(formData, "email"),
    city: getString(formData, "city"),
    phone: getString(formData, "phone"),
    message: getString(formData, "message"),
  };

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
  };

  try {
    if (process.env.CONTACT_WEBHOOK_URL?.trim()) {
      await postToWebhook(payload);
    } else {
      await persistLeadLocally(payload);
    }
  } catch (error) {
    console.error("contact_form_delivery_failed", error);
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
