import { NextResponse } from "next/server";
import { z } from "zod";

const LeadSchema = z.object({
  name: z.string().min(2, "Nombre muy corto").max(80),
  email: z.string().email("Email inválido").max(120),
  message: z.string().min(5, "Mensaje muy corto").max(2000),
  source: z.string().optional(),
});

export async function POST(request: Request) {
  try {
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
