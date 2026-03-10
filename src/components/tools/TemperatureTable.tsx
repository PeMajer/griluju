"use client";

import { useState } from "react";

type Doneness = "rare" | "medium-rare" | "medium" | "medium-well" | "well-done";
type Category = "Vše" | "Hovězí" | "Vepřové" | "Drůbež" | "Jehněčí" | "Ryby";

interface TempRow {
  meat: string;
  category: Exclude<Category, "Vše">;
  doneness: string;
  donenessType: Doneness;
  temp: number;
  rest: string;
}

const data: TempRow[] = [
  // Hovězí
  { meat: "Steak (hovězí)", category: "Hovězí", doneness: "Rare", donenessType: "rare", temp: 52, rest: "5 min" },
  { meat: "Steak (hovězí)", category: "Hovězí", doneness: "Medium Rare", donenessType: "medium-rare", temp: 57, rest: "5 min" },
  { meat: "Steak (hovězí)", category: "Hovězí", doneness: "Medium", donenessType: "medium", temp: 63, rest: "5 min" },
  { meat: "Steak (hovězí)", category: "Hovězí", doneness: "Medium Well", donenessType: "medium-well", temp: 68, rest: "3 min" },
  { meat: "Steak (hovězí)", category: "Hovězí", doneness: "Well Done", donenessType: "well-done", temp: 74, rest: "3 min" },
  { meat: "Burger (hovězí)", category: "Hovězí", doneness: "Well Done", donenessType: "well-done", temp: 74, rest: "2 min" },
  { meat: "Brisket", category: "Hovězí", doneness: "Propečený", donenessType: "well-done", temp: 96, rest: "60 min" },
  // Vepřové
  { meat: "Vepřová panenka", category: "Vepřové", doneness: "Medium", donenessType: "medium", temp: 63, rest: "5 min" },
  { meat: "Vepřová kotleta", category: "Vepřové", doneness: "Medium", donenessType: "medium", temp: 63, rest: "3 min" },
  { meat: "Pulled Pork", category: "Vepřové", doneness: "Propečený", donenessType: "well-done", temp: 93, rest: "30 min" },
  { meat: "Žebra (ribs)", category: "Vepřové", doneness: "Propečený", donenessType: "well-done", temp: 88, rest: "10 min" },
  // Drůbež
  { meat: "Kuřecí prsa", category: "Drůbež", doneness: "Propečená", donenessType: "well-done", temp: 74, rest: "5 min" },
  { meat: "Kuřecí stehno", category: "Drůbež", doneness: "Propečené", donenessType: "well-done", temp: 79, rest: "5 min" },
  { meat: "Celé kuře", category: "Drůbež", doneness: "Propečené", donenessType: "well-done", temp: 74, rest: "10 min" },
  { meat: "Krocan (prsa)", category: "Drůbež", doneness: "Propečená", donenessType: "well-done", temp: 74, rest: "15 min" },
  // Jehněčí
  { meat: "Jehněčí kotleta", category: "Jehněčí", doneness: "Medium Rare", donenessType: "medium-rare", temp: 57, rest: "5 min" },
  { meat: "Jehněčí kýta", category: "Jehněčí", doneness: "Medium", donenessType: "medium", temp: 63, rest: "15 min" },
  // Ryby
  { meat: "Losos", category: "Ryby", doneness: "Medium", donenessType: "medium", temp: 52, rest: "2 min" },
  { meat: "Tuňák", category: "Ryby", doneness: "Medium Rare", donenessType: "medium-rare", temp: 46, rest: "1 min" },
  { meat: "Bílá ryba (treska)", category: "Ryby", doneness: "Propečená", donenessType: "well-done", temp: 63, rest: "2 min" },
];

const categories: Category[] = ["Vše", "Hovězí", "Vepřové", "Drůbež", "Jehněčí", "Ryby"];

function getTempColor(type: Doneness): string {
  if (type === "rare") return "var(--temp-rare)";
  if (type === "medium-rare" || type === "medium") return "var(--temp-medium)";
  return "var(--temp-well)";
}

export function TemperatureTable() {
  const [activeCategory, setActiveCategory] = useState<Category>("Vše");

  const filtered = activeCategory === "Vše"
    ? data
    : data.filter((row) => row.category === activeCategory);

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-150 ${
              activeCategory === cat
                ? "bg-heat text-white"
                : "bg-bg-warm text-stone hover:text-coal border border-smoke"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-hidden rounded-xl border border-smoke">
        <table className="w-full">
          <thead>
            <tr className="bg-bg-warm border-b border-smoke">
              <th className="text-left px-4 py-3 text-sm font-semibold text-coal">Druh masa</th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-coal">Stupeň propečení</th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-coal">Teplota (°C)</th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-coal">Čas odpočinku</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => (
              <tr key={i} className="border-b border-smoke last:border-b-0 hover:bg-bg-warm transition-colors">
                <td className="px-4 py-3 text-sm text-coal">{row.meat}</td>
                <td className="px-4 py-3">
                  <span
                    className="inline-block text-xs font-mono px-2 py-0.5 rounded"
                    style={{
                      color: getTempColor(row.donenessType),
                      backgroundColor: "var(--bg-warm)",
                      borderLeft: `3px solid ${getTempColor(row.donenessType)}`,
                    }}
                  >
                    {row.doneness}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className="font-mono font-bold text-base"
                    style={{ color: getTempColor(row.donenessType) }}
                  >
                    {row.temp} °C
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-stone">{row.rest}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden flex flex-col gap-3">
        {filtered.map((row, i) => (
          <div
            key={i}
            className="rounded-xl border border-smoke bg-bg-card p-4"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-medium text-coal text-sm">{row.meat}</p>
                <p className="text-xs text-stone mt-0.5">{row.category}</p>
              </div>
              <span
                className="font-mono font-bold text-lg shrink-0"
                style={{ color: getTempColor(row.donenessType) }}
              >
                {row.temp} °C
              </span>
            </div>
            <div className="mt-3 flex items-center gap-3 text-xs">
              <span
                className="px-2 py-0.5 rounded font-mono"
                style={{
                  color: getTempColor(row.donenessType),
                  backgroundColor: "var(--bg-warm)",
                  borderLeft: `2px solid ${getTempColor(row.donenessType)}`,
                }}
              >
                {row.doneness}
              </span>
              <span className="text-stone">Odpočinek: {row.rest}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
