"use client";

import dynamic from "next/dynamic";

const NewsletterCTA = dynamic(
  () =>
    import("./NewsletterCTA").then((mod) => ({ default: mod.NewsletterCTA })),
  { ssr: false }
);

export function LazyNewsletterCTA() {
  return <NewsletterCTA />;
}
