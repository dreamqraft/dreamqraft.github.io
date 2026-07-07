import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { CATEGORIES } from "./consts";

const categorySlugs = CATEGORIES.map((c) => c.slug) as [string, ...string[]];

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.enum(categorySlugs),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

// 비공개 투자 저널 — 빌드 시 암호화되어 /journal/에서 비밀번호로만 열람
const journal = defineCollection({
  loader: glob({ base: "./src/content/journal", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { blog, journal };
