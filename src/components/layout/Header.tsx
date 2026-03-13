"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  UtensilsCrossed,
  BookOpen,
  Star,
  Wrench,
  User,
  ChevronRight,
  Mail,
} from "lucide-react";

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {/* Top line → rotates to form top arm of X */}
      <line
        x1="3" y1="6" x2="21" y2="6"
        style={{
          transformOrigin: "12px 6px",
          transition: "transform 0.35s cubic-bezier(0.32,0.72,0,1)",
          transform: open ? "translateY(6px) rotate(45deg)" : "none",
        }}
      />
      {/* Middle line → fades out */}
      <line
        x1="3" y1="12" x2="21" y2="12"
        style={{
          transformOrigin: "12px 12px",
          transition: "transform 0.35s cubic-bezier(0.32,0.72,0,1), opacity 0.2s ease",
          transform: open ? "scaleX(0)" : "none",
          opacity: open ? 0 : 1,
        }}
      />
      {/* Bottom line → rotates to form bottom arm of X */}
      <line
        x1="3" y1="18" x2="21" y2="18"
        style={{
          transformOrigin: "12px 18px",
          transition: "transform 0.35s cubic-bezier(0.32,0.72,0,1)",
          transform: open ? "translateY(-6px) rotate(-45deg)" : "none",
        }}
      />
    </svg>
  );
}
import { type Locale, t } from "@/lib/i18n";
import { Navigation } from "./Navigation";

interface HeaderProps {
  locale: Locale;
}

const mobileNavItems = [
  { key: "category.recepty", href: "/recepty", Icon: UtensilsCrossed },
  { key: "category.navod", href: "/navody", Icon: BookOpen },
  { key: "category.recenze", href: "/recenze", Icon: Star },
  { key: "nav.nastroje", href: "/nastroje", Icon: Wrench },
  { key: "nav.about", href: "/o-mne", Icon: User },
];

export function Header({ locale }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Close menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`sticky top-0 z-[60] backdrop-blur-md transition-all duration-300 border-b ${
          scrolled ? "shadow-lg" : "border-transparent"
        }`}
        style={{
          backgroundColor: "var(--bg-nav)",
          borderColor: scrolled ? "var(--smoke)" : "transparent",
        }}
      >
        <div className="mx-auto flex max-w-[75rem] items-center justify-between h-16 px-6">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center transition-opacity duration-150 hover:opacity-80"
          >
            <Image
              src="/images/logo.webp"
              alt="griluju.cz"
              width={160}
              height={40}
              priority
            />
          </Link>

          {/* Desktop navigation */}
          <Navigation locale={locale} />

          {/* Right side: newsletter CTA + mobile hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/#newsletter"
              className="hidden md:inline-flex items-center px-5 py-2 rounded-full bg-heat text-white text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Newsletter
            </Link>
            {/* Mobile hamburger — above the overlay */}
            <button
              className="md:hidden text-coal relative z-[60]"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Zavřít menu" : "Otevřít menu"}
            >
              <HamburgerIcon open={mobileOpen} />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile menu sliding from bottom */}
      <div
        className={`md:hidden fixed inset-0 z-[55] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          mobileOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 backdrop-blur-md" style={{ backgroundColor: "rgba(255,255,255,0.95)" }} />

        <div className="relative h-full flex flex-col pt-20 pb-8 px-6">
          {/* Nav links */}
          <nav className="flex-1 space-y-1">
            {mobileNavItems.map(({ key, href, Icon }) => {
              const isActive = pathname === href || pathname.startsWith(href + "/");
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center justify-between py-4 px-4 rounded-xl transition-colors ${
                    isActive
                      ? "text-heat"
                      : "text-coal hover:bg-[var(--bg-warm)]"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  <div className="flex items-center gap-4">
                    <Icon
                      size={20}
                      className={isActive ? "text-heat" : "text-stone"}
                    />
                    <span className="text-lg font-medium">{t(locale, key)}</span>
                  </div>
                  <ChevronRight size={20} className="text-stone" />
                </Link>
              );
            })}
          </nav>

          {/* Newsletter CTA at bottom */}
          <div className="mt-auto pt-6" style={{ borderTop: "1px solid var(--smoke)" }}>
            <Link
              href="/#newsletter"
              className="flex items-center justify-center gap-2 w-full text-base font-semibold bg-heat text-white rounded-full px-5 py-3.5 hover:opacity-90 transition-opacity"
              onClick={() => setMobileOpen(false)}
            >
              <Mail size={20} />
              Odebírat newsletter
            </Link>
            <p className="text-center text-xs mt-3" style={{ color: "var(--stone)" }}>
              © 2026 griluju.cz
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
