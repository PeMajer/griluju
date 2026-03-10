import Script from "next/script";
import { siteConfig } from "@/lib/i18n";

// Set NEXT_PUBLIC_GA4_ID in .env.local: NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
export function GA4Script() {
  const ga4Id = siteConfig.ga4Id;
  if (!ga4Id) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${ga4Id}');
        `}
      </Script>
    </>
  );
}
