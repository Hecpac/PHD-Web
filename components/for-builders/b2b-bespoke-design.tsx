"use client";

import { useTranslations } from "next-intl";

import { Container } from "@/components/layout/container";
import { BeforeAfterSlider } from "@/components/ui/before-after-slider";

export function B2BBespokeDesign() {
  const t = useTranslations("forBuildersPage");

  return (
    <section id="bespoke-design" className="section-shell relative z-10 border-t border-line bg-black">
      <Container swiss className="relative z-10 space-y-16">
        <div className="max-w-3xl">
           <h2 className="type-heading text-[#d4af37] mb-6">
              {t("bespokeTitle")}
           </h2>
           <p className="text-2xl md:text-3xl font-light text-white leading-relaxed tracking-tight">
             {t("bespokeSubtitle")}
           </p>
           <p className="mt-6 text-lg text-white/70 max-w-2xl leading-relaxed">
             {t("bespokeDescription")}
           </p>
        </div>

        {/* Before and After Interactive Experience */}
        <div className="w-full">
           <BeforeAfterSlider
             beforeImage="/for-builders/Gemini_Generated_Image_8lcca98lcca98lcc.jpeg"
             afterImage="/for-builders/hectorpachano_Photorealistic_3D_architectural_interior_render_25ba458a-f690-49de-85ad-fba993fb05a0_1.png"
             beforeLabel={t("bespokeBeforeLabel")}
             afterLabel={t("bespokeAfterLabel")}
             className="shadow-2xl shadow-black/50"
           />
        </div>
        {/* Value Pillars */}
        <div className="grid gap-8 border-t border-white/10 pt-12 md:grid-cols-3">
           <div className="space-y-3">
              <div className="text-[#d4af37]">
                 {/* Icon placeholder for Architectural Precision */}
                 <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                   <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                 </svg>
              </div>
              <h3 className="text-xl font-bold text-white">{t("bespokePillar1Title")}</h3>
              <p className="text-white/60">{t("bespokePillar1Subtitle")}</p>
           </div>

           <div className="space-y-3">
              <div className="text-[#d4af37]">
                 <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                 </svg>
              </div>
              <h3 className="text-xl font-bold text-white">{t("bespokePillar2Title")}</h3>
              <p className="text-white/60">{t("bespokePillar2Subtitle")}</p>
           </div>

           <div className="space-y-3">
              <div className="text-[#d4af37]">
                 <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                 </svg>
              </div>
              <h3 className="text-xl font-bold text-white">{t("bespokePillar3Title")}</h3>
              <p className="text-white/60">{t("bespokePillar3Subtitle")}</p>
           </div>
        </div>
      </Container>
    </section>
  );
}
