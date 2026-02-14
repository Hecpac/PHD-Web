import type { Metadata } from "next";

import { BackToTop } from "@/components/layout/back-to-top";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { JsonLd } from "@/components/ui/json-ld";
import { TransitionProvider } from "@/components/ui/page-transition";
import { Preloader } from "@/components/ui/preloader";
import { getSiteUrl, siteConfig } from "@/lib/config/site";
import { createLocalBusinessSchema, createWebSiteSchema } from "@/lib/seo/schema";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${siteConfig.name} | Custom Homes in Dallas-Fort Worth`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: `${siteConfig.name} | Custom Homes in Dallas-Fort Worth`,
    description: siteConfig.description,
    url: getSiteUrl(),
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Custom Homes in Dallas-Fort Worth`,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('light');`,
          }}
        />
      </head>
      <body className="bg-canvas text-ink antialiased">
        <Preloader />
        <JsonLd data={createWebSiteSchema()} />
        <JsonLd data={createLocalBusinessSchema()} />
        <SmoothScroll>
          <div className="flex min-h-screen flex-col bg-canvas text-ink">
            <SiteHeader />
            <main id="main-content">
              <TransitionProvider>{children}</TransitionProvider>
            </main>
            <SiteFooter />
            <BackToTop />
          </div>
        </SmoothScroll>
        <CustomCursor />
      </body>
    </html>
  );
}
