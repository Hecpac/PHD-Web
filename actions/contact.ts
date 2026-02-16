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

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const fields = {
    name: getString(formData, "name"),
    email: getString(formData, "email"),
    city: getString(formData, "city"),
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

  return {
    success: true,
    message: "Thanks. Your project brief was received. We will follow up within 1 business day.",
    errors: {},
  };
}
