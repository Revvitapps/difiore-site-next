import { NextResponse } from 'next/server';

export async function GET() {
  // If you flip NEXT_PUBLIC_REVIEWS_MOCK=0 later, wire Google Places here.
  // Returning an empty payload is fine while in mock mode on the client.
  return NextResponse.json({ rating: 5.0, count: 13, reviews: [] }, { status: 200 });
}
