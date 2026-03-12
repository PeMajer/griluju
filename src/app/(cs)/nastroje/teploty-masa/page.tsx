"use client";

import { useState } from "react";
import { Thermometer, ThermometerSun, Beef, Egg, Fish, Ham, Crosshair, TrendingUp, Timer } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { NewsletterCTA } from "@/components/ui/NewsletterCTA";

type TempRow = {
  level: string;
  tempC: number[];
  color: string;
  description: string;
};

type MeatCategory = {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
  rows: TempRow[];
};

const COLORS = {
  rare:       "hsl(0,72%,50%)",
  mediumRare: "hsl(12,80%,52%)",
  medium:     "hsl(25,85%,50%)",
  mediumWell: "hsl(35,75%,48%)",
  wellDone:   "hsl(30,15%,55%)",
};

const meatData: MeatCategory[] = [
  {
    id: "beef",
    name: "Hovězí",
    icon: Beef,
    description: "Od steaku přes roštěnou až po low & slow brisket.",
    rows: [
      { level: "Rare (steak)",               tempC: [49, 52], color: COLORS.rare,       description: "Chladný červený střed, měkký" },
      { level: "Medium Rare (steak)",         tempC: [54, 57], color: COLORS.mediumRare, description: "Teplý červený střed, ideální šťavnatost" },
      { level: "Medium (steak)",              tempC: [60, 63], color: COLORS.medium,     description: "Růžový střed, mírně pevnější" },
      { level: "Medium Well (steak)",         tempC: [65, 68], color: COLORS.mediumWell, description: "Lehce růžový, převažuje šedá" },
      { level: "Well Done (steak)",           tempC: [71, 76], color: COLORS.wellDone,   description: "Celý prošedlý, sušší textura" },
      { level: "Brisket",                     tempC: [93, 96], color: COLORS.rare,       description: "Rozpadavé, low & slow 8–14 hodin" },
      { level: "Hovězí žebra (short ribs)",   tempC: [93, 96], color: COLORS.mediumRare, description: "Kolagen rozpuštěný, šťavnaté" },
      { level: "Burger patty",                tempC: [71, 74], color: COLORS.mediumWell, description: "Bezpečná teplota pro mleté maso" },
      { level: "Roastbeef",                   tempC: [54, 57], color: COLORS.mediumRare, description: "Rovnoměrně růžový od kraje ke kraji" },
    ],
  },
  {
    id: "pork",
    name: "Vepřové",
    icon: Ham,
    description: "Od šťavnaté kotlety po low & slow pulled pork.",
    rows: [
      { level: "Kotleta / panenka",   tempC: [63, 65], color: COLORS.medium,     description: "Lehce růžový střed, šťavnaté" },
      { level: "Well Done",           tempC: [71, 74], color: COLORS.wellDone,   description: "Celé progrilované, tradičnější přístup" },
      { level: "Žebra (ribs)",        tempC: [88, 93], color: COLORS.mediumRare, description: "Měkká, odpadávají od kosti" },
      { level: "Pulled Pork (plec)",  tempC: [93, 96], color: COLORS.rare,       description: "Rozpadavé maso, low & slow 10–16 h" },
      { level: "Koleno",              tempC: [88, 93], color: COLORS.medium,     description: "Křupavá kůrka, měkké uvnitř" },
      { level: "Klobása / párek",     tempC: [71, 76], color: COLORS.mediumWell, description: "Propečené do středu, bez růžové" },
    ],
  },
  {
    id: "poultry",
    name: "Drůbež",
    icon: Egg,
    description: "Bezpečnost na prvním místě — drůbež musí být vždy propečená.",
    rows: [
      { level: "Kuřecí prsa",       tempC: [74, 76], color: COLORS.mediumWell, description: "Bezpečná teplota, šťavnaté uvnitř" },
      { level: "Stehna / paličky",  tempC: [82, 85], color: COLORS.medium,     description: "Kolagen se rozloží, měkké maso" },
      { level: "Celé kuře",         tempC: [82, 85], color: COLORS.mediumRare, description: "Měřte v nejtlustší části stehna" },
      { level: "Křídla (wings)",    tempC: [82, 88], color: COLORS.medium,     description: "Křupavá kůže, propečené do kosti" },
      { level: "Kachna",            tempC: [74, 79], color: COLORS.mediumWell, description: "Kůže křupavá, maso propečené" },
      { level: "Krůta",             tempC: [74, 79], color: COLORS.mediumWell, description: "Prsa 74 °C, stehna klidně 82 °C" },
    ],
  },
  {
    id: "fish",
    name: "Ryby",
    icon: Fish,
    description: "Jemné maso vyžaduje přesnost — každý stupeň se počítá.",
    rows: [
      { level: "Tuňák (rare)",               tempC: [43, 46], color: COLORS.rare,       description: "Surový střed, opečená krusta" },
      { level: "Losos (medium)",             tempC: [52, 54], color: COLORS.mediumRare, description: "Sklovitý střed, máslovitá textura" },
      { level: "Losos (propečený)",          tempC: [60, 63], color: COLORS.medium,     description: "Neprůhledný, ale stále vlhký" },
      { level: "Bílá ryba (candát, treska)", tempC: [60, 63], color: COLORS.medium,     description: "Lístkovitá textura, šťavnaté" },
      { level: "Krevety",                    tempC: [57, 60], color: COLORS.mediumWell, description: "Růžové, pružné, nepřevařené" },
      { level: "Chobotnice",                 tempC: [82, 85], color: COLORS.mediumRare, description: "Dlouhé vaření nebo rychlý gril" },
    ],
  },
  {
    id: "lamb",
    name: "Jehněčí",
    icon: Beef,
    description: "Výrazná chuť, kterou nejlépe podtrhne nižší propečení.",
    rows: [
      { level: "Rare (kotleta / rack)",   tempC: [49, 52], color: COLORS.rare,       description: "Červený střed, velmi měkké" },
      { level: "Medium Rare",             tempC: [54, 57], color: COLORS.mediumRare, description: "Ideální pro kotlety a rack" },
      { level: "Medium",                  tempC: [60, 63], color: COLORS.medium,     description: "Růžový střed, plná chuť" },
      { level: "Well Done",               tempC: [71, 76], color: COLORS.wellDone,   description: "Prošedlé, vhodné pro dušení" },
      { level: "Jehněčí kýta",            tempC: [60, 63], color: COLORS.medium,     description: "Medium pro šťavnatý výsledek" },
      { level: "Jehněčí plec (pulled)",   tempC: [88, 93], color: COLORS.rare,       description: "Rozpadavé, low & slow 6–8 hodin" },
    ],
  },
];

