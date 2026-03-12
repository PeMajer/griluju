import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Post } from "@/lib/content";
import { type Locale, t } from "@/lib/i18n";

interface ArticleCardProps {
  post: Post;
  locale: Locale;
  featured?: boolean;
  animationDelay?: number;
}

export function ArticleCard({ post, locale, featured = false, animationDelay }: ArticleCardProps) {
  return (
    <article
      className={`article-card group relative overflow-hidden rounded-xl cursor-pointer animate-fade-up ${
        featured ? "lg:col-span-2" : ""
      }`}
      style={animationDelay ? { animationDelay: `${animationDelay}ms` } : undefined}
    >
      <Link href={`/${post.slug}`} className="block">
        {/* Image with gradient overlay */}
        <div className={`relative overflow-hidden ${featured ? "aspect-[16/9] sm:aspect-[2/1]" : "aspect-[3/4]"}`}>
          {post.image ? (
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes={featured ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ backgroundColor: "var(--bg-warm)" }}
            >
              <span className="text-5xl opacity-40">🔥</span>
            </div>
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)" }} />

          {/* Category badge — top left */}
          <span
            className="absolute top-3 left-3 font-mono text-xs uppercase tracking-wider text-white px-2.5 py-1 rounded"
            style={{ backgroundColor: "var(--heat)" }}
          >
            {t(locale, `category.${post.category}`)}
          </span>
        </div>

        {/* Text overlay — bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-5">
          <h2
            className={`font-display text-white mb-2 leading-tight transition-colors duration-200 group-hover:text-heat ${
              featured ? "text-2xl lg:text-3xl" : "text-lg"
            }`}
            style={{ fontWeight: 700 }}
          >
            {post.title}
          </h2>
          <div className="flex items-center justify-between">
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.65)" }}>
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("cs-CZ")}
              </time>
            </span>
            <ArrowRight
              size={16}
              className="transition-all duration-200 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0"
              style={{ color: "rgba(255,255,255,0.9)" }}
            />
          </div>
        </div>
      </Link>
    </article>
  );
}
