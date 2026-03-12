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
  /** Override the badge label (e.g. meat type on category page). Falls back to translated category. */
  badgeLabel?: string;
}

function estimateReadTime(content: string): number {
  return Math.max(1, Math.round(content.trim().split(/\s+/).length / 200));
}

function getCategoryColor(label: string): string {
  switch (label.toLowerCase()) {
    // Content types
    case "recepty":     return "hsl(16,82%,50%)";   // --heat orange
    case "navod":
    case "návod":       return "hsl(165,50%,32%)";  // forest green
    case "recenze":     return "hsl(215,55%,42%)";  // steel blue
    case "srovnani":
    case "srovnání":    return "hsl(280,40%,38%)";  // purple
    // Meat types
    case "hovězí":      return "hsl(0,65%,38%)";    // dark red
    case "vepřové":     return "hsl(28,70%,40%)";   // brown-orange
    case "drůbež":      return "hsl(42,75%,42%)";   // amber
    case "ryby":        return "hsl(200,60%,40%)";  // teal blue
    case "zelenina":    return "hsl(130,45%,35%)";  // green
    case "jehněčí":     return "hsl(280,40%,38%)";  // purple
    default:            return "hsl(16,82%,50%)";   // --heat fallback
  }
}

export function ArticleCard({ post, locale, featured = false, animationDelay, badgeLabel }: ArticleCardProps) {
  const readTime = estimateReadTime(post.content);
  const badge = badgeLabel ?? t(locale, `category.${post.category}`);
  const badgeColor = getCategoryColor(badgeLabel ?? post.category);

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

          {/* Badge — bottom left, color by content/meat type */}
          <span
            className="absolute bottom-3 left-3 text-[11px] font-semibold uppercase tracking-wider text-white px-2.5 py-1 rounded-full z-10"
            style={{ backgroundColor: badgeColor }}
          >
            {badge}
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
