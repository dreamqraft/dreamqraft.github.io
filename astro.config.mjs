// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// 저장소를 dreamqraft.github.io로 바꾸면 base를 "/"로 수정하세요.
export default defineConfig({
  site: "https://dreamqraft.github.io",
  base: "/dreamqraft",
  trailingSlash: "always",
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
    },
  },
});
