import rss from "@astrojs/rss";
import { SITE } from "../consts";
import { getPublishedPosts, postPath } from "../lib/posts";

export async function GET(context) {
  const posts = await getPublishedPosts();
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: new URL(import.meta.env.BASE_URL, context.site),
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      categories: [post.data.category, ...post.data.tags],
      link: postPath(post),
    })),
    customData: `<language>${SITE.lang}</language>`,
  });
}
