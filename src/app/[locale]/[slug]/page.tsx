import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXContent } from "@content-collections/mdx/react";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/content";
import { type Locale, siteConfig } from "@/lib/i18n";
import { ArticleHeader } from "@/components/article/ArticleHeader";
import { AuthorBio } from "@/components/article/AuthorBio";
import { AffiliateDisclosure } from "@/components/article/AffiliateDisclosure";
import { RelatedArticles } from "@/components/article/RelatedArticles";

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} — ${siteConfig.name}`,
    description: post.description,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    alternates: {
      canonical: `${siteConfig.url}/${locale}/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      ...(post.updated && { modifiedTime: post.updated }),
      authors: [post.author],
      ...(post.image && { images: [post.image] }),
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const related = getRelatedPosts(slug);

  return (
    <article className="mx-auto max-w-3xl px-4 py-8">
      <ArticleHeader post={post} locale={locale as Locale} />

      {post.affiliate && <AffiliateDisclosure locale={locale as Locale} />}

      <div className="prose max-w-none">
        <MDXContent code={post.mdx} />
      </div>

      <AuthorBio locale={locale as Locale} />
      <RelatedArticles posts={related} locale={locale as Locale} />
    </article>
  );
}
