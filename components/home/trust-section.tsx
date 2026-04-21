"use client";

import { useTranslations } from "next-intl";

import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";

const TRUST_POINT_KEYS = ["point1", "point2", "point3"] as const;

export function TrustSection() {
  const t = useTranslations("trust");

  return (
    <section
      id="trust"
      className="section-shell section-intake-gradient border-t border-line"
      aria-label={t("ariaLabel")}
    >
      <Container swiss className="space-y-8">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <ul className="grid gap-6 md:grid-cols-3" aria-label={t("ariaLabel")}>
          {TRUST_POINT_KEYS.map((key) => (
            <li key={key}>
              <article className="rounded-xl border border-line bg-surface p-6 shadow-[var(--shadow-card)]">
                <h3 className="type-h3-compact">{t(`${key}Title`)}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{t(`${key}Description`)}</p>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
