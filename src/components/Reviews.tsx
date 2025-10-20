'use client';
import { useEffect, useState } from 'react';

type Review = { id: string; name: string; rating: number; text: string };

const MOCK: Review[] = [
  { id: 'r1', name: 'Catherine R.', rating: 5, text: 'Beautiful work and very clean job site. Communication was excellent.' },
  { id: 'r2', name: 'James W.',     rating: 5, text: 'They handled our addition end-to-end. On time, on budget.' },
  { id: 'r3', name: 'Mark P.',      rating: 5, text: 'Roof tear-off and re-roof in one day. Professional crew.' },
  { id: 'r4', name: 'Alyssa D.',    rating: 5, text: 'Kitchen remodel turned out incredible—fit and tile work are top notch.' },
];

const PLACE_ID = 'REPLACE_WITH_YOUR_PLACE_ID';

export default function Reviews() {
  const useMock = process.env.NEXT_PUBLIC_REVIEWS_MOCK === '1';
  const [reviews, setReviews] = useState<Review[]>(MOCK);
  const [avg, setAvg] = useState<number>(5.0);
  const [count, setCount] = useState<number>(MOCK.length);

  useEffect(() => {
    if (useMock) return;
    (async () => {
      try {
        const res = await fetch('/api/reviews', { cache: 'no-store' });
        const data = await res.json();
        setAvg(data.rating ?? 5);
        setCount(data.count ?? MOCK.length);
        setReviews(Array.isArray(data.reviews) && data.reviews.length ? data.reviews : MOCK);
      } catch {
        setReviews(MOCK); setAvg(5); setCount(MOCK.length);
      }
    })();
  }, [useMock]);

  return (
    <section id="reviews" aria-label="Reviews" className="relative py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-[19px] uppercase tracking-wide text-amber-400/90">Customer Reviews</span>
          <h2 className="font-serif text-[clamp(30px,3.2vw,40px)] font-extrabold tracking-tight">What homeowners say</h2>
          <div className="mt-1 flex items-center gap-3 text-sm text-zinc-300">
            <span className="text-lg" aria-label={`${avg} out of 5 stars`}>
              {'★'.repeat(Math.round(avg))}{'☆'.repeat(5 - Math.round(avg))}
            </span>
            <span>{avg.toFixed(1)} / 5 • {count}+ reviews</span>
          </div>
          <div className="mt-3 flex flex-wrap justify-center gap-3">
            <a
              href={`https://search.google.com/local/writereview?placeid=${PLACE_ID}`}
              target="_blank" rel="noopener noreferrer"
              className="rounded-full bg-amber-500 px-4 py-2 text-[14px] font-semibold text-zinc-900 hover:bg-amber-400"
            >
              Write a Google review
            </a>
          </div>
        </div>

        {/* Mobile: snap-scrolling (1 full card at a time) */}
        <div className="mt-8 md:hidden">
          <div className="overflow-x-auto [-webkit-overflow-scrolling:touch] snap-x snap-mandatory scroll-px-4">
            <div className="flex gap-4 px-4">
              {reviews.map((r) => (
                <article
                  key={r.id}
                  className="snap-start w-[86vw] max-w-[360px] rvv-bubble rounded-2xl border border-white/15
                             bg-[rgba(12,15,20,.9)] shadow-[0_24px_60px_rgba(2,8,18,.45)]"
                >
                  <div className="rvv-surface p-4">
                    <div className="flex items-center justify-between">
                      <strong className="truncate">{r.name}</strong>
                      <span className="ml-3 text-amber-300" aria-label={`${r.rating} stars`}>
                        {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-zinc-200">{r.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop: fixed grid (no partial cards) */}
        <div className="mt-8 hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-4">
          {reviews.map((r) => (
            <article
              key={r.id}
              className="rvv-bubble rounded-2xl border border-white/15 bg-[rgba(12,15,20,.9)]
                         shadow-[0_24px_60px_rgba(2,8,18,.45)]"
            >
              <div className="rvv-surface p-4 h-full">
                <div className="flex items-center justify-between">
                  <strong className="truncate">{r.name}</strong>
                  <span className="ml-3 text-amber-300" aria-label={`${r.rating} stars`}>
                    {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                  </span>
                </div>
                <p className="mt-2 text-sm text-zinc-200">{r.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
