'use client';

import React from 'react';
import type { EstimatorState } from '../EstimatorForm';

interface ReviewSummaryProps {
  state: EstimatorState;
  estimateRange: {
    low?: number;
    mid?: number;
    high?: number;
  } | null;
  currency: (n: number | undefined) => string;
}

export function ReviewSummary({ state, estimateRange, currency }: ReviewSummaryProps) {
  return (
    <div className="space-y-4 text-white">
      <div>
        <div className="text-lg font-bold">Preview</div>
        <div className="text-sm text-white/70">
          This is what we&apos;ll send to DiFiore so they&apos;re ready when they call you.
        </div>
      </div>

      <div className="rounded-xl border border-white/15 bg-white/5 p-4 text-sm text-white/80 space-y-3">
        <div className="flex justify-between text-white">
          <span className="text-white/60">Project:</span>
          <span className="font-semibold capitalize text-white">
            {state.project || '—'}
          </span>
        </div>

        <div className="text-[12px] leading-relaxed text-white/70 space-y-1">
          <div>
            <span className="text-white/60">Home size: </span>
            <span className="text-white">
              {state.details.squareFootage
                ? `${state.details.squareFootage} sqft`
                : '—'}
              {state.details.stories
                ? `, ${state.details.stories} story`
                : ''}
            </span>
          </div>

          <div>
            <span className="text-white/60">Age of home: </span>
            <span className="text-white">
              {state.details.ageOfHome || '—'}
            </span>
          </div>

          <div>
            <span className="text-white/60">Urgency: </span>
            <span className="text-white">
              {state.details.urgency
                ? state.details.urgency === 'asap'
                  ? 'ASAP / active issue'
                  : state.details.urgency === '30'
                  ? 'Within 30 days'
                  : state.details.urgency === '90'
                  ? '1–3 months'
                  : 'Just planning / budgeting'
                : '—'}
            </span>
          </div>

          <div>
            <span className="text-white/60">Notes: </span>
            <span className="text-white">
              {state.details.additionalDetails?.trim() || '—'}
            </span>
          </div>
        </div>

        <div className="pt-3 border-t border-white/10 text-[13px] text-white/70">
          {estimateRange ? (
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-white/60">Most Likely:</span>
                <span className="text-amber-300 font-semibold">
                  {currency(estimateRange.mid)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Range:</span>
                <span className="text-white">
                  {currency(estimateRange.low)} – {currency(estimateRange.high)}
                </span>
              </div>
            </div>
          ) : (
            <div className="text-white/50">
              Add some details to get a ballpark range.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}