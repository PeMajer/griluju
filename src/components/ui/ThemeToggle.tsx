"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

type Theme = "light" | "dark";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  // Initialise from localStorage or system preference
  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    const sys: Theme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    const initial = saved ?? sys;
    setTheme(initial);
    document.documentElement.dataset.theme = initial;
  }, []);

  // Follow system preference when user hasn't overridden it
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        const t: Theme = e.matches ? "dark" : "light";
        setTheme(t);
        document.documentElement.dataset.theme = t;
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
  };

  return (
    <button
      onClick={toggle}
      aria-label={
        theme === "dark" ? "Přepnout na světlý režim" : "Přepnout na tmavý režim"
      }
      className="w-9 h-9 rounded-full flex items-center justify-center text-stone hover:text-coal hover:bg-bg-warm transition-colors duration-150"
    >
      {theme === "dark" ? (
        <Sun size={18} strokeWidth={1.75} />
      ) : (
        <Moon size={18} strokeWidth={1.75} />
      )}
    </button>
  );
}
