"use client";

import { FormEvent, useRef, useState } from "react";
import { ArrowUpRight, BadgeCheck, Clock3, MapPin } from "lucide-react";

import { Container } from "@/components/layout/container";
import { CtaLink } from "@/components/ui/cta-link";
import { SectionHeading } from "@/components/ui/section-heading";
import { trackEvent } from "@/lib/analytics/events";
import { getCtaConfig } from "@/lib/config/site";
import { gsap, useGSAP } from "@/lib/gsap";
import { DFW_CITIES, isDfwCity } from "@/lib/types/content";
import { cn } from "@/lib/utils";

type ContactTerminalProps = {
  id?: string;
  withHeading?: boolean;
};

export function ContactTerminal({ id = "contact", withHeading = true }: ContactTerminalProps) {
  const [started, setStarted] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");
  const sectionRef = useRef<HTMLElement>(null);
  const cityRef = useRef<HTMLSelectElement>(null);
  const { phoneDisplay, phoneHref, scheduleUrl } = getCtaConfig();
  const contactEndpoint = process.env.NEXT_PUBLIC_CONTACT_WEBHOOK_URL;

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const section = sectionRef.current!;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(section, {
        backgroundColor: "#050505",
        duration: 0.1,
        ease: "none",
      })
        .to(section.querySelectorAll(".text-ink"), { color: "#f5f5f5", duration: 0.1, ease: "none" }, "<")
        .to(section.querySelectorAll(".text-muted"), { color: "#a0a0a0", duration: 0.1, ease: "none" }, "<")
        .to(section.querySelectorAll(".bg-surface"), { backgroundColor: "#111", duration: 0.1, ease: "none" }, "<")
        .to(section.querySelectorAll(".bg-canvas"), { backgroundColor: "#050505", duration: 0.1, ease: "none" }, "<")
        .to(section.querySelectorAll(".border-line"), { borderColor: "#333", duration: 0.1, ease: "none" }, "<")
        .to(
          section.querySelectorAll("input, select, textarea"),
          { backgroundColor: "#111", color: "#f5f5f5", borderColor: "#333", duration: 0.1, ease: "none" },
          "<",
        );
    });
  }, { scope: sectionRef });

  const cityHasError = status === "error";
  const inputClass =
    "w-full rounded-lg border border-line bg-canvas px-3.5 py-3 text-sm text-ink placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-accent";

  const onFormFocus = () => {
    if (started) {
      return;
    }

    setStarted(true);
    trackEvent("form_start");
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      setStatus("error");
      setStatusMessage("Please complete all required fields.");
      trackEvent("form_error", { field: "required_fields" });
      return;
    }

    const formData = new FormData(form);
    const city = String(formData.get("city") ?? "").trim();
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (!isDfwCity(city)) {
      setStatus("error");
      setStatusMessage("Please select a city within Dallas-Fort Worth.");
      trackEvent("form_error", { field: "city", city });
      cityRef.current?.focus();
      return;
    }

    if (!contactEndpoint) {
      setStatus("success");
      setStatusMessage(
        "Thanks. Intake is validated, but no backend is configured yet. Please use Schedule Consultation or Call for follow-up.",
      );
      trackEvent("form_submit", {
        city,
        status: "not_captured",
        hasPhone: Boolean(phone),
        messageLength: message.length,
      });
      form.reset();
      setStarted(false);
      return;
    }

    try {
      const response = await fetch(contactEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          city,
          phone,
          message,
          source: "dfw_contact_terminal",
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Contact submission failed with status ${response.status}`);
      }

      setStatus("success");
      setStatusMessage("Thanks. Your DFW project intake has been captured for a follow-up call.");
      trackEvent("form_submit", {
        city,
        status: "captured",
        hasPhone: Boolean(phone),
        messageLength: message.length,
      });
      form.reset();
      setStarted(false);
    } catch {
      setStatus("error");
      setStatusMessage(
        "We couldn’t submit your intake right now. Please use Schedule Consultation or Call to connect.",
      );
      trackEvent("form_error", { field: "submission", city });
    }
  };

  return (
    <section ref={sectionRef} id={id} className="section-shell border-t border-line">
      <Container swiss className="space-y-8">
        {withHeading ? (
          <SectionHeading
            eyebrow="Project Intake"
            title="Start your DFW project intake"
            description="Share your scope, timeline, and location. We review every brief with a decision-gate lens before recommending next steps."
          />
        ) : null}

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,1.9fr)]">
          <aside className="rounded-xl border border-line bg-surface p-6 md:p-7">
            <p className="font-mono text-xs uppercase tracking-[0.05em] text-muted">Intake Workflow</p>
            <h3 className="mt-3 text-2xl font-bold tracking-tight text-ink">Fast, clear, and decision-ready.</h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              We review your brief against scope, site constraints, and budget signals before the first call.
            </p>

            <ol className="mt-6 space-y-3">
              {[
                "Submit project brief and city.",
                "Receive fit-check and follow-up call.",
                "Get next-step path with decision gates.",
              ].map((step, index) => (
                <li key={step} className="rounded-lg flex gap-3 border border-line bg-canvas p-3">
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

            <div className="mt-6 border-t border-line pt-4">
              <p className="text-xs text-muted">Prefer to talk first?</p>
              <CtaLink href={phoneHref} eventName="cta_call_click" variant="ghost" className="mt-2 px-0">
                Call {phoneDisplay} <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
              </CtaLink>
            </div>
          </aside>

          <div className="rounded-xl border border-line bg-surface p-6 md:p-8">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-2 border-b border-line pb-4">
              <p className="text-xs text-muted">
                <span className="text-accent" aria-hidden="true">*</span> Required fields
              </p>
              <p className="inline-flex items-center gap-1.5 text-xs text-muted">
                <BadgeCheck className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                DFW city validation enabled
              </p>
            </div>

            <form className="grid gap-5 md:grid-cols-2" onFocus={onFormFocus} onSubmit={onSubmit} noValidate>
              <label className="space-y-1.5 text-sm">
                <span className="font-mono text-xs uppercase tracking-[0.05em] text-muted">Full name <span className="text-accent" aria-hidden="true">*</span></span>
                <input
                  name="name"
                  autoComplete="name"
                  required
                  aria-required="true"
                  className={inputClass}
                  placeholder="Jane Smith"
                />
              </label>

              <label className="space-y-1.5 text-sm">
                <span className="font-mono text-xs uppercase tracking-[0.05em] text-muted">Email <span className="text-accent" aria-hidden="true">*</span></span>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  aria-required="true"
                  className={inputClass}
                  placeholder="jane@domain.com"
                />
              </label>

              <label className="space-y-1.5 text-sm">
                <span className="font-mono text-xs uppercase tracking-[0.05em] text-muted">DFW city <span className="text-accent" aria-hidden="true">*</span></span>
                <select
                  ref={cityRef}
                  name="city"
                  defaultValue=""
                  required
                  aria-required="true"
                  aria-invalid={cityHasError || undefined}
                  aria-describedby={cityHasError ? "city-error" : undefined}
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
                  className={inputClass}
                  placeholder="(469) 555-0101"
                />
              </label>

              <label className="space-y-1.5 text-sm md:col-span-2">
                <span className="font-mono text-xs uppercase tracking-[0.05em] text-muted">Project goals <span className="text-accent" aria-hidden="true">*</span></span>
                <textarea
                  name="message"
                  required
                  aria-required="true"
                  rows={6}
                  className={inputClass}
                  placeholder="Tell us lot status, target timeline, style direction, and budget guardrails."
                />
              </label>

              <div className="md:col-span-2">
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    className="inline-flex min-h-11 items-center justify-center rounded-lg border border-accent bg-accent px-6 py-3 text-sm font-bold uppercase tracking-[0.05em] text-on-accent transition-colors duration-150 hover:bg-accent-hover active:bg-accent-pressed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-surface focus-visible:ring-accent"
                  >
                    Submit Brief
                  </button>
                  <CtaLink
                    href={scheduleUrl}
                    target="_blank"
                    rel="noreferrer"
                    eventName="cta_schedule_click"
                    variant="secondary"
                    className="bg-canvas"
                  >
                    Schedule Instead
                  </CtaLink>
                  <CtaLink href={phoneHref} eventName="cta_call_click" variant="ghost" className="px-0">
                    Call {phoneDisplay}
                  </CtaLink>
                </div>
                <p className="mt-3 text-xs text-muted">
                  By submitting, you confirm this project is located in Dallas-Fort Worth.
                </p>
              </div>
            </form>

            {status !== "idle" ? (
              <p
                id={status === "error" ? "city-error" : undefined}
                className={`mt-5 rounded-lg border p-3 text-sm ${
                  status === "success"
                    ? "border-accent-soft bg-accent-soft text-accent-soft-ink"
                    : "border-danger bg-danger-soft text-danger-soft-ink"
                }`}
                role={status === "error" ? "alert" : "status"}
                aria-live={status === "error" ? "assertive" : "polite"}
              >
                {statusMessage}
              </p>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
