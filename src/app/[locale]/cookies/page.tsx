import type { Metadata } from "next";
import { type Locale, t, siteConfig } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: t(locale as Locale, "page.cookies.title"),
    alternates: {
      canonical: `${siteConfig.url}/${locale}/cookies`,
    },
  };
}

export default function CookiePolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">Cookie Policy</h1>

      <div className="prose max-w-none">
        <p>
          Tento web používá cookies pro zajištění správné funkčnosti a
          vylepšování uživatelského zážitku.
        </p>

        <h2>Co jsou cookies</h2>
        <p>
          Cookies jsou malé textové soubory, které se ukládají ve vašem
          prohlížeči při návštěvě webu. Slouží k zapamatování vašich preferencí
          a analýze návštěvnosti.
        </p>

        <h2>Typy cookies na tomto webu</h2>

        <h3>Nezbytné cookies</h3>
        <p>
          Zajišťují základní funkčnost webu (např. zapamatování souhlasu s
          cookies). Tyto cookies nelze odmítnout.
        </p>

        <h3>Analytické cookies</h3>
        <p>
          Google Analytics 4 — sbírají anonymizovaná data o návštěvnosti. Jsou
          aktivovány pouze po udělení souhlasu přes cookie banner.
        </p>

        <h3>Reklamní cookies</h3>
        <p>
          Google AdSense — slouží k zobrazování relevantních reklam. Jsou
          aktivovány pouze po udělení souhlasu.
        </p>

        <h2>Správa cookies</h2>
        <p>
          Svůj souhlas s cookies můžete kdykoli změnit nebo odvolat kliknutím na
          ikonu cookie banneru v levém dolním rohu stránky.
        </p>
        <p>
          Cookies můžete také spravovat přímo v nastavení vašeho prohlížeče.
        </p>

        <p className="text-sm text-gray-500 mt-8">
          Poslední aktualizace: březen 2026
        </p>
      </div>
    </div>
  );
}
