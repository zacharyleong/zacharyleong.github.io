import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const blog = await getCollection('blog');
  return rss({
    title: 'Zachary Leong',
    description: 'Zachary Leong\'s personal website',
    stylesheet: false,
    site: context.site,
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/projects/${post.slug}/`,
    })),
    customData: '<language>en-us</language>',
    canonicalUrl: 'https://zacharyleong.com',
  });
}
