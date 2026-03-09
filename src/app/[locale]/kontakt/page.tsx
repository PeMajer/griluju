import type { Metadata } from "next";
import { type Locale, t, siteConfig } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: t(locale as Locale, "page.contact.title"),
    alternates: {
      canonical: `${siteConfig.url}/${locale}/kontakt`,
    },
  };
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">Kontakt</h1>

      <div className="prose max-w-none">
        <p>
          Máte dotaz k receptu, chcete navrhnout téma článku nebo spolupráci?
          Napište mi.
        </p>

        <h2>E-mail</h2>
        <p>
          <a href="mailto:info@griluju.cz">info@griluju.cz</a>
        </p>

        <h2>Spolupráce</h2>
        <p>
          Jsem otevřený recenzím grilovacího vybavení a spolupráci s výrobci.
          Podmínkou je, že produkt skutečně otestuji a napíšu upřímnou recenzi
          — i s případnými nedostatky.
        </p>
      </div>
    </div>
  );
}
