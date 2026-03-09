import type { Post } from "@/lib/content";
import { type Locale, t } from "@/lib/i18n";
import { ArticleCard } from "./ArticleCard";

interface RelatedArticlesProps {
  posts: Post[];
  locale: Locale;
}

export function RelatedArticles({ posts, locale }: RelatedArticlesProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="mb-6 text-2xl font-bold text-gray-900">
        {t(locale, "article.related")}
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <ArticleCard key={post.slug} post={post} locale={locale} />
        ))}
      </div>
    </section>
  );
}
