"use client";

import { useState } from "react";
import Link from "next/link";
import { ChefHat, Thermometer, Star } from "lucide-react";
import { equipmentCategories, starterKit } from "@/data/equipmentData";
import { NewsletterCTA } from "@/components/ui/NewsletterCTA";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={13}
          className={i < rating ? "text-heat fill-heat" : "text-smoke"}
        />
      ))}
    </div>
  );
}

export default function NastrojePage() {
  const [activeCategory, setActiveCategory] = useState(equipmentCategories[0].id);

  const current = equipmentCategories.find((c) => c.id === activeCategory) ?? equipmentCategories[0];

  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="pt-12 pb-8 md:pb-12">
        <div className="mx-auto max-w-[75rem] px-6">
          <span
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold mb-4"
            style={{ backgroundColor: "rgba(232,83,26,0.1)", color: "var(--heat)" }}
          >
            <ChefHat size={14} /> Průvodce vybavením
          </span>
          <h1
            className="mb-4 text-4xl md:text-5xl text-coal leading-tight"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
          >
            Nástroje & vybavení
          </h1>
          <p className="max-w-xl text-lg text-stone leading-relaxed">
            Co používám, co jsem vyzkoušel a co bych koupil znovu.
            Konkrétní produkty s konkrétním hodnocením — bez sponzorovaného nadšení.
          </p>
        </div>
      </section>

      {/* ─── Equipment cards ──────────────────────────────────────────────────── */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-[75rem] px-6">
          {/* Category filter */}
          <div className="flex flex-wrap gap-3 mb-10">
            {equipmentCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-colors duration-150 ${
                  activeCategory === cat.id
                    ? "text-white bg-heat"
                    : "text-coal bg-bg-warm"
                }`}
              >
                <cat.icon size={15} />
                {cat.name}
              </button>
            ))}
          </div>

          {/* Category heading */}
          <div className="flex items-center gap-3 mb-8">
            <current.icon size={24} className="text-heat shrink-0" />
            <div>
              <h2 className="text-xl md:text-2xl text-coal font-bold" style={{ fontFamily: "var(--font-display)" }}>
                {current.name}
              </h2>
              <p className="text-stone text-sm">{current.description}</p>
            </div>
          </div>

          {/* Items grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {current.items.map((item) => (
              <div
                key={item.name}
                className="rounded-2xl overflow-hidden flex flex-col border border-smoke hover:shadow-md transition-all"
                style={{ backgroundColor: "var(--bg-card)" }}
              >
                <div className="p-5 flex flex-col flex-1">
                  {/* Status + rating row */}
                  <div className="flex items-center justify-between mb-3">
                    {item.status ? (
                      <span
                        className="text-xs font-medium px-2.5 py-1 rounded-full"
                        style={
                          item.status === "current"
                            ? { backgroundColor: "var(--heat-lt)", color: "var(--heat)" }
                            : { backgroundColor: "var(--bg-warm)", color: "var(--stone)" }
                        }
                      >
                        {item.status === "current" ? "✓ Aktuálně používám" : "Používal jsem"}
                      </span>
                    ) : (
                      <span />
                    )}
                    <StarRating rating={item.rating} />
                  </div>

                  {/* Name */}
                  <h3
                    className="mb-2 text-lg text-coal"
                    style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
                  >
                    {item.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-stone leading-relaxed mb-4 flex-1">{item.description}</p>

                  {/* Tip box */}
                  <div className="tip-box text-sm text-stone mb-4">
                    <strong className="text-coal text-xs font-mono uppercase tracking-wide">Tip: </strong>
                    {item.tip}
                  </div>

                  {/* Footer: price + tags */}
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-sm font-medium text-coal">{item.priceRange}</span>
                    <div className="flex flex-wrap gap-1">
                      {item.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded-full text-stone border border-smoke"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Affiliate CTA */}
                  {item.affiliateSlug && (
                    <Link
                      href={`/go/${item.affiliateSlug}`}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-heat hover:text-heat-dk transition-colors"
                    >
                      Zobrazit produkt
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Starter kit ──────────────────────────────────────────────────────── */}
      <section className="py-12 border-t border-smoke" style={{ backgroundColor: "var(--bg-warm)" }}>
        <div className="mx-auto max-w-[75rem] px-6">
          <h2
            className="mb-3 text-2xl md:text-3xl text-coal"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Startovací sada grillmastera
          </h2>
          <p className="mb-8 text-stone">6 věcí, které potřebujete před prvním grilováním.</p>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {starterKit.map((item, index) => (
              <div
                key={item.name}
                className="rounded-xl p-5 border border-smoke hover:shadow-md transition-all"
                style={{ backgroundColor: "var(--bg-card)" }}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className="flex items-center justify-center w-9 h-9 rounded-full shrink-0"
                    style={{ backgroundColor: "rgba(232,83,26,0.1)" }}
                  >
                    <span className="text-lg">{item.icon}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-heat/50">{index + 1}.</span>
                      <p className="text-sm font-semibold text-coal">{item.name}</p>
                    </div>
                    <p className="text-xs text-stone leading-relaxed">{item.reason}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/nastroje/teploty-masa"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white bg-heat hover:bg-heat-dk transition-colors duration-150"
            >
              <Thermometer size={16} /> Tabulka teplot masa
            </Link>
          </div>
        </div>
      </section>

      <NewsletterCTA />
    </>
  );
}
