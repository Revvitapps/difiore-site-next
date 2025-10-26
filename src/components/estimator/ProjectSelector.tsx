'use client';

import React from 'react';

export type ProjectKey =
  | 'roofing'
  | 'siding'
  | 'windows'
  | 'bathroom'
  | 'kitchen'
  | 'addition'
  | 'basement'
  | 'deck'
  | 'other';

interface ProjectSelectorProps {
  value: ProjectKey | '';
  onChange: (key: ProjectKey) => void;
}

const OPTIONS: { key: ProjectKey; label: string; blurb: string }[] = [
  { key: 'roofing', label: 'Roofing', blurb: 'Leak, aging, storm damage' },
  { key: 'siding', label: 'Siding', blurb: 'Replace / repair exterior' },
  { key: 'windows', label: 'Windows', blurb: 'Drafty / failing windows' },
  { key: 'bathroom', label: 'Bathroom', blurb: 'Full gut / remodel' },
  { key: 'kitchen', label: 'Kitchen', blurb: 'New cabinets, layout, etc.' },
  { key: 'addition', label: 'Addition', blurb: 'Add space / new level' },
  { key: 'basement', label: 'Basement', blurb: 'Finish / refinish space' },
  { key: 'deck', label: 'Deck / Porch', blurb: 'New build / rebuild' },
  { key: 'other', label: 'Other', blurb: 'Tell us what you need' },
];

function ProjectSelector({ value, onChange }: ProjectSelectorProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-white">
      {OPTIONS.map((opt) => {
        const active = opt.key === value;
        return (
          <button
            key={opt.key}
            type="button"
            onClick={() => onChange(opt.key)}
            className={[
              'flex flex-col rounded-xl border px-4 py-4 text-left transition shadow-[0_20px_60px_rgba(251,191,36,0.15)]',
              active
                ? 'border-amber-400 bg-amber-500/10 text-amber-200 ring-1 ring-amber-400/40'
                : 'border-white/10 bg-white/[0.03] text-white/80 hover:border-amber-400/60 hover:bg-amber-500/5 hover:text-white',
            ].join(' ')}
          >
            <div className="text-sm font-semibold leading-tight flex items-center gap-2">
              <span>{opt.label}</span>
              {active && (
                <span className="inline-block rounded-full bg-amber-400 text-zinc-900 text-[10px] font-bold px-2 py-[2px] leading-none">
                  Selected
                </span>
              )}
            </div>
            <div className="text-[11px] text-white/50 mt-1 leading-snug">
              {opt.blurb}
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default ProjectSelector;