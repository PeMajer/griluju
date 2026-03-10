import type { Metadata } from "next";
import { siteConfig } from "@/lib/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hreflang } from "@/components/seo/Hreflang";
import { ConsentMode } from "@/components/seo/ConsentMode";
import { GA4Script } from "@/components/seo/GA4Script";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function CsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs">
      <head>
        <Hreflang />
        <ConsentMode />
      </head>
      <body className="flex min-h-screen flex-col">
        <GA4Script />
        <Header locale="cs" />
        <main className="flex-1">{children}</main>
        <Footer locale="cs" />
      </body>
    </html>
  );
}
