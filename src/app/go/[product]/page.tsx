import { redirect } from "next/navigation";
import { getAllAffiliateSlugs, getAffiliateUrl } from "@/lib/affiliates";

export function generateStaticParams() {
  return getAllAffiliateSlugs().map((product) => ({ product }));
}

export default async function AffiliateRedirectPage({
  params,
}: {
  params: Promise<{ product: string }>;
}) {
  const { product } = await params;
  const url = getAffiliateUrl(product);

  if (!url) {
    redirect("/");
  }

  // Static export: use meta refresh for redirect
  return (
    <html>
      <head>
        <meta httpEquiv="refresh" content={`0;url=${url}`} />
        <link rel="canonical" href={url} />
      </head>
      <body>
        <p>
          Přesměrování na{" "}
          <a href={url}>{product}</a>...
        </p>
      </body>
    </html>
  );
}
