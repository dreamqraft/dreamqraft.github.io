# DreamQraft

투자와 삶을 기록하는 개인 블로그입니다.

- **Stack**: [Astro](https://astro.build) + GitHub Pages
- **배포**: `main`에 push하면 GitHub Actions가 자동으로 빌드·배포합니다.

## 글쓰기

`src/content/blog/`에 마크다운 파일을 추가하면 됩니다.

```markdown
---
title: "글 제목"
description: "한 줄 요약"
pubDate: 2026-07-06
category: investment   # investment | life | english
tags: [태그1, 태그2]
---

본문. 수식은 $...$ / $$...$$ (KaTeX), 코드·표·이미지 지원.
```

## 로컬 실행

```bash
npm install
npm run dev
```

## 구조

```
src/consts.ts        사이트·카테고리 설정
src/content/blog/    글 (마크다운)
src/pages/           라우트
src/styles/          스타일
```
