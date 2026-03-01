import Script from "next/script";

type Props = { id: string };

/**
 * Loads Google Tag Manager after the page is interactive.
 * window.dataLayer is initialized by GTM; existing trackEvent() calls
 * push to it automatically once the container is active.
 * Render only when NEXT_PUBLIC_GTM_ID is set.
 */
export function GoogleTagManager({ id }: Props) {
  return (
    <Script
      id="gtm-init"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${id}');`,
      }}
    />
  );
}
