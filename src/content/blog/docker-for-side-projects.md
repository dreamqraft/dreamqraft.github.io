---
title: "사이드 프로젝트에 Docker를 쓰는 최소한의 이유"
description: "복잡한 오케스트레이션 없이, 재현 가능한 실행 환경 하나만 얻기."
pubDate: 2026-05-13
category: development
tags: [docker, 인프라, 개발환경]
---

Docker는 배울 게 많아 보이지만, 사이드 프로젝트에서 필요한 건 사실 한 가지입니다 — **"내 컴퓨터에선 되는데"를 없애는 것.**

## 최소한의 Dockerfile

Node 앱 기준으로 이 정도면 충분히 시작할 수 있습니다.

```dockerfile
FROM node:22-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
docker build -t my-app .
docker run -p 3000:3000 my-app
```

## 이것만 알면 되는 개념

- **이미지** — 실행 환경의 스냅샷 (레시피의 결과물)
- **컨테이너** — 이미지를 실제로 실행한 것 (일회용, 지워도 됨)
- **볼륨** — 컨테이너가 사라져도 남아야 하는 데이터의 자리

## 내가 얻은 것

1. 몇 달 뒤에 프로젝트를 다시 열어도 `docker run` 한 줄로 실행됩니다. 그 사이 내 컴퓨터의 Node 버전이 바뀌어도 상관없습니다.
2. DB 같은 의존 서비스를 로컬에 직접 설치하지 않고 컨테이너로 띄웁니다. 프로젝트를 지우면 흔적 없이 사라집니다.

쿠버네티스나 멀티 스테이지 빌드는 필요해질 때 배우면 됩니다. 처음부터 다 알 필요가 없다는 게 이 도구의 장점입니다.
