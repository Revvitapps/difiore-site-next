import { NextResponse } from "next/server";

export async function GET() {
  // placeholder: client can call this. When ready, swap this
  // to call Google Places / Business Profile (server-side) with your API key.
  return NextResponse.json({
    rating: 5.0,
    count: 13,
    reviews: [
      { id: "m1", name: "John D.", rating: 5, text: "Great job, very responsive!" },
      { id: "m2", name: "Sarah P.", rating: 5, text: "Beautiful workmanship." }
    ]
  });
}
