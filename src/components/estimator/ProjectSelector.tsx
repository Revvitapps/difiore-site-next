'use client';

import React from 'react';
import type { ProjectKey } from './types';

type ProjectSelectorProps = {
  value: ProjectKey | null;
  onSelectProject: (proj: ProjectKey) => void;
};

type Option = {
  key: ProjectKey;
  label: string;
  emoji: string;
  blurb: string;
};

export const PROJECT_OPTIONS: Option[] = [
  { key: 'roofing', label: 'Roofing', emoji: '🏠', blurb: 'Full tear-off & replace' },
  { key: 'deck', label: 'Deck / Outdoor Living', emoji: '🪵', blurb: 'Composite & custom builds' },
  { key: 'bathroom', label: 'Bathroom Remodel', emoji: '🚿', blurb: 'Update fixtures & tile' },
  { key: 'kitchen', label: 'Kitchen Remodel', emoji: '🍳', blurb: 'Cabinets / counters / layout' },
  { key: 'siding', label: 'Siding / Exterior Wrap', emoji: '🔲', blurb: 'Whole-home exterior refresh' },
  { key: 'windows', label: 'Windows & Doors', emoji: '🪟', blurb: 'Full replacement packages' },
  { key: 'addition', label: 'Addition / Basement', emoji: '➕', blurb: 'Add square footage / finish space' },
];

export default function ProjectSelector({ value, onSelectProject }: ProjectSelectorProps) {
  return (
    <div className="space-y-4 text-white">
      <div className="text-[11px] font-semibold uppercase tracking-wide text-white/60">
        Step 1 • Project Type
      </div>

      <h2 className="text-xl md:text-2xl font-bold text-white">
        What kind of project are you planning?
      </h2>

      <p className="text-sm text-white/60 max-w-xl">
        Pick the one that’s the best fit. You’ll answer a few quick details next.
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECT_OPTIONS.map((opt) => {
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
                  : 'border-white/10 bg-[rgba(10,10,15,.6)] text-white/80 hover:border-amber-400/40 hover:bg-[rgba(30,24,0,.4)] hover:text-white',
              ].join(' ')}
            >
              <div className="text-2xl leading-none">{opt.emoji}</div>

              <div className="mt-2 text-[13px] font-semibold text-white">
                {opt.label}
              </div>

              <div className="mt-1 text-[11px] text-white/50">
                {opt.blurb}
              </div>

              {active && (
                <div className="mt-2 text-[11px] font-medium text-amber-300">
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