const tips: { title: string; text: string; icon: LucideIcon }[] = [
  { title: "Měřte v nejsilnějším místě", text: "Vpíchněte teploměr do středu nejtlustší části masa, mimo kost a tuk.", icon: Crosshair },
  { title: "Carry-over efekt",           text: "Sundejte maso 2–3 °C pod cílovou teplotu. Při odpočinku teplota stoupne.", icon: TrendingUp },
  { title: "Nechte maso odpočinout",     text: "Steak nechte 5–10 minut pod alobalem. Šťávy se lépe rozloží v celém kusu.", icon: Timer },
  { title: "Kvalitní teploměr",          text: "Instantní digitální teploměr je nejlepší investice grillmastera.", icon: Thermometer },
];

const toF = (c: number) => Math.round(c * 9 / 5 + 32);

const formatTemp = (temps: number[], unit: "C" | "F") => {
  if (unit === "F") return `${toF(temps[0])}–${toF(temps[1])} °F`;
  return `${temps[0]}–${temps[1]} °C`;
};

const getBarWidth = (temps: number[]) => {
  const avg = (temps[0] + temps[1]) / 2;
  return Math.min(Math.max(((avg - 30) / 70) * 100, 15), 100);
};

export default function TeplotyMasaPage() {
  const [activeCategory, setActiveCategory] = useState("beef");
  const [unit, setUnit] = useState<"C" | "F">("C");

  const category = meatData.find((c) => c.id === activeCategory)!;

  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="pt-12 pb-8 md:pb-12 px-6">
        <div className="mx-auto max-w-[75rem]">
          <div className="inline-flex items-center gap-2 bg-heat/10 rounded-full px-4 py-1.5 text-xs font-semibold text-heat mb-4">
            <Thermometer size={14} /> Interaktivní průvodce
          </div>
          <h1 className="text-4xl md:text-5xl text-coal leading-tight font-bold mb-3">
            Teploty masa na grilu
          </h1>
          <p className="text-lg text-stone leading-relaxed max-w-2xl">
            Vyberte si druh masa a zjistěte přesné interní teploty pro dokonalý výsledek.
          </p>
        </div>
      </section>

      {/* ─── Tabs + toggle ────────────────────────────────────────────────────── */}
      <section className="pb-8 px-6">
        <div className="mx-auto max-w-[75rem]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Category pills */}
            <div className="flex flex-wrap gap-2">
              {meatData.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
                    activeCategory === cat.id
                      ? "bg-heat text-white"
                      : "bg-bg-warm text-coal hover:bg-heat/10"
                  }`}
                >
                  <cat.icon size={16} />
                  {cat.name}
                </button>
              ))}
            </div>

            {/* °C / °F Toggle */}
            <div className="inline-flex items-center rounded-full p-1 bg-bg-warm shrink-0">
              <button
                onClick={() => setUnit("C")}
                className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                  unit === "C" ? "bg-heat text-white shadow-sm" : "text-stone hover:text-coal"
                }`}
              >
                <ThermometerSun size={14} /> °C
              </button>
              <button
                onClick={() => setUnit("F")}
                className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                  unit === "F" ? "bg-heat text-white shadow-sm" : "text-stone hover:text-coal"
                }`}
              >
                °F
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Temperature panel ────────────────────────────────────────────────── */}
      <section className="pb-16 md:pb-20 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl p-5 md:p-8 shadow-xl" style={{ backgroundColor: "var(--dark)" }}>
            {/* Panel header */}
            <div className="flex items-center gap-3 mb-6">
              <category.icon size={28} style={{ color: "rgba(245,240,235,0.7)" }} />
              <div>
                <h2 className="text-xl md:text-2xl" style={{ fontFamily: "var(--font-display)", color: "var(--dark-fg)" }}>
                  {category.name}
                </h2>
                <p className="text-sm" style={{ color: "rgba(245,240,235,0.5)" }}>
                  {category.description}
                </p>
              </div>
            </div>

            {/* Column headers */}
            <div
              className="grid grid-cols-[1fr_auto] md:grid-cols-[200px_1fr_auto] items-center px-3 md:px-4 py-2 mb-1 text-xs font-semibold uppercase tracking-wider"
              style={{ color: "rgba(245,240,235,0.4)" }}
            >
              <span>Stupeň</span>
              <span className="hidden md:block">Vizuální škála</span>
              <span className="text-right">Teplota</span>
            </div>

            {/* Rows */}
            <div className="space-y-1">
              {category.rows.map((row) => (
                <div
                  key={row.level}
                  className="grid grid-cols-[1fr_auto] md:grid-cols-[200px_1fr_auto] items-center gap-3 md:gap-6 px-3 md:px-4 py-3.5 md:py-4 rounded-xl transition-colors cursor-default"
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(245,240,235,0.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  {/* Level + description */}
                  <div>
                    <div className="flex items-center gap-2.5">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: row.color }} />
                      <span className="font-semibold text-sm md:text-base" style={{ color: row.color }}>
                        {row.level}
                      </span>
                    </div>
                    <p className="text-xs mt-0.5 pl-5" style={{ color: "rgba(245,240,235,0.4)" }}>
                      {row.description}
                    </p>
                    {/* Bar — mobile */}
                    <div className="md:hidden mt-2 pl-5">
                      <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(245,240,235,0.08)" }}>
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${getBarWidth(row.tempC)}%`, background: `linear-gradient(to right, ${row.color}, ${row.color}99)` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bar — desktop */}
                  <div className="hidden md:block">
                    <div className="h-3 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(245,240,235,0.08)" }}>
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${getBarWidth(row.tempC)}%`, background: `linear-gradient(to right, ${row.color}, ${row.color}99)` }}
                      />
                    </div>
                  </div>

                  {/* Temp value */}
                  <span className="font-bold tabular-nums text-right whitespace-nowrap text-sm md:text-base" style={{ color: "var(--dark-fg)" }}>
                    {formatTemp(row.tempC, unit)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Tips ─────────────────────────────────────────────────────────────── */}
      <section className="pb-20 md:pb-24 px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl md:text-3xl text-coal mb-3 font-bold">
            Tipy pro správné měření
          </h2>
          <p className="text-stone text-lg leading-relaxed max-w-lg mb-10">
            Pár pravidel, která vám zaručí perfektní výsledek pokaždé.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {tips.map((tip) => (
              <div
                key={tip.title}
                className="group bg-bg-card border border-smoke rounded-xl p-5 hover:border-heat/30 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3.5">
                  <tip.icon size={20} className="text-heat mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                  <div>
                    <h3 className="text-base text-coal mb-1">{tip.title}</h3>
                    <p className="text-stone text-sm leading-relaxed">{tip.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <NewsletterCTA />
    </>
  );
}
