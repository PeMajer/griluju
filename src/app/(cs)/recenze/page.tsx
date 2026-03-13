import type { Metadata } from "next";
import { getPostsByCategory } from "@/lib/content";
import { siteConfig } from "@/lib/i18n";
import { CategoryPage } from "@/components/layout/CategoryPage";

export const metadata: Metadata = {
  title: `Recenze — ${siteConfig.name}`,
  description: "Recenze grilovacího vybavení, které osobně používám. Grily, teploměry, příslušenství — z vlastní zkušenosti.",
  alternates: { canonical: `${siteConfig.url}/recenze` },
};

export default function RecenzePage() {
  const posts = getPostsByCategory("recenze");
  return (
    <CategoryPage
      title="Recenze"
      description="Vybavení, které osobně používám a mohu doporučit. Grily, teploměry, příslušenství — z vlastní zkušenosti."
      posts={posts}
      locale="cs"
    />
  );
}
