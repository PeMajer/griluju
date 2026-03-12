import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, ShieldCheck, Ruler } from "lucide-react";
import { t, siteConfig } from "@/lib/i18n";
import { NewsletterCTA } from "@/components/ui/NewsletterCTA";

export const metadata: Metadata = {
  title: t("cs", "page.about.title"),
  description:
    "Jsem Petr Majer — frontend vývojář a grilař z Prahy. Griluju přes 10 let na Weber Kettle. Tady píšu o tom, co funguje.",
  alternates: {
    canonical: `${siteConfig.url}/o-mne`,
  },
};

const values = [
  {
    icon: <BookOpen size={20} className="text-heat" />,
    title: "Konkrétní čísla",
    text: "Žádné \u201egrilujte dokud je hotovo\u201c. Vždy teplota, čas, gramáž.",
  },
  {
    icon: <ShieldCheck size={20} className="text-heat" />,
    title: "Vlastní zkušenost",
    text: "Píšu jen o věcech, které jsem osobně vyzkoušel. Žádný recyklovaný obsah.",
  },
  {
    icon: <Ruler size={20} className="text-heat" />,
    title: "Bez bullshitu",
    text: "Žádné sponzorované nadšení, žádné affiliate jako jediný důvod recenze.",
  },
];

const timeline = [
  {
    year: "2013",
    title: "První gril",
    text: "Levný uhláč z hypermarketu, spálené kuřecí, hodně kouře. Zápal byl ale od první minuty.",
  },
  {
    year: "2015",
    title: "Weber Kettle",
    text: "Přechod na Weber 47 cm. První pochopení nepřímého grilování, první slušný steak.",
  },
  {
    year: "2017",
    title: "Weber Master-Touch 57 cm",
    text: "Upgrade na větší gril, který používám dodnes. Snake metoda, delší relace, první výsledky, které stálo za to ukazovat.",
  },
  {
    year: "2018",
    title: "První pulled pork",
    text: "9 hodin, 2,8 kg plece, stall mě málem zabil. Výsledek byl tuhý — protože jsem sundal při 82 °C. Poučení přišlo tvrdě.",
  },
  {
    year: "2020",
    title: "Brisket",
    text: "14 hodin přes noc. Hrudí z české řeznictví, hickory štěpky. Výsledek byl dost dobrý na to, aby jsem to chtěl opakovat.",
  },
  {
    year: "2024",
    title: "Griluju.cz",
    text: "Začal jsem psát o grilování. V češtině je pořád málo konkrétních zdrojů — teploty, časy, reálné chyby.",
  },
];

const equipment = [
  { name: "Weber Master-Touch 57 cm", desc: "Hlavní gril na všechno — steaky, pulled pork i celé kuře." },
  { name: "ThermoWorks Thermapen", desc: "Nejlepší investice. Přesná teplota za 2 sekundy." },
  { name: "Weber iGrill / MEATER+", desc: "Bluetooth teploměr na dlouhé uzení. Hlídá teplotu za mě." },
  { name: "Dřevěné štěpky (hickory, třešeň)", desc: "Hickory na hovězí, třešeň na vepřové, jabloň na drůbež." },
];

const tags = [
  "Weber Kettle",
  "Low & Slow",
  "BBQ",
  "Hovězí",
  "Vepřové",
  "Pulled Pork",
  "Brisket",
  "Reverse Sear",
];

