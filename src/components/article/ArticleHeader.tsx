import Image from "next/image";
import Link from "next/link";
import { Clock, ChevronRight } from "lucide-react";
import type { Post } from "@/lib/content";
import { type Locale, t } from "@/lib/i18n";

const categoryPath: Record<string, string> = {
  recepty: "/recepty",
  navod: "/navody",
  recenze: "/recenze",
};

function estimateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

interface ArticleHeaderProps {
  post: Post;
  locale: Locale;
}

export function ArticleHeader({ post, locale }: ArticleHeaderProps) {
  const catPath = categoryPath[post.category] ?? "/recepty";
  const catLabel = t(locale, `category.${post.category}`);
  const readTime = estimateReadTime(post.content);

  return (
    <header className="mb-8">
      {/* Breadcrumb */}
      <nav
        className="mb-5 flex flex-wrap items-center gap-1 text-sm text-stone"
        aria-label="Breadcrumb"
      >
        <Link href="/" className="hover:text-heat transition-colors duration-150">
          Domů
        </Link>
        <ChevronRight size={13} className="opacity-40 shrink-0" />
        <Link href={catPath} className="hover:text-heat transition-colors duration-150">
          {catLabel}
        </Link>
        <ChevronRight size={13} className="opacity-40 shrink-0" />
        <span className="text-coal line-clamp-1">{post.title}</span>
      </nav>

      {/* Title */}
      <h1
        className="mb-5 text-3xl md:text-4xl lg:text-[2.75rem] leading-tight text-coal"
        style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
      >
        {post.title}
      </h1>

      {/* Description */}
      <p className="mb-6 text-lg text-stone leading-relaxed">{post.description}</p>

      {/* Author meta row */}
      <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-stone">
        <Image
          src="/images/author/petr.webp"
          alt={post.author}
          width={32}
          height={32}
          className="h-8 w-8 rounded-full object-cover shrink-0"
        />
        <span className="font-medium text-coal">{post.author}</span>
        <span className="opacity-40">·</span>
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString("cs-CZ", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </time>
        {post.updated && post.updated !== post.date && (
          <>
            <span className="opacity-40">·</span>
            <time dateTime={post.updated}>
              {t(locale, "article.updated")}{" "}
              {new Date(post.updated).toLocaleDateString("cs-CZ")}
            </time>
          </>
        )}
        <span className="opacity-40">·</span>
        <span className="flex items-center gap-1">
          <Clock size={13} />
          {readTime} min čtení
        </span>
      </div>

    </header>
  );
}
