// ---------------------------------------------------------------
// 사이트 전역 설정 — 대부분의 수정은 이 파일에서 끝납니다.
// ---------------------------------------------------------------

export const SITE = {
  title: "DreamQraft",
  description: "투자와 삶에 대한 기록과 생각을 정리하는 블로그입니다.",
  author: "DreamQraft",
  lang: "ko",
  postsPerPage: 8,
  // 저작권 표기 — since는 블로그 시작 연도 (현재 연도까지 자동 표기)
  copyright: {
    since: 2026,
    notice: "무단 전재 및 재배포 금지.",
  },
  // 투자 관련 컴플라이언스 고지 (푸터에 표시)
  disclaimer:
    "본 블로그의 모든 내용은 개인적인 기록과 의견이며, 특정 금융상품의 매수·매도를 권유하는 것이 아닙니다. 투자에 대한 판단과 책임은 투자자 본인에게 있습니다.",
  // 복사방지 — 본문 선택·복사·우클릭 차단 (코드 블록과 입력창은 예외). false로 끌 수 있음
  copyProtection: true,
  social: {
    github: "dreamqraft",
    email: "dreamqraft@gmail.com",
  },
} as const;

// 카테고리 정의 — 새 카테고리는 여기에 한 줄 추가하면
// 내비게이션, 카테고리 페이지, 글 스키마 검증에 모두 반영됩니다.
export const CATEGORIES = [
  {
    slug: "investment",
    name: "Investment",
    description: "투자 원칙, 자산 배분, 시장에 대한 기록",
  },
  {
    slug: "life",
    name: "Life",
    description: "공부, 개발, 일상 — 투자 밖의 모든 기록",
  },
  {
    slug: "english",
    name: "English",
    description: "Selected posts translated into English — 영어로 옮긴 글",
  },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]["slug"];

export function categoryInfo(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}

// /write/ 페이지가 커밋 화면을 여는 데 사용하는 저장소 정보
export const GITHUB = {
  repo: "dreamqraft/dreamqraft",
  branch: "main",
} as const;

// ---------------------------------------------------------------
// Google AdSense — 승인 후 enabled를 true로 바꾸고 client ID 입력
// ---------------------------------------------------------------
export const ADSENSE = {
  enabled: false,
  client: "", // 예: "ca-pub-1234567890123456"
} as const;

// base 경로를 붙여 내부 링크를 만드는 헬퍼 (base가 바뀌어도 안전)
export function url(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

// 태그 → URL 슬러그 (한글 태그도 그대로 URL이 됩니다)
export function tagSlug(tag: string): string {
  return tag.toLowerCase().replace(/\s+/g, "-");
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function isoDate(date: Date): string {
  return date.toISOString().split("T")[0]!;
}

export function readingMinutes(body: string): number {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 350));
}
