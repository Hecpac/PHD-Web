import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, IBM_Plex_Mono } from "next/font/google";

import { BackToTop } from "@/components/layout/back-to-top";
import { FooterHeightObserver } from "@/components/layout/footer-height-observer";
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
import { getSiteUrl, siteConfig } from "@/lib/config/site";
import { getReviews } from "@/lib/data";
import { createLocalBusinessSchema, createWebSiteSchema } from "@/lib/seo/schema";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Premium Home Design | Custom Home Builder in Dallas-Fort Worth",
    template: `%s | ${siteConfig.name}`,
  },
  description: "Architecture-first custom home builder serving Dallas-Fort Worth. Design-build delivery with decision-gated planning, open-book budgeting, and 835+ homes delivered.",
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
    title: "Premium Home Design | Custom Homes — DFW, North Texas & Southern Oklahoma",
    description: "Architecture-first design-build. 835+ homes delivered across DFW, North Texas, and Southern Oklahoma with decision-gated planning.",
    url: getSiteUrl(),
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — Custom Homes across DFW, North Texas & Southern Oklahoma`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@PHDhomes",
    creator: "@PHDhomes",
    title: "Premium Home Design | Custom Homes — DFW, North Texas & Southern Oklahoma",
    description: "Architecture-first design-build. 835+ homes delivered across DFW, North Texas, and Southern Oklahoma with decision-gated planning.",
    images: ["/og-default.jpg"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const reviews = await getReviews();
  return (
    <html lang="en" suppressHydrationWarning>
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
          Skip to main content
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
        <LazyEnhancements />
        <CadMode />
      </body>
    </html>
  );
}
