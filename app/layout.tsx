import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";

import { BackToTop } from "@/components/layout/back-to-top";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { CadMode } from "@/components/ui/cad-mode";
import { ConsoleBrand } from "@/components/ui/console-brand";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { JsonLd } from "@/components/ui/json-ld";
import { TransitionProvider } from "@/components/ui/page-transition";
import { getSiteUrl, siteConfig } from "@/lib/config/site";
import { createLocalBusinessSchema, createWebSiteSchema } from "@/lib/seo/schema";

import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

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
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — Custom Homes in Dallas-Fort Worth`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Custom Homes in Dallas-Fort Worth`,
    description: siteConfig.description,
    images: ["/og-default.jpg"],
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
      <body className={`${archivo.variable} ${plexMono.variable} bg-canvas text-ink antialiased`}>
        <JsonLd data={createWebSiteSchema()} />
        <JsonLd data={createLocalBusinessSchema()} />
        <SmoothScroll>
          <div
            className="relative z-[1] bg-canvas"
            style={{ marginBottom: "var(--footer-height, 0px)" }}
          >
            <div className="flex min-h-screen flex-col bg-canvas text-ink">
              <SiteHeader />
              <main id="main-content">
                <TransitionProvider>{children}</TransitionProvider>
              </main>
              <BackToTop />
            </div>
          </div>
          <SiteFooter />
        </SmoothScroll>
        <CustomCursor />
        <CadMode />
        <ConsoleBrand />
      </body>
    </html>
  );
}
