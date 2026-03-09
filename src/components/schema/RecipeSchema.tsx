interface RecipeSchemaProps {
  name: string;
  description: string;
  image?: string;
  author: string;
  datePublished: string;
  prepTime?: string;
  cookTime?: string;
  totalTime?: string;
  servings?: number;
  ingredients?: string[];
  instructions?: { name?: string; text: string }[];
  keywords?: string[];
}

export function RecipeSchema(props: RecipeSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: props.name,
    description: props.description,
    ...(props.image && { image: [props.image] }),
    author: { "@type": "Person", name: props.author },
    datePublished: props.datePublished,
    ...(props.prepTime && { prepTime: props.prepTime }),
    ...(props.cookTime && { cookTime: props.cookTime }),
    ...(props.totalTime && { totalTime: props.totalTime }),
    ...(props.servings && { recipeYield: `${props.servings} porcí` }),
    ...(props.ingredients && { recipeIngredient: props.ingredients }),
    ...(props.instructions && {
      recipeInstructions: props.instructions.map((step, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        ...(step.name && { name: step.name }),
        text: step.text,
      })),
    }),
    ...(props.keywords && { keywords: props.keywords.join(", ") }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
