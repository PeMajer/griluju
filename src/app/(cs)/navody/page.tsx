import type { Metadata } from "next";
import { getPostsByCategory } from "@/lib/content";
import { siteConfig } from "@/lib/i18n";
import { CategoryPage } from "@/components/layout/CategoryPage";

export const metadata: Metadata = {
  title: `Návody — ${siteConfig.name}`,
  description: "Návody a průvodci pro grilaře. Jak roztopit gril, nastavit teplotu, udít maso — krok za krokem.",
  alternates: { canonical: `${siteConfig.url}/navody` },
};

export default function NavodyPage() {
  const posts = getPostsByCategory("navod");
  return (
    <CategoryPage
      title="Návody"
      description="Krok za krokem — jak roztopit gril, nastavit nepřímé grilování, udít maso nebo připravit dokonalý steak."
      posts={posts}
      locale="cs"
    />
  );
}
