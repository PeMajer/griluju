"use client";

import { Mail, Check } from "lucide-react";

export function NewsletterCTA() {
  return (
    <section
      id="newsletter"
      className="py-16 border-t"
      style={{
        backgroundColor: "var(--dark)",
        borderColor: "var(--dark-border)",
      }}
    >
      <div className="mx-auto max-w-lg px-6 text-center">
        {/* Heading */}
        <h2
          className="font-display text-2xl md:text-3xl mb-4"
          style={{ color: "var(--dark-fg)", fontWeight: 700 }}
        >
          Recepty přímo do schránky
        </h2>
        <p className="mb-8 max-w-md mx-auto" style={{ color: "var(--dark-fg-muted)" }}>
          Nové recepty, tipy na vybavení a grilovací techniky — přímo do schránky.
          Bez spamu.
        </p>

        {/* Email form — Brevo integration in Phase 2 */}
        <form
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="relative flex-1">
            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "var(--dark-fg-muted)" }} />
            <input
              type="email"
              placeholder="vas@email.cz"
              className="w-full rounded-full py-3 pl-12 pr-4 text-sm outline-none transition-colors"
              style={{
                backgroundColor: "rgba(255,255,255,0.08)",
                border: "1px solid var(--dark-border)",
                color: "var(--dark-fg)",
              }}
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 rounded-full text-white text-sm font-medium transition-colors duration-150 bg-heat hover:bg-heat-dk"
          >
            Odebírat
          </button>
        </form>

        {/* Consent */}
        <p className="text-xs mb-6" style={{ color: "var(--dark-fg-muted)" }}>
          Přihlášením souhlasíte se zpracováním e-mailu.
        </p>

        {/* Benefits */}
        <div className="flex flex-col items-center gap-2">
          {[
            "Nové recepty a návody",
            "Tipy na vybavení pro odběratele",
            "Žádný spam, slibuji",
          ].map((benefit) => (
            <div key={benefit} className="flex items-center gap-2 text-sm" style={{ color: "var(--dark-fg-muted)" }}>
              <Check size={14} className="text-heat shrink-0" />
              <span>{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
