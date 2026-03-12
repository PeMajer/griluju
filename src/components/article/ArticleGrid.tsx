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
  /**
   * "category" (default) — badge shows content type (Recepty / Návod / Recenze)
   * "tag"      — badge shows post.tag (meat type: Hovězí / Vepřové…), falls back to category
   */
  badgeSource?: "category" | "tag";
  hideBadge?: boolean;
}

export function ArticleGrid({ posts, locale, moreHeading = "Další články", badgeSource = "category", hideBadge = false }: ArticleGridProps) {
  const getBadge = (post: Post) =>
    badgeSource === "tag" ? (post.tag ?? undefined) : undefined;

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
            <ArticleCard post={posts[0]} locale={locale} featured animationDelay={0} badgeLabel={getBadge(posts[0])} hideBadge={hideBadge} />
          </div>
        )}
        <div className="flex flex-col gap-10">
          {posts[1] && <ArticleCard post={posts[1]} locale={locale} animationDelay={80} badgeLabel={getBadge(posts[1])} hideBadge={hideBadge} />}
          {posts[2] && <ArticleCard post={posts[2]} locale={locale} animationDelay={160} badgeLabel={getBadge(posts[2])} hideBadge={hideBadge} />}
        </div>
      </div>

      {/* Row 2: more articles */}
      {posts.slice(3).length > 0 && (
        <>
          <div className="mb-14">
            <h3
              className="text-2xl leading-snug text-coal"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {moreHeading}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
            {posts.slice(3).map((post, i) => (
              <ArticleCard
                key={post.slug}
                post={post}
                locale={locale}
                animationDelay={(i + 3) * 80}
                badgeLabel={getBadge(post)}
                hideBadge={hideBadge}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}
