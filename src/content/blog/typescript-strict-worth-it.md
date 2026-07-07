---
title: "TypeScript strict 모드, 처음부터 켜는 게 싸다"
description: "strict를 나중에 켜려다 고생한 뒤 내린 결론."
pubDate: 2026-04-22
category: development
tags: [typescript, 코드품질, 공부노트]
---

기존 프로젝트에 `strict: true`를 켰더니 에러가 수백 개 쏟아진 경험 이후, 새 프로젝트는 무조건 처음부터 켜기로 했습니다.

## strict가 잡아주는 대표적인 것

```ts
// strictNullChecks가 없으면 통과되는 코드
function firstChar(s: string | undefined) {
  return s.charAt(0); // s가 undefined면 런타임 에러
}
```

strict 모드에서는 `s`가 `undefined`일 가능성을 컴파일 시점에 지적합니다. 고치는 방법도 명확합니다.

```ts
function firstChar(s: string | undefined) {
  return s?.charAt(0) ?? "";
}
```

## "나중에 켜지"가 안 되는 이유

- 타입 오류는 **복리로 쌓입니다.** 느슨한 타입 위에 코드가 쌓이면, 켜는 순간 수백 개의 에러가 서로 얽혀 나옵니다.
- 에러가 많으면 결국 `any`로 덮게 되고, strict를 켠 의미가 사라집니다.

## 함께 쓰는 설정

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true
  }
}
```

`noUncheckedIndexedAccess`는 배열 인덱스 접근(`arr[0]`)이 `undefined`일 수 있음을 강제합니다. 처음엔 성가시지만, 실제로 인덱스 버그를 몇 번 잡아준 뒤로는 끄지 않습니다.

타입 시스템은 미래의 나를 위한 문서이자 테스트입니다. 문서는 처음부터 쓰는 게 쌉니다.
