import { z, defineCollection } from 'astro:content';

const blogCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      author: z.string(),
      tags: z.array(z.string()),
      description: z.string(),
      pubDate: z.string().transform((str) => new Date(str)),
      imgUrl: image(),
      projectStatus: z.enum(['finished', 'wip', 'archived']),
      draft: z.boolean().optional().default(false),
      externalLink: z.string().optional(),
    }),
});

export const collections = {
  blog: blogCollection,
};


const user = "contact";
const domain = "zacharyleong.com";

export const email = user + "@" + domain;
