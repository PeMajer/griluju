import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import type { Post } from "@/lib/content";
import { type Locale, t } from "@/lib/i18n";

const categoryPath: Record<string, string> = {
  recepty: "/recepty",
  navod: "/navody",
  recenze: "/recenze",
  srovnani: "/srovnani",
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
        <span className="opacity-40">/</span>
        <Link href={catPath} className="hover:text-heat transition-colors duration-150">
          {catLabel}
        </Link>
        <span className="opacity-40">/</span>
        <span className="text-coal line-clamp-1">{post.title}</span>
      </nav>

      {/* Category badge */}
      <span className="mb-4 inline-block font-mono text-xs uppercase tracking-wider text-heat bg-heat-lt px-2.5 py-1 rounded">
        {catLabel}
      </span>

      {/* Title */}
      <h1
        className="mb-5 text-3xl leading-tight text-coal sm:text-4xl lg:text-5xl"
        style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
      >
        {post.title}
      </h1>

      {/* Description */}
      <p className="mb-6 text-lg text-stone leading-relaxed">{post.description}</p>

      {/* Author meta row */}
      <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-stone border-b border-smoke pb-6">
        <div className="h-8 w-8 shrink-0 rounded-full bg-heat-lt flex items-center justify-center text-sm">
          👨‍🍳
        </div>
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

      {/* Hero image */}
      {post.image && (
        <div className="overflow-hidden rounded-xl mb-8">
          <Image
            src={post.image}
            alt={post.title}
            width={1200}
            height={675}
            priority
            className="w-full object-cover aspect-video"
          />
        </div>
      )}
    </header>
  );
}
