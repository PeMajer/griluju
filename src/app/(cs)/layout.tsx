import type { Metadata } from "next";
import { DM_Serif_Display, DM_Sans, DM_Mono } from "next/font/google";
import { siteConfig } from "@/lib/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hreflang } from "@/components/seo/Hreflang";
import { ConsentMode } from "@/components/seo/ConsentMode";
import { GA4Script } from "@/components/seo/GA4Script";

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display-var",
  weight: "400",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body-var",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-mono-var",
  weight: ["400", "500"],
  display: "swap",
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
      suppressHydrationWarning
      className={`${dmSerifDisplay.variable} ${dmSans.variable} ${dmMono.variable}`}
    >
      <head>
        <Hreflang />
        <ConsentMode />
      </head>
      <body className="font-body bg-bg text-coal flex min-h-screen flex-col">
        <GA4Script />
        <Header locale="cs" />
        <main className="flex-1">{children}</main>
        <Footer locale="cs" />
      </body>
    </html>
  );
}
