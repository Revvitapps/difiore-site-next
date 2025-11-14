'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { TouchEvent } from 'react';
import { clampRating, formatReviewDate, renderStars } from '@/lib/reviewFormatting';

type Review = {
  id: string;
  name: string;
  rating: number;
  text: string;
  createTime?: string;
  avatarUrl?: string;
};

const MOCK: Review[] = [
  {
    id: 'r1',
    name: 'Catherine R.',
    rating: 5,
    text: 'Beautiful work and very clean job site. Communication was excellent.',
  },
  {
    id: 'r2',
    name: 'James W.',
    rating: 5,
    text: 'They handled our addition end-to-end. On time, on budget.',
  },
  {
    id: 'r3',
    name: 'Mark P.',
    rating: 5,
    text: 'Roof tear-off and re-roof in one day. Professional crew.',
  },
  {
    id: 'r4',
    name: 'Alyssa D.',
    rating: 5,
    text: 'Kitchen remodel turned out incredible—fit and tile work are top notch.',
  },
];

const PLACE_ID = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID?.trim() || '';
const CUSTOM_REVIEW_URL = process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL?.trim() || '';
const TEXT_LIMIT = 220;

export default function Reviews() {
  const googleReviewUrl = CUSTOM_REVIEW_URL || (PLACE_ID ? `https://search.google.com/local/writereview?placeid=${PLACE_ID}` : null);
  const useMock = process.env.NEXT_PUBLIC_REVIEWS_MOCK === '1';
  const [reviews, setReviews] = useState<Review[]>(MOCK);
  const [avg, setAvg] = useState<number>(5);
  const [count, setCount] = useState<number>(MOCK.length);
  const [itemsPerView, setItemsPerView] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedReview, setExpandedReview] = useState<Review | null>(null);

  useEffect(() => {
    if (useMock) return undefined;
    let cancelled = false;

    const loadReviews = async () => {
      try {
        const res = await fetch('/api/reviews', { cache: 'no-store' });
        if (!res.ok) {
          throw new Error(`Request failed: ${res.status}`);
        }
        const data = await res.json();

        if (cancelled) return;

        const nextReviews: Review[] =
          Array.isArray(data.reviews) && data.reviews.length ? data.reviews : MOCK;
        const averageRaw = Number(data.rating);
        const totalCount =
          typeof data.count === 'number' && data.count > 0 ? Math.round(data.count) : nextReviews.length;
        const sumRatings = nextReviews.reduce((sum, review) => sum + (review.rating ?? 0), 0);
        const derivedAverage =
          Number.isFinite(averageRaw) && averageRaw > 0
            ? clampRating(averageRaw)
            : nextReviews.length
            ? clampRating(sumRatings / nextReviews.length)
            : 5;

        setReviews(nextReviews);
        setAvg(derivedAverage);
        setCount(totalCount);
      } catch (error) {
        if (!cancelled) {
          console.error('Failed to load Google reviews', error);
          setReviews(MOCK);
          setAvg(5);
          setCount(MOCK.length);
        }
      }
    };

    void loadReviews();

    return () => {
      cancelled = true;
    };
  }, [useMock]);

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      if (width >= 1280) {
        setItemsPerView(3);
      } else if (width >= 768) {
        setItemsPerView(2);
      } else {
        setItemsPerView(1);
      }
    };

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    const maxIndex = Math.max(0, reviews.length - itemsPerView);
    setActiveIndex((idx) => Math.min(idx, maxIndex));
  }, [itemsPerView, reviews.length]);

  const totalSlides = useMemo(() => Math.max(1, reviews.length - itemsPerView + 1), [reviews.length, itemsPerView]);
  const averageDisplay = useMemo(() => clampRating(avg), [avg]);
  const averageStars = useMemo(() => renderStars(averageDisplay), [averageDisplay]);
  const reviewCountLabel = useMemo(() => (count > 0 ? `${count}+ reviews` : 'Google reviews'), [count]);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef<number>(0);

  useEffect(() => {
    if (!expandedReview) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setExpandedReview(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [expandedReview]);

  useEffect(() => {
    if (!expandedReview) return undefined;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [expandedReview]);

  const handlePrev = () => {
    setActiveIndex((prev) => {
      if (prev === 0) {
        return totalSlides - 1;
      }
      return prev - 1;
    });
  };

  const handleNext = () => {
    setActiveIndex((prev) => {
      if (prev >= totalSlides - 1) {
        return 0;
      }
      return prev + 1;
    });
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    if (event.touches.length !== 1) return;
    touchStartX.current = event.touches[0].clientX;
    touchDeltaX.current = 0;
  };

  const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    touchDeltaX.current = event.touches[0].clientX - touchStartX.current;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null) return;
    const delta = touchDeltaX.current;
    if (Math.abs(delta) > 40) {
      if (delta > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
  };

  return (
    <section id="reviews" aria-label="Reviews" className="relative py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-[19px] uppercase tracking-wide text-amber-400/90">Customer Reviews</span>
          <h2 className="font-serif text-[clamp(30px,3.2vw,40px)] font-extrabold tracking-tight">What homeowners say</h2>
          <div className="mt-1 flex items-center gap-3 text-sm text-zinc-300">
            <span className="text-lg" aria-label={`${averageDisplay.toFixed(1)} out of 5 stars`}>
              {averageStars}
            </span>
            <span>
              {averageDisplay.toFixed(1)} / 5
              {reviewCountLabel ? ` • ${reviewCountLabel}` : ''}
            </span>
          </div>
          {googleReviewUrl ? (
            <div className="mt-3 flex flex-wrap justify-center gap-3">
              <a
                href={googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-amber-500 px-4 py-2 text-[14px] font-semibold text-zinc-900 hover:bg-amber-400"
              >
                Write a Google review
              </a>
            </div>
          ) : null}
        </div>

        {/* Carousel */}
        <div className="relative mt-10">
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-0 top-1/2 hidden -translate-y-1/2 rounded-full border border-white/20 bg-black/40 px-3 py-2 text-sm text-white hover:bg-black/60 md:block"
            aria-label="Previous review"
          >
            ←
          </button>

          <div
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
          >
            <div
              className="flex -mx-2 transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${(activeIndex * 100) / itemsPerView}%)` }}
              aria-live="polite"
            >
              {reviews.map((r) => {
                const needsTruncate = r.text.length > TEXT_LIMIT;
                const truncatedText = needsTruncate
                  ? `${r.text.slice(0, TEXT_LIMIT).replace(/\s+\S*$/, '')}…`
                  : r.text;

                return (
                <div
                  key={r.id}
                  className="w-full shrink-0 px-2"
                  style={{ flexBasis: `${100 / itemsPerView}%` }}
                >
                  <article className="rvv-bubble h-full rounded-2xl border border-white/15 bg-[rgba(12,15,20,.9)] shadow-[0_24px_60px_rgba(2,8,18,.45)]">
                    <div className="rvv-surface flex h-full flex-col p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <strong className="block truncate text-[15px]">{r.name}</strong>
                          {r.createTime ? (
                            <span className="mt-0.5 block text-xs text-zinc-400">
                              {formatReviewDate(r.createTime)}
                            </span>
                          ) : null}
                        </div>
                        <span
                          className="ml-auto text-sm text-amber-300"
                          aria-label={`${clampRating(r.rating).toFixed(0)} stars`}
                        >
                          {renderStars(r.rating)}
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-zinc-200">{truncatedText}</p>
                      {needsTruncate ? (
                        <button
                          type="button"
                          onClick={() => setExpandedReview(r)}
                          className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-amber-300 transition hover:text-amber-200"
                        >
                          Read full review
                          <span aria-hidden>→</span>
                        </button>
                      ) : null}
                    </div>
                  </article>
                </div>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={handleNext}
            className="absolute right-0 top-1/2 hidden -translate-y-1/2 rounded-full border border-white/20 bg-black/40 px-3 py-2 text-sm text-white hover:bg-black/60 md:block"
            aria-label="Next review"
          >
            →
          </button>

          <div className="mt-6 flex items-center justify-center gap-2">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`h-2.5 w-2.5 rounded-full transition ${idx === activeIndex ? "bg-amber-400" : "bg-white/25"}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center gap-4 sm:hidden">
            <button
              type="button"
              onClick={handlePrev}
              className="rounded-full border border-white/20 bg-black/40 px-4 py-2 text-sm text-white hover:bg-black/60"
              aria-label="Previous review"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="rounded-full border border-white/20 bg-black/40 px-4 py-2 text-sm text-white hover:bg-black/60"
              aria-label="Next review"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {expandedReview ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="review-dialog-title"
        >
          <div className="rvv-bubble w-full max-w-2xl rounded-2xl border border-white/15 bg-[rgba(12,15,20,.95)] shadow-[0_24px_60px_rgba(2,8,18,.65)]">
            <div className="rvv-surface p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 id="review-dialog-title" className="truncate text-lg font-semibold text-white">
                    {expandedReview.name}
                  </h3>
                  {expandedReview.createTime ? (
                    <p className="mt-1 text-xs text-zinc-400">
                      {formatReviewDate(expandedReview.createTime)}
                    </p>
                  ) : null}
                  <p className="mt-2 text-sm text-amber-300" aria-label={`${clampRating(expandedReview.rating).toFixed(0)} stars`}>
                    {renderStars(expandedReview.rating)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setExpandedReview(null)}
                  className="rounded-full border border-white/20 bg-black/40 px-3 py-1 text-sm text-white transition hover:bg-black/60"
                  aria-label="Close review"
                >
                  ✕
                </button>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-zinc-100 whitespace-pre-line">
                {expandedReview.text}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
