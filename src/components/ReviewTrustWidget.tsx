"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { REVIEW_SUMMARY } from "@/lib/seo/reviewSummary";
import { clampRating, renderStars } from "@/lib/reviewFormatting";

type ReviewTrustWidgetProps = {
  className?: string;
};

export default function ReviewTrustWidget({ className }: ReviewTrustWidgetProps) {
  const [rating, setRating] = useState(REVIEW_SUMMARY.rating);
  const [count, setCount] = useState(REVIEW_SUMMARY.count);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const response = await fetch("/api/reviews", { cache: "no-store" });
        if (!response.ok) return;
        const data = await response.json();
        const nextRating = Number(data.rating);
        const nextCount = Number(data.count);
        if (!mounted) return;
        if (Number.isFinite(nextRating) && nextRating > 0) {
          setRating(nextRating);
        }
        if (Number.isFinite(nextCount) && nextCount > 0) {
          setCount(nextCount);
        }
      } catch {
        // Keep fallback summary if request fails.
      }
    };

    void load();

    return () => {
      mounted = false;
    };
  }, []);

  const safeRating = clampRating(rating);
  const stars = renderStars(safeRating);

  return (
    <div
      className={`mx-auto mt-6 w-full max-w-3xl rounded-2xl border border-white/20 bg-white/10 px-6 py-4 text-[14px] text-white/90 shadow-[0_18px_50px_rgba(0,0,0,.35)] sm:text-[15px] ${
        className ?? ""
      }`}
    >
      <div className="flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:text-left">
        <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-300">
          Google Reviews
        </span>
        <span className="text-amber-300" aria-label={`${safeRating.toFixed(1)} out of 5 stars`}>
          {stars}
        </span>
        <span className="text-white/70">
          {safeRating.toFixed(1)} / 5 • {count} reviews
        </span>
        <Link href="/#reviews" className="text-amber-300 underline-offset-4 hover:underline">
          Read Reviews
        </Link>
      </div>
    </div>
  );
}
