'use client';

import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';
import { clampRating, formatReviewDate, renderStars } from '@/lib/reviewFormatting';

type ReviewSummary = {
  rating: number;
  count: number;
  reviews: Array<{
    id: string;
    name: string;
    rating: number;
    text: string;
    createTime?: string;
  }>;
};

type HighlightReview = {
  name?: string;
  text?: string;
  rating?: number;
  createTime?: string;
};

type ReviewHighlightProps = {
  label?: string;
  className?: string;
  fallback?: HighlightReview;
  truncateAt?: number;
  ctaHref?: string;
  ctaLabel?: string;
  reviewOffset?: number;
};

function selectReview(summary: ReviewSummary, fallback?: HighlightReview, reviewOffset = 0): HighlightReview | null {
  const available = summary.reviews.filter((review) => review.text?.trim());
  if (available.length) {
    const index = ((reviewOffset % available.length) + available.length) % available.length;
    const primary = available[index];
    return {
      name: primary.name,
      text: primary.text?.trim(),
      rating: primary.rating,
      createTime: primary.createTime,
    };
  }

  if (fallback?.text?.trim()) {
    return {
      ...fallback,
      text: fallback.text.trim(),
    };
  }

  return null;
}

export default function ReviewHighlight({
  label = 'Homeowner Review',
  className,
  fallback,
  truncateAt = 220,
  ctaHref = '/#reviews',
  ctaLabel = 'See more Google reviews',
  reviewOffset = 0,
}: ReviewHighlightProps) {
  const fallbackSummary: ReviewSummary = useMemo(() => {
    if (!fallback?.text?.trim()) {
      return { rating: fallback?.rating ?? 5, count: 0, reviews: [] };
    }
    return {
      rating: fallback.rating ?? 5,
      count: 1,
      reviews: [
        {
          id: 'fallback-review',
          name: fallback.name || 'Google reviewer',
          rating: fallback.rating ?? 5,
          text: fallback.text.trim(),
          createTime: fallback.createTime,
        },
      ],
    };
  }, [fallback]);

  const [summary, setSummary] = useState<ReviewSummary>(fallbackSummary);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch('/api/reviews', { cache: 'no-store' });
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const data = await res.json();
        if (cancelled) return;

        const rating =
          typeof data.rating === 'number' && Number.isFinite(data.rating) ? data.rating : fallbackSummary.rating ?? 5;
        const count = typeof data.count === 'number' && data.count >= 0 ? data.count : fallbackSummary.count ?? 0;
        const reviews = Array.isArray(data.reviews) ? data.reviews : fallbackSummary.reviews;

        setSummary({
          rating,
          count,
          reviews: reviews.map((item) => ({
            id: item.id ?? crypto.randomUUID(),
            name: item.name ?? 'Google reviewer',
            rating: typeof item.rating === 'number' ? item.rating : fallback?.rating ?? 5,
            text: item.text ?? '',
            createTime: item.createTime,
          })),
        });
      } catch (error) {
        if (!cancelled) {
          setSummary((prev) => (prev.reviews.length ? prev : fallbackSummary));
        }
        console.error('Failed to load Google reviews', error);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [fallbackSummary, fallback?.rating]);

  const selected = useMemo(() => selectReview(summary, fallback, reviewOffset), [summary, fallback, reviewOffset]);

  if (!selected?.text) {
    return null;
  }

  const name = selected.name?.trim() || 'Google reviewer';
  const fullText = selected.text.trim();
  const maxLength = Math.max(0, truncateAt ?? 0);
  const shouldTruncate = maxLength > 0 && fullText.length > maxLength;
  const truncatedText = shouldTruncate
    ? `${fullText.slice(0, maxLength).replace(/\s+\S*$/, '')}…`
    : fullText;
  const ratingCandidate =
    typeof selected.rating === 'number'
      ? selected.rating
      : summary.rating ?? fallback?.rating ?? 5;
  const ratingValue = clampRating(ratingCandidate || 5) || 5;
  const stars = renderStars(ratingValue);
  const dateLabel = formatReviewDate(selected.createTime ?? fallback?.createTime);
  const moreHref = ctaHref?.trim();

  return (
    <div
      className={clsx(
        'rvv-bubble mx-auto max-w-3xl rounded-2xl border border-[rgba(255,255,255,.14)] bg-[rgba(12,15,20,.85)] shadow-[0_18px_42px_rgba(2,8,18,.45)]',
        className
      )}
    >
      <div className="rvv-surface p-4 md:p-5">
        <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <div className="min-w-0">
            {label ? (
              <span className="text-xs uppercase tracking-wide text-amber-400/80">{label}</span>
            ) : null}
            <strong className="mt-0.5 block text-sm font-semibold text-white md:text-[15px]">{name}</strong>
            {dateLabel ? <span className="text-xs text-zinc-400">{dateLabel}</span> : null}
          </div>
          <span
            className="text-sm text-amber-300 sm:text-base"
            aria-label={`${ratingValue.toFixed(1)} out of 5 stars`}
          >
            {stars}
          </span>
        </div>
        <p className="mt-3 text-[14px] leading-relaxed text-zinc-100 md:text-[15px]">{truncatedText}</p>
        {moreHref ? (
          <div className="mt-4">
            <a
              href={moreHref}
              className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-amber-300 transition hover:text-amber-200"
            >
              {ctaLabel}
              <span aria-hidden>→</span>
            </a>
          </div>
        ) : null}
      </div>
    </div>
  );
}
