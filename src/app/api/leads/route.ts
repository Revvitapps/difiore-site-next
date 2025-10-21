import { z } from "zod";
import { NextResponse } from "next/server";

const leadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export async function POST(req: Request) {
  const data = await req.json();
  const result = leadSchema.safeParse(data);

  if (!result.success) {
    return NextResponse.json({ error: result.error.flatten() }, { status: 400 });
  }

  // Handle lead (e.g. save to DB or send email) — stubbed for now
  return NextResponse.json({ success: true });
}
