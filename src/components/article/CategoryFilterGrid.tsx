"use client";

import { useState } from "react";
import type { Post } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { ArticleGrid } from "./ArticleGrid";

interface CategoryFilterGridProps {
  posts: Post[];
  filterTags: string[];
  locale: Locale;
  moreHeading?: string;
  badgeSource?: "category" | "tag";
  hideBadge?: boolean;
}

export function CategoryFilterGrid({
  posts,
  filterTags,
  locale,
  moreHeading,
  badgeSource,
  hideBadge,
}: CategoryFilterGridProps) {
  const [active, setActive] = useState("Všechny");

  const filtered =
    active === "Všechny" ? posts : posts.filter((p) => p.tag === active);

  return (
    <>
      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mb-14">
        {["Všechny", ...filterTags].map((tag) => (
          <button
            key={tag}
            onClick={() => setActive(tag)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors cursor-pointer ${
              active === tag
                ? "bg-heat text-white"
                : "bg-bg-warm text-coal hover:bg-heat/10"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Filtered grid */}
      <ArticleGrid
        posts={filtered}
        locale={locale}
        moreHeading={moreHeading}
        badgeSource={badgeSource}
        hideBadge={hideBadge}
      />
    </>
  );
}
