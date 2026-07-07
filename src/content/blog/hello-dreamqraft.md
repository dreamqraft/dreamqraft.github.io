---
title: "블로그를 시작하며"
description: "투자, 개발, 영상의학을 기록하는 공간을 엽니다."
pubDate: 2026-07-06
category: development
tags: [blog, astro, github-pages]
---

GitHub Pages 위에 Astro로 블로그를 열었습니다. 앞으로 세 가지 주제를 중심으로 기록할 예정입니다.

## 다루는 주제

- **Investment** — 투자 원칙과 자산 배분에 대한 생각
- **Development** — 개발하면서 배운 것들
- **Radiology** — 영상의학 공부 노트

## 글 작성 방법

이 블로그의 글은 전부 마크다운으로 작성됩니다. `src/content/blog/` 폴더에 파일 하나를 추가하고 push하면 자동으로 배포됩니다.

```markdown
---
title: "글 제목"
description: "검색 결과에 표시될 한 줄 요약"
pubDate: 2026-07-06
category: investment
tags: [ETF, 자산배분]
---

본문을 마크다운으로 작성합니다.
```

코드 블록, 표, 인용문, 이미지 모두 지원합니다.

## 수식 지원

KaTeX로 수식도 쓸 수 있습니다. 인라인 수식은 `$...$`, 블록 수식은 `$$...$$`로 작성합니다.

예를 들어 연 수익률 $r$로 $n$년 투자했을 때의 미래 가치는:

$$
FV = PV \times (1 + r)^n
$$

원금이 두 배가 되는 기간을 어림하는 72의 법칙은 $n \approx 72 / r(\%)$ 입니다.

> 기록은 가장 확실한 복리다.

앞으로 꾸준히 채워 나가겠습니다.
