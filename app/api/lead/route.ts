import { NextResponse } from "next/server";
import { z } from "zod";

const LeadSchema = z.object({
  name: z.string().min(2, "Nombre muy corto").max(80),
  email: z.string().email("Email inválido").max(120),
  message: z.string().min(5, "Mensaje muy corto").max(2000),
  source: z.string().optional(),
  website: z.string().optional(), // honeypot
});

// naive in-memory rate limit (per runtime instance)
const RATE_BUCKET = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60_000; // 1 minute
const MAX_REQS = 5;

export async function POST(request: Request) {
  try {
    // rate limit by IP
    const ip = (request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown").split(",")[0].trim();
    const now = Date.now();
    const rec = RATE_BUCKET.get(ip);
    if (!rec || now > rec.resetAt) {
      RATE_BUCKET.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    } else {
      rec.count += 1;
      if (rec.count > MAX_REQS) {
        return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429, headers: { "Retry-After": "60" } });
      }
    }

    const json = await request.json();
    const parsed = LeadSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: "validation_error",
          issues: parsed.error.issues.map((i) => ({ path: i.path.join("."), message: i.message })),
        },
        { status: 400 }
      );
    }

    const lead = parsed.data;
    // honeypot: if website filled, silently accept
    if (lead.website && lead.website.trim().length > 0) {
      return NextResponse.json({ ok: true, received: true }, { status: 200 });
    }
    // TODO: Integrate with CRM (HubSpot/Zapier/Resend). Keep the following stable response shape.
    console.log("Lead:", lead);

    return NextResponse.json({ ok: true, received: true }, { status: 200 });
  } catch (err) {
    console.error("Lead API error:", err);
    return NextResponse.json(
      { ok: false, error: "server_error" },
      { status: 500 }
    );
  }
}
