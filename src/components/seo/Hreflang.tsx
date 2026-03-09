import { siteConfig, locales } from "@/lib/i18n";

interface HreflangProps {
  path: string;
}

export function Hreflang({ path }: HreflangProps) {
  return (
    <>
      {locales.map((locale) => (
        <link
          key={locale}
          rel="alternate"
          hrefLang={locale === "cs" ? "cs-CZ" : locale}
          href={`${siteConfig.url}/${locale}${path}`}
        />
      ))}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${siteConfig.url}/cs${path}`}
      />
    </>
  );
}
