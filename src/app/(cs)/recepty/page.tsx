import type { Metadata } from "next";
import { getPostsByCategory } from "@/lib/content";
import { siteConfig } from "@/lib/i18n";
import { CategoryPage } from "@/components/layout/CategoryPage";

export const metadata: Metadata = {
  title: `Recepty — ${siteConfig.name}`,
  description: "Grilovací recepty z vlastní zkušenosti. Pulled pork, brisket, steaky, kuřecí — konkrétní teploty, časy a postupy.",
  alternates: { canonical: `${siteConfig.url}/recepty` },
};

export default function ReceptyPage() {
  const posts = getPostsByCategory("recepty");
  return (
    <CategoryPage
      title="Recepty"
      description="Grilovací recepty z vlastní zkušenosti. Konkrétní teploty, časy a postupy — žádné obecné rady."
      posts={posts}
      locale="cs"
    />
  );
}
