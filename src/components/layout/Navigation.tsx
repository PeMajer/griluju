"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type Locale, t } from "@/lib/i18n";

interface NavigationProps {
  locale: Locale;
}

const navItems = [
  { key: "category.recepty", href: "/recepty" },
  { key: "category.navod", href: "/navody" },
  { key: "category.recenze", href: "/recenze" },
  { key: "nav.nastroje", href: "/nastroje" },
  { key: "nav.about", href: "/o-mne" },
];

export function Navigation({ locale }: NavigationProps) {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex gap-8">
      {navItems.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
        return (
          <Link
            key={item.key}
            href={item.href}
            className={`text-sm font-medium tracking-[0.02em] transition-colors duration-150 hover:text-coal ${
              isActive ? "text-heat" : "text-stone"
            }`}
          >
            {t(locale, item.key)}
          </Link>
        );
      })}
    </nav>
  );
}
