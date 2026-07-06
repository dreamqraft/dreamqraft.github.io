import type { APIRoute } from "astro";
import { ADSENSE } from "../consts";

// AdSense용 판매자 인증 파일 — consts.ts의 ADSENSE 설정을 따라갑니다.
export const GET: APIRoute = () => {
  const body =
    ADSENSE.enabled && ADSENSE.client
      ? `google.com, ${ADSENSE.client.replace(/^ca-/, "")}, DIRECT, f08c47fec0942fa0\n`
      : "";
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
