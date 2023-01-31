import { defineCollection, z } from "astro:content";
const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    status: z.enum(["publish"]),
    tags: z.array(z.string()),
    created_at: z.date(),
    last_modified_at: z.date(),
    published_at: z.string().transform((str: string) => new Date(str))
      .optional(),
    lang: z.enum(["en-AU"]),
    description: z.string().optional().nullable(),
  }),
});

export const collections = {
  "blog": blogCollection,
};
