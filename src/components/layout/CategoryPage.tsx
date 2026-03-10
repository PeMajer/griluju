import Link from "next/link";
import type { Post } from "@/lib/content";
import { ArticleCard } from "@/components/article/ArticleCard";
import type { Locale } from "@/lib/i18n";

interface CategoryPageProps {
  title: string;
  description: string;
  posts: Post[];
  locale: Locale;
}

export function CategoryPage({ title, description, posts, locale }: CategoryPageProps) {
  return (
    <>
      {/* Header */}
      <section className="border-b border-smoke" style={{ backgroundColor: "var(--bg-warm)" }}>
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
          {/* Breadcrumb */}
          <nav className="mb-5 flex items-center gap-1 text-sm text-stone" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-heat transition-colors duration-150">
              Domů
            </Link>
            <span className="opacity-40">/</span>
            <span className="text-coal">{title}</span>
          </nav>

          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1
                className="mb-3 text-4xl text-coal md:text-5xl"
                style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
              >
                {title}
              </h1>
              <p className="max-w-xl text-lg text-stone leading-relaxed">{description}</p>
            </div>
            <div className="shrink-0">
              <span className="rounded-full border border-smoke bg-bg-card px-4 py-2 font-mono text-sm text-stone">
                {posts.length} {posts.length === 1 ? "článek" : posts.length >= 2 && posts.length <= 4 ? "články" : "článků"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Article grid */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        {posts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <ArticleCard key={post.slug} post={post} locale={locale} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <p className="mb-4 text-5xl">🔥</p>
            <p
              className="mb-2 text-2xl text-coal"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Brzy tady něco bude
            </p>
            <p className="text-stone">Pracuji na prvních článcích v této kategorii.</p>
            <Link
              href="/"
              className="mt-6 inline-block text-sm font-medium text-heat hover:text-heat-dk transition-colors"
            >
              ← Zpět na hlavní stránku
            </Link>
          </div>
        )}
      </section>
    </>
  );
}
