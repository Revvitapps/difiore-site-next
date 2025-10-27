'use client';

import React from 'react';
import type { EstimatorStateLike } from './types';

// Define the shape we expect for the live estimate numbers
type EstimateNumbers = {
  conservative: number;
  likely: number;
  premium: number;
  breakdownLines?: string[];
};

type ReviewSummaryProps = {
  state: EstimatorStateLike;
  est: EstimateNumbers;
};

function formatUsd(n: number) {
  return n.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });
}

function ReviewSummary({ state, est }: ReviewSummaryProps) {
  if (!state.project) {
    return null;
  }

  return (
    <aside className="rounded-xl border border-white/10 bg-white/[0.03] ring-1 ring-white/5 p-5 text-white space-y-4 shadow-[0_30px_120px_rgba(0,0,0,.8)]">
      <div className="text-[11px] uppercase tracking-wide font-semibold text-amber-300">
        Your Estimate
      </div>

      <div className="text-lg font-bold">
        {state.project.charAt(0).toUpperCase() + state.project.slice(1)}
      </div>

      {/* 3-tier cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center text-[13px]">
        {/* Conservative */}
        <div className="rounded-lg border border-white/15 bg-black/30 p-3">
          <div className="text-[10px] font-medium text-white/70">
            Conservative
          </div>
          <div className="text-base font-bold text-green-400 mt-1">
            {formatUsd(est.conservative)}
          </div>
        </div>

        {/* Most Likely */}
        <div className="rounded-lg border border-amber-400/40 bg-black/40 p-3 ring-2 ring-amber-400/60 shadow-[0_0_20px_rgba(251,191,36,.4)]">
          <div className="text-[10px] font-medium text-white/70">
            Most Likely
          </div>
          <div className="text-base font-extrabold text-amber-300 mt-1">
            {formatUsd(est.likely)}
          </div>
        </div>

        {/* Premium */}
        <div className="rounded-lg border border-white/20 bg-black/30 p-3">
          <div className="text-[10px] font-medium text-white/70">Premium</div>
          <div className="text-base font-bold text-red-400 mt-1">
            {formatUsd(est.premium)}
          </div>
        </div>
      </div>

      {/* breakdown */}
      {est.breakdownLines?.length ? (
        <div className="mt-2 text-[11px] text-white/50 leading-relaxed">
          {est.breakdownLines.map((line, idx) => (
            <div key={idx}>{line}</div>
          ))}
          <div className="mt-2 text-white/40">
            Final quote requires a site visit (structure/utilities/permits).
          </div>
        </div>
      ) : null}

      <div className="text-[11px] text-white/40 leading-relaxed border-t border-white/10 pt-3">
        This is a real-world working number for Greater Rhode Island / MA /
        CT labor and material as of 2024 — not a lowball internet number.
      </div>
    </aside>
  );
}

export default ReviewSummary;
