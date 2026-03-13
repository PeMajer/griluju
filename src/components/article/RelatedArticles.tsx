import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import type { Post } from "@/lib/content";
import { type Locale, t } from "@/lib/i18n";
import { ArticleCard } from "./ArticleCard";

// Placeholder cards shown when no related posts exist yet
const placeholderCards = [
  {
    id: "beef-brisket",
    image:
      "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=640&h=360&fit=crop&q=80",
    category: "Recepty",
    title: "Beef Brisket: 14 hodin k dokonalosti",
    readTime: "15 min čtení",
  },
  {
    id: "prvni-smoker",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=640&h=360&fit=crop&q=80",
    category: "Návody",
    title: "Jak vybrat první smoker: průvodce pro začátečníky",
    readTime: "8 min čtení",
  },
  {
    id: "bbq-omacka",
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=640&h=360&fit=crop&q=80",
    category: "Recepty",
    title: "Domácí BBQ omáčka: 5 receptů na léto",
    readTime: "6 min čtení",
  },
];

interface RelatedArticlesProps {
  posts: Post[];
  locale: Locale;
}

export function RelatedArticles({ posts, locale }: RelatedArticlesProps) {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-[75rem] px-6">
        <h2
          className="mb-10 text-3xl md:text-4xl text-coal text-center"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {t(locale, "article.related")}
        </h2>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-10">
            {posts.map((post) => (
              <ArticleCard key={post.slug} post={post} locale={locale} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-10">
            {placeholderCards.map((card) => (
              <article
                key={card.id}
                className="flex flex-col overflow-hidden rounded-xl border border-smoke bg-bg-card"
              >
                <div className="overflow-hidden aspect-video bg-bg-warm">
                  <Image
                    src={card.image}
                    alt={card.title}
                    width={640}
                    height={360}
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>
                <div className="flex flex-col flex-1 p-6">
                  <span className="mb-3 inline-block font-mono text-xs uppercase tracking-wider text-heat bg-heat-lt px-2 py-1 rounded w-fit">
                    {card.category}
                  </span>
                  <h3
                    className="mb-auto text-lg text-coal leading-snug"
                    style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
                  >
                    {card.title}
                  </h3>
                  <div className="mt-4 flex items-center gap-1 text-sm text-stone">
                    <Clock size={13} />
                    <span>{card.readTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
