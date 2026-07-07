---
title: "GitHub Actions로 매일 도는 작업 만들기"
description: "서버 없이 스케줄 작업을 돌리는 가장 저렴한 방법."
pubDate: 2026-04-12
category: development
tags: [github-actions, 자동화, ci]
---

"매일 아침 데이터를 받아서 처리하고 결과를 커밋한다" 같은 작업에 서버를 빌릴 필요는 없습니다. GitHub Actions의 `schedule` 트리거면 충분합니다.

## 기본 형태

```yaml
name: daily-job
on:
  schedule:
    - cron: "30 22 * * *" # UTC 기준 — KST 07:30
  workflow_dispatch: # 수동 실행 버튼

jobs:
  run:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"
      - run: python scripts/daily.py
      - run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add -A && git diff --cached --quiet || git commit -m "chore: daily update"
          git push
```

## 겪은 함정들

- **cron은 UTC** — KST에서 9시간을 빼야 합니다. 이걸 잊으면 새벽에 돌아갑니다.
- **정확한 시각 보장이 없음** — 혼잡 시간대엔 수십 분 밀릴 수 있습니다. 분 단위 정밀도가 필요한 작업엔 부적합합니다.
- **60일 규칙** — 저장소에 활동이 없으면 스케줄이 자동 비활성화됩니다. 개인 프로젝트에서 은근히 자주 당합니다.
- **`workflow_dispatch`는 꼭 같이** — 디버깅할 때 cron을 기다릴 수는 없으니까요.

## 요약

무료 티어의 실행 시간만으로 웬만한 개인 자동화는 다 돌아갑니다. "작은 반복 작업 + 결과를 저장소에 커밋" 패턴이라면 서버보다 이 방식이 관리 비용이 훨씬 적습니다.
