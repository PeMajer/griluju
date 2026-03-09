import type { Metadata } from "next";
import { type Locale, t, siteConfig } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: t(locale as Locale, "page.about.title"),
    alternates: {
      canonical: `${siteConfig.url}/${locale}/o-mne`,
    },
  };
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">O mně</h1>

      <div className="prose max-w-none">
        <p>
          Jsem Tomáš Majer, frontend vývojář a vášnivý grilař. Na grilu stojím
          pravidelně už několik let a za tu dobu jsem vystřídal uhláky, plynáky
          i keramický gril.
        </p>

        <h2>Co tady najdete</h2>
        <p>
          Griluju.cz je web pro každého, kdo to u grilu myslí vážně. Píšu
          recepty, které jsem osobně vyzkoušel, návody vycházející z reálných
          zkušeností a recenze vybavení, které skutečně používám.
        </p>

        <h2>Specializace</h2>
        <p>
          Nejvíc mě baví pomalé grilování a BBQ — pulled pork, brisket, žebra.
          Rád experimentuji s teplotami a kouřem. Steaky jsou moje druhá láska —
          reverse sear je pro mě svatý grál přípravy hovězího.
        </p>

        <h2>Proč tento web</h2>
        <p>
          V češtině je překvapivě málo kvalitních zdrojů o grilování. Většina
          článků recykluje obecné rady bez konkrétních čísel nebo osobní
          zkušenosti. Tady najdete přesné teploty, časy, gramáže — a taky moje
          chyby, ze kterých se dá poučit.
        </p>
      </div>
    </div>
  );
}
