"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type LocaleSwitcherProps = {
  tone?: "light" | "dark";
};

export function LocaleSwitcher({ tone = "dark" }: LocaleSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("layout");

  function switchLocale() {
    const next = locale === "en" ? "es" : "en";
    router.replace(pathname, { locale: next });
  }

  const isDark = tone === "dark";

  return (
    <button
      type="button"
      onClick={switchLocale}
      className={cn(
        "inline-flex min-h-9 min-w-9 items-center justify-center rounded-full font-mono text-[10px] font-medium uppercase tracking-[0.1em] transition-colors sm:text-[11px]",
        isDark
          ? "text-ink/60 hover:text-ink"
          : "text-white/60 hover:text-white",
      )}
      aria-label={locale === "en" ? t("switchToSpanish") : t("switchToEnglish")}
    >
      {locale === "en" ? "ES" : "EN"}
    </button>
  );
}
