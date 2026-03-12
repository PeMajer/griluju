import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowRight } from "lucide-react";
import type { Post } from "@/lib/content";
import { type Locale, t } from "@/lib/i18n";

interface ArticleCardProps {
  post: Post;
  locale: Locale;
  featured?: boolean;
  animationDelay?: number;
}

function estimateReadTime(content: string): number {
  return Math.max(1, Math.round(content.trim().split(/\s+/).length / 200));
}

export function ArticleCard({ post, locale, featured = false, animationDelay }: ArticleCardProps) {
  const readTime = estimateReadTime(post.content);

  return (
    <article
      className={`animate-fade-up ${featured ? "h-full flex flex-col" : ""}`}
      style={animationDelay ? { animationDelay: `${animationDelay}ms` } : undefined}
    >
      <Link
        href={`/${post.slug}`}
        className={`group block hover:-translate-y-1 transition-transform duration-200 ${featured ? "flex flex-col flex-1" : ""}`}
      >
        {/* Image container */}
        <div
          className={`relative overflow-hidden rounded-2xl mb-4 ${
            featured ? "flex-1 min-h-0 aspect-[3/4] lg:aspect-auto lg:min-h-64" : "aspect-[3/4]"
          }`}
        >
          {post.image ? (
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes={featured ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
              className="object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ backgroundColor: "var(--bg-warm)" }}
            >
              <span className="text-5xl opacity-40">🔥</span>
            </div>
          )}

          {/* Category badge — bottom left */}
          <span
            className="absolute bottom-3 left-3 text-[11px] font-semibold uppercase tracking-wider text-white px-2.5 py-1 rounded-full z-10"
            style={{ backgroundColor: "var(--heat)" }}
          >
            {t(locale, `category.${post.category}`)}
          </span>
        </div>

        {/* Text — outside image */}
        <h3
          className={`font-display mt-1 mb-2 leading-tight text-coal group-hover:text-heat transition-colors duration-200 ${
            featured ? "text-2xl md:text-3xl" : "text-xl"
          }`}
          style={{ fontWeight: 700 }}
        >
          {post.title}
        </h3>

        {post.description && (
          <p className={`text-stone mb-3 ${featured ? "line-clamp-3" : "text-sm line-clamp-2"}`}>
            {post.description}
          </p>
        )}

        <div className="flex items-center justify-between text-xs text-stone">
          <div className="flex items-center gap-3">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("cs-CZ")}
            </time>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {readTime} min
            </span>
          </div>
          <ArrowRight
            size={14}
            className="text-heat opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          />
        </div>
      </Link>
    </article>
  );
}
