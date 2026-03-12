import Link from "next/link";
import type { Post } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { ArticleGrid } from "@/components/article/ArticleGrid";

interface CategoryPageProps {
  title: string;
  description: string;
  posts: Post[];
  locale: Locale;
  /** Label for the "more" subheading — defaults to "Další {title.toLowerCase()}" */
  moreHeading?: string;
  /** Badge source: "category" (default) or "tag" (meat type on recepty page) */
  badgeSource?: "category" | "tag";
}

export function CategoryPage({ title, description, posts, locale, moreHeading, badgeSource }: CategoryPageProps) {
  const resolvedMoreHeading = moreHeading ?? `Další ${title.toLowerCase()}`;

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
                {posts.length}{" "}
                {posts.length === 1
                  ? "článek"
                  : posts.length >= 2 && posts.length <= 4
                  ? "články"
                  : "článků"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Article grid */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <ArticleGrid posts={posts} locale={locale} moreHeading={resolvedMoreHeading} badgeSource={badgeSource} />
      </section>
    </>
  );
}
