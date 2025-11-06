import clsx from 'clsx';
import { clampRating, formatReviewDate, renderStars } from '@/lib/reviewFormatting';
import { fetchGoogleReviews } from '@/lib/googleReviews';
import type { ReviewSummary } from '@/lib/googleReviews';

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
};

function selectReview(summary: ReviewSummary, fallback?: HighlightReview): HighlightReview | null {
  const primary = summary.reviews.find((review) => review.text?.trim());
  if (primary) {
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

export default async function ReviewHighlight({ label = 'Homeowner Review', className, fallback }: ReviewHighlightProps) {
  const summary = await fetchGoogleReviews();
  const selected = selectReview(summary, fallback);

  if (!selected?.text) {
    return null;
  }

  const name = selected.name?.trim() || 'Google reviewer';
  const text = selected.text.trim();
  const ratingCandidate =
    typeof selected.rating === 'number'
      ? selected.rating
      : summary.rating ?? fallback?.rating ?? 5;
  const ratingValue = clampRating(ratingCandidate || 5) || 5;
  const stars = renderStars(ratingValue);
  const dateLabel = formatReviewDate(selected.createTime ?? fallback?.createTime);

  return (
    <div
      className={clsx(
        'rvv-bubble rounded-2xl border border-[rgba(255,255,255,.14)] bg-[rgba(12,15,20,.85)] shadow-[0_24px_60px_rgba(2,8,18,.45)]',
        className
      )}
    >
      <div className="rvv-surface p-5 md:p-6">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <div className="min-w-0">
            {label ? (
              <span className="text-xs uppercase tracking-wide text-amber-400/80">{label}</span>
            ) : null}
            <strong className="mt-1 block text-[15px] text-white">{name}</strong>
            {dateLabel ? <span className="text-xs text-zinc-400">{dateLabel}</span> : null}
          </div>
          <span
            className="text-sm text-amber-300 sm:text-base"
            aria-label={`${ratingValue.toFixed(1)} out of 5 stars`}
          >
            {stars}
          </span>
        </div>
        <p className="mt-3 text-[15px] leading-relaxed text-zinc-100">{text}</p>
      </div>
    </div>
  );
}
