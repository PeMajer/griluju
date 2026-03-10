"use client"

import { useState } from "react"
import { Sun, Moon, Check, ArrowRight, Clock, Mail, Flame } from "lucide-react"

export default function GrilujuHomepage() {
  const [isDark, setIsDark] = useState(false)

  return (
    <div style={{ backgroundColor: "#FAFAF8", color: "#1C1917", minHeight: "100vh" }}>
      {/* Sticky Navigation */}
      <header
        className="sticky top-0 z-50"
        style={{
          backgroundColor: "rgba(250,250,248,0.88)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid #E8E4E0",
        }}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-2">
            <span className="text-xl">🔥</span>
            <span style={{ fontFamily: "Georgia, serif", fontSize: "1.5rem", fontWeight: 600 }}>
              griluju
            </span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {["Recepty", "Návody", "Recenze", "Nástroje"].map((link) => (
              <a
                key={link}
                href="#"
                className="transition-colors hover:opacity-70"
                style={{ color: "#78716C", fontSize: "0.95rem" }}
              >
                {link}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDark(!isDark)}
              className="rounded-full p-2 transition-colors"
              style={{ backgroundColor: "#F5F0E8" }}
              aria-label="Toggle theme"
            >
              {isDark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>
            <a
              href="#newsletter"
              className="hidden rounded-full px-4 py-2 text-sm font-medium transition-all sm:block"
              style={{
                border: "1.5px solid #F97316",
                color: "#F97316",
                backgroundColor: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#FFF7ED"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent"
              }}
            >
              Newsletter
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column */}
          <div className="flex flex-col justify-center">
            <span
              className="mb-4 text-sm font-medium uppercase tracking-widest"
              style={{ color: "#F97316" }}
            >
              Griluji přes 10 let.
            </span>
            <h1
              className="mb-6 text-balance text-4xl leading-tight md:text-5xl lg:text-6xl"
              style={{ fontFamily: "Georgia, serif", fontWeight: 400 }}
            >
              Grilování,
              <br />
              <span style={{ fontStyle: "italic", color: "#F97316" }}>které funguje</span>
            </h1>
            <p className="mb-8 max-w-md text-lg" style={{ color: "#78716C" }}>
              Recepty, návody a tipy z vlastní zkušenosti. Bez bullshitu.
            </p>

            <div className="mb-12 flex flex-wrap items-center gap-4">
              <a
                href="#recepty"
                className="inline-flex items-center gap-2 rounded-lg px-6 py-3 font-medium text-white transition-all"
                style={{ backgroundColor: "#F97316" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#C2410C"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#F97316"
                }}
              >
                Procházet recepty
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#author"
                className="inline-flex items-center gap-1 font-medium transition-colors"
                style={{ color: "#1C1917" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#F97316"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#1C1917"
                }}
              >
                <span style={{ textDecoration: "underline", textUnderlineOffset: "4px" }}>Kdo jsem</span>
                <span>→</span>
              </a>
            </div>

            {/* Stats Row */}
            <div
              className="grid grid-cols-2 gap-6 rounded-2xl p-6 md:grid-cols-4"
              style={{ backgroundColor: "#F5F0E8" }}
            >
              {[
                { value: "10+", label: "let" },
                { value: "Weber", label: "Kettle" },
                { value: "100%", label: "vlastní fotky" },
                { value: "Low", label: "& slow" },
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div
                    className="text-2xl md:text-3xl"
                    style={{ fontFamily: "Georgia, serif", fontWeight: 400 }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm" style={{ color: "#78716C" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Hero Image */}
          <div className="relative">
            <div
              className="aspect-[4/3] overflow-hidden rounded-xl"
              style={{
                backgroundColor: "#E8E4E0",
                boxShadow: "0 12px 40px rgba(249,115,22,0.12)",
              }}
            >
              <div className="flex h-full items-center justify-center" style={{ color: "#78716C" }}>
                <div className="text-center">
                  <Flame className="mx-auto mb-4 h-16 w-16" style={{ color: "#F97316" }} />
                  <p className="text-lg">Hero Image</p>
                  <p className="text-sm">4:3 aspect ratio</p>
                </div>
              </div>
            </div>
            {/* Floating Badge */}
            <div
              className="absolute -bottom-4 -left-4 flex items-center gap-3 rounded-lg px-4 py-3 text-white shadow-lg md:bottom-6 md:left-6"
              style={{ backgroundColor: "#F97316" }}
            >
              <span className="text-xl">🔥</span>
              <div>
                <div className="font-medium">Pulled Pork</div>
                <div className="text-sm opacity-90">6 hodin na grilu</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Card Grid */}
      <section id="recepty" className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="text-3xl md:text-4xl" style={{ fontFamily: "Georgia, serif" }}>
            Nejnovější recepty
          </h2>
          <a
            href="#"
            className="hidden items-center gap-1 text-sm font-medium transition-colors sm:flex"
            style={{ color: "#78716C" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#F97316"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#78716C"
            }}
          >
            Všechny recepty <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              category: "RECEPT",
              title: "Pulled Pork krok za krokem",
              excerpt:
                "Detailní návod na přípravu dokonalého pulled pork na Weber Kettle. Od výběru masa po finální servírování.",
              time: "15 min čtení",
            },
            {
              category: "NÁVOD",
              title: "Jak grilovat steak",
              excerpt:
                "Vše co potřebujete vědět o grilování hovězího steaku. Teploty, časy a techniky pro perfektní výsledek.",
              time: "8 min čtení",
            },
            {
              category: "RECENZE",
              title: "Nejlepší grily do 5000 Kč",
              excerpt:
                "Přehled nejlepších grilů v cenové kategorii do 5000 Kč. Testoval jsem osobně a vybral top 3.",
              time: "12 min čtení",
            },
          ].map((article, idx) => (
            <ArticleCard key={idx} {...article} />
          ))}
        </div>
      </section>

      {/* Tool Teaser - Dark Section */}
      <section style={{ backgroundColor: "#1C1917" }} className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center">
              <span
                className="mb-4 inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-sm font-medium"
                style={{ backgroundColor: "rgba(249,115,22,0.15)", color: "#F97316" }}
              >
                🛠 Nástroj zdarma
              </span>
              <h2
                className="mb-4 text-3xl text-white md:text-4xl"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Teploty masa na grilu
              </h2>
              <p className="mb-6 max-w-md" style={{ color: "#A8A29E" }}>
                Interaktivní tabulka s doporučenými teplotami pro různé druhy masa. Už nikdy
                nepřepálíte steak.
              </p>
              <a
                href="#"
                className="inline-flex w-fit items-center gap-2 rounded-lg px-6 py-3 font-medium text-white transition-all"
                style={{ backgroundColor: "#F97316" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#C2410C"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#F97316"
                }}
              >
                Otevřít tabulku <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            {/* Temperature Table Preview */}
            <div
              className="overflow-hidden rounded-xl"
              style={{ backgroundColor: "#292524", border: "1px solid #44403C" }}
            >
              <div className="p-6">
                <div className="mb-4 text-sm font-medium uppercase tracking-wide text-white">
                  Hovězí steak
                </div>
                <div className="space-y-3">
                  {[
                    { level: "Rare", temp: "52°C", color: "#EF4444" },
                    { level: "Medium Rare", temp: "55°C", color: "#F97316" },
                    { level: "Medium", temp: "60°C", color: "#F97316" },
                    { level: "Medium Well", temp: "65°C", color: "#A8A29E" },
                    { level: "Well Done", temp: "70°C", color: "#78716C" },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-lg px-4 py-3"
                      style={{ backgroundColor: "#1C1917" }}
                    >
                      <span style={{ color: item.color }}>{item.level}</span>
                      <span
                        className="font-mono font-medium"
                        style={{ color: "#FAFAFA", fontFamily: "monospace" }}
                      >
                        {item.temp}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Author Bio Section */}
      <section id="author" style={{ backgroundColor: "#F5F0E8" }} className="py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div
            className="mx-auto mb-6 h-24 w-24 overflow-hidden rounded-full"
            style={{ backgroundColor: "#E8E4E0" }}
          >
            <div className="flex h-full items-center justify-center text-4xl">👨‍🍳</div>
          </div>
          <h3 className="mb-2 text-2xl md:text-3xl" style={{ fontFamily: "Georgia, serif" }}>
            Petr Majer
          </h3>
          <p className="mx-auto mb-6 max-w-lg" style={{ color: "#78716C" }}>
            Griluji přes 10 let na Weber Kettle. Píšu o tom, co funguje a co ne. Žádné sponzorované
            příspěvky, žádný bullshit – jen poctivé zkušenosti z vlastního dvorku.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {["Weber Kettle", "Low & Slow", "BBQ", "Hovězí", "Vepřové"].map((tag) => (
              <span
                key={tag}
                className="rounded-full px-3 py-1 text-sm"
                style={{ backgroundColor: "#E8E4E0", color: "#78716C" }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section id="newsletter" className="py-16">
        <div className="mx-auto max-w-xl px-6 text-center">
          <div
            className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-xl"
            style={{ backgroundColor: "#FFF7ED" }}
          >
            <Flame className="h-7 w-7" style={{ color: "#F97316" }} />
          </div>
          <h2 className="mb-4 text-2xl md:text-3xl" style={{ fontFamily: "Georgia, serif" }}>
            Recepty rovnou do mailu
          </h2>
          <p className="mb-8" style={{ color: "#78716C" }}>
            Přihlaste se k odběru a dostávejte nové recepty a tipy přímo do vaší schránky.
          </p>

          <form className="mb-8 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Mail
                className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2"
                style={{ color: "#78716C" }}
              />
              <input
                type="email"
                placeholder="vas@email.cz"
                className="w-full rounded-full py-3 pl-12 pr-4 outline-none transition-all focus:ring-2"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E8E4E0",
                  color: "#1C1917",
                }}
              />
            </div>
            <button
              type="submit"
              className="rounded-full px-6 py-3 font-medium text-white transition-all"
              style={{ backgroundColor: "#F97316" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#C2410C"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#F97316"
              }}
            >
              Odebírat
            </button>
          </form>

          <div className="space-y-2">
            {[
              "Nové recepty každý týden",
              "Exkluzivní tipy pro odběratele",
              "Žádný spam, slibuji",
            ].map((benefit, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center gap-2 text-sm"
                style={{ color: "#78716C" }}
              >
                <Check className="h-4 w-4" style={{ color: "#F97316" }} />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #E8E4E0" }} className="py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
            <div>
              <a href="/" className="flex items-center justify-center gap-2 md:justify-start">
                <span className="text-xl">🔥</span>
                <span style={{ fontFamily: "Georgia, serif", fontSize: "1.25rem", fontWeight: 600 }}>
                  griluju
                </span>
              </a>
              <p className="mt-2 text-sm" style={{ color: "#78716C" }}>
                Recepty a tipy na grilování z vlastní zkušenosti.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              {["Recepty", "Návody", "Recenze", "Nástroje", "O mně"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-sm transition-colors"
                  style={{ color: "#78716C" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#F97316"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#78716C"
                  }}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div
            className="mt-8 pt-8 text-center text-sm"
            style={{ borderTop: "1px solid #E8E4E0", color: "#78716C" }}
          >
            © 2026 griluju.cz. Všechna práva vyhrazena.
          </div>
        </div>
      </footer>
    </div>
  )
}

function ArticleCard({
  category,
  title,
  excerpt,
  time,
}: {
  category: string
  title: string
  excerpt: string
  time: string
}) {
  return (
    <article
      className="group cursor-pointer overflow-hidden rounded-xl transition-all duration-300"
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #E8E4E0",
        boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)"
        e.currentTarget.style.borderColor = "#F97316"
        e.currentTarget.style.boxShadow = "0 12px 40px rgba(249,115,22,0.12)"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)"
        e.currentTarget.style.borderColor = "#E8E4E0"
        e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,0.06)"
      }}
    >
      {/* Image Placeholder */}
      <div className="aspect-video" style={{ backgroundColor: "#F5F0E8" }}>
        <div
          className="flex h-full items-center justify-center"
          style={{ color: "#78716C" }}
        >
          <Flame className="h-8 w-8" style={{ color: "#F97316", opacity: 0.5 }} />
        </div>
      </div>

      <div className="p-6">
        <span
          className="mb-3 inline-block rounded px-2 py-1 text-xs font-medium uppercase tracking-wide"
          style={{
            backgroundColor: "#FFF7ED",
            color: "#F97316",
            fontFamily: "monospace",
          }}
        >
          {category}
        </span>
        <h3
          className="mb-2 text-xl transition-colors group-hover:text-orange-500"
          style={{ fontFamily: "Georgia, serif", color: "#1C1917" }}
        >
          {title}
        </h3>
        <p
          className="mb-4 line-clamp-2 text-sm"
          style={{ color: "#78716C" }}
        >
          {excerpt}
        </p>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 text-sm" style={{ color: "#78716C" }}>
            <Clock className="h-4 w-4" />
            {time}
          </span>
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            style={{ color: "#F97316" }}
          />
        </div>
      </div>
    </article>
  )
}
