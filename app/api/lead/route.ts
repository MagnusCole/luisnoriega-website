import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // TODO: Send to CRM (HubSpot/Zapier/Resend). For now, just echo.
    console.log("Lead:", body);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
