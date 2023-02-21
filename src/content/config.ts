import { defineCollection, z } from "astro:content";
const blogCollection = defineCollection({
   schema:z.object({
      title: z.string(),
      status: z.enum(["published", "draft", "private", "archived", "deleted"]),
      tags: z.array(z.string().nullable()),
      created_at: z.date(),
      last_modified_at: z.date(),
      published_at: z.date(),
      description: z.string(),
    })
});

export const collections = {
  "blog": blogCollection,
};
