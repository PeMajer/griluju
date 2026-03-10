import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXContent } from "@content-collections/mdx/react";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/content";
import { siteConfig } from "@/lib/i18n";
import { ArticleHeader } from "@/components/article/ArticleHeader";
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
    <article className="mx-auto max-w-3xl px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />

      <ArticleHeader post={post} locale="cs" />

      {post.affiliate && <AffiliateDisclosure locale="cs" />}

      <div className="prose max-w-none">
        <MDXContent code={post.mdx} />
      </div>

      <AuthorBio locale="cs" />
      <RelatedArticles posts={related} locale="cs" />
    </article>
  );
}
