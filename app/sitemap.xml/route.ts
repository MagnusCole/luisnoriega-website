import { NextResponse } from "next/server";

export const dynamic = "force-static";

const pages = [
  { loc: "https://luisnoriega.com/", priority: 1.0 },
  { loc: "https://luisnoriega.com/portafolio", priority: 0.8 },
];

export async function GET() {
  const lastmod = new Date().toISOString();
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    pages.map(p => `\n  <url><loc>${p.loc}</loc><lastmod>${lastmod}</lastmod><priority>${p.priority}</priority></url>`).join("") +
    `\n</urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
