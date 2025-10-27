'use client';

import React from 'react';
import type { ProjectKey } from './types';

type ProjectSelectorProps = {
  value: ProjectKey | null;
  onSelectProject: (project: ProjectKey) => void;
};

type ProjectOption = {
  key: ProjectKey;
  label: string;
  emoji: string;
  blurb: string;
};

const PROJECT_OPTIONS: ProjectOption[] = [
  { key: 'roofing', label: 'Roofing', emoji: '🏠', blurb: 'Full tear-off & replace' },
  { key: 'deck', label: 'Deck / Outdoor Living', emoji: '🪵', blurb: 'Composite & custom builds' },
  { key: 'bathroom', label: 'Bathroom Remodel', emoji: '🚿', blurb: 'Update fixtures & tile' },
  { key: 'kitchen', label: 'Kitchen Remodel', emoji: '🍽️', blurb: 'Layout, cabinets, counters' },
  { key: 'siding', label: 'Siding / Exterior Wrap', emoji: '🏚️', blurb: 'Whole-home exterior refresh' },
  { key: 'windows', label: 'Windows & Doors', emoji: '🪟', blurb: 'Full replacement packages' },
  { key: 'addition', label: 'Addition / Basement', emoji: '➕', blurb: 'Add square footage / finish space' },
];

export default function ProjectSelector({ value, onSelectProject }: ProjectSelectorProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {PROJECT_OPTIONS.map((opt) => {
        const active = value === opt.key;
        return (
          <button
            key={opt.key}
            type="button"
            onClick={() => onSelectProject(opt.key)}
            aria-pressed={active}
            className={[
              'flex w-[160px] flex-col items-start rounded-xl border px-4 py-3 text-left text-sm font-semibold transition',
              'bg-[rgba(20,20,28,.6)]',
              active
                ? 'border-amber-400/60 text-amber-300 shadow-[0_20px_60px_rgba(251,191,36,.3)]'
                : 'border-white/15 text-white/80 hover:bg-[rgba(30,30,40,.7)] hover:text-white',
            ].join(' ')}
          >
            <span className="flex items-center gap-2 text-[14px] font-bold text-white">
              <span className="text-lg" aria-hidden>
                {opt.emoji}
              </span>
              <span>{opt.label}</span>
            </span>
            <span className="mt-1 text-[12px] font-normal leading-snug text-zinc-400">
              {opt.blurb}
            </span>
          </button>
        );
      })}
    </div>
  );
}
