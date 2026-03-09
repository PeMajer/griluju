interface ProductSchemaProps {
  name: string;
  description: string;
  image?: string;
  brand?: string;
  rating?: number;
  reviewCount?: number;
  price?: string;
  currency?: string;
  availability?: "InStock" | "OutOfStock";
}

export function ProductSchema(props: ProductSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: props.name,
    description: props.description,
    ...(props.image && { image: props.image }),
    ...(props.brand && {
      brand: { "@type": "Brand", name: props.brand },
    }),
    ...(props.rating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: props.rating,
        reviewCount: props.reviewCount || 1,
      },
    }),
    ...(props.price && {
      offers: {
        "@type": "Offer",
        price: props.price,
        priceCurrency: props.currency || "CZK",
        availability: `https://schema.org/${props.availability || "InStock"}`,
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
