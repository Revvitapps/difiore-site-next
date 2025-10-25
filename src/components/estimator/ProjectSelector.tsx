'use client';

import React from 'react';

export type ProjectChoice =
  | 'roofing'
  | 'deck'
  | 'bathroom'
  | 'kitchen'
  | 'siding'
  | 'addition'
  | '';

interface ProjectSelectorProps {
  value: ProjectChoice;
  onChange: (val: ProjectChoice) => void;
}

export function ProjectSelector({ value, onChange }: ProjectSelectorProps) {
  const options: { key: ProjectChoice; label: string; emoji: string }[] = [
    { key: 'roofing', label: 'Roofing', emoji: '🏠' },
    { key: 'siding', label: 'Siding', emoji: '🏡' },
    { key: 'deck', label: 'Deck / Outdoor', emoji: '🪵' },
    { key: 'kitchen', label: 'Kitchen', emoji: '🍳' },
    { key: 'bathroom', label: 'Bathroom', emoji: '🚿' },
    { key: 'addition', label: 'Addition / Basement', emoji: '➕' },
  ];

  return (
    <div className="space-y-4 text-white">
      <div>
        <div className="text-lg font-bold text-white">What are we working on?</div>
        <div className="text-sm text-white/70">
          Pick one to start – you can ask us about more after we meet.
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = value === opt.key;
          return (
            <button
              key={opt.key}
              type="button"
              onClick={() => onChange(opt.key)}
              className={[
                'flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition',
                active
                  ? 'border-amber-400 bg-amber-500/10 text-amber-300 shadow-[0_20px_40px_rgba(255,200,0,.2)]'
                  : 'border-white/15 bg-white/5 text-white/80 hover:border-amber-400 hover:text-amber-300 hover:shadow-[0_20px_40px_rgba(255,200,0,.15)]',
              ].join(' ')}
            >
              <span className="text-lg leading-none">{opt.emoji}</span>
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}