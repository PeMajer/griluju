"use client";

import { Mail, Check } from "lucide-react";

export function NewsletterCTA() {
  return (
    <section className="py-16 bg-bg-warm border-t border-smoke">
      <div className="mx-auto max-w-xl px-4 text-center">
        {/* Icon */}
        <div className="mx-auto mb-5 w-14 h-14 rounded-2xl bg-heat-lt flex items-center justify-center text-2xl">
          🔥
        </div>

        {/* Heading */}
        <h2 className="font-display text-3xl font-bold text-coal mb-3">
          Recepty rovnou do mailu
        </h2>
        <p className="text-stone mb-8">
          Přihlaste se k odběru a dostávejte nové recepty a tipy přímo do vaší schránky.
        </p>

        {/* Email form — Brevo integration in Phase 2 */}
        <form
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex flex-1 items-center gap-2 rounded-full border border-smoke bg-bg-card px-4 py-2.5">
            <Mail size={16} className="text-stone shrink-0" />
            <input
              type="email"
              placeholder="vas@email.cz"
              className="flex-1 bg-transparent text-sm text-coal placeholder:text-stone outline-none"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-full bg-heat hover:bg-heat-dk text-white text-sm font-medium transition-colors duration-150"
          >
            Odebírat
          </button>
        </form>

        {/* Benefits */}
        <ul className="mt-6 flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 text-sm text-stone">
          {[
            "Nové recepty každý týden",
            "Exkluzivní tipy pro odběratele",
            "Žádný spam, slibuji",
          ].map((benefit) => (
            <li key={benefit} className="flex items-center gap-1.5">
              <Check size={14} className="text-heat shrink-0" />
              {benefit}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
