import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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

export default function HomePage() {
  const posts = getAllPosts();
  const featuredPost = posts[0];
  const restPosts = posts.slice(1, 7);

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
        <div className="relative mx-auto max-w-6xl w-full px-6 py-24">
          <div className="max-w-xl animate-fade-up">
            <span className="mb-4 inline-block font-mono text-xs uppercase tracking-widest text-heat">
              Griluji přes 10 let
            </span>
            <h1
              className="mb-6 text-5xl md:text-6xl lg:text-7xl leading-tight"
              style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--dark-fg)" }}
            >
              Grilování,{" "}
              <em className="text-heat">které funguje</em>
            </h1>
            <p className="mb-8 text-lg leading-relaxed max-w-md" style={{ color: "var(--dark-fg-muted)" }}>
              Recepty, návody a tipy z vlastní zkušenosti. Bez bullshitu.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/recepty"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium text-white bg-heat hover:bg-heat-dk transition-colors duration-150"
              >
                Procházet recepty
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/o-mne"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium transition-colors duration-150"
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
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
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

        {posts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredPost && (
              <ArticleCard post={featuredPost} locale="cs" featured animationDelay={0} />
            )}
            {restPosts.map((post, i) => (
              <ArticleCard key={post.slug} post={post} locale="cs" animationDelay={(i + 1) * 80} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-stone">
            <p className="text-4xl mb-4">🔥</p>
            <p>První recepty brzy přibydou.</p>
          </div>
        )}
      </section>

      {/* ─── Teploty masa — dark teaser ──────────────────────────────────────── */}
      <section className="py-16" style={{ backgroundColor: "var(--dark)" }}>
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Left */}
            <div className="flex flex-col justify-center">
              <span
                className="mb-4 inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-sm font-medium"
                style={{ backgroundColor: "rgba(232,83,26,0.15)", color: "var(--heat)" }}
              >
                🌡 Interaktivní nástroj
              </span>
              <h2
                className="mb-4 text-3xl md:text-4xl"
                style={{ fontFamily: "var(--font-display)", color: "var(--dark-fg)", fontWeight: 700 }}
              >
                Teploty masa na grilu
              </h2>
              <p className="mb-6 max-w-md" style={{ color: "var(--dark-fg-muted)" }}>
                Interaktivní tabulka s doporučenými teplotami pro různé druhy masa
                s přepínáním °C/°F. Už nikdy nepřepálíte steak.
              </p>
              <Link
                href="/teploty-masa"
                className="inline-flex w-fit items-center gap-2 rounded-full px-6 py-3 font-medium text-white bg-heat hover:bg-heat-dk transition-colors duration-150"
              >
                Otevřít tabulku <ArrowRight size={16} />
              </Link>
            </div>

            {/* Right: temperature preview */}
            <div
              className="overflow-hidden rounded-xl"
              style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid var(--dark-border)" }}
            >
              <div className="p-6">
                <div className="mb-4 text-sm font-mono uppercase tracking-wide" style={{ color: "var(--dark-fg-muted)" }}>
                  Hovězí steak
                </div>
                <div className="space-y-2">
                  {[
                    { level: "Rare", temp: "52 °C", color: "#EF4444" },
                    { level: "Medium Rare", temp: "55 °C", color: "var(--heat)" },
                    { level: "Medium", temp: "60 °C", color: "var(--heat)" },
                    { level: "Medium Well", temp: "65 °C", color: "#A8A29E" },
                    { level: "Well Done", temp: "71 °C", color: "#78716C" },
                  ].map((item) => (
                    <div
                      key={item.level}
                      className="flex items-center justify-between rounded-lg px-4 py-3"
                      style={{ backgroundColor: "rgba(0,0,0,0.25)" }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                        <span style={{ color: "var(--dark-fg)" }}>{item.level}</span>
                      </div>
                      <span className="font-mono font-medium" style={{ color: "var(--dark-fg)" }}>
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

      {/* ─── O mně ────────────────────────────────────────────────────────────── */}
      <section className="py-16 border-t border-smoke" style={{ backgroundColor: "var(--bg-warm)" }}>
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Left: text */}
            <div>
              <span className="mb-3 inline-block font-mono text-xs uppercase tracking-widest text-heat">
                O autorovi
              </span>
              <h2
                className="mb-4 text-3xl md:text-4xl text-coal"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Petr Majer
              </h2>
              <blockquote
                className="mb-5 text-lg text-stone italic border-l-2 border-heat pl-4"
              >
                „Nejlepší jídlo je to, u kterého stojíte s pivem v ruce."
              </blockquote>
              <p className="mb-5 text-stone leading-relaxed">
                Griluji přes 10 let na Weber Kettle. Specializuji se na pomalé grilování,
                pulled pork, brisket a steaky metodou reverse sear. Píšu o tom,
                co funguje — a co ne.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {["Weber Kettle", "Low & Slow", "BBQ", "Hovězí", "Vepřové", "Pulled Pork"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full px-3 py-1 text-sm text-stone border border-smoke"
                    style={{ backgroundColor: "var(--bg-card)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href="/o-mne"
                className="inline-flex items-center gap-2 text-sm font-medium text-heat hover:text-heat-dk transition-colors"
              >
                Číst více o mně <ArrowRight size={14} />
              </Link>
            </div>

            {/* Right: author photo */}
            <div className="relative">
              <div className="overflow-hidden rounded-2xl aspect-[4/5]" style={{ boxShadow: "var(--shadow-hover)" }}>
                <Image
                  src="/images/author/petr.jpg"
                  alt="Petr Majer u grilu"
                  width={640}
                  height={800}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Newsletter CTA ───────────────────────────────────────────────────── */}
      <NewsletterCTA />
    </>
  );
}
