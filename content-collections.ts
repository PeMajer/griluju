import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import { z } from "zod";
import remarkGfm from "remark-gfm";

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
    category: z.enum(["recepty", "navod", "recenze"]),
    keywords: z.array(z.string()),
    tag: z.string().optional(),
    image: z.string().optional(),
    affiliate: z.boolean().default(false),
    // Recipe meta (optional, for category: recepty)
    servings: z.number().optional(),
    prepTime: z.string().optional(),
    grillTime: z.string().optional(),
    internalTemp: z.string().optional(),
    restTime: z.string().optional(),
    difficulty: z.string().optional(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document, {
      remarkPlugins: [remarkGfm],
    });
    return {
      ...document,
      mdx,
    };
  },
});

export default defineConfig({
  content: [posts],
});
