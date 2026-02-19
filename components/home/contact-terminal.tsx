"use client";

import { useActionState, useEffect, useId, useRef } from "react";
import { ArrowUpRight, BadgeCheck, Clock3, MapPin } from "lucide-react";

import { submitContactForm, type ContactFormState } from "@/actions/contact";
import { Container } from "@/components/layout/container";
import { CtaLink } from "@/components/ui/cta-link";
import { SectionHeading } from "@/components/ui/section-heading";
import { trackEvent } from "@/lib/analytics/events";
import { getCtaConfig } from "@/lib/config/site";
import { DFW_CITIES } from "@/lib/types/content";
import { cn } from "@/lib/utils";

type ContactTerminalProps = {
  id?: string;
  withHeading?: boolean;
};

const initialState: ContactFormState = {
  success: false,
  message: "",
  errors: {},
};

export function ContactTerminal({ id = "contact", withHeading = true }: ContactTerminalProps) {
  const startedRef = useRef(false);
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);

  const formRef = useRef<HTMLFormElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLSelectElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const { phoneDisplay, phoneHref, scheduleUrl } = getCtaConfig();

  const reactId = useId();
  const idPrefix = `${id}-${reactId}`;
  const nameErrorId = `${idPrefix}-name-error`;
  const emailErrorId = `${idPrefix}-email-error`;
  const cityErrorId = `${idPrefix}-city-error`;
  const messageErrorId = `${idPrefix}-message-error`;
  const formStatusId = `${idPrefix}-status`;

  const cityHasError = Boolean(state.errors?.city);
  const inputClass =
    "w-full min-h-11 rounded-lg border border-line bg-canvas px-3.5 py-3 text-sm text-ink placeholder:text-muted focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface";

  const onFormFocus = () => {
    if (startedRef.current) {
      return;
    }
    startedRef.current = true;
    trackEvent("form_start");
  };

  // Analytics side-effects based on server action result
  useEffect(() => {
    if (state.message) {
      if (state.success) {
        trackEvent("form_submit", {
          status: "captured",
          message: state.message,
        });
        // Reset form on success
        formRef.current?.reset();
        startedRef.current = false;
      } else {
        trackEvent("form_error", {
          message: state.message,
          errors: state.errors,
        });

        const firstInvalidField =
          (state.errors?.name && nameRef.current) ||
          (state.errors?.email && emailRef.current) ||
          (state.errors?.city && cityRef.current) ||
          (state.errors?.message && messageRef.current) ||
          null;

        firstInvalidField?.focus();
      }
    }
  }, [state]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className="section-shell section-intake-gradient border-t border-line"
    >
      <Container swiss className="space-y-7 md:space-y-8">
        {withHeading ? (
          <SectionHeading
            eyebrow="Project Intake"
            title="Start your DFW project intake"
            description="Share your scope, timeline, and location. We review every brief with a decision-gate lens before recommending next steps."
          />
        ) : null}

        <div className="grid gap-5 md:gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,1.9fr)]">
          <aside className="rounded-xl border border-line/95 bg-surface/94 p-5 sm:p-6 md:p-7">
            <p className="font-mono text-xs uppercase tracking-[0.05em] text-muted">Intake Workflow</p>
            <h3 className="mt-3 text-2xl font-bold tracking-tight text-ink">Fast, clear, and decision-ready.</h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              We review your brief against scope, site constraints, and budget signals before the first call.
            </p>

            <ol className="mt-5 space-y-2.5 sm:mt-6 sm:space-y-3">
              {[
                "Submit project brief and city.",
                "Receive fit-check and follow-up call.",
                "Get next-step path with decision gates.",
              ].map((step, index) => (
                <li key={step} className="flex items-start gap-3 rounded-lg border border-line/90 bg-canvas/92 p-3">
                  <span className="font-mono text-xs font-bold text-accent">0{index + 1}</span>
                  <span className="text-sm text-ink">{step}</span>
                </li>
              ))}
            </ol>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-canvas px-2.5 py-1 text-xs text-muted">
                <Clock3 className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                Typical reply in 1 business day
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-canvas px-2.5 py-1 text-xs text-muted">
                <MapPin className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                DFW-only intake policy
              </span>
            </div>

            <div className="mt-6 border-t border-line/85 pt-4">
              <p className="text-xs text-muted">Prefer to talk first?</p>
              <CtaLink
                href={phoneHref}
                eventName="cta_call_click"
                variant="ghost"
                className="mt-2 min-h-11 rounded-md px-2 text-ink/92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/35 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                Call {phoneDisplay} <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
              </CtaLink>
            </div>
          </aside>

          <div className="rounded-xl border border-line/95 bg-surface/96 p-5 sm:p-6 md:p-8">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-line pb-3 sm:mb-5 sm:pb-4">
              <p className="text-xs text-muted">
                <span className="text-accent" aria-hidden="true">*</span> Required fields
              </p>
              <p className="inline-flex items-center gap-1.5 text-xs text-muted">
                <BadgeCheck className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                DFW city validation enabled
              </p>
            </div>

            <form ref={formRef} action={formAction} className="grid gap-4 sm:gap-5 md:grid-cols-2" onFocus={onFormFocus} noValidate>
              <label className="space-y-1.5 text-sm">
                <span className="font-mono text-xs uppercase tracking-[0.05em] text-muted">Full name <span className="text-accent" aria-hidden="true">*</span></span>
                <input
                  ref={nameRef}
                  name="name"
                  autoComplete="name"
                  inputMode="text"
                  enterKeyHint="next"
                  required
                  aria-required="true"
                  aria-invalid={Boolean(state.errors?.name) || undefined}
                  aria-describedby={state.errors?.name ? nameErrorId : undefined}
                  className={cn(inputClass, state.errors?.name && "border-danger")}
                  placeholder="Jane Smith…"
                />
                {state.errors?.name ? (
                  <p id={nameErrorId} className="text-xs text-danger">
                    {state.errors.name}
                  </p>
                ) : null}
              </label>

              <label className="space-y-1.5 text-sm">
                <span className="font-mono text-xs uppercase tracking-[0.05em] text-muted">Email <span className="text-accent" aria-hidden="true">*</span></span>
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
                  placeholder="jane@example.com…"
                />
                {state.errors?.email ? (
                  <p id={emailErrorId} className="text-xs text-danger">
                    {state.errors.email}
                  </p>
                ) : null}
              </label>

              <label className="space-y-1.5 text-sm">
                <span className="font-mono text-xs uppercase tracking-[0.05em] text-muted">DFW city <span className="text-accent" aria-hidden="true">*</span></span>
                <select
                  ref={cityRef}
                  name="city"
                  defaultValue=""
                  autoComplete="address-level2"
                  required
                  aria-required="true"
                  aria-invalid={cityHasError || undefined}
                  aria-describedby={cityHasError ? cityErrorId : undefined}
                  className={cn(inputClass, cityHasError && "border-danger")}
                >
                  <option value="" disabled>
                    Select city
                  </option>
                  {DFW_CITIES.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </label>

              <label className="space-y-1.5 text-sm">
                <span className="font-mono text-xs uppercase tracking-[0.05em] text-muted">Phone (optional)</span>
                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  enterKeyHint="next"
                  className={inputClass}
                  placeholder="(469) 555-0101"
                />
              </label>

              <label className="space-y-1.5 text-sm md:col-span-2">
                <span className="font-mono text-xs uppercase tracking-[0.05em] text-muted">Project goals <span className="text-accent" aria-hidden="true">*</span></span>
                <textarea
                  ref={messageRef}
                  name="message"
                  required
                  aria-required="true"
                  aria-invalid={Boolean(state.errors?.message) || undefined}
                  aria-describedby={state.errors?.message ? messageErrorId : undefined}
                  rows={6}
                  enterKeyHint="send"
                  className={cn(inputClass, state.errors?.message && "border-danger")}
                  placeholder="Tell us lot status, target timeline, style direction, and budget guardrails…"
                />
                {state.errors?.message ? (
                  <p id={messageErrorId} className="text-xs text-danger">
                    {state.errors.message}
                  </p>
                ) : null}
              </label>

              <div className="md:col-span-2">
                <div className="space-y-3">
                  <button
                    type="submit"
                    disabled={isPending}
                    aria-label="Submit project brief"
                    className="inline-flex w-full min-h-12 items-center justify-center rounded-lg border border-accent bg-accent px-6 py-3 text-sm font-bold uppercase tracking-[0.05em] text-on-accent shadow-[0_10px_20px_rgb(0_0_0/0.18)] transition-colors duration-150 hover:bg-accent-hover active:bg-accent-pressed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-surface sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isPending ? "Submitting…" : "Send Project Brief"}
                  </button>
                  <p className="text-xs text-muted">
                    No spam. No off-market outreach. DFW project inquiries only.
                  </p>
                  <div className="flex flex-wrap items-center gap-2.5 rounded-lg border border-line/70 bg-canvas/45 p-2 sm:gap-3">
                    <CtaLink
                      href={scheduleUrl}
                      target="_blank"
                      rel="noreferrer"
                      eventName="cta_schedule_click"
                      variant="secondary"
                      className="min-h-11 rounded-md border-line/80 bg-surface/78 px-4 py-2 text-sm text-ink/92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/35 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                    >
                      Schedule Instead
                    </CtaLink>
                    <CtaLink
                      href={phoneHref}
                      eventName="cta_call_click"
                      variant="ghost"
                      className="min-h-11 rounded-md px-2 text-sm text-ink/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                    >
                      Call {phoneDisplay}
                    </CtaLink>
                  </div>
                </div>
                <p className="mt-3 text-xs text-muted">
                  By submitting, you confirm this project is located in Dallas-Fort Worth.
                </p>
              </div>
            </form>

            <div className="mt-5 min-h-[52px]">
              {state.message ? (
                <p
                  id={formStatusId}
                  className={`rounded-lg border p-3 text-sm ${
                    state.success
                      ? "border-accent-soft bg-accent-soft text-accent-soft-ink"
                      : "border-danger bg-danger-soft text-danger-soft-ink"
                  }`}
                  role={!state.success ? "alert" : "status"}
                  aria-live={!state.success ? "assertive" : "polite"}
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
