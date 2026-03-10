import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/lib/content";
import { type Locale, t } from "@/lib/i18n";

interface ArticleCardProps {
  post: Post;
  locale: Locale;
}

export function ArticleCard({ post, locale }: ArticleCardProps) {
  return (
    <article className="article-card group flex flex-col overflow-hidden rounded-xl border border-smoke bg-bg-card hover:-translate-y-0.5 hover:border-heat">
      {/* Image */}
      <Link href={`/${post.slug}`} className="block overflow-hidden">
        {post.image ? (
          <Image
            src={post.image}
            alt={post.title}
            width={640}
            height={360}
            className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="aspect-video w-full bg-bg-warm flex items-center justify-center text-3xl">
            🔥
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Category badge */}
        <span className="mb-3 inline-block font-mono text-xs uppercase tracking-wider text-heat bg-heat-lt px-2 py-0.5 rounded w-fit">
          {t(locale, `category.${post.category}`)}
        </span>

        {/* Title */}
        <h2 className="mb-2 font-display text-lg font-bold leading-snug text-coal group-hover:text-heat transition-colors duration-150">
          <Link href={`/${post.slug}`}>{post.title}</Link>
        </h2>

        {/* Excerpt */}
        <p className="text-sm text-stone line-clamp-2 flex-1">{post.description}</p>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between">
          <time dateTime={post.date} className="text-xs text-stone">
            {new Date(post.date).toLocaleDateString("cs-CZ")}
          </time>
          <Link
            href={`/${post.slug}`}
            className="text-sm font-medium text-heat hover:text-heat-dk transition-colors duration-150"
          >
            {t(locale, "article.readMore")} →
          </Link>
        </div>
      </div>
    </article>
  );
}
