---
title: "Astro 콘텐츠 컬렉션으로 블로그 글 관리하기"
description: "frontmatter를 스키마로 검증하면 오타가 빌드 에러로 잡힙니다."
pubDate: 2026-06-28
category: development
tags: [astro, typescript, blog]
---

이 블로그는 Astro의 **콘텐츠 컬렉션**으로 글을 관리합니다. 단순히 마크다운을 읽는 것과의 가장 큰 차이는 frontmatter가 **스키마로 검증**된다는 점입니다.

## 스키마 정의

```ts
// src/content.config.ts
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    category: z.enum(["investment", "development", "radiology"]),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
```

## 이게 왜 좋은가

- `category: invesment`처럼 오타를 내면 **빌드가 실패**합니다. 배포된 뒤에 글이 사라져 있는 것보다 훨씬 낫습니다.
- `pubDate`가 자동으로 `Date` 객체가 되어 정렬·포맷이 편합니다.
- 페이지 코드에서 `post.data.title`의 타입이 전부 추론됩니다.

## 글 목록 가져오기

```ts
const posts = await getCollection("blog", ({ data }) => !data.draft);
posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
```

정적 블로그에서 콘텐츠가 늘어날수록 이 검증 층의 가치가 커집니다. 글이 300개일 때 오타 하나를 눈으로 찾는 건 불가능하니까요.
