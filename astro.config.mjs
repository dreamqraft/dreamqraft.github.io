// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

// 저장소를 dreamqraft.github.io로 바꾸면 base를 "/"로 수정하세요.
export default defineConfig({
  site: "https://dreamqraft.github.io",
  base: "/dreamqraft",
  trailingSlash: "always",
  integrations: [
    sitemap({
      // 도구 페이지는 사이트맵에서 제외
      filter: (page) => !page.includes("/write/"),
    }),
  ],
  markdown: {
    // KaTeX 수식: 글에서 $...$(인라인), $$...$$(블록) 문법 사용
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
    },
  },
});
