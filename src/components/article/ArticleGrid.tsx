import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Post } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { ArticleCard } from "./ArticleCard";

interface ArticleGridProps {
  posts: Post[];
  locale: Locale;
  /** Label for the "more articles" subheading (default: "Další články") */
  moreHeading?: string;
}

export function ArticleGrid({ posts, locale, moreHeading = "Další články" }: ArticleGridProps) {
  if (posts.length === 0) {
    return (
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
    );
  }

  return (
    <>
      {/* Row 1: featured (2/3) + 2 stacked (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:items-stretch gap-x-8 gap-y-10 mb-14">
        {posts[0] && (
          <div className="lg:col-span-2">
            <ArticleCard post={posts[0]} locale={locale} featured animationDelay={0} />
          </div>
        )}
        <div className="flex flex-col gap-10">
          {posts[1] && <ArticleCard post={posts[1]} locale={locale} animationDelay={80} />}
          {posts[2] && <ArticleCard post={posts[2]} locale={locale} animationDelay={160} />}
        </div>
      </div>

      {/* Row 2: more articles */}
      {posts.slice(3).length > 0 && (
        <>
          <h3
            className="text-xl text-coal mb-8"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {moreHeading}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
            {posts.slice(3).map((post, i) => (
              <ArticleCard
                key={post.slug}
                post={post}
                locale={locale}
                animationDelay={(i + 3) * 80}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}
