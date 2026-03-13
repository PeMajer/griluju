export const defaultLocale = "cs";
export const locales = ["cs"] as const;
export type Locale = (typeof locales)[number];

export const siteConfig = {
  name: "Griluju.cz",
  url: "https://griluju.cz",
  // PLACEHOLDER: author — verify correct name in docs/todo/README.md
  author: "Petr Majer",
  description:
    "Grilovací recepty, návody a recenze. Pomalé grilování, BBQ, steaky a vše kolem grilu.",
  // Set NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX in .env.local
  ga4Id: process.env.NEXT_PUBLIC_GA4_ID || "",
};

export const translations: Record<Locale, Record<string, string>> = {
  cs: {
    // Navigation
    "nav.home": "Domů",
    "nav.about": "O mně",
    "nav.contact": "Kontakt",
    "nav.tools": "Teploty masa",
    "nav.nastroje": "Nástroje",
    "nav.newsletter": "Newsletter",

    // Categories
    "category.recepty": "Recepty",
    "category.navod": "Návody",
    "category.recenze": "Recenze",
    "category.srovnani": "Srovnání",

    // Article
    "article.readMore": "Číst dál",
    "article.published": "Publikováno",
    "article.updated": "Aktualizováno",
    "article.toc": "Obsah článku",
    "article.related": "Související články",
    "article.affiliate":
      "Tento článek obsahuje affiliate odkazy. Pokud přes ně nakoupíte, získám malou provizi, která pomáhá udržet tento web. Na cenu pro vás to nemá žádný vliv.",

    // Author
    // PLACEHOLDER: author.bio — vyplň po doplnění osobního příběhu (docs/todo/README.md)
    "author.bio":
      "Griluju přes 10 let na Weber Kettle. Specializuji se na pomalé grilování, pulled pork, brisket a steaky metodou reverse sear.",

    // Footer
    "footer.privacy": "Ochrana soukromí",
    "footer.cookies": "Cookies",
    "footer.copyright": "Všechna práva vyhrazena.",

    // Pages
    "page.home.title": "Griluju.cz — Recepty, návody a recenze pro grilaře",
    "page.home.description":
      "Grilovací recepty, návody a recenze. Pomalé grilování, BBQ, steaky a vše kolem grilu.",
    "page.about.title": "O mně — Griluju.cz",
    "page.contact.title": "Kontakt — Griluju.cz",
    "page.privacy.title": "Ochrana soukromí — Griluju.cz",
    "page.cookies.title": "Cookie Policy — Griluju.cz",
  },
};

export function t(locale: Locale, key: string): string {
  return translations[locale]?.[key] ?? key;
}
