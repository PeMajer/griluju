import type { Metadata } from "next";
import { siteConfig } from "@/lib/i18n";
import { TemperatureTable } from "@/components/tools/TemperatureTable";
import { NewsletterCTA } from "@/components/ui/NewsletterCTA";
import { PrintButton } from "@/components/ui/PrintButton";

export const metadata: Metadata = {
  title: "Teploty masa na grilu — Griluju.cz",
  description:
    "Interaktivní tabulka vnitřních teplot masa: hovězí, vepřové, drůbež, jehněčí i ryby. Vždy přesná teplota, nikdy přesuché maso.",
  alternates: {
    canonical: `${siteConfig.url}/nastroje/teploty-masa`,
  },
};

export default function TeplotyMasaPage() {
  return (
    <>
      {/* Print styles — hide nav and footer */}
      <style>{`
        @media print {
          header, footer, .no-print { display: none !important; }
          main { padding: 0 !important; }
        }
      `}</style>

      <div className="mx-auto max-w-4xl px-4 py-10">
        {/* Page header */}
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-coal mb-2">
              Teploty masa na grilu
            </h1>
            <p className="text-stone max-w-xl leading-relaxed">
              Přesné vnitřní teploty pro každý druh masa a stupeň propečení.
              Změřte termometrem — oko vás oklame, číslo ne.
            </p>
          </div>
          <PrintButton />
        </div>

        {/* Temperature legend */}
        <div className="flex flex-wrap gap-4 mb-8 p-4 rounded-xl bg-bg-warm border border-smoke">
          <div className="flex items-center gap-2 text-sm">
            <span className="w-3 h-3 rounded-full bg-[#EF4444]" />
            <span className="text-stone">Rare / krvavé</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="w-3 h-3 rounded-full bg-heat" />
            <span className="text-stone">Medium / středně propečené</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "var(--temp-well)" }} />
            <span className="text-stone">Well done / propečené</span>
          </div>
        </div>

        {/* Interactive table */}
        <TemperatureTable />

        {/* Note */}
        <div className="mt-8 p-4 rounded-xl border border-smoke bg-bg-warm text-sm text-stone leading-relaxed">
          <strong className="text-coal">Poznámka:</strong> Teploty jsou měřeny v nejtlustším místě masa,
          termometrem zasunutým do středu — ne ke kosti. Maso po sundání z grilu ještě chvíli
          zůstane stoupat o 2–3 °C (tzv. carryover cooking) — sundejte ho o něco dřív.
        </div>
      </div>

      <NewsletterCTA />
    </>
  );
}
