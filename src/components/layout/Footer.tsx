import Link from "next/link";
import { type Locale, t, siteConfig } from "@/lib/i18n";

interface FooterProps {
  locale: Locale;
}

export function Footer({ locale }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="flex gap-6 text-sm text-gray-600">
            <Link
              href="/ochrana-soukromi"
              className="hover:text-orange-600 transition-colors"
            >
              {t(locale, "footer.privacy")}
            </Link>
            <Link
              href="/cookies"
              className="hover:text-orange-600 transition-colors"
            >
              {t(locale, "footer.cookies")}
            </Link>
            <Link
              href="/kontakt"
              className="hover:text-orange-600 transition-colors"
            >
              {t(locale, "nav.contact")}
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            &copy; {year} {siteConfig.name}. {t(locale, "footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
