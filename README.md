# DreamQraft Blog

GitHub Pages + [Astro](https://astro.build) 기반 블로그입니다. Investment · Development · Radiology를 주제로 합니다.

- **배포 주소**: https://dreamqraft.github.io/dreamqraft/
- **배포 방식**: `main` 브랜치에 push하면 GitHub Actions가 자동으로 빌드·배포 (`.github/workflows/deploy.yml`)

## 최초 1회 설정

1. 이 브랜치를 `main`으로 머지(또는 push)합니다.
2. GitHub 저장소 → **Settings → Pages → Build and deployment → Source**를 **GitHub Actions**로 변경합니다.
3. 1~2분 뒤 Actions 탭에서 배포가 끝나면 블로그가 열립니다.

> 💡 저장소 이름을 `dreamqraft.github.io`로 바꾸면 `https://dreamqraft.github.io/` 루트 주소로 서비스됩니다.
> 이 경우 `astro.config.mjs`의 `base`를 `"/"`로 수정하세요. (AdSense의 `ads.txt`와 `robots.txt`는
> 도메인 루트에 있어야 인식되므로, 애드센스를 붙일 계획이면 user site 또는 커스텀 도메인을 권장합니다.)

## 글 쓰는 방법

`src/content/blog/` 폴더에 `english-slug.md` 파일을 추가하고 push하면 끝입니다.

```markdown
---
title: "글 제목"
description: "검색 결과·목록에 표시될 한 줄 요약 (SEO에 중요)"
pubDate: 2026-07-06
category: investment        # investment | development | radiology 중 하나
tags: [ETF, 자산배분]        # 자유롭게, 여러 개 가능
draft: false                # true면 발행 안 됨 (초안)
---

본문을 마크다운으로 작성합니다.
```

- **파일명이 URL 슬러그**가 됩니다 — 영문 권장 (`/investment/파일명/`).
- `description`은 필수입니다. 메타 태그와 글 목록 요약에 사용됩니다.
- `category`는 글당 1개 (정의된 값만 허용 — 오타는 빌드 에러로 잡아줍니다), 태그는 자유.
- `draft: true`로 두면 커밋해도 발행되지 않습니다.

## 카테고리 관리

카테고리 추가/수정은 `src/consts.ts`의 `CATEGORIES` 배열만 고치면 됩니다.
내비게이션 메뉴, 카테고리 페이지, 글 스키마 검증에 모두 자동 반영됩니다.

## 비공개 투자 저널 (/journal/)

`src/content/journal/`의 글은 일반 블로그와 분리된 **비공개 저널**입니다.
메뉴에는 노출되지 않으며 `https://.../journal/` 주소로 직접 접근합니다 (북마크 추천).

- 빌드 시 저널 전체가 **AES-256-GCM으로 암호화**되어 배포되고, `/journal/` 페이지에서 비밀번호를 입력해야 브라우저에서 복호화됩니다. 비밀번호 없이는 배포된 사이트에서 내용을 볼 수 없습니다.
- 검색 인덱스·사이트맵·RSS·홈 목록에서 제외되고, `noindex` 메타로 검색엔진 색인도 차단됩니다.

**설정 (최초 1회):** GitHub 저장소 → Settings → Secrets and variables → Actions → New repository secret으로 `JOURNAL_PASSWORD`를 추가하세요. 시크릿이 없으면 저널 내용은 배포에 포함되지 않습니다. 로컬 미리보기는 `JOURNAL_PASSWORD=비밀번호 npm run build`처럼 실행합니다.

> ⚠️ **중요:** 저널 원문은 저장소의 `src/content/journal/`에 평문으로 저장됩니다. 배포된 사이트에서는 암호화되지만, **저장소가 public이면 소스에서 원문이 보입니다.** 저널을 쓰려면 저장소를 private으로 유지하세요. 비밀번호를 바꾸면 다음 배포부터 새 비밀번호로 암호화됩니다.

## 블로그에서 글쓰기 (/write/)

메뉴에 노출되지 않는 페이지입니다 — `https://.../write/` 주소로 직접 접근하세요.
제목·카테고리·태그·본문을 입력하면 완성된 마크다운 파일이 **GitHub 커밋 화면에 자동으로 채워진 채** 열립니다. 커밋 버튼만 누르면 1~2분 안에 자동 배포됩니다.

- 저장소 쓰기 권한이 있는 계정으로 GitHub에 로그인되어 있어야 하므로, 페이지가 공개되어 있어도 본인만 발행할 수 있습니다.
- "투자 저널 (비공개)"를 선택하면 `src/content/journal/`로 저장됩니다.
- 본문이 매우 길면 URL 한도로 커밋 화면에서 잘릴 수 있습니다 — 그 경우 "내용 복사" 버튼으로 붙여넣으세요.

## 검색

`/search/` 페이지에서 제목·본문·태그·카테고리를 대상으로 검색할 수 있습니다.

- 빌드 시 `search-index.json`(글 전체의 텍스트 인덱스)이 자동 생성되고, 브라우저에서 즉시 필터링합니다. 외부 서비스·서버 불필요.
- 한글 부분 일치를 지원하며, 여러 단어를 띄어 쓰면 AND 조건으로 검색됩니다.
- `/search/?q=검색어` 형태의 URL 공유도 가능합니다.

## SEO

기본으로 포함되어 있습니다:

- 메타 태그 · Open Graph · Twitter 카드 · canonical · JSON-LD (`src/components/BaseHead.astro`)
- `sitemap-index.xml` (@astrojs/sitemap)
- RSS `rss.xml` (@astrojs/rss)
- `robots.txt` (sitemap 링크 포함)

추가로 할 일:

1. [Google Search Console](https://search.google.com/search-console)에 사이트 등록 (도메인 또는 URL 접두어 방식) → `sitemap-index.xml` 제출
2. 네이버 서치어드바이저에도 동일하게 등록

## AdSense 연동

승인을 받은 뒤 `src/consts.ts`에서 두 줄만 수정하면 됩니다:

```ts
export const ADSENSE = {
  enabled: true,
  client: "ca-pub-XXXXXXXXXXXXXXXX",
} as const;
```

- 모든 페이지 `<head>`에 AdSense 스크립트가 삽입되고, 글 본문 아래 in-article 광고 슬롯이 활성화됩니다.
- `/ads.txt`도 자동으로 채워집니다.
- 광고 위치를 바꾸려면 `src/components/AdInArticle.astro`를 원하는 위치에 배치하세요.

## 로컬 미리보기 (선택)

```bash
npm install
npm run dev        # http://localhost:4321/dreamqraft/
npm run build      # dist/에 정적 파일 생성
```

로컬 미리보기 없이 push만 해도 됩니다 — 빌드는 GitHub Actions가 합니다.

## 구조

```
astro.config.mjs           사이트 URL, base 경로, sitemap 설정
src/consts.ts              제목·카테고리·AdSense 등 전역 설정 (대부분 여기만 수정)
src/content/blog/          글 (마크다운)
src/content.config.ts      글 frontmatter 스키마 (검증)
src/pages/                 라우트 (홈, 글, 카테고리, 태그, about, rss, robots, ads.txt)
src/layouts/, components/  페이지 뼈대와 공통 조각
src/styles/global.css      디자인 (라이트/다크 모드 지원)
public/                    favicon 등 정적 파일
```
