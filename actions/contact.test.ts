import { beforeEach, describe, expect, it, vi } from "vitest";

// Must be hoisted before the action is imported so vitest intercepts
// the dynamic `await import("node:fs/promises")` inside persistLeadLocally.
vi.mock("node:fs/promises", () => ({
  appendFile: vi.fn().mockResolvedValue(undefined),
  mkdir: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("node:path", () => ({
  dirname: (p: string) => p.replace(/\/[^/]+$/, "") || "/",
}));

// next/headers is unavailable outside the Next.js runtime; mock it for tests.
vi.mock("next/headers", () => ({
  headers: vi.fn().mockResolvedValue({
    get: vi.fn().mockReturnValue("127.0.0.1"),
  }),
}));

// Import after mocks are registered
import { submitContactForm, type ContactFormState } from "./contact";
import * as fsPromises from "node:fs/promises";

// ─── helpers ────────────────────────────────────────────────────────────────

const PREV_STATE: ContactFormState = { success: false, message: "", errors: {} };

const VALID_FIELDS: Record<string, string> = {
  name: "Jane Smith",
  email: "jane@example.com",
  city: "Dallas",
  phone: "",
  message: "We want to build a modern custom home in Preston Hollow with a courtyard.",
};

function makeFormData(fields: Record<string, string>): FormData {
  const fd = new FormData();
  for (const [key, value] of Object.entries(fields)) {
    fd.append(key, value);
  }
  return fd;
}

// ─── tests ──────────────────────────────────────────────────────────────────

describe("submitContactForm delivery", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    delete process.env.CONTACT_WEBHOOK_URL;
  });

  it("returns controlled error in production when CONTACT_WEBHOOK_URL is missing — no local write", async () => {
    vi.stubEnv("NODE_ENV", "production");

    const result = await submitContactForm(PREV_STATE, makeFormData(VALID_FIELDS));

    vi.unstubAllEnvs();

    expect(result.success).toBe(false);
    expect(result.message).toMatch(/couldn't submit/i);
    // /tmp must never be touched in production
    expect(vi.mocked(fsPromises.appendFile)).not.toHaveBeenCalled();
  });

  it("falls back to local file in non-production when CONTACT_WEBHOOK_URL is missing", async () => {
    // vitest sets NODE_ENV = "test" — any non-production env allows the fallback
    const result = await submitContactForm(PREV_STATE, makeFormData(VALID_FIELDS));

    expect(result.success).toBe(true);
    expect(vi.mocked(fsPromises.appendFile)).toHaveBeenCalledOnce();
  });

  it("returns error state when webhook responds with non-2xx status", async () => {
    process.env.CONTACT_WEBHOOK_URL = "https://hooks.example.com/phd-test";

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(null, { status: 500, statusText: "Internal Server Error" }))
    );

    const result = await submitContactForm(PREV_STATE, makeFormData(VALID_FIELDS));

    vi.unstubAllGlobals();

    expect(result.success).toBe(false);
    expect(result.message).toMatch(/couldn't submit/i);
    // local write must not be triggered when webhook is configured
    expect(vi.mocked(fsPromises.appendFile)).not.toHaveBeenCalled();
  });
});
