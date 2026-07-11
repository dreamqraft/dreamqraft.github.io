---
title: "반복 작업을 파이썬 스크립트로 바꾸는 기준"
description: "자동화할 가치가 있는 일과 그냥 손으로 하는 게 나은 일을 구분하는 법."
pubDate: 2026-06-01
category: life
tags: [python, 자동화, 생산성]
---

"자동화하는 데 3시간, 손으로 하면 5분"인 작업을 자동화해본 사람이라면 공감할 겁니다. 자동화에도 손익분기가 있습니다.

## 자동화 판단 기준

1. **반복 주기가 예측 가능한가** — 매주/매월 반드시 돌아오는 일인가?
2. **입력과 출력이 명확한가** — 사람의 판단이 중간에 필요하면 자동화 효율이 급락합니다.
3. **실패해도 복구 가능한가** — 잘못 실행됐을 때 되돌릴 수 있는 작업부터 시작합니다.

셋 다 '예'라면 자동화, 하나라도 '아니오'면 체크리스트로 만족합니다.

## 예: 파일 정리 스크립트

다운로드 폴더를 확장자별로 분류하는 단순한 예입니다.

```python
from pathlib import Path
import shutil

RULES = {".pdf": "documents", ".png": "images", ".csv": "data"}

downloads = Path.home() / "Downloads"
for f in downloads.iterdir():
    if f.is_file() and f.suffix.lower() in RULES:
        dest = downloads / RULES[f.suffix.lower()]
        dest.mkdir(exist_ok=True)
        shutil.move(str(f), dest / f.name)
```

## 배운 것

- 스크립트는 **처음엔 출력만 하게(dry-run)** 만들고, 결과를 확인한 뒤 실제 동작을 켭니다.
- cron이나 작업 스케줄러에 올리기 전에 손으로 한 달쯤 실행해보면 엣지 케이스가 드러납니다.

자동화의 진짜 이득은 절약된 5분이 아니라, 그 일을 **머릿속에서 지울 수 있다**는 점입니다.
