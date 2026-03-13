import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { MDXContent } from "@content-collections/mdx/react";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/content";
import { siteConfig } from "@/lib/i18n";
import { ArticleHeader } from "@/components/article/ArticleHeader";
import { RecipeMetaBox } from "@/components/article/RecipeMetaBox";
import { AuthorBio } from "@/components/article/AuthorBio";
import { AffiliateDisclosure } from "@/components/article/AffiliateDisclosure";
import { RelatedArticles } from "@/components/article/RelatedArticles";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} — ${siteConfig.name}`,
    description: post.description,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    alternates: {
      canonical: `${siteConfig.url}/${slug}`,
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
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const related = getRelatedPosts(slug);

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    author: { "@type": "Person", name: post.author, url: `${siteConfig.url}/o-mne` },
    datePublished: post.date,
    ...(post.updated && { dateModified: post.updated }),
    ...(post.image && { image: `${siteConfig.url}${post.image}` }),
    url: `${siteConfig.url}/${slug}`,
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    inLanguage: "cs-CZ",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />

      {/* Article header — breadcrumb, title, meta */}
      <div className="px-4 sm:px-6 pt-6">
        <div className="mx-auto max-w-4xl">
          <ArticleHeader post={post} locale="cs" />
        </div>
      </div>

      {/* Full-width hero image */}
      {post.image && (
        <div className="mb-14">
          <Image
            src={post.image}
            alt={post.title}
            width={1600}
            height={900}
            priority
            className="w-full aspect-[4/3] md:aspect-video object-cover max-h-[600px]"
          />
        </div>
      )}

      {/* Recipe meta box — only shown when meta fields are present */}
      {post.category === "recepty" && <RecipeMetaBox post={post} />}

      {/* Narrow article body */}
      <div className="px-4 sm:px-6">
        <article className="mx-auto max-w-[690px]">
          {post.affiliate && <AffiliateDisclosure locale="cs" />}

          <div className="prose max-w-none">
            <MDXContent code={post.mdx} />
          </div>
        </article>
      </div>

      {/* Author box — outside article, own container */}
      <div className="px-4 sm:px-6 py-14">
        <div className="mx-auto max-w-[690px]">
          <AuthorBio locale="cs" />
        </div>
      </div>

      {/* Related articles */}
      <RelatedArticles posts={related} locale="cs" />
    </>
  );
}
