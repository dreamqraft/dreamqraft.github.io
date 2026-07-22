---
title: "dotfiles를 git으로 관리하기 시작했다"
description: "새 컴퓨터 세팅을 30분으로 줄여준 설정 파일 저장소."
pubDate: 2026-06-10
category: life
---

컴퓨터를 바꿀 때마다 셸 설정, 에디터 설정, 별칭들을 처음부터 다시 만드는 게 지겨워서 dotfiles 저장소를 만들었습니다.

## 구조

```text
dotfiles/
├── zsh/.zshrc
├── git/.gitconfig
├── vim/.vimrc
└── install.sh     # 심볼릭 링크 생성 스크립트
```

`install.sh`는 각 파일을 홈 디렉터리로 심볼릭 링크하는 단순한 스크립트입니다.

```bash
#!/usr/bin/env bash
ln -sf "$PWD/zsh/.zshrc" "$HOME/.zshrc"
ln -sf "$PWD/git/.gitconfig" "$HOME/.gitconfig"
ln -sf "$PWD/vim/.vimrc" "$HOME/.vimrc"
```

## 지키는 원칙

- **비밀값은 절대 커밋하지 않는다** — API 키, 토큰은 `.zshrc.local`처럼 gitignore된 파일로 분리하고, 메인 설정에서 존재하면 불러오게 합니다.
- **설정마다 주석으로 이유를 남긴다** — 6개월 뒤의 나는 왜 이 옵션을 켰는지 기억하지 못합니다.
- **일단 기본값으로 살아보고, 불편할 때만 추가한다** — 남의 dotfiles를 통째로 복사하면 이해하지 못하는 설정 더미가 됩니다.

## 효과

새 환경 세팅이 `git clone` + `./install.sh` 두 줄이 됐습니다. 무엇보다 설정이 **버전 관리**되니 "어제까지 됐는데" 상황에서 diff로 원인을 찾을 수 있습니다.
