import Image from "next/image";
import type { Post } from "@/lib/content";
import { type Locale, t } from "@/lib/i18n";

interface ArticleHeaderProps {
  post: Post;
  locale: Locale;
}

export function ArticleHeader({ post, locale }: ArticleHeaderProps) {
  return (
    <header className="mb-8">
      <div className="mb-4 flex items-center gap-2 text-sm text-gray-500">
        <span>{t(locale, `category.${post.category}`)}</span>
        <span>&middot;</span>
        <time dateTime={post.date}>
          {t(locale, "article.published")}{" "}
          {new Date(post.date).toLocaleDateString("cs-CZ")}
        </time>
        {post.updated && post.updated !== post.date && (
          <>
            <span>&middot;</span>
            <time dateTime={post.updated}>
              {t(locale, "article.updated")}{" "}
              {new Date(post.updated).toLocaleDateString("cs-CZ")}
            </time>
          </>
        )}
      </div>
      <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
        {post.title}
      </h1>
      <p className="text-lg text-gray-600">{post.description}</p>
      {post.image && (
        <Image
          src={post.image}
          alt={post.title}
          width={1200}
          height={675}
          priority
          className="mt-6 rounded-lg"
        />
      )}
    </header>
  );
}
