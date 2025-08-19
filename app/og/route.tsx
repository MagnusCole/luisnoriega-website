import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  // Use a system font to avoid remote fetch & Buffer on Edge
  const title = "Luis Noriega — Acquisition Entrepreneur LATAM";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "linear-gradient(135deg,#0A0E27,#111827)",
          color: "#E5E7EB",
          padding: 64,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ maxWidth: 900, fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif' }}>
          <div style={{ fontSize: 24, opacity: 0.7 }}>luisnoriega.com</div>
          <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.05 }}>{title}</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
