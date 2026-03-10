import { siteConfig } from "@/lib/i18n";

interface HreflangProps {
  path?: string;
}

// Currently only cs-CZ. When adding DE/EN, extend with locale-aware URL
// construction (e.g., /de/${path} for German content on griluju.com/de/).
export function Hreflang({ path = "" }: HreflangProps) {
  return (
    <>
      <link
        rel="alternate"
        hrefLang="cs-CZ"
        href={`${siteConfig.url}${path}`}
      />
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${siteConfig.url}${path}`}
      />
    </>
  );
}
