"use client";

import dynamic from "next/dynamic";

// Lazy-load cookie banner — defers vanilla-cookieconsent JS/CSS from initial bundle
const CookieBanner = dynamic(
  () => import("./CookieBanner").then((m) => m.CookieBanner),
  { ssr: false }
);

export function CookieBannerLazy() {
  return <CookieBanner />;
}
