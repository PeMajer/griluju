import Link from "next/link";
import { type Locale, t, siteConfig } from "@/lib/i18n";

interface FooterProps {
  locale: Locale;
}

const footerNav = [
  { key: "category.recepty", href: "/recepty" },
  { key: "category.navod", href: "/navody" },
  { key: "category.recenze", href: "/recenze" },
  { key: "nav.tools", href: "/nastroje/teploty-masa" },
  { key: "nav.about", href: "/o-mne" },
];

export function Footer({ locale }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-smoke bg-bg-warm">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          {/* Brand */}
          <div className="flex flex-col gap-2">
            <Link
              href="/"
              className="flex items-center gap-2 font-display text-lg font-bold text-coal hover:text-heat transition-colors duration-150"
            >
              <span>🔥</span>
              <span>griluju</span>
            </Link>
            {/* PLACEHOLDER: footer-tagline-choice — vyber jednu ze tří variant níže */}
            {/* Varianta 1: */ }
            <p className="text-sm text-stone">Recepty a tipy na grilování z vlastní zkušenosti.</p>
            {/* Varianta 2: Bez bullshitu. Jen to, co funguje. */}
            {/* Varianta 3: Pomalé grilování, steaky a vše kolem grilu. */}
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {footerNav.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="text-sm text-stone hover:text-heat transition-colors duration-150"
              >
                {t(locale, item.key)}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-t border-smoke pt-6">
          <div className="flex gap-4 text-xs text-stone">
            <Link href="/ochrana-soukromi" className="hover:text-heat transition-colors duration-150">
              {t(locale, "footer.privacy")}
            </Link>
            <Link href="/cookies" className="hover:text-heat transition-colors duration-150">
              {t(locale, "footer.cookies")}
            </Link>
            <Link href="/kontakt" className="hover:text-heat transition-colors duration-150">
              {t(locale, "nav.contact")}
            </Link>
          </div>
          <p className="text-xs text-stone">
            &copy; {year} {siteConfig.name}. {t(locale, "footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
