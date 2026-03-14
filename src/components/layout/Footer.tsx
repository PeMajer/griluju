import Link from "next/link";
import Image from "next/image";
import { type Locale } from "@/lib/i18n";

interface FooterProps {
  locale: Locale;
}

export function Footer({ locale: _locale }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t py-12"
      style={{
        backgroundColor: "var(--dark)",
        borderColor: "var(--dark-border)",
      }}
    >
      <div className="mx-auto max-w-[75rem] px-6">
        {/* Top row: brand + nav */}
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <Link
              href="/"
              className="flex items-center justify-center md:justify-start transition-transform duration-200 hover:scale-105"
            >
              <Image
                src="/images/logo.webp"
                alt="griluju.cz"
                width={113}
                height={55}
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </Link>
            <p className="mt-1 text-sm" style={{ color: "var(--dark-fg-muted)" }}>
              Recepty a tipy na grilování z vlastní zkušenosti.
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-6">
            {[
              { label: "Recepty", href: "/recepty" },
              { label: "Nástroje", href: "/nastroje" },
              { label: "Teploty masa", href: "/teploty-masa" },
              { label: "O mně", href: "/o-mne" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm transition-colors duration-150 hover:text-heat"
                style={{ color: "var(--dark-fg-muted)" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom row: legal + social + copyright */}
        <div
          className="mt-8 pt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between"
          style={{ borderTop: "1px solid var(--dark-border)" }}
        >
          <div className="flex gap-4 text-xs" style={{ color: "var(--dark-fg-muted)" }}>
            <Link href="/ochrana-soukromi" className="hover:text-heat transition-colors duration-150" style={{ color: "inherit" }}>
              Ochrana soukromí
            </Link>
            <Link href="/cookies" className="hover:text-heat transition-colors duration-150" style={{ color: "inherit" }}>
              Cookies
            </Link>
            <Link href="/kontakt" className="hover:text-heat transition-colors duration-150" style={{ color: "inherit" }}>
              Kontakt
            </Link>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            <a href="#" aria-label="Instagram" className="hover:text-heat transition-colors duration-150" style={{ color: "var(--dark-fg-muted)" }}>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="#" aria-label="YouTube" className="hover:text-heat transition-colors duration-150" style={{ color: "var(--dark-fg-muted)" }}>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>

          <p className="text-xs" style={{ color: "rgba(245,240,235,0.4)" }}>
            &copy; {year} griluju.cz &middot; Vytvořeno s láskou a uhlím
          </p>
        </div>
      </div>
    </footer>
  );
}
