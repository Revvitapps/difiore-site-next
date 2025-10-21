import { z } from "zod";
import { NextResponse } from "next/server";

const gradeSchema = z.object({
  score: z.number().min(0).max(100),
});

export async function POST(req: Request) {
  const data = await req.json();
  const result = gradeSchema.safeParse(data);

  if (!result.success) {
    return NextResponse.json({ error: result.error.flatten() }, { status: 400 });
  }

  const { score } = result.data;
  const grade = score >= 90 ? "A" : score >= 75 ? "B" : score >= 60 ? "C" : "F";

  return NextResponse.json({ grade });
}
