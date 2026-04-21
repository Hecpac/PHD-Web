import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, IBM_Plex_Mono } from "next/font/google";

import { BackToTop } from "@/components/layout/back-to-top";
import { FooterHeightObserver } from "@/components/layout/footer-height-observer";
import { MobileStickyBar } from "@/components/layout/mobile-sticky-bar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import dynamic from "next/dynamic";

const SmoothScroll = dynamic(
  () => import("@/components/layout/smooth-scroll").then((m) => m.SmoothScroll),
);

import { CadMode } from "@/components/ui/cad-mode";
import { LazyEnhancements } from "@/components/ui/lazy-enhancements";
import { JsonLd } from "@/components/ui/json-ld";
import { TransitionProvider } from "@/components/ui/page-transition";
import { GoogleTagManager } from "@/components/analytics/gtm";
import { UTMTracker } from "@/components/analytics/utm-tracker";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getSiteUrl, siteConfig } from "@/lib/config/site";
import { getReviews } from "@/lib/data";
import {
  createLocalBusinessSchema,
  createOrganizationSchema,
  createFounderSchema,
  createWebSiteSchema,
} from "@/lib/seo/schema";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

import "../globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
  preload: false,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = getSiteUrl();
  const t = await getTranslations("layout");

  return {
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: "/",
      languages: { en: "/en", es: "/es" },
    },
    title: {
      default: t("metaTitle"),
      template: `%s | ${siteConfig.name}`,
    },
    description: t("metaDescription"),
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: siteUrl,
      siteName: siteConfig.name,
      type: "website",
      locale: "en_US",
      images: [
        {
          url: "/og-default.jpg",
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} — Custom Homes across DFW & North Texas`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@PHDhomes",
      creator: "@PHDhomes",
      title: t("ogTitle"),
      description: t("ogDescription"),
      images: ["/og-default.jpg"],
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [reviews, messages, t] = await Promise.all([getReviews(locale), getMessages(), getTranslations("layout")]);
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="alternate" type="application/rss+xml" title={`${siteConfig.name} Blog`} href="/blogs/feed.xml" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => {
  document.documentElement.classList.add('light');
  window.dataLayer = window.dataLayer || [];
})();`,
          }}
        />
      </head>
      <body className={`${jakarta.variable} ${plexMono.variable} bg-canvas text-ink antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-on-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
        >
          {t("skipToContent")}
        </a>
        {GTM_ID ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        ) : null}
        {GTM_ID ? <GoogleTagManager id={GTM_ID} /> : null}
        <UTMTracker />
        <JsonLd data={createWebSiteSchema()} />
        <JsonLd data={createLocalBusinessSchema(reviews)} />
        <JsonLd data={createOrganizationSchema()} />
        <JsonLd data={createFounderSchema()} />
        <NextIntlClientProvider messages={messages}>
        <SiteHeader />
        <SmoothScroll>
          <div
            className="relative z-[1] bg-canvas"
            style={{ marginBottom: "var(--footer-height, 0px)" }}
          >
            <div className="flex min-h-screen flex-col bg-canvas text-ink">
              <main id="main-content" className="pt-14 pb-20 md:pt-[72px] md:pb-0">
                <TransitionProvider>{children}</TransitionProvider>
              </main>
              <BackToTop />
            </div>
          </div>
          <SiteFooter />
          <FooterHeightObserver />
        </SmoothScroll>
        <MobileStickyBar />
        <LazyEnhancements />
        <CadMode />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
