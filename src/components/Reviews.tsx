'use client';
import { useEffect, useMemo, useState } from 'react';

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
  const [itemsPerView, setItemsPerView] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);

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

          <div className="overflow-hidden">
            <div
              className="flex gap-4 transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${(activeIndex * 100) / itemsPerView}%)` }}
              aria-live="polite"
            >
              {reviews.map((r) => (
                <article
                  key={r.id}
                  className="rvv-bubble w-full shrink-0 rounded-2xl border border-white/15 bg-[rgba(12,15,20,.9)] shadow-[0_24px_60px_rgba(2,8,18,.45)]"
                  style={{ flexBasis: `${100 / itemsPerView}%` }}
                >
                  <div className="rvv-surface h-full p-4">
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
        </div>
      </div>
    </section>
  );
}
