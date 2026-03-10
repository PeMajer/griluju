import type { Metadata } from "next";
import { getPostsByCategory } from "@/lib/content";
import { siteConfig } from "@/lib/i18n";
import { CategoryPage } from "@/components/layout/CategoryPage";

export const metadata: Metadata = {
  title: `Recenze — ${siteConfig.name}`,
  description: "Recenze grilovacího vybavení, které osobně používám. Weber, teploměry, příslušenství — bez sponzorovaného nadšení.",
  alternates: { canonical: `${siteConfig.url}/recenze` },
};

export default function RecenzePage() {
  const posts = getPostsByCategory("recenze");
  return (
    <CategoryPage
      title="Recenze"
      description="Vybavení, které osobně používám a mohu doporučit. Weber, teploměry, příslušenství — bez sponzorovaného nadšení."
      posts={posts}
      locale="cs"
    />
  );
}
