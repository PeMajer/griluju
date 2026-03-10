import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
  { value: "10+", label: "let" },
  { value: "Weber", label: "Kettle" },
  { value: "100%", label: "vlastní fotky" },
  { value: "Low", label: "& slow" },
];

export default function HomePage() {
  const posts = getAllPosts();
  const latestPosts = posts.slice(0, 3);

  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left: text */}
          <div className="flex flex-col justify-center">
            {/* PLACEHOLDER: hero-headline-choice — vyber jednu ze tří variant */}
            {/* Varianta 1 (zvolená): */}
            <span className="mb-4 text-sm font-mono uppercase tracking-widest text-heat">
              Griluji přes 10 let.
            </span>
            <h1
              className="mb-6 text-balance text-4xl leading-tight md:text-5xl lg:text-6xl text-coal"
              style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
            >
              Grilování,
              <br />
              <em className="text-heat not-italic" style={{ fontStyle: "italic" }}>které funguje</em>
            </h1>
            {/* Varianta 2: Steak, <em>který stojí za to</em> */}
            {/* Varianta 3: BBQ bez <em>kompromisů</em> */}
            <p className="mb-8 max-w-md text-lg text-stone leading-relaxed">
              Recepty, návody a tipy z vlastní zkušenosti. Bez bullshitu.
            </p>

            <div className="mb-12 flex flex-wrap items-center gap-4">
              <Link
                href="/recepty"
                className="inline-flex items-center gap-2 rounded-lg px-6 py-3 font-medium text-white bg-heat hover:bg-heat-dk transition-colors duration-150"
              >
                Procházet recepty
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/o-mne"
                className="inline-flex items-center gap-1 font-medium text-coal hover:text-heat transition-colors duration-150"
              >
                <span className="underline underline-offset-4">Kdo jsem</span>
                <span>→</span>
              </Link>
            </div>

            {/* Stats card */}
            <div className="grid grid-cols-4 gap-4 rounded-2xl p-6 bg-bg-warm">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div
                    className="text-2xl md:text-3xl text-coal"
                    style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm text-stone">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: hero image placeholder */}
          <div className="relative">
            <div
              className="aspect-[4/3] overflow-hidden rounded-xl bg-bg-warm border border-smoke flex items-center justify-center"
              style={{ boxShadow: "var(--shadow-hover)" }}
            >
              {/* [VLASTNI FOTO AUTORA] */}
              <div className="text-center text-stone">
                <span className="text-5xl block mb-2">🥩</span>
                <span className="text-sm">Foto autora</span>
              </div>
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 flex items-center gap-3 rounded-lg px-4 py-3 text-white bg-heat shadow-lg md:bottom-6 md:left-6">
              <span className="text-xl">🔥</span>
              <div>
                <div className="font-medium text-sm">Pulled Pork</div>
                <div className="text-xs opacity-90">6 hodin na grilu</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Latest articles ──────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-16 border-t border-smoke">
        <div className="mb-10 flex items-end justify-between">
          <h2
            className="text-3xl md:text-4xl text-coal"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Nejnovější recepty
          </h2>
          <Link
            href="/recepty"
            className="hidden sm:flex items-center gap-1 text-sm font-medium text-stone hover:text-heat transition-colors duration-150"
          >
            Všechny recepty <ArrowRight size={14} />
          </Link>
        </div>

        {latestPosts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
      </section>

      {/* ─── Tool teaser ──────────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#1C1917" }} className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Left */}
            <div className="flex flex-col justify-center">
              <span
                className="mb-4 inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-sm font-medium"
                style={{ backgroundColor: "rgba(249,115,22,0.15)", color: "#F97316" }}
              >
                🛠 Nástroj zdarma
              </span>
              <h2
                className="mb-4 text-3xl text-white md:text-4xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Teploty masa na grilu
              </h2>
              <p className="mb-6 max-w-md" style={{ color: "#A8A29E" }}>
                Interaktivní tabulka s doporučenými teplotami pro různé druhy masa.
                Už nikdy nepřepálíte steak.
              </p>
              <Link
                href="/nastroje/teploty-masa"
                className="inline-flex w-fit items-center gap-2 rounded-lg px-6 py-3 font-medium text-white bg-heat hover:bg-heat-dk transition-colors duration-150"
              >
                Otevřít tabulku <ArrowRight size={16} />
              </Link>
            </div>

            {/* Right: temperature table preview */}
            <div
              className="overflow-hidden rounded-xl"
              style={{ backgroundColor: "#292524", border: "1px solid #44403C" }}
            >
              <div className="p-6">
                <div className="mb-4 text-sm font-mono uppercase tracking-wide" style={{ color: "#A8A29E" }}>
                  Hovězí steak
                </div>
                <div className="space-y-2">
                  {[
                    { level: "Rare", temp: "52 °C", color: "#EF4444" },
                    { level: "Medium Rare", temp: "55 °C", color: "#F97316" },
                    { level: "Medium", temp: "60 °C", color: "#F97316" },
                    { level: "Medium Well", temp: "65 °C", color: "#A8A29E" },
                    { level: "Well Done", temp: "70 °C", color: "#78716C" },
                  ].map((item) => (
                    <div
                      key={item.level}
                      className="flex items-center justify-between rounded-lg px-4 py-3"
                      style={{ backgroundColor: "#1C1917" }}
                    >
                      <span style={{ color: item.color }}>{item.level}</span>
                      <span className="font-mono font-medium" style={{ color: "#FAFAFA" }}>
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

      {/* ─── Author bio ───────────────────────────────────────────────────────── */}
      <section id="author" style={{ backgroundColor: "var(--bg-warm)" }} className="py-16 border-t border-smoke">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div
            className="mx-auto mb-6 h-24 w-24 overflow-hidden rounded-full flex items-center justify-center text-4xl"
            style={{ backgroundColor: "var(--bg-warm)" }}
          >
            👨‍🍳
          </div>
          <h3
            className="mb-2 text-2xl md:text-3xl text-coal"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {siteConfig.author}
          </h3>
          {/* PLACEHOLDER: personal-story — vyplň v docs/todo/README.md */}
          <p className="mx-auto mb-6 max-w-lg text-stone leading-relaxed">
            Griluji přes 10 let na Weber Kettle. Píšu o tom, co funguje a co ne.
            Žádné sponzorované příspěvky, žádný bullshit — jen poctivé zkušenosti z vlastního dvorku.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {["Weber Kettle", "Low & Slow", "BBQ", "Hovězí", "Vepřové"].map((tag) => (
              <span
                key={tag}
                className="rounded-full px-3 py-1 text-sm text-stone border border-smoke"
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
