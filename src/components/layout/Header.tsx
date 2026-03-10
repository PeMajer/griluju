import Link from "next/link";
import { type Locale } from "@/lib/i18n";
import { Navigation } from "./Navigation";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

interface HeaderProps {
  locale: Locale;
}

export function Header({ locale }: HeaderProps) {
  return (
    <header
      className="sticky top-0 z-50 border-b border-smoke backdrop-blur-md"
      style={{ backgroundColor: "var(--bg-nav)" }}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-xl font-bold text-coal hover:text-heat transition-colors duration-150"
        >
          <span>🔥</span>
          <span>griluju</span>
        </Link>

        {/* Navigation */}
        <Navigation locale={locale} />

        {/* Right side: theme toggle + newsletter CTA */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/newsletter"
            className="hidden sm:inline-flex items-center px-4 py-1.5 rounded-full border border-heat text-heat text-sm font-medium hover:bg-heat hover:text-white transition-colors duration-150"
          >
            Newsletter
          </Link>
        </div>
      </div>
    </header>
  );
}
