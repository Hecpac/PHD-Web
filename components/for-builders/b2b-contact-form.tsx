"use client";

import { useActionState, useEffect, useId, useRef, useState } from "react";
import { ArrowUpRight, BadgeCheck } from "lucide-react";

import { useTranslations } from "next-intl";

import { submitContactForm, type ContactFormState } from "@/actions/contact";
import { Container } from "@/components/layout/container";
import { CtaLink } from "@/components/ui/cta-link";
import { SectionHeading } from "@/components/ui/section-heading";
import { trackEvent } from "@/lib/analytics/events";
import { getCtaConfig } from "@/lib/config/site";
import { cn } from "@/lib/utils";

const initialState: ContactFormState = {
  success: false,
  message: "",
  errors: {},
};

export function B2BContactForm() {
  const t = useTranslations("forBuildersPage");
  const startedRef = useRef(false);
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);

  const VOLUME_OPTIONS = [
    t("formVolume1"),
    t("formVolume2"),
    t("formVolume3"),
    t("formVolume4"),
  ];

  const SERVICE_OPTIONS = [
    { label: t("formServiceFloorPlans"), name: "service_floor_plans" },
    { label: t("formService3dRenders"), name: "service_3d_renders" },
    { label: t("formServiceConstructionDocs"), name: "service_construction_docs" },
    { label: t("formServicePermitSupport"), name: "service_permit_support" },
    { label: t("formServiceDesignScratch"), name: "service_design_scratch" },
  ];
  const [utm] = useState(() => {
    if (typeof window === "undefined") {
      return { source: "", medium: "", campaign: "", content: "", term: "", landingPath: "" };
    }

    return {
      source: window.sessionStorage.getItem("utm_source") || "",
      medium: window.sessionStorage.getItem("utm_medium") || "",
      campaign: window.sessionStorage.getItem("utm_campaign") || "",
      content: window.sessionStorage.getItem("utm_content") || "",
      term: window.sessionStorage.getItem("utm_term") || "",
      landingPath: window.sessionStorage.getItem("utm_landing_path") || "",
    };
  });

  const formRef = useRef<HTMLFormElement>(null);
  const companyRef = useRef<HTMLInputElement>(null);
  const contactRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const { phoneDisplay, phoneHref } = getCtaConfig();

  const reactId = useId();
  const idPrefix = `b2b-contact-${reactId}`;
  const nameErrorId = `${idPrefix}-name-error`;
  const emailErrorId = `${idPrefix}-email-error`;
  const cityErrorId = `${idPrefix}-city-error`;
  const messageErrorId = `${idPrefix}-message-error`;
  const formStatusId = `${idPrefix}-status`;

  const inputClass =
    "w-full min-h-11 rounded-lg border border-line bg-canvas px-3.5 py-3 text-sm text-ink placeholder:text-muted focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface";

  const onFormFocus = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    trackEvent("form_start");
  };

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        trackEvent("submit_contact", {
          form: "b2b_contact",
          status: "captured",
          message: state.message,
        });
        formRef.current?.reset();
        startedRef.current = false;
      } else {
        trackEvent("form_error", { message: state.message, errors: state.errors });
        const firstInvalid =
          (state.errors?.name && companyRef.current) ||
          (state.errors?.email && emailRef.current) ||
          (state.errors?.message && messageRef.current) ||
          null;
        firstInvalid?.focus();
      }
    }
  }, [state]);

  /**
   * Intercept form submission to map B2B fields into the existing
   * `submitContactForm` shape without backend changes.
   */
  function handleSubmit(formData: FormData) {
    const company = (formData.get("companyName") as string)?.trim() ?? "";
    const contact = (formData.get("contactName") as string)?.trim() ?? "";
    const volume = (formData.get("volume") as string)?.trim() ?? "";
    const details = (formData.get("projectDetails") as string)?.trim() ?? "";

    // Collect checked services
    const selectedServices = SERVICE_OPTIONS
      .filter((opt) => formData.get(opt.name) === "yes")
      .map((opt) => opt.label);
    const servicesStr = selectedServices.length > 0 ? selectedServices.join(", ") : "Not specified";

    // Map to existing server action fields
    const mapped = new FormData();
    mapped.set("name", contact ? `${contact} (${company})` : company);
    mapped.set("email", (formData.get("email") as string) ?? "");
    mapped.set("phone", (formData.get("phone") as string) ?? "");
    mapped.set("city", "Dallas");
    mapped.set("message", `[B2B Lead | Volume: ${volume} | Services: ${servicesStr}] ${details}`);

    // Preserve UTM
    mapped.set("utm_source", formData.get("utm_source") as string ?? "");
    mapped.set("utm_medium", formData.get("utm_medium") as string ?? "");
    mapped.set("utm_campaign", formData.get("utm_campaign") as string ?? "");
    mapped.set("utm_content", formData.get("utm_content") as string ?? "");
    mapped.set("utm_term", formData.get("utm_term") as string ?? "");
    mapped.set("utm_landing_path", formData.get("utm_landing_path") as string ?? "");

    formAction(mapped);
  }

  return (
    <section
      id="b2b-contact"
      className="section-shell section-intake-gradient border-t border-line"
    >
      <Container swiss className="space-y-8 md:space-y-12">
        <SectionHeading
          eyebrow={t("formEyebrow")}
          title={t("formTitle")}
          description={t("formDescription")}
        />

        <div className="grid gap-6 md:gap-8 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,1.9fr)]">
          {/* Left sidebar */}
          <aside className="rounded-xl border border-line/95 bg-surface/94 p-5 sm:p-6 md:p-7">
            <p className="font-mono text-xs uppercase tracking-[0.05em] text-muted">
              {t("formSidebarEyebrow")}
            </p>
            <h3 className="mt-3 type-h3-standard tracking-tight text-ink">
              {t("formSidebarTitle")}
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              {t("formSidebarDesc")}
            </p>

            <ol className="mt-6 space-y-3">
              {[
                t("formStep1"),
                t("formStep2"),
                t("formStep3"),
              ].map((step, index) => (
                <li
                  key={step}
                  className="flex items-start gap-3 rounded-lg border border-line/90 bg-canvas/92 p-3"
                >
                  <span className="font-mono text-xs font-bold text-accent">0{index + 1}</span>
                  <span className="text-sm text-ink">{step}</span>
                </li>
              ))}
            </ol>

            <div className="mt-6 border-t border-line/85 pt-4">
              <p className="text-xs text-muted">{t("formPreferTalk")}</p>
              <CtaLink
                href={phoneHref}
                eventName="cta_call_click"
                eventPayload={{ source: "b2b_form" }}
                variant="ghost"
                className="mt-2 min-h-11 rounded-md px-2 text-ink/92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/35 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                {phoneDisplay} <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
              </CtaLink>
            </div>
          </aside>

          {/* Form */}
          <div className="rounded-xl border border-line/95 bg-surface/96 p-5 sm:p-6 md:p-8">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-line pb-3 sm:mb-6 sm:pb-4">
              <p className="text-xs text-muted">
                <span className="text-accent" aria-hidden="true">*</span> {t("formRequiredFields")}
              </p>
              <p className="inline-flex items-center gap-1.5 text-xs text-muted">
                <BadgeCheck className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                {t("formBuilderPartner")}
              </p>
            </div>

            <form
              ref={formRef}
              action={handleSubmit}
              className="grid gap-4 sm:gap-6 md:grid-cols-2"
              onFocus={onFormFocus}
              noValidate
            >
              <input type="hidden" name="utm_source" value={utm.source} />
              <input type="hidden" name="utm_medium" value={utm.medium} />
              <input type="hidden" name="utm_campaign" value={utm.campaign} />
              <input type="hidden" name="utm_content" value={utm.content} />
              <input type="hidden" name="utm_term" value={utm.term} />
              <input type="hidden" name="utm_landing_path" value={utm.landingPath} />

              <label className="space-y-1.5 text-sm">
                <span className="font-mono text-xs uppercase tracking-[0.05em] text-muted">
                  {t("formCompanyName")} <span className="text-accent" aria-hidden="true">*</span>
                </span>
                <input
                  ref={companyRef}
                  name="companyName"
                  autoComplete="organization"
                  inputMode="text"
                  enterKeyHint="next"
                  required
                  aria-required="true"
                  aria-invalid={Boolean(state.errors?.name) || undefined}
                  aria-describedby={state.errors?.name ? nameErrorId : undefined}
                  className={cn(inputClass, state.errors?.name && "border-danger")}
                  placeholder={t("formCompanyPlaceholder")}
                />
                {state.errors?.name ? (
                  <p id={nameErrorId} className="text-xs text-danger">{state.errors.name}</p>
                ) : null}
              </label>

              <label className="space-y-1.5 text-sm">
                <span className="font-mono text-xs uppercase tracking-[0.05em] text-muted">
                  {t("formContactName")} <span className="text-accent" aria-hidden="true">*</span>
                </span>
                <input
                  ref={contactRef}
                  name="contactName"
                  autoComplete="name"
                  inputMode="text"
                  enterKeyHint="next"
                  required
                  aria-required="true"
                  className={inputClass}
                  placeholder={t("formContactPlaceholder")}
                />
              </label>

              <label className="space-y-1.5 text-sm">
                <span className="font-mono text-xs uppercase tracking-[0.05em] text-muted">
                  {t("formEmail")} <span className="text-accent" aria-hidden="true">*</span>
                </span>
                <input
                  ref={emailRef}
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  autoCapitalize="none"
                  spellCheck={false}
                  enterKeyHint="next"
                  required
                  aria-required="true"
                  aria-invalid={Boolean(state.errors?.email) || undefined}
                  aria-describedby={state.errors?.email ? emailErrorId : undefined}
                  className={cn(inputClass, state.errors?.email && "border-danger")}
                  placeholder={t("formEmailPlaceholder")}
                />
                {state.errors?.email ? (
                  <p id={emailErrorId} className="text-xs text-danger">{state.errors.email}</p>
                ) : null}
              </label>

              <label className="space-y-1.5 text-sm">
                <span className="font-mono text-xs uppercase tracking-[0.05em] text-muted">
                  {t("formPhoneOptional")}
                </span>
                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  enterKeyHint="next"
                  className={inputClass}
                  placeholder={t("formPhonePlaceholder")}
                />
              </label>

              <label className="space-y-1.5 text-sm">
                <span className="font-mono text-xs uppercase tracking-[0.05em] text-muted">
                  {t("formMonthlyVolume")} <span className="text-accent" aria-hidden="true">*</span>
                </span>
                <select
                  name="volume"
                  defaultValue=""
                  required
                  aria-required="true"
                  aria-invalid={Boolean(state.errors?.city) || undefined}
                  aria-describedby={state.errors?.city ? cityErrorId : undefined}
                  className={cn(inputClass, state.errors?.city && "border-danger")}
                >
                  <option value="" disabled>{t("formSelectVolume")}</option>
                  {VOLUME_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                {state.errors?.city ? (
                  <p id={cityErrorId} className="text-xs text-danger">{state.errors.city}</p>
                ) : null}
              </label>

              <fieldset className="space-y-2 md:col-span-2">
                <legend className="font-mono text-xs uppercase tracking-[0.05em] text-muted">
                  {t("formServicesNeeded")}
                </legend>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {SERVICE_OPTIONS.map((opt) => (
                    <label
                      key={opt.name}
                      className="flex cursor-pointer items-center gap-2 rounded-lg border border-line px-3 py-2.5 text-sm text-ink transition-colors has-[:checked]:border-accent has-[:checked]:bg-accent/5"
                    >
                      <input
                        type="checkbox"
                        name={opt.name}
                        value="yes"
                        className="h-4 w-4 rounded border-line text-accent accent-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <label className="space-y-1.5 text-sm md:col-span-2">
                <span className="font-mono text-xs uppercase tracking-[0.05em] text-muted">
                  {t("formProjectDetails")} <span className="text-accent" aria-hidden="true">*</span>
                </span>
                <textarea
                  ref={messageRef}
                  name="projectDetails"
                  required
                  aria-required="true"
                  aria-invalid={Boolean(state.errors?.message) || undefined}
                  aria-describedby={state.errors?.message ? messageErrorId : undefined}
                  rows={5}
                  enterKeyHint="send"
                  className={cn(inputClass, state.errors?.message && "border-danger")}
                  placeholder={t("formProjectPlaceholder")}
                />
                {state.errors?.message ? (
                  <p id={messageErrorId} className="text-xs text-danger">{state.errors.message}</p>
                ) : null}
              </label>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={isPending}
                  aria-label={t("formSubmitAriaLabel")}
                  className="inline-flex w-full min-h-12 items-center justify-center rounded-lg border border-accent bg-accent px-6 py-3 text-sm font-bold uppercase tracking-[0.05em] text-on-accent shadow-[0_10px_20px_rgb(0_0_0/0.18)] transition-colors duration-150 hover:bg-accent-hover active:bg-accent-pressed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-surface sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPending ? t("formSubmitting") : t("formRequestQuote")}
                </button>
                <p className="mt-3 text-xs text-muted">
                  {t("formResponseNote")}
                </p>
              </div>
            </form>

            <div className="mt-6 min-h-[52px]">
              {state.message ? (
                <p
                  id={formStatusId}
                  className={`rounded-lg border p-3 text-sm ${
                    state.success
                      ? "border-accent-soft bg-accent-soft text-accent-soft-ink"
                      : "border-danger bg-danger-soft text-danger-soft-ink"
                  }`}
                  role={!state.success ? "alert" : "status"}
                  aria-live="polite"
                >
                  {state.message}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
