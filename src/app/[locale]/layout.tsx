import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, type Locale, siteConfig } from "@/lib/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hreflang } from "@/components/seo/Hreflang";
import { ConsentMode } from "@/components/seo/ConsentMode";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <head>
        <Hreflang path="" />
        <ConsentMode />
      </head>
      <body className="flex min-h-screen flex-col">
        <Header locale={locale as Locale} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale as Locale} />
      </body>
    </html>
  );
}
