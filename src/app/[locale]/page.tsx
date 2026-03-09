import type { Metadata } from "next";
import { getAllPosts } from "@/lib/content";
import { type Locale, t, siteConfig } from "@/lib/i18n";
import { ArticleCard } from "@/components/article/ArticleCard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: t(locale as Locale, "page.home.title"),
    description: t(locale as Locale, "page.home.description"),
    alternates: {
      canonical: `${siteConfig.url}/${locale}`,
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <section className="mb-12">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">
          Vítejte na Griluju.cz
        </h1>
        <p className="text-lg text-gray-600">
          Recepty, návody a recenze pro každého, kdo to u grilu myslí vážně.
          Pomalé grilování, BBQ, steaky a všechno kolem.
        </p>
      </section>

      {posts.length > 0 ? (
        <section>
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Nejnovější články
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <ArticleCard
                key={post.slug}
                post={post}
                locale={locale as Locale}
              />
            ))}
          </div>
        </section>
      ) : (
        <p className="text-gray-500">Zatím tu žádné články nejsou. Brzy přidám první obsah.</p>
      )}
    </div>
  );
}
