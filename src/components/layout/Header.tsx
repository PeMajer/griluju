"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Flame, Menu, X } from "lucide-react";
import { type Locale } from "@/lib/i18n";
import { Navigation } from "./Navigation";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

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
      className={`sticky top-0 z-50 backdrop-blur-md transition-all duration-200 ${
        scrolled ? "border-b shadow-lg" : "border-b border-transparent"
      }`}
      style={{
        backgroundColor: "var(--bg-nav)",
        borderColor: scrolled ? "var(--smoke)" : "transparent",
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-xl font-bold text-coal hover:text-heat transition-colors duration-150"
          style={{ fontStyle: "italic" }}
        >
          <Flame size={20} className="text-heat shrink-0" style={{ fontStyle: "normal" }} />
          <span>griluju</span>
        </Link>

        {/* Desktop navigation */}
        <Navigation locale={locale} />

        {/* Right side: theme toggle + newsletter CTA + mobile hamburger */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/#newsletter"
            className="hidden sm:inline-flex items-center px-4 py-1.5 rounded-full bg-heat text-white text-sm font-medium hover:bg-heat-dk transition-colors duration-150"
          >
            Newsletter
          </Link>
          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-coal hover:text-heat transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Zavřít menu" : "Otevřít menu"}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ borderTop: mobileOpen ? "1px solid var(--smoke)" : "none" }}
      >
        <nav className="px-6 py-4 flex flex-col gap-4" style={{ backgroundColor: "var(--bg-nav)" }}>
          <Link href="/recepty" className="text-sm font-medium text-stone hover:text-heat transition-colors" onClick={() => setMobileOpen(false)}>Recepty</Link>
          <Link href="/navody" className="text-sm font-medium text-stone hover:text-heat transition-colors" onClick={() => setMobileOpen(false)}>Návody</Link>
          <Link href="/recenze" className="text-sm font-medium text-stone hover:text-heat transition-colors" onClick={() => setMobileOpen(false)}>Recenze</Link>
          <Link href="/nastroje" className="text-sm font-medium text-stone hover:text-heat transition-colors" onClick={() => setMobileOpen(false)}>Nástroje</Link>
          <Link href="/o-mne" className="text-sm font-medium text-stone hover:text-heat transition-colors" onClick={() => setMobileOpen(false)}>O mně</Link>
          <Link
            href="/#newsletter"
            className="inline-flex w-fit items-center px-4 py-1.5 rounded-full bg-heat text-white text-sm font-medium hover:bg-heat-dk transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            Newsletter
          </Link>
        </nav>
      </div>
    </header>
  );
}
