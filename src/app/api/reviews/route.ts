import { NextResponse } from 'next/server';
import { fetchGoogleReviews } from '@/lib/googleReviews';

export async function GET() {
  const summary = await fetchGoogleReviews();

  return NextResponse.json({
    rating: Number.isFinite(summary.rating) ? Number(summary.rating.toFixed(2)) : 5,
    count: summary.count,
    reviews: summary.reviews.map((review) => ({
      id: review.id,
      name: review.name,
      rating: review.rating,
      text: review.text,
      createTime: review.createTime,
      avatarUrl: review.avatarUrl,
    })),
  });
}
