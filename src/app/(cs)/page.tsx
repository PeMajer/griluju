import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/content";
import { t, siteConfig } from "@/lib/i18n";
import { ArticleCard } from "@/components/article/ArticleCard";
import { NewsletterCTA } from "@/components/ui/NewsletterCTA";

export const metadata: Metadata = {
  title: t("cs", "page.home.title"),
  description: t("cs", "page.home.description"),
  alternates: {
    canonical: siteConfig.url,
  },
};

// PLACEHOLDER: stats — vyplň reálná čísla v docs/todo/README.md
const stats = [
  { value: "10+", label: "let u grilu" },
  { value: "Weber Kettle", label: "hlavní vybavení" },
  { value: "100%", label: "vlastní zkušenosti" },
  { value: "Low & slow", label: "specializace" },
];

export default function HomePage() {
  const posts = getAllPosts();
  const latestPosts = posts.slice(0, 3);

  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="bg-bg py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: text */}
            <div>
              {/* PLACEHOLDER: hero-headline-choice — vyber jednu ze tří variant níže */}
              {/* Varianta 1 (zvolená): */}
              <p className="text-sm font-mono uppercase tracking-wider text-heat mb-4">
                Griluji přes 10 let.
              </p>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-coal leading-tight mb-5">
                Grilování,{" "}
                <em className="text-heat not-italic">které funguje</em>
              </h1>
              {/* Varianta 2: Steak, <em>který stojí za to</em> */}
              {/* Varianta 3: BBQ bez <em>kompromisů</em> */}
              <p className="text-stone text-lg mb-8 leading-relaxed">
                Recepty, návody a tipy z vlastní zkušenosti. Bez bullshitu.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/recepty"
                  className="inline-flex items-center px-6 py-3 rounded-full bg-heat hover:bg-heat-dk text-white font-medium transition-colors duration-150"
                >
                  Procházet recepty
                </Link>
                <Link
                  href="/o-mne"
                  className="inline-flex items-center text-coal hover:text-heat font-medium transition-colors duration-150 underline underline-offset-4"
                >
                  Kdo jsem →
                </Link>
              </div>

              {/* Stats */}
              <div className="mt-10 grid grid-cols-4 gap-4">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="font-display text-xl font-bold text-coal">{stat.value}</p>
                    <p className="text-xs text-stone mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: hero image placeholder */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-xl bg-bg-warm border border-smoke flex items-center justify-center text-5xl">
                {/* [VLASTNI FOTO AUTORA] */}
                🥩
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-heat text-white rounded-xl px-4 py-2.5 shadow-lg">
                <p className="font-mono text-xs font-medium">🔥 Pulled Pork</p>
                <p className="text-xs opacity-80">6 hodin na grilu</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Latest articles ──────────────────────────────────────────────────── */}
      <section className="py-16 bg-bg border-t border-smoke">
        <div className="mx-auto max-w-5xl px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl font-bold text-coal">Nejnovější recepty</h2>
            <Link href="/recepty" className="text-sm text-heat hover:text-heat-dk font-medium transition-colors">
              Všechny recepty →
            </Link>
          </div>

          {latestPosts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {latestPosts.map((post) => (
                <ArticleCard key={post.slug} post={post} locale="cs" />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-stone">
              <p className="text-4xl mb-4">🔥</p>
              <p>První recepty brzy přibydou.</p>
            </div>
          )}
        </div>
      </section>

      {/* ─── Tool teaser ──────────────────────────────────────────────────────── */}
      <section className="py-16" style={{ backgroundColor: "var(--bg-warm)", borderTop: "1px solid var(--smoke)" }}>
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid md:grid-cols-2 gap-10 items-center rounded-2xl overflow-hidden bg-[#1C1917] p-8 md:p-12">
            {/* Left */}
            <div>
              <span className="inline-block font-mono text-xs text-heat bg-[rgba(249,115,22,0.12)] px-3 py-1 rounded-full mb-4">
                🛠 Nástroj zdarma
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-[#F5F0E8] mb-3">
                Teploty masa na grilu
              </h2>
              <p className="text-[#A8A29E] mb-6 leading-relaxed">
                Interaktivní tabulka s doporučenými teplotami pro různé druhy masa.
                Nikdy neodhadujte — grilujte přesně.
              </p>
              <Link
                href="/nastroje/teploty-masa"
                className="inline-flex items-center px-6 py-3 rounded-full bg-heat hover:bg-heat-dk text-white font-medium transition-colors duration-150"
              >
                Otevřít tabulku →
              </Link>
            </div>

            {/* Right: temperature preview */}
            <div className="rounded-xl bg-[#141210] border border-[#2C2825] p-5">
              <p className="font-mono text-xs text-[#A8A29E] uppercase tracking-wider mb-4">Hovězí steak</p>
              {[
                { label: "Rare", temp: "52 °C", color: "#EF4444" },
                { label: "Medium Rare", temp: "57 °C", color: "#FB923C" },
                { label: "Medium", temp: "63 °C", color: "#FB923C" },
                { label: "Medium Well", temp: "68 °C", color: "#A8A29E" },
                { label: "Well Done", temp: "74 °C", color: "#A8A29E" },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between py-2.5 border-b border-[#2C2825] last:border-b-0"
                >
                  <span className="text-sm text-[#F5F0E8]">{row.label}</span>
                  <span className="font-mono font-bold text-sm" style={{ color: row.color }}>
                    {row.temp}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Author bio ───────────────────────────────────────────────────────── */}
      <section className="py-16 bg-bg-warm border-t border-smoke text-center">
        <div className="mx-auto max-w-lg px-4">
          <div className="mx-auto mb-4 w-20 h-20 rounded-full bg-heat-lt flex items-center justify-center text-4xl">
            👨‍🍳
          </div>
          <h2 className="font-display text-2xl font-bold text-coal mb-2">
            {siteConfig.author}
          </h2>
          {/* PLACEHOLDER: personal-story — vyplň v docs/todo/README.md */}
          <p className="text-stone mb-5 leading-relaxed">
            Griluju přes 10 let na Weber Kettle. Píšu o tom, co funguje a co ne.
            Žádné sponzorované příspěvky, žádný bullshit — jen poctivé zkušenosti z vlastního dvorku.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {["Weber Kettle", "Low & Slow", "BBQ", "Hovězí", "Vepřové"].map((tag) => (
              <span
                key={tag}
                className="text-xs text-stone border border-smoke rounded-full px-3 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
          <Link href="/o-mne" className="text-sm font-medium text-heat hover:text-heat-dk transition-colors">
            Číst více →
          </Link>
        </div>
      </section>

      {/* ─── Newsletter CTA ───────────────────────────────────────────────────── */}
      <NewsletterCTA />
    </>
  );
}
