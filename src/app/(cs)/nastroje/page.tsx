"use client";

import { useState } from "react";
import { Thermometer, ExternalLink, ChefHat, Star } from "lucide-react";
import Link from "next/link";
import { NewsletterCTA } from "@/components/ui/NewsletterCTA";
import { IconCard } from "@/components/ui/IconCard";
import { equipmentData, starterKit } from "@/data/equipmentData";
import type { EquipmentItem } from "@/data/equipmentData";

function EquipmentCard({ item }: { item: EquipmentItem }) {
  return (
    <div className="group bg-bg-card border border-smoke rounded-2xl p-5 md:p-6 hover:border-heat/30 hover:shadow-md transition-all">
      {/* Status badge */}
      {item.status && (
        <div className="mb-3">
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full ${
              item.status === "current"
                ? "bg-heat/10 text-heat"
                : "bg-bg-warm text-stone"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                item.status === "current" ? "bg-heat" : "bg-stone/50"
              }`}
            />
            {item.status === "current" ? "Aktuálně používám" : "Používal jsem"}
          </span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-base md:text-lg text-coal font-semibold leading-snug">
          {item.name}
        </h3>
        <div className="flex items-center gap-0.5 shrink-0">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              className={i < item.rating ? "text-heat fill-heat" : "text-smoke"}
            />
          ))}
        </div>
      </div>

      {/* Description */}
      <p className="text-stone text-sm leading-relaxed mb-3">
        {item.description}
      </p>

      {/* Tip */}
      <div className="tip-box mb-4">
        <p className="text-sm leading-relaxed">
          <span className="font-semibold text-heat">Tip: </span>
          <span className="text-coal/80">{item.tip}</span>
        </p>
      </div>

      {/* Footer: price + tags */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <span className="font-bold text-coal text-sm">{item.priceRange}</span>
        <div className="flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-bg-warm text-stone text-xs font-medium px-2.5 py-0.5 rounded-full"
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
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-heat hover:text-heat-dk transition-colors"
        >
          Zobrazit produkt <ExternalLink size={13} />
        </Link>
      )}
    </div>
  );
}

export default function NastrojePage() {
  const [activeCategory, setActiveCategory] = useState("grills");

  const category = equipmentData.find((c) => c.id === activeCategory)!;

  return (
    <>
      {/* Hero */}
      <section className="pt-12 pb-8 md:pb-12">
        <div className="mx-auto max-w-[75rem] px-6">
          <div className="mb-3">
            <div className="inline-flex items-center gap-2 bg-heat/10 rounded-full px-4 py-1.5 text-xs font-semibold text-heat mb-4">
              <ChefHat size={14} /> Průvodce vybavením
            </div>
            <h1 className="text-4xl md:text-5xl text-coal leading-tight font-bold">
              Nástroje & vybavení
            </h1>
          </div>
          <p className="text-lg text-stone max-w-2xl leading-relaxed">
            Přehled ověřeného vybavení, které používám. Každý kus jsem osobně otestoval na desítkách grilování.
          </p>
        </div>
      </section>

      {/* Category tabs */}
      <section className="pb-8">
        <div className="mx-auto max-w-[75rem] px-6">
          <div className="flex flex-wrap gap-2">
            {equipmentData.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-colors cursor-pointer ${
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
        </div>
      </section>

      {/* Active category content */}
      <section className="pb-16 md:pb-20">
        <div className="mx-auto max-w-[75rem] px-6">
          <div className="flex items-center gap-3 mb-2">
            <category.icon size={24} className="text-heat" />
            <div>
              <h2 className="text-xl md:text-2xl text-coal font-bold">
                {category.name}
              </h2>
              <p className="text-stone text-sm">{category.description}</p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:gap-6 md:grid-cols-2">
            {category.items.map((item) => (
              <EquipmentCard key={item.name} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Starter Kit */}
      <section className="pb-20 md:pb-24 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl text-coal mb-3 font-bold">
              Startovací sada grillmastera
            </h2>
            <p className="text-stone text-lg max-w-lg leading-relaxed">
              6 věcí, se kterými pokryjete 95 % grilování. Začněte tady.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {starterKit.map((item) => (
              <IconCard key={item.name} icon={item.icon} title={item.name} text={item.reason} />
            ))}
          </div>

          {/* CTA to temperature guide */}
          <div className="mt-12 text-center">
            <Link
              href="/teploty-masa"
              className="inline-flex items-center gap-2 bg-heat text-white font-semibold px-6 py-3 rounded-full hover:bg-heat-dk transition-colors text-sm"
            >
              <Thermometer size={16} />
              Tabulka teplot masa
              <ExternalLink size={14} />
            </Link>
          </div>
        </div>
      </section>

      <NewsletterCTA />
    </>
  );
}
