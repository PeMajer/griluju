import Link from "next/link";
import { type Locale, siteConfig } from "@/lib/i18n";
import { Navigation } from "./Navigation";

interface HeaderProps {
  locale: Locale;
}

export function Header({ locale }: HeaderProps) {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link
          href="/"
          className="text-xl font-bold text-gray-900 hover:text-orange-600 transition-colors"
        >
          {siteConfig.name}
        </Link>
        <Navigation locale={locale} />
      </div>
    </header>
  );
}
