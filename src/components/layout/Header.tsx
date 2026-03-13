"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Flame, Menu, X } from "lucide-react";
import { type Locale } from "@/lib/i18n";
import { Navigation } from "./Navigation";

interface HeaderProps {
  locale: Locale;
}

export function Header({ locale }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-md transition-all duration-300 border-b ${
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
          className="flex items-center gap-2 transition-colors duration-150 hover:opacity-80"
        >
          <Flame size={22} className="text-heat shrink-0" />
          <span
            className="font-display text-xl text-coal"
            style={{ fontStyle: "italic", fontWeight: 700 }}
          >
            griluju
          </span>
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
          {/* Mobile hamburger */}
          <button
            className="md:hidden text-coal"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Zavřít menu" : "Otevřít menu"}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ borderTop: mobileOpen ? "1px solid var(--smoke)" : "none" }}
      >
        <div className="px-6 py-5 flex flex-col gap-4" style={{ backgroundColor: "var(--bg-nav)" }}>
          {[
            { label: "Recepty", href: "/recepty" },
            { label: "Návody", href: "/navody" },
            { label: "Recenze", href: "/recenze" },
            { label: "Nástroje", href: "/nastroje" },
            { label: "O mně", href: "/o-mne" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-base font-medium text-coal hover:text-heat transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              href="/#newsletter"
              className="inline-flex w-full justify-center items-center px-5 py-2.5 rounded-full bg-heat text-white text-sm font-semibold hover:opacity-90 transition-opacity"
              onClick={() => setMobileOpen(false)}
            >
              Newsletter
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
