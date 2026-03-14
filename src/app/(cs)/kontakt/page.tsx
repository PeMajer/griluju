import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { t, siteConfig } from "@/lib/i18n";

export const metadata: Metadata = {
  title: t("cs", "page.contact.title"),
  alternates: {
    canonical: `${siteConfig.url}/kontakt`,
  },
};

export default function ContactPage() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-[680px]">
        <h1
          className="text-3xl md:text-4xl text-coal font-bold mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Kontakt
        </h1>
        <p className="text-stone text-lg leading-relaxed mb-12">
          Máte dotaz k receptu, chcete navrhnout téma nebo se zajímáte o spolupráci? Napište mi.
        </p>

        <div
          className="rounded-2xl px-8 py-7 mb-8 flex items-center gap-5"
          style={{ backgroundColor: "var(--bg-warm)" }}
        >
          <div
            className="inline-flex items-center justify-center w-12 h-12 rounded-full flex-shrink-0"
            style={{ backgroundColor: "rgba(232,83,26,0.1)" }}
          >
            <Mail size={20} className="text-heat" />
          </div>
          <div>
            <p className="text-xs font-semibold tracking-[0.12em] uppercase text-stone mb-1">E-mail</p>
            <a
              href="mailto:info@griluju.cz"
              className="text-coal font-medium hover:text-heat transition-colors duration-150"
            >
              info@griluju.cz
            </a>
          </div>
        </div>

        <div className="rounded-2xl px-8 py-7" style={{ backgroundColor: "var(--bg-warm)" }}>
          <h2
            className="text-lg text-coal mb-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Spolupráce
          </h2>
          <p className="text-stone leading-relaxed">
            Jsem otevřený recenzím grilovacího vybavení a spolupráci s výrobci.
            Podmínkou je, že produkt skutečně otestuji a napíšu upřímnou recenzi — i s případnými nedostatky.
          </p>
        </div>
      </div>
    </section>
  );
}
