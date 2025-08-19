import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  // Use a system font to avoid remote fetch & Buffer on Edge
  const title = "Luis Noriega — Portafolio & M&A";

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#000", color: "#fff", position: "relative", display: "flex" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "#fff", opacity: 0.9 }} />
        <div style={{ margin: "auto", padding: 64, maxWidth: 980, width: "100%", fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif' }}>
          <div style={{ fontSize: 24, opacity: 0.8 }}>luisnoriega.com</div>
          <div style={{ fontSize: 88, fontWeight: 800, lineHeight: 1.05, letterSpacing: -0.5 }}>{title}</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
