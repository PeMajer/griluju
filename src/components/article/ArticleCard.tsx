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
    <article className="group overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-md">
      {post.image && (
        <Link href={`/${post.slug}`}>
          <Image
            src={post.image}
            alt={post.title}
            width={640}
            height={360}
            className="aspect-video w-full object-cover"
          />
        </Link>
      )}
      <div className="p-4">
        <div className="mb-2 flex items-center gap-2 text-xs text-gray-500">
          <span>{t(locale, `category.${post.category}`)}</span>
          <span>&middot;</span>
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("cs-CZ")}
          </time>
        </div>
        <h2 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
          <Link href={`/${post.slug}`}>{post.title}</Link>
        </h2>
        <p className="text-sm text-gray-600 line-clamp-2">
          {post.description}
        </p>
        <Link
          href={`/${post.slug}`}
          className="mt-3 inline-block text-sm font-medium text-orange-600 hover:text-orange-700"
        >
          {t(locale, "article.readMore")} &rarr;
        </Link>
      </div>
    </article>
  );
}
