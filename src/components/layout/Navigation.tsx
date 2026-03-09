"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type Locale, t } from "@/lib/i18n";

interface NavigationProps {
  locale: Locale;
}

const navItems = [
  { key: "nav.home", href: "" },
  { key: "category.recepty", href: "/kategorie/recepty" },
  { key: "category.navod", href: "/kategorie/navody" },
  { key: "nav.about", href: "/o-mne" },
  { key: "nav.contact", href: "/kontakt" },
];

export function Navigation({ locale }: NavigationProps) {
  const pathname = usePathname();

  return (
    <nav className="flex gap-6">
      {navItems.map((item) => {
        const href = `/${locale}${item.href}`;
        const isActive = pathname === href;
        return (
          <Link
            key={item.key}
            href={href}
            className={`text-sm font-medium transition-colors hover:text-orange-600 ${
              isActive ? "text-orange-600" : "text-gray-700"
            }`}
          >
            {t(locale, item.key)}
          </Link>
        );
      })}
    </nav>
  );
}
