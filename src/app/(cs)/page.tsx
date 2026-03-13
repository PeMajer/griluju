import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Flame } from "lucide-react";
import { getAllPosts } from "@/lib/content";
import { t, siteConfig } from "@/lib/i18n";
import { ArticleGrid } from "@/components/article/ArticleGrid";
import { NewsletterCTA } from "@/components/ui/NewsletterCTA";

export const metadata: Metadata = {
  title: t("cs", "page.home.title"),
  description: t("cs", "page.home.description"),
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen overflow-hidden flex items-center">
        {/* Background image */}
        <Image
          src="/images/pulled-pork/hero.jpg"
          alt="Pulled pork na grilu"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Gradient overlays */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, rgba(14,9,5,0.92) 0%, rgba(14,9,5,0.55) 50%, transparent 100%)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(14,9,5,0.65) 0%, transparent 50%)" }}
        />

        {/* Content */}
        <div className="relative mx-auto max-w-[75rem] w-full px-6 py-24">
          <div className="max-w-xl animate-fade-up">
            <span className="mb-4 inline-block font-semibold text-sm uppercase tracking-widest text-heat">
              Griluji přes 10 let
            </span>
            <h1
              className="mb-6 text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.1]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 900, color: "var(--dark-fg)" }}
            >
              Grilování,{" "}
              <em className="text-heat whitespace-nowrap">které funguje</em>
            </h1>
            <p className="mb-8 text-lg leading-relaxed max-w-md" style={{ color: "var(--dark-fg-muted)" }}>
              Recepty, návody a tipy z vlastní zkušenosti. Konkrétní čísla, reálné chyby.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/recepty"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white bg-heat hover:bg-heat-dk transition-colors duration-150"
              >
                Procházet recepty
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/o-mne"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-150"
                style={{
                  border: "1px solid rgba(245,240,235,0.35)",
                  color: "var(--dark-fg)",
                }}
              >
                Kdo jsem →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Nejnovější články ────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[75rem] px-6 py-28">
        <div className="mb-16">
          <h2
            className="text-4xl md:text-5xl text-coal"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Nejnovější články
          </h2>
          <p className="mt-3 text-lg text-stone">Recepty, návody a tipy přímo z grilu</p>
        </div>

        <ArticleGrid posts={posts} locale="cs" />
      </section>

      {/* ─── Teploty masa — dark teaser ──────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ backgroundColor: "var(--dark)" }}>
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 md:grid-cols-2">
            {/* Left */}
            <div className="flex flex-col justify-center md:text-left text-center">
              <span
                className="mb-4 inline-flex w-fit mx-auto md:mx-0 items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
                style={{ backgroundColor: "rgba(232,83,26,0.15)", color: "var(--heat)" }}
              >
                <Flame size={14} /> Interaktivní nástroj
              </span>
              <h2
                className="mb-4 text-3xl md:text-4xl"
                style={{ fontFamily: "var(--font-display)", color: "var(--dark-fg)", fontWeight: 700 }}
              >
                Teploty masa na grilu
              </h2>
              <p className="mb-4 max-w-md md:mx-0 mx-auto text-lg leading-relaxed" style={{ color: "var(--dark-fg-muted)" }}>
                Interaktivní tabulka s doporučenými teplotami pro různé druhy masa
                s přepínáním °C/°F. Přesná teplota, ne odhad.
              </p>
              <p className="mb-8 max-w-md md:mx-0 mx-auto leading-relaxed" style={{ color: "var(--dark-fg-muted)" }}>
                Teploty platí pro hovězí, vepřové, drůbež i ryby. Vychází z vlastní praxe.
              </p>
              <Link
                href="/teploty-masa"
                className="inline-flex w-fit md:mx-0 mx-auto items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white bg-heat hover:bg-heat-dk transition-colors duration-150"
              >
                Otevřít tabulku <ArrowRight size={16} />
              </Link>
            </div>

            {/* Right: temperature preview */}
            <div
              className="rounded-2xl overflow-hidden border"
              style={{ backgroundColor: "rgba(255,255,255,0.05)", borderColor: "var(--dark-border)" }}
            >
              {/* Header row */}
              <div
                className="px-6 py-4 border-b"
                style={{ borderColor: "var(--dark-border)" }}
              >
                <span
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "var(--dark-fg-muted)" }}
                >
                  Hovězí steak
                </span>
              </div>
              {/* Temp rows */}
              <div className="divide-y" style={{ borderColor: "var(--dark-border)" }}>
                {[
                  { level: "Rare", temp: "52 °C", color: "hsl(0,72%,50%)" },
                  { level: "Medium Rare", temp: "55 °C", color: "hsl(12,80%,52%)" },
                  { level: "Medium", temp: "60 °C", color: "hsl(25,85%,50%)" },
                  { level: "Medium Well", temp: "65 °C", color: "hsl(35,75%,48%)" },
                  { level: "Well Done", temp: "70 °C", color: "hsl(30,15%,55%)" },
                ].map((item) => (
                  <div key={item.level} className="flex items-center gap-3 px-6 py-3.5">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="font-medium flex-1" style={{ color: item.color }}>{item.level}</span>
                    <span className="font-semibold" style={{ color: "var(--dark-fg)" }}>{item.temp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── O mně ────────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Image
            src="/images/author/petr.jpg"
            alt="Petr Majer"
            width={96}
            height={96}
            className="rounded-full object-cover mx-auto mb-6 border-4 border-bg-card shadow-md"
            style={{ width: 96, height: 96 }}
          />
          <h2
            className="text-3xl text-coal mb-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Petr Majer
          </h2>
          <p className="text-stone italic mb-5 text-lg leading-relaxed">
            „Nejlepší jídlo je to, u kterého stojíte s pivem v ruce."
          </p>
          <p className="text-stone leading-relaxed mb-6">
            Griluju přes 10 let, hlavně na Weberu. Píšu o tom, co funguje a co ne —
            s konkrétními teplotami, časy a chybami ze zkušenosti.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {["Weber Kettle", "Low & Slow", "BBQ", "Hovězí", "Vepřové"].map((tag) => (
              <Link
                key={tag}
                href={`/recepty?tag=${encodeURIComponent(tag)}`}
                className="px-4 py-1.5 text-sm leading-5 rounded-full text-coal bg-bg-warm hover:bg-heat/10 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
          <Link href="/o-mne" className="text-sm font-semibold text-heat hover:underline">
            Číst více →
          </Link>
        </div>
      </section>

      {/* ─── Newsletter CTA ───────────────────────────────────────────────────── */}
      <NewsletterCTA />
    </>
  );
}
