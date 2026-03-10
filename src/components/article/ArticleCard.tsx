import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowRight } from "lucide-react";
import type { Post } from "@/lib/content";
import { type Locale, t } from "@/lib/i18n";

interface ArticleCardProps {
  post: Post;
  locale: Locale;
}

export function ArticleCard({ post, locale }: ArticleCardProps) {
  return (
    <article className="article-card group flex flex-col overflow-hidden rounded-xl border border-smoke bg-bg-card hover:border-heat">
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
          <div className="aspect-video w-full bg-bg-warm flex items-center justify-center">
            <span className="text-3xl opacity-50">🔥</span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        {/* Category badge */}
        <span className="mb-3 inline-block font-mono text-xs uppercase tracking-wider text-heat bg-heat-lt px-2 py-1 rounded w-fit">
          {t(locale, `category.${post.category}`)}
        </span>

        {/* Title */}
        <h2 className="mb-2 font-display text-xl font-bold leading-snug text-coal group-hover:text-heat transition-colors duration-150">
          <Link href={`/${post.slug}`}>{post.title}</Link>
        </h2>

        {/* Excerpt */}
        <p className="text-sm text-stone line-clamp-2 flex-1 mb-4">{post.description}</p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 text-sm text-stone">
            <Clock size={14} />
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("cs-CZ")}
            </time>
          </span>
          <ArrowRight
            size={16}
            className="text-heat transition-transform duration-150 group-hover:translate-x-1"
          />
        </div>
      </div>
    </article>
  );
}