export default function AboutPage() {
  return (
    <>
      {/* ─── Hero ──────────────────────────────────────────────────────────────── */}
      <section className="px-6 pt-12 pb-16">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col items-center md:items-start md:flex-row gap-10 md:gap-14">
            <Image
              src="/images/author/petr.jpg"
              alt="Petr Majer"
              width={160}
              height={160}
              className="w-28 h-28 rounded-full md:w-40 md:h-40 md:rounded-2xl object-cover flex-shrink-0 shadow-md"
            />
            <div className="text-center md:text-left">
              <h1
                className="text-3xl md:text-4xl lg:text-[2.75rem] leading-tight text-coal font-bold mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Petr Majer
              </h1>
              <p className="text-stone italic text-lg leading-relaxed mb-5">
                „Nejlepší jídlo je to, u kterého stojíte s pivem v ruce."
              </p>
              <p className="text-coal leading-relaxed mb-4">
                Griluji přes 10 let, téměř výhradně na Weber Kettle. Začínal jsem jako úplný amatér —
                pálil steaky, kupoval hotové marinády a věřil jsem, že „medium" je když je maso růžové uprostřed.
                Dnes vím, že grilování je řemeslo s přesnými čísly, a právě o tom píšu.
              </p>
              <p className="text-coal leading-relaxed mb-6">
                Tenhle web je místo, kde sdílím konkrétní postupy, teploty a chyby, které jsem udělal —
                aby je nemuseli dělat ostatní. Žádné sponzorované příspěvky, žádný bullshit.
                Jen to, co funguje na mém dvorku.
              </p>
              <Link
                href="/recepty"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white bg-heat hover:bg-heat-dk transition-colors duration-150"
              >
                Prohlédnout recepty →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Values ────────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6" style={{ backgroundColor: "var(--bg-warm)" }}>
        <div className="mx-auto max-w-4xl">
          <h2
            className="text-2xl md:text-3xl text-coal mb-12 text-center"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Proč griluju.cz
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {values.map((v) => (
              <div key={v.title} className="text-center">
                <div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4"
                  style={{ backgroundColor: "rgba(232,83,26,0.1)" }}
                >
                  {v.icon}
                </div>
                <h3 className="text-lg text-coal mb-2" style={{ fontFamily: "var(--font-display)" }}>
                  {v.title}
                </h3>
                <p className="text-sm text-stone leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Timeline ──────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-[680px]">
          <h2
            className="text-2xl md:text-3xl text-coal mb-12 text-center"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Moje grilovací cesta
          </h2>
          <div className="space-y-0">
            {timeline.map((item, i) => (
              <div key={item.year} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div
                    className={`rounded-full flex-shrink-0 mt-1.5 bg-heat ${
                      i === timeline.length - 1 ? "w-4 h-4" : "w-3 h-3"
                    }`}
                    style={
                      i === timeline.length - 1
                        ? { boxShadow: "0 0 0 4px rgba(232,83,26,0.2)" }
                        : undefined
                    }
                  />
                  {i < timeline.length - 1 && (
                    <div className="w-px flex-1 mt-1" style={{ backgroundColor: "var(--smoke)" }} />
                  )}
                </div>
                <div className="pb-8">
                  <span className="text-xs font-semibold tracking-[0.15em] uppercase text-heat block mb-1">
                    {item.year}{i === timeline.length - 1 ? " — teď" : ""}
                  </span>
                  <p className="leading-relaxed text-coal">
                    {item.title} — {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Equipment (dark) ──────────────────────────────────────────────────── */}
      <section className="py-20 px-6" style={{ backgroundColor: "var(--dark)" }}>
        <div className="mx-auto max-w-4xl">
          <h2
            className="text-2xl md:text-3xl mb-3 text-center"
            style={{ fontFamily: "var(--font-display)", color: "var(--dark-fg)" }}
          >
            Moje vybavení
          </h2>
          <p
            className="text-center mb-12 max-w-md mx-auto"
            style={{ color: "rgba(245,240,235,0.55)" }}
          >
            To, s čím pracuji každý den. Žádné partnerství — všechno koupené za vlastní.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {equipment.map((e) => (
              <div
                key={e.name}
                className="rounded-2xl px-6 py-5"
                style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid var(--dark-border)" }}
              >
                <h3
                  className="text-lg mb-1"
                  style={{ fontFamily: "var(--font-display)", color: "var(--dark-fg)" }}
                >
                  {e.name}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(245,240,235,0.65)" }}>
                  {e.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Tags ──────────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 text-center">
        <div className="mx-auto max-w-4xl">
          <h2
            className="text-2xl md:text-3xl text-coal mb-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Témata, kterým se věnuji
          </h2>
          <p className="text-stone mb-8 max-w-md mx-auto">
            Klikněte na téma a podívejte se na související recepty a návody.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`/recepty?tag=${encodeURIComponent(tag)}`}
                className="px-4 py-1.5 text-sm leading-5 rounded-full text-stone border border-smoke hover:bg-heat-lt hover:text-heat transition-colors"
                style={{ backgroundColor: "var(--bg-card)" }}
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Newsletter ────────────────────────────────────────────────────────── */}
      <NewsletterCTA />
    </>
  );
}
