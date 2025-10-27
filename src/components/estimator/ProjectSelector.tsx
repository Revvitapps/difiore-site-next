'use client';

import React from 'react';

export type ProjectKey =
  | 'roofing'
  | 'bathroom'
  | 'kitchen'
  | 'siding'
  | 'windows'
  | 'deck'
  | 'addition'
  | 'basement'
  | 'other';

type ProjectSelectorProps = {
  value: ProjectKey | null;
  // renamed to match what page.tsx is passing
  onSelectProject: (p: ProjectKey) => void;
};

const OPTIONS: { key: ProjectKey; label: string; emoji: string }[] = [
  { key: 'roofing', label: 'Roofing', emoji: '🏠' },
  { key: 'siding', label: 'Siding / Exterior', emoji: '🔲' },
  { key: 'windows', label: 'Windows', emoji: '🪟' },
  { key: 'kitchen', label: 'Kitchen Remodel', emoji: '🍳' },
  { key: 'bathroom', label: 'Bathroom Remodel', emoji: '🚿' },
  { key: 'deck', label: 'Deck / Outdoor', emoji: '🪵' },
  { key: 'addition', label: 'Addition / Bump-out', emoji: '➕' },
  { key: 'basement', label: 'Basement Finish', emoji: '🏚️' },
  { key: 'other', label: 'Something Else', emoji: '❓' },
];

export default function ProjectSelector({
  value,
  onSelectProject,
}: ProjectSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="text-[11px] font-semibold uppercase tracking-wide text-white/60">
        Step 1
      </div>

      <h2 className="text-xl font-bold text-white">
        What are you working on?
      </h2>

      <p className="text-sm text-white/60">
        Pick the closest match. We’ll ask the same first questions your
        contractor would ask on the phone.
      </p>

      {/* 3x3 grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {OPTIONS.map((opt) => {
          const active = value === opt.key;
          return (
            <button
              key={opt.key}
              type="button"
              onClick={() => onSelectProject(opt.key)}
              className={[
                'flex flex-col rounded-xl border px-4 py-4 text-left transition shadow-[0_20px_60px_rgba(251,191,36,0.15)]',
                active
                  ? 'border-amber-400/60 bg-[rgba(30,24,0,.6)] ring-2 ring-amber-400/60 text-white'
                  : 'border-white/10 bg-[rgba(10,10,15,.6)] hover:border-amber-400/40 hover:bg-[rgba(30,24,0,.4)] text-white/80 hover:text-white',
              ].join(' ')}
            >
              <div className="text-2xl leading-none">{opt.emoji}</div>
              <div className="text-[13px] font-semibold mt-2">{opt.label}</div>
              {active && (
                <div className="text-[11px] text-amber-300 mt-1">
                  Selected
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}