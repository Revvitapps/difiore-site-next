'use client';

import React from 'react';

// If TypeScript complains about the import from page.tsx, you can inline the EstimatorState type here.
// For now we'll accept `any` for state to keep runtime unblocked.
type Props = {
  state: any;
  setState: React.Dispatch<React.SetStateAction<any>>;
  layoutClassName?: string;
};

export function ProjectSelector({ state, setState, layoutClassName }: Props) {
  const projectOptions = [
    { key: 'roofing', label: 'Roof / Gutters', emoji: '🏠' },
    { key: 'siding', label: 'Siding / Exterior', emoji: '🧱' },
    { key: 'deck', label: 'Deck / Outdoor', emoji: '🌿' },
    { key: 'kitchen', label: 'Kitchen Remodel', emoji: '🍽️' },
    { key: 'bathroom', label: 'Bathroom Remodel', emoji: '🚿' },
    { key: 'addition', label: 'Addition / Basement', emoji: '➕' },
  ] as const;

  function pickProject(key: string) {
    setState((prev) => ({
      ...prev,
      project: key,
    }));
  }

  return (
    <div className="flex flex-col gap-4 text-white">
      <p className="text-[13px] text-zinc-300">
        What kind of work are you looking to get priced?
      </p>

      {/* grid of 6 pills */}
      <div
        className={
          layoutClassName ??
          'flex flex-wrap gap-2'
        }
      >
        {projectOptions.map((opt) => {
          const active = state.project === opt.key;
          return (
            <button
              key={opt.key}
              type="button"
              onClick={() => pickProject(opt.key)}
              className={[
                'flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition',
                active
                  ? 'border-amber-400/60 bg-[rgba(251,191,36,.15)] text-amber-300 shadow-[0_20px_60px_rgba(251,191,36,.3)]'
                  : 'border-white/15 bg-[rgba(20,20,28,.6)] text-white/80 hover:bg-[rgba(30,30,40,.7)] hover:text-white',
              ].join(' ')}
            >
              <span className="text-lg">{opt.emoji}</span>
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}