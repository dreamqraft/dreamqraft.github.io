import { getCollection, type CollectionEntry } from "astro:content";
import { url } from "../consts";

export type Post = CollectionEntry<"blog">;

/** 발행된 글을 최신순으로 반환 (draft: true 제외) */
export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** 글의 최종 URL 경로: /카테고리/슬러그/ */
export function postPath(post: Post): string {
  return url(`/${post.data.category}/${post.id}/`);
}
