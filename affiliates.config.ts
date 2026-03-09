export interface AffiliateLink {
  slug: string;
  name: string;
  urls: Record<string, string>;
}

export const affiliates: AffiliateLink[] = [
  {
    slug: "weber-master-touch",
    name: "Weber Master-Touch GBS E-5750",
    urls: {
      cs: "https://www.mall.cz/grily-weber?utm_source=griluju&utm_medium=affiliate",
    },
  },
  {
    slug: "teplomer-thermopro",
    name: "ThermoPro TP20",
    urls: {
      cs: "https://www.mall.cz/grilovaci-teplomery?utm_source=griluju&utm_medium=affiliate",
    },
  },
  {
    slug: "weber-rapidfire",
    name: "Weber Rapidfire rozpalovac",
    urls: {
      cs: "https://www.mall.cz/prislusenstvi-grilu?utm_source=griluju&utm_medium=affiliate",
    },
  },
];

export function getAffiliateUrl(
  slug: string,
  locale: string = "cs"
): string | null {
  const affiliate = affiliates.find((a) => a.slug === slug);
  if (!affiliate) return null;
  return affiliate.urls[locale] || affiliate.urls["cs"] || null;
}
