import type { Metadata } from "next";
import { t, siteConfig } from "@/lib/i18n";
import { MailLink } from "@/components/ui/MailLink";

export const metadata: Metadata = {
  title: t("cs", "page.privacy.title"),
  alternates: {
    canonical: `${siteConfig.url}/ochrana-soukromi`,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-[680px]">
        <h1
          className="text-3xl md:text-4xl text-coal font-bold mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Ochrana soukromí
        </h1>

        <div className="prose max-w-none text-stone [&_h2]:text-coal [&_h3]:text-coal [&_a]:text-heat">
          <p>
            Tento dokument popisuje, jak web griluju.cz (dále „web") zpracovává
            osobní údaje návštěvníků v souladu s Nařízením (EU) 2016/679 (GDPR).
          </p>

          <h2>Správce údajů</h2>
          <p>
            Petr Majer<br />
            E-mail: <MailLink />
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
            <MailLink />.
          </p>

          <h2>Změny zásad</h2>
          <p>
            Tuto stránku můžeme aktualizovat. O podstatných změnách budeme
            informovat na webu.
          </p>

          <p className="text-sm text-stone mt-8">
            Poslední aktualizace: březen 2026
          </p>
        </div>
      </div>
    </section>
  );
}
