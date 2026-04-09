"use client";

import { useActionState, useEffect, useMemo, useState } from "react";

import { submitVisionBuilder, type VisionBuilderState } from "@/actions/contact";
import { CtaLink } from "@/components/ui/cta-link";
import { trackEvent } from "@/lib/analytics/events";
import { getCtaConfig } from "@/lib/config/site";
import { SERVICE_AREA_CITIES } from "@/lib/types/content";
import { cn } from "@/lib/utils";

const initialState: VisionBuilderState = {
  success: false,
  message: "",
  errors: {},
};

const LOT_STATUS_OPTIONS = ["have-lot", "looking-lot"] as const;
const INVESTMENT_RANGE_OPTIONS = ["1.5-3m", "3m+"] as const;

const stepTitles = [
  "Lot status",
  "Target zone",
  "Investment range",
  "Contact details",
] as const;

const lotLabels: Record<(typeof LOT_STATUS_OPTIONS)[number], string> = {
  "have-lot": "I already have a lot",
  "looking-lot": "I’m still looking for land",
};

const investmentLabels: Record<(typeof INVESTMENT_RANGE_OPTIONS)[number], string> = {
  "1.5-3m": "$1.5M – $3M",
  "3m+": "$3M+",
};

const inputClass =
  "w-full min-h-11 rounded-lg border border-line bg-canvas px-3.5 py-3 text-sm text-ink placeholder:text-muted focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface";

