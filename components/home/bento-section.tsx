"use client";

import { useTranslations } from "next-intl";

import { Container } from "@/components/layout/container";
import { BentoGrid, type BentoItem } from "@/components/ui/bento-grid";
import { SectionHeading } from "@/components/ui/section-heading";
import { Counter } from "@/components/ui/counter";

export function BentoSection() {
  const t = useTranslations("bento");

  const bentoItems: BentoItem[] = [
    {
      id: "bento-design-build",
      eyebrow: t("singleContractEyebrow"),
      title: t("singleContractTitle"),
      description: t("singleContractDescription"),
      span: "2x2",
      variant: "image",
      imageSrc: "/projects/duplex/kitchen-dining.jpg",
      imageAlt: t("singleContractImageAlt"),
    },
    {
      id: "bento-projects",
      eyebrow: t("trackRecordEyebrow"),
      stat: <Counter value={60} suffix="+" />,
      statLabel: t("trackRecordStatLabel"),
      title: t("trackRecordTitle"),
      span: "1x1",
      variant: "accent",
    },
    {
      id: "bento-timeline",
      eyebrow: t("predictabilityEyebrow"),
      stat: <Counter value={94} suffix="%" />,
      statLabel: t("predictabilityStatLabel"),
      title: t("predictabilityTitle"),
      span: "1x1",
      variant: "surface",
    },
    {
      id: "bento-transparency",
      eyebrow: t("processEyebrow"),
      title: t("processTitle"),
      description: t("processDescription"),
      span: "2x1",
      variant: "image",
      imageSrc: "/projects/duplex/hero.jpg",
      imageAlt: t("processImageAlt"),
    },
    {
      id: "bento-quality",
      eyebrow: t("executionEyebrow"),
      title: t("executionTitle"),
      description: t("executionDescription"),
      span: "1x1",
      variant: "surface",
    },
    {
      id: "bento-dfw",
      eyebrow: t("serviceAreaEyebrow"),
      title: t("serviceAreaTitle"),
      description: t("serviceAreaDescription"),
      span: "1x1",
      variant: "image",
      imageSrc: "/projects/806-mango/rear-pool.jpg",
      imageAlt: t("serviceAreaImageAlt"),
    },
  ];

  return (
    <section id="bento" className="section-shell section-brand-wash-soft border-t border-line section-brand-divider">
      <Container swiss className="space-y-10">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />
        <BentoGrid items={bentoItems} className="brand-red-outline border border-line" />
      </Container>
    </section>
  );
}
