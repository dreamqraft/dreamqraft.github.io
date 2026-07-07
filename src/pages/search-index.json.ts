import type { APIRoute } from "astro";
import { categoryInfo, isoDate } from "../consts";
import { getPublishedPosts, postPath } from "../lib/posts";

// 마크다운 본문을 검색용 일반 텍스트로 변환
function toPlainText(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, " ") // 코드 블록 제거
    .replace(/`[^`]*`/g, " ") // 인라인 코드 제거
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ") // 이미지
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // 링크 → 텍스트만
    .replace(/^\s*[-:| ]+\s*$/gm, " ") // 표 구분선
    .replace(/^#+\s+/gm, "") // 헤딩 기호
    .replace(/[*_~>|]/g, " ") // 강조·인용·표 기호
    .replace(/<[^>]+>/g, " ") // HTML 태그
    .replace(/\s+/g, " ")
    .trim();
}

export const GET: APIRoute = async () => {
  const posts = await getPublishedPosts();
  const index = posts.map((post) => ({
    title: post.data.title,
    description: post.data.description,
    category: post.data.category,
    categoryName: categoryInfo(post.data.category)?.name ?? post.data.category,
    tags: post.data.tags,
    date: isoDate(post.data.pubDate),
    url: postPath(post),
    body: toPlainText(post.body ?? ""),
  }));
  return new Response(JSON.stringify(index), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
};
