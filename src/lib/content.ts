import { allPosts } from "content-collections";
import type { Post } from "content-collections";

export type { Post };

export function getAllPosts(): Post[] {
  return allPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): Post | undefined {
  return allPosts.find((post) => post.slug === slug);
}

export function getPostsByCategory(category: string): Post[] {
  return getAllPosts().filter((post) => post.category === category);
}

export function getRelatedPosts(currentSlug: string, limit = 3): Post[] {
  const current = getPostBySlug(currentSlug);
  if (!current) return [];

  return getAllPosts()
    .filter((post) => post.slug !== currentSlug)
    .filter(
      (post) =>
        post.category === current.category ||
        post.keywords.some((kw) => current.keywords.includes(kw))
    )
    .slice(0, limit);
}
