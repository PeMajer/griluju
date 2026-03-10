import type { Metadata } from "next";
import { getPostsByCategory } from "@/lib/content";
import { siteConfig } from "@/lib/i18n";
import { CategoryPage } from "@/components/layout/CategoryPage";

export const metadata: Metadata = {
  title: `Srovnání — ${siteConfig.name}`,
  description: "Srovnání grilovacích produktů a vybavení. Objektivní porovnání bez reklamních klišé.",
  alternates: { canonical: `${siteConfig.url}/srovnani` },
};

export default function SrovnaniPage() {
  const posts = getPostsByCategory("srovnani");
  return (
    <CategoryPage
      title="Srovnání"
      description="Objektivní srovnání grilovacích produktů a vybavení — aby sis vybral správně napoprvé."
      posts={posts}
      locale="cs"
    />
  );
}
