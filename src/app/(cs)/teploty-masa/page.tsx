"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Thermometer } from "lucide-react";
import { meatTemperatures, meatTips } from "@/data/meatTemperatures";
import { NewsletterCTA } from "@/components/ui/NewsletterCTA";

function toF(c: number): number {
  return Math.round(c * 9 / 5 + 32);
}

function getBarWidth(avgC: number): number {
  const min = 43, max = 96;
  return Math.round(Math.min(100, Math.max(5, ((avgC - min) / (max - min)) * 100)));
}

export default function TeplotyMasaPage() {
  const [activeCategory, setActiveCategory] = useState(meatTemperatures[0].id);
  const [unit, setUnit] = useState<"C" | "F">("C");

  const current = meatTemperatures.find((c) => c.id === activeCategory) ?? meatTemperatures[0];

  function formatTemp(minC: number, maxC: number): string {
    if (unit === "C") return `${minC}–${maxC} °C`;
    return `${toF(minC)}–${toF(maxC)} °F`;
  }

  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="py-14 md:py-20 border-b border-smoke" style={{ backgroundColor: "var(--bg-warm)" }}>
        <div className="mx-auto max-w-4xl px-6">
          <span
            className="mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-mono uppercase tracking-wider"
            style={{ backgroundColor: "var(--heat-lt)", color: "var(--heat)" }}
          >
            <Thermometer size={14} />
            Interaktivní průvodce
          </span>
          <h1
            className="mb-4 text-3xl md:text-5xl text-coal leading-tight"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
          >
            Teploty masa na grilu
          </h1>
          <p className="max-w-xl text-lg text-stone leading-relaxed">
            Přesné vnitřní teploty pro každý druh masa a stupeň propečení.
            Měřte termometrem — oko vás oklame, číslo ne.
          </p>
        </div>
      </section>

      {/* ─── Interactive table ────────────────────────────────────────────────── */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-6">
          {/* Category + unit controls */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-8">
            {/* Category filter */}
            <div className="flex flex-wrap gap-2">
              {meatTemperatures.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-150 ${
                    activeCategory === cat.id
                      ? "text-white bg-heat"
                      : "text-stone bg-bg-warm border border-smoke hover:border-heat hover:text-heat"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Unit toggle */}
            <div
              className="flex rounded-full overflow-hidden border border-smoke text-sm font-medium"
              style={{ backgroundColor: "var(--bg-warm)" }}
            >
              {(["C", "F"] as const).map((u) => (
                <button
                  key={u}
                  onClick={() => setUnit(u)}
                  className={`px-4 py-2 transition-colors duration-150 ${
                    unit === u ? "text-white bg-heat" : "text-stone hover:text-heat"
                  }`}
                >
                  °{u}
                </button>
              ))}
            </div>
          </div>

          {/* Temperature rows */}
          <div
            className="overflow-hidden rounded-xl"
            style={{ backgroundColor: "var(--dark)", border: "1px solid var(--dark-border)" }}
          >
            <div className="p-2">
              {current.rows.map((row, i) => {
                const avgC = (row.minC + row.maxC) / 2;
                const barWidth = getBarWidth(avgC);
                return (
                  <div
                    key={row.level}
                    className="flex items-center gap-4 rounded-lg px-4 py-3 mb-1 last:mb-0"
                    style={{ backgroundColor: i % 2 === 0 ? "rgba(255,255,255,0.04)" : "transparent" }}
                  >
                    {/* Color dot */}
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: row.color }}
                    />

                    {/* Level name */}
                    <span
                      className="w-48 text-sm font-medium shrink-0"
                      style={{ color: "var(--dark-fg)" }}
                    >
                      {row.level}
                    </span>

                    {/* Bar */}
                    <div className="flex-1 h-2 rounded-full overflow-hidden hidden sm:block" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${barWidth}%`, backgroundColor: row.color }}
                      />
                    </div>

                    {/* Temperature */}
                    <span
                      className="shrink-0 font-mono font-medium text-sm"
                      style={{ color: row.color, minWidth: "8rem", textAlign: "right" }}
                    >
                      {formatTemp(row.minC, row.maxC)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-6 mt-6 mb-2">
            {[
              { color: "#EF4444", label: "Rare / krvavé" },
              { color: "var(--heat)", label: "Medium / středně" },
              { color: "#A8A29E", label: "Well done / propečené" },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-2 text-sm text-stone">
                <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: l.color }} />
                {l.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Tips ─────────────────────────────────────────────────────────────── */}
      <section className="py-12 border-t border-smoke" style={{ backgroundColor: "var(--bg-warm)" }}>
        <div className="mx-auto max-w-4xl px-6">
          <h2
            className="mb-8 text-2xl md:text-3xl text-coal"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Na co si dát pozor
          </h2>
          <div className="grid gap-5 md:grid-cols-2">
            {meatTips.map((tip) => (
              <div
                key={tip.title}
                className="rounded-xl p-5 border border-smoke"
                style={{ backgroundColor: "var(--bg-card)" }}
              >
                <h3
                  className="mb-2 text-base font-medium text-coal"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {tip.title}
                </h3>
                <p className="text-sm text-stone leading-relaxed">{tip.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/nastroje"
              className="inline-flex items-center gap-2 text-sm font-medium text-heat hover:text-heat-dk transition-colors"
            >
              Prohlédnout vybavení <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <NewsletterCTA />
    </>
  );
}
