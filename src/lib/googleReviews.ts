'use server';

import { cache } from 'react';

type GoogleReviewApiResponse = {
  averageRating?: number;
  totalReviewCount?: number;
  nextPageToken?: string;
  reviews?: Array<{
    reviewId?: string;
    comment?: string;
    starRating?: string;
    createTime?: string;
    reviewer?: {
      displayName?: string;
      profilePhotoUrl?: string;
      isAnonymous?: boolean;
    };
  }>;
};

export type ReviewSummary = {
  rating: number;
  count: number;
  reviews: Array<{
    id: string;
    name: string;
    rating: number;
    text: string;
    createTime?: string;
    avatarUrl?: string;
  }>;
};

const TOKEN_ENDPOINT = 'https://oauth2.googleapis.com/token';
const GBP_V4_BASE = 'https://mybusiness.googleapis.com/v4';

// These IDs do not change frequently. If the Google Business Profile ever moves
// to another account/location, update the constants or lift them into env vars.
const GBP_ACCOUNT_ID = '101505310957108827231';
const GBP_LOCATION_ID = '9626568385906286179';

const STAR_MAP: Record<string, number> = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
};

async function fetchAccessToken(): Promise<string> {
  const clientId = process.env.GBP_CLIENT_ID;
  const clientSecret = process.env.GBP_CLIENT_SECRET;
  const refreshToken = process.env.GBP_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error('GBP OAuth credentials are not configured.');
  }

  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
    cache: 'no-store',
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Unable to refresh GBP access token: ${response.status} ${errorBody}`);
  }

  const json = await response.json();
  return json.access_token as string;
}

const mapReviews = (data: GoogleReviewApiResponse): ReviewSummary => {
  const reviews = (data.reviews ?? [])
    .map((review) => {
      const rating = STAR_MAP[review.starRating ?? ''] ?? 0;
      const comment = review.comment?.trim() ?? '';
      if (!comment || rating === 0) {
        return null;
      }

      return {
        id: review.reviewId ?? crypto.randomUUID(),
        name: review.reviewer?.displayName || 'Google reviewer',
        rating,
        text: comment,
        createTime: review.createTime,
        avatarUrl: review.reviewer?.profilePhotoUrl,
      };
    })
    .filter(Boolean) as ReviewSummary['reviews'];

  const count = data.totalReviewCount ?? reviews.length;
  const rating =
    data.averageRating ??
    (reviews.length
      ? reviews.reduce((sum, item) => sum + item.rating, 0) / reviews.length
      : 5);

  return {
    rating,
    count,
    reviews,
  };
};

const requestReviews = cache(async (): Promise<ReviewSummary> => {
  const token = await fetchAccessToken();

  const response = await fetch(
    `${GBP_V4_BASE}/accounts/${GBP_ACCOUNT_ID}/locations/${GBP_LOCATION_ID}/reviews`,
    {
      headers: { Authorization: `Bearer ${token}` },
      // Revalidate the cached response hourly; we do not need live data on every request.
      next: { revalidate: 3600 },
    }
  );

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Google reviews request failed: ${response.status} ${errorBody}`);
  }

  const data = (await response.json()) as GoogleReviewApiResponse;
  return mapReviews(data);
});

export async function fetchGoogleReviews(): Promise<ReviewSummary> {
  try {
    const summary = await requestReviews();

    // Limit to a manageable number for UI rendering.
    if (summary.reviews.length > 24) {
      summary.reviews = summary.reviews.slice(0, 24);
    }

    return summary;
  } catch (error) {
    console.error('Failed to load Google reviews', error);
    return {
      rating: 5,
      count: 0,
      reviews: [],
    };
  }
}
