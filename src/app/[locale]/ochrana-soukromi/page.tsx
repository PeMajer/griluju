import type { Metadata } from "next";
import { type Locale, t, siteConfig } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: t(locale as Locale, "page.privacy.title"),
    alternates: {
      canonical: `${siteConfig.url}/${locale}/ochrana-soukromi`,
    },
  };
}

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">
        Ochrana soukromí
      </h1>

      <div className="prose max-w-none">
        <p>
          Tento dokument popisuje, jak web griluju.cz (dále „web") zpracovává
          osobní údaje návštěvníků v souladu s Nařízením (EU) 2016/679 (GDPR).
        </p>

        <h2>Správce údajů</h2>
        <p>
          Tomáš Majer<br />
          E-mail: info@griluju.cz
        </p>

        <h2>Jaké údaje zpracováváme</h2>

        <h3>Analytické cookies (Google Analytics 4)</h3>
        <p>
          Po udělení souhlasu sbíráme anonymizovaná data o návštěvnosti webu —
          zobrazené stránky, čas strávený na webu, typ zařízení a přibližná
          poloha (stát/region). Data jsou uložena na serverech Google a
          zpracovávána dle podmínek Google Analytics.
        </p>

        <h3>E-mailový kontakt</h3>
        <p>
          Pokud nám napíšete e-mail, uchováváme vaši e-mailovou adresu a obsah
          zprávy pro účely odpovědi. Tyto údaje nepoužíváme k marketingovým
          účelům bez vašeho výslovného souhlasu.
        </p>

        <h2>Affiliate odkazy</h2>
        <p>
          Web obsahuje affiliate odkazy na produkty třetích stran (Mall.cz,
          Alza.cz a další). Kliknutím na affiliate odkaz můžete být sledováni
          třetí stranou pro účely přiřazení provize. Toto sledování řídí
          příslušný obchodní partner, nikoli tento web.
        </p>

        <h2>Vaše práva</h2>
        <p>Máte právo na:</p>
        <ul>
          <li>Přístup ke svým osobním údajům</li>
          <li>Opravu nepřesných údajů</li>
          <li>Výmaz údajů</li>
          <li>Omezení zpracování</li>
          <li>Přenositelnost údajů</li>
          <li>Odvolání souhlasu se zpracováním</li>
        </ul>
        <p>
          Pro uplatnění těchto práv nás kontaktujte na{" "}
          <a href="mailto:info@griluju.cz">info@griluju.cz</a>.
        </p>

        <h2>Změny zásad</h2>
        <p>
          Tuto stránku můžeme aktualizovat. O podstatných změnách budeme
          informovat na webu.
        </p>

        <p className="text-sm text-gray-500 mt-8">
          Poslední aktualizace: březen 2026
        </p>
      </div>
    </div>
  );
}
