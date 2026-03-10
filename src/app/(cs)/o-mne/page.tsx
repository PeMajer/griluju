import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Flame, Clock, ThumbsUp } from "lucide-react";
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

const stats = [
  { value: "10+", label: "let u grilu" },
  { value: "40+", label: "pulled porků" },
  { value: "Weber", label: "Kettle 57 cm" },
  { value: "~93 °C", label: "cílová teplota" },
];

const specialties = [
  {
    emoji: "🐷",
    title: "Low & Slow BBQ",
    description:
      "Pulled pork, brisket, žebra. Uzení na nízkých teplotách přes mnoho hodin — to je pro mě vrchol grilování.",
  },
  {
    emoji: "🥩",
    title: "Steaky & hovězí",
    description:
      "Reverse sear je pro mě standard. Suché zrání doma, přesné teploty, klidná ruka na roštu. Ribeye i svíčková.",
  },
  {
    emoji: "🔥",
    title: "Přímý žár",
    description:
      "Burgery, kuřecí stehna, zelenina — ne vše musí trvat hodiny. Zvládám celé menu na jednom grilu pro 10 lidí.",
  },
];

const gear = [
  {
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=640&h=400&fit=crop&q=80",
    name: "Weber Master-Touch 57 cm",
    role: "Hlavní gril",
    note: "Používám od roku 2017. Snake metoda na low & slow, přímý žár na steaky. Jeden gril na všechno.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=640&h=400&fit=crop&q=80",
    name: "ThermoPro TP-16S",
    role: "Teploměr se sondou",
    note: "Bez tohoto vaříte naslepo. Dvě sondy — jedna do masa, druhá na rošt. Neoddiskutovatelná investice.",
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

const values = [
  {
    icon: <Flame size={20} className="text-heat" />,
    title: "Konkrétní čísla",
    text: "Žádné \u201Egrilujte dokud je hotovo\u201C. Vždy teplota, čas, gramáž.",
  },
  {
    icon: <ThumbsUp size={20} className="text-heat" />,
    title: "Vlastní zkušenost",
    text: "Píšu jen o věcech, které jsem osobně vyzkoušel. Žádný recyklovaný obsah.",
  },
  {
    icon: <Clock size={20} className="text-heat" />,
    title: "Bez bullshitu",
    text: "Žádné sponzorované nadšení, žádné affiliate jako jediný důvod recenze.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ─── Hero ──────────────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left */}
          <div>
            <span className="mb-4 inline-block font-mono text-xs uppercase tracking-widest text-heat">
              Frontend vývojář · grilař · Praha
            </span>
            <h1
              className="mb-6 text-4xl leading-tight text-coal md:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
            >
              Jsem Petr Majer
              <br />
              <em className="text-heat" style={{ fontStyle: "italic" }}>
                a griluju rád
              </em>
            </h1>
            <p className="mb-8 max-w-md text-lg text-stone leading-relaxed">
              Přes deset let, jeden Weber Kettle a hodně spáleného kuřete. Dnes
              vím přesně, co funguje a co ne — a tady o tom píšu.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 rounded-2xl p-6 bg-bg-warm">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div
                    className="text-xl md:text-2xl text-coal"
                    style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
                  >
                    {s.value}
                  </div>
                  <div className="mt-1 text-xs text-stone leading-tight">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: portrait */}
          <div className="relative">
            <div
              className="overflow-hidden rounded-2xl aspect-[4/5]"
              style={{ boxShadow: "var(--shadow-hover)" }}
            >
              <Image
                src="https://images.unsplash.com/photo-1547592180-85f173990554?w=800&h=1000&fit=crop&q=80"
                alt="Petr Majer u grilu"
                width={800}
                height={1000}
                priority
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 flex items-center gap-3 rounded-xl px-4 py-3 text-white bg-heat shadow-lg md:bottom-6 md:right-6">
              <span className="text-xl">🔥</span>
              <div>
                <div className="font-medium text-sm">10+ let</div>
                <div className="text-xs opacity-90">u Weberu</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── My story ──────────────────────────────────────────────────────────── */}
      <section className="border-t border-smoke py-16" style={{ backgroundColor: "var(--bg-warm)" }}>
        <div className="mx-auto max-w-3xl px-6">
          <span className="mb-3 inline-block font-mono text-xs uppercase tracking-widest text-heat">
            Můj příběh
          </span>
          <h2
            className="mb-8 text-3xl text-coal md:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Od spáleného kuřete k pulled pork
          </h2>

          <div className="prose max-w-none">
            <p>
              Začal jsem grilovat v roce 2013 na levném uhláči z hypermarketu.
              Kuřecí stehna, hodně kouře, málo trpělivosti. Výsledky byly jedlé —
              ale nic víc. Přesto jsem se u toho cítil lépe než u plotny.
            </p>
            <p>
              Zlom přišel v roce 2015, kdy jsem koupil Weber Kettle. Nepřímé
              grilování, správné rozmístění uhlí, teploměr — najednou to dávalo
              smysl. První steak, který byl skutečně medium rare. První kuře, které
              bylo šťavnaté uvnitř i zvenku.
            </p>
            <blockquote>
              První pulled pork jsem sundal při 82 °C a myslel jsem, že je
              hotový. Byl tuhý jak podrážka. Od té chyby jsem ho dělal přes 40× —
              a vím přesně, kde se to zlomí.
            </blockquote>
            <p>
              Dnes griluju minimálně jednou týdně. Pulled pork je pro mě rutina —
              ale pořád mě baví. Brisket je výzva, která nikdy omrzí. A steak?
              Steak je meditace.
            </p>
            <p>
              Griluju.cz vznikl proto, že v češtině je pořád málo konkrétních
              zdrojů o grilování. Teploty, časy, skutečné chyby. Ne jen
              „grilujte na středním žáru, dokud není hotovo."
            </p>
          </div>
        </div>
      </section>

      {/* ─── Specialties ───────────────────────────────────────────────────────── */}
      <section className="border-t border-smoke py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 text-center">
            <span className="mb-3 inline-block font-mono text-xs uppercase tracking-widest text-heat">
              Specializace
            </span>
            <h2
              className="text-3xl text-coal md:text-4xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Co mě baví nejvíc
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {specialties.map((s) => (
              <div
                key={s.title}
                className="rounded-xl border border-smoke bg-bg-card p-6"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <span className="mb-4 block text-3xl">{s.emoji}</span>
                <h3
                  className="mb-3 text-xl text-coal"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
                >
                  {s.title}
                </h3>
                <p className="text-sm text-stone leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Timeline ──────────────────────────────────────────────────────────── */}
      <section className="border-t border-smoke py-16" style={{ backgroundColor: "var(--bg-warm)" }}>
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-10">
            <span className="mb-3 inline-block font-mono text-xs uppercase tracking-widest text-heat">
              Timeline
            </span>
            <h2
              className="text-3xl text-coal md:text-4xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Milníky u grilu
            </h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[4.5rem] top-0 bottom-0 w-px bg-smoke hidden sm:block" />

            <div className="space-y-8">
              {timeline.map((item) => (
                <div key={item.year} className="flex gap-6 items-start">
                  {/* Year badge */}
                  <div
                    className="shrink-0 w-16 text-right font-mono text-sm font-medium text-heat pt-1"
                  >
                    {item.year}
                  </div>

                  {/* Dot */}
                  <div className="relative shrink-0 hidden sm:flex items-center justify-center">
                    <div className="h-3 w-3 rounded-full bg-heat ring-4 ring-bg-warm mt-1" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 rounded-xl border border-smoke bg-bg-card p-4">
                    <p
                      className="mb-1 font-medium text-coal"
                      style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
                    >
                      {item.title}
                    </p>
                    <p className="text-sm text-stone leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Gear ──────────────────────────────────────────────────────────────── */}
      <section className="border-t border-smoke py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10">
            <span className="mb-3 inline-block font-mono text-xs uppercase tracking-widest text-heat">
              Vybavení
            </span>
            <h2
              className="text-3xl text-coal md:text-4xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Co používám
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {gear.map((item) => (
              <div
                key={item.name}
                className="article-card overflow-hidden rounded-xl border border-smoke bg-bg-card"
              >
                <div className="overflow-hidden aspect-video">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={640}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <span className="mb-2 inline-block font-mono text-xs uppercase tracking-wider text-heat bg-heat-lt px-2 py-1 rounded">
                    {item.role}
                  </span>
                  <h3
                    className="mb-2 text-xl text-coal"
                    style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
                  >
                    {item.name}
                  </h3>
                  <p className="text-sm text-stone leading-relaxed">{item.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Values ────────────────────────────────────────────────────────────── */}
      <section className="py-16" style={{ backgroundColor: "#1C1917" }}>
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 text-center">
            <h2
              className="text-3xl text-white md:text-4xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Jak tady píšu
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="rounded-xl p-6" style={{ backgroundColor: "#292524", border: "1px solid #44403C" }}>
                <div className="mb-3">{v.icon}</div>
                <h3
                  className="mb-2 text-lg text-white"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
                >
                  {v.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#A8A29E" }}>
                  {v.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/recepty"
              className="inline-flex items-center gap-2 rounded-lg px-6 py-3 font-medium text-white bg-heat hover:bg-heat-dk transition-colors duration-150"
            >
              Procházet recepty
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Newsletter ────────────────────────────────────────────────────────── */}
      <NewsletterCTA />
    </>
  );
}
