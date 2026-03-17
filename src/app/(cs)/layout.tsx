import type { Metadata } from "next";
import { Lora, DM_Sans, DM_Mono } from "next/font/google";
import { siteConfig } from "@/lib/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hreflang } from "@/components/seo/Hreflang";
import { ConsentMode } from "@/components/seo/ConsentMode";
import { GA4Script } from "@/components/seo/GA4Script";
import { CookieBanner } from "@/components/ui/CookieBanner";

const lora = Lora({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display-var",
  weight: ["700"],
  style: ["normal"],
  display: "swap",
});

// Italic variant loaded without preload — only used in blockquotes (below fold)
// and a few non-article pages. Avoids 2 extra font preloads competing with hero LCP.
const loraItalic = Lora({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display-italic-var",
  weight: ["700"],
  style: ["italic"],
  display: "optional",
  preload: false,
});

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body-var",
  axes: ["opsz"],
  display: "optional",
  preload: false,
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-mono-var",
  weight: ["400", "500"],
  display: "optional",
  preload: false,
});

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function CsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="cs"
      data-theme="light"
      className={`${lora.variable} ${loraItalic.variable} ${dmSans.variable} ${dmMono.variable}`}
    >
      <head>
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <Hreflang />
        <ConsentMode />
      </head>
      <body className="font-body bg-bg text-coal flex min-h-screen flex-col antialiased">
        <GA4Script />
        <CookieBanner />
        <Header locale="cs" />
        <main className="flex-1">{children}</main>
        <Footer locale="cs" />
      </body>
    </html>
  );
}
