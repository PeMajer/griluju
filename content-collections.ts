import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import { z } from "zod";

const posts = defineCollection({
  name: "posts",
  directory: "content/posts",
  include: "*/index.mdx",
  schema: z.object({
    content: z.string(),
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    date: z.string(),
    updated: z.string().optional(),
    author: z.string(),
    category: z.enum(["recepty", "navod", "recenze", "srovnani"]),
    keywords: z.array(z.string()),
    tag: z.string().optional(),
    image: z.string().optional(),
    affiliate: z.boolean().default(false),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document);
    return {
      ...document,
      mdx,
    };
  },
});

export default defineConfig({
  content: [posts],
});
