interface HowToSchemaProps {
  name: string;
  description: string;
  image?: string;
  totalTime?: string;
  steps: { name: string; text: string; image?: string }[];
}

export function HowToSchema(props: HowToSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: props.name,
    description: props.description,
    ...(props.image && { image: props.image }),
    ...(props.totalTime && { totalTime: props.totalTime }),
    step: props.steps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.name,
      text: step.text,
      ...(step.image && { image: step.image }),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
