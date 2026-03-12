import type { Post } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { ArticleGrid } from "@/components/article/ArticleGrid";
import { CategoryFilterGrid } from "@/components/article/CategoryFilterGrid";

interface CategoryPageProps {
  title: string;
  description: string;
  posts: Post[];
  locale: Locale;
  /** Label for the "more" subheading — defaults to "Další {title.toLowerCase()}" */
  moreHeading?: string;
  /** Badge source: "category" (default) or "tag" (meat type on recepty page) */
  badgeSource?: "category" | "tag";
  /** When provided, renders interactive filter pills above the grid */
  filterTags?: string[];
}

export function CategoryPage({
  title,
  description,
  posts,
  locale,
  moreHeading,
  badgeSource,
  filterTags,
}: CategoryPageProps) {
  const resolvedMoreHeading = moreHeading ?? `Další ${title.toLowerCase()}`;

  return (
    <section className="mx-auto max-w-container px-6 pt-12 pb-24">
      {/* Page header */}
      <div className="mb-10">
        <h1
          className="mb-3 text-4xl text-coal md:text-5xl"
          style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
        >
          {title}
        </h1>
        <p className="text-lg text-stone leading-relaxed">{description}</p>
      </div>

      {/* Article grid — with or without filter pills */}
      {filterTags ? (
        <CategoryFilterGrid
          posts={posts}
          filterTags={filterTags}
          locale={locale}
          moreHeading={resolvedMoreHeading}
          badgeSource={badgeSource}
        />
      ) : (
        <ArticleGrid
          posts={posts}
          locale={locale}
          moreHeading={resolvedMoreHeading}
          badgeSource={badgeSource}
        />
      )}
    </section>
  );
}