export function MultiStepForm() {
  const [step, setStep] = useState(0);
  const [started, setStarted] = useState(false);
  const [lotStatus, setLotStatus] = useState<(typeof LOT_STATUS_OPTIONS)[number] | "">("");
  const [targetZone, setTargetZone] = useState("");
  const [investmentRange, setInvestmentRange] = useState<(typeof INVESTMENT_RANGE_OPTIONS)[number] | "">("");

  const [state, formAction, isPending] = useActionState(submitVisionBuilder, initialState);
  const [utm] = useState(() => {
    if (typeof window === "undefined") {
      return {
        source: "",
        medium: "",
        campaign: "",
        content: "",
        term: "",
        landingPath: "",
      };
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
  const { phoneDisplay, phoneHref } = getCtaConfig();

  const progress = useMemo(() => ((step + 1) / stepTitles.length) * 100, [step]);

  const canContinue = useMemo(() => {
    if (step === 0) return lotStatus.length > 0;
    if (step === 1) return targetZone.length > 0;
    if (step === 2) return investmentRange.length > 0;
    return true;
  }, [investmentRange, lotStatus, step, targetZone]);

  const handleStart = () => {
    if (started) return;
    setStarted(true);
    trackEvent("form_start", { form: "vision_builder" });
  };

  const handleNext = () => {
    if (!started) {
      handleStart();
    }

    if (step < stepTitles.length - 1 && canContinue) {
      setStep((current) => current + 1);
    }
  };

  const handleBack = () => {
    setStep((current) => Math.max(0, current - 1));
  };

  useEffect(() => {
    if (!state.message) {
      return;
    }

    if (state.success) {
      trackEvent("submit_contact", {
        form: "vision_builder",
        status: "captured",
        lotStatus,
        investmentRange,
      });
      return;
    }

    trackEvent("form_error", {
      form: "vision_builder",
      message: state.message,
      errors: state.errors,
    });
  }, [investmentRange, lotStatus, state]);

  const renderStep = () => {
    if (step === 0) {
      return (
        <fieldset className="space-y-3" onFocus={handleStart}>
          <legend className="font-mono text-xs uppercase tracking-[0.05em] text-muted">
            Step 1 — Do you already have land?
          </legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {LOT_STATUS_OPTIONS.map((value) => (
              <label
                key={value}
                className={cn(
                  "flex min-h-14 cursor-pointer items-center justify-between rounded-lg border px-4 py-3 text-sm",
                  lotStatus === value
                    ? "border-accent bg-accent-soft/35"
                    : "border-line bg-surface hover:border-accent/40",
                )}
              >
                <span>{lotLabels[value]}</span>
                <input
                  type="radio"
                  name="lotStatus"
                  value={value}
                  className="h-4 w-4"
                  checked={lotStatus === value}
                  onChange={() => setLotStatus(value)}
                />
              </label>
            ))}
          </div>
          {state.errors?.lotStatus ? <p className="text-xs text-danger">{state.errors.lotStatus}</p> : null}
        </fieldset>
      );
    }

    if (step === 1) {
      return (
        <label className="space-y-2 text-sm" onFocus={handleStart}>
          <span className="font-mono text-xs uppercase tracking-[0.05em] text-muted">
            Step 2 — Preferred service area city
          </span>
          <select
            name="targetZone"
            value={targetZone}
            onChange={(event) => setTargetZone(event.target.value)}
            className={cn(inputClass, state.errors?.targetZone && "border-danger")}
            required
            aria-invalid={Boolean(state.errors?.targetZone) || undefined}
          >
            <option value="" disabled>
              Select a city
            </option>
            {SERVICE_AREA_CITIES.map((city) => (
              <option key={`${city.name}-${city.state}`} value={city.name}>
                {city.name}, {city.state}
              </option>
            ))}
          </select>
          {state.errors?.targetZone ? <p className="text-xs text-danger">{state.errors.targetZone}</p> : null}
        </label>
      );
    }

    if (step === 2) {
      return (
        <fieldset className="space-y-3" onFocus={handleStart}>
          <legend className="font-mono text-xs uppercase tracking-[0.05em] text-muted">
            Step 3 — Investment range
          </legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {INVESTMENT_RANGE_OPTIONS.map((value) => (
              <label
                key={value}
                className={cn(
                  "flex min-h-14 cursor-pointer items-center justify-between rounded-lg border px-4 py-3 text-sm",
                  investmentRange === value
                    ? "border-accent bg-accent-soft/35"
                    : "border-line bg-surface hover:border-accent/40",
                )}
              >
                <span>{investmentLabels[value]}</span>
                <input
                  type="radio"
                  name="investmentRange"
                  value={value}
                  className="h-4 w-4"
                  checked={investmentRange === value}
                  onChange={() => setInvestmentRange(value)}
                />
              </label>
            ))}
          </div>
          {state.errors?.investmentRange ? (
            <p className="text-xs text-danger">{state.errors.investmentRange}</p>
          ) : null}
        </fieldset>
      );
    }

    return (
      <div className="grid gap-4 sm:grid-cols-2" onFocus={handleStart}>
        <input type="hidden" name="lotStatus" value={lotStatus} />
        <input type="hidden" name="targetZone" value={targetZone} />
        <input type="hidden" name="investmentRange" value={investmentRange} />

        <label className="space-y-1.5 text-sm">
          <span className="font-mono text-xs uppercase tracking-[0.05em] text-muted">Full name *</span>
          <input
            name="name"
            autoComplete="name"
            className={cn(inputClass, state.errors?.name && "border-danger")}
            required
            aria-invalid={Boolean(state.errors?.name) || undefined}
          />
          {state.errors?.name ? <p className="text-xs text-danger">{state.errors.name}</p> : null}
        </label>

        <label className="space-y-1.5 text-sm">
          <span className="font-mono text-xs uppercase tracking-[0.05em] text-muted">Email *</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            className={cn(inputClass, state.errors?.email && "border-danger")}
            required
            aria-invalid={Boolean(state.errors?.email) || undefined}
          />
          {state.errors?.email ? <p className="text-xs text-danger">{state.errors.email}</p> : null}
        </label>

        <label className="space-y-1.5 text-sm sm:col-span-1">
          <span className="font-mono text-xs uppercase tracking-[0.05em] text-muted">Phone (optional)</span>
          <input name="phone" type="tel" autoComplete="tel" className={inputClass} />
        </label>

        <label className="space-y-1.5 text-sm sm:col-span-2">
          <span className="font-mono text-xs uppercase tracking-[0.05em] text-muted">
            Notes (optional)
          </span>
          <textarea
            name="message"
            rows={4}
            className={cn(inputClass, state.errors?.message && "border-danger")}
            placeholder="Style direction, target move-in timeline, constraints, etc."
          />
          {state.errors?.message ? <p className="text-xs text-danger">{state.errors.message}</p> : null}
        </label>
      </div>
    );
  };

  return (
    <section className="rounded-xl border border-line/95 bg-surface/96 p-5 sm:p-6 md:p-8">
      <div className="mb-5 space-y-3 border-b border-line pb-4">
        <div className="flex items-center justify-between text-xs text-muted">
          <p>Vision Builder</p>
          <p>
            Step {step + 1} of {stepTitles.length}
          </p>
        </div>
        <div className="h-1.5 rounded-full bg-line">
          <div
            className="h-full rounded-full bg-accent transition-[width] duration-300"
            style={{ width: `${progress}%` }}
            aria-hidden="true"
          />
        </div>
        <h2 className="text-xl font-semibold tracking-tight text-ink">{stepTitles[step]}</h2>
      </div>

      <form action={formAction} className="space-y-6" noValidate>
        <div className="hidden" aria-hidden="true">
          <label>
            Website
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        <input type="hidden" name="utm_source" value={utm.source} />
        <input type="hidden" name="utm_medium" value={utm.medium} />
        <input type="hidden" name="utm_campaign" value={utm.campaign} />
        <input type="hidden" name="utm_content" value={utm.content} />
        <input type="hidden" name="utm_term" value={utm.term} />
        <input type="hidden" name="utm_landing_path" value={utm.landingPath} />

        {renderStep()}

        <div className="flex flex-wrap items-center gap-3 border-t border-line pt-4">
          {step > 0 ? (
            <button
              type="button"
              onClick={handleBack}
              className="min-h-11 rounded-md border border-line px-4 text-sm text-ink"
            >
              Back
            </button>
          ) : null}

          {step < stepTitles.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={!canContinue}
              className="min-h-11 rounded-md border border-accent bg-accent px-5 text-sm font-semibold text-on-accent disabled:cursor-not-allowed disabled:opacity-50"
            >
              Continue
            </button>
          ) : (
            <button
              type="submit"
              disabled={isPending}
              onClick={handleStart}
              className="min-h-11 rounded-md border border-accent bg-accent px-5 text-sm font-semibold text-on-accent disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? "Submitting…" : "Submit Vision"}
            </button>
          )}

          <CtaLink href={phoneHref} eventName="cta_call_click" variant="ghost" className="text-sm">
            Call {phoneDisplay}
          </CtaLink>
        </div>

        {state.message ? (
          <p
            className={cn(
              "rounded-lg border p-3 text-sm",
              state.success
                ? "border-accent-soft bg-accent-soft text-accent-soft-ink"
                : "border-danger bg-danger-soft text-danger-soft-ink",
            )}
            role={!state.success ? "alert" : "status"}
            aria-live="polite"
          >
            {state.message}
          </p>
        ) : null}
      </form>
    </section>
  );
}
