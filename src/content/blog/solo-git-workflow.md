---
title: "혼자 쓰는 저장소에도 브랜치가 필요한 이유"
description: "1인 프로젝트를 위한 최소한의 git 워크플로를 정리합니다."
pubDate: 2026-06-19
category: life
---

혼자 쓰는 저장소는 보통 main에 바로 커밋하게 됩니다. 저도 그랬는데, 몇 번의 사고 후에 1인용 최소 워크플로를 정했습니다.

## 규칙 세 개

1. **main은 항상 동작하는 상태** — 배포(GitHub Actions)가 main에 걸려 있으므로, 깨진 코드가 main에 오면 사이트가 깨집니다.
2. **작업은 짧은 브랜치에서** — `feat/logo`, `fix/rss-link`처럼 목적 하나짜리 브랜치를 만들고, 끝나면 바로 머지 후 삭제합니다.
3. **커밋 메시지는 '왜'를 남긴다** — 코드 diff는 '무엇'을 이미 말해줍니다. 메시지에는 이유를 적습니다.

## 자주 쓰는 명령 모음

```bash
git switch -c fix/rss-link   # 브랜치 생성 + 이동
git add -p                   # 변경을 조각 단위로 확인하며 스테이징
git commit -m "Fix RSS channel link to include base path"
git switch main && git merge fix/rss-link
git branch -d fix/rss-link
```

## `git add -p`가 바꿔준 것

한 번에 여러 가지를 고치는 습관이 있다면 `-p`(patch) 옵션이 특효약입니다. 조각 단위로 스테이징하다 보면 "이건 다른 커밋이어야 하는데"가 보이고, 자연스럽게 커밋이 작아집니다. 작은 커밋은 되돌리기도 쉽습니다.

거창한 브랜치 전략은 필요 없지만, "main은 신성하다"는 규칙 하나만은 1인 프로젝트에서도 값을 합니다.
