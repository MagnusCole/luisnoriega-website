import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  const body = `User-agent: *\nAllow: /\nSitemap: https://www.luisnoriega.com/sitemap.xml`;
  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
