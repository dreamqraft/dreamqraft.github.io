// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// 저장소를 dreamqraft.github.io로 바꾸면 base를 "/"로 수정하세요.
export default defineConfig({
  site: "https://dreamqraft.github.io",
  base: "/dreamqraft",
  trailingSlash: "always",
  integrations: [
    sitemap({
      // 비공개·도구 페이지는 사이트맵에서 제외
      filter: (page) => !page.includes("/journal/") && !page.includes("/write/"),
    }),
  ],
  markdown: {
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
    },
  },
});
