"use client";

import { Flame, Mail, Check } from "lucide-react";

export function NewsletterCTA() {
  return (
    <section className="py-16 bg-bg border-t border-smoke">
      <div className="mx-auto max-w-xl px-6 text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 w-14 h-14 rounded-xl bg-heat-lt flex items-center justify-center">
          <Flame size={28} className="text-heat" />
        </div>

        {/* Heading */}
        <h2 className="font-display text-2xl md:text-3xl font-bold text-coal mb-4">
          Recepty přímo do schránky
        </h2>
        <p className="text-stone mb-8 max-w-md mx-auto">
          Jednou týdně posílám nový recept, tip na vybavení nebo grilovací techniku.
          Žádný spam, jen čisté BBQ.
        </p>

        {/* Email form — Brevo integration in Phase 2 */}
        <form
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="relative flex-1">
            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone" />
            <input
              type="email"
              placeholder="vas@email.cz"
              className="w-full rounded-full py-3 pl-12 pr-4 text-sm text-coal bg-bg-card border border-smoke outline-none focus:border-heat focus:ring-2 focus:ring-heat-lt transition-colors"
              style={{ color: "var(--coal)" }}
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 rounded-full bg-heat hover:bg-heat-dk text-white text-sm font-medium transition-colors duration-150"
          >
            Odebírat
          </button>
        </form>

        {/* GDPR note */}
        <p className="text-xs text-stone mb-6">
          Přihlášením souhlasíte se zpracováním e-mailu. Odhlásit se můžete kdykoliv.
        </p>

        {/* Benefits */}
        <div className="flex flex-col items-center gap-2">
          {[
            "Nové recepty každý týden",
            "Exkluzivní tipy pro odběratele",
            "Žádný spam, slibuji",
          ].map((benefit) => (
            <div key={benefit} className="flex items-center gap-2 text-sm text-stone">
              <Check size={14} className="text-heat shrink-0" />
              <span>{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
